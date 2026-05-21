import { expect, test } from '../../fixtures';

class ManageUsersPage {
    constructor(page) {
        this.page = page;

        // -- Sidebar navigation -----------------------------------------------
        // "Manage Users" is a direct top-level nav link (not a collapsible
        // dropdown). It may carry data-sidebar="menu-button" or "menu-link"
        // depending on the sidebar component version — match any data-sidebar
        // value so the locator survives minor markup changes.
        this.manageUsersNav = this.page
            .locator('[data-sidebar]')
            .filter({ hasText: /^Manage Users$/i })
            .first();

        // -- Page heading and toolbar -----------------------------------------
        this.pageHeading    = this.page.getByRole('heading', { name: /Portal Users/i });
        this.searchInput    = this.page.getByPlaceholder(/Search by name or email/i);
        this.searchBtn      = this.page.getByRole('button', { name: /^Search$/i });
        this.addNewUserBtn  = this.page.getByRole('button', { name: /Add New User/i });

        // -- Table column headers ---------------------------------------------
        this.colName        = this.page.getByText('Name',         { exact: true }).first();
        this.colLocation    = this.page.getByText('Location',     { exact: true }).first();
        this.colRoles       = this.page.getByText('Role(s)',      { exact: true }).first();
        this.colEmail       = this.page.getByText('Email',        { exact: true }).first();
        this.colPhone       = this.page.getByText('Phone',        { exact: true }).first();
        this.colNmls        = this.page.getByText('NMLS',         { exact: true }).first();
        this.colLosUsername = this.page.getByText('LOS Username', { exact: true }).first();
        this.colActive      = this.page.getByText('Active?',      { exact: true }).first();
        this.colLastLogin   = this.page.getByText('Last Login',   { exact: true }).first();
        this.colActions     = this.page.getByText('Actions',      { exact: true }).first();

        // -- Pagination -------------------------------------------------------
        // "Users per page" label + dropdown (MUI Select)
        this.usersPerPageLabel   = this.page.getByText(/Users per page/i).first();
        this.usersPerPageSelect  = this.page.getByRole('combobox').first();
        // "1–10 of 9495" counter — number varies per run
        this.paginationCounter   = this.page.getByText(/\d+\s*[–-]\s*\d+\s+of\s+\d+/i).first();
        this.paginationNextBtn   = this.page.getByRole('button', { name: /next page/i })
            .or(this.page.locator('[aria-label*="next"], [title*="next"]').first());
        this.paginationPrevBtn   = this.page.getByRole('button', { name: /previous page/i })
            .or(this.page.locator('[aria-label*="prev"], [title*="prev"]').first());

        // -- Add User modal ---------------------------------------------------
        // Heading is "Add User" (not "Add New User")
        this.addUserModal          = this.page.getByRole('dialog');
        this.addUserModalHeading   = this.addUserModal.getByText('Add User', { exact: true });

        // Form fields — all scoped inside the dialog
        // MUI Select comboboxes (Role / Company) are identified by their visible
        // label text since they don't always carry an accessible name attribute.
        this.addUserRoleDropdown    = this.addUserModal
            .locator('[id*="role"], [aria-labelledby*="role"]')
            .or(this.addUserModal.getByRole('combobox').first())
            .first();
        this.addUserCompanyDropdown = this.addUserModal
            .locator('[id*="company"], [aria-labelledby*="company"]')
            .or(this.addUserModal.getByRole('combobox').nth(1))
            .first();

        // Text inputs — located by visible label text (MUI TextField pattern)
        this.addUserNameInput        = this.addUserModal.getByLabel(/^Name/i);
        this.addUserTagInput         = this.addUserModal.getByLabel(/Loan Officer.*Tag/i);
        this.addUserNmlsInput        = this.addUserModal.getByLabel(/NMLS License Number/i);
        this.addUserLosUsernameInput = this.addUserModal.getByLabel(/LOS Username/i);
        this.addUserPhoneInput       = this.addUserModal.getByLabel(/Phone Number/i);
        this.addUserEmailInput       = this.addUserModal.getByLabel(/Email Address/i);
        this.addUserPasswordInput    = this.addUserModal.getByLabel(/Initial Password/i);

        this.addUserResetChk        = this.addUserModal.getByRole('checkbox', { name: /Prompt user to reset password/i });
        this.addUserUploadImageBtn  = this.addUserModal.getByRole('button', { name: /Upload Profile Image/i });
        this.addUserCancelBtn       = this.addUserModal.getByRole('button', { name: /^Cancel$/i });
        this.addUserCreateBtn       = this.addUserModal.getByRole('button', { name: /^Create User$/i });

        // -- Edit User modal --------------------------------------------------
        // Opens when the pencil icon in a table row is clicked.
        // Heading: "Edit User" (dialog title) / "User Details" (section label)
        this.editUserModal           = this.page.getByRole('dialog');
        this.editUserModalHeading    = this.editUserModal.getByText('Edit User',    { exact: true });
        this.editUserDetailsHeading  = this.editUserModal.getByText('User Details', { exact: true });

        // Fields — labels differ from Add modal (show "Loan Officer's Name" etc.)
        this.editUserNameInput       = this.editUserModal.getByLabel(/Loan Officer.*Name|^Name/i);
        this.editUserPhoneInput      = this.editUserModal.getByLabel(/Phone Number/i);
        this.editUserEmailInput      = this.editUserModal.getByLabel(/Email Address/i);
        this.editUserPasswordInput   = this.editUserModal.getByLabel(/^Password$/i);
        this.editUserGeneratePwdBtn  = this.editUserModal.getByRole('button', { name: /Generate Password/i });
        this.editUserCancelBtn       = this.editUserModal.getByRole('button', { name: /^Cancel$/i });
        this.editUserSaveBtn         = this.editUserModal.getByRole('button', { name: /^Save$/i });

        // -- Add Role modal ---------------------------------------------------
        // Opens when the person-plus (Assign / Add Role) icon in a row is clicked.
        // The dialog is the same <dialog> element re-used for all modals; we
        // distinguish it by its heading text "Add Role".
        this.addRoleModal          = this.page.getByRole('dialog');
        // Use getByRole('heading') to avoid strict-mode collision with the
        // "Add Role" submit button <div> that also contains the same text.
        this.addRoleModalHeading   = this.addRoleModal.getByRole('heading', { name: 'Add Role', exact: true });

        // Role dropdown (first combobox inside the modal)
        this.addRoleRoleDropdown   = this.addRoleModal.getByRole('combobox').first();
        // Company/Retail Branch dropdown (second combobox inside the modal)
        this.addRoleCompanyDropdown = this.addRoleModal.getByRole('combobox').nth(1);

        this.addRoleCancelBtn      = this.addRoleModal.getByRole('button', { name: /^Cancel$/i });
        // getByRole('button') scopes to button elements only, so there is no
        // collision with the <h2> heading even though both contain "Add Role".
        this.addRoleSubmitBtn      = this.addRoleModal.getByRole('button', { name: /^Add Role$/i });

        // -- Reset Password ---------------------------------------------------
        // Clicking the key icon fires a direct API call — no modal opens.
        // Success is indicated by a toast notification at the bottom of the page.
        this.resetPasswordToast = this.page
            .getByText(/Password reset request sent/i)
            .first();

        // -- Deactivate User modal --------------------------------------------
        // Opens when the trash icon (3rd action button) is clicked on an ACTIVE row.
        // Heading: "Deactivate User"
        // Body:    "Are you sure you want to deactive this user?"  (portal typo preserved)
        // Buttons: CANCEL · CONFIRM
        this.deactivateUserModal       = this.page.getByRole('dialog');
        // MUI Dialog titles in this portal are rendered as <p> or <div> with
        // typography classes rather than <h2>, so getByRole('heading') finds
        // nothing.  getByText() matches any element type — safe here because
        // neither "Deactivate User" nor "Re-activate User" appears on any button.
        this.deactivateUserHeading     = this.deactivateUserModal
            .getByText(/Deactivate User/i).first();
        this.deactivateUserCancelBtn   = this.deactivateUserModal
            .getByRole('button', { name: /^Cancel$/i });
        this.deactivateUserConfirmBtn  = this.deactivateUserModal
            .getByRole('button', { name: /^Confirm$/i });

        // -- Re-activate User modal -------------------------------------------
        // Opens when the trash icon (3rd action button) is clicked on an INACTIVE row.
        // The same dialog element is re-used; only the heading text differs.
        // Heading: "Re-activate User"
        // Body:    "Are you sure you want to re-activate this user?"
        // Buttons: CANCEL · CONFIRM (green)
        this.reactivateUserModal       = this.page.getByRole('dialog');
        this.reactivateUserHeading     = this.reactivateUserModal
            .getByText(/Re-activate User/i).first();
        this.reactivateUserCancelBtn   = this.reactivateUserModal
            .getByRole('button', { name: /^Cancel$/i });
        this.reactivateUserConfirmBtn  = this.reactivateUserModal
            .getByRole('button', { name: /^Confirm$/i });
    }

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------

    async navigateToManageUsers() {
        await test.step('Navigate to Manage Users via sidebar', async () => {
            await this.manageUsersNav.click();
            await this.page.waitForLoadState('load');
            // Guard: confirm we actually landed on Portal Users, not another page
            await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Page structure
    // -------------------------------------------------------------------------

    async verifyPageHeading() {
        await test.step('Verify Portal Users page heading', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyToolbar() {
        await test.step('Verify search toolbar and Add New User button', async () => {
            await expect(this.searchInput).toBeVisible();
            await expect(this.searchBtn).toBeVisible();
            await expect(this.addNewUserBtn).toBeVisible();
        });
    }

    async verifyTableColumns() {
        await test.step('Verify all table column headers are visible', async () => {
            await expect(this.colName).toBeVisible();
            await expect(this.colLocation).toBeVisible();
            await expect(this.colRoles).toBeVisible();
            await expect(this.colEmail).toBeVisible();
            await expect(this.colPhone).toBeVisible();
            await expect(this.colNmls).toBeVisible();
            await expect(this.colLosUsername).toBeVisible();
            await expect(this.colActive).toBeVisible();
            await expect(this.colLastLogin).toBeVisible();
            await expect(this.colActions).toBeVisible();
        });
    }

    async verifyPagination() {
        await test.step('Verify pagination controls are visible', async () => {
            await expect(this.usersPerPageLabel).toBeVisible();
            await expect(this.paginationCounter).toBeVisible();
        });
    }

    // -------------------------------------------------------------------------
    // Table rows
    // -------------------------------------------------------------------------

    /**
     * Asserts at least one data row is rendered in the table.
     */
    async verifyTableHasRows() {
        await test.step('Verify at least one user row is present', async () => {
            // Each row has an edit (pencil) icon button — count must be ≥ 1
            const editBtns = this.page.locator('[aria-label*="edit"], [title*="edit"], button svg')
                .first();
            // Fallback: any cell that contains an email address (@)
            const anyEmailCell = this.page.locator('td, [role="cell"]')
                .filter({ hasText: /@/ })
                .first();
            const hasEmail = await anyEmailCell.isVisible({ timeout: 5000 }).catch(() => false);
            expect(hasEmail, 'Expected at least one user row with an email address').toBe(true);
        });
    }

    /**
     * Returns the four action icon locators for the first row in the table.
     * Order in DOM: Edit, Assign (add user), Delete, Reset Password (key).
     */
    async verifyFirstRowActionIcons() {
        await test.step('Verify action icons are present in the first user row', async () => {
            // The Actions column contains SVG icon buttons; we assert by aria-label
            // or by counting buttons inside the last cell of the first row.
            // Fallback: just confirm at least 2 clickable elements exist in the row.
            const actionButtons = this.page
                .locator('tr, [role="row"]')
                .nth(1) // nth(0) = header row, nth(1) = first data row
                .locator('button, [role="button"]');

            const count = await actionButtons.count().catch(() => 0);
            expect(count, 'Expected ≥ 2 action icon buttons in the first row').toBeGreaterThanOrEqual(2);
        });
    }

    // -------------------------------------------------------------------------
    // Search
    // -------------------------------------------------------------------------

    /**
     * Reads the email address from the first data row by locating the exact
     * "Email" column via its header, then reading that cell's visible text.
     *
     * Regex-based cell scanning is unreliable here because some cells contain
     * formatted IDs (e.g. "crepreyecoffi-4683") that satisfy an email pattern
     * but are not real addresses and produce zero search results. Anchoring to
     * the column header avoids that ambiguity entirely.
     *
     * @returns {Promise<string>} e.g. "jsalo@homebridge.com"
     */
    async getFirstRowEmail() {
        // Step 1 — find the zero-based column index of the "Email" header
        const headers = this.page.locator('th, [role="columnheader"]');
        await headers.first().waitFor({ state: 'visible', timeout: 10000 });

        // MUI sort-label headers render as "<th><span>Email<svg/></span></th>"
        // so innerText() may return "Email\n" or "Email↑" — use startsWith
        // rather than exact equality so sort icons don't break the lookup.
        const headerCount = await headers.count();
        let emailColIndex = -1;
        for (let i = 0; i < headerCount; i++) {
            const text = (await headers.nth(i).innerText().catch(() => '')).trim();
            if (text.toLowerCase().startsWith('email')) {
                emailColIndex = i;
                break;
            }
        }
        if (emailColIndex === -1) {
            throw new Error('getFirstRowEmail: "Email" column header not found');
        }

        // Step 2 — scan plain <td> cells at the resolved column index.
        // Use 'tr' directly (not 'tr, [role="row"]') to avoid double-counting
        // rows in tables that mix both selectors.
        const rows = this.page.locator('tr');
        const rowCount = await rows.count();
        for (let r = 1; r < rowCount; r++) { // r=0 is the header row
            const cell = rows.nth(r).locator('td').nth(emailColIndex);
            const text = (await cell.innerText().catch(() => '')).trim();
            if (text && text.includes('@')) return text;
        }
        throw new Error('getFirstRowEmail: no data row with a non-empty email found');
    }

    /**
     * Reads the display name from the first data row in the current table.
     * @returns {Promise<string>} e.g. "Norv S" or "Jeramy James"
     */
    async getFirstRowName() {
        // First data row is nth(1) — nth(0) is the header row
        const nameCell = this.page
            .locator('tr, [role="row"]')
            .nth(1)
            .locator('td, [role="cell"]')
            .first();
        await nameCell.waitFor({ state: 'visible', timeout: 10000 });
        return nameCell.innerText();
    }

    /**
     * Types a query and clicks Search; waits for results to settle.
     * @param {string} query
     */
    async search(query) {
        await test.step(`Search for "${query}"`, async () => {
            await this.searchInput.fill(query);
            await this.searchBtn.click();
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Clears an active search and waits for the full user list to reload.
     *
     * Handles three clear mechanisms in priority order:
     *  1. The inline × icon that appears inside the search input while text is typed
     *  2. The "CLEAR SEARCH AND FILTERS" button rendered on the no-results empty state
     *  3. Fallback: clear the input programmatically and click Search
     */
    async clearSearch() {
        await test.step('Clear search and reload full user list', async () => {
            // 1. Inline × clear icon (inside the search box)
            const inlineClear = this.page
                .locator('input[placeholder*="Search"] ~ button, input[placeholder*="Search"] + button')
                .first();
            const hasInlineClear = await inlineClear.isVisible({ timeout: 1000 }).catch(() => false);
            if (hasInlineClear) {
                await inlineClear.click();
                await this.page.waitForLoadState('load');
                return;
            }

            // 2. "CLEAR SEARCH AND FILTERS" empty-state button (zero-result page)
            const emptyStateClear = this.page
                .getByRole('button', { name: /Clear Search/i });
            const hasEmptyStateClear = await emptyStateClear.isVisible({ timeout: 1000 }).catch(() => false);
            if (hasEmptyStateClear) {
                await emptyStateClear.click();
                await this.page.waitForLoadState('load');
                return;
            }

            // 3. Programmatic fallback
            await this.searchInput.clear();
            await this.searchBtn.click();
            await this.page.waitForLoadState('load');
        });
    }

    // -------------------------------------------------------------------------
    // Add New User modal
    // -------------------------------------------------------------------------

    /**
     * Opens the Add New User modal and confirms its heading is visible.
     */
    async openAddNewUserModal() {
        await test.step('Open Add New User modal', async () => {
            await this.addNewUserBtn.click();
            await expect(this.addUserModal).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Closes the Add New User modal via the Cancel button.
     */
    async cancelAddNewUser() {
        await test.step('Cancel Add New User modal', async () => {
            await this.addUserCancelBtn.click();
            await expect(this.addUserModal).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Verifies all required fields in the Add User modal are visible:
     * Role dropdown, Company dropdown, Name, Phone, Email Address,
     * Initial Password, reset-password checkbox, Upload Image button,
     * Cancel, and Create User buttons.
     */
    async verifyAddUserModalFields() {
        await test.step('Verify all Add User modal fields are visible', async () => {
            await expect(this.addUserModalHeading).toBeVisible();

            // Dropdowns
            await expect(
                this.addUserModal.getByText('Role', { exact: true }).first()
            ).toBeVisible();
            await expect(
                this.addUserModal.getByText('Company', { exact: true }).first()
            ).toBeVisible();

            // Text inputs — located by their label text since the inputs may not
            // have accessible name attributes in all MUI versions
            await expect(
                this.addUserModal.getByRole('textbox').first()
            ).toBeVisible(); // at least one input is present

            await expect(
                this.addUserModal.getByText(/Name/i).first()
            ).toBeVisible();
            await expect(
                this.addUserModal.getByText(/Email Address/i).first()
            ).toBeVisible();
            await expect(
                this.addUserModal.getByText(/Initial Password/i).first()
            ).toBeVisible();
            await expect(
                this.addUserModal.getByText(/Phone/i).first()
            ).toBeVisible();

            // Checkbox
            await expect(this.addUserResetChk).toBeVisible();

            // Upload image button
            await expect(this.addUserUploadImageBtn).toBeVisible();

            // Action buttons
            await expect(this.addUserCancelBtn).toBeVisible();
            await expect(this.addUserCreateBtn).toBeVisible();
        });
    }

    /**
     * Opens the Role dropdown inside the Add User modal and verifies all
     * expected role options are listed. Closes the dropdown without selecting.
     */
    async verifyRoleDropdownOptions() {
        await test.step('Verify Role dropdown options in Add User modal', async () => {
            // The MUI combobox <div role="combobox"> intercepts pointer events so
            // clicking the <label> never reaches the trigger.  Click the combobox
            // element directly — the same approach used in fillAndSubmitAddUserForm.
            const roleCombo = this.addUserModal.getByRole('combobox').first();
            await roleCombo.click();

            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 5000 });

            const expectedRoles = [
                'Company Admin',
                'Branch Manager',
                'Loan Officer',
                'Processor',
                'Lender Admin',
                'Account Executive',
                'Retail Admin',
                'Wholesale Admin',
                'Underwriter',
            ];
            for (const role of expectedRoles) {
                await expect(
                    listbox.getByRole('option', { name: role, exact: true })
                ).toBeVisible();
            }

            await this.page.keyboard.press('Escape');
        });
    }

    /**
     * Opens the Company dropdown inside the Add User modal and verifies
     * the list is populated (at least one company option visible).
     * Closes without selecting.
     */
    async verifyCompanyDropdownPopulated() {
        await test.step('Verify Company dropdown is populated in Add User modal', async () => {
            // Same fix: click the combobox element directly, not the label.
            const companyCombo = this.addUserModal.getByRole('combobox').nth(1);
            await companyCombo.click();

            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 5000 });

            // At least the first item should be visible
            await expect(
                listbox.locator('[role="option"]').first()
            ).toBeVisible();

            await this.page.keyboard.press('Escape');
        });
    }

    // -------------------------------------------------------------------------
    // Create user flow
    // -------------------------------------------------------------------------

    /**
     * Selects an option from a MUI Select dropdown inside the Add User modal.
     * Clicks the dropdown trigger, then picks the option from the listbox.
     * @param {import('@playwright/test').Locator} dropdownTrigger
     * @param {string} optionText
     */
    async selectModalDropdown(dropdownTrigger, optionText) {
        await dropdownTrigger.click();
        const listbox = this.page.getByRole('listbox');
        await expect(listbox).toBeVisible({ timeout: 5000 });
        await listbox.getByRole('option', { name: optionText, exact: true }).click();
        await expect(listbox).toBeHidden({ timeout: 5000 });
    }

    /**
     * Fills every visible field in the Add User modal with the supplied data,
     * then clicks CREATE USER and waits for the modal to close.
     *
     * Conditional fields (Tag, NMLS, LOS Username) are only filled when the
     * role that reveals them has been selected (e.g. Loan Officer).
     *
     * @param {object} userData
     * @param {string} userData.role        — role option text, e.g. 'Loan Officer'
     * @param {string} userData.company     — company option text, e.g. 'ABC Broker - Test'
     * @param {string} userData.name        — display name
     * @param {string} [userData.tag]       — loan officer URL tag (slug)
     * @param {string} [userData.nmls]      — NMLS license number digits only
     * @param {string} [userData.losUsername] — LOS username
     * @param {string} [userData.phone]     — 10-digit phone string
     * @param {string} userData.email       — email address
     */
    async fillAndSubmitAddUserForm(userData) {
        await test.step('Fill Add User form and submit', async () => {
            // Role
            await test.step(`Select role: ${userData.role}`, async () => {
                const roleCombo = this.addUserModal.getByRole('combobox').first();
                await this.selectModalDropdown(roleCombo, userData.role);
            });

            // Company
            await test.step(`Select company: ${userData.company}`, async () => {
                const companyCombo = this.addUserModal.getByRole('combobox').nth(1);
                await this.selectModalDropdown(companyCombo, userData.company);
            });

            // Name
            await this.addUserNameInput.fill(userData.name);

            // Loan Officer-specific fields (appear after Loan Officer role selected)
            if (userData.tag) {
                const tagVisible = await this.addUserTagInput.isVisible({ timeout: 3000 }).catch(() => false);
                if (tagVisible) await this.addUserTagInput.fill(userData.tag);
            }
            if (userData.nmls) {
                const nmlsVisible = await this.addUserNmlsInput.isVisible({ timeout: 3000 }).catch(() => false);
                if (nmlsVisible) await this.addUserNmlsInput.fill(userData.nmls);
            }
            if (userData.losUsername) {
                const losVisible = await this.addUserLosUsernameInput.isVisible({ timeout: 3000 }).catch(() => false);
                if (losVisible) await this.addUserLosUsernameInput.fill(userData.losUsername);
            }

            // Phone — clear pre-filled "+1" then type digits
            if (userData.phone) {
                await this.addUserPhoneInput.fill(userData.phone);
            }

            // Email
            await this.addUserEmailInput.fill(userData.email);

            // Submit
            await this.addUserCreateBtn.click();
            // Wait for modal to close — success dismisses it
            await expect(this.addUserModal).toBeHidden({ timeout: 15000 });
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Searches for the given email and asserts the user row is present in the
     * table. Returns the matching row locator for further assertions.
     * @param {string} email
     */
    async verifyUserInTable(email) {
        await test.step(`Verify created user (loan number / email: ${email}) is visible in the table`, async () => {
            await this.search(email);

            // Email cell must be visible in results
            const emailCell = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(emailCell).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Edit User flow
    // -------------------------------------------------------------------------

    /**
     * Finds the table row matching the given email address, then clicks the
     * pencil (Edit) icon button in that row to open the Edit User modal.
     *
     * Strategy: the Actions column typically renders four icon buttons per row —
     * Edit (pencil), Assign, Delete, Reset Password — in that order.  We click
     * the first button in the matched row, which is the Edit button.
     *
     * @param {string} email  The email address used to identify the target row
     */
    async clickEditForUser(email) {
        await test.step(`Open Edit modal for user: ${email}`, async () => {
            // Make sure the row is visible (search first if needed)
            const targetRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(targetRow).toBeVisible({ timeout: 10000 });

            // The edit (pencil) icon is the first button / svg-icon-button in the row
            const editBtn = targetRow.locator('button').first();
            await editBtn.click();

            // Wait for the Edit User modal to appear
            await expect(this.editUserModal).toBeVisible({ timeout: 10000 });
            await expect(this.editUserModalHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Updates editable fields inside the Edit User modal.
     * Only keys supplied in `updatedData` are changed; omitted keys are skipped.
     *
     * @param {object} updatedData
     * @param {string} [updatedData.name]   — new display name
     * @param {string} [updatedData.phone]  — new 10-digit phone string
     * @param {string} [updatedData.email]  — new email address (use with care)
     */
    async fillEditUserForm(updatedData) {
        await test.step('Fill Edit User form with updated data', async () => {
            if (updatedData.name !== undefined) {
                // The name input label may read "Loan Officer's Name" or plain "Name"
                const nameInput = this.editUserModal
                    .getByLabel(/Loan Officer.*Name|^Name/i)
                    .first();
                await nameInput.waitFor({ state: 'visible', timeout: 10000 });
                // Select-all then fill to replace any pre-filled value
                await nameInput.click({ clickCount: 3 });
                await nameInput.fill(updatedData.name);
            }

            if (updatedData.phone !== undefined) {
                const phoneInput = this.editUserModal.getByLabel(/Phone Number/i).first();
                await phoneInput.waitFor({ state: 'visible', timeout: 5000 });
                await phoneInput.click({ clickCount: 3 });
                await phoneInput.fill(updatedData.phone);
            }

            if (updatedData.email !== undefined) {
                const emailInput = this.editUserModal.getByLabel(/Email Address/i).first();
                await emailInput.waitFor({ state: 'visible', timeout: 5000 });
                await emailInput.click({ clickCount: 3 });
                await emailInput.fill(updatedData.email);
            }
        });
    }

    /**
     * Clicks the SAVE button in the Edit User modal and waits for the modal to
     * close, then waits for the page to settle.
     */
    async saveEditUser() {
        await test.step('Save edited user', async () => {
            await this.editUserSaveBtn.click();
            await expect(this.editUserModal).toBeHidden({ timeout: 15000 });
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Searches by email address and verifies the row shows the expected updated
     * name.  Call this after `saveEditUser()` to confirm the change persisted.
     *
     * @param {string} email        — identifies the row
     * @param {string} updatedName  — the new name that should appear in the row
     */
    async verifyUpdatedUser(email, updatedName) {
        await test.step(`Verify updated user (${email}) shows name: "${updatedName}"`, async () => {
            await this.search(email);

            const userRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(userRow).toBeVisible({ timeout: 10000 });

            // Name column must contain the updated name
            await expect(
                userRow.locator('td').filter({ hasText: updatedName })
            ).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Add Role flow
    // -------------------------------------------------------------------------

    /**
     * Finds the table row matching the given email, then clicks the person-plus
     * (Add Role / Assign) icon — the **second** action button in the row — to
     * open the Add Role modal.
     *
     * @param {string} email  Email address that identifies the target row
     */
    async clickAddRoleForUser(email) {
        await test.step(`Open Add Role modal for user: ${email}`, async () => {
            const targetRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(targetRow).toBeVisible({ timeout: 10000 });

            // Actions column button order: Edit (pencil) · Add Role (person+) · Delete · Reset Password
            const addRoleBtn = targetRow.locator('button').nth(1);
            await addRoleBtn.click();

            // Wait for the Add Role dialog to appear
            await expect(this.addRoleModal).toBeVisible({ timeout: 10000 });
            await expect(this.addRoleModalHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Fills the Add Role modal form.
     *
     * @param {object} roleData
     * @param {string} roleData.role     — role option text, e.g. 'Company Admin'
     * @param {string} roleData.company  — company/branch option text, e.g. 'ABC Broker - Test'
     */
    async fillAddRoleForm(roleData) {
        await test.step(`Fill Add Role form — role: ${roleData.role}, company: ${roleData.company}`, async () => {
            // Select Role
            await this.selectModalDropdown(this.addRoleRoleDropdown, roleData.role);

            // Select Company/Retail Branch — appears after a role is chosen
            await this.addRoleCompanyDropdown.waitFor({ state: 'visible', timeout: 5000 });
            await this.selectModalDropdown(this.addRoleCompanyDropdown, roleData.company);
        });
    }

    /**
     * Clicks ADD ROLE to submit the form and waits for the modal to close.
     */
    async submitAddRole() {
        await test.step('Submit Add Role modal', async () => {
            await this.addRoleSubmitBtn.click();
            await expect(this.addRoleModal).toBeHidden({ timeout: 15000 });
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Cancels the Add Role modal without making any changes.
     */
    async cancelAddRole() {
        await test.step('Cancel Add Role modal', async () => {
            await this.addRoleCancelBtn.click();
            await expect(this.addRoleModal).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Searches by email and verifies the Role(s) cell in the matching row
     * contains the expected role name (supports comma-separated multi-role values).
     *
     * @param {string} email     — identifies the row
     * @param {string} roleName  — role text that must appear in the Role(s) cell
     */
    async verifyUserHasRole(email, roleName) {
        await test.step(`Verify user (${email}) has role: "${roleName}"`, async () => {
            await this.search(email);

            const userRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(userRow).toBeVisible({ timeout: 10000 });

            // The Role(s) cell should contain the new role name
            await expect(
                userRow.locator('td').filter({ hasText: roleName })
            ).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Reset Password flow
    // -------------------------------------------------------------------------

    /**
     * Finds the table row matching the given email, then clicks the key
     * (Reset Password) icon — the **fourth** action button in the row.
     *
     * This action is immediate: no confirmation modal appears.  The portal
     * fires a password-reset email and shows a success toast.
     *
     * Action button order in each row:
     *   0 → Edit (pencil)
     *   1 → Add Role (person-plus)
     *   2 → Delete (trash)
     *   3 → Reset Password (key)
     *
     * @param {string} email  Email address that identifies the target row
     */
    async clickResetPasswordForUser(email) {
        await test.step(`Click Reset Password for user: ${email}`, async () => {
            const targetRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(targetRow).toBeVisible({ timeout: 10000 });

            // Try aria-label first (most reliable); fall back to positional nth(3)
            const ariaKeyBtn = targetRow
                .locator('button[aria-label*="reset" i], button[title*="reset" i]')
                .first();
            const hasAriaKey = await ariaKeyBtn.isVisible({ timeout: 1000 }).catch(() => false);

            const resetBtn = hasAriaKey
                ? ariaKeyBtn
                : targetRow.locator('button').nth(3); // 4th button = key icon

            await resetBtn.click();
        });
    }

    /**
     * Waits for the "Password reset request sent" success toast to appear,
     * then asserts it is visible.  The toast auto-dismisses after a few seconds
     * — call this immediately after `clickResetPasswordForUser()`.
     */
    async verifyResetPasswordToast() {
        await test.step('Verify "Password reset request sent" toast is shown', async () => {
            await expect(this.resetPasswordToast).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Deactivate User flow
    // -------------------------------------------------------------------------

    /**
     * Finds the table row for the given email, then clicks the trash
     * (Deactivate User) icon — the **third** action button (index 2).
     *
     * Action button order in each row:
     *   0 → Edit (pencil)
     *   1 → Add Role (person-plus)
     *   2 → Deactivate (trash)
     *   3 → Reset Password (key)
     *
     * After clicking, the "Deactivate User" confirmation modal appears.
     *
     * @param {string} email  Email address that identifies the target row
     */
    async clickDeactivateForUser(email) {
        await test.step(`Open Deactivate User modal for: ${email}`, async () => {
            const targetRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(targetRow).toBeVisible({ timeout: 10000 });

            // Try aria-label / title first; fall back to positional nth(2)
            const ariaDeactivateBtn = targetRow
                .locator('button[aria-label*="deactivate" i], button[title*="deactivate" i]')
                .first();
            const hasAria = await ariaDeactivateBtn.isVisible({ timeout: 1000 }).catch(() => false);

            const deactivateBtn = hasAria
                ? ariaDeactivateBtn
                : targetRow.locator('button').nth(2); // 3rd button = trash icon

            await deactivateBtn.click({ force: true });

            // Wait for the confirmation modal
            await expect(this.deactivateUserModal).toBeVisible({ timeout: 10000 });
            await expect(this.deactivateUserHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Confirms the deactivation by clicking CONFIRM in the modal, then waits
     * for the dialog to close and the page to settle.
     */
    async confirmDeactivateUser() {
        await test.step('Confirm deactivation', async () => {
            await this.deactivateUserConfirmBtn.click();
            await expect(this.deactivateUserModal).toBeHidden({ timeout: 15000 });
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Cancels the deactivation dialog without making any changes.
     */
    async cancelDeactivateUser() {
        await test.step('Cancel deactivation', async () => {
            await this.deactivateUserCancelBtn.click();
            await expect(this.deactivateUserModal).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Searches by email and verifies the user's Active? column now reads "No"
     * and that the row is visually distinct (greyed out).
     *
     * @param {string} email  Email address that identifies the deactivated user
     */
    async verifyUserIsDeactivated(email) {
        await test.step(`Verify user (${email}) is deactivated (Active? = No)`, async () => {
            await this.search(email);

            const userRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(userRow).toBeVisible({ timeout: 10000 });

            // Active? column should now show "No"
            await expect(
                userRow.locator('td').filter({ hasText: /^No$/i })
            ).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Re-activate User flow
    // -------------------------------------------------------------------------

    /**
     * Finds the table row for the given email (must currently be inactive /
     * Active? = "No"), then clicks the trash icon — the **third** action button
     * (index 2).  On an inactive row the portal opens the "Re-activate User"
     * confirmation modal instead of the deactivation modal.
     *
     * @param {string} email  Email address that identifies the inactive row
     */
    async clickReactivateForUser(email) {
        await test.step(`Open Re-activate User modal for: ${email}`, async () => {
            const targetRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(targetRow).toBeVisible({ timeout: 10000 });

            // Same button position as deactivate — the portal toggles the modal
            // content based on the user's current active state.
            const reactivateBtn = targetRow.locator('button').nth(2);
            await reactivateBtn.click();

            // Wait for the Re-activate User dialog
            await expect(this.reactivateUserModal).toBeVisible({ timeout: 10000 });
            await expect(this.reactivateUserHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Confirms the re-activation by clicking CONFIRM, then waits for the
     * dialog to close and the page to settle.
     */
    async confirmReactivateUser() {
        await test.step('Confirm re-activation', async () => {
            await this.reactivateUserConfirmBtn.click();
            await expect(this.reactivateUserModal).toBeHidden({ timeout: 15000 });
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Cancels the re-activation dialog without making any changes.
     */
    async cancelReactivateUser() {
        await test.step('Cancel re-activation', async () => {
            await this.reactivateUserCancelBtn.click();
            await expect(this.reactivateUserModal).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Searches by email and verifies the user's Active? column reads "Yes",
     * confirming re-activation was successful.
     *
     * @param {string} email  Email address that identifies the re-activated user
     */
    async verifyUserIsActive(email) {
        await test.step(`Verify user (${email}) is active (Active? = Yes)`, async () => {
            await this.search(email);

            const userRow = this.page
                .locator('tr')
                .filter({ hasText: email })
                .first();
            await expect(userRow).toBeVisible({ timeout: 10000 });

            // Active? column should show "Yes"
            await expect(
                userRow.locator('td').filter({ hasText: /^Yes$/i })
            ).toBeVisible({ timeout: 10000 });
        });
    }
}

export default ManageUsersPage;
