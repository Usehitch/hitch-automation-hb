import { expect, test } from '../../fixtures';
import { applicationData } from '../../data/newApplication';

test.describe('My Loans - Active', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Verify the content for my loans page', async ({ activePage }) => {
        // -- Page heading ------------------------------------------------------
        await expect(activePage.pageHeading).toBeVisible({ timeout: 20000 });

        // -- Overview stat tiles -----------------------------------------------
        // Counts/amounts are dynamic — structure and labels only
        await activePage.verifyOverviewTiles();

        // -- Toolbar -----------------------------------------------------------
        await activePage.verifyToolbar();

        // -- Pipeline section headings -----------------------------------------
        await activePage.verifyPipelineSections();

        // -- Pending MLO Certification table -----------------------------------
        // Unique columns: Status, LO Assistant | Actions: Certify, View
        await activePage.verifyPendingMloCertTable();

        // -- Pre-Qual / In Process / Closing / Funded tables -------------------
        // Shared column: Processor / LOA | Action: View
        await activePage.verifyStandardPipelineTables();
    });
    
    test('Search and filter the application', async ({ activePage }) => {
        // -- Search -----------------------------------------------------------
        // Use the shared test property address — present across all test runs
        await activePage.search('4556 Eliot');

        // At least the pipeline section headings should still be visible after
        // narrowing results (sections collapse only when count reaches zero)
        await expect(activePage.pendingMloCertSection).toBeVisible({ timeout: 10000 });

        // Reset before opening the filter
        await activePage.clearSearch();

        // -- Filter modal structure ------------------------------------------- 
        await activePage.openFilter();
        await activePage.verifyFilterFields();

        // -- Company dropdown -------------------------------------------------
        await test.step('Verify Company dropdown opens and lists options', async () => {
            await activePage.selectFilterOption(activePage.companyDropdown, 'ABC Broker');
        });

        // -- File Owner dropdown ----------------------------------------------
        await test.step('Verify File Owner dropdown opens and lists options', async () => {
            // Use evaluate() to fire the click synchronously — the MUI popup-indicator
            // button can detach mid-click during React re-render cycles on CI.
            await activePage.fileOwnerDropdown.evaluate(el => el.click());
            await expect(activePage.page.getByRole('listbox').first()).toBeVisible({ timeout: 10000 });
            await activePage.page.keyboard.press('Escape');
        });

        // -- Loan Officer dropdown ---------------------------------------------
        await test.step('Verify Loan Officer dropdown opens and lists options', async () => {
            // Use evaluate() for the same reason as File Owner above.
            await activePage.loanOfficerDropdown.evaluate(el => el.click());
            await expect(activePage.page.getByRole('listbox').first()).toBeVisible({ timeout: 10000 });
            await activePage.page.keyboard.press('Escape');
        });

        await activePage.verifyStatusDropdownOptions();
        await activePage.verifyStateDropdownOptions();
        await activePage.toggleShowTestAccounts();
        await activePage.applyFilters();
        await expect(activePage.pendingMloCertSection).toBeVisible({ timeout: 10000 });
        await activePage.clearAllFilters();
        await activePage.verifyPipelineSections();
    });
    test('Certify the pending MLO', async ({ activePage, mloCertificationModal }) => {
        await activePage.clickCertify();
        await mloCertificationModal.waitForModal();
        await mloCertificationModal.checkAllCertifications();
        await mloCertificationModal.fillBrokerMloName(applicationData.consent.brokerMloName);

        await mloCertificationModal.submit();

        // Verify the success toast — the PDF opens in a new tab but CI serves it as
        // a download (tab navigates to ":"), so we skip asserting the PDF URL.
        await expect(
            activePage.page.getByText(/Certification completed successfully/i)
        ).toBeVisible({ timeout: 10000 });
    });
    test('View the application', async ({ activePage, loanDetailPage }) => {
        await activePage.clickViewInPreQual();

        await loanDetailPage.verifyPageLoaded();
        await loanDetailPage.verifyActionButtons();
        await loanDetailPage.verifyStatusPipeline();
        await loanDetailPage.verifyTabs();
        await loanDetailPage.verifySubNav();
        await loanDetailPage.verifyOverview();
    });
});
