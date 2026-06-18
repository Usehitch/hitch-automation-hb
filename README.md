# Homebridge — Playwright E2E Test Suite

End-to-end tests for the **Hitch Broker Portal** (HomeBridge), covering the full HELOC pre-qualification workflow, MLO certification, e-consent documents, and third-party vendor integrations.

---

## Project Structure

> Full per-spec test counts and the project (broker vs LO session) split live in
> [TEST-COVERAGE.md](TEST-COVERAGE.md). The tree below is the file layout.

```
homebridge/
├── tests/                        # Test specs (grouped by flow)
│   ├── auth.setup.js             # Broker login once → .playwright/.auth/user.json
│   ├── auth.setup.lo.js          # Loan Officer login once → .playwright/.auth/lo-user.json
│   │
│   ├── Broker Flow/              # Broker session (chromium project)
│   │   ├── login.spec.js                 # Login — valid credentials
│   │   ├── pre-qual-manual.spec.js       # Pre-Qual manual application (solo + co-borrower)
│   │   ├── loandetail.spec.js            # Loan Detail — Borrowers/Property/Financials/Tracker/Conditions/Documents tabs
│   │   ├── shadow-borrower-view.spec.js  # Shadow Borrower View — modal, cancel, read-only new-tab flow
│   │   ├── econsent.spec.js              # E-Consent — co-borrower method consent document
│   │   ├── twn-monitor.spec.js           # Vendor monitor — The Work Number income verification
│   │   ├── quick-pricer.spec.js          # Quick Pricer — HELOC Rate Calculator, fill, run scenario, history
│   │   ├── credit-and-income.spec.js     # Soft credit pull → DTI without a hard inquiry
│   │   ├── companies.spec.js             # Companies — structure, search, add/edit modals
│   │   ├── company-branches.spec.js      # Company Branches — structure, search, add/edit
│   │   ├── My Loans/
│   │   │   ├── active.spec.js             # Active tab — content, search, filter, certify, view
│   │   │   ├── adversed.spec.js           # Adversed tab — structure, search, filter, certify, view
│   │   │   └── inactive.spec.js           # Inactive tab — structure, search, filter, certify, view
│   │   ├── Manage Emails/
│   │   │   └── manage-emails.spec.js      # Email templates — table, editor, preview, send test, draft, CRUD
│   │   └── Manage Users/
│   │       ├── manage-users.spec.js       # Portal Users — structure, search, pagination, add user modal
│   │       ├── add-user.spec.js           # Create Loan Officer, edit name, verify updated data
│   │       ├── add-role.spec.js           # Add a second role to a user, verify in Role(s) column
│   │       ├── reset-password.spec.js     # Reset Password icon — success toast smoke tests
│   │       ├── deactivate-user.spec.js    # Deactivate User modal — cancel + full deactivation flow
│   │       └── reactivate-user.spec.js    # Re-activate User modal — cancel + deactivate→reactivate cycle
│   │
│   ├── LO Flow/                  # Loan Officer session (chromium-lo project)
│   │   ├── pipeline-management.spec.js     # Pipeline buckets + Pending MLO Certification
│   │   ├── deal-optimization.spec.js       # Optimize DTI via loan amount + debt payoff
│   │   ├── certifications.spec.js          # Certify a pending MLO application
│   │   └── property-applicant-data.spec.js # Trust-type handling — block on irrevocable trust / LLC
│   │
│   └── Borrower Flow/           # Loan Officer session (chromium-lo project)
│       ├── invitation.spec.js              # LO creates pre-qual, borrower(s) receive invitation
│       ├── support.spec.js                 # Help desk widget — LO + borrower access
│       └── Co-Borrower/
│           ├── coborrower.spec.js                  # Co-borrower E2E via shareable link (married + unmarried)
│           ├── verification-documentation.spec.js  # Borrower verifies income via Plaid
│           └── loan-hub.spec.js                    # Loan Hub — to-do list, document center, loan tracker
│
├── pages/                        # Page Object Models
│   ├── LoginPage.js
│   ├── Pre-Qual Manual/
│   │   ├── PreQualManualPage.js
│   │   ├── NewApplicationPage.js
│   │   ├── MortgagesAndLiensPage.js
│   │   ├── OfferReviewPage.js
│   │   ├── ConsentsPage.js
│   │   ├── ConfirmationPage.js
│   │   └── CoBorrowerFlowPage.js
│   ├── My Loans/
│   │   ├── ActivePage.js
│   │   ├── MloCertificationModal.js
│   │   ├── LoanDetailPage.js
│   │   └── ShadowBorrowerViewPage.js
│   ├── Quick Pricer/
│   │   └── QuickPricerPage.js
│   ├── Companies/
│   │   └── CompaniesPage.js
│   ├── Company Branches/
│   │   └── CompanyBranchesPage.js
│   ├── Manage Emails/
│   │   ├── ManageEmailsPage.js
│   │   └── NewEmailTemplatePage.js
│   ├── Manage Users/
│   │   └── ManageUsersPage.js
│   ├── Support/
│   │   └── HelpDeskWidget.js
│   └── The Work Number/
│       └── TWNPage.js
│
├── data/                         # Test data
│   ├── shared.js                 # Shared property + borrower constants
│   ├── newApplication.js         # Broker portal application data (solo + co-borrower)
│   ├── coBorrowerDTCData.js      # Co-borrower direct-to-consumer flow data
│   ├── dealOptimization.js       # LO deal-optimization scenario data
│   ├── twnApplication.js         # TWN borrower flow data
│   ├── companiesData.js          # Companies — create + edit data with realistic fields
│   └── companyBranchesData.js    # Company Branches — create + edit data with realistic fields
│
├── fixtures/
│   └── index.js                  # Extends Playwright test with all page object fixtures
│
├── services/
│   └── otp.service.js            # TOTP generator for MFA login
│
├── utils/
│   ├── dataGenerator.js          # randomEmail() helper
│   ├── routeHelpers.js           # withProcessAppRetry() — intercepts processApplication 500s
│   └── checkboxHelpers.js        # checkAllCheckboxes() — MUI checkbox loop
│
└── playwright.config.js
```

---

## Prerequisites

- Node.js (LTS)
- Chromium (installed via Playwright)

---

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Run in Playwright debug mode |
| `npm run report` | Open the last HTML report |

Run a single spec:

```bash
npx playwright test "tests/Broker Flow/My Loans/active.spec.js"
```

---

## Authentication

Two setup projects run once before the suite, each logging in with email/password + TOTP:

- `auth.setup.js` → broker session at `.playwright/.auth/user.json` (used by the `chromium` project)
- `auth.setup.lo.js` → loan officer session at `.playwright/.auth/lo-user.json` (used by the `chromium-lo` project)

All other tests reuse the saved session for their project — no repeated logins. The `chromium-lo` project covers the Co-Borrower, invitation, certifications, pipeline-management, property-applicant-data, and deal-optimization specs; everything else runs under `chromium`. See [playwright.config.js](playwright.config.js).

---

## CI / GitHub Actions

> **Before any workflow will pass, all required secrets must be configured.**
> Go to **Settings → Secrets and variables → Actions → New repository secret** and add each one below.
> Missing secrets cause an immediate, clearly-labelled failure in the "Validate required secrets" step rather than a cryptic URL error inside the test runner.

### `playwright.yml`
Runs the full test suite on every push/PR to `main` or `master`. Uploads the HTML report as an artifact (retained 30 days).

Required secrets:

| Secret | Description |
|---|---|
| `BASE_URL` | Staging portal URL (e.g. `https://staging.usehitch.com`) |
| `EMAIL` | Broker portal login email |
| `PASSWORD` | Broker portal login password |
| `OTP_SECRET` | Base32 TOTP secret for MFA |

### `twn-monitor.yml`
Runs `twn-monitor.spec.js` every **30 minutes** (and on manual dispatch) to confirm The Work Number integration is live on staging. Sends a Slack alert on failure — the Slack step uses `continue-on-error: true`, so a missing webhook never masks the real test failure.

Required secrets (in addition to the four above):

| Secret | Description |
|---|---|
| `SLACK_WEBHOOK_URL` | Incoming webhook URL for failure notifications (optional — alert is skipped silently if not set) |


---

## Local Development (VS Code)

Install the **Playwright Test for VSCode** extension (Microsoft) to run, debug, and step through individual tests directly from the editor without using the terminal.

1. Open the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for **Playwright Test for VSCode** and install it
3. Open the Testing panel (`Ctrl+Shift+T` / `Cmd+Shift+T`) to browse and run specs
