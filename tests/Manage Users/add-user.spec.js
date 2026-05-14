/**
 * Manage Users — Add New User + Edit User flows.
 *
 * Test 1 — Create:
 *   Creates a Loan Officer user with fully generated data, submits the form,
 *   then verifies the new user appears in the Portal Users table.
 *
 * Test 2 — Edit:
 *   Re-opens the same user via the pencil icon, updates the display name,
 *   saves the modal, and confirms the updated name is reflected in the table.
 *
 * Fields filled on create:
 *   Role                          → Loan Officer
 *   Company                       → ABC Broker - Test
 *   Name                          → generated (Test User <timestamp>)
 *   Loan Officer's Tag            → generated slug  (testuser-<timestamp>)
 *   Loan Officer's NMLS License # → generated 8-digit number
 *   LOS Username                  → generated (testuser<timestamp>)
 *   Phone Number                  → generated 10-digit number
 *   Email Address                 → randomEmail() (mailinator)
 *   Initial Password              → pre-filled by the portal (not changed)
 *
 * NOTE: The test uses loan number / email as the user identifier per policy.
 * No PII (borrower names) is stored in test data.
 */

import { expect, test } from '../../fixtures';
import { randomEmail } from '../../utils/dataGenerator';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns a random 8-digit NMLS-style number as a string. */
const randomNmls = () =>
    String(Math.floor(10000000 + Math.random() * 90000000));

/** Returns a 10-digit US phone number string (no formatting). */
const randomPhone = () =>
    String(Math.floor(2000000000 + Math.random() * 7999999999));

// ---------------------------------------------------------------------------
// Shared test data — generated once at module level so both tests
// reference the same email address.
// ---------------------------------------------------------------------------

const ts        = Date.now();
const userEmail = randomEmail();
const userName  = `Test User ${ts}`;
const userTag   = `testuser-${ts}`;
const userNmls  = randomNmls();
const userLos   = `testuser${ts}`;
const userPhone = randomPhone();

const userData = {
    role:        'Loan Officer',
    company:     'ABC Broker - Test',
    name:        userName,
    tag:         userTag,
    nmls:        userNmls,
    losUsername: userLos,
    phone:       userPhone,
    email:       userEmail,
};

// ---------------------------------------------------------------------------

test.describe('Manage Users — Add & Edit User', () => {
    test.beforeEach(async ({ page, manageUsersPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('networkidle');
        await manageUsersPage.navigateToManageUsers();
    });

    // -------------------------------------------------------------------------
    // Test 1 — Create
    // -------------------------------------------------------------------------

    test('Create a Loan Officer user with generated data and verify in table', async ({
        manageUsersPage,
    }) => {
        // Step 1 — Open modal
        await manageUsersPage.openAddNewUserModal();
        await expect(manageUsersPage.addUserModalHeading).toBeVisible({ timeout: 10000 });

        // Step 2 — Fill form and submit
        await manageUsersPage.fillAndSubmitAddUserForm(userData);

        // Step 3 — Search for the newly created user by email and verify presence
        await manageUsersPage.verifyUserInTable(userEmail);

        // Step 4 — Confirm key columns for the found row
        const userRow = manageUsersPage.page
            .locator('tr')
            .filter({ hasText: userEmail })
            .first();

        // Email column
        await expect(userRow.locator('td').filter({ hasText: userEmail })).toBeVisible();

        // Name column
        await expect(userRow.locator('td').filter({ hasText: userName })).toBeVisible();
    });

    // -------------------------------------------------------------------------
    // Test 2 — Edit
    // -------------------------------------------------------------------------

    test('Edit the created user and verify the updated name is displayed', async ({
        manageUsersPage,
    }) => {
        // Build an updated name so we can distinguish it from the original
        const updatedName = `${userName} (edited)`;

        // Step 1 — Search for the user so the row is visible
        await manageUsersPage.search(userEmail);

        const userRow = manageUsersPage.page
            .locator('tr')
            .filter({ hasText: userEmail })
            .first();
        await expect(userRow).toBeVisible({ timeout: 10000 });

        // Step 2 — Open the Edit User modal for this row
        await manageUsersPage.clickEditForUser(userEmail);

        // Step 3 — Update the display name
        await manageUsersPage.fillEditUserForm({ name: updatedName });

        // Step 4 — Save and wait for the modal to close
        await manageUsersPage.saveEditUser();

        // Step 5 — Confirm the table now shows the updated name
        await manageUsersPage.verifyUpdatedUser(userEmail, updatedName);
    });
});
