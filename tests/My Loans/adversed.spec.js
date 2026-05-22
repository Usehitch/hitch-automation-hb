/**
 * My Loans — Adversed tab coverage tests.
 *
 * Verifies the Adversed sub-tab of My Loans:
 *   • Page structure    — overview tiles, toolbar, pipeline sections
 *   • Table columns     — Pending MLO Certification + standard pipeline headers
 *   • Search            — narrows results without breaking the page
 *   • Filter modal      — fields, dropdowns, and clear/apply actions
 *   • Certify action    — MLO certification modal completes successfully
 *   • View action       — opens Loan Detail page for an adversed loan
 *
 * Navigation: portal → My Loans sidebar → Adversed link.
 * All tests share the same beforeEach that lands on the Adversed tab.
 */

import { expect, test } from '../../fixtures';
import { applicationData } from '../../data/newApplication';

test.describe('My Loans - Adversed', () => {
    test.beforeEach(async ({ page, activePage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await activePage.navigateToAdversed();
    });

    // -------------------------------------------------------------------------

    test('Adversed tab overview tiles and toolbar are visible', async ({ activePage }) => {
        // Overview stat tiles — counts are dynamic; labels always present
        await activePage.verifyOverviewTiles();

        // Search + Filter toolbar
        await activePage.verifyToolbar();
    });

    test('Adversed tab pipeline section headings are rendered', async ({ activePage }) => {
        // Pending MLO Certification, Pre-Qual, In Process, Closing, Funded
        await activePage.verifyPipelineSections();
    });

    test('Pending MLO Certification table shows all columns and actions', async ({
        activePage,
    }) => {
        // Columns: Applicant, Property Address, Loan Amount, Status,
        //          LO Assistant, Time in Stage
        // Actions: Certify, View
        await activePage.verifyPendingMloCertTable();
    });

    test('Standard pipeline tables show Processor/LOA column and View button', async ({
        activePage,
    }) => {
        await activePage.verifyStandardPipelineTables();
    });

    // -------------------------------------------------------------------------

    test('Search narrows results and pipeline sections remain visible', async ({
        activePage,
    }) => {
        // Search by a known address fragment — results should narrow but the
        // Pending MLO Certification section heading must still render
        await activePage.search('4556 Eliot');
        await expect(activePage.pendingMloCertSection).toBeVisible();

        // Clear and confirm the page resets
        await activePage.clearSearch();
        await activePage.verifyPipelineSections();
    });

    // -------------------------------------------------------------------------

    test('Filter modal opens and all fields are present', async ({ activePage }) => {
        await activePage.openFilter();
        await activePage.verifyFilterFields();
        // Close without applying
        await activePage.page.keyboard.press('Escape');
    });

    test('Filter — Company dropdown opens and lists options', async ({ activePage }) => {
        await activePage.openFilter();
        await test.step('Select Company option from filter dropdown', async () => {
            await activePage.selectFilterOption(activePage.companyDropdown, 'ABC Broker');
        });
        await activePage.applyFilters();
        // Pipeline sections still render after filtering
        await expect(activePage.pendingMloCertSection).toBeVisible();
        await activePage.clearAllFilters();
    });

    test('Filter — Status dropdown lists all expected statuses', async ({ activePage }) => {
        await activePage.openFilter();
        await activePage.verifyStatusDropdownOptions();
        await activePage.page.keyboard.press('Escape');
    });

    test('Filter — State dropdown lists all expected states', async ({ activePage }) => {
        await activePage.openFilter();
        await activePage.verifyStateDropdownOptions();
        await activePage.page.keyboard.press('Escape');
    });

    test('Filter — Show Test Accounts checkbox toggles correctly', async ({ activePage }) => {
        await activePage.openFilter();
        await activePage.toggleShowTestAccounts();
        await activePage.page.keyboard.press('Escape');
    });

    test('Filter — Clear All Filters resets and pipeline sections remain', async ({
        activePage,
    }) => {
        // Apply a filter first, then clear — guards against a blank-page regression
        await activePage.openFilter();
        await activePage.selectFilterOption(activePage.companyDropdown, 'ABC Broker');
        await activePage.applyFilters();
        await activePage.clearAllFilters();
        await activePage.verifyPipelineSections();
    });

    // -------------------------------------------------------------------------

    test('Certify a pending MLO loan from the Adversed tab', async ({
        activePage,
        mloCertificationModal,
    }) => {
        // Skip gracefully if the Adversed pipeline has no pending MLO rows
        const hasCertify = await activePage.certifyBtn.isVisible({ timeout: 10000 }).catch(() => false);
        if (!hasCertify) {
            test.skip(true, 'No Certify button in Adversed pipeline — no adversed MLO loans in staging');
            return;
        }
        await activePage.clickCertify();
        await mloCertificationModal.waitForModal();
        await mloCertificationModal.checkAllCertifications();
        await mloCertificationModal.fillBrokerMloName(applicationData.consent.brokerMloName);

        await mloCertificationModal.submit();

        // Verify the success toast — PDF opens in a new tab but CI serves it as a
        // download (tab navigates to ":"), so we skip asserting the PDF URL.
        await expect(
            activePage.page.getByText(/Certification completed successfully/i)
        ).toBeVisible({ timeout: 10000 });
    });

    // -------------------------------------------------------------------------

    test('View a loan from the Adversed list opens Loan Detail', async ({
        activePage,
        loanDetailPage,
    }) => {
        // The Adversed pipeline may be empty in staging — skip gracefully if so.
        const viewBtn = activePage.page.getByRole('button', { name: /^View$/i }).first();
        const hasViewBtn = await viewBtn.isVisible({ timeout: 10000 }).catch(() => false);
        if (!hasViewBtn) {
            test.skip(true, 'No View buttons found in Adversed pipeline — no adversed loans in staging');
            return;
        }

        await viewBtn.click();
        await activePage.page.waitForLoadState('load');

        // Verify Loan Detail page loaded correctly
        await loanDetailPage.verifyPageLoaded();
        await loanDetailPage.verifyActionButtons();
        await loanDetailPage.verifyStatusPipeline();
        await loanDetailPage.verifyTabs();
    });
});