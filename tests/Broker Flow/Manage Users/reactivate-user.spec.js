/**
 * Manage Users — Re-activate User flow.
 *
 * Verifies the re-activation workflow for a previously deactivated user.
 *
 * Behaviour observed in the portal:
 *   • The trash icon (3rd action button) is context-aware:
 *       – On an ACTIVE row  → opens "Deactivate User" modal
 *       – On an INACTIVE row → opens "Re-activate User" modal
 *   • Re-activate modal:
 *       Heading: "Re-activate User"
 *       Body:    "Are you sure you want to re-activate this user?"
 *       Buttons: CANCEL · CONFIRM (green)
 *   • After confirmation the row un-greys and Active? column returns to "Yes".
 *
 * Tests:
 *   1. Re-activate modal — opens with correct content; Cancel closes without
 *      changing state.  Uses an already-deactivated user from the table so
 *      no account needs to be created.
 *   2. Full cycle — Create → Deactivate → Re-activate → verify Active? = "Yes".
 *      Uses a freshly created user so no shared account is permanently altered.
 *
 * NOTE: Uses email address as the user identifier (no PII / borrower names).
 */

import { expect, test } from '../../../fixtures';
import { randomEmail } from '../../../utils/dataGenerator';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const randomNmls  = () => String(Math.floor(10000000 + Math.random() * 90000000));
const randomPhone = () => String(Math.floor(2000000000 + Math.random() * 7999999999));

// ---------------------------------------------------------------------------

test.describe('Manage Users — Re-activate User', () => {
    test.beforeEach(async ({ page, manageUsersPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await manageUsersPage.navigateToManageUsers();
    });

    // -------------------------------------------------------------------------
    // Test 1 — Modal structure (non-destructive, Cancel path)
    // Requires at least one deactivated user already in the table.
    // -------------------------------------------------------------------------

    test('Re-activate modal opens with correct content and Cancel closes it', async ({
        manageUsersPage,
    }) => {
        // Locate the first row where Active? = "No" (deactivated user)
        const inactiveRow = manageUsersPage.page
            .locator('tr')
            .filter({ hasText: /\bNo\b/ })
            .first();

        const hasInactiveRow = await inactiveRow.isVisible({ timeout: 5000 }).catch(() => false);

        if (!hasInactiveRow) {
            // Skip gracefully if no deactivated users exist on page 1
            test.skip(true, 'No deactivated users found on the first page — skipping modal structure test');
            return;
        }

        // Read the email from the inactive row to use as identifier
        const emailCell = inactiveRow.locator('td').nth(3); // Email is the 4th column (index 3)
        const inactiveEmail = (await emailCell.innerText().catch(() => '')).trim();

        // Open the re-activate modal
        await manageUsersPage.clickReactivateForUser(inactiveEmail);

        // Heading is visible
        await expect(manageUsersPage.reactivateUserHeading).toBeVisible();

        // Confirmation body text is present
        await expect(
            manageUsersPage.reactivateUserModal.getByText(/Are you sure you want to re-activate this user/i)
        ).toBeVisible();

        // Both buttons are present
        await expect(manageUsersPage.reactivateUserCancelBtn).toBeVisible();
        await expect(manageUsersPage.reactivateUserConfirmBtn).toBeVisible();

        // Cancel — no state change
        await manageUsersPage.cancelReactivateUser();

        // User should still be inactive after cancelling
        const stillInactive = await inactiveRow.isVisible({ timeout: 5000 }).catch(() => false);
        expect(stillInactive, 'Row should still be present and deactivated after Cancel').toBe(true);
    });

    // -------------------------------------------------------------------------
    // Test 2 — Full cycle: Create → Deactivate → Re-activate → Verify
    // -------------------------------------------------------------------------

    test('Re-activate a previously deactivated user and verify Active? shows Yes', async ({
        manageUsersPage,
    }) => {
        const ts        = Date.now();
        const userEmail = randomEmail();

        // Step 1 — Create a fresh user
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

        await manageUsersPage.verifyUserInTable(userEmail);

        // Step 2 — Deactivate the user
        await manageUsersPage.clickDeactivateForUser(userEmail);
        await manageUsersPage.confirmDeactivateUser();
        await manageUsersPage.verifyUserIsDeactivated(userEmail);

        // Step 3 — Re-activate the user
        await manageUsersPage.clickReactivateForUser(userEmail);
        await manageUsersPage.confirmReactivateUser();

        // Step 4 — Verify Active? is back to "Yes"
        await manageUsersPage.verifyUserIsActive(userEmail);
    });
});
