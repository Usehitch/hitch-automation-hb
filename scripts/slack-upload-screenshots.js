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
const os = require('os');
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

// ---------------------------------------------------------------------------
// Annotation: stamp each screenshot with a banner naming the failing test and
// its error, so the image itself carries the context (Slack previews show the
// picture prominently but bury file titles). Rendered with Playwright's own
// Chromium — already installed for the tests, so no extra dependency.
// ---------------------------------------------------------------------------

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function bannerHtml({ title, errLine, location, dataUri }) {
  const loc = location ? `<span class="loc">${escapeHtml(location)}</span>` : '';
  const err = errLine ? `<div class="err">${escapeHtml(errLine)}</div>` : '';
  return `<!DOCTYPE html><html><head><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; width: fit-content; }
    .banner {
      background: #1a1d24; color: #fff; padding: 14px 18px;
      font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      display: flex; flex-direction: column; gap: 6px;
    }
    .head { display: flex; align-items: baseline; gap: 10px; }
    .chip {
      background: #d63b3b; color: #fff; font-size: 12px; font-weight: 700;
      padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px; flex: none;
    }
    .title { font-size: 15px; font-weight: 600; line-height: 1.35; }
    .loc { color: #9aa4b2; font-size: 12px; font-weight: 400; margin-left: 8px; }
    .err {
      color: #ff9d9d; font-family: Consolas, Menlo, monospace;
      font-size: 12.5px; line-height: 1.4; white-space: pre-wrap;
    }
    img { display: block; }
  </style></head><body>
    <div class="banner" id="banner">
      <div class="head"><span class="chip">FAILED</span><span class="title">${escapeHtml(title)}${loc}</span></div>
      ${err}
    </div>
    <img id="shot" src="${dataUri}">
  </body></html>`;
}

// Returns a map file → annotated file. Best-effort: on ANY problem the
// original screenshots are uploaded unlabelled rather than not at all.
async function annotateAll(shots) {
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch {
    console.log('[slack-screenshots] playwright not available — uploading unannotated screenshots.');
    return new Map();
  }

  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'slack-shots-'));
  const annotated = new Map();
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    for (const s of shots) {
      try {
        const dataUri = `data:image/png;base64,${fs.readFileSync(s.file).toString('base64')}`;
        await page.setContent(
          bannerHtml({ title: s.title, errLine: s.errLine, location: s.location, dataUri }),
          { waitUntil: 'load' }
        );
        // Match the banner width to the screenshot and size the viewport to
        // the composed content so nothing is clipped or letterboxed.
        const { w, h } = await page.evaluate(() => {
          const img = document.getElementById('shot');
          const width = Math.max(640, img.naturalWidth);
          img.style.width = `${width}px`;
          document.getElementById('banner').style.width = `${width}px`;
          return { w: width, h: document.body.scrollHeight };
        });
        await page.setViewportSize({ width: w, height: Math.min(h, 4000) });
        const out = path.join(outDir, `${annotated.size}-${path.basename(s.file)}`);
        await page.screenshot({ path: out, fullPage: true });
        annotated.set(s.file, out);
      } catch (e) {
        console.log(`[slack-screenshots] annotate failed for "${s.title}": ${e.message} — using original.`);
      }
    }
  } catch (e) {
    console.log(`[slack-screenshots] annotation disabled: ${e.message}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
  return annotated;
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
      ordered.push({
        title: `${f.title}${tag}`,
        file: f.files[i],
        errLine: f.errLine,
        location: f.location,
      });
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

  // Burn the test name + error into each image so the Slack preview itself
  // says what failed (falls back to the raw screenshot if annotation breaks).
  const annotated = await annotateAll(shots);

  const uploaded = [];
  for (const s of shots) {
    try {
      uploaded.push(await uploadOne({ ...s, file: annotated.get(s.file) || s.file }));
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
