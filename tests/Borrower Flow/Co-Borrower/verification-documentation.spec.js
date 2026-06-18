/**
 * Borrower / Co-Borrower Flow — Verification and Documentation
 * ---------------------------------------------------------------------------
 * Feature under test:
 *   Borrowers can link their banking and payroll information securely using
 *   services like Plaid or The Work Number (TrueWork), or they can choose to
 *   upload documents manually.
 *
 * The Income Verification page (step 16 of the DTC borrower flow) presents
 * three options:
 *   1. Connect Checking Account         — link banking via Plaid
 *   2. Login to Company Payroll Account — link payroll via The Work Number
 *   3. Upload Income Documents Manually — manual documentation
 *
 * This spec:
 *   • Drives the borrower DTC flow to the Income Verification page.
 *   • Asserts all three verification / documentation options are offered
 *     (verifyIncomeVerificationOptions).
 *   • Completes the BANKING (Plaid sandbox) path end-to-end and confirms the
 *     "Bank Account Verified Successfully" outcome.
 *
 * Scope notes:
 *   • Only the Plaid banking path is exercised here — it is the one path with
 *     confirmed, reliable DOM. The Payroll (TrueWork) and Manual-upload paths
 *     have best-effort, TODO-flagged scaffolding on CoBorrowerFlowPage
 *     (selectIncomeVerificationMethod / uploadIncomeDocumentsManually /
 *     completePayrollVerification) to be enabled once their live DOM is
 *     confirmed.
 *   • Income Verification sits AFTER the pre-qualification / offer step
 *     (verifyFlowCompleted). If that step is failing on staging (a known
 *     co-borrower offer-generation issue), this test will not reach the
 *     verification step until the product issue is resolved — the flow driver
 *     below is intentionally identical to the co-borrower E2E so it becomes
 *     green the moment the offer step is.
 */

import { test, expect } from '../../../fixtures';
import TWNPage from '../../../pages/The Work Number/TWNPage';
import CoBorrowerFlowPage from '../../../pages/Pre-Qual Manual/CoBorrowerFlowPage';
import { makeMarriedCoBorrowerData } from '../../../data/coBorrowerDTCData';

// ---------------------------------------------------------------------------
// Flow driver — steps 1–15, stopping at the Income Verification page
// ---------------------------------------------------------------------------

/**
 * Drives the borrower DTC flow from the shareable link up to (and including)
 * the Demographics step, leaving the borrower on the Income Verification page.
 * Mirrors the step sequence in coborrower.spec.js (steps 1–15).
 *
 * @param {object} preQualManualPage  PreQualManualPage fixture (portal tab)
 * @param {object} data               makeMarriedCoBorrowerData() payload
 * @returns {Promise<CoBorrowerFlowPage>} flow page object on the borrower tab
 */
async function driveToIncomeVerification(preQualManualPage, data) {
    // -- Step 1: Open shareable link in a new tab ----------------------------
    const borrowerTab = await preQualManualPage.openShareableLinkInNewTab();
    const twnPage = new TWNPage(borrowerTab);
    const flow = new CoBorrowerFlowPage(borrowerTab);

    // -- Steps 2–8: TWN landing → property → about you → credit → income -----
    await twnPage.clickGetStartedNow();
    await flow.assertNoBlockingError('Landing page');

    await twnPage.selectPropertyType(data);
    await flow.assertNoBlockingError('Property type');

    await twnPage.selectLoanPurpose(data);
    await flow.assertNoBlockingError('Loan purpose');

    await twnPage.fillPropertyInfo(data);
    await flow.assertNoBlockingError('Property info');

    await twnPage.fillAboutYourself(data);
    await flow.assertNoBlockingError('About yourself');

    await twnPage.fillCreditCheck(data);
    await flow.assertNoBlockingError('Primary credit check');

    await twnPage.fillPrimaryIncomeSources(data);
    await flow.assertNoBlockingError('Primary income sources');

    // -- Step 9: Review & Confirm consents (triggers credit pull) ------------
    await flow.fillReviewAndConfirm();
    await flow.assertNoBlockingError('Review & Confirm consents');

    // -- Step 10: "Checking Your Credit…" processing -------------------------
    await flow.waitForCreditCheckProcessing();
    await flow.assertNoBlockingError('Credit check processing');

    // -- Step 11: Application Participants (co-borrower details) --------------
    await flow.fillApplicationParticipants(data);
    await flow.assertNoBlockingError('Application Participants');

    // -- Step 12: Mortgages & Liens ------------------------------------------
    await flow.fillMortgagesAndLiens(data);
    await flow.assertNoBlockingError('Mortgages & Liens');

    // -- Step 13: Offer calculation processing -------------------------------
    await flow.waitForOfferProcessing();
    await flow.assertNoBlockingError('Offer processing');

    // -- Step 14: Pre-qualification completed → Continue to Application ------
    await flow.verifyFlowCompleted();
    await flow.assertNoBlockingError('Pre-qual offer page');

    // -- Step 14b/15: Other Info → Demographics ------------------------------
    await flow.fillOtherInfo(data);
    await flow.assertNoBlockingError('Other Info');

    await flow.fillDemographics();
    await flow.assertNoBlockingError('Demographics');

    return flow;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Borrower Flow — Verification and Documentation', () => {

    // 8 min — full flow includes TWN lookup, soft credit pull, offer calc, and
    // the Plaid sandbox verification.  Matches the co-borrower E2E timeout.
    test.setTimeout(480000);

    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Borrower verifies income by linking a bank account via Plaid', async ({
        preQualManualPage,
    }) => {
        // Fresh emails per attempt — a retry must not reuse the prior attempt's
        // borrower/co-borrower emails or it hits duplicate-account errors.
        const data = makeMarriedCoBorrowerData();

        const flow = await driveToIncomeVerification(preQualManualPage, data);

        // -- Verification & Documentation: all three options are offered -----
        await flow.verifyIncomeVerificationOptions();
        await flow.assertNoBlockingError('Income verification options');

        // -- Banking path: complete Plaid sandbox verification ---------------
        // fillIncomeVerification selects the (pre-selected) Connect Checking
        // Account card, runs the Plaid sandbox (phone → OTP → Tartan Bank →
        // Confirm), asserts "Bank Account Verified Successfully", clicks
        // Continue, and waits for the Funding Account page.
        await flow.fillIncomeVerification();
        await flow.assertNoBlockingError('Bank account verification (Plaid)');

        // -- Confirm the borrower advanced past income verification ----------
        // fillIncomeVerification navigates to /funding-account on success.
        await expect(flow.page).toHaveURL(/funding-account/i, { timeout: 80000 });
    });

});
