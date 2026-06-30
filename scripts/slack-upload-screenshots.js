// Upload failed-test screenshots to Slack via the files.uploadV2 flow.
//
// Reads Playwright's JSON report and, for each failed spec, pulls EVERY
// screenshot from the final attempt (multi-context flows produce one per open
// page), caps the total, and posts them as a SINGLE Slack message with a
// summary that names each failing test, its first error line, and file:line.
//
// Why every screenshot, not one: flows that open more than one browser context
// (e.g. an LO tab idling on the My Loans dashboard + a borrower tab running the
// flow via a shareable link) emit one screenshot per page — test-failed-1.png,
// test-failed-2.png, … Playwright does NOT tell us which page the assertion
// threw on, and the first context is often the idle one. Uploading only a single
// image reliably showed the idle dashboard and never the page that actually
// failed. We upload all pages and let the labels + summary disambiguate.
//
// Usage:
//   node scripts/slack-upload-screenshots.js <results.json> [maxImages]
//
// Env:
//   SLACK_BOT_TOKEN  — xoxb-… token with files:write (and chat:write); bot
//                      must be a member of the target channel.
//   SLACK_CHANNEL_ID — numeric channel ID (e.g. C0123ABCD), NOT the #name.
//   SLACK_CAPTION    — optional initial_comment prefix for the upload message.
//
// Best-effort: any failure here logs and exits 0 so a Slack hiccup never masks
// the real test failure (the workflow fails the job separately).

const fs = require('fs');
const path = require('path');

const RESULTS = process.argv[2] || 'test-results.json';
const MAX = parseInt(process.argv[3] || '12', 10);
const TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL = process.env.SLACK_CHANNEL_ID;
const CAPTION = process.env.SLACK_CAPTION || 'Failure screenshots';

const SLACK = 'https://slack.com/api';

function bail(msg) {
  console.log(`[slack-screenshots] ${msg}`);
  process.exit(0); // never fail the job over screenshot delivery
}

// Strip ANSI colour codes Playwright embeds in error messages so the Slack
// summary reads as plain text.
const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, '');

// Walk suites/specs recursively. For each FAILED spec collect, from its final
// failed/timedOut attempt: the full test path, the first error line, the
// failing file:line, and ALL existing screenshot files (deduped).
function collectFailures(report) {
  const failures = []; // { title, errLine, location, files: [absPath] }
  const visit = (node, trail) => {
    const here = node.title ? [...trail, node.title] : trail;
    (node.suites || []).forEach((s) => visit(s, here));
    (node.specs || []).forEach((spec) => {
      if (spec.ok) return; // only failing specs

      // The last failed/timedOut result across the spec's tests is the final
      // attempt — earlier results are superseded retries.
      let result = null;
      (spec.tests || []).forEach((t) =>
        (t.results || []).forEach((r) => {
          if (r.status === 'failed' || r.status === 'timedOut') result = r;
        })
      );
      if (!result) return;

      const files = [];
      const seen = new Set();
      (result.attachments || []).forEach((a) => {
        if (!(a.contentType || '').startsWith('image/') || !a.path) return;
        const p = path.isAbsolute(a.path) ? a.path : path.resolve(a.path);
        if (!fs.existsSync(p) || seen.has(p)) return;
        seen.add(p);
        files.push(p);
      });
      if (files.length === 0) return;

      const errRaw =
        (result.error && result.error.message) ||
        (result.errors && result.errors[0] && result.errors[0].message) ||
        '';
      const errLine =
        stripAnsi(errRaw).split('\n').map((l) => l.trim()).filter(Boolean)[0] || '';
      const loc = result.errorLocation
        ? `${result.errorLocation.file}:${result.errorLocation.line}`
        : '';

      failures.push({
        title: [...here, spec.title].filter(Boolean).join(' › '),
        errLine,
        location: loc,
        files,
      });
    });
  };
  (report.suites || []).forEach((s) => visit(s, []));
  return failures;
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

  const failures = collectFailures(report);
  if (failures.length === 0) bail('no failure screenshots found — nothing to upload.');

  // Round-robin the per-spec images so every failing spec contributes its first
  // page before any spec contributes a second — under the cap, no failing spec
  // is left without a screenshot. Each image is tagged with its spec so the
  // labels stay meaningful, and with "(page N/M)" when a spec has more than one.
  const ordered = [];
  for (let i = 0; ; i++) {
    let added = false;
    for (const f of failures) {
      if (!f.files[i]) continue;
      const tag = f.files.length > 1 ? ` (page ${i + 1}/${f.files.length})` : '';
      ordered.push({ title: `${f.title}${tag}`, file: f.files[i] });
      added = true;
    }
    if (!added) break;
  }

  const shots = ordered.slice(0, MAX);
  const dropped = ordered.length - shots.length;
  console.log(
    `[slack-screenshots] ${failures.length} failing spec(s), ` +
    `uploading ${shots.length} of ${ordered.length} screenshot(s).`
  );

  const uploaded = [];
  for (const s of shots) {
    try {
      uploaded.push(await uploadOne(s));
    } catch (e) {
      console.log(`[slack-screenshots] skip "${s.title}": ${e.message}`);
    }
  }
  if (uploaded.length === 0) bail('all uploads failed — nothing to post.');

  // Name each failing test up front so the message identifies the failures even
  // before the images load (and even if some screenshots get dropped/skipped).
  const summary = failures
    .map((f, n) => {
      const locPart = f.location ? `  _(${f.location})_` : '';
      const errPart = f.errLine ? `\n   ↳ ${f.errLine.slice(0, 180)}` : '';
      return `${n + 1}. *${f.title}*${locPart}${errPart}`;
    })
    .join('\n');

  const comment =
    `${CAPTION}\n\n*Failing tests (${failures.length}):*\n${summary}` +
    (dropped > 0
      ? `\n\n_(showing ${uploaded.length} of ${ordered.length} screenshots — ${dropped} more in the report)_`
      : '');

  const done = await slack(
    'files.completeUploadExternal',
    { files: uploaded, channel_id: CHANNEL, initial_comment: comment },
    true
  );
  if (!done.ok) bail(`completeUploadExternal: ${done.error}`);

  console.log(`[slack-screenshots] posted ${uploaded.length} screenshot(s) to channel ${CHANNEL}.`);
})().catch((e) => bail(`unexpected error: ${e.message}`));
