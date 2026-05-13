import { expect, test } from '../../fixtures';
import { applicationData } from '../../data/newApplication';

test.describe('My Loans - Active', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('networkidle');
    });

    test('Verify the content for my loans page', async ({ activePage }) => {
        // -- Page heading ------------------------------------------------------
        await expect(activePage.pageHeading).toBeVisible();

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
        await expect(activePage.pendingMloCertSection).toBeVisible();

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
            await activePage.fileOwnerDropdown.click();
            await expect(activePage.page.getByRole('listbox').first()).toBeVisible({ timeout: 5000 });
            await activePage.page.keyboard.press('Escape');
        });

        // -- Loan Officer dropdown ---------------------------------------------
        await test.step('Verify Loan Officer dropdown opens and lists options', async () => {
            await activePage.loanOfficerDropdown.click();
            await expect(activePage.page.getByRole('listbox').first()).toBeVisible({ timeout: 5000 });
            await activePage.page.keyboard.press('Escape');
        });

        await activePage.verifyStatusDropdownOptions();
        await activePage.verifyStateDropdownOptions();
        await activePage.toggleShowTestAccounts();
        await activePage.applyFilters();
        await expect(activePage.pendingMloCertSection).toBeVisible();
        await activePage.clearAllFilters();
        await activePage.verifyPipelineSections();
    });
    test('Certify the pending MLO', async ({ activePage, mloCertificationModal }) => {
        await activePage.clickCertify();
        await mloCertificationModal.waitForModal();
        await mloCertificationModal.checkAllCertifications();
        await mloCertificationModal.fillBrokerMloName(applicationData.consent.brokerMloName);

        const pdfTabPromise = activePage.page.context().waitForEvent('page');
        await mloCertificationModal.submit();

        await expect(
            activePage.page.getByText(/Certification completed successfully/i)
        ).toBeVisible({ timeout: 10000 });

        const pdfTab = await pdfTabPromise;
        await pdfTab.waitForLoadState('domcontentloaded');
        await expect(pdfTab).toHaveURL(/brokerCertification.*\.pdf/i, { timeout: 15000 });
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
