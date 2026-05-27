import { expect, test } from '../../fixtures';
import { checkAllCheckboxes } from '../../utils/checkboxHelpers';

class MloCertificationModal {
    constructor(page) {
        this.page = page;

        // Scope to the specific dialog containing the certification heading so that
        // the live-chat widget (also role="dialog") is never accidentally matched.
        this.modal                   = this.page.locator('[role="dialog"]').filter({
            has: this.page.getByText('Loan Officer Certifications'),
        });
        this.modalHeading            = this.modal.getByText('Loan Officer Certifications');
        this.certificationCheckboxes = this.modal.getByRole('checkbox');

        // Locate the Broker MLO Name text input.
        //
        // Strategy: find the first visible, non-readonly textbox in the modal.
        // Today's Date is auto-filled (readonly/disabled); the Broker MLO Name
        // field is the only user-editable text input, so .first() reliably picks it.
        //
        // Why not getByLabel()? MUI floating labels use aria-labelledby chains that
        // getByLabel() doesn't traverse, and the exact portal label text varies
        // ("Broker MLO Name", "Broker / MLO Name", etc.).
        // Why getByRole('textbox')?  It only matches VISIBLE text inputs — it skips
        // type="hidden" inputs that MUI injects, preventing strict-mode multi-match.
        this.brokerMloNameInput      = this.modal
            .getByRole('textbox')
            .filter({ hasNot: this.page.locator('[readonly], [disabled]') })
            .first();
        this.todaysDateInput         = this.modal.getByLabel(/Today's Date/i);
        this.submitBtn               = this.modal.getByRole('button', { name: /SUBMIT/i });
        this.cancelBtn               = this.modal.getByRole('button', { name: /CANCEL/i });
    }

    async waitForModal() {
        await test.step('Wait for MLO Certification modal', async () => {
            // 20 s — the modal can take longer to open on CI when the certify
            // request triggers background underwriting checks before rendering.
            await expect(this.modalHeading).toBeVisible({ timeout: 20000 });
        });
    }

    async checkAllCertifications() {
        await test.step('Check all certification checkboxes', async () => {
            await checkAllCheckboxes(this.certificationCheckboxes);
        });
    }

    async fillBrokerMloName(name) {
        await test.step('Fill Broker MLO Name', async () => {
            // Wait for the field to exist in the DOM before trying to scroll to it.
            // scrollIntoViewIfNeeded waits for visibility (not just attachment), so
            // a missing element spins for the full test timeout without a clear error.
            await this.brokerMloNameInput.waitFor({ state: 'visible', timeout: 15000 });
            await this.brokerMloNameInput.scrollIntoViewIfNeeded();
            await this.brokerMloNameInput.fill(name);
        });
    }

    async submit() {
        await test.step('Submit MLO certification', async () => {
            await this.submitBtn.scrollIntoViewIfNeeded();
            await this.submitBtn.click();
            await expect(this.modal).toBeHidden({ timeout: 15000 });
        });
    }
}

export default MloCertificationModal;
