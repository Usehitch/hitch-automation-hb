import { expect, test } from '../../fixtures';

class ConfirmationPage {
    constructor(page) {
        this.page = page;

        // -- Success banner ----------------------------------------------------
        this.successHeading = this.page.getByText('Pre-Qualified — Ready for Borrower Review').first();

        // -- Loan summary fields -----------------------------------------------
        this.requestedLoanAmountLabel  = this.page.getByText('Requested Loan Amount').first();
        this.productLabel              = this.page.getByText('Product').first();
        this.interestRateLabel         = this.page.getByText(/Interest Rate/i).first();
        this.estimatedMonthlyPayLabel  = this.page.getByText(/Estimated Monthly Payment/i).first();
        this.debtToIncomeLabel         = this.page.getByText('Debt to Income').first();

        // -- Next Steps sidebar ------------------------------------------------
        this.nextStepsSection = this.page.getByText('Next Steps').first();
        this.emailSentStatus  = this.page.getByText('Email Sent').first();

        // -- Offer sent toast --------------------------------------------------
        // Contains "Offer successfully sent to <email>" — we verify via the email
        this.offerSentToast = this.page.getByText(/Offer successfully sent to/i).first();

        // -- Buttons -----------------------------------------------------------
        this.copyBorrowerAppLinkBtn = this.page.getByRole('button', { name: /COPY BORROWER APP LINK/i });
        this.downloadPdfBtn         = this.page.getByRole('button', { name: /DOWNLOAD PDF/i });
        this.closeBtn               = this.page.getByRole('button', { name: /CLOSE/i });

        // -- Portal dashboard (post-close redirect) ----------------------------
        // Overview is the first pipeline section on the portal
        this.portalPipelineSection  = this.page.getByText('Overview').first();
    };

    // --------------------------------------------------------------------------

    /**
     * Verifies the key elements of the success confirmation screen.
     * Uses the applicant email (not name) for the offer-sent toast assertion,
     * consistent with org data guidelines.
     */
    async verifyConfirmation(data) {
        await test.step('Verify pre-qual confirmation screen', async () => {
            // Success banner
            await expect(this.successHeading).toBeVisible();

            // Loan summary rows visible
            await expect(this.requestedLoanAmountLabel).toBeVisible();
            await expect(this.productLabel).toBeVisible();
            await expect(this.interestRateLabel).toBeVisible();
            await expect(this.estimatedMonthlyPayLabel).toBeVisible();
            await expect(this.debtToIncomeLabel).toBeVisible();

            // Next Steps sidebar
            await expect(this.nextStepsSection).toBeVisible();
            await expect(this.emailSentStatus).toBeVisible();

            // Offer-sent toast — identified by loan email, not borrower name
            await expect(this.offerSentToast).toBeVisible();
            await expect(this.offerSentToast).toContainText(data.applicant.email);
        });
    };

    /**
     * Clicks "COPY BORROWER APP LINK".
     * Copies the offer link to the clipboard — no visible state change to assert,
     * but we confirm the button is enabled and clickable.
     */
    async clickCopyBorrowerAppLink() {
        await test.step('Copy borrower app link', async () => {
            await expect(this.copyBorrowerAppLinkBtn).toBeEnabled();
            await this.copyBorrowerAppLinkBtn.click({ force: true });
        });
    };

    /**
     * Clicks "DOWNLOAD PDF" only if the button is enabled.
     * In the sandbox the button is often disabled — skips gracefully if so.
     */
    async clickDownloadPdf() {
        await test.step('Download PDF (if enabled)', async () => {
            const isEnabled = await this.downloadPdfBtn.isEnabled().catch(() => false);
            if (!isEnabled) return;
            await this.downloadPdfBtn.click({ force: true });
        });
    };

    /**
     * Clicks CLOSE and waits for the portal dashboard to load.
     */
    async clickClose() {
        await test.step('Close confirmation and return to portal', async () => {
            await this.closeBtn.click({ force: true });

            // Wait for the portal URL (no sub-path) and the pipeline section
            await this.page.waitForURL(/\/portal$/, { timeout: 15000 });
            await this.portalPipelineSection.waitFor({ state: 'visible', timeout: 15000 });
        });
    };
};

export default ConfirmationPage;
