import { expect, test } from '../../fixtures';

class ManageEmailsPage {
    constructor(page) {
        this.page = page;

        // -- Page heading ------------------------------------------------------
        this.pageHeading = this.page.getByRole('heading', { name: 'Email Templates' });

        // -- Search toolbar ----------------------------------------------------
        this.searchInput  = this.page.getByPlaceholder(/Search by name subject/i);
        this.searchBtn    = this.page.getByRole('button', { name: /SEARCH/i });
        this.clearSearchBtn = this.page.locator('button').filter({ has: this.page.locator('svg') })
            .and(this.page.locator('[aria-label*="clear" i], [title*="clear" i]'))
            .first();

        // -- Trigger dropdown filter -------------------------------------------
        // MUI Select: the label text "Trigger" lives in a sibling <label> element
        // (linked via aria-labelledby), NOT inside the combobox itself.
        // getByLabel() follows that aria association correctly.
        // Scope to the top-right region to avoid matching other Select controls
        // that might appear on the page.
        this.triggerFilter = this.page.getByRole('combobox').first();

        // -- Table columns header locators ------------------------------------
        this.colName       = this.page.getByRole('columnheader', { name: /^Name$/i });
        this.colTrigger    = this.page.getByRole('columnheader', { name: /^Trigger$/i });
        this.colDelay      = this.page.getByRole('columnheader', { name: /^Delay$/i });
        this.colStatus     = this.page.getByRole('columnheader', { name: /^Status$/i });
        this.colCreatedBy  = this.page.getByRole('columnheader', { name: /^Created By$/i });
        this.colCreatedAt  = this.page.getByRole('columnheader', { name: /^Created At$/i });
        this.colUpdatedAt  = this.page.getByRole('columnheader', { name: /^Updated At$/i });
        this.colActions    = this.page.getByRole('columnheader', { name: /^Actions$/i });

        // -- Table rows -------------------------------------------------------
        // All data rows (excludes the header row)
        this.tableRows = this.page.getByRole('row').filter({ hasNot: this.page.getByRole('columnheader') });

        // -- Status badges ----------------------------------------------------
        // "active" and "draft" appear as coloured text cells inside rows
        this.activeBadges = this.page.getByText('active', { exact: true });
        this.draftBadges  = this.page.getByText('draft',  { exact: true });

        // -- Known always-active templates (present on every environment) -----
        this.applicantPortalInviteRow      = this.page.getByRole('row', { name: /Applicant Portal Invite/i }).first();
        this.newApplicantCreatedRow        = this.page.getByRole('row', { name: /New Applicant Created/i });
        this.loanOfficerAssistantInviteRow = this.page.getByRole('row', { name: /Loan Officer Assistant Invitation/i }).first();

        // -- Row action buttons -----------------------------------------------
        // Edit and Delete are icon buttons inside each row.  We select per-row
        // in the helper methods rather than storing global locators here, since
        // multiple rows share the same button roles.

        // -- Pagination & ADD button ------------------------------------------
        this.addNewTemplateBtn = this.page.getByRole('button', { name: /ADD NEW TEMPLATE/i });
        this.paginationInfo    = this.page.locator('text=/\\d+–\\d+ of \\d+/');  // e.g. "1–10 of 53"
    }

    // --------------------------------------------------------------------------

    /** Navigate to the Manage Emails page from /portal. */
    async navigateTo() {
        await test.step('Navigate to Manage Emails', async () => {
            await this.page.goto('/portal/manage-emails');
            await this.page.waitForLoadState('load');
            await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
        });
    }

    // --------------------------------------------------------------------------

    /** Assert the page heading and the search/filter toolbar are present. */
    async verifyPageLoaded() {
        await test.step('Verify Manage Emails page loaded', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
            await expect(this.searchInput).toBeVisible();
            await expect(this.searchBtn).toBeVisible();
            await expect(this.triggerFilter).toBeVisible();
        });
    }

    // --------------------------------------------------------------------------

    /** Assert all eight table column headers are rendered. */
    async verifyTableColumns() {
        await test.step('Verify email templates table columns', async () => {
            await expect(this.colName).toBeVisible();
            await expect(this.colTrigger).toBeVisible();
            await expect(this.colDelay).toBeVisible();
            await expect(this.colStatus).toBeVisible();
            await expect(this.colCreatedBy).toBeVisible();
            await expect(this.colCreatedAt).toBeVisible();
            await expect(this.colUpdatedAt).toBeVisible();
            await expect(this.colActions).toBeVisible();
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Assert the three permanently-active core templates are present.
     * These exist on every environment and are always in "active" status.
     */
    async verifyActiveTemplates() {
        await test.step('Verify core active email templates are listed', async () => {
            await expect(this.applicantPortalInviteRow).toBeVisible();
            await expect(this.loanOfficerAssistantInviteRow).toBeVisible();
        });
    }

    // --------------------------------------------------------------------------

    /** Assert both "active" and "draft" status badges appear in the list. */
    async verifyStatusBadges() {
        await test.step('Verify active and draft status badges are visible', async () => {
            await expect(this.activeBadges.first()).toBeVisible();
            await expect(this.draftBadges.first()).toBeVisible();
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Type a query into the search box and click SEARCH.
     * @param {string} query  Text to search for (name / subject fragment).
     */
    async search(query) {
        await test.step(`Search email templates for "${query}"`, async () => {
            await this.searchInput.fill(query);
            await this.searchBtn.click();
            // waitForLoadState is a no-op on this SPA — wait for the table to
            // produce at least one visible data row, which confirms the API
            // response came back and the filtered results have rendered.
            await this.tableRows.first().waitFor({ state: 'visible', timeout: 10000 })
                .catch(() => {}); // empty search results are valid — don't fail
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Reset the template list to its unfiltered state.
     *
     * Why navigate instead of fill('') + SEARCH?
     * The backend treats an empty-string query as "0 results" rather than
     * "no filter applied", so submitting a blank search leaves the table empty.
     * Navigating to /portal/manage-emails is the only reliable way to get the
     * full unfiltered list back.  navigateTo() already waits for the page
     * heading, so we just wait for a known first-page row afterwards.
     */
    async clearSearch() {
        await test.step('Clear search and reset template list', async () => {
            // Navigate fresh — the backend treats an empty-string SEARCH as
            // "0 results", not "no filter".  navigateTo() waits for the page
            // heading which is a sufficient signal that the list is ready.
            await this.navigateTo();
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Click the edit (pencil) icon for the row matching rowName.
     * @param {string|RegExp} rowName  Text identifying the template row.
     */
    async clickEditForTemplate(rowName) {
        await test.step(`Click Edit for template "${rowName}"`, async () => {
            // Use .last() — targets the most recently created row and avoids a
            // strict-mode violation when duplicate rows exist from prior failed runs.
            const row = this.page.getByRole('row', { name: rowName }).last();
            await row.waitFor({ state: 'visible', timeout: 10000 });
            // Edit button is the first action icon in the row (pencil/edit SVG button)
            await row.getByRole('button').first().click();
            // Wait for the SPA route to finish navigating to the edit form.
            // Without this, waitForForm() can run while still on the list page
            // and the /Email Template$/ heading matches "Email Templates" (list).
            await this.page.waitForLoadState('load');
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Assert the edit form/modal opened after clicking Edit.
     * The portal renders the email editor inline or as a modal —
     * wait for a distinctive element (subject field or template name input).
     */
    async verifyEditFormOpened() {
        await test.step('Verify email template edit form is open', async () => {
            // The edit view contains a Name/Subject input field
            const nameInput = this.page
                .getByLabel(/Name|Subject/i)
                .or(this.page.getByPlaceholder(/Name|Subject/i))
                .first();
            await expect(nameInput).toBeVisible({ timeout: 10000 });
        });
    }

    // --------------------------------------------------------------------------

    // --------------------------------------------------------------------------

    /** Click ADD NEW TEMPLATE to open the create form. */
    async clickAddNewTemplate() {
        await test.step('Click Add New Template', async () => {
            await this.addNewTemplateBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.addNewTemplateBtn.click();
            await this.page.waitForLoadState('load');
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Delete every row matching rowName — handles both the happy path (one row)
     * and leftover duplicates from previous failed runs.
     *
     * Strategy: loop while matching rows exist, always deleting .last() (the
     * most recently created) to avoid strict-mode violations when more than one
     * row shares the same name.
     *
     * @param {string|RegExp} rowName  Text identifying the template row(s).
     */
    async deleteTemplate(rowName) {
        await test.step(`Delete template "${rowName}"`, async () => {
            // Search so all matching rows land on the current page
            await this.search(typeof rowName === 'string' ? rowName : rowName.source);

            const rows = this.page.getByRole('row', { name: rowName });

            // Loop until no matching rows remain (handles leftover duplicates)
            let count = await rows.count();
            while (count > 0) {
                // Always target .last() — avoids strict-mode when count > 1
                const row = rows.last();
                await row.waitFor({ state: 'visible', timeout: 10000 });

                // Delete button is the second icon button in the row (trash icon)
                await row.getByRole('button').nth(1).click();

                // Handle optional confirmation dialog
                const confirmBtn = this.page
                    .getByRole('button', { name: /confirm|delete|yes/i })
                    .first();
                const hasConfirm = await confirmBtn.isVisible({ timeout: 3000 }).catch(() => false);
                if (hasConfirm) {
                    await confirmBtn.click();
                }

                await row.waitFor({ state: 'hidden', timeout: 10000 });
                count = await rows.count();
            }
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Delete all templates matching templateName, then navigate back to the
     * unfiltered list.  Safe to call when no matching templates exist (no-op).
     *
     * Call this at the START of any test that creates a template to eliminate
     * duplicates left by previous failed runs.  Without this, the server
     * rejects saves with a duplicate-name error and saveAsDraft() never
     * redirects back to the list.
     *
     * @param {string} templateName  Exact name to clean up.
     */
    async cleanupIfExists(templateName) {
        await test.step(`Pre-run cleanup: delete "${templateName}" if it exists`, async () => {
            await this.search(templateName);
            const rows = this.page.getByRole('row', {
                name: new RegExp(templateName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
            });
            const count = await rows.count();
            if (count > 0) {
                await this.deleteTemplate(templateName);
            }
            // Navigate back to the unfiltered list.
            // navigateTo() already waits for the page heading — that is a
            // sufficient signal that the page is ready for the next step.
            // Do NOT wait for a specific data row here: after a delete + search
            // the SPA may still be fetching the full list when we arrive, and
            // a row-level waitFor causes a flaky 15 s timeout.
            await this.navigateTo();
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Filter the template list by trigger type using the Trigger dropdown.
     * @param {string} triggerText  Visible option label to select.
     */
    async filterByTrigger(triggerText) {
        await test.step(`Filter by trigger: "${triggerText}"`, async () => {
            await this.triggerFilter.click();
            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 10000 });
            await this.page.getByRole('option', { name: triggerText, exact: false }).first().click();
            await expect(listbox).toBeHidden({ timeout: 5000 });
        });
    }
}

export default ManageEmailsPage;
