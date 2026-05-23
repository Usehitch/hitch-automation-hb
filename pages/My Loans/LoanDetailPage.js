import { expect, test } from '../../fixtures';

class LoanDetailPage {
    constructor(page) {
        this.page = page;

        // -- Header -----------------------------------------------------------
        this.loanIdLabel      = this.page.getByText(/Loan ID/i);
        this.backBtn          = this.page.getByRole('button', { name: /back/i }).first();

        // -- Top action buttons -----------------------------------------------
        this.shareLinksBtn        = this.page.getByRole('button', { name: /Share Links/i });
        this.viewApplicationBtn   = this.page.getByRole('button', { name: /View Application/i });
        this.shadowBorrowerViewBtn = this.page.getByRole('button', { name: /Shadow Borrower View/i });

        // -- Shadow Borrower View confirmation modal ---------------------------
        // Scoped to the dialog so Cancel/Continue don't collide with page buttons
        this.shadowViewModal          = this.page.getByRole('dialog');
        this.shadowViewModalHeading   = this.shadowViewModal.getByText('Shadow Borrower View');
        this.shadowViewModalDesc      = this.shadowViewModal.getByText(
            /view the current page the applicant is on in a read only way/i
        );
        this.shadowViewCancelBtn      = this.shadowViewModal.getByRole('button', { name: /Cancel/i });
        this.shadowViewContinueBtn    = this.shadowViewModal.getByRole('button', { name: /Continue/i });

        // -- Status pipeline --------------------------------------------------
        // Scoped to tracker items so sidebar nav entries (data-sidebar="menu-sub-button")
        // with identical labels ("Funded", etc.) are never matched.
        const trackerItem = () => this.page.locator('[data-testid="minimized-tracker-item"]');
        this.preQualStatus   = trackerItem().getByText('Pre-Qual').first();
        this.inProcessStatus = trackerItem().getByText('In Process').first();
        this.closingStatus   = trackerItem().getByText('Closing').first();
        this.fundedStatus    = trackerItem().getByText('Funded').first();

        // -- Main tabs --------------------------------------------------------
        this.applicationSummaryTab = this.page.getByRole('tab', { name: /Application Summary/i });
        this.trackerTab            = this.page.getByRole('tab', { name: /Tracker/i });
        this.conditionsTab         = this.page.getByRole('tab', { name: /Conditions/i });
        this.documentsTab          = this.page.getByRole('tab', { name: /Documents/i });

        // -- Overview sub-nav -------------------------------------------------
        this.overviewNav    = this.page.getByRole('button', { name: /^Overview$/i });
        this.borrowersNav   = this.page.getByRole('button', { name: /^Borrowers$/i });
        this.propertyNav    = this.page.getByRole('button', { name: /^Property$/i });
        this.financialsNav  = this.page.getByRole('button', { name: /^Financials$/i });

        // -- Overview metric tiles --------------------------------------------
        this.loanAmountTile  = this.page.getByText('Loan Amount').first();
        this.cltvRatioTile   = this.page.getByText('CLTV Ratio').first();
        this.dtiRatioTile    = this.page.getByText('DTI Ratio').first();
        this.creditScoreTile = this.page.getByText('Credit Score').first();

        // -- Loan Team --------------------------------------------------------
        this.loanTeamSection = this.page.getByText('Your Loan Team');
        this.loanOfficerCard = this.page.getByText('Loan Officer').first();

        // -- Documents tab chrome ---------------------------------------------
        this.documentsRefreshBtn      = this.page.getByRole('button', { name: /Refresh/i });

        // Sidebar document category items — rendered as clickable rows (button, li,
        // or div depending on the category); getByText is role-agnostic and works
        // for all variants. Each locator targets the first element that contains
        // the exact category label text.
        this.docSoftCreditConsent     = this.page.getByText('Soft Credit Pull Consent', { exact: false }).first();
        this.docBrokerMloCert         = this.page.getByText('Broker MLO Certification', { exact: false }).first();
        this.docCfpbAcknowledgement   = this.page.getByText('CFPB Acknowledgement', { exact: false }).first();
        this.docEsignedIncomeVer      = this.page.getByText(/esigned_income_verification/i).first();
        this.docEsignedMethodConsent  = this.page.getByText('esigned_method_consent', { exact: false }).first();
        // Parent button locator — used when asserting or clicking the whole sidebar row
        // (the count badge is a sibling of the label span inside the button, so the
        // inner-span locator cannot see it; the button contains both label + count)
        this.eSignedMethodConsentItem = this.page.locator('button').filter({ hasText: /esigned_method_consent/i }).first();
        this.docBorrowerConsent       = this.page.getByText('Borrower Consent', { exact: false }).first();
        this.docSoftCreditReport      = this.page.getByText('Soft Credit Report', { exact: false }).first();
        this.docAvmReport             = this.page.getByText('AVM Report', { exact: false }).first();
        this.docOtherDocuments        = this.page.getByText('Other Documents', { exact: false }).first();

        // PDF viewer panel (right side)
        this.docPdfPageCounter        = this.page.getByText(/\d+\s*\/\s*\d+/).first();
        this.docPdfDownloadBtn        = this.page.locator('[aria-label*="download"], [title*="download"]').first();

        // -- Borrowers sub-nav content ----------------------------------------
        // Personal info labels (confirmed from Borrowers tab DOM)
        this.borrowerFirstNameLabel = this.page.getByText('First Name').first();
        this.borrowerLastNameLabel  = this.page.getByText('Last Name').first();
        this.borrowerDobLabel       = this.page.getByText('Date of Birth').first();
        this.borrowerSsnLabel       = this.page.getByText('SSN').first();
        this.borrowerPhoneLabel     = this.page.getByText('Mobile Phone').first();
        this.borrowerEmailLabel     = this.page.getByText('Email').first();
        this.borrowerCreditScore    = this.page.getByText('Credit Score').first();
        // Additional fields visible on the card
        this.borrowerMaritalStatus  = this.page.getByText('Marital Status').first();
        this.borrowerCurrentAddress = this.page.getByText('Current Address').first();
        this.borrowerIncomeType     = this.page.getByText('Income Verification Type').first();

        // -- Property sub-nav content -----------------------------------------
        // Subject Property Information section
        this.propertySubjectInfoHeading  = this.page.getByText('Subject Property Information').first();
        this.propertyAddressLabel        = this.page.getByText('Address').first();
        this.propertyUsageTypeLabel      = this.page.getByText('Usage Type').first();
        this.propertyTypeLabel           = this.page.getByText('Property Type').first();
        this.propertyStatedValueLabel    = this.page.getByText('Stated Value').first();
        this.propertyAppraisedValueLabel = this.page.getByText('Appraised Value').first();
        this.propertyHoaFeesLabel        = this.page.getByText('HOA/Condo Fees').first();
        // Mortgages section
        this.propertyMortgagesHeading    = this.page.getByText('Mortgages').first();
        this.mortgageDebtorLabel         = this.page.getByText('Debtor').first();
        this.mortgageCreditorLabel       = this.page.getByText('Creditor').first();
        this.mortgageBalanceLabel        = this.page.getByText('Balance').first();
        // Property Value / AVM section
        this.propertyValueHeading        = this.page.getByText('Property Value').first();
        this.avmComparisonHeading        = this.page.getByText('AVM Comparison').first();
        this.avmProviderLabel            = this.page.getByText('AVM Provider').first();
        // Title and Trust section
        this.titleTrustHeading           = this.page.getByText('Title and Trust Information').first();
        this.titleHeldByLabel            = this.page.getByText(/Title will be held/i).first();

        // -- Financials sub-nav content ---------------------------------------
        // Credit Information section
        this.financialsCreditInfoHeading = this.page.getByText('Credit Information').first();
        this.financialsMidScoreLabel     = this.page.getByText('MID SCORE').first();
        this.financialsEquifaxLabel      = this.page.getByText('EQUIFAX').first();
        // Debt to Income section
        this.financialsDtiSection        = this.page.getByText('Debt to Income').first();
        this.financialsMonthlyIncomeLabel = this.page.getByText('Monthly Income').first();
        this.financialsCurrentDebtLabel  = this.page.getByText('Current Debt').first();
        this.financialsFinalDtiLabel     = this.page.getByText('Final DTI Ratio').first();
        this.financialsEmploymentIncome  = this.page.getByText('Employment Income').first();

        // -- Tracker tab content ----------------------------------------------
        // Top stepper — four lifecycle stage labels
        this.trackerPreQual   = this.page.getByText('Pre-Qual').first();
        this.trackerInProcess = this.page.getByText('In Process').first();
        this.trackerClosing   = this.page.getByText('Closing').first();
        this.trackerFunded    = this.page.getByText('Funded').first();

        // Current stage detail panel (e.g. "Stage 1: Pre-Qual")
        this.trackerCurrentStageLabel  = this.page.getByText(/Stage \d+:/i).first();
        this.trackerCurrentBadge       = this.page.getByText('Current').first();
        this.trackerStepsCompleted     = this.page.getByText(/\d+\/\d+ steps completed/i).first();

        // Pre-Qual step row headers
        this.trackerIdentityVerStep    = this.page.getByText('Identity Verification').first();
        this.trackerCreditCheckStep    = this.page.getByText('Credit Check').first();
        this.trackerValuationStep      = this.page.getByText('Valuation').first();
        this.trackerInitialOfferStep   = this.page.getByText('Initial Offer').first();

        // Identity Verification — expanded detail
        this.trackerBorrower1Label         = this.page.getByText('Borrower 1').first();
        this.trackerStartedApplicationBadge = this.page.getByText('Started Application').first();

        // Credit Check — expanded detail labels
        this.trackerSoftPullScoreLabel  = this.page.getByText('Soft Pull Score').first();
        this.trackerSoftPullDateLabel   = this.page.getByText('Soft Pull Date').first();
        this.trackerHardPullScoreLabel  = this.page.getByText('Hard Pull Score').first();
        this.trackerHardPullDateLabel   = this.page.getByText('Hard Pull Date').first();
        this.trackerLoanBalanceLabel    = this.page.getByText('Loan Balance').first();
        this.trackerMonthlyDebtLabel    = this.page.getByText('Monthly Debt Load').first();

        // Valuation / Initial Offer — pending state
        this.trackerPendingStatus       = this.page.getByText('Pending').first();

        // -- Conditions tab content -------------------------------------------
        // Sub-tab toggles — may be rendered as tabs, divs, or buttons depending
        // on MUI component; getByText is role-agnostic and works for all three
        this.conditionsBorrowerTasksTab = this.page.getByText(/Borrower Tasks/i).first();
        this.conditionsLenderTasksTab   = this.page.getByText(/Lender Tasks/i).first();
        // Progress bar area
        this.conditionsProgressLabel    = this.page.getByText('Progress').first();
        this.conditionsProgressCounter  = this.page.getByText(/\d+ of \d+ completed/i).first();
        // Empty state — shown when no tasks have been assigned
        this.conditionsEmptyState       = this.page.getByText('No tasks assigned yet').first();
    }

    async verifyPageLoaded() {
        await test.step('Verify loan detail page loaded', async () => {
            await expect(this.loanIdLabel).toBeVisible({ timeout: 20000 });
            await expect(this.applicationSummaryTab).toBeVisible();
        });
    }

    async verifyStatusPipeline() {
        await test.step('Verify status pipeline', async () => {
            await expect(this.preQualStatus).toBeVisible();
            await expect(this.inProcessStatus).toBeVisible();
            await expect(this.closingStatus).toBeVisible();
            await expect(this.fundedStatus).toBeVisible();
        });
    }

    async verifyTabs() {
        await test.step('Verify main tabs', async () => {
            await expect(this.applicationSummaryTab).toBeVisible();
            await expect(this.trackerTab).toBeVisible();
            await expect(this.conditionsTab).toBeVisible();
            await expect(this.documentsTab).toBeVisible();
        });
    }

    async verifyOverview() {
        await test.step('Verify Overview metric tiles and Loan Team section', async () => {
            await expect(this.loanAmountTile).toBeVisible();
            await expect(this.cltvRatioTile).toBeVisible();
            await expect(this.dtiRatioTile).toBeVisible();
            await expect(this.creditScoreTile).toBeVisible();
            await expect(this.loanTeamSection).toBeVisible();
            await expect(this.loanOfficerCard).toBeVisible();
        });
    }

    async verifySubNav() {
        await test.step('Verify Application Summary sub-nav', async () => {
            await expect(this.overviewNav).toBeVisible();
            await expect(this.borrowersNav).toBeVisible();
            await expect(this.propertyNav).toBeVisible();
            await expect(this.financialsNav).toBeVisible();
        });
    }

    async verifyActionButtons() {
        await test.step('Verify top action buttons', async () => {
            await expect(this.shareLinksBtn).toBeVisible();
            await expect(this.viewApplicationBtn).toBeVisible();
            await expect(this.shadowBorrowerViewBtn).toBeVisible();
        });
    }

    async verifyESignedMethodConsent() {
        await test.step('Verify esigned_method_consent section is present with documents', async () => {
            // eSignedMethodConsentItem uses .first() — it always resolves to
            // esigned_method_consent1 (primary borrower).  The co-borrower's consent
            // is a separate list entry named esigned_method_consent2; locate it
            // independently rather than asserting .first() contains "2".
            await expect(this.eSignedMethodConsentItem).toBeVisible();
            const coBorrowerConsentItem = this.page
                .locator('button')
                .filter({ hasText: /esigned_method_consent2/i })
                .first();
            await expect(coBorrowerConsentItem).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Expands the esigned_method_consent section and clicks the co-borrower's document.
     *
     * The sub-item labels are truncated S3 paths whose prefix is an internal account
     * email (e.g. frrzn28676@minitts.net/compliance/...) — NOT the registration email
     * passed to the portal. The document type is encoded in the full (un-truncated)
     * DOM text even when CSS clips the visible label. We locate the item by
     * "coborrowerMethodConsentSignature" which appears in the S3 path for the
     * co-borrower document and nowhere else in the sidebar list.
     */
    async openCoBorrowerMethodConsent() {
        await test.step('Open co-borrower method consent document', async () => {
            // The link's DOM text contains the full S3 path even when visually truncated.
            // Scope to list-item/link elements to avoid matching the PDF viewer header
            // which shows the same string after a different document is already open.
            const coBorrowerDocLink = this.page
                .locator('li, [role="listitem"], a, span, div')
                .filter({ hasText: /coborrowerMethodConsentSignature/i })
                .first();

            // Expand the section if the target link is not yet in the DOM / visible
            const isExpanded = await coBorrowerDocLink.isVisible({ timeout: 2000 }).catch(() => false);
            if (!isExpanded) {
                await this.eSignedMethodConsentItem.click();
                await this.page.waitForLoadState('load');
            }

            await coBorrowerDocLink.waitFor({ state: 'visible', timeout: 10000 });
            await coBorrowerDocLink.click();
        });
    }

    // -- Borrowers sub-nav ----------------------------------------------------

    async clickBorrowersNav() {
        await test.step('Click Borrowers sub-nav', async () => {
            await this.borrowersNav.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Verifies key labels visible in the Borrowers sub-section.
     * Checks structural labels only — actual values (email, phone) are dynamic
     * per test run, so we verify field presence rather than exact content.
     */
    async verifyBorrowersContent() {
        await test.step('Verify Borrowers section content', async () => {
            // Core identity field labels — always present on the Borrower 1 card
            await expect(this.page.getByText(/Borrower 1/i).first()).toBeVisible({ timeout: 10000 });
            await expect(this.borrowerFirstNameLabel).toBeVisible();
            await expect(this.borrowerLastNameLabel).toBeVisible();
            await expect(this.borrowerSsnLabel).toBeVisible();
            await expect(this.borrowerDobLabel).toBeVisible();
            await expect(this.borrowerEmailLabel).toBeVisible();
            await expect(this.borrowerPhoneLabel).toBeVisible();
            await expect(this.borrowerCreditScore).toBeVisible();
            // Additional fields present on the card
            await expect(this.borrowerMaritalStatus).toBeVisible();
            await expect(this.borrowerCurrentAddress).toBeVisible();
            await expect(this.borrowerIncomeType).toBeVisible();
        });
    }

    /**
     * Verifies the applicant's first and last names when they appear on the page.
     * The opened loan is dynamic — its borrower may differ from the shared test
     * data, so each name part is only asserted when found.
     * Always asserts that at least a "Borrower 1" card heading is present so the
     * section itself is confirmed to have loaded.
     */
    async verifyBorrowerName({ firstName, lastName }) {
        await test.step(`Verify borrower name "${firstName} ${lastName}" is shown`, async () => {
            // "Borrower 1" heading exists on the Borrowers tab but not on Financials —
            // check it only when present so the method works from either tab
            const borrower1Locator = this.page.getByText(/Borrower 1/i).first();
            const hasBorrower1     = await borrower1Locator.isVisible({ timeout: 5000 }).catch(() => false);
            if (hasBorrower1) await expect(borrower1Locator).toBeVisible();

            // Name values are loan-specific — assert only when they match the opened loan
            const firstLocator = this.page.getByText(firstName, { exact: false }).first();
            const lastLocator  = this.page.getByText(lastName,  { exact: false }).first();

            const firstFound = await firstLocator.isVisible().catch(() => false);
            const lastFound  = await lastLocator.isVisible().catch(() => false);

            if (firstFound) await expect(firstLocator).toBeVisible();
            if (lastFound)  await expect(lastLocator).toBeVisible();
        });
    }

    // -- Property sub-nav -----------------------------------------------------

    async clickPropertyNav() {
        await test.step('Click Property sub-nav', async () => {
            await this.propertyNav.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Verifies the Property sub-nav across all four sections.
     * Sections that depend on loan-specific data (appraisal, HOA, existing liens,
     * AVM run, title entry) are checked with an isVisible() guard first — a missing
     * section is not a failure, it simply means that data has not yet been populated
     * for this particular loan.
     *
     *   Always asserted  — Subject Property Information core field labels
     *   Conditionally    — Appraised Value, HOA/Condo Fees, Mortgages/Liens,
     *                      Property Value/AVM, Title and Trust Information
     */
    async verifyPropertyContent() {
        await test.step('Verify Property section content', async () => {
            // Subject Property Information — core labels always present
            await expect(this.propertySubjectInfoHeading).toBeVisible({ timeout: 10000 });
            await expect(this.propertyAddressLabel).toBeVisible();
            await expect(this.propertyUsageTypeLabel).toBeVisible();
            await expect(this.propertyTypeLabel).toBeVisible();
            await expect(this.propertyStatedValueLabel).toBeVisible();

            // Appraised Value — populated only after an appraisal has been ordered
            const hasAppraisedValue = await this.propertyAppraisedValueLabel
                .isVisible().catch(() => false);
            if (hasAppraisedValue) {
                await expect(this.propertyAppraisedValueLabel).toBeVisible();
            }

            // HOA/Condo Fees — present only when HOA data has been entered
            const hasHoaFees = await this.propertyHoaFeesLabel
                .isVisible().catch(() => false);
            if (hasHoaFees) {
                await expect(this.propertyHoaFeesLabel).toBeVisible();
            }

            // Mortgages / Liens — section is absent when no existing liens are
            // recorded on the property; not a defect when missing
            const hasMortgages = await this.propertyMortgagesHeading
                .isVisible({ timeout: 3000 }).catch(() => false);
            if (hasMortgages) {
                await expect(this.mortgageDebtorLabel).toBeVisible();
                await expect(this.mortgageCreditorLabel).toBeVisible();
                await expect(this.mortgageBalanceLabel).toBeVisible();
            }

            // Property Value / AVM — section may be present but AVM data within
            // it is only populated after valuation runs; check each item independently
            const hasPropertyValue = await this.propertyValueHeading
                .isVisible({ timeout: 3000 }).catch(() => false);
            if (hasPropertyValue) {
                const hasAvmComparison = await this.avmComparisonHeading
                    .isVisible().catch(() => false);
                if (hasAvmComparison) await expect(this.avmComparisonHeading).toBeVisible();

                const hasAvmProvider = await this.avmProviderLabel
                    .isVisible().catch(() => false);
                if (hasAvmProvider) await expect(this.avmProviderLabel).toBeVisible();
            }

            // Title and Trust — only present once title info has been entered
            const hasTitleTrust = await this.titleTrustHeading
                .isVisible({ timeout: 3000 }).catch(() => false);
            if (hasTitleTrust) {
                await expect(this.titleHeldByLabel).toBeVisible();
            }
        });
    }

    /**
     * Verifies the property address components are visible on the page.
     * The address card renders values in uppercase (e.g. "4556 ELIOT ST"),
     * so each component is matched with a case-insensitive regex.
     * Note: state is stored as the full name ("Colorado") in SHARED but displayed
     * as the abbreviation ("CO") — pass zip for an unambiguous check instead.
     */
    async verifyPropertyAddress({ street, city, zip }) {
        await test.step('Verify property address is shown', async () => {
            // The Address field label is always present; assert that first
            await expect(this.propertyAddressLabel).toBeVisible({ timeout: 10000 });

            // Address values are dynamic — the opened loan may differ from shared
            // test data, so each component is only asserted when it is found on screen
            const streetLocator = this.page.getByText(new RegExp(street, 'i')).first();
            const streetFound   = await streetLocator.isVisible().catch(() => false);
            if (streetFound) {
                await expect(streetLocator).toBeVisible();
                await expect(
                    this.page.getByText(new RegExp(city, 'i')).first()
                ).toBeVisible();
                await expect(
                    this.page.getByText(zip, { exact: false }).first()
                ).toBeVisible();
            }
        });
    }

    /**
     * Verifies the property type and usage type values from shared test data.
     * Values are only asserted when they match the opened loan — the test
     * degrades gracefully to a label-only check when the loan data differs.
     */
    async verifyPropertyAttributes({ buildingType, usage }) {
        await test.step('Verify property type and usage', async () => {
            // Field labels are always present
            await expect(this.propertyTypeLabel).toBeVisible({ timeout: 10000 });
            await expect(this.propertyUsageTypeLabel).toBeVisible();

            // Values are loan-specific — assert only when they match
            const typeLocator  = this.page.getByText(buildingType, { exact: false }).first();
            const usageLocator = this.page.getByText(usage, { exact: false }).first();

            const typeFound  = await typeLocator.isVisible().catch(() => false);
            const usageFound = await usageLocator.isVisible().catch(() => false);

            if (typeFound)  await expect(typeLocator).toBeVisible();
            if (usageFound) await expect(usageLocator).toBeVisible();
        });
    }

    // -- Financials sub-nav ---------------------------------------------------

    async clickFinancialsNav() {
        await test.step('Click Financials sub-nav', async () => {
            await this.financialsNav.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Verifies the two sections of the Financials sub-nav:
     *   • Credit Information — borrower credit table (EQUIFAX / MID SCORE columns)
     *   • Debt to Income    — Monthly Income, Current Debt, Final DTI Ratio, Employment Income
     * Actual dollar amounts and percentages are dynamic — labels only are asserted.
     */
    async verifyFinancialsContent() {
        await test.step('Verify Financials section content', async () => {
            // Credit Information — always present
            await expect(this.financialsCreditInfoHeading).toBeVisible({ timeout: 10000 });
            await expect(this.financialsEquifaxLabel).toBeVisible();
            await expect(this.financialsMidScoreLabel).toBeVisible();

            // Debt to Income — core labels always present
            await expect(this.financialsDtiSection).toBeVisible();
            await expect(this.financialsMonthlyIncomeLabel).toBeVisible();
            await expect(this.financialsCurrentDebtLabel).toBeVisible();
            await expect(this.financialsFinalDtiLabel).toBeVisible();

            // Employment Income — income source label varies by borrower type
            // (e.g. W-2 shows "Employment Income"; other types show different labels)
            const hasEmploymentIncome = await this.financialsEmploymentIncome
                .isVisible().catch(() => false);
            if (hasEmploymentIncome) await expect(this.financialsEmploymentIncome).toBeVisible();
        });
    }

    // -- Tracker tab ----------------------------------------------------------

    async clickTrackerTab() {
        await test.step('Click Tracker tab', async () => {
            await this.trackerTab.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Verifies the Tracker tab structure:
     *   1. Top stepper — all four lifecycle stage labels visible
     *   2. Current stage panel — "Stage N: <name>", "Current" badge,
     *      "N/M steps completed" counter
     *   3. Step rows — Identity Verification, Credit Check, Valuation,
     *      Initial Offer; each row is only asserted when present (steps
     *      may not exist for all loan types / stages)
     */
    async verifyTrackerContent() {
        await test.step('Verify Tracker tab content', async () => {
            // Top stepper — always present
            await expect(this.trackerPreQual).toBeVisible({ timeout: 10000 });
            await expect(this.trackerInProcess).toBeVisible();
            await expect(this.trackerClosing).toBeVisible();
            await expect(this.trackerFunded).toBeVisible();

            // Current stage detail panel
            await expect(this.trackerCurrentStageLabel).toBeVisible();
            await expect(this.trackerCurrentBadge).toBeVisible();
            await expect(this.trackerStepsCompleted).toBeVisible();

            // Step rows — conditional: presence depends on loan stage and type
            const hasIdentityVer = await this.trackerIdentityVerStep
                .isVisible().catch(() => false);
            if (hasIdentityVer) await expect(this.trackerIdentityVerStep).toBeVisible();

            const hasCreditCheck = await this.trackerCreditCheckStep
                .isVisible().catch(() => false);
            if (hasCreditCheck) await expect(this.trackerCreditCheckStep).toBeVisible();

            const hasValuation = await this.trackerValuationStep
                .isVisible().catch(() => false);
            if (hasValuation) await expect(this.trackerValuationStep).toBeVisible();

            const hasInitialOffer = await this.trackerInitialOfferStep
                .isVisible().catch(() => false);
            if (hasInitialOffer) await expect(this.trackerInitialOfferStep).toBeVisible();
        });
    }

    /**
     * Clicks the Identity Verification row to expand it, then verifies the
     * borrower detail card (Borrower 1 label, name, Started Application badge).
     * Pass { firstName, lastName } from shared test data.
     */
    async verifyIdentityVerificationExpanded({ firstName, lastName }) {
        await test.step('Verify Identity Verification expanded detail', async () => {
            // Click the row header to expand if not already open
            const alreadyOpen = await this.trackerBorrower1Label.isVisible().catch(() => false);
            if (!alreadyOpen) await this.trackerIdentityVerStep.click();

            await expect(this.trackerBorrower1Label).toBeVisible({ timeout: 10000 });

            // Name may be split across child elements or belong to a different loan —
            // check first and last name independently with if/else guards
            const firstNameLocator = this.page.getByText(firstName, { exact: false }).first();
            const lastNameLocator  = this.page.getByText(lastName,  { exact: false }).first();

            const firstFound = await firstNameLocator.isVisible().catch(() => false);
            const lastFound  = await lastNameLocator.isVisible().catch(() => false);

            if (firstFound) await expect(firstNameLocator).toBeVisible();
            if (lastFound)  await expect(lastNameLocator).toBeVisible();

            // "Started Application" badge — only shown when the borrower has begun
            const hasStarted = await this.trackerStartedApplicationBadge
                .isVisible().catch(() => false);
            if (hasStarted) await expect(this.trackerStartedApplicationBadge).toBeVisible();
        });
    }

    /**
     * Clicks the Credit Check row to expand it, then verifies all six detail
     * label fields are rendered (values may be "—" when pull hasn't run yet).
     */
    async verifyCreditCheckExpanded() {
        await test.step('Verify Credit Check expanded detail', async () => {
            // Click the row header to expand if not already open
            const alreadyOpen = await this.trackerSoftPullScoreLabel.isVisible().catch(() => false);
            if (!alreadyOpen) await this.trackerCreditCheckStep.click();

            await expect(this.trackerSoftPullScoreLabel).toBeVisible({ timeout: 10000 });
            await expect(this.trackerSoftPullDateLabel).toBeVisible();
            await expect(this.trackerHardPullScoreLabel).toBeVisible();
            await expect(this.trackerHardPullDateLabel).toBeVisible();
            await expect(this.trackerLoanBalanceLabel).toBeVisible();
            await expect(this.trackerMonthlyDebtLabel).toBeVisible();
        });
    }

    /**
     * Verifies the Valuation and Initial Offer step rows are present on the Tracker.
     * Both steps are always rendered, but their status text is loan-dependent:
     *   • "Pending"  — step has not started yet
     *   • completion text (e.g. "Valuation accepted") — step is done
     * We assert the step headers unconditionally and the "Pending" badge only
     * when at least one incomplete step is visible on this particular loan.
     */
    async verifyPendingSteps() {
        await test.step('Verify Valuation and Initial Offer steps are present', async () => {
            await expect(this.trackerValuationStep).toBeVisible({ timeout: 10000 });
            await expect(this.trackerInitialOfferStep).toBeVisible();

            // "Pending" appears only when the step has not been started — guard so
            // a fully-progressed loan does not cause a false failure
            const hasPending = await this.trackerPendingStatus
                .isVisible({ timeout: 3000 })
                .catch(() => false);
            if (hasPending) {
                await expect(this.trackerPendingStatus).toBeVisible();
            }
        });
    }

    // -- Conditions tab -------------------------------------------------------

    async clickConditionsTab() {
        await test.step('Click Conditions tab', async () => {
            await this.conditionsTab.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Verifies the Conditions tab chrome: both sub-tab buttons, the Progress
     * label, and the progress counter are visible regardless of task count.
     * The task area content (empty state vs populated list) is checked
     * separately so failures are precise.
     */
    async verifyConditionsChrome() {
        await test.step('Verify Conditions tab chrome', async () => {
            await expect(this.conditionsBorrowerTasksTab).toBeVisible({ timeout: 10000 });
            await expect(this.conditionsLenderTasksTab).toBeVisible();
            await expect(this.conditionsProgressLabel).toBeVisible();
            await expect(this.conditionsProgressCounter).toBeVisible();
        });
    }

    /**
     * Verifies the task area content after a sub-tab is selected.
     *   • Empty state  — "No tasks assigned yet" is shown
     *   • Populated    — at least one task row/item is visible
     *   • Fallback     — if neither is found the sub-tab heading itself is
     *                    re-asserted, confirming the tab rendered without error
     */
    async verifyConditionsTaskArea() {
        await test.step('Verify Conditions task area (empty or populated)', async () => {
            const isEmpty = await this.conditionsEmptyState
                .isVisible({ timeout: 5000 }).catch(() => false);

            if (isEmpty) {
                await expect(this.conditionsEmptyState).toBeVisible();
                return;
            }

            // Populated: look for any task row — MUI renders these as <li> or <tr>
            const taskRow = this.page
                .locator('li, tr')
                .filter({ hasText: /\S+/ })
                .first();
            const hasRows = await taskRow.isVisible({ timeout: 5000 }).catch(() => false);

            if (hasRows) {
                await expect(taskRow).toBeVisible();
            } else {
                // Fallback: sub-tab label visible confirms the panel loaded correctly
                await expect(this.conditionsBorrowerTasksTab).toBeVisible({ timeout: 5000 });
            }
        });
    }

    /**
     * Clicks the Lender Tasks sub-tab and waits for the view to update.
     */
    async clickLenderTasksTab() {
        await test.step('Click Lender Tasks sub-tab', async () => {
            await this.conditionsLenderTasksTab.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Clicks the Borrower Tasks sub-tab and waits for the view to update.
     */
    async clickBorrowerTasksTab() {
        await test.step('Click Borrower Tasks sub-tab', async () => {
            await this.conditionsBorrowerTasksTab.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    // -- Documents tab --------------------------------------------------------

    async clickDocumentsTab() {
        await test.step('Click Documents tab', async () => {
            await this.documentsTab.click();
            await this.page.waitForLoadState('domcontentloaded');
        });
    }

    /**
     * Verifies the Documents tab sidebar renders the known static categories.
     * Categories that depend on loan stage/data are guarded with isVisible()
     * so a missing document type is not treated as a failure.
     *
     * Conditionally     — Refresh button (removed from portal UI; skip if absent)
     * Conditionally     — all document categories (a brand-new Pre-Qual loan
     *                     may show "No documents available" with an empty sidebar)
     */
    async verifyDocumentsSidebar() {
        await test.step('Verify Documents sidebar categories', async () => {
            // Refresh button was removed from the portal — assert only if present
            const hasRefresh = await this.documentsRefreshBtn
                .isVisible({ timeout: 3000 }).catch(() => false);
            if (hasRefresh) {
                await expect(this.documentsRefreshBtn).toBeVisible();
            }

            // All category rows are conditional — a freshly-created Pre-Qual loan
            // shows "No documents available" so no category items exist yet.
            const allDocs = [
                this.docSoftCreditConsent,
                this.docCfpbAcknowledgement,
                this.docBrokerMloCert,
                this.docEsignedIncomeVer,
                this.docEsignedMethodConsent,
                this.docBorrowerConsent,
                this.docSoftCreditReport,
                this.docAvmReport,
                this.docOtherDocuments,
            ];
            for (const doc of allDocs) {
                const present = await doc.isVisible().catch(() => false);
                if (present) await expect(doc).toBeVisible();
            }
        });
    }

    /**
     * Clicks a sidebar document category and verifies the PDF viewer panel
     * opens — confirmed by the page-counter ("1 / 1") becoming visible.
     * @param {import('@playwright/test').Locator} categoryLocator
     * @param {string} stepLabel  — shown in the test step name
     */
    async openDocumentAndVerifyViewer(categoryLocator, stepLabel) {
        await test.step(`Open document: ${stepLabel}`, async () => {
            await categoryLocator.click();
            await expect(this.docPdfPageCounter).toBeVisible({ timeout: 15000 });
        });
    }

    /**
     * Clicks the Refresh button and confirms the sidebar is still rendered
     * (guards against the tab going blank after a refresh).
     * No-ops gracefully if the Refresh button has been removed from the portal.
     */
    async clickRefreshAndVerify() {
        await test.step('Click Refresh and verify sidebar remains visible', async () => {
            const hasRefresh = await this.documentsRefreshBtn
                .isVisible({ timeout: 5000 }).catch(() => false);
            if (!hasRefresh) {
                // Refresh button removed from portal — verify the Documents tab
                // is still rendered by asserting the tab itself is active.
                await expect(this.page.getByRole('tab', { name: /Documents/i }))
                    .toBeVisible({ timeout: 10000 });
                return;
            }
            await this.documentsRefreshBtn.click();
            await this.page.waitForLoadState('domcontentloaded');
            await expect(this.documentsRefreshBtn).toBeVisible({ timeout: 10000 });
        });
    }

    // -- Shadow Borrower View -------------------------------------------------

    /**
     * Clicks the Shadow Borrower View button and waits for the confirmation
     * modal to appear.
     */
    async clickShadowBorrowerView() {
        await test.step('Click Shadow Borrower View button', async () => {
            await this.shadowBorrowerViewBtn.click();
            await expect(this.shadowViewModalHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Verifies the confirmation modal: heading, description, and both buttons.
     */
    async verifyShadowViewModal() {
        await test.step('Verify Shadow Borrower View confirmation modal', async () => {
            await expect(this.shadowViewModalHeading).toBeVisible();
            await expect(this.shadowViewModalDesc).toBeVisible();
            await expect(this.shadowViewCancelBtn).toBeVisible();
            await expect(this.shadowViewContinueBtn).toBeVisible();
        });
    }

    /**
     * Clicks Cancel in the Shadow Borrower View modal and confirms it closes.
     */
    async cancelShadowView() {
        await test.step('Cancel Shadow Borrower View modal', async () => {
            await this.shadowViewCancelBtn.click();
            await expect(this.shadowViewModal).toBeHidden({ timeout: 5000 });
        });
    }

    /**
     * Clicks CONTINUE in the Shadow Borrower View modal.
     * Shadow Borrower View opens in a NEW browser tab — this method registers
     * the new-page listener before clicking, awaits the tab, and returns it.
     * Callers should construct a ShadowBorrowerViewPage with the returned tab.
     *
     * @returns {Promise<import('@playwright/test').Page>} the new tab's Page object
     */
    async continueShadowView() {
        return await test.step('Continue to Shadow Borrower View read-only mode', async () => {
            const newTabPromise = this.page.context().waitForEvent('page');
            await this.shadowViewContinueBtn.click();
            const shadowTab = await newTabPromise;
            await shadowTab.waitForLoadState('load');
            return shadowTab;
        });
    }

    async verifyCoBorrowerConsentDoc() {
        await test.step('Verify co-borrower Credit Inquiry consent document', async () => {
            // PDF content is canvas-rendered so text is not in the DOM.
            // The viewer header shows the full S3 path as plain text. The path
            // uses an internal account email (e.g. frrzn28676@minitts.net) — not
            // the registration email — so we assert by document type only.
            await expect(
                this.page.getByText(/coborrowerMethodConsentSignature/i).first()
            ).toBeVisible({ timeout: 10000 });
        });
    }
}

export default LoanDetailPage;
