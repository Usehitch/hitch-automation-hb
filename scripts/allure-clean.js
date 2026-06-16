#!/usr/bin/env node
/**
 * Remove the given directories (recursively, no error if missing).
 * Cross-platform replacement for `rm -rf` / `rimraf` used by the allure
 * npm scripts so cleanup behaves the same on Windows and Linux/CI.
 *
 * Usage: node scripts/allure-clean.js allure-results allure-report
 */
const fs = require("fs");

const dirs = process.argv.slice(2);
for (const dir of dirs) {
  fs.rmSync(dir, { recursive: true, force: true });
}
console.log(`[allure-clean] removed: ${dirs.join(", ") || "(nothing)"}`);
