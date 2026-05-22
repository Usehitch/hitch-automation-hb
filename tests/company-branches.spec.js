/**
 * Company Branches — coverage for the Company Branches management page.
 *
 * Verifies the Branches page accessible from the sidebar:
 *
 *   Page structure:
 *     • "Branches" heading is visible
 *     • Search bar (placeholder "Search by name or NMLS") and SEARCH button
 *     • ADD NEW BRANCH button is present
 *     • Table columns: Name, Company, Phone, NMLS, Actions
 *     • At least one branch row is rendered
 *     • Pagination ("Officers per page" label + counter) is visible
 *
 *   Search flow:
 *     • Searching by the first row's NMLS returns matching rows
 *     • Clearing search restores the full list
 *
 *   Add New Branch modal:
 *     • Clicking ADD NEW BRANCH opens the modal with all expected fields;
 *       Cancel closes it without saving
 *     • Filling all required fields and clicking CREATE adds a branch
 *       that is then visible in the table when searched by name
 *
 *   Edit Branch modal:
 *     • Clicking the pencil icon in the first row opens the edit modal
 *     • Cancel closes the modal without saving
 *     • Editing the first existing row with random data and verifying
 *       the updated name appears in the table (self-contained)
 *
 * Navigation: portal → Company Branches sidebar link.
 * All tests share a beforeEach that lands on the Branches page.
 */

import { expect, test } from '../fixtures';
import { createBranchData, editBranchData } from '../data/companyBranchesData';

test.describe('Company Branches (CRU)', () => {
    test.beforeEach(async ({ page, companyBranchesPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await companyBranchesPage.navigateToBranches();
    });

    // -- Page structure -------------------------------------------------------

    test('Branches heading is visible', async ({ companyBranchesPage }) => {
        await companyBranchesPage.verifyPageHeading();
    });

    test('Search bar and Add New Branch button are visible', async ({ companyBranchesPage }) => {
        await companyBranchesPage.verifyToolbar();
    });

    test('Table columns are rendered: Name, Company, Phone, NMLS, Actions', async ({
        companyBranchesPage,
    }) => {
        await companyBranchesPage.verifyTableColumns();
    });

    test('Table has at least one branch row', async ({ companyBranchesPage }) => {
        await companyBranchesPage.verifyTableHasRows();
    });

    test('Pagination label and counter are visible', async ({ companyBranchesPage }) => {
        await companyBranchesPage.verifyPagination();
    });

    // -- Search flow ----------------------------------------------------------

    test('Search by NMLS narrows results to matching branches', async ({ companyBranchesPage }) => {
        // Read the NMLS from the first row — NMLS is explicitly indexed by
        // the portal search ("Search by name or NMLS").
        const nmls = await companyBranchesPage.getFirstRowNmls();

        await companyBranchesPage.search(nmls);
        await companyBranchesPage.verifySearchResultContains(nmls);
    });

    test('Clearing search restores the full branch list', async ({ companyBranchesPage }) => {
        await companyBranchesPage.search('test');
        await companyBranchesPage.clearSearch();
        await expect(companyBranchesPage.paginationCounter).toBeVisible({ timeout: 10000 });
    });

    // -- Add New Branch modal -------------------------------------------------

    test('Add New Branch modal opens with all expected fields and Cancel closes it', async ({
        companyBranchesPage,
    }) => {
        await companyBranchesPage.openAddNewBranchModal();
        await companyBranchesPage.verifyAddBranchModalFields();
        await companyBranchesPage.cancelBranchModal();

        // Page must still show the branch list after cancel
        await expect(companyBranchesPage.pageHeading).toBeVisible();
    });

    test('Create a new branch with generated data and verify it appears in the table', async ({
        companyBranchesPage,
    }) => {
        // Step 1 — Open the Add New Branch modal
        await companyBranchesPage.openAddNewBranchModal();

        // Step 2 — Fill branch name, phone, NMLS and select first available company
        await companyBranchesPage.fillAndSubmitAddBranchForm(createBranchData);

        // Step 3 — Search by name and confirm the row is visible
        await companyBranchesPage.verifyBranchInTable(createBranchData.name);
    });

    // -- Edit Branch modal ----------------------------------------------------

    test('Edit Branch modal opens from the first row and Cancel closes it', async ({
        companyBranchesPage,
    }) => {
        await companyBranchesPage.verifyTableHasRows();
        await companyBranchesPage.openEditBranchModal();

        // Confirm an editable field is rendered inside the modal
        await expect(companyBranchesPage.editBranchNameInput).toBeVisible({ timeout: 10000 });

        await companyBranchesPage.cancelEditBranchModal();

        // Page must still show the branch list after cancel
        await expect(companyBranchesPage.pageHeading).toBeVisible();
    });

    test('Edit an existing branch with new random data and verify the table', async ({
        companyBranchesPage,
    }) => {
        // Self-contained — edits the first branch already in the table; no
        // dependency on the Create test having run first.

        // Step 1 — Guard: at least one row must exist
        await companyBranchesPage.verifyTableHasRows();

        // Step 2 — Open Edit Branch modal for the first row
        await companyBranchesPage.openEditBranchModal();

        // Step 3 — Update name, phone and NMLS with fresh random values
        await companyBranchesPage.fillEditBranchForm(editBranchData);

        // Step 4 — Submit
        await companyBranchesPage.submitEditBranch();

        // Step 5 — Search by new name and confirm the row is present
        await companyBranchesPage.verifyBranchInTable(editBranchData.name);
    });
});
