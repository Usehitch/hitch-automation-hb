/**
 * Co-Borrower DTC (Direct-to-Consumer) — End-to-End Flow Tests
 *
 * Validates the full co-borrower flow that starts from the LO's shareable
 * app link and exercises every screen through to the Application Participants
 * page.  Two scenarios are run back-to-back:
 *
 *   Married test   — borrower.maritalStatus = 'Married'
 *                    → "Who are you married to?" = Co-Borrower
 *   Unmarried test — borrower.maritalStatus = 'Unmarried'
 *                    → marital-status sub-question not shown
 *
 * After every step, assertNoBlockingError() is called to surface any blocking
 * error immediately rather than letting it cascade into a cryptic timeout.
 *
 * Step sequence (real DTC flow observed in staging)
 * ──────────────────────────────────────────────────
 *  1.  LO logs in → copies shareable link → opens borrower DTC app in new tab
 *  2.  Get Started Now (landing page)
 *  3.  Select property type (Single Family)
 *  4.  Select loan purpose (Home Improvement)
 *  5.  Fill property info (address, city, county, state, zip, listing, trust, value, usage)
 *  6.  Fill about yourself (name, email, phone, password, e-consent)
 *  7.  Fill credit check — SSN + DOB (primary borrower)
 *  8.  Assert TWN auto-populated the employer card
 *  9.  Review & Confirm — check all consent checkboxes → CONTINUE
 * 10.  Wait for "Checking Your Credit…" processing screen
 * 11.  Application Participants page:
 *        • Co-borrower toggle → Yes
 *        • Co-borrower name, email, phone, SSN, DOB
 *        • Co-borrower income sources + job details
 *        • "Does co-borrower live with you?" → Yes
 *        • Marital status (Married / Unmarried)
 *        • "Who are you married to?" (Married flow only)
 *        • Other title-only owners → No
 *        • CONTINUE
 * 12.  Select Mortgages & Liens — check first mortgage, fill loan amount ($80k)
 * 13.  Wait for offer calculation / underwriting processing screen
 * 14.  Verify pre-qualification completed (success banner / summary page)
 * 15.  Assert no blocking errors at every step throughout
 *
 * SSNs are Method Fi / TWN sandbox values — never real PII.
 */

import { test } from '../../fixtures';
import TWNPage from '../../pages/The Work Number/TWNPage';
import CoBorrowerFlowPage from '../../pages/Pre-Qual Manual/CoBorrowerFlowPage';
import { marriedCoBorrowerData, unmarriedCoBorrowerData } from '../../data/coBorrowerDTCData';
import { twnApplicationData } from '../../data/twnApplication';

// ---------------------------------------------------------------------------
// Shared flow runner
// ---------------------------------------------------------------------------

/**
 * Run the full co-borrower DTC flow.
 *
 * Steps 1–8  use TWNPage (matches the existing TWN monitor pattern).
 * Steps 9–11 use CoBorrowerFlowPage (new co-borrower-specific steps).
 *
 * @param {object} preQualManualPage  PreQualManualPage fixture (portal tab)
 * @param {object} data               marriedCoBorrowerData | unmarriedCoBorrowerData
 */
async function runCoBorrowerFlow(preQualManualPage, data) {

    // -- Step 1: Open shareable link in a new tab ----------------------------
    const borrowerTab = await preQualManualPage.openShareableLinkInNewTab();
    const twnPage  = new TWNPage(borrowerTab);
    const flow     = new CoBorrowerFlowPage(borrowerTab);

    // -- Step 2: Landing page -------------------------------------------------
    await twnPage.clickGetStartedNow();
    await flow.assertNoBlockingError('Landing page');

    // -- Step 3: Property type ------------------------------------------------
    await twnPage.selectPropertyType(data);
    await flow.assertNoBlockingError('Property type');

    // -- Step 4: Loan purpose -------------------------------------------------
    await twnPage.selectLoanPurpose(data);
    await flow.assertNoBlockingError('Loan purpose');

    // -- Step 5: Property info ------------------------------------------------
    // twnPage.fillPropertyInfo already handles county (added earlier in session)
    await twnPage.fillPropertyInfo(data);
    await flow.assertNoBlockingError('Property info');

    // -- Step 6: About yourself (primary borrower) ----------------------------
    await twnPage.fillAboutYourself(data);
    await flow.assertNoBlockingError('About yourself');

    // -- Step 7: Credit check — primary borrower SSN + DOB -------------------
    await twnPage.fillCreditCheck(data);
    await flow.assertNoBlockingError('Primary credit check');

    // -- Step 8: Assert TWN auto-populated the employer card ------------------
    // TWN sandbox record for SSN 999-40-5000 returns:
    //   Employer: "Enterprise One-Verifier Integrations Only"
    //   Start Date: 04/05/1995
    await twnPage.verifyTwnPopulated(twnApplicationData);
    await flow.assertNoBlockingError('TWN income verification');

    // -- Step 9: Review & Confirm consents ------------------------------------
    // After TWN income is displayed, the borrower must check three consent
    // checkboxes (CFPB disclosure, soft-credit consent, Method authorization)
    // before CONTINUE triggers the credit pull.
    await flow.fillReviewAndConfirm();
    await flow.assertNoBlockingError('Review & Confirm consents');

    // -- Step 10: Wait for "Checking Your Credit…" processing -----------------
    await flow.waitForCreditCheckProcessing();
    await flow.assertNoBlockingError('Credit check processing');

    // -- Step 11: Application Participants page --------------------------------
    // Covers: co-borrower toggle, co-borrower info (name/email/phone/SSN/DOB),
    // income sources, job details, address confirmation, marital status,
    // "who married to" (married flow only), title-only owners.
    await flow.fillApplicationParticipants(data);
    await flow.assertNoBlockingError(`Application Participants (${data.borrower.maritalStatus})`);

    // -- Step 12: Select Mortgages & Liens ------------------------------------
    // Credit-report mortgages are listed; select the first one (BEST EVER
    // MORTGAGE) and fill the Requested Loan Amount ($80,000) before CONTINUE.
    await flow.fillMortgagesAndLiens(data);
    await flow.assertNoBlockingError('Mortgages & Liens');

    // -- Step 13: Wait for offer calculation processing -----------------------
    // The DTC app runs underwriting after Mortgages & Liens.  A "Processing…"
    // spinner appears while the offer is calculated.
    await flow.waitForOfferProcessing();
    await flow.assertNoBlockingError('Offer processing');

    // -- Step 14: Verify pre-qualification completed --------------------------
    // The flow should end on a Pre-Qualification Summary, success banner, or
    // "invite sent to co-applicant" confirmation screen.
    await flow.verifyFlowCompleted();
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Co-Borrower DTC Flow — End-to-End via Shareable Link', () => {

    // 5 minutes — the full flow includes TWN lookup, soft credit pull,
    // "Checking Your Credit" processing, and Application Participants.
    // The default 3-minute timeout is not enough for CI.
    test.setTimeout(300000);

    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    // -------------------------------------------------------------------------

    test('Married co-borrower flow — no blocking errors end-to-end', async ({
        preQualManualPage,
    }) => {
        /**
         * Primary borrower: Andy America  |  maritalStatus: Married
         * Co-borrower:       Amy America
         *
         * Verifies the Married path shows "Who are you married to?" question
         * and that the full flow completes without blocking errors.
         */
        await runCoBorrowerFlow(preQualManualPage, marriedCoBorrowerData);
    });

    // -------------------------------------------------------------------------

    test('Unmarried co-borrower flow — no blocking errors end-to-end', async ({
        preQualManualPage,
    }) => {
        /**
         * Primary borrower: Andy America  |  maritalStatus: Unmarried
         * Co-borrower:       Amy America
         *
         * Verifies that selecting "Unmarried" does not show the "Who are you
         * married to?" sub-question and that the flow completes without any
         * blocking errors specific to the Unmarried path.
         */
        await runCoBorrowerFlow(preQualManualPage, unmarriedCoBorrowerData);
    });

});
