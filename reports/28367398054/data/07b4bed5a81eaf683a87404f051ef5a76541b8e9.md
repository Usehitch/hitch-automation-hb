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
              - generic [ref=e122]: / $0
            - generic [ref=e124]:
              - generic [ref=e125]:
                - img [ref=e127]
                - generic [ref=e132]: Pre-Qual
              - generic [ref=e134]: / $0
            - generic [ref=e136]:
              - generic [ref=e137]:
                - img [ref=e139]
                - generic [ref=e141]: In Process
              - generic [ref=e143]: / $0
            - generic [ref=e145]:
              - generic [ref=e146]:
                - img [ref=e148]
                - generic [ref=e150]: Closing
              - generic [ref=e152]: / $0
            - generic [ref=e154]:
              - generic [ref=e155]:
                - img [ref=e157]
                - generic [ref=e159]: Funded
              - generic [ref=e161]: / $0
        - generic [ref=e162]:
          - generic [ref=e163]:
            - generic [ref=e164]:
              - generic [ref=e165]:
                - img [ref=e166]
                - textbox "Search by email, name, full address or loan number" [ref=e169]
              - button "Filter" [ref=e171] [cursor=pointer]:
                - img
                - text: Filter
            - tablist "View mode" [ref=e172]:
              - tab "List" [selected] [ref=e173] [cursor=pointer]:
                - img [ref=e175]
                - text: List
          - generic [ref=e176]:
            - generic [ref=e177]:
              - button "0 Pending MLO Certification 0 applications / $0" [ref=e178] [cursor=pointer]:
                - generic [ref=e179]:
                  - generic [ref=e180]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e181]
                  - generic [ref=e182]: 0 applications / $0
                - img [ref=e183]
              - generic [ref=e186]:
                - table [ref=e188]:
                  - rowgroup [ref=e189]:
                    - row "Applicant Property Address Loan Amount Status LO Assistant Time in Stage" [ref=e190]:
                      - columnheader "Applicant" [ref=e191]:
                        - generic [ref=e192]: Applicant
                      - columnheader "Property Address" [ref=e193]:
                        - generic [ref=e194]: Property Address
                      - columnheader "Loan Amount" [ref=e195]:
                        - generic [ref=e196]: Loan Amount
                      - columnheader "Status" [ref=e197]:
                        - generic [ref=e198]: Status
                      - columnheader "LO Assistant" [ref=e199]:
                        - generic [ref=e200]: LO Assistant
                      - columnheader "Time in Stage" [ref=e201]:
                        - generic [ref=e202]: Time in Stage
                      - columnheader [ref=e203]
                  - rowgroup [ref=e204]:
                    - row [ref=e205]:
                      - cell [ref=e206]
                      - cell [ref=e208]
                      - cell [ref=e210]
                      - cell [ref=e212]
                      - cell [ref=e214]
                      - cell [ref=e216]
                      - cell [ref=e218]
                    - row [ref=e219]:
                      - cell [ref=e220]
                      - cell [ref=e222]
                      - cell [ref=e224]
                      - cell [ref=e226]
                      - cell [ref=e228]
                      - cell [ref=e230]
                      - cell [ref=e232]
                    - row [ref=e233]:
                      - cell [ref=e234]
                      - cell [ref=e236]
                      - cell [ref=e238]
                      - cell [ref=e240]
                      - cell [ref=e242]
                      - cell [ref=e244]
                      - cell [ref=e246]
                    - row [ref=e247]:
                      - cell [ref=e248]
                      - cell [ref=e250]
                      - cell [ref=e252]
                      - cell [ref=e254]
                      - cell [ref=e256]
                      - cell [ref=e258]
                      - cell [ref=e260]
                    - row [ref=e261]:
                      - cell [ref=e262]
                      - cell [ref=e264]
                      - cell [ref=e266]
                      - cell [ref=e268]
                      - cell [ref=e270]
                      - cell [ref=e272]
                      - cell [ref=e274]
                    - row [ref=e275]:
                      - cell [ref=e276]
                      - cell [ref=e278]
                      - cell [ref=e280]
                      - cell [ref=e282]
                      - cell [ref=e284]
                      - cell [ref=e286]
                      - cell [ref=e288]
                - generic [ref=e289]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "Next" [disabled]:
                    - text: Next
                    - img
            - generic [ref=e290]:
              - button "1 Pre-Qual" [ref=e291] [cursor=pointer]:
                - generic [ref=e292]:
                  - generic [ref=e293]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e294]
                - img [ref=e295]
              - generic [ref=e298]:
                - table [ref=e300]:
                  - rowgroup [ref=e301]:
                    - row "Applicant Property Address Loan Amount Processor / LOA Time in Stage" [ref=e302]:
                      - columnheader "Applicant" [ref=e303]:
                        - generic [ref=e304]: Applicant
                      - columnheader "Property Address" [ref=e305]:
                        - generic [ref=e306]: Property Address
                      - columnheader "Loan Amount" [ref=e307]:
                        - generic [ref=e308]: Loan Amount
                      - columnheader "Processor / LOA" [ref=e309]:
                        - generic [ref=e310]: Processor / LOA
                      - columnheader "Time in Stage" [ref=e311]:
                        - generic [ref=e312]: Time in Stage
                      - columnheader [ref=e313]
                  - rowgroup [ref=e314]:
                    - row [ref=e315]:
                      - cell [ref=e316]
                      - cell [ref=e318]
                      - cell [ref=e320]
                      - cell [ref=e322]
                      - cell [ref=e324]
                      - cell [ref=e326]
                    - row [ref=e327]:
                      - cell [ref=e328]
                      - cell [ref=e330]
                      - cell [ref=e332]
                      - cell [ref=e334]
                      - cell [ref=e336]
                      - cell [ref=e338]
                    - row [ref=e339]:
                      - cell [ref=e340]
                      - cell [ref=e342]
                      - cell [ref=e344]
                      - cell [ref=e346]
                      - cell [ref=e348]
                      - cell [ref=e350]
                    - row [ref=e351]:
                      - cell [ref=e352]
                      - cell [ref=e354]
                      - cell [ref=e356]
                      - cell [ref=e358]
                      - cell [ref=e360]
                      - cell [ref=e362]
                    - row [ref=e363]:
                      - cell [ref=e364]
                      - cell [ref=e366]
                      - cell [ref=e368]
                      - cell [ref=e370]
                      - cell [ref=e372]
                      - cell [ref=e374]
                    - row [ref=e375]:
                      - cell [ref=e376]
                      - cell [ref=e378]
                      - cell [ref=e380]
                      - cell [ref=e382]
                      - cell [ref=e384]
                      - cell [ref=e386]
                - generic [ref=e387]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [disabled]
                  - button "Next" [disabled]:
                    - text: Next
                    - img
            - button "2 In Process" [ref=e389] [cursor=pointer]:
              - generic [ref=e390]:
                - generic [ref=e391]: "2"
                - heading "In Process" [level=3] [ref=e392]
              - img [ref=e393]
            - button "3 Closing" [ref=e396] [cursor=pointer]:
              - generic [ref=e397]:
                - generic [ref=e398]: "3"
                - heading "Closing" [level=3] [ref=e399]
              - img [ref=e400]
            - button "4 Funded" [ref=e403] [cursor=pointer]:
              - generic [ref=e404]:
                - generic [ref=e405]: "4"
                - heading "Funded" [level=3] [ref=e406]
              - img [ref=e407]
  - alert [ref=e409]
  - generic:
    - generic:
      - generic [ref=e411]:
        - iframe [ref=e412]:
          - button "Close message from company" [ref=f8e4] [cursor=pointer]:
            - img [ref=f8e5]
        - iframe [ref=e413]:
          - button "Hi. Need any help?" [ref=f9e5] [cursor=pointer]
      - iframe [ref=e414]:
        - button "Open messaging window" [ref=f10e5] [cursor=pointer]:
          - img [ref=f10e7]
          - img [ref=f10e10]
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