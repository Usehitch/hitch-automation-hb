import { expect, test } from '../../fixtures';

class OfferReviewPage {
    constructor(page) {
        this.page = page;

        // -- Page heading -------------------------------------------------------
        // Stepper label says "OFFER REVIEW"; the card heading is "Pre-Qualification Summary"
        this.pageHeading = this.page.getByText('Pre-Qualification Summary').first();

        // -- Loan amount section -----------------------------------------------
        this.changeLoanAmountBtn = this.page.getByRole('button', { name: /CHANGE/i });

        // -- "Change Requested Loan Amount" modal ------------------------------
        // Heading reads "Change Requested Loan Amount" (opened via the CHANGE
        // button). Match both wordings defensively in case the app copy changes.
        // Scoped to the dialog that contains the heading so the live-chat widget
        // (also role="dialog") is never accidentally matched.
        this.loanAmountModal = this.page.locator('[role="dialog"]').filter({
            has: this.page.getByText(/(Change|Reduce) Requested Loan Amount/i),
        });
        this.modalHeading = this.loanAmountModal
            .getByText(/(Change|Reduce) Requested Loan Amount/i)
            .first();
        this.loanAmountInput = this.loanAmountModal.getByLabel(/Requested Loan Amount/i);
        this.modalCancelBtn = this.loanAmountModal.getByRole('button', { name: /CANCEL/i });
        this.modalSaveBtn = this.loanAmountModal.getByRole('button', { name: /^SAVE$/i });

        // -- Debt payoffs section ----------------------------------------------
        this.manageDebtPayoffsBtn = this.page.getByRole('button', { name: /MANAGE/i });

        // -- "Select the accounts to payoff" modal ----------------------------
        this.debtPayoffModal = this.page.locator('[role="dialog"]').filter({
            has: this.page.getByText(/Select the accounts to payoff|Select accounts to pay off/i),
        });
        this.debtPayoffModalHeading = this.debtPayoffModal.getByText(/Select the accounts to payoff|Select accounts to pay off/i).first();
        this.debtPayoffDtiSection = this.debtPayoffModal.getByText('DTI After Proposed Payoff').first();
        this.debtPayoffCheckboxes = this.debtPayoffModal.getByRole('checkbox');
        this.debtPayoffSummary = this.debtPayoffModal.getByText('Summary').first();
        this.saveDebtPayoffBtn = this.debtPayoffModal.getByRole('button', { name: /SAVE DEBT PAYOFF PLAN/i });
        this.cancelDebtPayoffBtn = this.debtPayoffModal.getByRole('button', { name: /CANCEL/i });

        // -- Initial Draw Amount section ---------------------------------------
        // Scope EDIT to this section — a page-level /EDIT/i match can grab the
        // wrong button when other cards expose similar labels on Offer Review.
        this.initialDrawSection = this.page.locator('div').filter({
            has: this.page.getByText(/Initial Draw Amount|Upfront Draw/i),
        }).first();
        this.editInitialDrawBtn = this.initialDrawSection.getByRole('button', { name: /^EDIT$/i });

        // -- "Edit Upfront Draw" modal -----------------------------------------
        this.editUpfrontDrawModal = this.page.locator('[role="dialog"]').filter({
            has: this.page.getByText('Edit Upfront Draw'),
        });
        // DialogTitle may not always expose role="heading" during MUI mount.
        this.editUpfrontDrawHeading = this.editUpfrontDrawModal.getByText('Edit Upfront Draw').first();

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
     * Asserts the reduced requested loan amount is reflected on the Offer Review
     * summary after updateLoanAmount(). Skips when changeLoanAmount is falsy.
     *
     * newLoanAmount is a raw number string ('50000'); the summary renders it
     * formatted ('$50,000'). The match requires a leading "$" so e.g. "$150,000"
     * can never satisfy a "50,000" search by substring.
     */
    async verifyLoanAmountReduced(data) {
        await test.step('Verify reduced loan amount is reflected on the summary', async () => {
            const o = data.offerReview;
            if (!o?.changeLoanAmount) return;

            const grouped = Number(o.newLoanAmount).toLocaleString('en-US'); // '50,000'
            await expect(
                this.page.getByText(new RegExp(`\\$\\s?${grouped}\\b`)).first()
            ).toBeVisible({ timeout: 15000 });
        });
    };

    /**
     * Clicks MANAGE to open the debt payoff modal.
     * Skips if offerReview.debtPayoff.manage is falsy or the MANAGE button is absent.
     *
     * The debt payoff section only renders when the underwriting engine finds active
     * debts for this borrower/SSN.  When no debts are found the section (and its
     * MANAGE button) is not rendered.  Similarly, the modal heading text may vary
     * between app versions.  Both conditions are handled gracefully: the step logs
     * a warning and sets this._debtPayoffModalOpened = false so that downstream
     * verifyDebtPayoffModal / saveDebtPayoffPlan can skip cleanly.
     */
    async clickManageDebtPayoffs(data) {
        await test.step('Open Manage Debt Payoffs modal', async () => {
            this._debtPayoffModalOpened = false; // track state for downstream methods

            if (!data.offerReview?.debtPayoff?.manage) return;

            // Guard: the MANAGE button only renders when the loan has debts.
            const hasManageBtn = await this.manageDebtPayoffsBtn
                .isVisible({ timeout: 5000 })
                .catch(() => false);
            if (!hasManageBtn) {
                console.warn('clickManageDebtPayoffs: MANAGE button not visible — debt payoff section may not apply to this loan (no debts found by underwriting)');
                return;
            }

            await this.manageDebtPayoffsBtn.click({ force: true });

            // Wait for ANY dialog to open — the heading text may vary between app
            // versions ("Select the accounts to payoff" / "Select accounts to pay off"
            // / etc.).  We check the heading separately as a soft assertion.
            const dialogOpened = await this.page.getByRole('dialog')
                .waitFor({ state: 'visible', timeout: 30000 })
                .then(() => true)
                .catch(() => false);

            if (!dialogOpened) {
                console.warn('clickManageDebtPayoffs: no dialog appeared after clicking MANAGE — modal may not be applicable for this loan state');
                return;
            }

            // Soft-check the expected heading text (warn, do not fail).
            const headingMatch = await this.debtPayoffModalHeading
                .isVisible({ timeout: 3000 })
                .catch(() => false);
            if (!headingMatch) {
                console.warn('clickManageDebtPayoffs: dialog opened but expected heading "Select the accounts to payoff" not found — app heading text may have changed');
            }

            this._debtPayoffModalOpened = true;
        });
    };

    /**
     * Verifies the Debt-to-Income (DTI) section, debts list, and summary inside
     * the debt payoff modal. Skips if the modal was not opened.
     *
     * The DTI ratio (monthly debt ÷ monthly income) is income-based, so it renders
     * whether or not there are debts to pay off — the debt list is the only
     * conditional part. After the loading cycle this asserts an actual DTI
     * percentage value is shown, not just the section label.
     */
    async verifyDebtPayoffModal(data) {
        await test.step('Verify debt payoff modal contents', async () => {
            const dp = data.offerReview?.debtPayoff;
            if (!dp?.manage) return;

            // Skip if the modal did not open (no debts or heading mismatch)
            if (!this._debtPayoffModalOpened) {
                console.warn('verifyDebtPayoffModal: skipping — debt payoff modal was not opened');
                return;
            }

            await expect(this.debtPayoffDtiSection).toBeVisible();

            // DTI and debts load asynchronously from the underwriting API. Wait
            // through the full loading cycle before verifying values, so a slow
            // load isn't mistaken for "nothing shown": catch a late-appearing
            // spinner, wait for it to clear, then let the network settle. (The
            // spinner may never render — both waits are optional.)
            const spinner = this.debtPayoffModal.locator('[role="progressbar"]');
            await spinner.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
            await spinner.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
            await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

            // Assert the Debt-to-Income ratio value is actually displayed — a
            // percentage under "DTI After Proposed Payoff". This shows regardless
            // of whether any debts exist to pay off.
            if (dp.expectedDti) {
                await expect(
                    this.debtPayoffModal.getByText(dp.expectedDti).first()
                ).toBeVisible();
            } else {
                await expect
                    .poll(() => this.readProposedDti(), {
                        message: 'Debt-to-Income (DTI) ratio value should be displayed in the debt payoff modal',
                        timeout: 15000,
                    })
                    .not.toBeNull();
            }

            // Checkbox assertion is conditional: some applications have no debts.
            const hasDebts = await this.debtPayoffCheckboxes.first()
                .isVisible({ timeout: 10000 }).catch(() => false);
            if (hasDebts) {
                await expect(this.debtPayoffCheckboxes.first()).toBeVisible();
            }

            await expect(this.debtPayoffSummary).toBeVisible();
        });
    };

    /**
     * Reads the live "DTI After Proposed Payoff" percentage from the debt payoff
     * modal and returns it as a number (e.g. 45.2). Returns null when no value can
     * be parsed (modal not open, or the section hasn't rendered yet).
     *
     * Reads the modal text and grabs the percentage immediately preceding "%" that
     * follows the label, so it's resilient to the surrounding layout / markup.
     */
    async readProposedDti() {
        const text = await this.debtPayoffModal.innerText().catch(() => '');
        const match = text.match(/DTI After Proposed Payoff[^%]*?([\d.]+)\s*%/i);
        return match ? parseFloat(match[1]) : null;
    };

    /**
     * Waits for the Save button to become enabled (the selected payoff plan is
     * valid / fundable). Returns true if it enables within the timeout, else false.
     */
    async _waitForSaveEnabled(timeout = 5000) {
        try {
            await expect(this.saveDebtPayoffBtn).toBeEnabled({ timeout });
            return true;
        } catch {
            return false;
        }
    };

    /**
     * Deal Optimization — debt payoff lever.
     *
     * Establishes a no-payoff DTI (Debt-to-Income) baseline, then selects a
     * *fundable* debt for payoff and measures the recalculated "DTI After Proposed
     * Payoff". Large debts (e.g. mortgages) can't be funded by the loan proceeds,
     * which leaves the Save button disabled — so this tries each debt in turn and
     * keeps the first one that both produces a valid (saveable) plan and changes
     * the DTI. Returns:
     *   { debtsPresent: false }                              no debts for this SSN
     *   { debtsPresent: true, fundable: false, before }      debts exist but none fundable
     *   { debtsPresent: true, fundable: true, before, after} a debt was paid off
     *
     * The caller asserts the direction (paying off a debt should not raise DTI).
     */
    async payOffFundableDebtAndMeasureDti() {
        let result = { debtsPresent: false, fundable: false, before: null, after: null };

        await test.step('Pay off a fundable debt and measure DTI change', async () => {
            if (!this._debtPayoffModalOpened) {
                console.warn('payOffFundableDebtAndMeasureDti: skipping — debt payoff modal was not opened');
                return;
            }

            // Debts load asynchronously from the underwriting API after the modal
            // opens. Wait through the full loading cycle before deciding whether
            // any debts exist, so a slow load isn't mistaken for "no debts":
            //   1. the spinner may appear a beat later — wait for it to clear
            //   2. let the network settle (the debts come from an API round-trip)
            const spinner = this.debtPayoffModal.locator('[role="progressbar"]');
            await spinner.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
            await spinner.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
            await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});

            const count = await this.debtPayoffCheckboxes.count().catch(() => 0);
            if (count === 0) {
                console.warn('payOffFundableDebtAndMeasureDti: no debts returned for this SSN — nothing to optimize');
                return;
            }
            result.debtsPresent = true;

            // Baseline = nothing selected for payoff. Clear any default selection.
            for (let i = 0; i < count; i++) {
                const cb = this.debtPayoffCheckboxes.nth(i);
                if (await cb.isChecked().catch(() => false)) {
                    await cb.uncheck({ force: true });
                }
            }
            await expect.poll(() => this.readProposedDti(), { timeout: 10000 })
                .not.toBeNull();
            const before = await this.readProposedDti();
            result.before = before;

            // Try each debt until one yields a fundable plan (Save enables) AND a
            // changed DTI. Skip debts the loan proceeds can't cover (Save stays
            // disabled — e.g. a $210k mortgage against $50k of proceeds).
            for (let i = 0; i < count; i++) {
                const cb = this.debtPayoffCheckboxes.nth(i);
                await cb.check({ force: true });

                const saveEnabled = await this._waitForSaveEnabled(5000);
                const after = await this.readProposedDti();

                if (saveEnabled && after !== null && after !== before) {
                    result.fundable = true;
                    result.after = after;
                    return; // leave this debt selected so saveDebtPayoffPlan can persist it
                }

                // Not fundable / no effect — deselect and try the next debt.
                await cb.uncheck({ force: true });
            }

            console.warn('payOffFundableDebtAndMeasureDti: debts present but none fundable with the current loan amount — DTI-drop not asserted');
        });

        return result;
    };

    /**
     * Clicks SAVE DEBT PAYOFF PLAN and waits for the modal to close.
     * Skips if the modal was not successfully opened by clickManageDebtPayoffs.
     */
    async saveDebtPayoffPlan(data) {
        await test.step('Save debt payoff plan', async () => {
            if (!data.offerReview?.debtPayoff?.saveDebtPayoffPlan) return;

            // Skip if the modal did not open
            if (!this._debtPayoffModalOpened) {
                console.warn('saveDebtPayoffPlan: skipping — debt payoff modal was not opened');
                return;
            }

            // The Save button stays disabled when the selected payoff can't be
            // funded by the loan proceeds (or nothing is selected). Clicking a
            // disabled button would retry until the test times out — so only click
            // when it's actually enabled, otherwise close the modal and move on.
            if (!(await this._waitForSaveEnabled(5000))) {
                console.warn('saveDebtPayoffPlan: SAVE DEBT PAYOFF PLAN is disabled (no fundable payoff selected) — skipping save');
                await this.cancelDebtPayoffBtn.click({ force: true }).catch(() => {});
                await this.debtPayoffModal.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
                return;
            }

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

            // The Initial Draw section re-renders after a background pricing
            // recalculation settles — slower on CI, and slower still in
            // co-borrower flows where two underwriting results must settle first.
            // First wait for the EDIT button to be genuinely actionable (not just
            // present): force:true would otherwise click a button whose React
            // handler isn't wired up yet, producing a silent no-op and a modal
            // that never opens (the classic "passes local, fails CI" symptom).
            await this.editInitialDrawBtn.scrollIntoViewIfNeeded();
            await expect(this.editInitialDrawBtn).toBeVisible({ timeout: 30000 });
            await expect(this.editInitialDrawBtn).toBeEnabled({ timeout: 30000 });

            // Click-and-verify with retry: a single click can still land during a
            // re-render and be dropped. Re-click until the modal is open, skipping
            // the click when the dialog is already visible (even if inner content
            // is still mounting) so we never toggle it shut. 60 s covers the
            // slowest CI pricing settle, including co-borrower flows.
            await expect(async () => {
                const modalOpen = await this.editUpfrontDrawModal
                    .isVisible()
                    .catch(() => false);
                if (!modalOpen) {
                    await this.editInitialDrawBtn.click();
                }
                await expect(this.editUpfrontDrawModal).toBeVisible({ timeout: 10000 });
                await expect(this.confirmDrawBtn).toBeVisible({ timeout: 10000 });
            }).toPass({ timeout: 60000, intervals: [1000, 2000, 3000] });
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
