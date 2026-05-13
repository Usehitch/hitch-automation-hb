/**
 * Shadow Borrower View — test coverage.
 *
 * Verifies the Shadow Borrower View feature accessible from a loan's detail page:
 *   • Confirmation modal — heading, description, Cancel, and CONTINUE buttons
 *   • Cancel behaviour   — modal closes, broker stays on Loan Detail
 *   • CONTINUE behaviour — opens borrower app in a NEW TAB in read-only mode
 *   • Read-only page     — banner, sidebar steps, Demographics content
 *   • Read-only guard    — form checkboxes are not interactable
 *
 * Navigation path: Active tab → Pre-Qual section → View → Shadow Borrower View
 *
 * NOTE: Shadow Borrower View opens in a new browser tab. Each test that calls
 * continueShadowView() receives the new tab's Page object and constructs a
 * ShadowBorrowerViewPage bound to that tab for assertions.
 */

import { expect, test } from '../fixtures';
import ShadowBorrowerViewPage from '../pages/My Loans/ShadowBorrowerViewPage';

// ---------------------------------------------------------------------------
// Helper: navigate to Active, open the first Pre-Qual loan, verify the
// Loan Detail page loaded — shared by every test in this file.
// ---------------------------------------------------------------------------
async function openPreQualLoanDetail({ activePage, loanDetailPage }) {
    await activePage.page.goto('/portal');
    await activePage.page.waitForLoadState('networkidle');
    await activePage.clickViewInPreQual();
    await loanDetailPage.verifyPageLoaded();
}

// ---------------------------------------------------------------------------

test.describe('Shadow Borrower View', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openPreQualLoanDetail({ activePage, loanDetailPage });
    });

    // -- Confirmation modal ---------------------------------------------------

    test('Shadow Borrower View button opens confirmation modal', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.clickShadowBorrowerView();
        await loanDetailPage.verifyShadowViewModal();
    });

    test('Cancel closes the confirmation modal and returns to Loan Detail', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.clickShadowBorrowerView();
        await loanDetailPage.cancelShadowView();

        // Shadow Borrower View button must still be visible — broker is back
        // on the Loan Detail page, not in read-only mode
        await expect(loanDetailPage.shadowBorrowerViewBtn).toBeVisible();
    });

    // -- Read-only mode (new tab) ---------------------------------------------
    test('CONTINUE opens read-only mode and verifies all available content', async ({
        loanDetailPage,
    }) => {
        // Step 1 — Open and inspect modal
        await loanDetailPage.clickShadowBorrowerView();
        await loanDetailPage.verifyShadowViewModal();

        // Step 2 — Proceed to read-only mode in new tab
        const shadowTab = await loanDetailPage.continueShadowView();
        const shadowPage = new ShadowBorrowerViewPage(shadowTab);

        // Step 3 — Read-only banner is the only guaranteed element;
        // all other content depends on which step the borrower is currently on
        await shadowPage.verifyReadOnlyBanner();

        // Step 4 — Sidebar loan info and step entries (if rendered)
        const hasHeloc = await shadowPage.helocPropertyLabel.isVisible({ timeout: 5000 }).catch(() => false);
        if (hasHeloc) {
            await shadowPage.verifySidebar();
        }

        // Step 5 — Demographics page content (if borrower is on that step)
        const hasDemographics = await shadowPage.demographicsHeading.isVisible({ timeout: 5000 }).catch(() => false);
        if (hasDemographics) {
            await shadowPage.verifyDemographicsContent();
        }

        // Step 6 — Read-only guard: checkboxes should not be interactable
        const hasCheckboxes = await shadowTab.locator('input[type="checkbox"]').first().isVisible().catch(() => false);
        if (hasCheckboxes) {
            await shadowPage.verifyCheckboxesAreReadOnly();
        }
    });
});
