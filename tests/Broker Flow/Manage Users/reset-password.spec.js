/**
 * Manage Users — Reset Password flow.
 *
 * Verifies that clicking the key (Reset Password) icon in the Actions column
 * triggers a password-reset request and shows a success toast notification.
 *
 * Behaviour observed in the portal:
 *   • No confirmation modal — the action fires immediately on click.
 *   • A green toast "Password reset request sent" appears at the bottom of the
 *     page and auto-dismisses after a few seconds.
 *
 * Tests:
 *   1. Reset Password on a newly created user — end-to-end with a known email.
 *   2. Reset Password on the first existing user in the table — quick smoke
 *      check that does not require creating a new account.
 *
 * NOTE: Uses email address as the user identifier per policy (no PII / borrower names).
 */

import { expect, test } from '../../fixtures';
import { randomEmail } from '../../utils/dataGenerator';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const randomNmls  = () => String(Math.floor(10000000 + Math.random() * 90000000));
const randomPhone = () => String(Math.floor(2000000000 + Math.random() * 7999999999));

// ---------------------------------------------------------------------------

test.describe('Manage Users — Reset Password', () => {
    test.beforeEach(async ({ page, manageUsersPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await manageUsersPage.navigateToManageUsers();
    });

    // -------------------------------------------------------------------------
    // Test 1 — Reset password for a newly created user
    // -------------------------------------------------------------------------

    test('Reset password for a newly created user shows success toast', async ({
        manageUsersPage,
    }) => {
        // Step 1 — Create a fresh Loan Officer so we have a known email
        const ts        = Date.now();
        const userEmail = randomEmail();

        await manageUsersPage.openAddNewUserModal();
        await expect(manageUsersPage.addUserModalHeading).toBeVisible({ timeout: 10000 });

        await manageUsersPage.fillAndSubmitAddUserForm({
            role:        'Loan Officer',
            company:     'ABC Broker - Test',
            name:        `Test User ${ts}`,
            tag:         `testuser-${ts}`,
            nmls:        randomNmls(),
            losUsername: `testuser${ts}`,
            phone:       randomPhone(),
            email:       userEmail,
        });

        // Confirm the user exists in the table
        await manageUsersPage.verifyUserInTable(userEmail);

        // Step 2 — Click the Reset Password (key) icon for this user
        await manageUsersPage.clickResetPasswordForUser(userEmail);

        // Step 3 — Verify the success toast
        await manageUsersPage.verifyResetPasswordToast();
    });

    // -------------------------------------------------------------------------
    // Test 2 — Reset password smoke test on first existing user
    // -------------------------------------------------------------------------

    test('Reset password on an existing user shows success toast', async ({
        manageUsersPage,
    }) => {
        // Use the first user already in the table — no account creation needed
        const firstEmail = await manageUsersPage.getFirstRowEmail();

        // Click the Reset Password icon
        await manageUsersPage.clickResetPasswordForUser(firstEmail);

        // Verify the success toast appears
        await manageUsersPage.verifyResetPasswordToast();
    });
});
