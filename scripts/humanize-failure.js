/**
 * Turn a Playwright failure (error text + test.step tree) into a one-line,
 * plain-English description for Slack / failure-classification.json.
 *
 * Three layers, best match wins:
 *   1. KNOWN dictionary — failure modes we've diagnosed before (overlay chips,
 *      email collisions, Truework restarts, staging 502s, …).
 *   2. Generic parser — decodes Playwright's own error shapes (action timeouts,
 *      expect() failures, strict-mode violations, test-timeout) plus the
 *      locator being waited on, into a readable sentence.
 *   3. LLM fallback (optional, see llmSummarize) — only for errors neither
 *      layer recognizes, and only when ANTHROPIC_API_KEY is set in CI.
 *
 * Every description carries `confident`: false means "consider the LLM
 * fallback"; the raw error line is always shown alongside, so a wrong guess
 * here can't hide the real message.
 */

// --- failed-step path --------------------------------------------------------
// The JSON reporter only serializes test.step() steps; the deepest step
// carrying an error is where the failure actually happened.
function failedStepPath(test) {
  const results = test.results || [];
  for (let i = results.length - 1; i >= 0; i--) {
    const path = [];
    let steps = results[i].steps || [];
    while (steps.length) {
      const failed = steps.find((s) => s.error);
      if (!failed) break;
      path.push(failed.title);
      steps = failed.steps || [];
    }
    if (path.length) return path.join(" › ");
  }
  return "";
}

// --- locator → "the 'Next' button" -------------------------------------------
const GETBY_NOUN = { Text: "text", Label: "field", Placeholder: "field", Title: "element", AltText: "image" };

function describeLocator(err) {
  let m = err.match(/getByRole\('([^']+)'(?:\s*,\s*\{[^}]*name:\s*['"`](.+?)['"`])?/);
  if (m) return m[2] ? `the "${m[2]}" ${m[1]}` : `a ${m[1]} element`;
  m = err.match(/getBy(Text|Label|Placeholder|Title|AltText)\(['"`](.+?)['"`]/);
  if (m) return `the "${m[2]}" ${GETBY_NOUN[m[1]]}`;
  m = err.match(/getByTestId\(['"`](.+?)['"`]/);
  if (m) return `the "${m[1]}" element`;
  m = err.match(/locator\(['"`](.+?)['"`]\)/);
  if (m) return `the \`${m[1]}\` element`;
  return "";
}

// --- layer 1: known failure modes --------------------------------------------
// Checked in order; first match wins. `text` may be a string or (err, loc) fn.
const KNOWN = [
  {
    re: /returned HTTP 50\d|staging is unavailable|502 Bad Gateway/i,
    text: "The environment answered with a 5xx error (Render 502/cold start) — outage, not a product bug.",
  },
  {
    re: /email .{0,40}already (associated|exists|registered|in use)/i,
    text: "Test-data collision — the application email is already registered. Use makeApplicationData()/makeCoBorrowerApplicationData() for a fresh email instead of a shared constant.",
  },
  {
    re: /intercepts pointer events/i,
    text: (err, loc) =>
      `A floating overlay (chat bubble / "TEST DATA" chip) is covering ${loc || "the target element"} and swallowing the click.`,
  },
  {
    re: /strict mode violation.{0,200}resolved to (\d+) elements/is,
    text: (err, loc, m) =>
      `The locator for ${loc || "an element"} matched ${m[1]} elements instead of one — usually a UI change added a duplicate (often hidden) copy; scope it or filter to visible.`,
  },
  {
    re: /RESTART VERIFICATION/i,
    text: "Income verification stalled and showed RESTART VERIFICATION — the Truework connect flow must be re-walked (known product-side flakiness).",
  },
  {
    re: /pre-qualified/i,
    text: (err, loc) =>
      `The flow never reached the "You're pre-qualified" step — known intermittent product-side stall in the DTC offer flow.`,
  },
];

// --- layer 2: generic Playwright error shapes ---------------------------------
const ACTIONS = {
  click: "click", dblclick: "double-click", fill: "fill in", type: "type into",
  press: "press a key in", check: "check", uncheck: "uncheck",
  selectOption: "select an option in", hover: "hover over", tap: "tap",
  focus: "focus", clear: "clear", waitFor: "find", waitForSelector: "find",
  setInputFiles: "upload a file to", dragTo: "drag",
};
const MATCHERS = {
  toBeVisible: "become visible", toBeHidden: "disappear",
  toBeEnabled: "become enabled", toBeDisabled: "become disabled",
  toBeChecked: "be checked", toBeEditable: "become editable",
  toHaveText: "show the expected text", toContainText: "show the expected text",
  toHaveValue: "contain the expected value", toHaveURL: "land on the expected page",
  toHaveTitle: "show the expected title", toHaveCount: "match the expected number of elements",
  toBeAttached: "appear on the page", toBeInViewport: "scroll into view",
  toBeFocused: "receive focus", toHaveAttribute: "have the expected attribute",
  toHaveClass: "have the expected class", toBeEmpty: "be empty",
};

const secs = (ms) => `${Math.round(Number(ms) / 1000)}s`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// "Expected string: 'x' / Received string: 'y'" → short parenthetical
function expectedReceived(err) {
  const e = err.match(/Expected(?: string| pattern| substring| value)?:\s*(.+)/);
  const r = err.match(/Received(?: string| value)?:\s*(.+)/);
  if (!e || !r) return "";
  const trim = (s) => s.trim().replace(/\s+/g, " ").slice(0, 60);
  return ` (expected ${trim(e[1])}, got ${trim(r[1])})`;
}

function genericDescribe(err) {
  const loc = describeLocator(err);

  let m = err.match(/Test timeout of (\d+)ms exceeded/i);
  if (m)
    return {
      text: `The flow got stuck${loc ? ` waiting for ${loc}` : ""} and the test hit its overall ${secs(m[1])} limit before reaching the end.`,
      confident: true,
    };

  m = err.match(/expect[^\n]*\.(to\w+)\(/);
  if (m && MATCHERS[m[1]]) {
    const subj = loc || "the element";
    const t = err.match(/Timed out (\d+)ms/i) || err.match(/Timeout:?\s*(\d+)ms/i);
    if (t) return { text: `Waited ${secs(t[1])} for ${subj} to ${MATCHERS[m[1]]}, but it never did${expectedReceived(err)}.`, confident: true };
    return { text: `${cap(subj)} did not ${MATCHERS[m[1]]}${expectedReceived(err)}.`, confident: true };
  }

  m = err.match(/(?:locator|page|frame|elementHandle)\.(\w+):.{0,40}Timeout (\d+)ms exceeded/s);
  if (m && ACTIONS[m[1]])
    return {
      text: `Timed out after ${secs(m[2])} trying to ${ACTIONS[m[1]]} ${loc || "an element"} — it never appeared or never became actionable.`,
      confident: true,
    };
  if (m && m[1] === "goto")
    return { text: `The page never finished loading (navigation timed out after ${secs(m[2])}).`, confident: true };

  // unrecognized shape — surface the first meaningful line, low confidence
  const firstLine = (err.split("\n").find((l) => l.trim()) || "").trim();
  return { text: firstLine, confident: false };
}

// --- main entry ----------------------------------------------------------------
// test: Playwright JSON-report test object; fullError: complete error message
// (ANSI already stripped by the caller or here — we strip defensively).
function humanize(test, fullError) {
  const err = (fullError || "").replace(/\x1b\[[0-9;]*m/g, "");
  const step = failedStepPath(test);
  const loc = describeLocator(err);
  for (const k of KNOWN) {
    const m = err.match(k.re);
    if (m) return { step, text: typeof k.text === "function" ? k.text(err, loc, m) : k.text, confident: true };
  }
  const g = genericDescribe(err);
  return { step, ...g };
}

// --- layer 3: optional LLM fallback ---------------------------------------------
// One batched call for all low-confidence errors. Best-effort: any failure
// (no key, network, bad response) returns null and the caller keeps the
// generic text. Caller must pass PII-scrubbed error strings.
async function llmSummarize(errors) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || !errors.length) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: process.env.FAILURE_SUMMARY_MODEL || "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system:
          "You explain Playwright end-to-end test failures to a QA team in plain English. " +
          "For each numbered error, reply with the same number followed by ONE sentence (max 25 words) " +
          "describing what went wrong in the user flow. No markdown, no preamble, no personal data.",
        messages: [{ role: "user", content: errors.map((e, i) => `${i + 1}. ${e}`).join("\n\n") }],
      }),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data.content || []).map((b) => b.text || "").join("\n");
    const out = {};
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*(\d+)[.):-]\s*(.+)/);
      if (m) out[Number(m[1]) - 1] = m[2].trim();
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

module.exports = { humanize, failedStepPath, describeLocator, llmSummarize };

// --- CLI (used by the monitor workflows) ----------------------------------------
// `node scripts/humanize-failure.js [test-results.json]` prints one plain-English
// line per failed test, sanitized for embedding in a hand-built Slack JSON
// payload (no double quotes/backslashes; lines joined with a literal \n).
// Prints nothing when there are no failures. Never exits non-zero.
if (require.main === module) {
  try {
    const fs = require("fs");
    const report = JSON.parse(fs.readFileSync(process.argv[2] || "test-results.json", "utf8"));
    const lines = [];
    (function walkCli(suites) {
      for (const s of suites || []) {
        for (const sp of s.specs || [])
          for (const t of sp.tests || []) {
            if (t.status !== "unexpected") continue;
            let err = "";
            for (let i = (t.results || []).length - 1; i >= 0 && !err; i--)
              err = ((t.results[i].errors || [])[0] || {}).message || "";
            const h = humanize(t, err);
            lines.push(`${sp.title}: ${h.step ? `at step "${h.step}" — ` : ""}${h.text}`);
          }
        walkCli(s.suites);
      }
    })(report.suites);
    const clean = (s) =>
      s
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN]") // PII scrub, same rules as classify-failures.js
        .replace(/\b\d{9,}\b/g, "[NUM]")
        .replace(/[\\"]/g, "'")
        .replace(/[\r\n\t]+/g, " ")
        .trim();
    if (lines.length) process.stdout.write(lines.map(clean).join("\\n").slice(0, 900) + "\n");
  } catch {
    /* best-effort: a broken/missing report must not fail the alert step */
  }
}
