import { expect, test } from '../../fixtures';
import { withProcessAppRetry } from '../../utils/routeHelpers';

class MortgagesAndLiensPage {
    constructor(page) {
        this.page = page;

        // -- Mortgage list ------------------------------------------------
        // First mortgage row checkbox (CHASE or whatever Method Fi returns)
        // MUI renders this as a div-based list, not a real <table>
        this.firstMortgageCheckbox = this.page.getByRole('checkbox').first();

        // "Free and clear" option — skips the mortgage table entirely
        this.freeAndClearCheckbox  = this.page.getByRole('checkbox', {
            name: /They own the property free and clear/,
        });

        // -- Fields -------------------------------------------------------
        this.annualHoaFeeInput       = this.page.getByLabel(/Annual HOA Fee/);
        this.requestedLoanAmountInput = this.page.getByLabel(/Requested Loan Amount/);

        // -- Processing screen (appears after Next click) -----------------
        this.processingHeading = this.page.getByText('Processing Application').first();

        // -- Actions ------------------------------------------------------
        this.nextBtn         = this.page.getByRole('button', { name: 'Next' });
        this.backBtn         = this.page.getByRole('button', { name: 'Back' });
        this.saveForLaterBtn = this.page.getByRole('button', { name: 'Save for Later' });
    };
    async fillMortgagesAndLiens(data) {
        await test.step('Fill mortgages & liens', async () => {
            const m = data.mortgages;

            if (m.freeAndClear) {
                // MUI checkbox — native DOM click bypasses React synthetic event system
                await this.freeAndClearCheckbox.evaluate(el => el.click());
            } else if (m.selectFirstMortgage) {
                // Check whether the credit report returned any mortgage rows.
                // When none are returned the page shows a "No mortgages" notice;
                // the only checkbox in the DOM is the free-and-clear one.
                const noMortgages = await this.page
                    .getByText('No mortgages or liens found', { exact: false })
                    .isVisible();
                if (!noMortgages) {
                    // Mortgage rows exist — select the first one
                    await this.firstMortgageCheckbox.evaluate(el => el.click());
                } else {
                    // No rows returned — fall back to free-and-clear so NEXT unlocks.
                    // The credit pull simply found no active mortgages; acknowledging
                    // that is the only way to proceed.
                    await this.freeAndClearCheckbox.evaluate(el => el.click());
                }
            }

            if (m.annualHoaFee) {
                await this.annualHoaFeeInput.clear();
                await this.annualHoaFeeInput.fill(m.annualHoaFee);
                await this.annualHoaFeeInput.press('Tab');
            }

            await this.requestedLoanAmountInput.clear();
            await this.requestedLoanAmountInput.fill(m.requestedLoanAmount);
            await this.requestedLoanAmountInput.press('Tab');
        });
    };
    async clickNext() {
        await test.step('Click Next to proceed to Offer Review', async () => {
            await withProcessAppRetry(this.page, async () => {
                await this.nextBtn.click({ force: true });

                // Wait for processing screen to appear then fully complete
                await this.processingHeading.waitFor({ state: 'visible', timeout: 10000 });
                await this.processingHeading.waitFor({ state: 'hidden', timeout: 200000 });
            });

            // Confirm step 3 content loaded — stepper tab ("Offer Review") appears
            // before the card heading; waiting for the heading guarantees data is ready.
            await this.page.getByText('Pre-Qualification Summary').first()
                .waitFor({ state: 'visible', timeout: 30000 });
        });
    };
};

export default MortgagesAndLiensPage;
