#!/usr/bin/env node
/**
 * Strip spurious "skipped" twin results from allure-results.
 *
 * allure-playwright's addSkippedResults() (runs in onEnd) emits a zero-duration
 * SKIPPED result for tests it thinks never started. With this project's
 * multi-project layout (setup + chromium + chromium-lo with testIgnore/
 * testMatch) the title-based matching over-fires, producing a skipped "twin"
 * for tests that actually ran. Allure's retry/history resolution then sometimes
 * renders the skipped twin instead of the real pass/fail — making the whole
 * report show as skipped.
 *
 * Fix: for any historyId that has a real (non-skipped) result, delete the
 * skipped result file(s). Genuinely-skipped tests (no real sibling) are kept.
 *
 * Idempotent. Run after `playwright test`, before `allure generate`.
 */
const fs = require("fs");
const path = require("path");

const dir = process.argv[2] || "allure-results";
if (!fs.existsSync(dir)) {
  console.log(`[allure-dedupe] no '${dir}' directory — nothing to do`);
  process.exit(0);
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith("-result.json"));
const byHistory = new Map();
for (const f of files) {
  let j;
  try {
    j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch {
    continue;
  }
  const key = j.historyId || j.fullName || j.name || f;
  if (!byHistory.has(key)) byHistory.set(key, []);
  byHistory.get(key).push({ file: f, status: j.status });
}

let removed = 0;
for (const [, entries] of byHistory) {
  const hasReal = entries.some((e) => e.status !== "skipped");
  if (!hasReal) continue; // keep genuine skips
  for (const e of entries) {
    if (e.status === "skipped") {
      fs.unlinkSync(path.join(dir, e.file));
      removed++;
    }
  }
}

console.log(
  `[allure-dedupe] ${files.length} result files, ${byHistory.size} unique tests, removed ${removed} skipped twin(s)`
);
