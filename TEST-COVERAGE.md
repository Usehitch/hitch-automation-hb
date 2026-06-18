# Test Coverage

End-to-end Playwright coverage for the Hitch Broker Portal (HomeBridge) HELOC workflow.
**29 spec files · ~130 tests** across three flows, run against staging.

> Counts below are declared `test(...)` blocks. Several tests `test.skip(...)` at runtime
> when staging lacks the required data (e.g. no loan pending MLO certification), so the
> number actually executed varies per run — those cases are flagged as **data-gated**.

## How tests are partitioned (Playwright projects)

Tests run under two saved sessions, selected by path in [playwright.config.js](playwright.config.js):

| Project | Session | Scope |
|---|---|---|
| `chromium` | `.playwright/.auth/user.json` (broker) | Everything **except** the LO/Borrower specs below |
| `chromium-lo` | `.playwright/.auth/lo-user.json` (loan officer) | `Co-Borrower/*`, `invitation`, `certifications`, `pipeline-management`, `property-applicant-data`, `deal-optimization` |

Each project depends on its own `setup` / `setup-lo` login. Tests run sequentially within a
file (`fullyParallel: false`) to protect shared staging data; CI uses 2 workers + 1 retry.

---

## Broker Flow — admin / portal (`chromium`)

| Area | Spec | Tests | Notes |
|---|---|---|---|
| Login | [login.spec.js](tests/Broker%20Flow/login.spec.js) | 1 | Valid credentials smoke |
| Companies (CRU) | [companies.spec.js](tests/Broker%20Flow/companies.spec.js) | 11 | Heading, search, columns, pagination, add/edit modals, create + edit |
| Company Branches (CRU) | [company-branches.spec.js](tests/Broker%20Flow/company-branches.spec.js) | 11 | Same shape as Companies; search by NMLS |
| Quick Pricer (HELOC calc) | [quick-pricer.spec.js](tests/Broker%20Flow/quick-pricer.spec.js) | 12 | Tabs, fill sample data, run scenario, invite borrower, history |
| Loan Detail | [loandetail.spec.js](tests/Broker%20Flow/loandetail.spec.js) | 26 | Per-tab breakdown below |
| Shadow Borrower View | [shadow-borrower-view.spec.js](tests/Broker%20Flow/shadow-borrower-view.spec.js) | 3 | Modal open, cancel, read-only continue |
| The Work Number (TWN) | [twn-monitor.spec.js](tests/Broker%20Flow/twn-monitor.spec.js) | 1 | Vendor monitor — runs every 30 min in CI, Slack alert on fail |
| Credit & Income | [credit-and-income.spec.js](tests/Broker%20Flow/credit-and-income.spec.js) | 1 | Soft credit pull → DTI, no hard inquiry |
| Pre-Qual Manual | [pre-qual-manual.spec.js](tests/Broker%20Flow/pre-qual-manual.spec.js) | 2 | New application; with co-borrower |
| E-Consent | [econsent.spec.js](tests/Broker%20Flow/econsent.spec.js) | 1 | Co-borrower method consent captured in Documents |
| Manage Emails (CRUD) | [manage-emails.spec.js](tests/Broker%20Flow/Manage%20Emails/manage-emails.spec.js) | 13 | Templates table, editor, preview, send test, draft, create/update/delete |
| Manage Users | [manage-users.spec.js](tests/Broker%20Flow/Manage%20Users/manage-users.spec.js) | 14 | Page chrome, search, pagination, Add User modal |
| Manage Users — Add/Edit | [add-user.spec.js](tests/Broker%20Flow/Manage%20Users/add-user.spec.js) | 2 | Create Loan Officer, edit name |
| Manage Users — Add Role | [add-role.spec.js](tests/Broker%20Flow/Manage%20Users/add-role.spec.js) | 2 | |
| Manage Users — Deactivate | [deactivate-user.spec.js](tests/Broker%20Flow/Manage%20Users/deactivate-user.spec.js) | 2 | |
| Manage Users — Re-activate | [reactivate-user.spec.js](tests/Broker%20Flow/Manage%20Users/reactivate-user.spec.js) | 2 | Modal-structure test **data-gated** (needs a deactivated user) |
| Manage Users — Reset Password | [reset-password.spec.js](tests/Broker%20Flow/Manage%20Users/reset-password.spec.js) | 2 | Success-toast smoke |
| My Loans — Active | [active.spec.js](tests/Broker%20Flow/My%20Loans/active.spec.js) | 4 | Content, search/filter, certify MLO, view app |
| My Loans — Adversed | [adversed.spec.js](tests/Broker%20Flow/My%20Loans/adversed.spec.js) | 7 | Certify + View **data-gated** |
| My Loans — Inactive | [inactive.spec.js](tests/Broker%20Flow/My%20Loans/inactive.spec.js) | 7 | Certify + View **data-gated** |

### Loan Detail — per-tab breakdown (26 tests)

| Tab | Tests | What's covered |
|---|---|---|
| Borrowers | 2 | Personal/employment info visible; name matches shared applicant |
| Property | 3 | Core labels present; address; type & usage match shared data |
| Financials | 2 | Metric labels present; borrower appears in credit-info table |
| Tracker | 6 | Stepper + current-stage panel, step rows, Identity Verification card, Credit Check (6 pull fields), Valuation/Initial Offer rows, current-stage highlight |
| Conditions | 5 | Sub-tabs + progress counter, Borrower/Lender task areas, re-render, no JS error boundary |
| Documents | 8 | Sidebar compliance categories + Refresh; PDF viewer for Soft Credit Pull Consent, Broker MLO Cert, CFPB Ack, Borrower Consent, esigned method consent, AVM Report |

---

## LO Flow (`chromium-lo`)

| Area | Spec | Tests | Notes |
|---|---|---|---|
| Pipeline Management | [pipeline-management.spec.js](tests/LO%20Flow/pipeline-management.spec.js) | 2 | View buckets; Pending MLO Certification bucket (**data-gated**) |
| Deal Optimization | [deal-optimization.spec.js](tests/LO%20Flow/deal-optimization.spec.js) | 1 | Optimize DTI via loan amount + debt payoff |
| Certifications | [certifications.spec.js](tests/LO%20Flow/certifications.spec.js) | 1 | Certify pending MLO application |
| Property & Applicant Data | [property-applicant-data.spec.js](tests/LO%20Flow/property-applicant-data.spec.js) | 3 | Parametrized: blocked on **Irrevocable Trust** and **LLC**; revocable-trust control proceeds |

---

## Borrower Flow (`chromium-lo`)

| Area | Spec | Tests | Notes |
|---|---|---|---|
| Invitation | [invitation.spec.js](tests/Borrower%20Flow/invitation.spec.js) | 2 | Scenario A (solo invite); Scenario B (with co-borrower) — long timeouts (16–21 min) |
| Support / Help Desk widget | [support.spec.js](tests/Borrower%20Flow/support.spec.js) | 2 | LO access; borrower access (AI bot + submit ticket) |
| Co-Borrower E2E | [coborrower.spec.js](tests/Borrower%20Flow/Co-Borrower/coborrower.spec.js) | 2 | Married; unmarried — full flow incl. 2× Plaid + credit pull + offer |
| Verification & Documentation | [verification-documentation.spec.js](tests/Borrower%20Flow/Co-Borrower/verification-documentation.spec.js) | 1 | Income via Plaid bank link |
| Loan Hub | [loan-hub.spec.js](tests/Borrower%20Flow/Co-Borrower/loan-hub.spec.js) | 1 | To-do list, document center, loan tracker |

---

## Coverage gaps & known issues

- **Thinnest coverage** is the end-to-end borrower journeys (1–2 tests each, multi-minute
  timeouts) and the LO single-action flows (deal optimization, certification).
- **Data-gated skips**: Pending MLO Certification (Active/Adversed/Inactive/Pipeline),
  adversed/inactive "View" buttons, and the re-activate modal-structure test all skip when
  staging lacks the prerequisite record. Real executed coverage is lower than the declared count.
- **Known flake (product-side):** the co-borrower DTC flow intermittently fails at the
  "You're pre-qualified" step on staging. This blocks the downstream Verification &
  Documentation and Loan Hub borrower tests.
