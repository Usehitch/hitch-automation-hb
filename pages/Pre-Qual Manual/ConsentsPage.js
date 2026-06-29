import { expect, test } from '../../fixtures';
import { checkAllCheckboxes } from '../../utils/checkboxHelpers';

class ConsentsPage {
    constructor(page) {
        this.page = page;

        // -- Page heading -------------------------------------------------------
        this.pageHeading = this.page.getByText('Loan Officer Certifications').first();
        this.certificationCard = this.page.locator('div').filter({
            has: this.page.getByText('Please certify the following before continuing'),
        }).first();
        this.certificationCheckboxes = this.certificationCard.getByRole('checkbox');

        // -- Signature section ------------------------------------------------
        this.brokerMloNameInput = this.page.getByLabel('Broker MLO Name');
        this.todaysDateInput    = this.page.getByLabel(/Today's Date/i);

        // -- Actions ----------------------------------------------------------
        this.nextBtn         = this.page.getByRole('button', { name: 'Next' });
        this.backBtn         = this.page.getByRole('button', { name: 'Back' });
        this.saveForLaterBtn = this.page.getByRole('button', { name: 'Save for Later' });
    };

    async checkAllCertifications() {
        await test.step('Check all Loan Officer Certifications', async () => {
            await checkAllCheckboxes(this.certificationCheckboxes);
        });
    };

    async fillBrokerMloName(data) {
        await test.step('Fill Broker MLO Name', async () => {
            await this.brokerMloNameInput.scrollIntoViewIfNeeded();
            await this.brokerMloNameInput.fill(data.consent.brokerMloName);
        });
    };
    
    async verifySignature(data) {
        await test.step('Verify signature fields', async () => {
            await expect(this.brokerMloNameInput).toHaveValue(data.consent.brokerMloName);
        });
    };

    async clickNext() {
        await test.step('Click Next to submit consents', async () => {
            await this.nextBtn.click({ force: true });
            // Wait for the confirmation banner to confirm submission succeeded.
            // Submitting consents kicks off backend finalization (credit pull +
            // offer calc) which can take ~200 s on staging, so this banner is
            // slow to appear — 30 s was too tight and flaked. Callers set an
            // 11-min test timeout, so a 4-min wait here is well within budget.
            await this.page
                .getByText('Pre-Qualified — Ready for Borrower Review')
                .first()
                .waitFor({ state: 'visible', timeout: 240000 });
        });
    };
};

export default ConsentsPage;
