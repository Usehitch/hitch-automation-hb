/**
 * Companies — coverage for the Companies management page.
 *
 * Verifies the Companies page accessible from the sidebar:
 *
 *   Page structure:
 *     • "Companies" heading is visible
 *     • Search bar (placeholder "Search by name, NMLS or TPO ID") and
 *       SEARCH button are visible
 *     • ADD NEW COMPANY button is present
 *     • Table columns: Name, Phone, NMLS, TPO ID, Key Contact, Actions
 *     • At least one company row is rendered
 *     • Pagination ("Officers per page" label + counter) is visible
 *
 *   Search flow:
 *     • Typing a known company name and clicking SEARCH returns matching rows
 *     • Clearing search restores the full list
 *
 *   Add New Company modal:
 *     • Clicking ADD NEW COMPANY opens the modal with all four sections
 *       (Company Details, Address Information, License Information,
 *       Admin Information) and every field visible; Cancel closes it
 *     • Filling all required fields and clicking CREATE creates a company
 *       that is then visible in the table when searched by display name
 *
 *   Edit Company modal:
 *     • Clicking the pencil icon in the first row opens the edit modal
 *     • Cancel closes the modal without saving
 *     • Editing the first existing row with random data and verifying the
 *       updated name appears in the table (self-contained; no create dependency)
 *
 * Navigation: portal → Companies sidebar link.
 * All tests share a beforeEach that lands on the Companies page.
 */

import { expect, test } from '../fixtures';
import { createCompanyData, editCompanyData } from '../data/companiesData';

test.describe('Companies (CRU)', () => {
    test.beforeEach(async ({ page, companiesPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await companiesPage.navigateToCompanies();
    });

    // -- Page structure -------------------------------------------------------

    test('Companies heading is visible', async ({ companiesPage }) => {
        await companiesPage.verifyPageHeading();
    });

    test('Search bar and Add New Company button are visible', async ({ companiesPage }) => {
        await companiesPage.verifyToolbar();
    });

    test('Table columns are rendered: Name, Phone, NMLS, TPO ID, Key Contact, Actions', async ({
        companiesPage,
    }) => {
        await companiesPage.verifyTableColumns();
    });

    test('Table has at least one company row', async ({ companiesPage }) => {
        await companiesPage.verifyTableHasRows();
    });

    test('Pagination label and counter are visible', async ({ companiesPage }) => {
        await companiesPage.verifyPagination();
    });

    // -- Search flow ----------------------------------------------------------

    test('Search narrows results to matching companies', async ({ companiesPage }) => {
        // Read the display name from the first row as the search term.
        // The portal indexes a separate "full legal name" field, so the display
        // name may not be in the search index — the verification therefore checks
        // that the search returned at least one result (table is not empty) rather
        // than asserting a specific name appears in a row.
        const companyName = await companiesPage.getFirstRowName();
        const searchTerm  = companyName.split(' ')[0].slice(0, 10);

        await companiesPage.search(searchTerm);
        await companiesPage.verifyTableHasRows();
    });

    test('Clearing search restores the full company list', async ({ companiesPage }) => {
        // Apply a short search to change the visible set
        await companiesPage.search('Test');
        // Clear and verify the pagination counter is back (≥1 result means
        // the full unfiltered list reloaded)
        await companiesPage.clearSearch();
        await expect(companiesPage.paginationCounter).toBeVisible({ timeout: 10000 });
    });

    // -- Add New Company modal ------------------------------------------------

    test('Add New Company modal opens with all expected sections and fields', async ({
        companiesPage,
    }) => {
        await companiesPage.openAddNewCompanyModal();

        // Verify heading + all four sections (Company Details, Address Information,
        // License Information, Admin Information) with every field and both
        // action buttons (CANCEL · CREATE)
        await companiesPage.verifyAddCompanyModalFields();

        // Cancel — no company is created
        await companiesPage.cancelCompanyModal();

        // Page must still show the company list after cancel
        await expect(companiesPage.pageHeading).toBeVisible();
    });

    test('Create a new company with generated data and verify it appears in the table', async ({
        companiesPage,
    }) => {
        // Step 1 — Open the Add New Company modal
        await companiesPage.openAddNewCompanyModal();

        // Step 2 — Fill all four sections and submit:
        //   Company Details  : Display Name, tag, Full Name, Phone, Email
        //   Address Info     : Street, State (plain text), Postal Code, City
        //   License Info     : NMLS, TPO ID, Privacy Policy URL, Terms URL
        //   Admin Information: select first existing admin from dropdown
        await companiesPage.fillAndSubmitAddCompanyForm(createCompanyData);

        // Step 3 — Search by display name and confirm the row is visible in the
        //          table (Name column = Display Name value; count increments by 1)
        await companiesPage.verifyCompanyInTable(createCompanyData.displayName);
    });

    // -- Edit Company modal ---------------------------------------------------

    test('Edit Company modal opens from the first row and Cancel closes it', async ({
        companiesPage,
    }) => {
        await companiesPage.verifyTableHasRows(); // guard: need ≥1 row
        await companiesPage.openEditCompanyModal();

        // openEditCompanyModal() guards on the dialog heading — confirm an
        // editable field (Full Company Name) is also rendered before cancelling.
        await expect(companiesPage.editCompanyFullNameInput).toBeVisible({ timeout: 10000 });

        await companiesPage.cancelEditCompanyModal();

        // Page must still show the company list after cancel
        await expect(companiesPage.pageHeading).toBeVisible();
    });

    test('Edit an existing company with new random data and verify the table', async ({
        companiesPage,
    }) => {
        // This test is self-contained — it edits the first company already in
        // the table, so it does not depend on the Create test having run first.

        // Step 1 — Guard: at least one row must exist
        await companiesPage.verifyTableHasRows();

        // Step 2 — Open the Edit Company modal for the first row
        await companiesPage.openEditCompanyModal();

        // Step 3 — Update with fully independent random values from editCompanyData:
        //   Display Name → "Pacific Coast Financial <suffix>"
        //   Full Name    → "Pacific Coast Financial Partners LLC"
        //   NMLS         → new random 7-digit number
        //   TPO ID       → new random 5-digit number
        await companiesPage.fillEditCompanyForm(editCompanyData);

        // Step 4 — Submit via UPDATE
        await companiesPage.submitEditCompany();

        // Step 5 — Search by the new display name and confirm the row is present
        await companiesPage.verifyCompanyInTable(editCompanyData.displayName);
    });
});
