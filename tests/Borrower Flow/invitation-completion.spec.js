/**
 * LO-Initiated Pre-Qual — Invitation COMPLETION Flow
 *
 * invitation.spec.js proves the invitation emails are DELIVERED. This spec
 * proves they are ACTIONABLE: the invited borrower (and co-borrower) click
 * the email CTA and complete their side of the application.
 *
 * Scenario A — Borrower completes the invited application:
 *   A1. LO creates a manual pre-qual (fresh borrower email)
 *   A2. Borrower opens the "You've been prequalified" email → REVIEW OFFER
 *   A3. /borrower/invite/<token> → "Tell us about yourself" account setup
 *       (email + password + e-consent; phone comes pre-filled from LO data)
 *   A4. /borrower/offer → "You're pre-qualified" banner with the loan terms
 *   A5. CONTINUE TO APPLICATION → /app/other-info (Marital Status +
 *       Title-Only Owners — the data the LO flow never collects)
 *   A6. Demographics (when shown) → opt-outs + hard-credit authorization
 *   A7. Lands on Income Verification (Plaid / payroll / manual options) —
 *       terminal assertion; income verification itself is covered by
 *       verification-documentation.spec.js
 *
 * Scenario B — Co-borrower completes the invited application:
 *   B1. LO creates a manual pre-qual WITH co-borrower (fresh emails)
 *   B2. Co-borrower opens the "invited to apply" email → COMPLETE APPLICATION
 *   B3. /coborrower/invite/<token> → "Hi, <name>" Review Information page
 *       (main applicant, property, selected offer) → START APPLICATION
 *   B4. "Tell us about yourself" account setup (no phone OTP for LO-invited
 *       co-borrowers, unlike the DTC-invited path)
 *   B5. /coborrower/eligibility → declares income (Salary + job details —
 *       the LO flow never collects co-borrower income) + consents → CONTINUE
 *
 * Flow sequences confirmed against HBWHS staging DOM dumps (2026-07-03).
 * NOTE: invite tokens are single-use — once account setup completes, the
 * invite link redirects to /app/login?reason=session_expired. Each run/retry
 * must therefore create a fresh loan (fresh factory emails guarantee this).
 *
 * Runs under the LO session via the chromium-lo project (see
 * playwright.config.js). Emails are Mailinator public inboxes — no real PII;
 * SSNs are Method Fi sandbox values.
 */

import { test, expect } from '../../fixtures';
import { makeApplicationData, makeCoBorrowerApplicationData } from '../../data/newApplication';
import { openInvitationEmailAndGetLink } from '../../utils/emailHelpers';
import InviteSetupPage from '../../pages/Borrower Invite/InviteSetupPage';
import CoBorrowerFlowPage from '../../pages/Pre-Qual Manual/CoBorrowerFlowPage';

// Meets the platform's complexity rules shown on the account-setup form:
// 8+ chars, 1 number, 1 special, 1 uppercase, 1 lowercase.
const INVITED_USER_PASSWORD = 'Testing123!';

/**
 * LO-side pre-qual, Start App → Confirmation → portal dashboard. Minimal
 * Offer Review path — the coverage target here is the borrower/co-borrower
 * invite journey, not the LO levers (covered by pre-qual-manual.spec.js).
 */
async function runLOPreQual(data, {
    preQualManualPage,
    newApplicationPage,
    mortgagesAndLiensPage,
    offerReviewPage,
    consentsPage,
    confirmationPage,
}) {
    await preQualManualPage.clickStartApp();
    await preQualManualPage.clickStartPreQualManually();
    await newApplicationPage.fillApplicationDetails(data);
    await newApplicationPage.clickNext();

    await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
    await mortgagesAndLiensPage.fillMortgagesAndLiens(data);
    await mortgagesAndLiensPage.clickNext();

    await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
    await offerReviewPage.acknowledgeDtiLimit();
    await offerReviewPage.clickNext();

    await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
    await consentsPage.checkAllCertifications();
    await consentsPage.fillBrokerMloName(data);
    await consentsPage.verifySignature(data);
    await consentsPage.clickNext();

    await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
    await confirmationPage.clickClose();
    await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });
}

test.describe('LO Invitation — completion flows', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Scenario A: invited borrower opens the email and completes the application', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    }) => {
        // LO create (~11 min worst case) + email delivery (up to 3 min) +
        // borrower-side steps. 16 min covers the stack.
        test.setTimeout(960000);

        // Fresh email per run/retry — both for the standard "already associated"
        // reason AND because invite tokens are single-use (see header).
        const appData = makeApplicationData();

        await test.step('A1 — LO creates the pre-qual', async () => {
            await runLOPreQual(appData, {
                preQualManualPage,
                newApplicationPage,
                mortgagesAndLiensPage,
                offerReviewPage,
                consentsPage,
                confirmationPage,
            });
        });

        const inviteUrl = await openInvitationEmailAndGetLink(
            page.context(),
            appData.applicant.email,
            'A — borrower invite',
        );

        // Isolated context: the borrower must browse with NO trace of the LO's
        // portal session.
        const borrowerCtx = await page.context().browser().newContext();
        try {
            const borrowerTab = await borrowerCtx.newPage();
            const flow = new CoBorrowerFlowPage(borrowerTab);

            await test.step('A3 — account setup from the invite link', async () => {
                await borrowerTab.goto(inviteUrl, { waitUntil: 'domcontentloaded' });
                const inviteSetup = new InviteSetupPage(borrowerTab);
                await inviteSetup.completeAccountSetup({
                    email: appData.applicant.email,
                    password: INVITED_USER_PASSWORD,
                });
            });

            await test.step('A4/A5 — offer page → CONTINUE TO APPLICATION', async () => {
                // Sanity-check the offer terms rendered before continuing.
                await expect(borrowerTab.getByText(/Requested Loan Amount/i).first())
                    .toBeVisible({ timeout: 60000 });
                // verifyFlowCompleted waits for the "You're pre-qualified" banner,
                // clicks CONTINUE TO APPLICATION, and re-points flow.page if the
                // app opens a new tab.
                await flow.verifyFlowCompleted();
            });

            await test.step('A5 — fill Other Info (marital status + title-only owners)', async () => {
                await flow.fillOtherInfo({
                    borrower: { maritalStatus: 'Unmarried' },
                    participants: { otherTitleOwners: false },
                });
            });

            await test.step('A6 — fill Demographics when shown', async () => {
                // Demographics sits between Other Info and Income Verification in
                // the DTC sequence; keep it conditional in case the invited-borrower
                // sequence skips it.
                const hasDemographics = await flow.page
                    .getByText(/I do not wish to provide this information/i)
                    .first()
                    .isVisible({ timeout: 15000 })
                    .catch(() => false);
                if (hasDemographics) {
                    await flow.fillDemographics();
                } else {
                    console.warn('Scenario A: Demographics not shown after Other Info — continuing to Income Verification check');
                }
            });

            await test.step('A7 — borrower reaches Income Verification', async () => {
                await flow.verifyIncomeVerificationOptions();
            });
        } finally {
            await borrowerCtx.close().catch(() => { });
        }
    });

    test('Scenario B: invited co-borrower opens the email and completes their portion', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    }) => {
        // Co-borrower creates run two credit pulls on the LO side; add email
        // delivery + co-borrower steps on top.
        test.setTimeout(1260000);

        // Fresh emails per run/retry — invite tokens are single-use.
        const appData = makeCoBorrowerApplicationData();

        await test.step('B1 — LO creates the pre-qual with co-borrower', async () => {
            await runLOPreQual(appData, {
                preQualManualPage,
                newApplicationPage,
                mortgagesAndLiensPage,
                offerReviewPage,
                consentsPage,
                confirmationPage,
            });
        });

        const inviteUrl = await openInvitationEmailAndGetLink(
            page.context(),
            appData.coBorrower.email,
            'B — co-borrower invite',
        );

        const coBorrowerCtx = await page.context().browser().newContext();
        try {
            const cbTab = await coBorrowerCtx.newPage();

            await test.step('B3 — review invitation and start the application', async () => {
                await cbTab.goto(inviteUrl, { waitUntil: 'domcontentloaded' });

                // "Hi, <name> 👋" review page: main applicant info, property,
                // and the selected offer, with a single START APPLICATION action.
                await expect(cbTab.getByText(/You've been invited to apply as a co-borrower/i))
                    .toBeVisible({ timeout: 60000 });
                await expect(cbTab.getByText(/Review Information/i).first()).toBeVisible();
                await expect(cbTab.getByText(appData.coBorrower.firstName).first()).toBeVisible();

                await cbTab.getByRole('button', { name: /Start Application/i }).click();
            });

            await test.step('B4 — co-borrower account setup', async () => {
                const inviteSetup = new InviteSetupPage(cbTab);
                await inviteSetup.completeAccountSetup({
                    email: appData.coBorrower.email,
                    password: INVITED_USER_PASSWORD,
                });
            });

            await test.step('B5 — declare income and consent on Check Your Eligibility', async () => {
                await expect(cbTab.getByText('Check Your Eligibility')).toBeVisible({ timeout: 60000 });

                // Income was never collected by the LO — declare Salary and fill
                // the job editor it reveals.
                const salaryCheckbox = cbTab.getByRole('checkbox', { name: /Salary or Hourly Wages/i });
                await salaryCheckbox.evaluate(el => el.click());

                const companyInput = cbTab.getByLabel(/Company Name/i).first();
                await companyInput.waitFor({ state: 'visible', timeout: 10000 });
                await companyInput.fill('Hitch');
                await companyInput.press('Tab');

                const compensationInput = cbTab.getByLabel(/Total Annual Compensation/i).first();
                await compensationInput.fill('120000');
                await compensationInput.press('Tab');

                const startDateInput = cbTab.getByLabel(/Start Date/i).first();
                if (await startDateInput.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await startDateInput.fill('01/01/2020');
                    await startDateInput.press('Tab');
                }
                const doneEditing = cbTab.getByRole('button', { name: /Done Editing/i }).first();
                if (await doneEditing.isVisible({ timeout: 3000 }).catch(() => false)) {
                    await doneEditing.click({ force: true });
                }

                // The declared salary must land in the Total Annual Income row.
                await expect(cbTab.getByText(/\$120,000/).first()).toBeVisible({ timeout: 10000 });

                // Consent checkboxes are the last two on the page (income-source
                // checkboxes come first) — same DOM pattern as the DTC eligibility.
                const allCheckboxes = cbTab.locator('input[type="checkbox"]');
                const count = await allCheckboxes.count();
                for (const idx of [count - 2, count - 1]) {
                    const cb = allCheckboxes.nth(idx);
                    if (!(await cb.isChecked().catch(() => false))) {
                        await cb.evaluate(el => el.click());
                    }
                }

                const continueBtn = cbTab.getByRole('button', { name: /continue/i }).first();
                await expect(continueBtn).toBeEnabled({ timeout: 15000 });
                await continueBtn.click();

                // Terminal assertion: the eligibility submission is accepted and
                // the flow advances off /coborrower/eligibility.
                await cbTab.waitForURL(/^(?!.*eligibility).*$/, { timeout: 120000 });
            });
        } finally {
            await coBorrowerCtx.close().catch(() => { });
        }
    });
});
