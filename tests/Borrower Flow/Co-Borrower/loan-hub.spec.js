/**
 * Borrower / Co-Borrower Flow — Loan Hub
 * ---------------------------------------------------------------------------
 * Feature under test:
 *   The Loan Hub is the borrower's central area after submission. It provides:
 *     1. a clear to-do list,
 *     2. a document center for viewing / downloading files,
 *     3. a visual loan tracker indicating progress through the stages.
 *
 * This spec drives the borrower DTC flow all the way to the Loan Hub (step 18,
 * reached after Income Verification + Funding Account) and asserts each of the
 * three areas.
 *
 * Scope notes (confirmed against a live Loan Hub run):
 *   • The Loan Hub exposes three tabs — "BORROWER'S TO-DO LIST", "DOCUMENTS",
 *     and "LOAN TRACKER" — matching the three feature areas.
 *   • Confirmed hard assertions: the welcome banner, the pipeline phases, the
 *     three tab labels, and the loan-tracker contents (current "Stage N:"
 *     label + "N/M steps completed").
 *   • Best-effort / TODO: the INNER markup of the to-do list and document
 *     center panels is not yet confirmed — verifyToDoList / verifyDocumentCenter
 *     assert tolerant signals after opening each tab and are TODO-flagged.
 *   • The Loan Hub sits AFTER the pre-qualification / offer step
 *     (verifyFlowCompleted), so this test depends on that step succeeding.
 */

import { test } from '../../../fixtures';
import TWNPage from '../../../pages/The Work Number/TWNPage';
import CoBorrowerFlowPage from '../../../pages/Pre-Qual Manual/CoBorrowerFlowPage';
import { makeMarriedCoBorrowerData } from '../../../data/coBorrowerDTCData';

// ---------------------------------------------------------------------------
// Flow driver — steps 1–17, leaving the borrower on the Loan Hub
// ---------------------------------------------------------------------------

/**
 * Drives the borrower DTC flow from the shareable link through Income
 * Verification (Plaid) and Funding Account, leaving the borrower on the Loan
 * Hub. Mirrors the step sequence in coborrower.spec.js (steps 1–17).
 *
 * @param {object} preQualManualPage  PreQualManualPage fixture (portal tab)
 * @param {object} data               makeMarriedCoBorrowerData() payload
 * @returns {Promise<CoBorrowerFlowPage>} flow page object on the borrower tab
 */
async function driveToLoanHub(preQualManualPage, data) {
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

    // -- Step 16: Income Verification (Plaid sandbox) ------------------------
    await flow.fillIncomeVerification();
    await flow.assertNoBlockingError('Income Verification');

    // -- Step 17: Funding Account (Skip for now → Loan Hub) ------------------
    await flow.fillFundingAccount();
    await flow.assertNoBlockingError('Funding Account');

    return flow;
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Borrower Flow — Loan Hub', () => {

    // 8 min — full flow includes TWN lookup, soft credit pull, offer calc, and
    // the Plaid sandbox verification.  Matches the co-borrower E2E timeout.
    test.setTimeout(480000);

    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Loan Hub shows the to-do list, document center, and loan tracker', async ({
        preQualManualPage,
    }) => {
        // Fresh emails per attempt — a retry must not reuse the prior attempt's
        // borrower/co-borrower emails or it hits duplicate-account errors.
        const data = makeMarriedCoBorrowerData();

        const flow = await driveToLoanHub(preQualManualPage, data);

        // -- Loan Hub landed (welcome + In Process) — confirmed DOM ----------
        await flow.verifyLoanHubLanded();
        await flow.assertNoBlockingError('Loan Hub landing');

        // -- 1. To-do list — best-effort / TODO ------------------------------
        await flow.verifyToDoList();
        await flow.assertNoBlockingError('Loan Hub to-do list');

        // -- 2. Document center (view / download) — best-effort / TODO -------
        await flow.verifyDocumentCenter();
        await flow.assertNoBlockingError('Loan Hub document center');

        // -- 3. Visual loan tracker / stage progress — confirmed DOM ---------
        await flow.verifyLoanTracker();
        await flow.assertNoBlockingError('Loan Hub loan tracker');
    });
});
