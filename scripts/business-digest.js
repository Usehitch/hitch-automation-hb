/**
 * Business-impact digest for the nightly Slack alerts.
 *
 * Translates Playwright's JSON report from "which tests failed" into "which
 * business capabilities are working / broken", using scripts/capability-map.json
 * (spec file → plain-English capability). Stakeholders read the digest;
 * the technical failed-test list and report links stay below it for QA.
 *
 * Usage:
 *   node scripts/business-digest.js <results.json>            # full digest (failure alert)
 *   node scripts/business-digest.js <results.json> --summary  # one-liner (success alert)
 *
 * Output (full):
 *   *Business impact:*
 *   🔴 NOT working: Borrower income verification — failed at "Connect payroll via Truework"
 *   ⚠️ Unstable (passed on retry): Quick Pricer — pricing scenarios & borrower invites
 *   ✅ Working: Broker portal login, Pre-qual application creation (broker), … (12 capabilities)
 *
 * Only capabilities that actually ran are listed — scoped tenant nightlies run a
 * subset of specs, and what didn't run simply isn't claimed either way. Specs
 * skipped in-run count as "not checked" and are omitted unless the whole
 * capability was skipped, in which case it appears under "Not checked".
 *
 * Best-effort: never exits non-zero — a digest problem must not break the alert.
 */

const fs = require("fs");
const path = require("path");

const RESULTS = process.argv[2] || "test-results.json";
const SUMMARY_ONLY = process.argv.includes("--summary");

function output(text) {
  console.log(text);
  process.exit(0);
}

let report;
try {
  report = JSON.parse(fs.readFileSync(RESULTS, "utf8"));
} catch (e) {
  output("(business digest unavailable — no readable test report)");
}

let capMap = {};
try {
  capMap = JSON.parse(fs.readFileSync(path.join(__dirname, "capability-map.json"), "utf8"));
} catch (e) {
  /* map missing/corrupt → every spec falls through as (unmapped) */
}

// Deepest test.step title that carries an error — "where in the flow it broke".
function deepestErroredStep(steps) {
  let found = null;
  for (const st of steps || []) {
    if (st.error) found = deepestErroredStep(st.steps) || st.title;
  }
  return found;
}

// ---------------------------------------------------------------------------
// Walk every spec; aggregate per capability.
// Per-spec status: broken (any unexpected test) > flaky (passed on retry)
// > working (expected) > skipped.
// ---------------------------------------------------------------------------
const caps = new Map(); // name → { status, reasons: Set }

function capFor(file) {
  if (capMap[file]) return capMap[file];
  return `(unmapped) ${file}`; // visible rot marker — add the spec to capability-map.json
}

const RANK = { skipped: 0, working: 1, flaky: 2, broken: 3 };

function visit(node) {
  for (const spec of node.specs || []) {
    let status = "skipped";
    let reason = null;
    for (const t of spec.tests || []) {
      if (t.status === "unexpected") {
        status = "broken";
        const lastFailed = [...(t.results || [])]
          .reverse()
          .find((r) => r.status === "failed" || r.status === "timedOut");
        reason = (lastFailed && deepestErroredStep(lastFailed.steps)) || null;
      } else if (t.status === "flaky" && status !== "broken") {
        status = "flaky";
      } else if (t.status === "expected" && RANK[status] < RANK.working) {
        status = "working";
      }
    }

    const name = capFor(spec.file);
    const cap = caps.get(name) || { status: "skipped", reasons: new Set() };
    if (RANK[status] > RANK[cap.status]) cap.status = status;
    if (status === "broken") cap.reasons.add(reason ? `failed at "${reason}"` : `"${spec.title}" failed`);
    caps.set(name, cap);
  }
  (node.suites || []).forEach(visit);
}
(report.suites || []).forEach(visit);

const broken = [...caps].filter(([, c]) => c.status === "broken");
const flaky = [...caps].filter(([, c]) => c.status === "flaky");
const working = [...caps].filter(([, c]) => c.status === "working");
const skipped = [...caps].filter(([, c]) => c.status === "skipped");

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------
if (SUMMARY_ONLY) {
  if (caps.size === 0) output("(business digest unavailable — empty test report)");
  const parts = [`All ${working.length + flaky.length} business capabilities checked are working`];
  if (flaky.length) parts.push(`(${flaky.length} unstable — passed on retry: ${flaky.map(([n]) => n).join(", ")})`);
  output(parts.join(" "));
}

const lines = ["*Business impact:*"];
for (const [name, cap] of broken) {
  const why = [...cap.reasons].slice(0, 2).join("; ");
  lines.push(`🔴 NOT working: ${name}${why ? ` — ${why}` : ""}`);
}
for (const [name] of flaky) {
  lines.push(`⚠️ Unstable (passed on retry): ${name}`);
}
if (working.length) {
  lines.push(`✅ Working: ${working.map(([n]) => n).join(", ")} (${working.length} capabilities)`);
}
if (skipped.length) {
  lines.push(`⚪ Not checked this run: ${skipped.map(([n]) => n).join(", ")}`);
}
if (lines.length === 1) lines.push("(no capabilities found in the test report)");

output(lines.join("\n"));
