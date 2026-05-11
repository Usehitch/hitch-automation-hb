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

        // -- Status pipeline --------------------------------------------------
        this.preQualStatus  = this.page.getByText('Pre-Qual').first();
        this.inProcessStatus = this.page.getByText('In Process').first();
        this.closingStatus  = this.page.getByText('Closing').first();
        this.fundedStatus   = this.page.getByText('Funded').first();

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

        // -- Documents tab sidebar items --------------------------------------
        // Target the <button> directly — locator('li, div') matches the outermost
        // ancestor first (DOM order), which is a non-interactive container div.
        this.eSignedMethodConsentItem = this.page.locator('button').filter({
            hasText: 'esigned_method_consent',
        }).first();
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

    async clickDocumentsTab() {
        await test.step('Click Documents tab', async () => {
            await this.documentsTab.click();
            await expect(this.eSignedMethodConsentItem).toBeVisible({ timeout: 15000 });
        });
    }

    async verifyESignedMethodConsent() {
        await test.step('Verify esigned_method_consent section with 2 documents', async () => {
            await expect(this.eSignedMethodConsentItem).toBeVisible();
            await expect(this.eSignedMethodConsentItem).toContainText('2');
        });
    }

    /**
     * Expands the esigned_method_consent section and clicks the co-borrower's document.
     * Identifies the document by co-borrower email (unique per run).
     */
    async openCoBorrowerMethodConsent(coBorrower) {
        await test.step('Open co-borrower method consent document', async () => {
            const coBorrowerDocLink = this.page.getByText(coBorrower.email, { exact: false }).first();
            const isExpanded = await coBorrowerDocLink.isVisible().catch(() => false);
            if (!isExpanded) await this.eSignedMethodConsentItem.click();
            await coBorrowerDocLink.waitFor({ state: 'visible', timeout: 10000 });
            await coBorrowerDocLink.click();
        });
    }

    async verifyCoBorrowerConsentDoc(coBorrower) {
        await test.step('Verify co-borrower Credit Inquiry consent document', async () => {
            // PDF content is canvas-rendered so text is not in the DOM.
            // The viewer header shows the S3 path as plain text — verify both the
            // document type (coborrowerMethodConsentSignature) and the account email.
            await expect(
                this.page.getByText(/coborrowerMethodConsentSignature/i).first()
            ).toBeVisible({ timeout: 10000 });
            await expect(
                this.page.getByText(coBorrower.email, { exact: false }).first()
            ).toBeVisible();
        });
    }
}

export default LoanDetailPage;
