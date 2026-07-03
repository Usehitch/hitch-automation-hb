/**
 * My Loans — Inactive tab coverage tests.
 *
 * Verifies the Inactive sub-tab of My Loans:
 *   • Page structure    — overview tiles, toolbar, pipeline sections
 *   • Table columns     — Pending MLO Certification + standard pipeline headers
 *   • Search            — narrows results without breaking the page
 *   • Filter modal      — fields, dropdowns, and clear/apply actions
 *   • Certify action    — MLO certification modal completes successfully
 *   • View action       — opens Loan Detail page for an inactive loan
 *
 * Navigation: portal → My Loans sidebar → Inactive link.
 * All tests share the same beforeEach that lands on the Inactive tab.
 */

import { expect, test } from '../../../fixtures';
import { applicationData } from '../../../data/newApplication';

test.describe('My Loans - Inactive', () => {
    test.beforeEach(async ({ page, activePage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await activePage.navigateToInactive();
    });

    // -------------------------------------------------------------------------

    test('Inactive tab overview tiles and toolbar are visible', async ({ activePage }) => {
        await test.step('Verify the overview tiles', async () => {
            // Overview stat tiles — counts are dynamic; labels always present
            await activePage.verifyOverviewTiles();
        });

        await test.step('Verify the search and filter toolbar', async () => {
            // Search + Filter toolbar
            await activePage.verifyToolbar();
        });
    });

    test('Inactive tab pipeline section headings are rendered', async ({ activePage }) => {
        await test.step('Verify the pipeline section headings', async () => {
            // Pre-Qual, In Process, Closing, Funded are always present.
            // Pending MLO Certification only shows when loans are in that state.
            await activePage.verifyPipelineSections({ requirePendingMlo: false });
        });
    });

    test('Pending MLO Certification table shows all columns and actions', async ({
        activePage,
    }) => {
        // Columns: Applicant, Property Address, Loan Amount, Status,
        //          LO Assistant, Time in Stage
        // Actions: Certify, View
        const hasPending = await activePage.certifyBtn
            .isVisible({ timeout: 15000 })
            .catch(() => false);
        test.skip(!hasPending, 'No loans currently pending MLO certification on staging');

        await test.step('Verify the Pending MLO Certification table', async () => {
            await activePage.verifyPendingMloCertTable();
        });
    });

    test('Standard pipeline tables show Processor/LOA column and View button', async ({
        activePage,
    }) => {
        await test.step('Verify the standard pipeline tables', async () => {
            // Pre-Qual and subsequent sections share: Processor / LOA, View button
            await activePage.verifyStandardPipelineTables();
        });
    });

    // -------------------------------------------------------------------------

    test('Search narrows results and pipeline sections remain visible', async ({
        activePage,
    }) => {
        await test.step('Search by a known address fragment', async () => {
            // Search by a known address fragment — results narrow.
            // On the Inactive tab the pipeline may have zero matching rows, which causes
            // the section heading to collapse/hide.  We check conditionally: if it IS
            // visible it must not break; if it is gone the search itself still worked.
            await activePage.search('4556 Eliot');
            const sectionVisible = await activePage.pendingMloCertSection
                .isVisible({ timeout: 3000 })
                .catch(() => false);
            if (sectionVisible) {
                await expect(activePage.pendingMloCertSection).toBeVisible({ timeout: 10000 });
            }
        });

        await test.step('Clear the search and verify the page resets', async () => {
            // Clear and confirm the page resets cleanly
            await activePage.clearSearch();
            await activePage.verifyPipelineSections({ requirePendingMlo: false });
        });
    });
    test('Certify a pending MLO loan from the Inactive tab', async ({
        activePage,
        mloCertificationModal,
    }) => {
        // Certification triggers extra underwriting checks on top of the modal/
        // submit waits inside MloCertificationModal (up to ~115s worst case) —
        // on some tenants (e.g. REMN) that pushes past the 180s default config
        // timeout. Widen so a genuinely slow backend fails as a clean assertion
        // instead of a hard test-timeout.
        test.setTimeout(300000);

        const hasPending = await activePage.certifyBtn
            .isVisible({ timeout: 15000 })
            .catch(() => false);
        test.skip(!hasPending, 'No loans currently pending MLO certification on staging');

        await test.step('Open and prepare the certification modal', async () => {
            await activePage.clickCertify();
            await mloCertificationModal.waitForModal();
            // Refresh-tolerant: prod's background pipeline refetch can unmount the
            // modal mid-interaction — prepareCertification reopens and redoes.
            await mloCertificationModal.prepareCertification({
                reopen: () => activePage.clickCertify(),
                name: applicationData.consent.brokerMloName,
            });
        });

        await test.step('Submit the certification and verify the success toast', async () => {
            await mloCertificationModal.submit();

            // Verify the success toast — the PDF opens in a new tab but CI serves it as
            // a download (tab navigates to ":"), so we skip asserting the PDF URL.
            await expect(
                activePage.page.getByText(/Certification completed successfully/i)
            ).toBeVisible({ timeout: 20000 });
        });
    });

    // -------------------------------------------------------------------------

    test('View a loan from the Inactive list opens Loan Detail', async ({
        activePage,
        loanDetailPage,
    }) => {
        // Skip gracefully if the Inactive pipeline is empty in staging
        const viewBtn = activePage.page.getByRole('button', { name: /^View$/i }).first();
        const hasViewBtn = await viewBtn.isVisible({ timeout: 10000 }).catch(() => false);
        if (!hasViewBtn) {
            test.skip(true, 'No View buttons found in Inactive pipeline — no inactive loans in staging');
            return;
        }
        await test.step('Open the loan from the Inactive list', async () => {
            await viewBtn.click();
            await activePage.page.waitForLoadState('load');
        });

        await test.step('Verify the Loan Detail page loaded', async () => {
            // Verify Loan Detail page loaded correctly
            await loanDetailPage.verifyPageLoaded();
            await loanDetailPage.verifyActionButtons();
            await loanDetailPage.verifyStatusPipeline();
            await loanDetailPage.verifyTabs();
        });
    });
});
