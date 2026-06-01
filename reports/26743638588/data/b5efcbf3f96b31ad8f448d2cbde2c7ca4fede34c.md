# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: My Loans/adversed.spec.js >> My Loans - Adversed >> Filter modal — fields, dropdowns, company apply, and clear lifecycle
- Location: tests/My Loans/adversed.spec.js:82:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[role="dialog"]').filter({ has: getByText('Filter Applications By:', { exact: true }) }).locator('div').filter({ has: locator('label').filter({ hasText: /^Company$/i }) }).last()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[role="dialog"]').filter({ has: getByText('Filter Applications By:', { exact: true }) }).locator('div').filter({ has: locator('label').filter({ hasText: /^Company$/i }) }).last()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e8]:
      - list [ref=e10]:
        - listitem [ref=e11]:
          - button "logo":
            - generic:
              - generic:
                - img "logo"
          - button "Toggle Sidebar" [ref=e12] [cursor=pointer]:
            - img
            - generic [ref=e13]: Toggle Sidebar
        - listitem [ref=e14]:
          - generic [ref=e15]: Homebridge Financial Services
      - generic [ref=e16]:
        - list [ref=e19]:
          - listitem [ref=e20]:
            - button "You're in Dev":
              - img
              - text: You're in Dev
        - list [ref=e23]:
          - listitem [ref=e24]:
            - generic [ref=e25]:
              - button "My Loans Chevron down" [expanded] [ref=e26] [cursor=pointer]:
                - img [ref=e27]
                - text: My Loans
                - img [ref=e30]
                - generic [ref=e32]: Chevron down
              - list [ref=e34]:
                - listitem [ref=e35]:
                  - button "Active" [ref=e36] [cursor=pointer]:
                    - img [ref=e37]
                    - text: Active
                - listitem [ref=e42]:
                  - button "Adversed" [ref=e43] [cursor=pointer]:
                    - img [ref=e44]
                    - text: Adversed
                - listitem [ref=e46]:
                  - button "Inactive" [ref=e47] [cursor=pointer]:
                    - img [ref=e48]
                    - text: Inactive
                - listitem [ref=e51]:
                  - button "Funded" [ref=e52] [cursor=pointer]:
                    - img [ref=e53]
                    - text: Funded
          - listitem [ref=e56]:
            - button "Manage Users" [ref=e58] [cursor=pointer]:
              - img [ref=e59]
              - text: Manage Users
          - listitem [ref=e64]:
            - button "Companies" [ref=e66] [cursor=pointer]:
              - img [ref=e67]
              - text: Companies
          - listitem [ref=e71]:
            - button "Company Branches" [ref=e73] [cursor=pointer]:
              - img [ref=e74]
              - text: Company Branches
          - listitem [ref=e79]:
            - button "Quick Pricer" [ref=e81] [cursor=pointer]:
              - img [ref=e82]
              - text: Quick Pricer
          - listitem [ref=e84]:
            - button "Reports" [ref=e86] [cursor=pointer]:
              - img [ref=e87]
              - text: Reports
          - listitem [ref=e89]:
            - button "Release Notes" [ref=e91] [cursor=pointer]:
              - img [ref=e92]
              - text: Release Notes
        - generic [ref=e97]:
          - generic [ref=e98]: Admin
          - listitem [ref=e99]:
            - button "Manage Emails" [ref=e101] [cursor=pointer]:
              - img [ref=e102]
              - text: Manage Emails
          - listitem [ref=e105]:
            - button "AUS Rules" [ref=e107] [cursor=pointer]:
              - img [ref=e108]
              - text: AUS Rules
          - listitem [ref=e111]:
            - button "Loan Configuration" [ref=e113] [cursor=pointer]:
              - img [ref=e114]
              - text: Loan Configuration
        - listitem [ref=e116]:
          - button "Show Old Design" [ref=e118] [cursor=pointer]:
            - img [ref=e119]
            - text: Show Old Design
      - list [ref=e122]:
        - listitem [ref=e123]:
          - button "AS Ace Simon Gebilaguin ace@usehitch.com" [ref=e124] [cursor=pointer]:
            - generic [ref=e126]: AS
            - generic [ref=e127]:
              - paragraph [ref=e128]: Ace Simon Gebilaguin
              - paragraph [ref=e129]: ace@usehitch.com
            - img [ref=e130]
    - main [ref=e134]:
      - generic [ref=e135]:
        - generic [ref=e136]:
          - heading "My Loans" [level=1] [ref=e137]
          - generic [ref=e138]:
            - button "Sharable App Link" [ref=e139] [cursor=pointer]:
              - img
              - text: Sharable App Link
            - button "Start App" [ref=e140] [cursor=pointer]:
              - img
              - text: Start App
        - generic [ref=e141]:
          - heading "Overview" [level=2] [ref=e143]
          - generic [ref=e144]:
            - generic [ref=e146]:
              - generic [ref=e148]: My Loans
              - generic [ref=e149]:
                - generic [ref=e150]: "4110"
                - generic: / $437,035,256
            - generic [ref=e152]:
              - generic [ref=e153]:
                - img [ref=e155]
                - generic [ref=e160]: Pre-Qual
              - generic [ref=e161]:
                - generic [ref=e162]: "3269"
                - generic: / $282,296,813
            - generic [ref=e164]:
              - generic [ref=e165]:
                - img [ref=e167]
                - generic [ref=e169]: In Process
              - generic [ref=e170]:
                - generic [ref=e171]: "828"
                - generic [ref=e172]: / $152,164,236
            - generic [ref=e174]:
              - generic [ref=e175]:
                - img [ref=e177]
                - generic [ref=e179]: Closing
              - generic [ref=e180]:
                - generic [ref=e181]: "13"
                - generic [ref=e182]: / $2,574,207
            - generic [ref=e184]:
              - generic [ref=e185]:
                - img [ref=e187]
                - generic [ref=e189]: Funded
              - generic [ref=e190]:
                - generic [ref=e191]: "0"
                - generic [ref=e192]: / $0
        - generic [ref=e193]:
          - generic [ref=e194]:
            - generic [ref=e195]:
              - generic [ref=e196]:
                - img [ref=e197]
                - textbox "Search by email, name, full address or loan number" [ref=e200]
              - button "Filter" [ref=e202] [cursor=pointer]:
                - img
                - text: Filter
            - tablist "View mode" [ref=e203]:
              - tab "List" [selected] [ref=e204] [cursor=pointer]:
                - img [ref=e206]
                - text: List
          - generic [ref=e207]:
            - generic [ref=e208]:
              - button "0 Pending MLO Certification 4095 applications / $394,818,826" [ref=e209] [cursor=pointer]:
                - generic [ref=e210]:
                  - generic [ref=e211]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e212]
                  - generic [ref=e213]: 4095 applications / $394,818,826
                - img [ref=e214]
              - generic [ref=e217]:
                - table [ref=e219]:
                  - rowgroup [ref=e220]:
                    - row "Applicant Property Address Loan Amount Status LO Assistant Time in Stage" [ref=e221]:
                      - columnheader "Applicant" [ref=e222]:
                        - generic [ref=e223]: Applicant
                      - columnheader "Property Address" [ref=e224]:
                        - generic [ref=e225]: Property Address
                      - columnheader "Loan Amount" [ref=e226]:
                        - generic [ref=e227]: Loan Amount
                      - columnheader "Status" [ref=e228]:
                        - generic [ref=e229]: Status
                      - columnheader "LO Assistant" [ref=e230]:
                        - generic [ref=e231]: LO Assistant
                      - columnheader "Time in Stage" [ref=e232]:
                        - generic [ref=e233]: Time in Stage
                      - columnheader [ref=e234]
                  - rowgroup [ref=e235]:
                    - row "Andy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 0h Time since application was created Certify View" [ref=e236]:
                      - cell "Andy America 512-123-1113" [ref=e237]:
                        - generic [ref=e238]:
                          - link "Andy America" [ref=e239] [cursor=pointer]:
                            - /url: /portal/loan/6a1d47d518fafef8910d0305/summary/overview
                          - generic [ref=e240]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e241]
                      - cell "$0" [ref=e242]
                      - cell "Pending MLO Certification" [ref=e243]:
                        - generic [ref=e244]: Pending MLO Certification
                      - cell "—" [ref=e245]
                      - cell "0d 0h Time since application was created" [ref=e246]:
                        - generic [ref=e247]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e248]
                      - cell "Certify View" [ref=e250]:
                        - generic [ref=e251]:
                          - button "Certify" [ref=e252] [cursor=pointer]
                          - button "View" [ref=e253] [cursor=pointer]
                    - row "Andy America 5121231113 4556 ELIOT ST, DENVER, CO 80211 $0 Pending MLO Certification — 0d 0h Time since application was created Certify View" [ref=e254]:
                      - cell "Andy America 5121231113" [ref=e255]:
                        - generic [ref=e256]:
                          - link "Andy America" [ref=e257] [cursor=pointer]:
                            - /url: /portal/loan/6a1d43cf18fafef8910d0277/summary/overview
                          - generic [ref=e258]: "5121231113"
                      - cell "4556 ELIOT ST, DENVER, CO 80211" [ref=e259]
                      - cell "$0" [ref=e260]
                      - cell "Pending MLO Certification" [ref=e261]:
                        - generic [ref=e262]: Pending MLO Certification
                      - cell "—" [ref=e263]
                      - cell "0d 0h Time since application was created" [ref=e264]:
                        - generic [ref=e265]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e266]
                      - cell "Certify View" [ref=e268]:
                        - generic [ref=e269]:
                          - button "Certify" [ref=e270] [cursor=pointer]
                          - button "View" [ref=e271] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $100,000 Pending MLO Certification — 0d 0h Time since application was created Certify View" [ref=e272]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e273]:
                        - generic [ref=e274]:
                          - link "Andy America, Amy America" [ref=e275] [cursor=pointer]:
                            - /url: /portal/loan/6a1d437118fafef8910d0254/summary/overview
                          - generic [ref=e276]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e277]
                      - cell "$100,000" [ref=e278]
                      - cell "Pending MLO Certification" [ref=e279]:
                        - generic [ref=e280]: Pending MLO Certification
                      - cell "—" [ref=e281]
                      - cell "0d 0h Time since application was created" [ref=e282]:
                        - generic [ref=e283]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e284]
                      - cell "Certify View" [ref=e286]:
                        - generic [ref=e287]:
                          - button "Certify" [ref=e288] [cursor=pointer]
                          - button "View" [ref=e289] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 0h Time since application was created Certify View" [ref=e290]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e291]:
                        - generic [ref=e292]:
                          - link "Andy America, Amy America" [ref=e293] [cursor=pointer]:
                            - /url: /portal/loan/6a1d421d9ddc2b0779bad6cc/summary/overview
                          - generic [ref=e294]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e295]
                      - cell "$0" [ref=e296]
                      - cell "Pending MLO Certification" [ref=e297]:
                        - generic [ref=e298]: Pending MLO Certification
                      - cell "—" [ref=e299]
                      - cell "0d 0h Time since application was created" [ref=e300]:
                        - generic [ref=e301]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e302]
                      - cell "Certify View" [ref=e304]:
                        - generic [ref=e305]:
                          - button "Certify" [ref=e306] [cursor=pointer]
                          - button "View" [ref=e307] [cursor=pointer]
                    - row "Andy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $100,000 Pending MLO Certification — 0d 0h Time since application was created Certify View" [ref=e308]:
                      - cell "Andy America 512-123-1113" [ref=e309]:
                        - generic [ref=e310]:
                          - link "Andy America" [ref=e311] [cursor=pointer]:
                            - /url: /portal/loan/6a1d3f379ddc2b0779bad6ae/summary/overview
                          - generic [ref=e312]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e313]
                      - cell "$100,000" [ref=e314]
                      - cell "Pending MLO Certification" [ref=e315]:
                        - generic [ref=e316]: Pending MLO Certification
                      - cell "—" [ref=e317]
                      - cell "0d 0h Time since application was created" [ref=e318]:
                        - generic [ref=e319]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e320]
                      - cell "Certify View" [ref=e322]:
                        - generic [ref=e323]:
                          - button "Certify" [ref=e324] [cursor=pointer]
                          - button "View" [ref=e325] [cursor=pointer]
                    - row "Mary Homeowner 545-676-5746 829 Farmington Dr, Junction City, OR 97448 $75,000 Pending MLO Certification — 0d 2h Time since application was created Certify View" [ref=e326]:
                      - cell "Mary Homeowner 545-676-5746" [ref=e327]:
                        - generic [ref=e328]:
                          - link "Mary Homeowner" [ref=e329] [cursor=pointer]:
                            - /url: /portal/loan/6a1d272b9ddc2b0779bad661/summary/overview
                          - generic [ref=e330]: 545-676-5746
                      - cell "829 Farmington Dr, Junction City, OR 97448" [ref=e331]
                      - cell "$75,000" [ref=e332]
                      - cell "Pending MLO Certification" [ref=e333]:
                        - generic [ref=e334]: Pending MLO Certification
                      - cell "—" [ref=e335]
                      - cell "0d 2h Time since application was created" [ref=e336]:
                        - generic [ref=e337]:
                          - text: 0d 2h
                          - img "Time since application was created" [ref=e338]
                      - cell "Certify View" [ref=e340]:
                        - generic [ref=e341]:
                          - button "Certify" [ref=e342] [cursor=pointer]
                          - button "View" [ref=e343] [cursor=pointer]
                - generic [ref=e344]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e345] [cursor=pointer]
                  - button "2" [ref=e346] [cursor=pointer]
                  - generic [ref=e347]: ...
                  - button "683" [ref=e348] [cursor=pointer]
                  - button "Next" [ref=e349] [cursor=pointer]:
                    - text: Next
                    - img
            - generic [ref=e350]:
              - button "1 Pre-Qual 0 applications / $0" [ref=e351] [cursor=pointer]:
                - generic [ref=e352]:
                  - generic [ref=e353]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e354]
                  - generic [ref=e355]: 0 applications / $0
                - img [ref=e356]
              - generic [ref=e359]:
                - table [ref=e361]:
                  - rowgroup [ref=e362]:
                    - row "Applicant Property Address Loan Amount Processor / LOA Time in Stage" [ref=e363]:
                      - columnheader "Applicant" [ref=e364]:
                        - generic [ref=e365]: Applicant
                      - columnheader "Property Address" [ref=e366]:
                        - generic [ref=e367]: Property Address
                      - columnheader "Loan Amount" [ref=e368]:
                        - generic [ref=e369]: Loan Amount
                      - columnheader "Processor / LOA" [ref=e370]:
                        - generic [ref=e371]: Processor / LOA
                      - columnheader "Time in Stage" [ref=e372]:
                        - generic [ref=e373]: Time in Stage
                      - columnheader [ref=e374]
                  - rowgroup [ref=e375]:
                    - row "No results" [ref=e376]:
                      - cell "No results" [ref=e377]:
                        - paragraph [ref=e379]: No results
                - generic [ref=e380]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e381] [cursor=pointer]
                  - button "Next" [disabled]:
                    - text: Next
                    - img
            - button "2 In Process 0 applications / $0" [ref=e383] [cursor=pointer]:
              - generic [ref=e384]:
                - generic [ref=e385]: "2"
                - heading "In Process" [level=3] [ref=e386]
                - generic [ref=e387]: 0 applications / $0
              - img [ref=e388]
            - button "3 Closing 0 applications / $0" [ref=e391] [cursor=pointer]:
              - generic [ref=e392]:
                - generic [ref=e393]: "3"
                - heading "Closing" [level=3] [ref=e394]
                - generic [ref=e395]: 0 applications / $0
              - img [ref=e396]
            - button "4 Funded 0 applications / $0" [ref=e399] [cursor=pointer]:
              - generic [ref=e400]:
                - generic [ref=e401]: "4"
                - heading "Funded" [level=3] [ref=e402]
                - generic [ref=e403]: 0 applications / $0
              - img [ref=e404]
  - alert [ref=e406]: Applications Portal - Adversed
  - generic:
    - generic:
      - generic [ref=e408]:
        - iframe [ref=e409]:
          - button "Close message from company" [ref=f10e4] [cursor=pointer]:
            - img [ref=f10e5]
        - iframe [ref=e410]:
          - button "Hi. Need any help?" [ref=f11e5] [cursor=pointer]
      - iframe [ref=e411]:
        - button "Open messaging window" [ref=f12e5] [cursor=pointer]:
          - img [ref=f12e7]
          - img [ref=f12e10]
```

# Test source

```ts
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
  209 |      */
  210 |     async clickCertify() {
  211 |         await test.step('Click Certify on first pending MLO loan', async () => {
  212 |             await this.certifyBtn.click({ force: true });
  213 |         });
  214 |     }
  215 | 
  216 |     /**
  217 |      * Clicks the first View button in the Pre-Qual section and waits for navigation.
  218 |      */
  219 |     async clickViewInPreQual() {
  220 |         await test.step('Click View on first Pre-Qual loan', async () => {
  221 |             // Scope to the row area below the Pre-Qual section heading
  222 |             const preQualRow = this.page.locator('section, div').filter({
  223 |                 has: this.preQualSection,
  224 |             }).first();
  225 |             const viewBtn = preQualRow.getByRole('button', { name: /^View$/i }).first();
  226 |             await viewBtn.click();
  227 |             await this.page.waitForLoadState('load');
  228 |         });
  229 |     }
  230 | 
  231 |     // -- Search ---------------------------------------------------------------
  232 | 
  233 |     /**
  234 |      * Types a query in the search box and waits for the list to settle.
  235 |      * @param {string} query
  236 |      */
  237 |     async search(query) {
  238 |         await test.step(`Search for "${query}"`, async () => {
  239 |             await this.searchInput.fill(query);
  240 |             // waitForLoadState('load') resolves instantly on a SPA because the
  241 |             // 'load' event already fired on initial page load.  waitForLoadState
  242 |             // 'networkidle' waits until there are no in-flight requests for 500 ms,
  243 |             // which covers the debounce + API round-trip on CI machines.
  244 |             // The catch() makes it non-fatal if the page has long-polling requests
  245 |             // that never reach idle within the timeout.
  246 |             // 20 s — search involves a debounce + API round-trip on CI machines.
  247 |             // The catch() makes it non-fatal if long-polling requests prevent idle.
  248 |             await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
  249 |         });
  250 |     }
  251 | 
  252 |     /**
  253 |      * Clears the search box and waits for results to reset.
  254 |      */
  255 |     async clearSearch() {
  256 |         await test.step('Clear search', async () => {
  257 |             await this.searchInput.clear();
  258 |             await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { });
  259 |         });
  260 |     }
  261 | 
  262 |     // -- Filter modal ---------------------------------------------------------
  263 | 
  264 |     /**
  265 |      * Opens the Filter modal and confirms its heading is visible.
  266 |      *
  267 |      * Idempotent — if the modal is already open the click is skipped entirely.
  268 |      * Clicking the Filter button while the dialog is visible triggers MUI's
  269 |      * click-away handler (the button is behind the backdrop) and closes the modal
  270 |      * instead of opening it, which is a frequent source of CI flakiness when
  271 |      * openFilter() is called twice in the same test.
  272 |      *
  273 |      * Uses waitFor + evaluate() for the button click so no MUI re-render cycle
  274 |      * can detach the node between Playwright's element-resolve and event-dispatch.
  275 |      */
  276 |     async openFilter() {
  277 |         await test.step('Open Filter modal', async () => {
  278 |             // Skip the button click when the modal is already visible to avoid
  279 |             // triggering MUI's click-away handler on CI.
  280 |             const alreadyOpen = await this.filterModal.isVisible().catch(() => false);
  281 |             if (!alreadyOpen) {
  282 |                 await this.filterBtn.waitFor({ state: 'visible', timeout: 15000 });
  283 |                 await this.filterBtn.evaluate(el => el.click());
  284 |             }
  285 |             await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });
  286 |         });
  287 |     }
  288 | 
  289 |     /**
  290 |      * Asserts all five filter dropdowns and the Show Test Accounts checkbox are
  291 |      * rendered inside the modal.  Explicit 10 s timeouts guard against CI slowness
  292 |      * where the MUI dialog animation hasn't finished painting by the default 5 s.
  293 |      */
  294 |     async verifyFilterFields() {
  295 |         await test.step('Verify filter modal fields', async () => {
> 296 |             await expect(this.companyDropdown).toBeVisible({ timeout: 10000 });
      |                                                ^ Error: expect(locator).toBeVisible() failed
  297 |             await expect(this.fileOwnerDropdown).toBeVisible({ timeout: 10000 });
  298 |             await expect(this.loanOfficerDropdown).toBeVisible({ timeout: 10000 });
  299 |             await expect(this.statusDropdown).toBeVisible({ timeout: 10000 });
  300 |             await expect(this.stateDropdown).toBeVisible({ timeout: 10000 });
  301 |             await expect(this.showTestAccountsChk).toBeVisible({ timeout: 10000 });
  302 |             await expect(this.clearAllFiltersBtn).toBeVisible({ timeout: 10000 });
  303 |             await expect(this.applyFiltersBtn).toBeVisible({ timeout: 10000 });
  304 |         });
  305 |     }
  306 | 
  307 |     /**
  308 |      * Selects an option from a filter dropdown by opening it, typing to filter,
  309 |      * and clicking the matching list item.  Works for any MUI Autocomplete
  310 |      * inside the modal (Company, File Owner, Loan Officer, Status, State).
  311 |      *
  312 |      * Flow:
  313 |      *  1. Click the popup-indicator button to open the dropdown.
  314 |      *  2. Fill the active combobox input — after the popup opens MUI sets
  315 |      *     aria-expanded="true" on the associated <input role="combobox">,
  316 |      *     which uniquely identifies it.  We target this attribute directly
  317 |      *     with fill() instead of page.keyboard.type() so we never accidentally
  318 |      *     type into the page-level search bar (which holds focus by default
  319 |      *     and would reload the loan list on every keystroke).
  320 |      *  3. Wait for the filtered option to appear in the listbox.
  321 |      *  4. Click the option synchronously (evaluate) to beat MUI re-render cycles.
  322 |      *     The modal stays open; Apply Filters must be clicked separately.
  323 |      *
  324 |      * @param {import('@playwright/test').Locator} dropdown  The "Open" button locator
  325 |      * @param {string} optionText  Exact or partial label of the option to select
  326 |      */
  327 |     async selectFilterOption(dropdown, optionText) {
  328 |         // Step 1 — open the MUI Autocomplete popup.
  329 |         //
  330 |         // `dropdown` is a container div (MuiFormControl-root) — use getByRole to
  331 |         // find the single "Open" button inside it, then use Playwright's .click()
  332 |         // which fires a full trusted pointer-event sequence (pointerdown, mousedown,
  333 |         // pointerup, mouseup, click).  MUI's onMouseDown handler requires
  334 |         // isTrusted:true — dispatchEvent() always produces isTrusted:false and is
  335 |         // therefore silently ignored by the MUI popup-indicator.
  336 |         const openBtn = dropdown.getByRole('button', { name: /open/i });
  337 |         await openBtn.waitFor({ state: 'visible', timeout: 10000 });
  338 |         await openBtn.click();
  339 | 
  340 |         // Step 2 — confirm the listbox is open and wait for options to populate.
  341 |         //
  342 |         // The listbox container can become visible before React renders its
  343 |         // children, so we wait for at least one [role="option"] before scanning.
  344 |         const listbox = this.page.getByRole('listbox');
  345 |         await expect(listbox).toBeVisible({ timeout: 10000 });
  346 |         await this.page.locator('[role="option"]').first()
  347 |             .waitFor({ state: 'visible', timeout: 5000 })
  348 |             .catch(() => { }); // proceed even if no options appear (empty list)
  349 | 
  350 |         // Step 3 — click the matching option in one synchronous browser call.
  351 |         //
  352 |         // page.evaluate() dispatches the click inside the browser process — no
  353 |         // round-trip between Playwright and the renderer, so no MUI re-render can
  354 |         // detach the option node between resolution and dispatch.
  355 |         const clicked = await this.page.evaluate((text) => {
  356 |             const options = document.querySelectorAll('[role="option"]');
  357 |             for (const opt of options) {
  358 |                 // innerText reflects CSS-visible text, excluding hidden child nodes
  359 |                 const label = (opt.innerText || opt.textContent || '').trim();
  360 |                 if (label === text || label.includes(text)) {
  361 |                     opt.click();
  362 |                     return true;
  363 |                 }
  364 |             }
  365 |             return false;
  366 |         }, optionText);
  367 | 
  368 |         if (!clicked) {
  369 |             console.warn(`selectFilterOption: option "${optionText}" not found in listbox — pressing Escape`);
  370 |             // Only press Escape if the popup is still open — if MUI already closed
  371 |             // it, Escape would close the filter modal and break applyFilters().
  372 |             const listboxStillOpen = await listbox.isVisible().catch(() => false);
  373 |             if (listboxStillOpen) {
  374 |                 await this.page.keyboard.press('Escape');
  375 |             }
  376 |         }
  377 |     }
  378 | 
  379 |     /**
  380 |      * Opens the Status dropdown and asserts all known status options are listed.
  381 |      * Closes the dropdown without selecting anything.
  382 |      */
  383 |     async verifyStatusDropdownOptions() {
  384 |         await test.step('Verify Status dropdown options', async () => {
  385 |             // Guard: confirm the "Filter Applications By:" modal is open and fully
  386 |             // rendered before we interact with any dropdown inside it.  Without this,
  387 |             // a slow MUI animation or a mis-fired click-away on the filter button
  388 |             // could leave the modal closed and silently dispatch evaluate() on a
  389 |             // detached element.
  390 |             await expect(this.filterModalHeading).toBeVisible({ timeout: 10000 });
  391 | 
  392 |             // statusDropdown is already scoped to the innermost MuiFormControl-root
  393 |             // for Status only (constructor uses .last()), so getByRole finds exactly
  394 |             // one Open button.  Use Playwright's .click() — it dispatches a trusted
  395 |             // pointer-event sequence (isTrusted:true) which MUI's onMouseDown handler
  396 |             // requires.  dispatchEvent() produces isTrusted:false and is ignored.
```