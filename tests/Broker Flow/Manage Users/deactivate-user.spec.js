/**
 * Manage Users — Deactivate User flow.
 *
 * Verifies the full deactivation workflow triggered by the trash icon in the
 * Actions column of the Portal Users table.
 *
 * Behaviour observed in the portal:
 *   • Clicking the trash icon opens a "Deactivate User" confirmation modal.
 *   • Modal body reads: "Are you sure you want to deactive this user?"
 *   • Buttons: CANCEL (dismisses without change) and CONFIRM (deactivates).
 *   • After confirmation the row turns grey and Active? column changes to "No".
 *
 * Tests:
 *   1. Deactivate modal — opens with correct heading, body text, and buttons;
 *      Cancel closes without deactivating (read-only, uses existing user).
 *   2. Deactivate a newly created user — full flow: create → deactivate →
 *      verify Active? = "No" in the table.
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

test.describe('Manage Users — Deactivate User', () => {
    test.beforeEach(async ({ page, manageUsersPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await manageUsersPage.navigateToManageUsers();
    });

    // -------------------------------------------------------------------------
    // Test 1 — Modal structure (non-destructive, Cancel path)
    // -------------------------------------------------------------------------

    test('Deactivate User modal opens with correct content and Cancel closes it', async ({
        manageUsersPage,
    }) => {
        // Use the first user already in the table — no account creation needed
        const firstEmail = await manageUsersPage.getFirstRowEmail();

        await test.step('Open the Deactivate User modal for the first user', async () => {
            // Open the deactivation modal
            await manageUsersPage.clickDeactivateForUser(firstEmail);
        });

        await test.step('Verify the modal content', async () => {
            // Heading is visible
            await expect(manageUsersPage.deactivateUserHeading).toBeVisible();

            // Confirmation body text is present (portal has a typo — "deactive")
            await expect(
                manageUsersPage.deactivateUserModal.getByText(/Are you sure you want to deactiv/i)
            ).toBeVisible();

            // Both action buttons are present
            await expect(manageUsersPage.deactivateUserCancelBtn).toBeVisible();
            await expect(manageUsersPage.deactivateUserConfirmBtn).toBeVisible();
        });

        await test.step('Cancel and verify the user remains active', async () => {
            // Cancel — no changes made
            await manageUsersPage.cancelDeactivateUser();

            // The user row must still exist and Active? should still read "Yes"
            const userRow = manageUsersPage.page
                .locator('tr')
                .filter({ hasText: firstEmail })
                .first();
            await expect(userRow).toBeVisible({ timeout: 10000 });
            await expect(
                userRow.locator('td').filter({ hasText: /^Yes$/i })
            ).toBeVisible({ timeout: 10000 });
        });
    });

    // -------------------------------------------------------------------------
    // Test 2 — Full deactivation flow on a freshly created user
    // -------------------------------------------------------------------------

    test('Deactivate a newly created user and verify Active? shows No', async ({
        manageUsersPage,
    }) => {
        // Step 1 — Create a fresh Loan Officer so deactivating it does not
        //          affect any real or shared test account.
        const ts        = Date.now();
        const userEmail = randomEmail();

        await test.step('Create a fresh Loan Officer user', async () => {
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

            // Confirm the user was created
            await manageUsersPage.verifyUserInTable(userEmail);
        });

        await test.step('Deactivate the user', async () => {
            // Step 2 — Open the Deactivate User modal
            await manageUsersPage.clickDeactivateForUser(userEmail);

            // Step 3 — Confirm the deactivation
            await manageUsersPage.confirmDeactivateUser();
        });

        await test.step('Verify the Active? column shows No', async () => {
            // Step 4 — Verify the Active? column now shows "No"
            await manageUsersPage.verifyUserIsDeactivated(userEmail);
        });
    });
});
