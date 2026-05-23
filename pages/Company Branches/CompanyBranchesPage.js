import { expect, test } from '../../fixtures';

class CompanyBranchesPage {
    constructor(page) {
        this.page = page;

        // -- Sidebar navigation -----------------------------------------------
        this.branchesNav = this.page
            .locator('[data-sidebar]')
            .filter({ hasText: /^Company Branches$/i })
            .first();

        // -- Page heading and toolbar -----------------------------------------
        this.pageHeading    = this.page.getByRole('heading', { name: /^Branches$/i })
            .or(this.page.getByText(/^Branches$/i).first());
        this.searchInput    = this.page.getByPlaceholder(/Search by name or NMLS/i);
        this.searchBtn      = this.page.getByRole('button', { name: /^Search$/i });
        this.addNewBranchBtn = this.page.getByRole('button', { name: /Add New Branch/i });

        // -- Table column headers ---------------------------------------------
        this.colName    = this.page.getByText('Name',    { exact: true }).first();
        this.colCompany = this.page.getByText('Company', { exact: true }).first();
        this.colPhone   = this.page.getByText('Phone',   { exact: true }).first();
        this.colNmls    = this.page.getByText('NMLS',    { exact: true }).first();
        this.colActions = this.page.getByText('Actions', { exact: true }).first();

        // -- Pagination -------------------------------------------------------
        this.perPageLabel      = this.page.getByText(/Officers per page/i).first();
        this.paginationCounter = this.page.getByText(/\d+\s*[–-]\s*\d+\s+of\s+\d+/i).first();

        // -- Add New Branch modal ---------------------------------------------
        // The live-chat widget lives inside <iframe> elements and is invisible
        // to page.getByRole('dialog'), so no heading filter is needed.
        this.branchModal          = this.page.getByRole('dialog');
        this.branchModalHeading   = this.branchModal.getByText(/Add.*Branch/i).first();

        // MUI floating-label inputs inside the modal
        // Modal uses "Display Name" (not "Branch Name"); Full Company Name is a text input (no combobox).
        // NMLS lives under the scrollable "Branch License Information" section.
        this.addBranchNameInput        = this.branchModal.getByLabel(/Display Name/i).first();
        this.addBranchTagInput         = this.branchModal.getByLabel(/Branch tag/i).first();
        this.addBranchFullCompanyInput = this.branchModal.getByLabel(/Full Company Name/i).first();
        this.addBranchPhoneInput       = this.branchModal.getByLabel(/^Phone/i).first();
        this.addBranchEmailInput       = this.branchModal.getByLabel(/^Email/i).first();
        this.addBranchNmlsInput        = this.branchModal.getByLabel(/^NMLS/i).first();

        this.branchModalCancelBtn = this.branchModal
            .getByRole('button', { name: /^Cancel$/i });
        // Submit button text is "CREATE BRANCH" — match case-insensitively without anchors
        this.branchModalCreateBtn = this.branchModal
            .getByRole('button', { name: /Create Branch/i });

        // -- Edit Branch modal ------------------------------------------------
        // Edit modal also uses "Display Name" (not "Branch Name")
        this.editBranchModal        = this.page.getByRole('dialog');
        this.editBranchNameInput    = this.page.getByLabel(/Display Name/i).first();
        this.editBranchPhoneInput   = this.editBranchModal.getByLabel(/^Phone/i).first();
        this.editBranchCancelBtn    = this.editBranchModal
            .getByRole('button', { name: /^Cancel$/i });
        // Edit submit button is likely "UPDATE BRANCH" — match case-insensitively
        this.editBranchUpdateBtn    = this.editBranchModal
            .getByRole('button', { name: /Update/i });
    }

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------

    async navigateToBranches() {
        await test.step('Navigate to Company Branches via sidebar', async () => {
            await expect(this.branchesNav).toBeVisible({ timeout: 15000 });
            await this.branchesNav.click();
            // waitForLoadState('networkidle') hangs indefinitely on CI for SPAs
            // that maintain background polling/websocket connections.  The page-
            // heading visibility check below is the reliable data-ready signal.
            await expect(this.pageHeading).toBeVisible({ timeout: 20000 });
        });
    }

    // -------------------------------------------------------------------------
    // Page structure
    // -------------------------------------------------------------------------

    async verifyPageHeading() {
        await test.step('Verify Branches page heading is visible', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyToolbar() {
        await test.step('Verify search bar and Add New Branch button are visible', async () => {
            await expect(this.searchInput).toBeVisible();
            await expect(this.searchBtn).toBeVisible();
            await expect(this.addNewBranchBtn).toBeVisible();
        });
    }

    async verifyTableColumns() {
        await test.step('Verify all table column headers are visible', async () => {
            await expect(this.colName).toBeVisible();
            await expect(this.colCompany).toBeVisible();
            await expect(this.colPhone).toBeVisible();
            await expect(this.colNmls).toBeVisible();
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

    async verifyTableHasRows() {
        await test.step('Verify at least one branch row is present', async () => {
            const firstDataCell = this.page
                .locator('tr, [role="row"]')
                .nth(1)
                .locator('td, [role="cell"]')
                .first();
            await expect(firstDataCell).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Returns the NMLS value from the first data row (NMLS column, index 3).
     * Columns: 0=Name, 1=Company, 2=Phone, 3=NMLS
     * @returns {Promise<string>}
     */
    async getFirstRowNmls() {
        const nmlsCell = this.page
            .locator('tr, [role="row"]')
            .nth(1)
            .locator('td, [role="cell"]')
            .nth(3); // 0=Name, 1=Company, 2=Phone, 3=NMLS
        await nmlsCell.waitFor({ state: 'visible', timeout: 10000 });
        return (await nmlsCell.innerText()).trim();
    }

    // -------------------------------------------------------------------------
    // Search
    // -------------------------------------------------------------------------

    async search(query) {
        await test.step(`Search for "${query}"`, async () => {
            await this.searchInput.fill(query);
            await this.searchBtn.click();
            // Drop networkidle — callers always follow with verifySearchResultContains
            // which carries its own 10 s element-visibility timeout.
        });
    }

    async verifySearchResultContains(text) {
        await test.step(`Verify search result contains "${text}"`, async () => {
            const matchingRow = this.page
                .locator('tr, [role="row"]')
                .filter({ hasText: text })
                .first();
            await expect(matchingRow).toBeVisible({ timeout: 10000 });
        });
    }

    async clearSearch() {
        await test.step('Clear search and reload full branch list', async () => {
            // Drop networkidle everywhere — callers follow with table assertions that
            // carry their own element-visibility timeouts.
            const inlineClear = this.page
                .locator('input[placeholder*="Search"] ~ button, input[placeholder*="Search"] + button')
                .first();
            const hasInlineClear = await inlineClear.isVisible({ timeout: 1000 }).catch(() => false);
            if (hasInlineClear) {
                await inlineClear.click();
                return;
            }

            const emptyStateClear = this.page.getByRole('button', { name: /Clear Search/i });
            const hasEmptyState = await emptyStateClear.isVisible({ timeout: 1000 }).catch(() => false);
            if (hasEmptyState) {
                await emptyStateClear.click();
                return;
            }

            await this.searchInput.clear();
            await this.searchBtn.click();
        });
    }

    // -------------------------------------------------------------------------
    // Add New Branch modal
    // -------------------------------------------------------------------------

    async openAddNewBranchModal() {
        await test.step('Open Add New Branch modal', async () => {
            await this.addNewBranchBtn.click();
            await expect(this.branchModal).toBeVisible({ timeout: 10000 });
        });
    }

    async verifyAddBranchModalFields() {
        await test.step('Verify Add New Branch modal fields are visible', async () => {
            await expect(this.branchModal).toBeVisible();
            await expect(this.branchModalHeading).toBeVisible({ timeout: 10000 });
            await expect(this.addBranchNameInput).toBeVisible();          // Display Name (top section)
            await expect(this.addBranchFullCompanyInput).toBeVisible();   // Full Company Name
            await expect(this.addBranchPhoneInput).toBeVisible();         // Phone
            await expect(this.addBranchEmailInput).toBeVisible();         // Email *
            // NMLS is in the scrollable "Branch License Information" section —
            // scroll to it to confirm it's present, then scroll back up to verify Cancel/Create
            await this.addBranchNmlsInput.scrollIntoViewIfNeeded();
            await expect(this.addBranchNmlsInput).toBeVisible();          // NMLS
            await this.branchModalCancelBtn.scrollIntoViewIfNeeded();
            await expect(this.branchModalCancelBtn).toBeVisible();
            await expect(this.branchModalCreateBtn).toBeVisible();
        });
    }

    /**
     * Fills the Add New Branch form and clicks CREATE BRANCH.
     *
     * The portal modal has four scrollable sections — all required (*) fields are filled:
     *   Branch Information   : Display Name *, Branch tag *, Full Company Name *, Phone
     *   Branch Address       : Street Name *, State *, Postal Code *, City *
     *   Branch License       : NMLS *
     *   Branch Manager       : "Create a new branch manager account" is unchecked so the
     *                          Name/Email/Password sub-fields are hidden; no manager is created.
     *
     * @param {object} data
     * @param {string}  data.name            — Display Name (required)
     * @param {string}  [data.tag]           — Branch tag (falls back to slugified name)
     * @param {string}  [data.fullCompanyName] — Full Company Name text
     * @param {string}  [data.phone]         — 10-digit phone string
     * @param {string}  [data.email]         — branch email address (required *)
     * @param {string}  [data.street]        — Street Name
     * @param {string}  [data.state]         — State
     * @param {string}  [data.postalCode]    — Postal Code
     * @param {string}  [data.city]          — City
     * @param {string}  [data.nmls]               — NMLS number
     * @param {string}  [data.privacyPolicyUrl]   — Privacy Policy URL
     * @param {string}  [data.termsUrl]           — Terms URL
     * @param {string}  [data.managerName]        — Branch Manager Name (required *)
     * @param {string}  [data.managerEmail]  — Branch Manager Email (required *)
     * @param {string}  [data.managerPhone]  — Branch Manager Phone (required *)
     */
    async fillAndSubmitAddBranchForm(data) {
        await test.step('Fill Add New Branch form and submit', async () => {
            // ── Branch Information ──────────────────────────────────────────────
            await this.addBranchNameInput.fill(data.name);

            const tagValue = data.tag || data.name.replace(/\s+/g, '-').slice(0, 20);
            const tagVisible = await this.addBranchTagInput.isVisible({ timeout: 2000 }).catch(() => false);
            if (tagVisible) await this.addBranchTagInput.fill(tagValue);

            if (data.fullCompanyName) {
                const fcVisible = await this.addBranchFullCompanyInput.isVisible({ timeout: 2000 }).catch(() => false);
                if (fcVisible) await this.addBranchFullCompanyInput.fill(data.fullCompanyName);
            }

            if (data.phone) {
                await this.addBranchPhoneInput.clear();
                await this.addBranchPhoneInput.fill(data.phone);
            }

            // Email (required *)
            if (data.email) {
                const emailVisible = await this.addBranchEmailInput.isVisible({ timeout: 2000 }).catch(() => false);
                if (emailVisible) await this.addBranchEmailInput.fill(data.email);
            }

            // ── Branch Address Information ──────────────────────────────────────
            const streetInput  = this.branchModal.getByLabel(/Street Name/i).first();
            const stateInput   = this.branchModal.getByLabel(/^State/i).first();
            const postalInput  = this.branchModal.getByLabel(/Postal Code/i).first();
            const cityInput    = this.branchModal.getByLabel(/^City/i).first();

            if (data.street) {
                await streetInput.scrollIntoViewIfNeeded();
                await streetInput.fill(data.street);
            }
            if (data.state)      await stateInput.fill(data.state);
            if (data.postalCode) await postalInput.fill(data.postalCode);
            if (data.city)       await cityInput.fill(data.city);

            // ── Branch License Information ──────────────────────────────────────
            if (data.nmls) {
                await this.addBranchNmlsInput.scrollIntoViewIfNeeded();
                await this.addBranchNmlsInput.fill(data.nmls);
            }
            if (data.privacyPolicyUrl) {
                const privacyInput = this.branchModal.getByLabel(/Privacy Policy URL/i).first();
                const privacyVisible = await privacyInput.isVisible({ timeout: 2000 }).catch(() => false);
                if (privacyVisible) await privacyInput.fill(data.privacyPolicyUrl);
            }
            if (data.termsUrl) {
                const termsInput = this.branchModal.getByLabel(/Terms URL/i).first();
                const termsVisible = await termsInput.isVisible({ timeout: 2000 }).catch(() => false);
                if (termsVisible) await termsInput.fill(data.termsUrl);
            }

            // ── Branch Manager information ──────────────────────────────────────
            // The portal REQUIRES a branch manager — either select an existing one
            // or create a new one.  Since "Create a new branch manager account" is
            // checked by default, we keep it checked and fill Name + Email.

            // Step 1 — Select Company from the MUI Autocomplete popup.
            // The Company field renders a text input (role="combobox") + a
            // popup-indicator button (title="Open").  Click the Open button.
            const companyOpenBtn = this.branchModal
                .locator('button[title="Open"]').first();
            if (await companyOpenBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
                await companyOpenBtn.scrollIntoViewIfNeeded();
                // Use evaluate() — the MUI Autocomplete popup-indicator button can
                // detach mid-click during React re-render cycles on CI.
                await companyOpenBtn.evaluate(el => el.click());
                const listbox = this.page.getByRole('listbox');
                await listbox.waitFor({ state: 'visible', timeout: 5000 });
                const firstOption = listbox.getByRole('option').first();
                await firstOption.waitFor({ state: 'visible', timeout: 3000 });
                await firstOption.click();
                await listbox.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
            }

            // Step 2 — Check "Create a new branch manager account".
            // The checkbox STARTS unchecked (CheckBoxOutlineBlankIcon in DevTools).
            // Checking it reveals the Branch Manager Name * and Email * fields.
            // The MUI input is opacity:0 — use check({ force: true }) to bypass.
            const createManagerLabel = this.branchModal
                .getByText(/Create a new branch manager account/i).first();
            if (await createManagerLabel.isVisible({ timeout: 3000 }).catch(() => false)) {
                await createManagerLabel.scrollIntoViewIfNeeded();
                const managerChkInput = this.branchModal
                    .locator('input[type="checkbox"]').last();
                const isChecked = await managerChkInput.isChecked().catch(() => false);
                if (!isChecked) {
                    await managerChkInput.check({ force: true });
                }
            }

            // Step 3 — Fill Branch Manager Name * and Email * (now visible after checking).
            if (data.managerName) {
                const mgNameInput = this.branchModal
                    .getByLabel(/Branch Manager Name/i).first();
                // Wait for the field to appear after the checkbox check
                await mgNameInput.waitFor({ state: 'visible', timeout: 5000 });
                await mgNameInput.fill(data.managerName);
            }
            if (data.managerEmail) {
                const mgEmailInput = this.branchModal
                    .getByLabel(/Branch Manager Email/i).first();
                const mgEmailVisible = await mgEmailInput
                    .isVisible({ timeout: 3000 }).catch(() => false);
                if (mgEmailVisible) await mgEmailInput.fill(data.managerEmail);
            }
            if (data.managerPhone) {
                const mgPhoneInput = this.branchModal
                    .getByLabel(/Branch Manager Phone/i).first();
                const mgPhoneVisible = await mgPhoneInput
                    .isVisible({ timeout: 3000 }).catch(() => false);
                if (mgPhoneVisible) {
                    await mgPhoneInput.clear();
                    await mgPhoneInput.fill(data.managerPhone);
                }
            }

            // ── Submit ──────────────────────────────────────────────────────────
            await this.branchModalCreateBtn.scrollIntoViewIfNeeded();
            await this.branchModalCreateBtn.click();
            // Modal hiding is the data-ready signal; verifyBranchInTable (called
            // immediately after) re-searches the table which has its own wait.
            await expect(this.branchModal).toBeHidden({ timeout: 20000 });
        });
    }

    async cancelBranchModal() {
        await test.step('Cancel Add New Branch modal', async () => {
            await this.branchModalCancelBtn.click();
            await expect(this.branchModal).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Searches by branch name and verifies the row is visible.
     * @param {string} branchName
     */
    async verifyBranchInTable(branchName) {
        await test.step(`Verify branch "${branchName}" is visible in the table`, async () => {
            await this.search(branchName);
            const matchingRow = this.page
                .locator('tr, [role="row"]')
                .filter({ hasText: branchName })
                .first();
            await expect(matchingRow).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Edit Branch modal
    // -------------------------------------------------------------------------

    async openEditBranchModal() {
        await test.step('Open Edit Branch modal for the first row', async () => {
            const firstEditBtn = this.page
                .getByRole('button', { name: /^edit$/i })
                .first();
            await firstEditBtn.click();
            // editBranchModal visibility is the ready signal — no networkidle needed
            await expect(this.editBranchModal).toBeVisible({ timeout: 10000 });
        });
    }

    async fillEditBranchForm(updatedData) {
        await test.step('Fill Edit Branch form with updated data', async () => {
            const replaceField = async (locator, value) => {
                await locator.waitFor({ state: 'visible', timeout: 10000 });
                await locator.click({ clickCount: 3 });
                await locator.fill(value);
            };

            // Edit modal has Display Name and Phone; NMLS is not editable in the modal
            if (updatedData.name  !== undefined) await replaceField(this.editBranchNameInput,  updatedData.name);
            if (updatedData.phone !== undefined) await replaceField(this.editBranchPhoneInput, updatedData.phone);
        });
    }

    async submitEditBranch() {
        await test.step('Submit Edit Branch modal (UPDATE / SAVE)', async () => {
            await this.editBranchUpdateBtn.click();
            // Modal hiding + downstream search assertion covers data-ready wait
            await expect(this.editBranchModal).toBeHidden({ timeout: 15000 });
        });
    }

    async cancelEditBranchModal() {
        await test.step('Cancel Edit Branch modal', async () => {
            await this.editBranchCancelBtn.click();
            await expect(this.editBranchModal).toBeHidden({ timeout: 10000 });
        });
    }
}

export default CompanyBranchesPage;
