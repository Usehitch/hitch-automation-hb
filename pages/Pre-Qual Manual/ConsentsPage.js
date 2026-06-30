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

            // Blur the signature fields so the form's onBlur/onTouched validation
            // fires. A bare .fill() puts the value in the DOM but leaves focus in
            // the field, so the form's isValid never flips true and the Next button
            // stays disabled — the caller then force-clicks a dead button and waits
            // out the full finalization timeout. Tab moves focus onto the auto-
            // populated "Today's Date" field; blur that too so both register as
            // touched. Mirrors the Tab-after-fill commit pattern used throughout
            // NewApplicationPage.fillApplicationDetails.
            await this.brokerMloNameInput.press('Tab');
            await this.todaysDateInput.press('Tab');
        });
    };
    
    async verifySignature(data) {
        await test.step('Verify signature fields', async () => {
            await expect(this.brokerMloNameInput).toHaveValue(data.consent.brokerMloName);
        });
    };

    async clickNext() {
        await test.step('Click Next to submit consents', async () => {
            // Next stays disabled until every certification checkbox is checked
            // AND the signature fields validate (they must be filled AND blurred —
            // see fillBrokerMloName). Force-clicking a disabled button silently
            // no-ops, after which the banner wait below would burn the entire
            // finalization timeout for nothing. Assert it enables first and fail
            // fast with a diagnostic if it doesn't. force:true is still used for
            // the click itself to punch through the bottom-right chat-bubble
            // overlay, which is safe once we know the button is enabled.
            await expect(
                this.nextBtn,
                'Consents NEXT did not enable within 30s — a certification checkbox is unchecked or a signature field failed to validate (it must be filled AND blurred). See the attached screenshot.'
            ).toBeEnabled({ timeout: 30000 });

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
