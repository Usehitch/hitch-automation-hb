# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loandetail.spec.js >> Loan Detail — Documents tab >> CFPB Acknowledgement opens PDF viewer when present
- Location: tests/loandetail.spec.js:292:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Loan ID/i)
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByText(/Loan ID/i)

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
      - generic [ref=e12]:
        - list [ref=e15]:
          - listitem [ref=e16]:
            - button "You're in Dev":
              - img
              - text: You're in Dev
        - list [ref=e19]:
          - listitem [ref=e20]:
            - button "My Loans Chevron down" [ref=e22] [cursor=pointer]:
              - img [ref=e23]
              - text: My Loans
              - img [ref=e26]
              - generic [ref=e28]: Chevron down
          - listitem [ref=e29]:
            - button "Manage Users" [ref=e31] [cursor=pointer]:
              - img [ref=e32]
              - text: Manage Users
          - listitem [ref=e37]:
            - button "Companies" [ref=e39] [cursor=pointer]:
              - img [ref=e40]
              - text: Companies
          - listitem [ref=e44]:
            - button "Company Branches" [ref=e46] [cursor=pointer]:
              - img [ref=e47]
              - text: Company Branches
          - listitem [ref=e52]:
            - button "Quick Pricer" [ref=e54] [cursor=pointer]:
              - img [ref=e55]
              - text: Quick Pricer
          - listitem [ref=e57]:
            - button "Reports" [ref=e59] [cursor=pointer]:
              - img [ref=e60]
              - text: Reports
          - listitem [ref=e62]:
            - button "Release Notes" [ref=e64] [cursor=pointer]:
              - img [ref=e65]
              - text: Release Notes
        - generic [ref=e70]:
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
      - generic [ref=e118]:
        - list [ref=e120]:
          - listitem [ref=e121]:
            - generic [ref=e122]:
              - generic "Tracker Indicator notCompleted" [ref=e123]:
                - img [ref=e124]
              - paragraph [ref=e133]: Pre-Qual
          - listitem [ref=e134]:
            - generic [ref=e135]:
              - generic "Tracker Indicator notCompleted" [ref=e136]:
                - img [ref=e137]
              - paragraph [ref=e146]: In Process
          - listitem [ref=e147]:
            - generic [ref=e148]:
              - generic "Tracker Indicator notCompleted" [ref=e149]:
                - img [ref=e150]
              - paragraph [ref=e159]: Closing
          - listitem [ref=e160]:
            - generic [ref=e161]:
              - generic "Tracker Indicator notCompleted" [ref=e162]:
                - img [ref=e163]
              - paragraph [ref=e172]: Funded
        - tablist [ref=e174]:
          - tab "Application Summary" [selected] [ref=e175] [cursor=pointer]:
            - img [ref=e176]
            - text: Application Summary
          - tab "Tracker" [ref=e179] [cursor=pointer]:
            - img [ref=e180]
            - text: Tracker
          - tab "Conditions" [ref=e182] [cursor=pointer]:
            - img [ref=e183]
            - text: Conditions
          - tab "Documents" [ref=e184] [cursor=pointer]:
            - img [ref=e185]
            - text: Documents
        - generic [ref=e188]:
          - list [ref=e191]:
            - listitem [ref=e192]:
              - button "Overview" [ref=e193] [cursor=pointer]:
                - img [ref=e194]
                - text: Overview
            - listitem [ref=e197]:
              - button "Borrowers" [ref=e198] [cursor=pointer]:
                - img [ref=e199]
                - text: Borrowers
            - listitem [ref=e204]:
              - button "Property" [ref=e205] [cursor=pointer]:
                - img [ref=e206]
                - text: Property
            - listitem [ref=e209]:
              - button "Financials" [ref=e210] [cursor=pointer]:
                - img [ref=e211]
                - text: Financials
          - paragraph [ref=e274]: Your Loan Team (0)
  - alert [ref=e333]: Applications Portal - Loan Card
  - generic:
    - generic:
      - generic [ref=e335]:
        - iframe [ref=e336]:
          - button "Close message from company" [ref=f14e4] [cursor=pointer]:
            - img [ref=f14e5]
        - iframe [ref=e337]:
          - button "Hi. Need any help?" [ref=f15e5] [cursor=pointer]
      - iframe [ref=e338]:
        - button "Open messaging window" [ref=f16e5] [cursor=pointer]:
          - img [ref=f16e7]
          - img [ref=f16e10]
```

# Test source

```ts
  77  | 
  78  |         // PDF viewer panel (right side)
  79  |         this.docPdfPageCounter        = this.page.getByText(/\d+\s*\/\s*\d+/).first();
  80  |         this.docPdfDownloadBtn        = this.page.locator('[aria-label*="download"], [title*="download"]').first();
  81  | 
  82  |         // -- Borrowers sub-nav content ----------------------------------------
  83  |         // Personal info labels (confirmed from Borrowers tab DOM)
  84  |         this.borrowerFirstNameLabel = this.page.getByText('First Name').first();
  85  |         this.borrowerLastNameLabel  = this.page.getByText('Last Name').first();
  86  |         this.borrowerDobLabel       = this.page.getByText('Date of Birth').first();
  87  |         this.borrowerSsnLabel       = this.page.getByText('SSN').first();
  88  |         this.borrowerPhoneLabel     = this.page.getByText('Mobile Phone').first();
  89  |         this.borrowerEmailLabel     = this.page.getByText('Email').first();
  90  |         this.borrowerCreditScore    = this.page.getByText('Credit Score').first();
  91  |         // Additional fields visible on the card
  92  |         this.borrowerMaritalStatus  = this.page.getByText('Marital Status').first();
  93  |         this.borrowerCurrentAddress = this.page.getByText('Current Address').first();
  94  |         this.borrowerIncomeType     = this.page.getByText('Income Verification Type').first();
  95  | 
  96  |         // -- Property sub-nav content -----------------------------------------
  97  |         // Subject Property Information section
  98  |         this.propertySubjectInfoHeading  = this.page.getByText('Subject Property Information').first();
  99  |         this.propertyAddressLabel        = this.page.getByText('Address').first();
  100 |         this.propertyUsageTypeLabel      = this.page.getByText('Usage Type').first();
  101 |         this.propertyTypeLabel           = this.page.getByText('Property Type').first();
  102 |         this.propertyStatedValueLabel    = this.page.getByText('Stated Value').first();
  103 |         this.propertyAppraisedValueLabel = this.page.getByText('Appraised Value').first();
  104 |         this.propertyHoaFeesLabel        = this.page.getByText('HOA/Condo Fees').first();
  105 |         // Mortgages section
  106 |         this.propertyMortgagesHeading    = this.page.getByText('Mortgages').first();
  107 |         this.mortgageDebtorLabel         = this.page.getByText('Debtor').first();
  108 |         this.mortgageCreditorLabel       = this.page.getByText('Creditor').first();
  109 |         this.mortgageBalanceLabel        = this.page.getByText('Balance').first();
  110 |         // Property Value / AVM section
  111 |         this.propertyValueHeading        = this.page.getByText('Property Value').first();
  112 |         this.avmComparisonHeading        = this.page.getByText('AVM Comparison').first();
  113 |         this.avmProviderLabel            = this.page.getByText('AVM Provider').first();
  114 |         // Title and Trust section
  115 |         this.titleTrustHeading           = this.page.getByText('Title and Trust Information').first();
  116 |         this.titleHeldByLabel            = this.page.getByText(/Title will be held/i).first();
  117 | 
  118 |         // -- Financials sub-nav content ---------------------------------------
  119 |         // Credit Information section
  120 |         this.financialsCreditInfoHeading = this.page.getByText('Credit Information').first();
  121 |         this.financialsMidScoreLabel     = this.page.getByText('MID SCORE').first();
  122 |         this.financialsEquifaxLabel      = this.page.getByText('EQUIFAX').first();
  123 |         // Debt to Income section
  124 |         this.financialsDtiSection        = this.page.getByText('Debt to Income').first();
  125 |         this.financialsMonthlyIncomeLabel = this.page.getByText('Monthly Income').first();
  126 |         this.financialsCurrentDebtLabel  = this.page.getByText('Current Debt').first();
  127 |         this.financialsFinalDtiLabel     = this.page.getByText('Final DTI Ratio').first();
  128 |         this.financialsEmploymentIncome  = this.page.getByText('Employment Income').first();
  129 | 
  130 |         // -- Tracker tab content ----------------------------------------------
  131 |         // Top stepper — four lifecycle stage labels
  132 |         this.trackerPreQual   = this.page.getByText('Pre-Qual').first();
  133 |         this.trackerInProcess = this.page.getByText('In Process').first();
  134 |         this.trackerClosing   = this.page.getByText('Closing').first();
  135 |         this.trackerFunded    = this.page.getByText('Funded').first();
  136 | 
  137 |         // Current stage detail panel (e.g. "Stage 1: Pre-Qual")
  138 |         this.trackerCurrentStageLabel  = this.page.getByText(/Stage \d+:/i).first();
  139 |         this.trackerCurrentBadge       = this.page.getByText('Current').first();
  140 |         this.trackerStepsCompleted     = this.page.getByText(/\d+\/\d+ steps completed/i).first();
  141 | 
  142 |         // Pre-Qual step row headers
  143 |         this.trackerIdentityVerStep    = this.page.getByText('Identity Verification').first();
  144 |         this.trackerCreditCheckStep    = this.page.getByText('Credit Check').first();
  145 |         this.trackerValuationStep      = this.page.getByText('Valuation').first();
  146 |         this.trackerInitialOfferStep   = this.page.getByText('Initial Offer').first();
  147 | 
  148 |         // Identity Verification — expanded detail
  149 |         this.trackerBorrower1Label         = this.page.getByText('Borrower 1').first();
  150 |         this.trackerStartedApplicationBadge = this.page.getByText('Started Application').first();
  151 | 
  152 |         // Credit Check — expanded detail labels
  153 |         this.trackerSoftPullScoreLabel  = this.page.getByText('Soft Pull Score').first();
  154 |         this.trackerSoftPullDateLabel   = this.page.getByText('Soft Pull Date').first();
  155 |         this.trackerHardPullScoreLabel  = this.page.getByText('Hard Pull Score').first();
  156 |         this.trackerHardPullDateLabel   = this.page.getByText('Hard Pull Date').first();
  157 |         this.trackerLoanBalanceLabel    = this.page.getByText('Loan Balance').first();
  158 |         this.trackerMonthlyDebtLabel    = this.page.getByText('Monthly Debt Load').first();
  159 | 
  160 |         // Valuation / Initial Offer — pending state
  161 |         this.trackerPendingStatus       = this.page.getByText('Pending').first();
  162 | 
  163 |         // -- Conditions tab content -------------------------------------------
  164 |         // Sub-tab toggles — may be rendered as tabs, divs, or buttons depending
  165 |         // on MUI component; getByText is role-agnostic and works for all three
  166 |         this.conditionsBorrowerTasksTab = this.page.getByText(/Borrower Tasks/i).first();
  167 |         this.conditionsLenderTasksTab   = this.page.getByText(/Lender Tasks/i).first();
  168 |         // Progress bar area
  169 |         this.conditionsProgressLabel    = this.page.getByText('Progress').first();
  170 |         this.conditionsProgressCounter  = this.page.getByText(/\d+ of \d+ completed/i).first();
  171 |         // Empty state — shown when no tasks have been assigned
  172 |         this.conditionsEmptyState       = this.page.getByText('No tasks assigned yet').first();
  173 |     }
  174 | 
  175 |     async verifyPageLoaded() {
  176 |         await test.step('Verify loan detail page loaded', async () => {
> 177 |             await expect(this.loanIdLabel).toBeVisible({ timeout: 20000 });
      |                                            ^ Error: expect(locator).toBeVisible() failed
  178 |             await expect(this.applicationSummaryTab).toBeVisible();
  179 |         });
  180 |     }
  181 | 
  182 |     async verifyStatusPipeline() {
  183 |         await test.step('Verify status pipeline', async () => {
  184 |             await expect(this.preQualStatus).toBeVisible();
  185 |             await expect(this.inProcessStatus).toBeVisible();
  186 |             await expect(this.closingStatus).toBeVisible();
  187 |             await expect(this.fundedStatus).toBeVisible();
  188 |         });
  189 |     }
  190 | 
  191 |     async verifyTabs() {
  192 |         await test.step('Verify main tabs', async () => {
  193 |             await expect(this.applicationSummaryTab).toBeVisible();
  194 |             await expect(this.trackerTab).toBeVisible();
  195 |             await expect(this.conditionsTab).toBeVisible();
  196 |             await expect(this.documentsTab).toBeVisible();
  197 |         });
  198 |     }
  199 | 
  200 |     async verifyOverview() {
  201 |         await test.step('Verify Overview metric tiles and Loan Team section', async () => {
  202 |             await expect(this.loanAmountTile).toBeVisible();
  203 |             await expect(this.cltvRatioTile).toBeVisible();
  204 |             await expect(this.dtiRatioTile).toBeVisible();
  205 |             await expect(this.creditScoreTile).toBeVisible();
  206 |             await expect(this.loanTeamSection).toBeVisible();
  207 |             await expect(this.loanOfficerCard).toBeVisible();
  208 |         });
  209 |     }
  210 | 
  211 |     async verifySubNav() {
  212 |         await test.step('Verify Application Summary sub-nav', async () => {
  213 |             await expect(this.overviewNav).toBeVisible();
  214 |             await expect(this.borrowersNav).toBeVisible();
  215 |             await expect(this.propertyNav).toBeVisible();
  216 |             await expect(this.financialsNav).toBeVisible();
  217 |         });
  218 |     }
  219 | 
  220 |     async verifyActionButtons() {
  221 |         await test.step('Verify top action buttons', async () => {
  222 |             await expect(this.shareLinksBtn).toBeVisible();
  223 |             await expect(this.viewApplicationBtn).toBeVisible();
  224 |             await expect(this.shadowBorrowerViewBtn).toBeVisible();
  225 |         });
  226 |     }
  227 | 
  228 |     async verifyESignedMethodConsent() {
  229 |         await test.step('Verify esigned_method_consent section is present with documents', async () => {
  230 |             // The Documents tab content loads asynchronously after the tab click;
  231 |             // give it 20 s for the consent section button to appear in the DOM.
  232 |             // The portal creates a single esigned_method_consent section (not separate
  233 |             // per-applicant entries), so we verify the section header exists.
  234 |             // The co-borrower document is verified inside the section by
  235 |             // openCoBorrowerMethodConsent() which locates the coborrowerMethodConsentSignature link.
  236 |             await expect(this.eSignedMethodConsentItem).toBeVisible({ timeout: 20000 });
  237 |         });
  238 |     }
  239 | 
  240 |     /**
  241 |      * Expands the esigned_method_consent section and clicks the co-borrower's document.
  242 |      *
  243 |      * The sub-item labels are truncated S3 paths whose prefix is an internal account
  244 |      * email (e.g. frrzn28676@minitts.net/compliance/...) — NOT the registration email
  245 |      * passed to the portal. The document type is encoded in the full (un-truncated)
  246 |      * DOM text even when CSS clips the visible label. We locate the item by
  247 |      * "coborrowerMethodConsentSignature" which appears in the S3 path for the
  248 |      * co-borrower document and nowhere else in the sidebar list.
  249 |      */
  250 |     async openCoBorrowerMethodConsent() {
  251 |         await test.step('Open co-borrower method consent document', async () => {
  252 |             // The link's DOM text contains the full S3 path even when visually truncated.
  253 |             // Include button in the element types — MUI document list sub-items are
  254 |             // rendered as <button> elements, not just li/a/span/div.
  255 |             // Avoid matching the PDF viewer header which also shows the S3 path after
  256 |             // a different document is already open, by scoping broadly but relying on
  257 |             // the coborrowerMethodConsentSignature substring to be unique enough.
  258 |             const coBorrowerDocLink = this.page
  259 |                 .locator('li, [role="listitem"], a, span, div, button')
  260 |                 .filter({ hasText: /coborrowerMethodConsentSignature/i })
  261 |                 .first();
  262 | 
  263 |             // Expand the section if the target link is not yet in the DOM / visible.
  264 |             // waitForLoadState('load') is a no-op for SPA accordion state changes — use
  265 |             // the final waitFor below as the sole completion signal.
  266 |             const isExpanded = await coBorrowerDocLink.isVisible({ timeout: 2000 }).catch(() => false);
  267 |             if (!isExpanded) {
  268 |                 await this.eSignedMethodConsentItem.click();
  269 |             }
  270 | 
  271 |             await coBorrowerDocLink.waitFor({ state: 'visible', timeout: 20000 });
  272 |             await coBorrowerDocLink.click();
  273 |         });
  274 |     }
  275 | 
  276 |     // -- Borrowers sub-nav ----------------------------------------------------
  277 | 
```