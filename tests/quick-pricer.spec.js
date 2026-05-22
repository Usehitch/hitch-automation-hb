/**
 * Quick Pricer — HELOC Rate Calculator coverage.
 *
 * Verifies the Quick Pricer page accessible from the sidebar:
 *
 *   Page structure:
 *     • Heading "HELOC Rate Calculator" and subheading are visible
 *     • Calculator and History tabs are rendered; Calculator is active by default
 *     • Your Quote panel shows an empty-state instruction before any scenario runs
 *     • Fill Sample Data and Run Scenario buttons are present
 *
 *   Property Details section:
 *     • All field labels are visible (Property Usage, State, Property Value,
 *       Mortgage Balance, Building Type, Recent Purchase)
 *     • Property Usage defaults to "Primary Residence"
 *
 *   Borrower Info section:
 *     • All field labels are visible (Credit Score, Doc Type, DTI Ratio,
 *       Loan Amount, ACH Discount, Deal Notes)
 *
 *   Fill Sample Data flow:
 *     • Clicking the button populates all visible fields
 *     • Run Scenario becomes enabled
 *
 *   Run Scenario flow:
 *     • Clicking Run Scenario after filling sample data updates the Your Quote panel
 *
 *   History tab:
 *     • Switching to History shows at least one saved scenario entry
 *
 * Navigation: portal → Quick Pricer sidebar link.
 * All tests share a beforeEach that lands on the Quick Pricer page.
 */

import { expect, test } from '../fixtures';
import { randomEmail } from '../utils/dataGenerator';

test.describe('Quick Pricer — HELOC Rate Calculator', () => {
    test.beforeEach(async ({ page, quickPricerPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await quickPricerPage.navigateToQuickPricer();
    });

    // -- Page structure -------------------------------------------------------

    test('Page heading and subheading are visible', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyPageHeading();
    });

    test('Calculator and History tabs are rendered', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyTabs();
    });

    test('Calculator tab is active by default', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyCalculatorTabIsActive();
    });

    test('Your Quote panel is visible with empty-state message', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyQuotePanel();
    });

    test('Fill Sample Data and Run Scenario buttons are visible', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyActionButtons();
    });

    // -- Section structure ----------------------------------------------------

    test('Property Details section shows all expected fields', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyPropertyDetailsSection();
    });

    test('Borrower Info section shows all expected fields', async ({ quickPricerPage }) => {
        await quickPricerPage.verifyBorrowerInfoSection();
    });

    // -- Fill Sample Data flow ------------------------------------------------

    test('Fill Sample Data populates every form field with expected values', async ({
        quickPricerPage,
    }) => {
        await quickPricerPage.clickFillSampleData();

        // Verify each field contains its exact sample value:
        //   Property Usage=Primary Residence, State=Colorado,
        //   Property Value=$900,000, Mortgage Balance=$300,000,
        //   Building Type=Single Family, Credit Score=720-739,
        //   Doc Type=Full Documentation, DTI Ratio=40, Loan Amount=$100,000
        await quickPricerPage.verifyFilledFormValues();

        // Run Scenario button must be enabled once all required fields are filled
        await expect(quickPricerPage.runScenarioBtn).toBeEnabled({ timeout: 10000 });
    });

    // -- Run Scenario flow ----------------------------------------------------

    test('Run Scenario with sample data shows Your Amount and pricing table', async ({
        quickPricerPage,
    }) => {
        // Step 1 — Fill form with sample data
        await quickPricerPage.clickFillSampleData();
        await quickPricerPage.verifyFilledFormValues();
        await expect(quickPricerPage.runScenarioBtn).toBeEnabled({ timeout: 10000 });

        // Step 2 — Run the scenario
        await quickPricerPage.runScenario();

        // Step 3 — Verify the Your Quote panel updates with:
        //   • Your Amount = $100,000
        //   • "Select Points & Fees Option" heading
        //   • Pricing table (Points / Interest Rate / Monthly columns + ≥1 rate row)
        //   • INVITE BORROWER and DOWNLOAD PDF buttons
        await quickPricerPage.verifyQuoteResults();
    });

    // -- Invite Borrower flow -------------------------------------------------

    test('Invite Borrower modal opens with all required fields and Cancel closes it', async ({
        quickPricerPage,
    }) => {
        // Prerequisite: run a scenario so INVITE BORROWER button appears
        await quickPricerPage.clickFillSampleData();
        await quickPricerPage.runScenario();
        await expect(quickPricerPage.inviteBorrowerBtn).toBeVisible({ timeout: 10000 });

        // Open modal and verify structure
        await quickPricerPage.clickInviteBorrower();
        await quickPricerPage.verifyInviteModalFields();

        // Cancel — no invite is sent
        await quickPricerPage.cancelInvite();
        await expect(quickPricerPage.inviteBorrowerBtn).toBeVisible();
    });

    test('Send invite shows the Invite sent success panel with an application link', async ({
        quickPricerPage,
    }) => {
        // Generate a unique email for this new applicant so every run creates
        // a distinct invite and does not collide with previous test data.
        const applicantEmail = randomEmail();

        // Step 1 — Run a scenario to unlock the Invite Borrower button
        await quickPricerPage.clickFillSampleData();
        await quickPricerPage.runScenario();
        await expect(quickPricerPage.inviteBorrowerBtn).toBeVisible({ timeout: 10000 });

        // Step 2 — Open the invite modal
        await quickPricerPage.clickInviteBorrower();

        // Step 3 — Fill the form with the generated email and generic test names
        await quickPricerPage.fillInviteForm({
            email:     applicantEmail,
            firstName: 'Test',
            lastName:  'Applicant',
        });

        // Step 4 — Send the invite
        await quickPricerPage.sendInvite();

        // Step 5 — Verify the success panel: heading + application link
        await quickPricerPage.verifyInviteSentPanel();
    });

    // -- History tab ----------------------------------------------------------

    test('History tab is selectable and shows saved scenario entries', async ({
        quickPricerPage,
    }) => {
        await quickPricerPage.switchToHistoryTab();
        await quickPricerPage.verifyHistoryHasEntries();
    });
});
