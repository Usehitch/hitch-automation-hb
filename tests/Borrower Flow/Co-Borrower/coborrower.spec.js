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
 *  7b. Fill primary income sources (company name, compensation, start date)
 *  8.  Review & Confirm — check all consent checkboxes → CONTINUE
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
 * 14.  Verify pre-qualification completed → click "CONTINUE TO APPLICATION"
 * 15.  Demographics — opt out Sex/Race, authorize hard credit check → Continue
 * 16.  Assert no blocking errors at every step throughout
 *
 * SSNs are Method Fi / TWN sandbox values — never real PII.
 */

import { test } from '../../../fixtures';
import TWNPage from '../../../pages/The Work Number/TWNPage';
import CoBorrowerFlowPage from '../../../pages/Pre-Qual Manual/CoBorrowerFlowPage';
import { makeMarriedCoBorrowerData, makeUnmarriedCoBorrowerData } from '../../../data/coBorrowerDTCData';

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

    // -- Step 7b: Fill primary borrower income sources ------------------------
    // After SSN + DOB are entered, the income sources section appears.
    // TWN may not auto-populate for this SSN, so we fill manually.
    await twnPage.fillPrimaryIncomeSources(data);
    await flow.assertNoBlockingError('Primary income sources');

    // -- Step 9: Review & Confirm consents ------------------------------------
    // After TWN income is displayed, the borrower must check three consent
    // checkboxes (CFPB disclosure, soft-credit consent, Method authorization)
    // before CONTINUE triggers the credit pull.
    await flow.fillReviewAndConfirm();
    await flow.assertNoBlockingError('Review & Confirm consents');

    // -- Step 10: Wait for "Checking Your Credit…" processing -----------------
    await flow.waitForCreditCheckProcessing(data);
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

    // -- Step 14: Verify pre-qualification completed + click Continue ----------
    // Asserts the "You're pre-qualified" banner is visible, then clicks
    // "CONTINUE TO APPLICATION" to proceed to the full application.
    await flow.verifyFlowCompleted();
    await flow.assertNoBlockingError('Pre-qual offer page');

    // -- Step 14b: Other Info page (post-offer) --------------------------------
    // Marital Status, "Who are you married to?", and Title-Only Owners have
    // moved to a dedicated "Other Info" page that appears before Demographics.
    await flow.fillOtherInfo(data);
    await flow.assertNoBlockingError('Other Info');

    // -- Step 15: Demographics page -------------------------------------------
    // Opts out of Ethnicity/Sex/Race disclosure, checks hard-credit
    // authorization, then clicks Continue.
    await flow.fillDemographics();
    await flow.assertNoBlockingError('Demographics');

    // -- Post-Demographics environment divergence -----------------------------
    // On prod the DTC app submits after Demographics and redirects to the portal
    // (application → "Pending MLO Certification"); the borrower income-verif /
    // funding / loan-hub / co-borrower-invite journey does not follow. Accept
    // that: assert submission and end the test green. On staging the borrower
    // continues to Income Verification, so run steps 16–20 as normal.
    if (await flow.didSubmitToPortalAfterDemographics()) {
        await flow.assertApplicationSubmittedToPortal();
        await flow.assertNoBlockingError('Application submitted (prod)');
        return;
    }

    // -- Step 16: Income Verification (Plaid sandbox) -------------------------
    // Clicks "BANK ACCOUNT VERIFICATION (PLAID)", enters sandbox phone + OTP
    // (123456), selects Tartan Bank, confirms, then clicks Continue on the
    // "Bank Account Verified Successfully" screen.
    await flow.fillIncomeVerification();
    await flow.assertNoBlockingError('Income Verification');

    // -- Step 17: Funding Account page ----------------------------------------
    // Runs Plaid sandbox (phone → OTP → Tartan Bank → Confirm) then clicks
    // Continue with the pre-selected connected account.
    // TODO: Replace skip with full Plaid sandbox flow once iframe interaction is stable.
    await flow.fillFundingAccount();
    await flow.assertNoBlockingError('Funding Account');

    // -- Step 18: Verify Loan Hub welcome page --------------------------------
    // After Funding Account the borrower lands on the Loan Hub.  Assert the
    // "Welcome to Your Loan Hub" banner, "In Process" pipeline stage, then
    // open the Loan Tracker and confirm B1 = Completed, B2 = Invited.
    await flow.verifyLoanHub();
    await flow.assertNoBlockingError('Loan Hub');

    // -- Step 19: Co-borrower invite email in Mailinator ----------------------
    // The system emails the co-borrower an invite to complete their portion.
    // Opens Mailinator in an isolated context, clicks "COMPLETE APPLICATION",
    // and verifies the Review Information page loads.
    // Returns the co-borrower app tab for Step 20.
    const coBorrowerPage = await flow.verifyCoBorrowerInviteEmail(data);
    await flow.assertNoBlockingError('Co-borrower invite email');

    // -- Step 20: Co-borrower completes their application ---------------------
    // a. Review Information  → START APPLICATION
    // b. Tell us about yourself → password + e-consent → Continue
    // c. Check Your Eligibility → check consent boxes → Continue
    await flow.fillCoBorrowerApplication(data, coBorrowerPage);
    await flow.assertNoBlockingError('Co-borrower application');
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe('Co-Borrower Flow — End-to-End via Shareable Link', () => {

    // 5 minutes — the full flow includes TWN lookup, soft credit pull,
    // "Checking Your Credit" processing, and Application Participants.
    // The default 3-minute timeout is not enough for CI.
    test.setTimeout(480000); // 8 min — full flow includes 2× Plaid + credit pull + offer calc

    test.beforeEach(async ({ page, context }) => {
        // Close borrower tabs left open by the prior test in this serial file.
        for (const openPage of context.pages()) {
            if (openPage !== page) {
                await openPage.close().catch(() => { });
            }
        }
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
        // Fresh emails per attempt — a retry must not reuse the prior attempt's
        // borrower/co-borrower emails or it hits duplicate-account errors.
        await runCoBorrowerFlow(preQualManualPage, makeMarriedCoBorrowerData());
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
        // Fresh emails per attempt — a retry must not reuse the prior attempt's
        // borrower/co-borrower emails or it hits duplicate-account errors.
        await runCoBorrowerFlow(preQualManualPage, makeUnmarriedCoBorrowerData());
    });

});
