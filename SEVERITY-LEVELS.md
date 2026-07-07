# Failure Severity Levels

How to triage a failing test in this suite. When a spec goes red — locally, in the
nightly run, or in CI — classify it into one of the three levels below before
escalating. The goal is to fix script noise ourselves, confirm ambiguous cases with
the product owners, and only route genuine product defects to the dev team.

> **PII reminder:** when logging or escalating a failure, identify loans by **loan
> number or email**, never by borrower name.

---

## Quick reference

| Level | Cause | Who owns it | Action |
|---|---|---|---|
| 🟢 **Low** | Test / automation issue (the script, not the product) | Us (QA / automation) | Fix the script and re-run |
| 🟡 **Medium** | Unclear — looks like a product change or expected behavior | Confirm with **Herbert** or **Eunice** | Confirm before touching anything |
| 🔴 **High** | Confirmed product defect | Dev team | Report to / assign a developer |

---

## 🟢 Low — caused by the script

The product is working; the **test** is at fault. We own the fix — no need to bother
product or dev.

**Typical signs**
- Locator broke after a harmless markup change (stale selector, `.first()` matching a
  hidden duplicate span).
- Flaky timing / race — passes on retry.
- Element intercepted by an overlay (the floating **"TEST DATA"** chip or the
  **"Hi. Need any help?"** chat bubble blocking a click).
- Test data collision (e.g. "email already associated" — needs a fresh factory email).
- Infra hiccup unrelated to the product (staging 502, expired auth session).

**Action**
1. Reproduce locally (`npx playwright test "<spec>"`, use `--headed` / `--debug`).
2. Fix the script — re-target the locator, add the right wait, dismiss the overlay,
   or use a fresh data factory.
3. Re-run to confirm green. **No escalation needed.**

---

## 🟡 Medium — confirm with Herbert or Eunice

The failure **might** be a real product change (new copy, moved field, new required
step, a modal that didn't exist before) — but it could also be intended behavior we
just haven't updated the test for. We don't know if it's a bug or a deliberate change.

**Typical signs**
- Button/label text changed (e.g. "Get Started Now" → "Get Started").
- A new step, modal, or required field appeared in a flow.
- A field now pre-fills or behaves differently than the test expects.
- Assertion fails on something that *looks* deliberate, not broken.

**Action**
1. Capture evidence — screenshot, the failing assertion, and the loan number / email.
2. **Confirm with Herbert or Eunice**: is this an intended change or a defect?
   - **Intended change →** downgrade to 🟢 Low and update the test to match.
   - **Defect →** escalate to 🔴 High.
3. Don't rewrite the test or file a dev ticket until you have that confirmation.

---

## 🔴 High — report to / assign a developer

A **confirmed product defect**: the app is broken, and it's not the script's fault.
Either it's obvious (error page, crash, data loss) or Herbert/Eunice confirmed a
Medium case is a real bug.

**Typical signs**
- Unhandled error / 500 / blank page in the product (not staging infra).
- A core flow can't complete — pre-qual won't submit, certification fails, offer
  never generates.
- Wrong data persisted or shown (incorrect DTI, wrong offer amount).
- Security / access issue (a user seeing data they shouldn't).

**Action**
1. Gather full evidence — trace, screenshot, steps to reproduce, and the loan number /
   email (no borrower names).
2. **Report to dev / assign a developer** with severity, affected flow, and evidence.
3. Track it; keep the spec red (or `test.fixme` with a linked ticket) until dev
   ships a fix — don't mask a real defect by editing the test.

---

## Decision flow

```
Test fails
   │
   ├─ Is the product actually working, and only the script broke? ──► 🟢 LOW  (fix the script)
   │
   ├─ Not sure — looks like a product/UI change or intended behavior?
   │        └─► 🟡 MEDIUM — confirm with Herbert or Eunice
   │                 ├─ Intended change ──► 🟢 LOW  (update the test)
   │                 └─ Confirmed defect ─► 🔴 HIGH
   │
   └─ Clearly a product defect (error, broken flow, wrong data)? ──► 🔴 HIGH (assign a dev)
```
