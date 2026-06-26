# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/My Loans/active.spec.js >> My Loans - Active >> Verify the content for my loans page
- Location: tests/Broker Flow/My Loans/active.spec.js:10:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /Certify/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /Certify/i }).first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
            - button "My Loans Chevron down" [ref=e26] [cursor=pointer]:
              - img [ref=e27]
              - text: My Loans
              - img [ref=e30]
              - generic [ref=e32]: Chevron down
          - listitem [ref=e33]:
            - button "Manage Users" [ref=e35] [cursor=pointer]:
              - img [ref=e36]
              - text: Manage Users
          - listitem [ref=e41]:
            - button "Companies" [ref=e43] [cursor=pointer]:
              - img [ref=e44]
              - text: Companies
          - listitem [ref=e48]:
            - button "Company Branches" [ref=e50] [cursor=pointer]:
              - img [ref=e51]
              - text: Company Branches
          - listitem [ref=e56]:
            - button "Quick Pricer" [ref=e58] [cursor=pointer]:
              - img [ref=e59]
              - text: Quick Pricer
          - listitem [ref=e61]:
            - button "Release Notes" [ref=e63] [cursor=pointer]:
              - img [ref=e64]
              - text: Release Notes
        - generic [ref=e69]:
          - generic [ref=e70]: Admin
          - listitem [ref=e71]:
            - button "Manage Emails" [ref=e73] [cursor=pointer]:
              - img [ref=e74]
              - text: Manage Emails
          - listitem [ref=e77]:
            - button "AUS Rules" [ref=e79] [cursor=pointer]:
              - img [ref=e80]
              - text: AUS Rules
          - listitem [ref=e83]:
            - button "Loan Configuration" [ref=e85] [cursor=pointer]:
              - img [ref=e86]
              - text: Loan Configuration
        - listitem [ref=e88]:
          - button "Show Old Design" [ref=e90] [cursor=pointer]:
            - img [ref=e91]
            - text: Show Old Design
      - list [ref=e94]:
        - listitem [ref=e95]:
          - button "AS Ace Simon Gebilaguin ace@usehitch.com" [ref=e96] [cursor=pointer]:
            - generic [ref=e98]: AS
            - generic [ref=e99]:
              - paragraph [ref=e100]: Ace Simon Gebilaguin
              - paragraph [ref=e101]: ace@usehitch.com
            - img [ref=e102]
    - main [ref=e106]:
      - generic [ref=e107]:
        - generic [ref=e108]:
          - heading "My Loans" [level=1] [ref=e109]
          - generic [ref=e110]:
            - button "Sharable App Link" [ref=e111] [cursor=pointer]:
              - img
              - text: Sharable App Link
            - button "Start App" [ref=e112] [cursor=pointer]:
              - img
              - text: Start App
        - generic [ref=e113]:
          - heading "Overview" [level=2] [ref=e115]
          - generic [ref=e116]:
            - generic [ref=e118]:
              - generic [ref=e120]: My Loans
              - generic [ref=e121]:
                - generic [ref=e122]: "0"
                - generic [ref=e123]: / $0
            - generic [ref=e125]:
              - generic [ref=e126]:
                - img [ref=e128]
                - generic [ref=e133]: Pre-Qual
              - generic [ref=e134]:
                - generic [ref=e135]: "0"
                - generic [ref=e136]: / $0
            - generic [ref=e138]:
              - generic [ref=e139]:
                - img [ref=e141]
                - generic [ref=e143]: In Process
              - generic [ref=e144]:
                - generic [ref=e145]: "0"
                - generic [ref=e146]: / $0
            - generic [ref=e148]:
              - generic [ref=e149]:
                - img [ref=e151]
                - generic [ref=e153]: Closing
              - generic [ref=e154]:
                - generic [ref=e155]: "0"
                - generic [ref=e156]: / $0
            - generic [ref=e158]:
              - generic [ref=e159]:
                - img [ref=e161]
                - generic [ref=e163]: Funded
              - generic [ref=e164]:
                - generic [ref=e165]: "0"
                - generic [ref=e166]: / $0
        - generic [ref=e167]:
          - generic [ref=e168]:
            - generic [ref=e169]:
              - generic [ref=e170]:
                - img [ref=e171]
                - textbox "Search by email, name, full address or loan number" [ref=e174]
              - button "Filter" [ref=e176] [cursor=pointer]:
                - img
                - text: Filter
            - tablist "View mode" [ref=e177]:
              - tab "List" [selected] [ref=e178] [cursor=pointer]:
                - img [ref=e180]
                - text: List
          - generic [ref=e181]:
            - generic [ref=e182]:
              - button "0 Pending MLO Certification 0 applications / $0" [ref=e183] [cursor=pointer]:
                - generic [ref=e184]:
                  - generic [ref=e185]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e186]
                  - generic [ref=e187]: 0 applications / $0
                - img [ref=e188]
              - generic [ref=e191]:
                - table [ref=e193]:
                  - rowgroup [ref=e194]:
                    - row "Applicant Property Address Loan Amount Status LO Assistant Time in Stage" [ref=e195]:
                      - columnheader "Applicant" [ref=e196]:
                        - generic [ref=e197]: Applicant
                      - columnheader "Property Address" [ref=e198]:
                        - generic [ref=e199]: Property Address
                      - columnheader "Loan Amount" [ref=e200]:
                        - generic [ref=e201]: Loan Amount
                      - columnheader "Status" [ref=e202]:
                        - generic [ref=e203]: Status
                      - columnheader "LO Assistant" [ref=e204]:
                        - generic [ref=e205]: LO Assistant
                      - columnheader "Time in Stage" [ref=e206]:
                        - generic [ref=e207]: Time in Stage
                      - columnheader [ref=e208]
                  - rowgroup [ref=e209]:
                    - row "No results" [ref=e210]:
                      - cell "No results" [ref=e211]:
                        - paragraph [ref=e213]: No results
                - generic [ref=e214]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "Next" [disabled]:
                    - text: Next
                    - img
            - generic [ref=e215]:
              - button "1 Pre-Qual 0 applications / $0" [ref=e216] [cursor=pointer]:
                - generic [ref=e217]:
                  - generic [ref=e218]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e219]
                  - generic [ref=e220]: 0 applications / $0
                - img [ref=e221]
              - generic [ref=e224]:
                - table [ref=e226]:
                  - rowgroup [ref=e227]:
                    - row "Applicant Property Address Loan Amount Processor / LOA Time in Stage" [ref=e228]:
                      - columnheader "Applicant" [ref=e229]:
                        - generic [ref=e230]: Applicant
                      - columnheader "Property Address" [ref=e231]:
                        - generic [ref=e232]: Property Address
                      - columnheader "Loan Amount" [ref=e233]:
                        - generic [ref=e234]: Loan Amount
                      - columnheader "Processor / LOA" [ref=e235]:
                        - generic [ref=e236]: Processor / LOA
                      - columnheader "Time in Stage" [ref=e237]:
                        - generic [ref=e238]: Time in Stage
                      - columnheader [ref=e239]
                  - rowgroup [ref=e240]:
                    - row "No results" [ref=e241]:
                      - cell "No results" [ref=e242]:
                        - paragraph [ref=e244]: No results
                - generic [ref=e245]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e246] [cursor=pointer]
                  - button "Next" [disabled]:
                    - text: Next
                    - img
            - button "2 In Process 0 applications / $0" [ref=e248] [cursor=pointer]:
              - generic [ref=e249]:
                - generic [ref=e250]: "2"
                - heading "In Process" [level=3] [ref=e251]
                - generic [ref=e252]: 0 applications / $0
              - img [ref=e253]
            - button "3 Closing 0 applications / $0" [ref=e256] [cursor=pointer]:
              - generic [ref=e257]:
                - generic [ref=e258]: "3"
                - heading "Closing" [level=3] [ref=e259]
                - generic [ref=e260]: 0 applications / $0
              - img [ref=e261]
            - button "4 Funded 0 applications / $0" [ref=e264] [cursor=pointer]:
              - generic [ref=e265]:
                - generic [ref=e266]: "4"
                - heading "Funded" [level=3] [ref=e267]
                - generic [ref=e268]: 0 applications / $0
              - img [ref=e269]
  - alert [ref=e271]
  - generic:
    - generic:
      - generic [ref=e273]:
        - iframe [ref=e274]:
          - button "Close message from company" [ref=f7e4] [cursor=pointer]:
            - img [ref=f7e5]
        - iframe [ref=e275]:
          - button "Hi. Need any help?" [ref=f8e5] [cursor=pointer]
      - iframe [ref=e276]:
        - button "Open messaging window" [ref=f9e5] [cursor=pointer]:
          - img [ref=f9e7]
          - img [ref=f9e10]
```

# Test source

```ts
  83  |         // inside the endAdornment of each field.  This button has a proper,
  84  |         // non-degenerate bounding box that is always inside the dialog content
  85  |         // area, so clicking it keeps the dialog open and reliably opens the
  86  |         // option list.
  87  |         //
  88  |         // Each dropdown is resolved by finding the FormControl <div> that also
  89  |         // contains the matching label — unique per field, order-independent.
  90  |         // Each dropdown is pinned to the INNERMOST ancestor div (.last()) that
  91  |         // contains that field's label — this is the MuiFormControl-root wrapping
  92  |         // only that specific Autocomplete.  Using .first() or .nth(n) selects
  93  |         // progressively-outer ancestors (e.g. MuiDialogContent-root) that span
  94  |         // the whole dialog and contain all five Open buttons, which causes
  95  |         // evaluate() to throw a strict-mode violation.
  96  |         this.companyDropdown = this.filterModal
  97  |             .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^Company$/i }) }).last();
  98  |         this.fileOwnerDropdown = this.filterModal
  99  |             .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /File Owner/i }) }).last();
  100 |         this.loanOfficerDropdown = this.filterModal
  101 |             .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /Loan Officer/i }) }).last();
  102 |         this.statusDropdown = this.filterModal
  103 |             .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^Status$/i }) }).last();
  104 |         this.stateDropdown = this.filterModal
  105 |             .locator('div').filter({ has: this.page.locator('label').filter({ hasText: /^State$/i }) }).last();
  106 | 
  107 |         // Checkbox and action buttons inside the modal
  108 |         this.showTestAccountsChk = this.filterModal.getByRole('checkbox', { name: /Show Test Accounts/i });
  109 |         this.clearAllFiltersBtn = this.filterModal.getByRole('button', { name: /Clear All Filters/i });
  110 |         this.applyFiltersBtn = this.filterModal.getByRole('button', { name: /Apply Filters/i });
  111 |     }
  112 | 
  113 |     async clickMyLoansNav() {
  114 |         await test.step('Click My Loans in sidebar navigation', async () => {
  115 |             await this.myLoansNavItem.click();
  116 |             await this.page.waitForLoadState('load');
  117 |         });
  118 |     }
  119 | 
  120 |     async navigateToAdversed() {
  121 |         await test.step('Navigate to Adversed tab via sidebar', async () => {
  122 |             await this.clickMyLoansNav();
  123 |             await this.adversedNavItem.click();
  124 |             await this.page.waitForLoadState('load');
  125 |             // waitForLoadState('load') resolves immediately for SPA tab switches.
  126 |             // Wait for the filter toolbar button — it appears as soon as the tab's
  127 |             // UI has mounted and is not data-dependent (unlike pendingMloCertSection
  128 |             // which only renders when there are pending MLO loans and can take > 60 s
  129 |             // on loaded CI).  Tests that specifically need pipeline sections wait for
  130 |             // them in their own step bodies.
  131 |             await expect(this.filterBtn).toBeVisible({ timeout: 30000 });
  132 |         });
  133 |     }
  134 | 
  135 |     async navigateToInactive() {
  136 |         await test.step('Navigate to Inactive tab via sidebar', async () => {
  137 |             await this.clickMyLoansNav();
  138 |             await this.inactiveNavItem.click();
  139 |             await this.page.waitForLoadState('load');
  140 |             // Same toolbar-ready guard as navigateToAdversed.
  141 |             await expect(this.filterBtn).toBeVisible({ timeout: 30000 });
  142 |         });
  143 |     }
  144 | 
  145 |     async verifyOverviewTiles() {
  146 |         await test.step('Verify overview stat tiles', async () => {
  147 |             await expect(this.overviewSection).toBeVisible();
  148 |             await expect(this.myLoansTile).toBeVisible();
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
> 183 |             await expect(this.certifyBtn).toBeVisible();
      |                                           ^ Error: expect(locator).toBeVisible() failed
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
  249 |             await this.searchInput.fill(query);
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
```