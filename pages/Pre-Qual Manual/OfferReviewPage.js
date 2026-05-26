import { expect, test } from '../../fixtures';

class OfferReviewPage {
    constructor(page) {
        this.page = page;

        // -- Page heading -------------------------------------------------------
        // Stepper label says "OFFER REVIEW"; the card heading is "Pre-Qualification Summary"
        this.pageHeading = this.page.getByText('Pre-Qualification Summary').first();

        // -- Loan amount section -----------------------------------------------
        this.changeLoanAmountBtn = this.page.getByRole('button', { name: /CHANGE/i });

        // -- "Reduce Requested Loan Amount" modal ------------------------------
        this.loanAmountModal = this.page.getByRole('dialog');
        this.modalHeading = this.loanAmountModal.getByText('Reduce Requested Loan Amount');
        this.loanAmountInput = this.loanAmountModal.getByLabel(/Requested Loan Amount/i);
        this.modalCancelBtn = this.loanAmountModal.getByRole('button', { name: /CANCEL/i });
        this.modalSaveBtn = this.loanAmountModal.getByRole('button', { name: /^SAVE$/i });

        // -- Debt payoffs section ----------------------------------------------
        this.manageDebtPayoffsBtn = this.page.getByRole('button', { name: /MANAGE/i });

        // -- "Select the accounts to payoff" modal ----------------------------
        this.debtPayoffModal = this.page.getByRole('dialog');
        this.debtPayoffModalHeading = this.debtPayoffModal.getByText('Select the accounts to payoff');
        this.debtPayoffDtiSection = this.debtPayoffModal.getByText('DTI After Proposed Payoff').first();
        this.debtPayoffCheckboxes = this.debtPayoffModal.getByRole('checkbox');
        this.debtPayoffSummary = this.debtPayoffModal.getByText('Summary').first();
        this.saveDebtPayoffBtn = this.debtPayoffModal.getByRole('button', { name: /SAVE DEBT PAYOFF PLAN/i });
        this.cancelDebtPayoffBtn = this.debtPayoffModal.getByRole('button', { name: /CANCEL/i });

        // -- Initial Draw Amount section ---------------------------------------
        this.editInitialDrawBtn = this.page.getByRole('button', { name: /EDIT/i });

        // -- "Edit Upfront Draw" modal -----------------------------------------
        this.editUpfrontDrawModal = this.page.getByRole('dialog');
        this.editUpfrontDrawHeading = this.editUpfrontDrawModal.getByText('Edit Upfront Draw');

        // Read-only summary rows inside the modal
        this.availableDrawRow = this.editUpfrontDrawModal.getByText('Available Draw');
        this.drawAmountRow = this.editUpfrontDrawModal.getByText('Draw Amount');
        this.closingCostRow = this.editUpfrontDrawModal.getByText('Closing Cost');
        this.cashToBorrowerRow = this.editUpfrontDrawModal.getByText('Cash to Borrower');

        // MUI slider — [role="slider"] carries aria-valuenow with the live percent
        this.drawSliderThumb = this.editUpfrontDrawModal.getByRole('slider');

        // Modal buttons
        this.confirmDrawBtn = this.editUpfrontDrawModal.getByRole('button', { name: /CONFIRM/i });
        this.cancelDrawBtn = this.editUpfrontDrawModal.getByRole('button', { name: /CANCEL/i });

        // -- DTI acknowledgment (required when DTI exceeds 50%) ----------------
        this.dtiAcknowledgmentCheckbox = this.page.getByRole('checkbox', {
            name: /I understand my DTI is above the allowable limit/i,
        });

        // -- Step 4 confirmation (used in clickNext wait) ----------------------
        this.consentsHeading = this.page.getByText('Loan Officer Certifications').first();

        // -- Actions -----------------------------------------------------------
        this.nextBtn = this.page.getByRole('button', { name: 'Next' });
        this.backBtn = this.page.getByRole('button', { name: 'Back' });
        this.saveForLaterBtn = this.page.getByRole('button', { name: 'Save for Later' });
    };

    // --------------------------------------------------------------------------

    /**
     * Opens the "Reduce Requested Loan Amount" modal, sets a new amount, and saves.
     * Skips if offerReview.changeLoanAmount is falsy.
     */
    async updateLoanAmount(data) {
        await test.step('Update requested loan amount', async () => {
            const o = data.offerReview;
            if (!o?.changeLoanAmount) return;

            await this.changeLoanAmountBtn.click({ force: true });
            await this.modalHeading.waitFor({ state: 'visible', timeout: 10000 });

            await this.loanAmountInput.clear();
            await this.loanAmountInput.fill(o.newLoanAmount);

            await this.modalSaveBtn.click();
            await this.loanAmountModal.waitFor({ state: 'hidden', timeout: 10000 });
        });
    };

    /**
     * Clicks MANAGE to open the debt payoff modal.
     * Skips if offerReview.debtPayoff.manage is falsy.
     */
    async clickManageDebtPayoffs(data) {
        await test.step('Open Manage Debt Payoffs modal', async () => {
            if (!data.offerReview?.debtPayoff?.manage) return;

            await this.manageDebtPayoffsBtn.click({ force: true });
            // 30 s — the debt payoff modal fetches debt data asynchronously
            // before rendering its heading; CI latency can push this past 10 s.
            await this.debtPayoffModalHeading.waitFor({ state: 'visible', timeout: 30000 });
        });
    };

    /**
     * Verifies DTI section, debts list, and summary inside the debt payoff modal.
     */
    async verifyDebtPayoffModal(data) {
        await test.step('Verify debt payoff modal contents', async () => {
            const dp = data.offerReview?.debtPayoff;
            if (!dp?.manage) return;

            await expect(this.debtPayoffDtiSection).toBeVisible();

            if (dp.expectedDti) {
                await expect(
                    this.debtPayoffModal.getByText(dp.expectedDti).first()
                ).toBeVisible();
            }

            // Debts load asynchronously — wait for the loading spinner to disappear
            // before checking whether any debt checkboxes are present.
            await this.debtPayoffModal
                .locator('[role="progressbar"]')
                .waitFor({ state: 'hidden', timeout: 15000 })
                .catch(() => {}); // not all applications have debts; spinner may not appear

            // Checkbox assertion is conditional: some applications have no debts.
            const hasDebts = await this.debtPayoffCheckboxes.first()
                .isVisible({ timeout: 3000 }).catch(() => false);
            if (hasDebts) {
                await expect(this.debtPayoffCheckboxes.first()).toBeVisible();
            }

            await expect(this.debtPayoffSummary).toBeVisible();
        });
    };

    /**
     * Clicks SAVE DEBT PAYOFF PLAN and waits for the modal to close.
     */
    async saveDebtPayoffPlan(data) {
        await test.step('Save debt payoff plan', async () => {
            if (!data.offerReview?.debtPayoff?.saveDebtPayoffPlan) return;

            await this.saveDebtPayoffBtn.click();
            await this.debtPayoffModal.waitFor({ state: 'hidden', timeout: 10000 });
        });
    };

    // --------------------------------------------------------------------------

    /**
     * Opens the "Edit Upfront Draw" modal via the EDIT button.
     * Skips if offerReview.initialDraw.edit is falsy.
     */
    async clickEditInitialDraw(data) {
        await test.step('Open Edit Upfront Draw modal', async () => {
            if (!data.offerReview?.initialDraw?.edit) return;

            await this.editInitialDrawBtn.click({ force: true });
            await this.editUpfrontDrawHeading.waitFor({ state: 'visible', timeout: 10000 });
        });
    };

    /**
     * Verifies the read-only summary rows inside the Edit Upfront Draw modal.
     * If expected values are supplied in data they are asserted; otherwise just
     * confirms the rows are visible.
     */
    async verifyUpfrontDrawModal(data) {
        await test.step('Verify Edit Upfront Draw modal contents', async () => {
            const id = data.offerReview?.initialDraw;
            if (!id?.edit) return;

            await expect(this.availableDrawRow).toBeVisible();
            await expect(this.drawAmountRow).toBeVisible();
            await expect(this.closingCostRow).toBeVisible();
            await expect(this.cashToBorrowerRow).toBeVisible();

            if (id.expectedAvailableDraw) {
                await expect(
                    this.editUpfrontDrawModal.getByText(id.expectedAvailableDraw).first()
                ).toBeVisible();
            }
        });
    };

    /**
     * Adjusts the upfront draw slider to the target percentage (75–100).
     * Reads aria-valuenow from the MUI thumb, then nudges with arrow keys.
     * Skips if drawPercent is not provided.
     */
    async setDrawPercent(data) {
        await test.step('Set upfront draw percentage', async () => {
            const id = data.offerReview?.initialDraw;
            if (!id?.edit || id.drawPercent === undefined) return;

            const target = id.drawPercent;

            // Focus the slider thumb so it accepts keyboard events
            await this.drawSliderThumb.focus();

            const currentRaw = await this.drawSliderThumb.getAttribute('aria-valuenow');
            const current = parseInt(currentRaw ?? '100', 10);
            const delta = target - current;

            if (delta === 0) return;

            const key = delta < 0 ? 'ArrowLeft' : 'ArrowRight';
            const steps = Math.abs(delta);

            for (let i = 0; i < steps; i++) {
                await this.page.keyboard.press(key);
            }
        });
    };

    /**
     * Clicks CONFIRM and waits for the modal to close.
     */
    async confirmUpfrontDraw(data) {
        await test.step('Confirm upfront draw', async () => {
            if (!data.offerReview?.initialDraw?.confirm) return;

            await this.confirmDrawBtn.click();
            await this.editUpfrontDrawModal.waitFor({ state: 'hidden', timeout: 10000 });
        });
    };

    // --------------------------------------------------------------------------

    /**
     * Checks the "I understand my DTI is above the allowable limit" checkbox
     * when it is visible. The checkbox only appears when DTI > 50%, and DTI is
     * dynamic — so we check for actual visibility rather than relying on a data
     * flag. If visible, it must be checked before NEXT becomes enabled.
     */
    async acknowledgeDtiLimit() {
        await test.step('Acknowledge DTI above allowable limit (if required)', async () => {
            const isVisible = await this.dtiAcknowledgmentCheckbox.isVisible().catch(() => false);
            if (!isVisible) return;

            await this.dtiAcknowledgmentCheckbox.scrollIntoViewIfNeeded();
            await this.dtiAcknowledgmentCheckbox.check({ force: true });
        });
    };

    async clickNext() {
        await test.step('Click Next to proceed to Consents', async () => {
            await this.nextBtn.scrollIntoViewIfNeeded();
            await this.nextBtn.click({ force: true });

            // Staging can be slow processing the offer submission — wait up to 200 s (co-borrower flows run two credit pulls).
            // If still on Offer Review after 10 s, retry the click once (handles the
            // case where the first click fired before the button was fully ready).
            try {
                await this.consentsHeading.waitFor({ state: 'visible', timeout: 10000 });
            } catch {
                const stillOnOfferReview = await this.pageHeading.isVisible().catch(() => false);
                if (stillOnOfferReview) {
                    await this.nextBtn.click({ force: true });
                }
                await this.consentsHeading.waitFor({ state: 'visible', timeout: 200000 });
            }
        });
    };
};

export default OfferReviewPage;
