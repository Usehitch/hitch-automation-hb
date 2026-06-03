import { expect, test } from '../../fixtures';

class NewEmailTemplatePage {
    constructor(page) {
        this.page = page;

        // -- Page heading & navigation ----------------------------------------
        this.pageHeading = this.page.getByRole('heading', { name: /New Email Template/i });
        this.goBackLink  = this.page.getByRole('link', { name: /GO BACK/i })
            .or(this.page.getByText(/GO BACK/i)).first();

        // -- Top-row fields ---------------------------------------------------
        // Event: MUI Select combobox
        this.eventDropdown    = this.page.getByRole('combobox').first();
        // Template Name: plain text input (label "Template Name *")
        this.templateNameInput = this.page.getByLabel(/Template Name/i);
        // Subject: text input (label "Subject *")
        this.subjectInput      = this.page.getByLabel(/Subject/i);
        // Delay: numeric input
        this.delayInput        = this.page.getByLabel(/^Delay$/i);
        // Delay Type: MUI Select (seconds / minutes / hours / days)
        this.delayTypeDropdown = this.page.getByRole('combobox').nth(1);
        // Status: MUI Select (Inactive / Active)
        this.statusDropdown    = this.page.getByRole('combobox').nth(2);

        // -- Email Recipients — To --------------------------------------------
        this.toInput              = this.page.getByPlaceholder(/Enter emails separated by whitespace/i).nth(0);
        this.toApplicantCheckbox  = this.page.locator('section, div').filter({ hasText: /^To$/ })
            .getByRole('checkbox', { name: /Applicant/i }).first();

        // -- Email Recipients — CC --------------------------------------------
        this.ccInput              = this.page.getByPlaceholder(/Enter emails separated by whitespace/i).nth(1);

        // -- Email Recipients — BCC -------------------------------------------
        this.bccInput             = this.page.getByPlaceholder(/Enter emails separated by whitespace/i).nth(2);

        // -- Rich text editor body --------------------------------------------
        // ProseMirror / Tiptap renders as a contenteditable div
        this.bodyEditor = this.page.locator('[contenteditable="true"]').first();

        // -- Bottom action buttons (form page) --------------------------------
        this.sendTestEmailBtn = this.page.getByRole('button', { name: /SEND TEST EMAIL/i });
        this.previewEmailBtn  = this.page.getByRole('button', { name: /PREVIEW EMAIL/i });
        this.saveAsDraftBtn   = this.page.getByRole('button', { name: /SAVE AS DRAFT/i });
        this.saveBtn          = this.page.getByRole('button', { name: /^SAVE$/i });

        // -- Success / error toasts -------------------------------------------
        // MUI Snackbar toast shown after SEND TEST EMAIL completes
        this.sendSuccessToast = this.page.getByText(/Email sent successfully/i).first();

        // -- Preview modal ----------------------------------------------------
        // Scoped to the dialog that contains the "Preview" heading so the
        // live-chat widget (also role="dialog") is never accidentally matched.
        this.previewModal          = this.page.locator('[role="dialog"]').filter({
            has: this.page.getByRole('heading', { name: /^Preview$/i }),
        });
        this.previewHeading        = this.previewModal.getByRole('heading', { name: /^Preview$/i });
        this.previewCloseXBtn      = this.previewModal.getByRole('button', { name: /close/i })
            .or(this.previewModal.locator('button').filter({ has: this.page.locator('svg') }).first());
        // Email content area inside the preview (iframe or inner div)
        this.previewEmailBody      = this.previewModal.locator('iframe, [class*="preview"], [class*="email-body"]').first();
        // Unsubscribe footer — always rendered regardless of template content
        this.previewUnsubscribeText = this.previewModal.getByText(/unsubscribe/i).first();
        // Buttons inside the preview modal
        this.saveEmailTemplateBtn  = this.previewModal.getByRole('button', { name: /SAVE EMAIL TEMPLATE/i });
        this.sendTestEmailPreviewBtn = this.previewModal.getByRole('button', { name: /SEND TEST EMAIL/i });
        this.closePreviewBtn       = this.previewModal.getByRole('button', { name: /CLOSE PREVIEW/i });
    }

    // --------------------------------------------------------------------------

    /** Wait for the New Email Template form to be fully loaded. */
    async waitForForm() {
        await test.step('Wait for New Email Template form', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
            await expect(this.templateNameInput).toBeVisible({ timeout: 10000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Click SEND TEST EMAIL on the form page and assert the success toast.
     * The toast reads "Email sent successfully" and auto-dismisses — we give
     * it 15 s to appear (the server-side send can be slow in staging).
     */
    async sendTestEmail() {
        await test.step('Send test email and verify success toast', async () => {
            await this.sendTestEmailBtn.click();
            await expect(this.sendSuccessToast).toBeVisible({ timeout: 15000 });
        });
    }

    // --------------------------------------------------------------------------

    /** Click PREVIEW EMAIL and wait for the Preview modal to open. */
    async openPreview() {
        await test.step('Open Preview Email modal', async () => {
            await this.previewEmailBtn.click();
            await expect(this.previewHeading).toBeVisible({ timeout: 10000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Assert the Preview modal contains all expected elements:
     *   • "Preview" heading
     *   • Email body / preview area
     *   • Unsubscribe footer text
     *   • SAVE EMAIL TEMPLATE, SEND TEST EMAIL, CLOSE PREVIEW buttons
     */
    async verifyPreviewModal() {
        await test.step('Verify Preview modal structure', async () => {
            await expect(this.previewHeading).toBeVisible();
            await expect(this.previewUnsubscribeText).toBeVisible();
            await expect(this.saveEmailTemplateBtn).toBeVisible();
            await expect(this.sendTestEmailPreviewBtn).toBeVisible();
            await expect(this.closePreviewBtn).toBeVisible();
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Click CLOSE PREVIEW and wait for the modal to dismiss.
     * Returns focus to the template form.
     */
    async closePreview() {
        await test.step('Close Preview modal', async () => {
            await this.closePreviewBtn.click();
            await expect(this.previewModal).toBeHidden({ timeout: 10000 });
            // Confirm we are back on the form
            await expect(this.previewEmailBtn).toBeVisible({ timeout: 5000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Click SAVE EMAIL TEMPLATE from inside the Preview modal.
     * Waits for the modal to close and the list page to load.
     */
    async saveFromPreview() {
        await test.step('Save template from Preview modal', async () => {
            await this.saveEmailTemplateBtn.click();
            await expect(this.previewModal).toBeHidden({ timeout: 10000 });
            await this.page.getByRole('heading', { name: 'Email Templates' })
                .waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Assert all form sections are present on the page.
     * Checks fields, recipient areas, editor, and action buttons.
     */
    async verifyFormStructure() {
        await test.step('Verify New Email Template form structure', async () => {
            await expect(this.pageHeading).toBeVisible();
            await expect(this.goBackLink).toBeVisible();

            // Top-row fields
            await expect(this.templateNameInput).toBeVisible();
            await expect(this.subjectInput).toBeVisible();
            await expect(this.delayInput).toBeVisible();
            await expect(this.saveAsDraftBtn).toBeVisible();
            await expect(this.saveBtn).toBeVisible();

            // Recipients
            await expect(this.toInput).toBeVisible();
            await expect(this.ccInput).toBeVisible();
            await expect(this.bccInput).toBeVisible();

            // Rich text editor
            await expect(this.bodyEditor).toBeVisible();

            // Action buttons
            await expect(this.sendTestEmailBtn).toBeVisible();
            await expect(this.previewEmailBtn).toBeVisible();
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Assert the Event dropdown contains the expected options.
     * Verifies a representative subset — not every option.
     */
    async verifyEventDropdownOptions() {
        await test.step('Verify Event dropdown lists available options', async () => {
            // Open the dropdown
            await this.eventDropdown.click();
            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 10000 });

            // Check a representative subset of known options
            const knownOptions = [
                'New Borrower From POS',
                'Borrower Invitation',
                'Welcome Applicant',
                'Conditions',
                'Fraud Alert',
            ];
            for (const option of knownOptions) {
                await expect(
                    this.page.getByRole('option', { name: option, exact: true })
                ).toBeVisible();
            }

            // Close without selecting
            await this.page.keyboard.press('Escape');
            await expect(listbox).toBeHidden({ timeout: 5000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Select an event from the Event dropdown.
     * @param {string} eventName  Exact visible label of the event option.
     */
    async selectEvent(eventName) {
        await test.step(`Select event: "${eventName}"`, async () => {
            await this.eventDropdown.click();
            const listbox = this.page.getByRole('listbox');
            await expect(listbox).toBeVisible({ timeout: 10000 });
            await this.page.getByRole('option', { name: eventName, exact: true }).click();
            await expect(listbox).toBeHidden({ timeout: 5000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Fill all required and optional fields for a new template.
     * @param {object} data
     * @param {string}  data.event         Event dropdown option label
     * @param {string}  data.templateName  Template Name field value
     * @param {string}  data.subject       Subject field value
     * @param {string}  [data.delay]       Delay number (default '0')
     * @param {string}  [data.delayType]   Delay Type option ('seconds' etc.)
     * @param {string}  [data.status]      Status option ('Active' | 'Inactive')
     * @param {string}  [data.toEmail]     To: recipient email addresses
     * @param {string}  [data.ccEmail]     CC: recipient email addresses
     * @param {string}  [data.bccEmail]    BCC: recipient email addresses
     * @param {string}  [data.body]        Rich text body content
     */
    async fillNewTemplate(data) {
        await test.step('Fill New Email Template form', async () => {
            // Event
            await this.selectEvent(data.event);

            // Template Name
            await this.templateNameInput.click({ clickCount: 3 });
            await this.templateNameInput.fill(data.templateName);

            // Subject
            await this.subjectInput.click({ clickCount: 3 });
            await this.subjectInput.fill(data.subject);

            // Delay (optional)
            if (data.delay !== undefined) {
                await this.delayInput.click({ clickCount: 3 });
                await this.delayInput.fill(data.delay);
                await this.delayInput.press('Tab');
            }

            // Status (optional — defaults to Inactive on form open)
            if (data.status) {
                await this.statusDropdown.click();
                const listbox = this.page.getByRole('listbox');
                await expect(listbox).toBeVisible({ timeout: 10000 });
                await this.page.getByRole('option', { name: data.status, exact: true }).click();
                await expect(listbox).toBeHidden({ timeout: 5000 });
            }

            // To email recipients
            if (data.toEmail) {
                await this.toInput.fill(data.toEmail);
            }

            // CC email recipients
            if (data.ccEmail) {
                await this.ccInput.fill(data.ccEmail);
            }

            // BCC email recipients
            if (data.bccEmail) {
                await this.bccInput.fill(data.bccEmail);
            }

            // Body (rich text editor — type directly into contenteditable)
            if (data.body) {
                await this.bodyEditor.click();
                await this.bodyEditor.fill(data.body);
            }
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Update only the fields supplied in data — any field omitted is left as-is.
     * Use this for edit flows where you only want to change a subset of values.
     *
     * @param {object} data
     * @param {string}  [data.subject]    New subject line
     * @param {string}  [data.templateName] New template name
     * @param {string}  [data.delay]      New delay value
     * @param {string}  [data.status]     New status ('Active' | 'Inactive')
     * @param {string}  [data.toEmail]    Replacement To: email addresses
     * @param {string}  [data.ccEmail]    Replacement CC: email addresses
     * @param {string}  [data.bccEmail]   Replacement BCC: email addresses
     * @param {string}  [data.body]       Replacement body content
     */
    async updateTemplateFields(data) {
        await test.step('Update email template fields', async () => {
            if (data.templateName !== undefined) {
                await this.templateNameInput.click({ clickCount: 3 });
                await this.templateNameInput.fill(data.templateName);
            }

            if (data.subject !== undefined) {
                await this.subjectInput.click({ clickCount: 3 });
                await this.subjectInput.fill(data.subject);
            }

            if (data.delay !== undefined) {
                await this.delayInput.click({ clickCount: 3 });
                await this.delayInput.fill(data.delay);
                await this.delayInput.press('Tab');
            }

            if (data.status !== undefined) {
                await this.statusDropdown.click();
                const listbox = this.page.getByRole('listbox');
                await expect(listbox).toBeVisible({ timeout: 10000 });
                await this.page.getByRole('option', { name: data.status, exact: true }).click();
                await expect(listbox).toBeHidden({ timeout: 5000 });
            }

            if (data.toEmail !== undefined) {
                await this.toInput.click({ clickCount: 3 });
                await this.toInput.fill(data.toEmail);
            }

            if (data.ccEmail !== undefined) {
                await this.ccInput.click({ clickCount: 3 });
                await this.ccInput.fill(data.ccEmail);
            }

            if (data.bccEmail !== undefined) {
                await this.bccInput.click({ clickCount: 3 });
                await this.bccInput.fill(data.bccEmail);
            }

            if (data.body !== undefined) {
                await this.bodyEditor.click();
                // Select all existing content then replace it
                await this.page.keyboard.press('Control+a');
                await this.bodyEditor.fill(data.body);
            }
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Click SAVE AS DRAFT and wait to be returned to the template list.
     * @returns {Promise<void>}
     */
    async saveAsDraft() {
        await test.step('Save template as draft', async () => {
            await this.saveAsDraftBtn.click();
            // After save the portal navigates back to the list —
            // wait for the Email Templates heading to confirm the redirect.
            await this.page.getByRole('heading', { name: 'Email Templates' })
                .waitFor({ state: 'visible', timeout: 15000 });
        });
    }

    // --------------------------------------------------------------------------

    /**
     * Click SAVE (active status) and wait to be returned to the template list.
     */
    async save() {
        await test.step('Save template', async () => {
            await this.saveBtn.click();
            await this.page.getByRole('heading', { name: 'Email Templates' })
                .waitFor({ state: 'visible', timeout: 15000 });
        });
    }
}

export default NewEmailTemplatePage;
