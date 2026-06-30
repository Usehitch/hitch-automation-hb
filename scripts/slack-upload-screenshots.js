// Upload failed-test screenshots to Slack via the files.uploadV2 flow.
//
// Reads Playwright's JSON report, pulls one screenshot per failed spec (the
// final attempt's image), caps the count, and posts them as a SINGLE Slack
// message with all images attached and a caption.
//
// Usage:
//   node scripts/slack-upload-screenshots.js <results.json> [maxImages]
//
// Env:
//   SLACK_BOT_TOKEN  — xoxb-… token with files:write (and chat:write); bot
//                      must be a member of the target channel.
//   SLACK_CHANNEL_ID — numeric channel ID (e.g. C0123ABCD), NOT the #name.
//   SLACK_CAPTION    — optional initial_comment for the upload message.
//
// Best-effort: any failure here logs and exits 0 so a Slack hiccup never masks
// the real test failure (the workflow fails the job separately).

const fs = require('fs');
const path = require('path');

const RESULTS = process.argv[2] || 'test-results.json';
const MAX = parseInt(process.argv[3] || '10', 10);
const TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL_ID;
const CAPTION = process.env.SLACK_CAPTION || 'Failure screenshots';

const SLACK = 'https://slack.com/api';

function bail(msg) {
  console.log(`[slack-screenshots] ${msg}`);
  process.exit(0); // never fail the job over screenshot delivery
}

// Walk suites/specs recursively and collect ONE screenshot per failed spec:
// the last image attachment from a failed/timedOut result (i.e. the final
// attempt), so retries don't flood the channel with duplicates.
function collectScreenshots(report) {
  const found = []; // { title, file }
  const visit = (node) => {
    (node.suites || []).forEach(visit);
    (node.specs || []).forEach((spec) => {
      if (spec.ok) return; // only failing specs
      let shot = null;
      (spec.tests || []).forEach((t) =>
        (t.results || []).forEach((r) => {
          if (r.status !== 'failed' && r.status !== 'timedOut') return;
          (r.attachments || []).forEach((a) => {
            if ((a.contentType || '').startsWith('image/') && a.path) {
              const p = path.isAbsolute(a.path) ? a.path : path.resolve(a.path);
              if (fs.existsSync(p)) shot = p; // keep the latest → final attempt
            }
          });
        })
      );
      if (shot) found.push({ title: spec.title, file: shot });
    });
  };
  (report.suites || []).forEach(visit);
  return found;
}

async function slack(method, body, isJson) {
  const res = await fetch(`${SLACK}/${method}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': isJson
        ? 'application/json; charset=utf-8'
        : 'application/x-www-form-urlencoded',
    },
    body: isJson ? JSON.stringify(body) : new URLSearchParams(body).toString(),
  });
  return res.json();
}

async function uploadOne({ title, file }) {
  const buf = fs.readFileSync(file);
  const filename = path.basename(file);

  // 1) reserve an upload URL
  const reserve = await slack('files.getUploadURLExternal', {
    filename,
    length: String(buf.length),
  });
  if (!reserve.ok) throw new Error(`getUploadURLExternal: ${reserve.error}`);

  // 2) PUT the bytes to the returned URL
  const fd = new FormData();
  fd.append('file', new Blob([buf], { type: 'image/png' }), filename);
  const put = await fetch(reserve.upload_url, { method: 'POST', body: fd });
  if (!put.ok) throw new Error(`upload POST failed: HTTP ${put.status}`);

  return { id: reserve.file_id, title: title.slice(0, 200) };
}

(async () => {
  if (!TOKEN) bail('SLACK_BOT_TOKEN not set — skipping screenshot upload.');
  if (!CHANNEL) bail('SLACK_CHANNEL_ID not set — skipping screenshot upload.');
  if (typeof fetch !== 'function') bail('global fetch unavailable (need Node 18+).');

  let report;
  try {
    report = JSON.parse(fs.readFileSync(RESULTS, 'utf8'));
  } catch (e) {
    bail(`could not read ${RESULTS}: ${e.message}`);
  }

  const all = collectScreenshots(report);
  if (all.length === 0) bail('no failure screenshots found — nothing to upload.');

  const shots = all.slice(0, MAX);
  const dropped = all.length - shots.length;
  console.log(`[slack-screenshots] uploading ${shots.length} of ${all.length} failure screenshot(s).`);

  const uploaded = [];
  for (const s of shots) {
    try {
      uploaded.push(await uploadOne(s));
    } catch (e) {
      console.log(`[slack-screenshots] skip "${s.title}": ${e.message}`);
    }
  }
  if (uploaded.length === 0) bail('all uploads failed — nothing to post.');

  const comment =
    CAPTION + (dropped > 0 ? `\n_(showing ${uploaded.length} of ${all.length} — ${dropped} more in the report)_` : '');

  const done = await slack(
    'files.completeUploadExternal',
    { files: uploaded, channel_id: CHANNEL, initial_comment: comment },
    true
  );
  if (!done.ok) bail(`completeUploadExternal: ${done.error}`);

  console.log(`[slack-screenshots] posted ${uploaded.length} screenshot(s) to channel ${CHANNEL}.`);
})().catch((e) => bail(`unexpected error: ${e.message}`));
