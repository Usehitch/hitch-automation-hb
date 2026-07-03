#!/usr/bin/env node
/**
 * Classify Playwright failures and decide what (if anything) to report to Slack.
 *
 * Anti-clutter / validity model:
 *   1. Validity gate — flaky (passed on retry) and infra/setup failures are
 *      NOT product bugs; they're filtered out and only counted.
 *   2. Confirmation threshold — a consistent product failure must fail on
 *      THRESHOLD consecutive nightly runs before it's reported (kills transients).
 *   3. Dedup — once reported, a test is marked `notified`; we don't re-announce
 *      it every night. When it passes again we emit a one-time "recovered" note.
 *   4. Outage guard — if the run is broadly broken (high failure rate or mostly
 *      network/host errors) it's an environment problem, not N product bugs:
 *      freeze streaks and post one warning instead of flooding the channel.
 *
 * Each reported failure carries a plain-English description ("Timed out after
 * 30s trying to click the 'NEXT' button…") and the test.step() it died in —
 * see humanize-failure.js. Set ANTHROPIC_API_KEY (optional) to let an LLM
 * summarize error shapes the built-in rules don't recognize.
 *
 * State persists across nightly runs via failure-state.json (cached in CI).
 *
 * Usage: node scripts/classify-failures.js [test-results.json] [failure-state.json]
 * Writes: failure-classification.json (always), slack-bug-report.json (only when
 *         there is something worth announcing).
 */
const fs = require("fs");
const { humanize, llmSummarize } = require("./humanize-failure");

const RESULTS = process.argv[2] || "test-results.json";
const STATE = process.argv[3] || "failure-state.json";
const RUN_ID = process.env.GITHUB_RUN_ID || "local";
const REPO = process.env.GITHUB_REPOSITORY || "local/repo";
const BRANCH = process.env.GITHUB_REF_NAME || "local";
const OWNER = process.env.GITHUB_REPOSITORY_OWNER || REPO.split("/")[0];
const REPO_NAME = REPO.split("/")[1] || REPO;
const THRESHOLD = Number(process.env.BUG_THRESHOLD || 2); // consecutive nightlies
// Multi-tenant workflows: TENANT_LABEL names the run in Slack (falls back to
// the branch), PAGES_PREFIX is the workflow's gh-pages subdir (e.g.
// "cmg-whs-stg"; HB staging publishes at the root so it stays empty).
const LABEL = process.env.TENANT_LABEL || BRANCH;
let PAGES_PREFIX = (process.env.PAGES_PREFIX || "").replace(/^\/+|\/+$/g, "");
if (PAGES_PREFIX) PAGES_PREFIX += "/";

// --- load report + prior state ----------------------------------------------
const report = JSON.parse(fs.readFileSync(RESULTS, "utf8"));
let state = { tests: {} };
try {
  state = JSON.parse(fs.readFileSync(STATE, "utf8"));
  state.tests = state.tests || {};
} catch {
  /* first run */
}

// --- flatten the nested suite tree into individual (project, file, title) ----
function* walk(suites, fileCtx) {
  for (const s of suites || []) {
    const file = s.file || fileCtx;
    for (const sp of s.specs || []) {
      for (const t of sp.tests || []) {
        yield { file: sp.file || file, title: sp.title, project: t.projectName, test: t };
      }
    }
    yield* walk(s.suites, file);
  }
}

// --- infra vs product heuristics ---------------------------------------------
// IMPORTANT: a bare "Timeout exceeded" is usually a PRODUCT failure (an element
// never appeared / a flow got stuck) — NOT infra. Only clear environment signals
// count as infra, otherwise we'd silently hide real regressions.
const INFRA_FILE = /auth\.setup/i;
const INFRA_PROJECT = /^setup/i;
const INFRA_ERR =
  /(net::|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION|ERR_INTERNET|ECONNREFUSED|ENOTFOUND|ECONNRESET|EAI_AGAIN|socket hang up|browser has been closed|Target (page|frame|context).*(closed|crashed)|Execution context was destroyed|returned HTTP 50\d|staging is unavailable)/i;

// Full error text (all lines): the infra regex and the humanizer both need the
// call log / code snippet, not just the headline. Display still uses line 1.
function lastError(test) {
  const results = test.results || [];
  for (let i = results.length - 1; i >= 0; i--) {
    const errs = results[i].errors || [];
    if (errs.length) return errs[0].message || "";
  }
  return "";
}

// --- PII scrub (mortgage-lender domain) + cleanup ----------------------------
// Strips ANSI color codes Playwright embeds in errors, redacts SSN / long
// numeric runs (acct/loan-ish), collapses whitespace, and caps length.
function scrub(s, max = 240) {
  return (s || "")
    .replace(/\x1b\[[0-9;]*m/g, "")
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN]")
    .replace(/\b\d{9,}\b/g, "[NUM]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

const fingerprint = (x) => `${x.project} :: ${x.file} :: ${x.title}`;
const label = (x) => `[${x.project}] ${x.file} › ${x.title}`;
const firstLine = (s) => (s || "").split("\n")[0];

// --- phase A: tentative classification (no state mutation yet) ---------------
const items = [];
const seen = new Set();
const fullErrByFp = new Map();
for (const x of walk(report.suites)) {
  const st = x.test.status; // expected | unexpected | flaky | skipped
  if (st === "skipped") continue;
  const fp = fingerprint(x);
  seen.add(fp);
  if (st === "flaky") { items.push({ x, fp, kind: "flaky" }); continue; }
  if (st === "expected") { items.push({ x, fp, kind: "passed" }); continue; }
  const err = lastError(x.test);
  const isInfra = INFRA_FILE.test(x.file) || INFRA_PROJECT.test(x.project) || INFRA_ERR.test(err);
  // Plain-English description + the test.step() the failure happened in
  const human = humanize(x.test, err);
  fullErrByFp.set(fp, err); // kept out of the buckets; only for the LLM fallback
  items.push({ x, fp, err: firstLine(err), human, kind: isInfra ? "infra" : "product" });
}

// --- outage guard ------------------------------------------------------------
const nonSkipped = (report.stats?.expected || 0) + (report.stats?.unexpected || 0) + (report.stats?.flaky || 0);
const failures = items.filter((i) => i.kind === "product" || i.kind === "infra").length;
const networkInfra = items.filter((i) => i.kind === "infra").length;
const failureRate = nonSkipped ? failures / nonSkipped : 0;
const degraded =
  failureRate > 0.3 || networkInfra >= 8 || (failures >= 4 && networkInfra > failures * 0.5);

// --- phase B: apply state + fill buckets -------------------------------------
const buckets = { confirmed: [], stillFailing: [], recovered: [], flaky: [], infra: [], holding: [] };
for (const it of items) {
  const { x, fp, kind } = it;
  const prev = state.tests[fp] || { streak: 0, notified: false, firstRun: null };

  if (kind === "flaky") {
    buckets.flaky.push({ fp, label: label(x) });
    if (prev.notified) buckets.recovered.push({ fp, label: label(x) });
    state.tests[fp] = { streak: 0, notified: false, firstRun: null };
  } else if (kind === "passed") {
    if (prev.notified) buckets.recovered.push({ fp, label: label(x) });
    state.tests[fp] = { streak: 0, notified: false, firstRun: null };
  } else if (kind === "infra") {
    buckets.infra.push({ fp, label: label(x), err: scrub(it.err), human: scrub(it.human.text), step: scrub(it.human.step) });
    state.tests[fp] = { ...prev, lastInfraRun: RUN_ID }; // don't advance product streak
  } else if (degraded) {
    // outage: hold without advancing the streak, so it can't confirm a bug
    buckets.holding.push({ fp, label: label(x), err: scrub(it.err), human: scrub(it.human.text), step: scrub(it.human.step), streak: prev.streak || 0, degraded: true });
    state.tests[fp] = prev; // unchanged
  } else {
    // consistent product failure → confirmation threshold + dedup
    const streak = (prev.streak || 0) + 1;
    const firstRun = prev.firstRun || RUN_ID;
    const entry = {
      fp, label: label(x), err: scrub(it.err), streak, firstRun,
      human: scrub(it.human.text), step: scrub(it.human.step), confident: it.human.confident,
    };
    if (prev.notified) {
      buckets.stillFailing.push(entry);
      state.tests[fp] = { streak, notified: true, firstRun };
    } else if (streak >= THRESHOLD) {
      buckets.confirmed.push(entry);
      state.tests[fp] = { streak, notified: true, firstRun };
    } else {
      buckets.holding.push(entry); // 1st night — wait for confirmation
      state.tests[fp] = { streak, notified: false, firstRun };
    }
  }
}

// prune state for tests no longer present (renamed/removed)
for (const fp of Object.keys(state.tests)) if (!seen.has(fp)) delete state.tests[fp];
state.lastRun = RUN_ID;
state.degraded = degraded;

fs.writeFileSync(STATE, JSON.stringify(state, null, 2));

// --- build Slack message only when there's something worth announcing --------
const ALLURE = `https://${OWNER}.github.io/${REPO_NAME}/${PAGES_PREFIX}allure/${RUN_ID}/`;
const RUN = `https://github.com/${REPO}/actions/runs/${RUN_ID}`;

(async () => {
// Optional LLM fallback: only for confirmed bugs whose error shape neither the
// known-failure dictionary nor the generic parser recognized. Input is
// PII-scrubbed before it leaves the runner. No ANTHROPIC_API_KEY → skipped.
const needsLlm = buckets.confirmed.filter((b) => !b.confident);
const summaries = await llmSummarize(
  needsLlm.map((b) => `${b.step ? `Failed during test step "${b.step}". ` : ""}${scrub(fullErrByFp.get(b.fp), 1200)}`)
);
if (summaries) needsLlm.forEach((b, i) => { if (summaries[i]) b.human = scrub(summaries[i]); });
for (const b of buckets.confirmed) delete b.confident; // internal flag — keep the JSON clean

fs.writeFileSync(
  "failure-classification.json",
  JSON.stringify({ degraded, failureRate: Number(failureRate.toFixed(3)), ...buckets }, null, 2)
);

if (degraded) {
  const text = [
    `⚠️ *Nightly run looks degraded — bug reporting paused* on \`${LABEL}\``,
    `📦 ${REPO}`,
    `Failure rate ${(failureRate * 100).toFixed(0)}% with ${networkInfra} network/host error(s) (e.g. \`ERR_NAME_NOT_RESOLVED\`). Looks like an environment/staging outage, not product regressions — *not* filing individual bugs this run.`,
    "",
    `🟣 <${ALLURE}|Allure trends> · 🔍 <${RUN}|Run logs>`,
  ].join("\n");
  fs.writeFileSync("slack-bug-report.json", JSON.stringify({ channel: "#automation-alerts", text }));
} else if (buckets.confirmed.length || buckets.recovered.length) {
  const lines = [];
  if (buckets.confirmed.length) {
    lines.push(`🐛 *New confirmed regression(s)* <!here>  _(failed ≥${THRESHOLD} consecutive nightlies on \`${LABEL}\`)_`);
    lines.push(`📦 ${REPO}`);
    lines.push("");
    for (const b of buckets.confirmed) {
      lines.push(`• ${b.label}`);
      // skip the human line when the fallback couldn't do better than the raw error
      if (b.human && b.human !== b.err) lines.push(`   ↳ ${b.step ? `At step _"${b.step}"_: ` : ""}${b.human}`);
      lines.push(`   ↳ ${b.streak} night${b.streak === 1 ? "" : "s"} · \`${b.err || "no error message captured"}\``);
    }
  } else {
    lines.push(`✅ *Regression update* on \`${LABEL}\``);
    lines.push(`📦 ${REPO}`);
  }
  if (buckets.recovered.length) {
    lines.push("");
    lines.push(`✅ *Recovered* (${buckets.recovered.length}): ${buckets.recovered.map((r) => r.label).join("; ")}`);
  }
  // context footer — what was filtered out (not reported, just counted)
  lines.push("");
  lines.push(
    `ℹ️ Filtered this run: ${buckets.flaky.length} flaky, ${buckets.infra.length} infra/setup, ${buckets.holding.length} awaiting confirmation (1st night)`
  );
  lines.push("");
  lines.push(`🟣 <${ALLURE}|Allure trends> · 🔍 <${RUN}|Run logs>`);

  const payload = { channel: "#automation-alerts", text: lines.join("\n") };
  fs.writeFileSync("slack-bug-report.json", JSON.stringify(payload));
} else {
  // nothing to announce — ensure no stale payload lingers
  try { fs.unlinkSync("slack-bug-report.json"); } catch {}
}

console.log(
  `[classify] confirmed=${buckets.confirmed.length} stillFailing=${buckets.stillFailing.length} ` +
    `recovered=${buckets.recovered.length} flaky=${buckets.flaky.length} infra=${buckets.infra.length} ` +
    `holding=${buckets.holding.length}`
);
})();
