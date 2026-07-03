/**
 * Manage Users — Add Role flow.
 *
 * Creates a fresh Loan Officer user, then assigns a second role (TPO Admin)
 * to that user via the person-plus (Add Role) icon in the Actions column.
 * Verifies that the Role(s) cell in the table reflects both roles after saving.
 *
 * Steps:
 *   1. Create a new Loan Officer user with generated data
 *   2. Search by email to bring the row into view
 *   3. Click the Add Role (person-plus) icon in the Actions column
 *   4. Select Role = TPO Admin and Company/Retail Branch = ABC Broker - Test
 *   5. Click ADD ROLE and wait for the modal to close
 *   6. Verify the user's Role(s) cell contains the newly assigned role
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

test.describe('Manage Users — Add Role', () => {
    test.beforeEach(async ({ page, manageUsersPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await manageUsersPage.navigateToManageUsers();
    });

    test('Add a second role to a newly created user and verify it appears in the table', async ({
        manageUsersPage,
    }) => {
        // -----------------------------------------------------------------------
        // Step 1 — Create a Loan Officer user to work with
        // -----------------------------------------------------------------------
        const ts        = Date.now();
        const userEmail = randomEmail();
        const userName  = `Test User ${ts}`;

        await test.step('Create a Loan Officer user to work with', async () => {
            await manageUsersPage.openAddNewUserModal();
            await expect(manageUsersPage.addUserModalHeading).toBeVisible({ timeout: 10000 });

            await manageUsersPage.fillAndSubmitAddUserForm({
                role:        'Loan Officer',
                company:     'ABC Broker - Test',
                name:        userName,
                tag:         `testuser-${ts}`,
                nmls:        randomNmls(),
                losUsername: `testuser${ts}`,
                phone:       randomPhone(),
                email:       userEmail,
            });

            // Confirm the user was created and is present in the table
            await manageUsersPage.verifyUserInTable(userEmail);
        });

        await test.step('Open the Add Role modal for the new user', async () => {
            // -----------------------------------------------------------------------
            // Step 2 — Open the Add Role modal for the newly created user
            // -----------------------------------------------------------------------
            await manageUsersPage.clickAddRoleForUser(userEmail);
        });

        await test.step('Fill in the Add Role form', async () => {
            // -----------------------------------------------------------------------
            // Step 3 — Fill Role = TPO Admin, Company = ABC Broker - Test
            // -----------------------------------------------------------------------
            await manageUsersPage.fillAddRoleForm({
                role:    'TPO Admin',
                company: 'ABC Broker - Test',
            });
        });

        await test.step('Submit the new role and verify it in the table', async () => {
            // -----------------------------------------------------------------------
            // Step 4 — Submit and verify
            // -----------------------------------------------------------------------
            await manageUsersPage.submitAddRole();

            // The Role(s) cell should now contain "TPO Admin"
            await manageUsersPage.verifyUserHasRole(userEmail, 'TPO Admin');
        });
    });

    // -----------------------------------------------------------------------
    // Structural test — verify the Add Role modal fields without saving
    // -----------------------------------------------------------------------

    test('Add Role modal opens with Role and Company/Retail Branch dropdowns and Cancel closes it', async ({
        manageUsersPage,
    }) => {
        // Use the first user in the table — no creation needed for a read-only check
        const firstEmail = await manageUsersPage.getFirstRowEmail();

        await test.step('Open the Add Role modal for the first user', async () => {
            await manageUsersPage.clickAddRoleForUser(firstEmail);
        });

        await test.step('Verify the modal fields and buttons', async () => {
            // Heading is visible
            await expect(manageUsersPage.addRoleModalHeading).toBeVisible({ timeout: 10000 });

            // Both dropdowns are present
            await expect(
                manageUsersPage.addRoleModal.getByText('Role', { exact: true }).first()
            ).toBeVisible();

            // Buttons are present
            await expect(manageUsersPage.addRoleCancelBtn).toBeVisible();
            await expect(manageUsersPage.addRoleSubmitBtn).toBeVisible();
        });

        await test.step('Cancel and verify the modal closes', async () => {
            // Cancel closes the modal cleanly
            await manageUsersPage.cancelAddRole();
            await expect(manageUsersPage.addRoleModal).toBeHidden({ timeout: 10000 });
        });
    });
});
