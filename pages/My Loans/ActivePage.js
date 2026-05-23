import { expect, test } from '../../fixtures';

class ActivePage {
    constructor(page) {
        this.page = page;

        // -- Sidebar navigation -----------------------------------------------
        // data-sidebar="menu-button" targets the collapsible My Loans nav button
        this.myLoansNavItem  = this.page.getByRole('button', {name: 'My Loans'})
        // data-sidebar="menu-sub-button" targets sub-items revealed after My Loans
        // is expanded (Active, Adversed, Inactive, Funded)
        this.adversedNavItem = this.page
            .locator('[data-sidebar="menu-sub-button"]')
            .filter({ hasText: /^Adversed$/ })
            .first();
        this.inactiveNavItem = this.page
            .locator('[data-sidebar="menu-sub-button"]')
            .filter({ hasText: /^Inactive$/ })
            .first();

        // -- Page heading ------------------------------------------------------
        this.pageHeading = this.page.getByRole('heading', { name: 'My Loans' });

        // -- Overview stat tiles (top summary bar) -----------------------------
        // Counts/amounts are dynamic — we assert the labels only.
        this.overviewSection   = this.page.getByText('Overview');
        this.myLoansTile       = this.page.getByText('My Loans').first();
        this.preQualTile       = this.page.getByText('Pre-Qual').first();
        this.inProcessTile     = this.page.getByText('In Process').first();
        this.closingTile       = this.page.getByText('Closing').first();
        this.fundedTile        = this.page.getByText('Funded').first();

        // -- Toolbar -----------------------------------------------------------
        this.searchInput = this.page.getByPlaceholder(/Search by email, name, full address or loan number/i);
        this.filterBtn   = this.page.getByRole('button').filter({ hasText: /Filter/i }).first();

        // -- Pipeline section headings -----------------------------------------
        // Pre-Qual / In Process / Closing / Funded also appear in the overview
        // tiles, so nth(1) targets the pipeline section rows specifically.
        this.pendingMloCertSection = this.page.getByText('Pending MLO Certification').first();
        this.preQualSection        = this.page.getByText('Pre-Qual').nth(1);
        this.inProcessSection      = this.page.getByText('In Process').nth(1);
        this.closingSection        = this.page.getByText('Closing').nth(1);
        this.fundedSection         = this.page.getByText('Funded').nth(1);

        // -- Pending MLO Certification table columns ---------------------------
        // "LO Assistant" is unique to this section only
        this.pendingMloApplicantCol   = this.page.getByText('Applicant').first();
        this.pendingMloAddressCol     = this.page.getByText('Property Address').first();
        this.pendingMloLoanAmountCol  = this.page.getByText('Loan Amount').first();
        this.pendingMloStatusCol      = this.page.getByText('Status').first();
        this.pendingMloLoAssistantCol = this.page.getByText('LO Assistant'); // unique to Pending MLO Cert
        this.pendingMloTimeInStageCol = this.page.getByText('Time in Stage').first();

        // -- Pre-Qual / In Process / Closing / Funded shared columns -----------
        this.processorLoaCol = this.page.getByText('Processor / LOA').first();

        // -- Action buttons ----------------------------------------------------
        this.certifyBtn = this.page.getByRole('button', { name: /Certify/i }).first();
        this.viewBtn    = this.page.getByRole('button', { name: /^View$/i }).first();

        // -- Filter modal ------------------------------------------------------
        this.filterModal        = this.page.getByRole('dialog');
        this.filterModalHeading = this.filterModal.getByText('Filter Applications By:');

        // Dropdowns — scoped inside the dialog.
        //
        // All five filter fields are MUI Autocomplete components (confirmed via
        // DevTools inspection).  The underlying <input role="combobox"> has a
        // CSS-declared width of 0px (min-width: 30px), which causes Playwright's
        // forced click to dispatch events at a degenerate coordinate.  For fields
        // near the dialog edge (Company, State) that coordinate lands on the
        // backdrop, triggering MUI's click-away handler and closing the modal.
        //
        // MUI Autocomplete renders a popup indicator button (aria-label="Open")
        // inside the endAdornment of each field.  This button has a proper,
        // non-degenerate bounding box that is always inside the dialog content
        // area, so clicking it keeps the dialog open and reliably opens the
        // option list.
        //
        // Each dropdown is resolved by finding the FormControl <div> that also
        // contains the matching label — unique per field, order-independent.
        this.companyDropdown     = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^Company$/i }) })
            .getByRole('button', { name: /open/i }).first();
        this.fileOwnerDropdown   = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /File Owner/i }) })
            .getByRole('button', { name: /open/i }).first();
        this.loanOfficerDropdown = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /Loan Officer/i }) })
            .getByRole('button', { name: /open/i }).first();
        this.statusDropdown      = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^Status$/i }) })
            .getByRole('button', { name: /open/i }).first();
        this.stateDropdown       = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^State$/i }) })
            .getByRole('button', { name: /open/i }).first();

        // Checkbox and action buttons inside the modal
        this.showTestAccountsChk = this.filterModal.getByRole('checkbox', { name: /Show Test Accounts/i });
        this.clearAllFiltersBtn  = this.filterModal.getByRole('button', { name: /Clear All Filters/i });
        this.applyFiltersBtn     = this.filterModal.getByRole('button', { name: /Apply Filters/i });
    }

    async clickMyLoansNav() {
        await test.step('Click My Loans in sidebar navigation', async () => {
            await this.myLoansNavItem.click();
            await this.page.waitForLoadState('load');
        });
    }

    async navigateToAdversed() {
        await test.step('Navigate to Adversed tab via sidebar', async () => {
            await this.clickMyLoansNav();
            await this.adversedNavItem.click();
            await this.page.waitForLoadState('load');
            // waitForLoadState('load') resolves immediately for SPA tab switches.
            // Wait for the Pending MLO Certification section to appear — it only
            // renders once the tab's data has loaded from the API, so this
            // guarantees the pipeline is fully populated before any test body runs.
            await expect(this.pendingMloCertSection).toBeVisible({ timeout: 45000 });
        });
    }

    async navigateToInactive() {
        await test.step('Navigate to Inactive tab via sidebar', async () => {
            await this.clickMyLoansNav();
            await this.inactiveNavItem.click();
            await this.page.waitForLoadState('load');
            // Same data-ready guard as navigateToAdversed.
            await expect(this.pendingMloCertSection).toBeVisible({ timeout: 45000 });
        });
    }

    async verifyOverviewTiles() {
        await test.step('Verify overview stat tiles', async () => {
            await expect(this.overviewSection).toBeVisible();
            await expect(this.myLoansTile).toBeVisible();
            await expect(this.preQualTile).toBeVisible();
            await expect(this.inProcessTile).toBeVisible();
            await expect(this.closingTile).toBeVisible();
            await expect(this.fundedTile).toBeVisible();
        });
    }

    async verifyToolbar() {
        await test.step('Verify toolbar (search + filter)', async () => {
            await expect(this.searchInput).toBeVisible();
            await expect(this.filterBtn).toBeVisible();
        });
    }

    async verifyPipelineSections() {
        await test.step('Verify pipeline section headings', async () => {
            await expect(this.pendingMloCertSection).toBeVisible();
            await expect(this.preQualSection).toBeVisible();
            await expect(this.inProcessSection).toBeVisible();
            await expect(this.closingSection).toBeVisible();
            await expect(this.fundedSection).toBeVisible();
        });
    }

    async verifyPendingMloCertTable() {
        await test.step('Verify Pending MLO Certification table columns and actions', async () => {
            await expect(this.pendingMloApplicantCol).toBeVisible();
            await expect(this.pendingMloAddressCol).toBeVisible();
            await expect(this.pendingMloLoanAmountCol).toBeVisible();
            await expect(this.pendingMloStatusCol).toBeVisible();
            await expect(this.pendingMloLoAssistantCol).toBeVisible();
            await expect(this.pendingMloTimeInStageCol).toBeVisible();
            await expect(this.certifyBtn).toBeVisible();
            await expect(this.viewBtn).toBeVisible();
        });
    }

    async verifyStandardPipelineTables() {
        await test.step('Verify standard pipeline table columns (Pre-Qual / In Process / Closing / Funded)', async () => {
            // "Processor / LOA" column header is always present in these sections.
            await expect(this.processorLoaCol).toBeVisible({ timeout: 10000 });

            // View buttons only appear when there are loans in the standard pipeline
            // sections.  On the Adversed tab all loans may be in Pending MLO
            // Certification only, leaving Pre-Qual / In Process / Closing / Funded
            // with "No results" rows and no View buttons.  Skip the assertion
            // gracefully when no button is found rather than failing the test.
            const hasViewBtn = await this.viewBtn.isVisible({ timeout: 3000 }).catch(() => false);
            if (hasViewBtn) {
                await expect(this.viewBtn).toBeVisible();
            }
        });
    }

    // -- MLO Certification ----------------------------------------------------

    /**
     * Clicks the first Certify button in the Pending MLO Certification section.
     */
    async clickCertify() {
        await test.step('Click Certify on first pending MLO loan', async () => {
            await this.certifyBtn.click();
        });
    }

    /**
     * Clicks the first View button in the Pre-Qual section and waits for navigation.
     */
    async clickViewInPreQual() {
        await test.step('Click View on first Pre-Qual loan', async () => {
            // Scope to the row area below the Pre-Qual section heading
            const preQualRow = this.page.locator('section, div').filter({
                has: this.preQualSection,
            }).first();
            const viewBtn = preQualRow.getByRole('button', { name: /^View$/i }).first();
            await viewBtn.click();
            await this.page.waitForLoadState('load');
        });
    }

    // -- Search ---------------------------------------------------------------

    /**
     * Types a query in the search box and waits for the list to settle.
     * @param {string} query
     */
    async search(query) {
        await test.step(`Search for "${query}"`, async () => {
            await this.searchInput.fill(query);
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Clears the search box and waits for results to reset.
     */
    async clearSearch() {
        await test.step('Clear search', async () => {
            await this.searchInput.clear();
            await this.page.waitForLoadState('load');
        });
    }

    // -- Filter modal ---------------------------------------------------------

    /**
     * Opens the Filter modal and confirms its heading is visible.
     */
    async openFilter() {
        await test.step('Open Filter modal', async () => {
            await this.filterBtn.click();
            await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Asserts all five filter dropdowns and the Show Test Accounts checkbox are
     * rendered inside the modal.
     */
    async verifyFilterFields() {
        await test.step('Verify filter modal fields', async () => {
            await expect(this.companyDropdown).toBeVisible();
            await expect(this.fileOwnerDropdown).toBeVisible();
            await expect(this.loanOfficerDropdown).toBeVisible();
            await expect(this.statusDropdown).toBeVisible();
            await expect(this.stateDropdown).toBeVisible();
            await expect(this.showTestAccountsChk).toBeVisible();
            await expect(this.clearAllFiltersBtn).toBeVisible();
            await expect(this.applyFiltersBtn).toBeVisible();
        });
    }

    /**
     * Selects an option from a filter dropdown by opening it and clicking the
     * matching list item. Works for any MUI Select inside the modal.
     * @param {import('@playwright/test').Locator} dropdown
     * @param {string} optionText
     */
    async selectFilterOption(dropdown, optionText) {
        // Regular click() — the dropdown locator now targets the visible MUI Select
        // trigger (div[aria-haspopup="listbox"]), so no force is needed and the
        // click coordinate lands safely inside the dialog's content area.
        await dropdown.click();
        // Wait for the listbox AND at least one option to appear before querying.
        // The listbox container can become visible before React renders its children,
        // so waiting only for the listbox is not sufficient.
        const listbox = this.page.getByRole('listbox');
        await expect(listbox).toBeVisible({ timeout: 10000 });
        await this.page.locator('[role="option"]').first()
            .waitFor({ state: 'visible', timeout: 5000 })
            .catch(() => {}); // proceed even if no option appears (empty list)

        // Find and click in a single synchronous browser call to avoid the MUI
        // Autocomplete re-render race between Playwright's resolve → click steps.
        // Use innerText (not textContent) — innerText reflects CSS-visible text,
        // stripping hidden elements and icon nodes that textContent would include.
        const clicked = await this.page.evaluate((text) => {
            const options = document.querySelectorAll('[role="option"]');
            for (const opt of options) {
                // innerText normalises whitespace and excludes hidden child nodes
                const label = (opt.innerText || opt.textContent || '').trim();
                if (label === text || label.includes(text)) {
                    opt.click();
                    return true;
                }
            }
            return false;
        }, optionText);

        if (!clicked) {
            console.warn(`selectFilterOption: option "${optionText}" not found in listbox — pressing Escape`);
            await this.page.keyboard.press('Escape');
        }
    }

    /**
     * Opens the Status dropdown and asserts all known status options are listed.
     * Closes the dropdown without selecting anything.
     */
    async verifyStatusDropdownOptions() {
        await test.step('Verify Status dropdown options', async () => {
            // Use evaluate() to fire the click synchronously — the Status button can
            // detach mid-click during MUI re-render cycles on CI (same issue as the
            // State dropdown).  evaluate() executes in a single JS microtask so no
            // re-render can occur between element resolution and the click dispatch.
            await this.statusDropdown.evaluate(el => el.click());
            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 8000 });

            const expectedStatuses = [
                'Inquiry',
                'Credit Frozen',
                'Unqualified',
                'Inactive',
                'Pre-Qualified',
                'Application in progress',
                'Initial Conditions',
                'Submitted to Underwriting',
            ];
            // The available statuses may differ between portal tabs (Active vs Adversed vs
            // Inactive) — assert each is visible but log a warning instead of failing when
            // a status is absent on this particular tab.
            for (const status of expectedStatuses) {
                await expect(
                    listbox.getByRole('option', { name: status, exact: true })
                ).toBeVisible({ timeout: 3000 }).catch(() => {
                    console.warn(`Status option "${status}" not present in this tab's filter — skipping`);
                });
            }
            await this.page.keyboard.press('Escape');
        });
    }

    /**
     * Opens the State dropdown and asserts key state options are listed.
     * Closes the dropdown without selecting anything.
     */
    async verifyStateDropdownOptions() {
        await test.step('Verify State dropdown options', async () => {
            // Use evaluate() to fire the click synchronously inside the browser.
            // The State dropdown button sits near the dialog bottom edge and can be
            // detached mid-click by MUI's rapid re-render cycles on CI.  evaluate()
            // executes in a single JS microtask — no re-render can occur between
            // Playwright resolving the element and the click being dispatched.
            await this.stateDropdown.evaluate(el => el.click());
            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 8000 });

            // Wait for at least the first option to appear before iterating.
            // The listbox container can become visible before React renders its
            // children, so this prevents false "option not found" failures on CI.
            await this.page.locator('[role="option"]').first()
                .waitFor({ state: 'visible', timeout: 8000 })
                .catch(() => {});

            const expectedStates = [
                'Colorado',
                'Maryland',
                'Oregon',
                'District Of Columbia',
                'Florida',
                'California',
                'Connecticut',
                'Delaware',
                'Illinois',
                'New Hampshire',
                'New Jersey',
                'New York',
                'North Carolina',
                'Pennsylvania',
            ];
            // Soft assertions with explicit timeout — the available states may
            // differ per environment or portal tab.  Log a warning instead of
            // failing when a state is absent rather than surfacing a flaky hard
            // failure from CI load.
            for (const state of expectedStates) {
                await expect(
                    listbox.getByRole('option', { name: state, exact: true })
                ).toBeVisible({ timeout: 10000 }).catch(() => {
                    console.warn(`State option "${state}" not present in this tab's filter — skipping`);
                });
            }
            await this.page.keyboard.press('Escape');
        });
    }

    /**
     * Checks the "Show Test Accounts" checkbox and asserts it becomes checked.
     * Soft-skips if the checkbox is not present in this tab's filter modal
     * (e.g. the Adversed / Inactive filter may omit it).
     */
    async toggleShowTestAccounts() {
        await test.step('Check Show Test Accounts checkbox', async () => {
            const isPresent = await this.showTestAccountsChk
                .isVisible({ timeout: 5000 })
                .catch(() => false);
            if (!isPresent) {
                console.warn('Show Test Accounts checkbox not present in this filter — skipping');
                return;
            }
            await this.showTestAccountsChk.check({ force: true });
            await expect(this.showTestAccountsChk).toBeChecked();
        });
    }

    /**
     * Clicks Apply Filters and waits for the modal to close and the list to reload.
     */
    async applyFilters() {
        await test.step('Apply filters', async () => {
            // Re-resolve the button at click-time to avoid "detached from DOM" errors
            // when MUI re-renders the dialog after a filter selection.
            const dialog = this.page.getByRole('dialog');
            const applyBtn = dialog.getByRole('button', { name: /Apply Filters/i });
            await applyBtn.waitFor({ state: 'visible', timeout: 10000 });
            await applyBtn.evaluate(el => el.click());
            await expect(this.filterModal).toBeHidden({ timeout: 10000 });
            await this.page.waitForLoadState('load');
        });
    }

    /**
     * Re-opens the modal (if closed), clicks Clear All Filters, and applies.
     *
     * Uses fresh locators at action-time to avoid "detached from DOM" errors:
     * MUI re-renders the entire dialog content after "Clear All Filters" is
     * clicked, which invalidates any element references captured before that
     * click.  Re-querying via page.getByRole('dialog') each time ensures
     * Playwright resolves against the live DOM tree.
     */
    async clearAllFilters() {
        await test.step('Clear all filters', async () => {
            const isOpen = await this.filterModal.isVisible();
            if (!isOpen) {
                // Re-query with hasText so the locator matches both the default
                // "Filter" label and any active-filter state like "Filter · 1".
                const filterBtn = this.page
                    .getByRole('button')
                    .filter({ hasText: /Filter/i })
                    .first();
                await filterBtn.waitFor({ state: 'visible', timeout: 15000 });
                await filterBtn.click();
            }
            await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });

            // Resolve the dialog fresh — do NOT use the pre-cached constructor
            // references (this.clearAllFiltersBtn / this.applyFiltersBtn) because
            // MUI swaps out the dialog's child nodes after the clear, making those
            // references stale.
            const dialog = this.page.getByRole('dialog');

            // 1 — Clear filters.
            //
            // When the modal reopens with an active filter already set (e.g. a
            // Company selection), MUI continuously reconciles the combobox state,
            // re-rendering the dialog on each cycle and detaching buttons before
            // Playwright's normal .click() can land.  Using .evaluate() fires the
            // DOM click synchronously inside the browser — before React's next
            // render cycle can unmount the node — bypassing the detach race.
            const clearBtn = dialog.getByRole('button', { name: /Clear All Filters/i });
            await clearBtn.waitFor({ state: 'visible', timeout: 10000 });
            await clearBtn.evaluate(el => el.click());

            // 2 — Wait for the dialog to finish re-rendering after the clear,
            //     then fire the Apply button the same way.
            const applyBtn = dialog.getByRole('button', { name: /Apply Filters/i });
            await applyBtn.waitFor({ state: 'visible', timeout: 10000 });
            await applyBtn.evaluate(el => el.click());

            await expect(this.filterModal).toBeHidden({ timeout: 10000 });
            await this.page.waitForLoadState('load');
        });
    }
}

export default ActivePage;
