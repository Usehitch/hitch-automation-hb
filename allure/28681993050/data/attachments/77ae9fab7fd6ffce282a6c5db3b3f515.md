# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/loandetail.spec.js >> Loan Detail — Property tab >> Property section core labels are present; optional sections verified when available
- Location: tests/Broker Flow/loandetail.spec.js:79:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 45000ms exceeded.
Call log:
  - waiting for getByPlaceholder(/Search by email, name, full address or loan number/i) to be visible

```

# Test source

```ts
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
  249 |             // Wait for the loan-list page to hydrate before filling — on a cold
  250 |             // staging start the search input isn't attached yet, and fill() would
  251 |             // otherwise burn the full test timeout waiting for actionability.
> 252 |             await this.searchInput.waitFor({ state: 'visible', timeout: 45000 });
      |                                    ^ TimeoutError: locator.waitFor: Timeout 45000ms exceeded.
  253 |             await this.searchInput.fill(query);
  254 |             // waitForLoadState('load') resolves instantly on a SPA because the
  255 |             // 'load' event already fired on initial page load.  waitForLoadState
  256 |             // 'networkidle' waits until there are no in-flight requests for 500 ms,
  257 |             // which covers the debounce + API round-trip on CI machines.
  258 |             // The catch() makes it non-fatal if the page has long-polling requests
  259 |             // that never reach idle within the timeout.
  260 |             // 20 s — search involves a debounce + API round-trip on CI machines.
  261 |             // The catch() makes it non-fatal if long-polling requests prevent idle.
  262 |             await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
  263 |         });
  264 |     }
  265 | 
  266 |     /**
  267 |      * Searches for a query and retries the search itself (not just waits) until
  268 |      * the View button appears or the budget is exhausted.
  269 |      *
  270 |      * A loan created moments earlier in the same test can lag behind the My
  271 |      * Loans search index/read-replica — the first search can hit a stale
  272 |      * snapshot with zero results. Re-issuing the search re-queries the backend
  273 |      * rather than just waiting for a UI element that will never appear against
  274 |      * stale data.
  275 |      *
  276 |      * @param {string} query
  277 |      * @param {{ attempts?: number, retryDelayMs?: number }} [opts]
  278 |      */
  279 |     async searchAndWaitForResult(query, { attempts = 4, retryDelayMs = 15000 } = {}) {
  280 |         await test.step(`Search for "${query}" and wait for a result (indexing lag retry)`, async () => {
  281 |             for (let attempt = 1; attempt <= attempts; attempt++) {
  282 |                 await this.search(query);
  283 |                 const found = await this.viewBtn.isVisible({ timeout: 10000 }).catch(() => false);
  284 |                 if (found) return;
  285 |                 if (attempt < attempts) {
  286 |                     console.warn(
  287 |                         `searchAndWaitForResult: no result for "${query}" on attempt ${attempt}/${attempts} — ` +
  288 |                         `loan may not be indexed yet, retrying in ${retryDelayMs}ms`
  289 |                     );
  290 |                     await this.page.waitForTimeout(retryDelayMs);
  291 |                 }
  292 |             }
  293 |             await expect(
  294 |                 this.viewBtn,
  295 |                 `View button did not appear for "${query}" after ${attempts} search attempts — ` +
  296 |                 'the newly created loan may not be indexed in My Loans search yet.'
  297 |             ).toBeVisible({ timeout: 10000 });
  298 |         });
  299 |     }
  300 | 
  301 |     /**
  302 |      * Clears the search box and waits for results to reset.
  303 |      */
  304 |     async clearSearch() {
  305 |         await test.step('Clear search', async () => {
  306 |             await this.searchInput.clear();
  307 |             await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
  308 |         });
  309 |     }
  310 | 
  311 |     // -- Filter modal ---------------------------------------------------------
  312 | 
  313 |     /**
  314 |      * Opens the Filter modal and confirms its heading is visible.
  315 |      *
  316 |      * Idempotent — if the modal is already open the click is skipped entirely.
  317 |      * Clicking the Filter button while the dialog is visible triggers MUI's
  318 |      * click-away handler (the button is behind the backdrop) and closes the modal
  319 |      * instead of opening it, which is a frequent source of CI flakiness when
  320 |      * openFilter() is called twice in the same test.
  321 |      *
  322 |      * Uses waitFor + evaluate() for the button click so no MUI re-render cycle
  323 |      * can detach the node between Playwright's element-resolve and event-dispatch.
  324 |      */
  325 |     async openFilter() {
  326 |         await test.step('Open Filter modal', async () => {
  327 |             // Skip the button click when the modal is already visible to avoid
  328 |             // triggering MUI's click-away handler on CI.
  329 |             const alreadyOpen = await this.filterModal.isVisible().catch(() => false);
  330 |             if (!alreadyOpen) {
  331 |                 await this.filterBtn.waitFor({ state: 'visible', timeout: 15000 });
  332 |                 await this.filterBtn.evaluate(el => el.click());
  333 |             }
  334 |             await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });
  335 |         });
  336 |     }
  337 | 
  338 |     /**
  339 |      * Asserts all five filter dropdowns and the Show Test Accounts checkbox are
  340 |      * rendered inside the modal.  Explicit 10 s timeouts guard against CI slowness
  341 |      * where the MUI dialog animation hasn't finished painting by the default 5 s.
  342 |      */
  343 |     async verifyFilterFields() {
  344 |         await test.step('Verify filter modal fields', async () => {
  345 |             await expect(this.companyDropdown).toBeVisible({ timeout: 10000 });
  346 |             await expect(this.fileOwnerDropdown).toBeVisible({ timeout: 10000 });
  347 |             await expect(this.loanOfficerDropdown).toBeVisible({ timeout: 10000 });
  348 |             await expect(this.statusDropdown).toBeVisible({ timeout: 10000 });
  349 |             await expect(this.stateDropdown).toBeVisible({ timeout: 10000 });
  350 |             await expect(this.showTestAccountsChk).toBeVisible({ timeout: 10000 });
  351 |             await expect(this.clearAllFiltersBtn).toBeVisible({ timeout: 10000 });
  352 |             await expect(this.applyFiltersBtn).toBeVisible({ timeout: 10000 });
```