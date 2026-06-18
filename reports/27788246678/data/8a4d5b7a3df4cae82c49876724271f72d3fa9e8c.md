# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/loandetail.spec.js >> Loan Detail — Property tab >> Property section core labels are present; optional sections verified when available
- Location: tests/Broker Flow/loandetail.spec.js:79:9

# Error details

```
Test timeout of 180000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.fill: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByPlaceholder(/Search by email, name, full address or loan number/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - img "502" [ref=e4]
      - heading "Bad Gateway" [level=1] [ref=e6]
    - main [ref=e7]:
      - generic [ref=e8]: "Request ID: a0dd2a897b93f60b-ORD"
      - generic [ref=e9]: This service is currently unavailable. Please try again in a few minutes.
      - generic [ref=e10]:
        - text: If you are the site owner, refer to
        - link "Render’s documentation" [ref=e11] [cursor=pointer]:
          - /url: https://render.com/docs/troubleshooting-deploys#502-bad-gateway
        - text: for troubleshooting.
  - contentinfo [ref=e12]:
    - generic [ref=e13]:
      - text: Powered by
      - link "Render" [ref=e14] [cursor=pointer]:
        - /url: https://render.com
        - img "Render" [ref=e15]
```

# Test source

```ts
  149 |             await expect(this.preQualTile).toBeVisible();
  150 |             await expect(this.inProcessTile).toBeVisible();
  151 |             await expect(this.closingTile).toBeVisible();
  152 |             await expect(this.fundedTile).toBeVisible();
  153 |         });
  154 |     }
  155 | 
  156 |     async verifyToolbar() {
  157 |         await test.step('Verify toolbar (search + filter)', async () => {
  158 |             await expect(this.searchInput).toBeVisible();
  159 |             await expect(this.filterBtn).toBeVisible();
  160 |         });
  161 |     }
  162 | 
  163 |     async verifyPipelineSections({ requirePendingMlo = false } = {}) {
  164 |         await test.step('Verify pipeline section headings', async () => {
  165 |             if (requirePendingMlo) {
  166 |                 await expect(this.pendingMloCertSection).toBeVisible();
  167 |             }
  168 |             await expect(this.preQualSection).toBeVisible();
  169 |             await expect(this.inProcessSection).toBeVisible();
  170 |             await expect(this.closingSection).toBeVisible();
  171 |             await expect(this.fundedSection).toBeVisible();
  172 |         });
  173 |     }
  174 | 
  175 |     async verifyPendingMloCertTable() {
  176 |         await test.step('Verify Pending MLO Certification table columns and actions', async () => {
  177 |             await expect(this.pendingMloApplicantCol).toBeVisible();
  178 |             await expect(this.pendingMloAddressCol).toBeVisible();
  179 |             await expect(this.pendingMloLoanAmountCol).toBeVisible();
  180 |             await expect(this.pendingMloStatusCol).toBeVisible({ timeout: 30000 });
  181 |             await expect(this.pendingMloLoAssistantCol).toBeVisible();
  182 |             await expect(this.pendingMloTimeInStageCol).toBeVisible();
  183 |             await expect(this.certifyBtn).toBeVisible();
  184 |             await expect(this.viewBtn).toBeVisible();
  185 |         });
  186 |     }
  187 | 
  188 |     async verifyStandardPipelineTables() {
  189 |         await test.step('Verify standard pipeline table columns (Pre-Qual / In Process / Closing / Funded)', async () => {
  190 |             // "Processor / LOA" column header is always present in these sections.
  191 |             await expect(this.processorLoaCol).toBeVisible({ timeout: 10000 });
  192 | 
  193 |             // View buttons only appear when there are loans in the standard pipeline
  194 |             // sections.  On the Adversed tab all loans may be in Pending MLO
  195 |             // Certification only, leaving Pre-Qual / In Process / Closing / Funded
  196 |             // with "No results" rows and no View buttons.  Skip the assertion
  197 |             // gracefully when no button is found rather than failing the test.
  198 |             const hasViewBtn = await this.viewBtn.isVisible({ timeout: 3000 }).catch(() => false);
  199 |             if (hasViewBtn) {
  200 |                 await expect(this.viewBtn).toBeVisible();
  201 |             }
  202 |         });
  203 |     }
  204 | 
  205 |     // -- MLO Certification ----------------------------------------------------
  206 | 
  207 |     /**
  208 |      * Clicks the first Certify button in the Pending MLO Certification section.
  209 |      *
  210 |      * Why waitFor + scrollIntoViewIfNeeded instead of click({ force: true })?
  211 |      * force: true bypasses Playwright's actionability checks but does NOT wait
  212 |      * for the element to appear in the DOM.  The Pending MLO Certification section
  213 |      * loads asynchronously after the page shell renders — if click fires before
  214 |      * the section mounts the button simply does not exist yet and the click is a
  215 |      * no-op.  Waiting for visibility ensures the button is present and painted
  216 |      * before we attempt to interact with it.
  217 |      */
  218 |     async clickCertify() {
  219 |         await test.step('Click Certify on first pending MLO loan', async () => {
  220 |             await this.certifyBtn.waitFor({ state: 'visible', timeout: 20000 });
  221 |             await this.certifyBtn.scrollIntoViewIfNeeded();
  222 |             await this.certifyBtn.click();
  223 |         });
  224 |     }
  225 | 
  226 |     /**
  227 |      * Clicks the first View button in the Pre-Qual section and waits for navigation.
  228 |      */
  229 |     async clickViewInPreQual() {
  230 |         await test.step('Click View on first Pre-Qual loan', async () => {
  231 |             // Scope to the row area below the Pre-Qual section heading
  232 |             const preQualRow = this.page.locator('section, div').filter({
  233 |                 has: this.preQualSection,
  234 |             }).first();
  235 |             const viewBtn = preQualRow.getByRole('button', { name: /^View$/i }).first();
  236 |             await viewBtn.click();
  237 |             await this.page.waitForLoadState('load');
  238 |         });
  239 |     }
  240 | 
  241 |     // -- Search ---------------------------------------------------------------
  242 | 
  243 |     /**
  244 |      * Types a query in the search box and waits for the list to settle.
  245 |      * @param {string} query
  246 |      */
  247 |     async search(query) {
  248 |         await test.step(`Search for "${query}"`, async () => {
> 249 |             await this.searchInput.fill(query);
      |                                    ^ Error: locator.fill: Test timeout of 180000ms exceeded.
  250 |             // waitForLoadState('load') resolves instantly on a SPA because the
  251 |             // 'load' event already fired on initial page load.  waitForLoadState
  252 |             // 'networkidle' waits until there are no in-flight requests for 500 ms,
  253 |             // which covers the debounce + API round-trip on CI machines.
  254 |             // The catch() makes it non-fatal if the page has long-polling requests
  255 |             // that never reach idle within the timeout.
  256 |             // 20 s — search involves a debounce + API round-trip on CI machines.
  257 |             // The catch() makes it non-fatal if long-polling requests prevent idle.
  258 |             await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
  259 |         });
  260 |     }
  261 | 
  262 |     /**
  263 |      * Clears the search box and waits for results to reset.
  264 |      */
  265 |     async clearSearch() {
  266 |         await test.step('Clear search', async () => {
  267 |             await this.searchInput.clear();
  268 |             await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
  269 |         });
  270 |     }
  271 | 
  272 |     // -- Filter modal ---------------------------------------------------------
  273 | 
  274 |     /**
  275 |      * Opens the Filter modal and confirms its heading is visible.
  276 |      *
  277 |      * Idempotent — if the modal is already open the click is skipped entirely.
  278 |      * Clicking the Filter button while the dialog is visible triggers MUI's
  279 |      * click-away handler (the button is behind the backdrop) and closes the modal
  280 |      * instead of opening it, which is a frequent source of CI flakiness when
  281 |      * openFilter() is called twice in the same test.
  282 |      *
  283 |      * Uses waitFor + evaluate() for the button click so no MUI re-render cycle
  284 |      * can detach the node between Playwright's element-resolve and event-dispatch.
  285 |      */
  286 |     async openFilter() {
  287 |         await test.step('Open Filter modal', async () => {
  288 |             // Skip the button click when the modal is already visible to avoid
  289 |             // triggering MUI's click-away handler on CI.
  290 |             const alreadyOpen = await this.filterModal.isVisible().catch(() => false);
  291 |             if (!alreadyOpen) {
  292 |                 await this.filterBtn.waitFor({ state: 'visible', timeout: 15000 });
  293 |                 await this.filterBtn.evaluate(el => el.click());
  294 |             }
  295 |             await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });
  296 |         });
  297 |     }
  298 | 
  299 |     /**
  300 |      * Asserts all five filter dropdowns and the Show Test Accounts checkbox are
  301 |      * rendered inside the modal.  Explicit 10 s timeouts guard against CI slowness
  302 |      * where the MUI dialog animation hasn't finished painting by the default 5 s.
  303 |      */
  304 |     async verifyFilterFields() {
  305 |         await test.step('Verify filter modal fields', async () => {
  306 |             await expect(this.companyDropdown).toBeVisible({ timeout: 10000 });
  307 |             await expect(this.fileOwnerDropdown).toBeVisible({ timeout: 10000 });
  308 |             await expect(this.loanOfficerDropdown).toBeVisible({ timeout: 10000 });
  309 |             await expect(this.statusDropdown).toBeVisible({ timeout: 10000 });
  310 |             await expect(this.stateDropdown).toBeVisible({ timeout: 10000 });
  311 |             await expect(this.showTestAccountsChk).toBeVisible({ timeout: 10000 });
  312 |             await expect(this.clearAllFiltersBtn).toBeVisible({ timeout: 10000 });
  313 |             await expect(this.applyFiltersBtn).toBeVisible({ timeout: 10000 });
  314 |         });
  315 |     }
  316 | 
  317 |     /**
  318 |      * Selects an option from a filter dropdown by opening it, typing to filter,
  319 |      * and clicking the matching list item.  Works for any MUI Autocomplete
  320 |      * inside the modal (Company, File Owner, Loan Officer, Status, State).
  321 |      *
  322 |      * Flow:
  323 |      *  1. Click the popup-indicator button to open the dropdown.
  324 |      *  2. Fill the active combobox input — after the popup opens MUI sets
  325 |      *     aria-expanded="true" on the associated <input role="combobox">,
  326 |      *     which uniquely identifies it.  We target this attribute directly
  327 |      *     with fill() instead of page.keyboard.type() so we never accidentally
  328 |      *     type into the page-level search bar (which holds focus by default
  329 |      *     and would reload the loan list on every keystroke).
  330 |      *  3. Wait for the filtered option to appear in the listbox.
  331 |      *  4. Click the option synchronously (evaluate) to beat MUI re-render cycles.
  332 |      *     The modal stays open; Apply Filters must be clicked separately.
  333 |      *
  334 |      * @param {import('@playwright/test').Locator} dropdown  The "Open" button locator
  335 |      * @param {string} optionText  Exact or partial label of the option to select
  336 |      */
  337 |     async selectFilterOption(dropdown, optionText) {
  338 |         // Guard — confirm the filter modal is still open before touching any
  339 |         // dropdown inside it.  Pressing Escape on a state/status listbox that has
  340 |         // already auto-closed propagates to the MUI Dialog and closes the modal.
  341 |         // When that race fires, re-open the modal so the rest of the step works.
  342 |         const modalOpen = await this.filterModal.isVisible({ timeout: 3000 }).catch(() => false);
  343 |         if (!modalOpen) {
  344 |             await this.openFilter();
  345 |         }
  346 | 
  347 |         // Step 1 — open the MUI Autocomplete popup.
  348 |         //
  349 |         // `dropdown` is a container div (MuiFormControl-root) — use getByRole to
```