import { expect, test } from '../../fixtures';

class CompaniesPage {
    constructor(page) {
        this.page = page;

        // -- Sidebar navigation -----------------------------------------------
        this.companiesNav = this.page
            .locator('[data-sidebar]')
            .filter({ hasText: /^Companies$/i })
            .first();

        // -- Page heading and toolbar -----------------------------------------
        // Portal renders the heading as a plain element rather than a semantic
        // <h1/h2>, so getByText() is more reliable than getByRole('heading').
        this.pageHeading     = this.page.getByText(/^Companies$/i).first();
        this.searchInput     = this.page.getByPlaceholder(/Search by name, NMLS or TPO ID/i);
        this.searchBtn       = this.page.getByRole('button', { name: /^Search$/i });
        this.addNewCompanyBtn = this.page.getByRole('button', { name: /Add New Company/i });

        // -- Table column headers ---------------------------------------------
        this.colName       = this.page.getByText('Name',        { exact: true }).first();
        this.colPhone      = this.page.getByText('Phone',       { exact: true }).first();
        this.colNmls       = this.page.getByText('NMLS',        { exact: true }).first();
        this.colTpoId      = this.page.getByText('TPO ID',      { exact: true }).first();
        this.colKeyContact = this.page.getByText('Key Contact', { exact: true }).first();
        this.colActions    = this.page.getByText('Actions',     { exact: true }).first();

        // -- Pagination -------------------------------------------------------
        // The portal labels this "Officers per page" even on the Companies table
        // (shared MUI pagination component) — match what is actually rendered.
        this.perPageLabel      = this.page.getByText(/Officers per page/i).first();
        this.paginationCounter = this.page.getByText(/\d+\s*[–-]\s*\d+\s+of\s+\d+/i).first();
        this.paginationNextBtn = this.page
            .getByRole('button', { name: /next page/i })
            .or(this.page.locator('[aria-label*="next"], [title*="next"]').first());
        this.paginationPrevBtn = this.page
            .getByRole('button', { name: /previous page/i })
            .or(this.page.locator('[aria-label*="prev"], [title*="prev"]').first());

        // -- Add New Company modal --------------------------------------------
        // Heading:  "Add new Company"
        // Sections: Company Details · Address Information ·
        //           License Information · Admin Information
        // Buttons:  CANCEL · CREATE
        //
        // The live-chat widget lives inside <iframe> elements and is invisible to
        // page.getByRole('dialog'), so no heading filter is needed.
        this.companyModal           = this.page.getByRole('dialog');
        this.companyModalHeading    = this.companyModal
            .getByText(/Add new Company/i).first();

        // Company Details section
        // MUI TextFields use floating <label> elements (Material Design pattern),
        // NOT HTML placeholder attributes — getByLabel() resolves correctly;
        // getByPlaceholder() times out because no placeholder attr is set.
        this.addCompanyDisplayName  = this.companyModal.getByLabel(/Display Name/i).first();
        this.addCompanyTag          = this.companyModal.getByLabel(/Company tag/i).first();
        this.addCompanyFullName     = this.companyModal.getByLabel(/Full Company Name/i).first();
        this.addCompanyPhone        = this.companyModal.getByLabel(/^Phone/i).first();
        this.addCompanyEmail        = this.companyModal.getByLabel(/^Email/i).first();

        // Address Information section
        this.addCompanyStreet       = this.companyModal.getByLabel(/Street Name/i).first();
        this.addCompanyState        = this.companyModal.getByLabel(/^State/i).first();
        this.addCompanyPostalCode   = this.companyModal.getByLabel(/Postal Code/i).first();
        this.addCompanyCity         = this.companyModal.getByLabel(/^City/i).first();

        // License Information section
        this.addCompanyNmls         = this.companyModal.getByLabel(/^NMLS/i).first();
        this.addCompanyTpoId        = this.companyModal.getByLabel(/^TPO ID/i).first();
        this.addCompanyPrivacyUrl   = this.companyModal.getByLabel(/Privacy Policy URL/i).first();
        this.addCompanyTermsUrl     = this.companyModal.getByLabel(/Terms URL/i).first();

        // Admin Information section
        this.addCompanyAdminDropdown = this.companyModal
            .getByRole('combobox').first(); // "Select from existing admins"

        // These checkboxes use a custom MUI pattern:
        //   <div class="MuiBox-root">
        //     <span class="MuiCheckbox-root"> <input type="checkbox" /> </span>
        //     <p class="MuiTypography-root">label text</p>
        //   </div>
        // There is NO <label> element and the <span role="checkbox"> has no
        // accessible name, so both getByRole('checkbox', { name }) and
        // locator('label').filter() always time out.
        // Using getByText() on the <p> sibling is the reliable alternative —
        // it is visible whenever the checkbox row is rendered.
        this.addCompanyNewAdminChk   = this.companyModal
            .getByText(/Create a new Admin Account/i).first();
        this.addCompanyRelMgrChk     = this.companyModal
            .getByText(/Add a relationship manager/i).first();
        this.addCompanyKeyContactChk = this.companyModal
            .getByText(/Key Contact different from/i).first();

        this.companyModalCancelBtn  = this.companyModal
            .getByRole('button', { name: /^Cancel$/i });
        this.companyModalCreateBtn  = this.companyModal
            .getByRole('button', { name: /^Create$/i });

        // -- Edit Company modal ---------------------------------------------------
        // Heading:  "Edit Company" (or similar — not relied upon for detection)
        // Section:  "Company Information" (differs from Add's "Company Details")
        // Buttons:  CANCEL · UPDATE  (not CREATE)
        // No Company tag field; no Admin Information section.
        //
        // The live-chat widget on the page lives inside <iframe> elements —
        // page.getByRole('dialog') does NOT cross iframe boundaries in Playwright,
        // so an unfiltered dialog locator is safe and avoids failures caused by
        // an unexpected heading text (e.g. "Edit Company Info" vs "Edit Company").
        this.editCompanyModal        = this.page.getByRole('dialog');
        this.editCompanyModalHeading = this.editCompanyModal
            .getByText(/Edit Company/i).first();

        // Inputs — MUI floating-label pattern, scoped to the edit dialog.
        this.editCompanyNameInput    = this.editCompanyModal
            .getByLabel(/Display Name/i).first();
        this.editCompanyFullNameInput = this.editCompanyModal
            .getByLabel(/Full Company Name/i).first();
        this.editCompanyPhoneInput   = this.editCompanyModal
            .getByLabel(/^Phone/i).first();
        this.editCompanyEmailInput   = this.editCompanyModal
            .getByLabel(/^Email/i).first();
        this.editCompanyStreetInput  = this.editCompanyModal
            .getByLabel(/Street Name/i).first();
        this.editCompanyStateInput   = this.editCompanyModal
            .getByLabel(/^State/i).first();
        this.editCompanyPostalInput  = this.editCompanyModal
            .getByLabel(/Postal Code/i).first();
        this.editCompanyCityInput    = this.editCompanyModal
            .getByLabel(/^City/i).first();
        this.editCompanyNmlsInput    = this.editCompanyModal
            .getByLabel(/^NMLS/i).first();
        this.editCompanyTpoIdInput   = this.editCompanyModal
            .getByLabel(/^TPO ID/i).first();

        this.editCompanyCancelBtn  = this.editCompanyModal
            .getByRole('button', { name: /^Cancel$/i });
        this.editCompanyUpdateBtn  = this.editCompanyModal
            .getByRole('button', { name: /^Update$/i });
    }

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------

    async navigateToCompanies() {
        await test.step('Navigate to Companies via sidebar', async () => {
            await expect(this.companiesNav).toBeVisible({ timeout: 15000 });
            await this.companiesNav.click();
            // waitForLoadState('networkidle') hangs indefinitely on CI for SPAs
            // that maintain background connections.  Heading visibility is the
            // reliable data-ready signal.
            await expect(this.pageHeading).toBeVisible({ timeout: 20000 });
        });
    }

    // -------------------------------------------------------------------------
    // Page structure
    // -------------------------------------------------------------------------

    async verifyPageHeading() {
        await test.step('Verify Companies page heading is visible', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyToolbar() {
        await test.step('Verify search bar and Add New Company button are visible', async () => {
            await expect(this.searchInput).toBeVisible();
            await expect(this.searchBtn).toBeVisible();
            await expect(this.addNewCompanyBtn).toBeVisible();
        });
    }

    async verifyTableColumns() {
        await test.step('Verify all table column headers are visible', async () => {
            await expect(this.colName).toBeVisible();
            await expect(this.colPhone).toBeVisible();
            await expect(this.colNmls).toBeVisible();
            await expect(this.colTpoId).toBeVisible();
            await expect(this.colKeyContact).toBeVisible();
            await expect(this.colActions).toBeVisible();
        });
    }

    async verifyPagination() {
        await test.step('Verify pagination controls are visible', async () => {
            await expect(this.perPageLabel).toBeVisible();
            await expect(this.paginationCounter).toBeVisible();
        });
    }

    // -------------------------------------------------------------------------
    // Table rows
    // -------------------------------------------------------------------------

    /**
     * Asserts that at least one company row is rendered in the table.
     */
    async verifyTableHasRows() {
        await test.step('Verify at least one company row is present', async () => {
            // Each data row contains an edit (pencil) icon button in the Actions
            // column — its presence confirms the row rendered.  Fall back to any
            // visible table cell if the icon selector doesn't resolve.
            const firstDataCell = this.page
                .locator('tr, [role="row"]')
                .nth(1) // nth(0) = header, nth(1) = first data row
                .locator('td, [role="cell"]')
                .first();
            await expect(firstDataCell).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Returns the company name from the first data row (Name column, index 0).
     * @returns {Promise<string>}
     */
    async getFirstRowName() {
        const nameCell = this.page
            .locator('tr, [role="row"]')
            .nth(1)
            .locator('td, [role="cell"]')
            .first();
        await nameCell.waitFor({ state: 'visible', timeout: 10000 });
        return (await nameCell.innerText()).trim();
    }

    /**
     * Returns the NMLS value from the first data row (NMLS column, index 2).
     *
     * The portal search bar indexes NMLS explicitly ("Search by name, NMLS or
     * TPO ID") so an NMLS value is a more reliable search term than a display
     * name, which may not be in the search index.
     *
     * @returns {Promise<string>}
     */
    async getFirstRowNmls() {
        const nmlsCell = this.page
            .locator('tr, [role="row"]')
            .nth(1)
            .locator('td, [role="cell"]')
            .nth(2); // 0=Name, 1=Phone, 2=NMLS
        await nmlsCell.waitFor({ state: 'visible', timeout: 10000 });
        return (await nmlsCell.innerText()).trim();
    }

    // -------------------------------------------------------------------------
    // Search
    // -------------------------------------------------------------------------

    /**
     * Types a query into the search field and clicks SEARCH.
     * @param {string} query
     */
    async search(query) {
        await test.step(`Search for "${query}"`, async () => {
            await this.searchInput.fill(query);
            await this.searchBtn.click();
            // Drop networkidle — callers follow with verifySearchResultContains
            // which carries its own 10 s element-visibility timeout.
        });
    }

    /**
     * Verifies that at least one table row contains the given text after a search.
     * @param {string} text
     */
    async verifySearchResultContains(text) {
        await test.step(`Verify search result contains "${text}"`, async () => {
            const matchingRow = this.page
                .locator('tr, [role="row"]')
                .filter({ hasText: text })
                .first();
            await expect(matchingRow).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Clears the search field using the × inline clear icon, the empty-state
     * clear button, or a programmatic fallback, then waits for the list to reload.
     */
    async clearSearch() {
        await test.step('Clear search and reload full company list', async () => {
            // Drop networkidle everywhere — callers follow with table assertions
            // that carry their own element-visibility timeouts.

            // 1. Inline × icon (appears while the search box has text)
            const inlineClear = this.page
                .locator('input[placeholder*="Search"] ~ button, input[placeholder*="Search"] + button')
                .first();
            const hasInlineClear = await inlineClear.isVisible({ timeout: 1000 }).catch(() => false);
            if (hasInlineClear) {
                await inlineClear.click();
                return;
            }

            // 2. Empty-state "CLEAR SEARCH" button (zero-result page)
            const emptyStateClear = this.page.getByRole('button', { name: /Clear Search/i });
            const hasEmptyState = await emptyStateClear.isVisible({ timeout: 1000 }).catch(() => false);
            if (hasEmptyState) {
                await emptyStateClear.click();
                return;
            }

            // 3. Programmatic fallback
            await this.searchInput.clear();
            await this.searchBtn.click();
        });
    }

    // -------------------------------------------------------------------------
    // Add New Company modal
    // -------------------------------------------------------------------------

    /**
     * Clicks ADD NEW COMPANY and waits for the modal to appear.
     */
    async openAddNewCompanyModal() {
        await test.step('Open Add New Company modal', async () => {
            await this.addNewCompanyBtn.click();
            await expect(this.companyModal).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Verifies all visible sections and fields in the Add New Company modal:
     *
     *   Company Details:
     *     Display Name *, Company tag *, Full Company Name *,
     *     Company Logo upload, Phone, Email *, Primary Color
     *
     *   Address Information:
     *     Street Name *, State *, Postal Code *, City *
     *
     *   License Information:
     *     NMLS *, TPO ID *, Privacy Policy URL, Terms URL
     *
     *   Admin Information:
     *     "Select from existing admins" dropdown,
     *     Create a new Admin Account checkbox,
     *     Add a relationship manager checkbox,
     *     Is the Key Contact different from the Company Admin? checkbox
     *
     *   Action buttons: CANCEL · CREATE
     */
    async verifyAddCompanyModalFields() {
        await test.step('Verify all Add New Company modal fields are visible', async () => {
            await expect(this.companyModal).toBeVisible();
            await expect(this.companyModalHeading).toBeVisible({ timeout: 10000 });

            // ── Company Details ──────────────────────────────────────────────
            // Section headings use regex (no exact:true) because the portal's
            // casing is inconsistent across views — e.g. "Admin information"
            // (lowercase i) vs "Admin Information".
            await expect(
                this.companyModal.getByText(/Company Details/i).first()
            ).toBeVisible();
            await expect(this.addCompanyDisplayName).toBeVisible();
            await expect(this.addCompanyTag).toBeVisible();
            await expect(this.addCompanyFullName).toBeVisible();
            await expect(
                this.companyModal.getByText(/Company Logo/i).first()
            ).toBeVisible();
            await expect(this.addCompanyEmail).toBeVisible();

            // ── Address Information ──────────────────────────────────────────
            await expect(
                this.companyModal.getByText(/Address Information/i).first()
            ).toBeVisible();
            await expect(this.addCompanyStreet).toBeVisible();
            await expect(this.addCompanyState).toBeVisible();
            await expect(this.addCompanyPostalCode).toBeVisible();
            await expect(this.addCompanyCity).toBeVisible();

            // ── License Information ──────────────────────────────────────────
            await expect(
                this.companyModal.getByText(/License Information/i).first()
            ).toBeVisible();
            await expect(this.addCompanyNmls).toBeVisible();
            await expect(this.addCompanyTpoId).toBeVisible();
            await expect(this.addCompanyPrivacyUrl).toBeVisible();
            await expect(this.addCompanyTermsUrl).toBeVisible();

            // ── Admin Information ────────────────────────────────────────────
            // The portal renders this heading as "Admin information" (lowercase i)
            // in some builds — regex match avoids casing-exact failures.
            await expect(
                this.companyModal.getByText(/Admin [Ii]nformation/i).first()
            ).toBeVisible();
            await expect(this.addCompanyAdminDropdown).toBeVisible();
            await expect(this.addCompanyNewAdminChk).toBeVisible();
            await expect(this.addCompanyRelMgrChk).toBeVisible();
            await expect(this.addCompanyKeyContactChk).toBeVisible();

            // ── Action buttons ───────────────────────────────────────────────
            await expect(this.companyModalCancelBtn).toBeVisible();
            await expect(this.companyModalCreateBtn).toBeVisible();
        });
    }

    /**
     * Fills every field in the Add New Company form and clicks CREATE.
     * Waits for the modal to close, confirming the company was saved.
     *
     * State handling: the field is tested as a plain text input first.  If an
     * autocomplete listbox appears after typing, the first matching option is
     * clicked; otherwise the typed value is accepted as-is.
     *
     * Admin dropdown: the first available admin option is selected.  If the
     * listbox is empty the dropdown is dismissed and the form submitted without
     * an admin selection (portal may accept this for test companies).
     *
     * @param {object} data
     * @param {string} data.displayName  — required, shown in the table Name column
     * @param {string} data.tag          — required, URL-safe company slug
     * @param {string} data.fullName     — required, full legal name
     * @param {string} [data.phone]      — 10-digit phone string
     * @param {string} data.email        — required, company email
     * @param {string} data.street       — required, street address
     * @param {string} data.state        — required, state name or abbreviation
     * @param {string} data.postalCode   — required, ZIP / postal code
     * @param {string} data.city         — required, city
     * @param {string} data.nmls         — required, NMLS number digits
     * @param {string} data.tpoId        — required, TPO ID digits
     * @param {string} [data.privacyUrl] — optional Privacy Policy URL
     * @param {string} [data.termsUrl]   — optional Terms URL
     */
    async fillAndSubmitAddCompanyForm(data) {
        await test.step('Fill Add New Company form and submit', async () => {
            // ── Company Details ──────────────────────────────────────────────
            await this.addCompanyDisplayName.fill(data.displayName);
            await this.addCompanyTag.fill(data.tag);
            await this.addCompanyFullName.fill(data.fullName);

            if (data.phone) {
                // The Phone field pre-fills "+1"; clear it before typing
                await this.addCompanyPhone.clear();
                await this.addCompanyPhone.fill(data.phone);
            }

            await this.addCompanyEmail.fill(data.email);

            // ── Address Information ──────────────────────────────────────────
            await this.addCompanyStreet.fill(data.street);

            // State may be a plain input or a MUI Autocomplete — try fill first;
            // if a listbox appears, pick the first option that contains the typed text.
            await this.addCompanyState.fill(data.state);
            const stateListbox = this.page.getByRole('listbox');
            const stateListboxVisible = await stateListbox
                .isVisible({ timeout: 1500 })
                .catch(() => false);
            if (stateListboxVisible) {
                const firstOption = stateListbox.locator('[role="option"]').first();
                const hasOption = await firstOption.isVisible({ timeout: 1000 }).catch(() => false);
                if (hasOption) await firstOption.click();
                else await this.page.keyboard.press('Escape');
            }

            await this.addCompanyPostalCode.fill(data.postalCode);
            await this.addCompanyCity.fill(data.city);

            // ── License Information ──────────────────────────────────────────
            await this.addCompanyNmls.fill(data.nmls);
            await this.addCompanyTpoId.fill(data.tpoId);

            if (data.privacyUrl) await this.addCompanyPrivacyUrl.fill(data.privacyUrl);
            if (data.termsUrl)   await this.addCompanyTermsUrl.fill(data.termsUrl);

            // ── Admin Information ────────────────────────────────────────────
            // Select the first existing admin; dismiss the dropdown if empty.
            await this.addCompanyAdminDropdown.click();
            const adminListbox = this.page.getByRole('listbox');
            const adminListboxVisible = await adminListbox
                .isVisible({ timeout: 3000 })
                .catch(() => false);
            if (adminListboxVisible) {
                const firstAdmin = adminListbox.locator('[role="option"]').first();
                const hasAdmin = await firstAdmin.isVisible({ timeout: 2000 }).catch(() => false);
                if (hasAdmin) await firstAdmin.click();
                else await this.page.keyboard.press('Escape');
            }

            // ── Submit ───────────────────────────────────────────────────────
            await this.companyModalCreateBtn.click();
            // Modal hiding + downstream verifyCompanyInTable search covers the wait
            await expect(this.companyModal).toBeHidden({ timeout: 20000 });
        });
    }

    /**
     * Searches by display name and verifies the company row is visible in the
     * table. Call this after `fillAndSubmitAddCompanyForm()`.
     *
     * @param {string} displayName  The Display Name used when creating the company
     */
    async verifyCompanyInTable(displayName) {
        await test.step(`Verify company "${displayName}" is visible in the table`, async () => {
            await this.search(displayName);
            const matchingRow = this.page
                .locator('tr, [role="row"]')
                .filter({ hasText: displayName })
                .first();
            await expect(matchingRow).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Cancels the modal and confirms it is hidden.
     */
    async cancelCompanyModal() {
        await test.step('Cancel Add New Company modal', async () => {
            await this.companyModalCancelBtn.click();
            await expect(this.companyModal).toBeHidden({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Edit Company modal
    // -------------------------------------------------------------------------

    /**
     * Clicks the pencil (edit) icon in the first data row to open the Edit
     * Company modal.
     */
    async openEditCompanyModal() {
        await test.step('Open Edit Company modal for the first row', async () => {
            // The page snapshot confirms each Actions cell contains exactly one
            // button with accessible name "edit".  Targeting by role + name is
            // more reliable than row-index arithmetic with tr/[role="row"] selectors.
            const firstEditBtn = this.page
                .getByRole('button', { name: /^edit$/i })
                .first();
            await firstEditBtn.click();
            // editCompanyModal visibility is the ready signal — no networkidle needed
            await expect(this.editCompanyModal).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Finds the table row whose Name column matches `companyName`, then clicks
     * its pencil icon to open the Edit Company modal.
     *
     * @param {string} companyName  Display name of the company row to edit
     */
    async openEditCompanyModalForRow(companyName) {
        await test.step(`Open Edit Company modal for "${companyName}"`, async () => {
            const targetRow = this.page
                .locator('tr, [role="row"]')
                .filter({ hasText: companyName })
                .first();
            await expect(targetRow).toBeVisible({ timeout: 10000 });

            // Use accessible name "edit" — matches the button label from the snapshot.
            const editBtn = targetRow.getByRole('button', { name: /^edit$/i });
            await editBtn.click();
            await expect(this.editCompanyModal).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Updates editable fields inside the Edit Company modal.
     * Only keys supplied in `updatedData` are changed; omitted keys are skipped.
     *
     * @param {object} updatedData
     * @param {string} [updatedData.displayName]  — new company display name
     * @param {string} [updatedData.fullName]     — new full company name
     * @param {string} [updatedData.phone]        — new 10-digit phone string
     * @param {string} [updatedData.email]        — new email address
     * @param {string} [updatedData.street]       — new street address
     * @param {string} [updatedData.state]        — new state
     * @param {string} [updatedData.postalCode]   — new postal code
     * @param {string} [updatedData.city]         — new city
     * @param {string} [updatedData.nmls]         — new NMLS number
     * @param {string} [updatedData.tpoId]        — new TPO ID
     */
    async fillEditCompanyForm(updatedData) {
        await test.step('Fill Edit Company form with updated data', async () => {
            const replaceField = async (locator, value) => {
                await locator.waitFor({ state: 'visible', timeout: 10000 });
                await locator.click({ clickCount: 3 }); // select-all
                await locator.fill(value);
            };

            if (updatedData.displayName !== undefined)
                await replaceField(this.editCompanyNameInput, updatedData.displayName);
            if (updatedData.fullName !== undefined)
                await replaceField(this.editCompanyFullNameInput, updatedData.fullName);
            if (updatedData.phone !== undefined)
                await replaceField(this.editCompanyPhoneInput, updatedData.phone);
            if (updatedData.email !== undefined)
                await replaceField(this.editCompanyEmailInput, updatedData.email);
            if (updatedData.street !== undefined)
                await replaceField(this.editCompanyStreetInput, updatedData.street);
            if (updatedData.state !== undefined)
                await replaceField(this.editCompanyStateInput, updatedData.state);
            if (updatedData.postalCode !== undefined)
                await replaceField(this.editCompanyPostalInput, updatedData.postalCode);
            if (updatedData.city !== undefined)
                await replaceField(this.editCompanyCityInput, updatedData.city);
            if (updatedData.nmls !== undefined)
                await replaceField(this.editCompanyNmlsInput, updatedData.nmls);
            if (updatedData.tpoId !== undefined)
                await replaceField(this.editCompanyTpoIdInput, updatedData.tpoId);
        });
    }

    /**
     * Clicks UPDATE in the Edit Company modal, waits for the modal to close,
     * then waits for the page to settle.
     */
    async submitEditCompany() {
        await test.step('Submit Edit Company modal (UPDATE)', async () => {
            await this.editCompanyUpdateBtn.click();
            // Modal hiding + downstream search assertion covers data-ready wait
            await expect(this.editCompanyModal).toBeHidden({ timeout: 15000 });
        });
    }

    /**
     * Cancels the Edit Company modal and confirms it is hidden.
     */
    async cancelEditCompanyModal() {
        await test.step('Cancel Edit Company modal', async () => {
            await this.editCompanyCancelBtn.click();
            await expect(this.editCompanyModal).toBeHidden({ timeout: 10000 });
        });
    }
}

export default CompaniesPage;
