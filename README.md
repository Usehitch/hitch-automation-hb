# Homebridge — Playwright E2E Test Suite

End-to-end tests for the **Hitch Broker Portal** (HomeBridge), covering the full HELOC pre-qualification workflow, MLO certification, e-consent documents, and third-party vendor integrations.

---

## Project Structure

```
homebridge/
├── tests/                        # Test specs
│   ├── auth.setup.js             # Login once, save session to .playwright/.auth/
│   ├── login.spec.js             # Login flow
│   ├── pre-qual-manual.spec.js   # Pre-Qual manual application flow (solo + co-borrower)
│   ├── myloans.spec.js           # My Loans dashboard — content, search, filter, certify, view
│   ├── econsent.spec.js          # E-Consent — co-borrower method consent document
│   └── twn-monitor.spec.js       # Vendor monitor — The Work Number income verification
│
├── pages/                        # Page Object Models
│   ├── LoginPage.js
│   ├── Pre-Qual Manual/
│   │   ├── PreQualManualPage.js
│   │   ├── NewApplicationPage.js
│   │   ├── MortgagesAndLiensPage.js
│   │   ├── OfferReviewPage.js
│   │   ├── ConsentsPage.js
│   │   └── ConfirmationPage.js
│   ├── My Loans/
│   │   ├── ActivePage.js
│   │   ├── MloCertificationModal.js
│   │   └── LoanDetailPage.js
│   └── The Work Number/
│       └── TWNPage.js
│
├── data/                         # Test data
│   ├── shared.js                 # Shared property + borrower constants
│   ├── newApplication.js         # Broker portal application data (solo + co-borrower)
│   └── twnApplication.js         # TWN borrower flow data
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
npx playwright test tests/myloans.spec.js
```

---

## Authentication

`auth.setup.js` runs once before the test suite. It logs in with email/password + TOTP and saves the browser session to `.playwright/.auth/user.json`. All other tests reuse this session — no repeated logins.

---

## CI / GitHub Actions

### `playwright.yml`
Runs the full test suite on every push/PR to `main` or `master`. Uploads the HTML report as an artifact (retained 30 days).

Requires these repository secrets:

| Secret | Description |
|---|---|
| `BASE_URL` | Staging portal URL |
| `EMAIL` | Broker portal login email |
| `PASSWORD` | Broker portal login password |
| `OTP_SECRET` | Base32 TOTP secret for MFA |

### `twn-monitor.yml`
Runs `twn-monitor.spec.js` every **30 minutes** (and on manual dispatch) to confirm The Work Number integration is live on staging. Sends a Slack alert on failure.

Requires an additional secret:

| Secret | Description |
|---|---|
| `SLACK_WEBHOOK_URL` | Incoming webhook for failure notifications |
