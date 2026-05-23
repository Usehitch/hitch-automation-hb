import { expect, test } from '../../fixtures';
import { checkAllCheckboxes } from '../../utils/checkboxHelpers';

class MloCertificationModal {
    constructor(page) {
        this.page = page;

        this.modal                   = this.page.getByRole('dialog');
        this.modalHeading            = this.modal.getByText('Loan Officer Certifications');
        this.certificationCheckboxes = this.modal.getByRole('checkbox');
        this.brokerMloNameInput      = this.modal.getByLabel('Broker MLO Name');
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
