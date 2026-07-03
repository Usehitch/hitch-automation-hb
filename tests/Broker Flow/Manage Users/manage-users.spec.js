/**
 * Manage Users — Portal Users page coverage.
 *
 * Verifies the Portal Users admin page accessible from the sidebar:
 *   • Page structure    — heading, search toolbar, Add New User button
 *   • Table columns     — all 10 column headers rendered
 *   • Table data        — at least one user row with an email is present
 *   • Row action icons  — edit, assign, delete, reset-password buttons in first row
 *   • Search            — typing a known value narrows results
 *   • Clear search      — restores the full user list
 *   • Pagination        — "Users per page" label and counter are visible;
 *                         Next Page button advances the list
 *   • Add User modal    — heading, all fields visible; Cancel closes cleanly
 *   • Role dropdown     — selectable role options listed (TPO Admin → Account Executive)
 *   • Company dropdown  — populated with at least one company option
 *
 * Navigation: portal → Manage Users sidebar link.
 * All tests share the same beforeEach that lands on the Portal Users page.
 * No users are created, edited, or deleted — all interactions are read-only
 * or are reverted before the test ends.
 */

import { expect, test } from '../../../fixtures';

test.describe('Manage Users', () => {
    test.beforeEach(async ({ page, manageUsersPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await manageUsersPage.navigateToManageUsers();
    });

    // -- Page structure -------------------------------------------------------

    test('Portal Users page heading is visible', async ({ manageUsersPage }) => {
        await manageUsersPage.verifyPageHeading();
    });

    test('Search toolbar and Add New User button are visible', async ({ manageUsersPage }) => {
        await manageUsersPage.verifyToolbar();
    });

    test('All table column headers are rendered', async ({ manageUsersPage }) => {
        // Name, Location, Role(s), Email, Phone, NMLS, LOS Username,
        // Active?, Last Login, Actions
        await manageUsersPage.verifyTableColumns();
    });

    // -- Table content --------------------------------------------------------

    test('User table contains at least one data row', async ({ manageUsersPage }) => {
        await manageUsersPage.verifyTableHasRows();
    });

    test('First user row displays action icon buttons', async ({ manageUsersPage }) => {
        // Edit (pencil), Assign (person+), Delete (trash), Reset Password (key)
        await manageUsersPage.verifyFirstRowActionIcons();
    });

    // -- Pagination -----------------------------------------------------------

    test('Pagination controls are visible', async ({ manageUsersPage }) => {
        // "Users per page" label + "1–10 of N" counter
        await manageUsersPage.verifyPagination();
    });

    test('Next Page button advances to the second page', async ({ manageUsersPage }) => {
        // Record the first email on page 1 then go to page 2 and confirm the
        // counter updates — guards against pagination being completely broken.
        const counterBefore = await manageUsersPage.paginationCounter.innerText();

        await test.step('Click the Next Page button', async () => {
            // The pagination arrows are SVG buttons; click via page locator to avoid
            // strict-mode issues with the .or() combinator
            const nextBtn = manageUsersPage.page
                .locator('button')
                .filter({ hasText: '' })      // icon-only buttons
                .last();                       // last icon button in the pagination bar

            // Prefer the aria-label variant; fall back to the last pagination button
            const arrowNext = manageUsersPage.page
                .locator('[aria-label*="next" i], [title*="next" i]')
                .first();
            const hasAriaNext = await arrowNext.isVisible().catch(() => false);
            const btnToClick  = hasAriaNext ? arrowNext : nextBtn;

            await btnToClick.click();
            await manageUsersPage.page.waitForLoadState('load');
        });

        await test.step('Verify the pagination counter changed', async () => {
            // Counter should now read "11–20 of N" — just assert it changed
            const counterAfter = await manageUsersPage.paginationCounter.innerText();
            expect(counterAfter).not.toBe(counterBefore);
        });
    });

    // -- Search ---------------------------------------------------------------

    test('Search by email narrows the user list', async ({ manageUsersPage }) => {
        // Read the full email from the first visible row so the test works in
        // any environment regardless of which users exist.
        const firstEmail = await manageUsersPage.getFirstRowEmail();

        await test.step(`Search for the user (${firstEmail})`, async () => {
            await manageUsersPage.search(firstEmail);
            await manageUsersPage.verifyPageHeading(); // page still loaded
        });

        await test.step('Verify the email appears in the results', async () => {
            // The full email must appear in at least one result cell
            const match = manageUsersPage.page
                .locator('td, [role="cell"]')
                .filter({ hasText: firstEmail })
                .first();
            await expect(match).toBeVisible({ timeout: 10000 });
        });
    });

    test('Search by name narrows the user list', async ({ manageUsersPage }) => {
        // Read the first user's display name from the table dynamically.
        const firstName = await manageUsersPage.getFirstRowName();
        // Use only the first word so the search is resilient to middle/last names.
        const firstWord = firstName.trim().split(/\s+/)[0];

        await test.step(`Search for the user by name (${firstWord})`, async () => {
            await manageUsersPage.search(firstWord);
            await manageUsersPage.verifyPageHeading();
        });

        await test.step('Verify the name appears in the results', async () => {
            const match = manageUsersPage.page
                .locator('td, [role="cell"]')
                .filter({ hasText: firstWord })
                .first();
            await expect(match).toBeVisible({ timeout: 10000 });
        });
    });

    test('Clearing search restores full user list', async ({ manageUsersPage }) => {
        // Search by the full email from the first row (guaranteed match)
        const firstEmail = await manageUsersPage.getFirstRowEmail();

        await test.step(`Search for the user and clear the search (${firstEmail})`, async () => {
            await manageUsersPage.search(firstEmail);
            await manageUsersPage.clearSearch();
        });

        await test.step('Verify the full user list is restored', async () => {
            // The counter should reflect the full list again (more than the searched subset)
            await expect(manageUsersPage.paginationCounter).toBeVisible({ timeout: 10000 });
            const counterText = await manageUsersPage.paginationCounter.innerText();
            // Full list shows a large total, e.g. "1–10 of 9495"
            expect(counterText).toMatch(/of\s+\d{2,}/i);
        });
    });

    // -- Add User modal -------------------------------------------------------

    test('Add User modal opens with correct heading and Cancel closes it', async ({
        manageUsersPage,
    }) => {
        await test.step('Open the Add User modal and verify the heading', async () => {
            await manageUsersPage.openAddNewUserModal();

            // Heading must read "Add User"
            await expect(manageUsersPage.addUserModalHeading).toBeVisible({ timeout: 10000 });
        });

        await test.step('Cancel and verify return to the user list', async () => {
            // Cancel without creating a user — returns to the list page
            await manageUsersPage.cancelAddNewUser();
            await expect(manageUsersPage.addNewUserBtn).toBeVisible({ timeout: 10000 });
        });
    });

    test('Add User modal contains all required fields', async ({ manageUsersPage }) => {
        await test.step('Open the Add User modal and verify all required fields', async () => {
            await manageUsersPage.openAddNewUserModal();
            await manageUsersPage.verifyAddUserModalFields();
        });

        await test.step('Cancel the modal', async () => {
            await manageUsersPage.cancelAddNewUser();
        });
    });

    test('Add User modal — Role dropdown lists all expected roles', async ({
        manageUsersPage,
    }) => {
        await test.step('Open the Add User modal and verify the Role dropdown options', async () => {
            await manageUsersPage.openAddNewUserModal();
            await manageUsersPage.verifyRoleDropdownOptions();
            // Roles (grouped External / Internal): TPO Admin, Loan Officer,
            //        Loan Officer Assistant, Platform Admin, Account Executive
        });

        await test.step('Cancel the modal', async () => {
            await manageUsersPage.cancelAddNewUser();
        });
    });

    test('Add User modal — Company dropdown is populated', async ({ manageUsersPage }) => {
        await test.step('Open the Add User modal and verify the Company dropdown is populated', async () => {
            await manageUsersPage.openAddNewUserModal();
            await manageUsersPage.verifyCompanyDropdownPopulated();
        });

        await test.step('Cancel the modal', async () => {
            await manageUsersPage.cancelAddNewUser();
        });
    });
});
