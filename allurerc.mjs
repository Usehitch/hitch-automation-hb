import { defineConfig } from "allure";

// Allure 3 config. Auto-discovered by `allure generate` / `allure serve`.
export default defineConfig({
  name: "Homebridge E2E",
  output: "allure-report",
  // Allure 3 stores ALL history in this single JSONL file (unlike Allure 2's
  // history/ folder). Persist this one file across CI runs to get trends,
  // retries and flakiness detection. `allure generate` reads it, then appends
  // the current launch (appendHistory defaults to true).
  historyPath: "allure-history.jsonl",
  // Defaults to the "awesome" plugin (the modern report UI) when omitted.
});
