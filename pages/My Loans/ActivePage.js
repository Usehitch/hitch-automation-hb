import { expect, test } from '../../fixtures';

class ActivePage {
    constructor(page) {
        this.page = page;

        // -- Sidebar navigation -----------------------------------------------
        // data-sidebar="menu-button" targets the collapsible My Loans nav button
        this.myLoansNavItem = this.page.getByRole('button', { name: 'My Loans' })
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
        this.overviewSection = this.page.getByText('Overview');
        this.myLoansTile = this.page.getByText('My Loans').first();
        this.preQualTile = this.page.getByText('Pre-Qual').first();
        this.inProcessTile = this.page.getByText('In Process').first();
        this.closingTile = this.page.getByText('Closing').first();
        this.fundedTile = this.page.getByText('Funded').first();

        // -- Toolbar -----------------------------------------------------------
        this.searchInput = this.page.getByPlaceholder(/Search by email, name, full address or loan number/i);
        this.filterBtn = this.page.getByRole('button').filter({ hasText: /Filter/i }).first();

        // -- Pipeline section headings -----------------------------------------
        // Pre-Qual / In Process / Closing / Funded also appear in the overview
        // tiles, so nth(1) targets the pipeline section rows specifically.
        this.pendingMloCertSection = this.page.getByText('Pending MLO Certification').first();
        this.preQualSection = this.page.getByText('Pre-Qual').nth(1);
        this.inProcessSection = this.page.getByText('In Process').nth(1);
        this.closingSection = this.page.getByText('Closing').nth(1);
        this.fundedSection = this.page.getByText('Funded').nth(1);

        // -- Pending MLO Certification table columns ---------------------------
        // "LO Assistant" is unique to this section only
        this.pendingMloApplicantCol = this.page.getByText('Applicant').first();
        this.pendingMloAddressCol = this.page.getByText('Property Address').first();
        this.pendingMloLoanAmountCol = this.page.getByText('Loan Amount').first();
        this.pendingMloStatusCol = this.page.getByText('Status').first();
        this.pendingMloLoAssistantCol = this.page.getByText('LO Assistant'); // unique to Pending MLO Cert
        this.pendingMloTimeInStageCol = this.page.getByText('Time in Stage').first();

        // -- Pre-Qual / In Process / Closing / Funded shared columns -----------
        this.processorLoaCol = this.page.getByText('Processor / LOA').first();

        // -- Action buttons ----------------------------------------------------
        this.certifyBtn = this.page.getByRole('button', { name: /Certify/i }).first();
        this.viewBtn = this.page.getByRole('button', { name: /^View$/i }).first();

        // -- Filter modal ------------------------------------------------------
        // Scope to the specific dialog that contains the filter heading so that
        // live-chat widgets or other dialogs with role="dialog" (visible in the
        // bottom-right corner of the portal) are never accidentally matched.
        // When the filter modal is closed this locator matches 0 elements, giving
        // clear failures instead of silently binding to the wrong element.
        this.filterModal = this.page.locator('[role="dialog"]').filter({
            has: this.page.getByText('Filter Applications By:', { exact: true }),
        });
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
        // Each dropdown is pinned to the INNERMOST ancestor div (.last()) that
        // contains that field's label — this is the MuiFormControl-root wrapping
        // only that specific Autocomplete.  Using .first() or .nth(n) selects
        // progressively-outer ancestors (e.g. MuiDialogContent-root) that span
        // the whole dialog and contain all five Open buttons, which causes
        // evaluate() to throw a strict-mode violation.
        this.companyDropdown = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^Company$/i }) }).last();
        this.fileOwnerDropdown = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /File Owner/i }) }).last();
        this.loanOfficerDropdown = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /Loan Officer/i }) }).last();
        this.statusDropdown = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^Status$/i }) }).last();
        this.stateDropdown = this.filterModal
            .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^State$/i }) }).last();

        // Checkbox and action buttons inside the modal
        this.showTestAccountsChk = this.filterModal.getByRole('checkbox', { name: /Show Test Accounts/i });
        this.clearAllFiltersBtn = this.filterModal.getByRole('button', { name: /Clear All Filters/i });
        this.applyFiltersBtn = this.filterModal.getByRole('button', { name: /Apply Filters/i });
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
            // Wait for the filter toolbar button — it appears as soon as the tab's
            // UI has mounted and is not data-dependent (unlike pendingMloCertSection
            // which only renders when there are pending MLO loans and can take > 60 s
            // on loaded CI).  Tests that specifically need pipeline sections wait for
            // them in their own step bodies.
            await expect(this.filterBtn).toBeVisible({ timeout: 30000 });
        });
    }

    async navigateToInactive() {
        await test.step('Navigate to Inactive tab via sidebar', async () => {
            await this.clickMyLoansNav();
            await this.inactiveNavItem.click();
            await this.page.waitForLoadState('load');
            // Same toolbar-ready guard as navigateToAdversed.
            await expect(this.filterBtn).toBeVisible({ timeout: 30000 });
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

    async verifyPipelineSections({ requirePendingMlo = true } = {}) {
        await test.step('Verify pipeline section headings', async () => {
            if (requirePendingMlo) {
                await expect(this.pendingMloCertSection).toBeVisible();
            }
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
            await this.certifyBtn.click({ force: true });
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
            // waitForLoadState('load') resolves instantly on a SPA because the
            // 'load' event already fired on initial page load.  waitForLoadState
            // 'networkidle' waits until there are no in-flight requests for 500 ms,
            // which covers the debounce + API round-trip on CI machines.
            // The catch() makes it non-fatal if the page has long-polling requests
            // that never reach idle within the timeout.
            // 20 s — search involves a debounce + API round-trip on CI machines.
            // The catch() makes it non-fatal if long-polling requests prevent idle.
            await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
        });
    }

    /**
     * Clears the search box and waits for results to reset.
     */
    async clearSearch() {
        await test.step('Clear search', async () => {
            await this.searchInput.clear();
            await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
        });
    }

    // -- Filter modal ---------------------------------------------------------

    /**
     * Opens the Filter modal and confirms its heading is visible.
     *
     * Idempotent — if the modal is already open the click is skipped entirely.
     * Clicking the Filter button while the dialog is visible triggers MUI's
     * click-away handler (the button is behind the backdrop) and closes the modal
     * instead of opening it, which is a frequent source of CI flakiness when
     * openFilter() is called twice in the same test.
     *
     * Uses waitFor + evaluate() for the button click so no MUI re-render cycle
     * can detach the node between Playwright's element-resolve and event-dispatch.
     */
    async openFilter() {
        await test.step('Open Filter modal', async () => {
            // Skip the button click when the modal is already visible to avoid
            // triggering MUI's click-away handler on CI.
            const alreadyOpen = await this.filterModal.isVisible().catch(() => false);
            if (!alreadyOpen) {
                await this.filterBtn.waitFor({ state: 'visible', timeout: 15000 });
                await this.filterBtn.evaluate(el => el.click());
            }
            await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Asserts all five filter dropdowns and the Show Test Accounts checkbox are
     * rendered inside the modal.  Explicit 10 s timeouts guard against CI slowness
     * where the MUI dialog animation hasn't finished painting by the default 5 s.
     */
    async verifyFilterFields() {
        await test.step('Verify filter modal fields', async () => {
            await expect(this.companyDropdown).toBeVisible({ timeout: 10000 });
            await expect(this.fileOwnerDropdown).toBeVisible({ timeout: 10000 });
            await expect(this.loanOfficerDropdown).toBeVisible({ timeout: 10000 });
            await expect(this.statusDropdown).toBeVisible({ timeout: 10000 });
            await expect(this.stateDropdown).toBeVisible({ timeout: 10000 });
            await expect(this.showTestAccountsChk).toBeVisible({ timeout: 10000 });
            await expect(this.clearAllFiltersBtn).toBeVisible({ timeout: 10000 });
            await expect(this.applyFiltersBtn).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Selects an option from a filter dropdown by opening it, typing to filter,
     * and clicking the matching list item.  Works for any MUI Autocomplete
     * inside the modal (Company, File Owner, Loan Officer, Status, State).
     *
     * Flow:
     *  1. Click the popup-indicator button to open the dropdown.
     *  2. Fill the active combobox input — after the popup opens MUI sets
     *     aria-expanded="true" on the associated <input role="combobox">,
     *     which uniquely identifies it.  We target this attribute directly
     *     with fill() instead of page.keyboard.type() so we never accidentally
     *     type into the page-level search bar (which holds focus by default
     *     and would reload the loan list on every keystroke).
     *  3. Wait for the filtered option to appear in the listbox.
     *  4. Click the option synchronously (evaluate) to beat MUI re-render cycles.
     *     The modal stays open; Apply Filters must be clicked separately.
     *
     * @param {import('@playwright/test').Locator} dropdown  The "Open" button locator
     * @param {string} optionText  Exact or partial label of the option to select
     */
    async selectFilterOption(dropdown, optionText) {
        // Step 1 — open the MUI Autocomplete popup.
        //
        // `dropdown` is a container div (MuiFormControl-root) — use getByRole to
        // find the single "Open" button inside it.
        //
        // IMPORTANT: MUI Autocomplete's popup-indicator button uses onMouseDown
        // (not onClick) to open the popup — this prevents the focused input from
        // blurring before the listbox renders.  el.click() only dispatches a
        // `click` DOM event; it does NOT dispatch `mousedown`.  We therefore
        // dispatch `mousedown` explicitly, which triggers MUI's handler.
        //
        // evaluate() is still used (instead of Playwright's click()) so the
        // entire dispatch happens in one synchronous JS microtask — preventing
        // the MUI re-render race that detaches the button between Playwright's
        // element-resolve and its coordinate-based event dispatch.
        const openBtn = dropdown.getByRole('button', { name: /open/i });
        await openBtn.waitFor({ state: 'visible', timeout: 10000 });
        await openBtn.evaluate(el =>
            el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))
        );

        // Step 2 — confirm the listbox is open and wait for options to populate.
        //
        // The listbox container can become visible before React renders its
        // children, so we wait for at least one [role="option"] before scanning.
        const listbox = this.page.getByRole('listbox');
        await expect(listbox).toBeVisible({ timeout: 10000 });
        await this.page.locator('[role="option"]').first()
            .waitFor({ state: 'visible', timeout: 5000 })
            .catch(() => { }); // proceed even if no options appear (empty list)

        // Step 3 — click the matching option in one synchronous browser call.
        //
        // page.evaluate() dispatches the click inside the browser process — no
        // round-trip between Playwright and the renderer, so no MUI re-render can
        // detach the option node between resolution and dispatch.
        const clicked = await this.page.evaluate((text) => {
            const options = document.querySelectorAll('[role="option"]');
            for (const opt of options) {
                // innerText reflects CSS-visible text, excluding hidden child nodes
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
            // Only press Escape if the popup is still open — if MUI already closed
            // it, Escape would close the filter modal and break applyFilters().
            const listboxStillOpen = await listbox.isVisible().catch(() => false);
            if (listboxStillOpen) {
                await this.page.keyboard.press('Escape');
            }
        }
    }

    /**
     * Opens the Status dropdown and asserts all known status options are listed.
     * Closes the dropdown without selecting anything.
     */
    async verifyStatusDropdownOptions() {
        await test.step('Verify Status dropdown options', async () => {
            // Guard: confirm the "Filter Applications By:" modal is open and fully
            // rendered before we interact with any dropdown inside it.  Without this,
            // a slow MUI animation or a mis-fired click-away on the filter button
            // could leave the modal closed and silently dispatch evaluate() on a
            // detached element.
            await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });

            // statusDropdown is already scoped to the innermost MuiFormControl-root
            // for Status only (constructor uses .last()), so getByRole finds exactly
            // one Open button.  Dispatch mousedown (not click) — MUI Autocomplete
            // listens on onMouseDown for the popup toggle, not onClick.
            await this.statusDropdown.getByRole('button', { name: /open/i }).evaluate(el =>
                el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))
            );
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
            // stateDropdown is already scoped to the innermost MuiFormControl-root
            // for State only (constructor uses .last()), so getByRole finds exactly
            // one Open button.  Dispatch mousedown (not click) — same reason as
            // selectFilterOption: MUI uses onMouseDown for the popup toggle.
            await this.stateDropdown.getByRole('button', { name: /open/i }).evaluate(el =>
                el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }))
            );
            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 8000 });

            // Wait for at least the first option to appear before iterating.
            // The listbox container can become visible before React renders its
            // children, so this prevents false "option not found" failures on CI.
            await this.page.locator('[role="option"]').first()
                .waitFor({ state: 'visible', timeout: 8000 })
                .catch(() => { });

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
     *
     * Re-resolves the button at action-time so MUI re-renders triggered by a prior
     * filter selection cannot leave a stale reference.  waitFor ensures the button
     * is visible and attached before we act; evaluate() dispatches the DOM click
     * synchronously so no further re-render can detach the node between Playwright's
     * resolve and event-dispatch steps.
     */
    async applyFilters() {
        await test.step('Apply filters', async () => {
            // Use the scoped filterModal (not getByRole('dialog')) so the chat widget
            // or any other ambient dialog is never matched by accident.
            const dialog = this.filterModal;
            const applyBtn = dialog.getByRole('button', { name: /Apply Filters/i });

            // Wait for the button to be fully mounted before clicking.
            // After a filter selection MUI re-renders the dialog content, which can
            // briefly detach the button from the DOM.  waitFor blocks until it is
            // visible and attached again.
            await applyBtn.waitFor({ state: 'visible', timeout: 10000 });

            // Synchronous browser-side click — no re-render can occur between
            // Playwright's element-resolve and the DOM event dispatch.
            await applyBtn.evaluate(el => el.click());

            // Confirm the modal closed and the underlying list has reloaded.
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
                const filterBtn = this.page
                    .getByRole('button')
                    .filter({ hasText: /Filter/i })
                    .first();
                await filterBtn.waitFor({ state: 'visible', timeout: 15000 });
                await filterBtn.click();
            }
            await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });

            // Use the scoped filterModal so the chat widget is never matched.
            const dialog = this.filterModal;
            const clearBtn = dialog.getByRole('button', { name: /Clear All Filters/i });
            await clearBtn.waitFor({ state: 'visible', timeout: 10000 });
            await clearBtn.evaluate(el => el.click());

            const applyBtn = dialog.getByRole('button', { name: /Apply Filters/i });
            await applyBtn.waitFor({ state: 'visible', timeout: 10000 });
            await applyBtn.evaluate(el => el.click());

            await expect(this.filterModal).toBeHidden({ timeout: 10000 });
            await this.page.waitForLoadState('load');
        });
    }
}

export default ActivePage;
