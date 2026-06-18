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
            const successToast = this.page.getByText(/Certification completed successfully/i);

            // Click SUBMIT, guarding ONLY the click action: the modal can
            // re-render after the last checkbox is ticked and detach SUBMIT
            // mid-click, so a bounded retry recovers a click that never landed.
            const clickSubmit = async () => {
                await expect(async () => {
                    await this.submitBtn.scrollIntoViewIfNeeded();
                    await this.submitBtn.click({ timeout: 5000 });
                }).toPass({ timeout: 15000, intervals: [500, 1000] });
            };

            // Success is signalled by EITHER the "Certification completed
            // successfully" toast (authoritative — every caller asserts it) OR
            // the modal unmounting. Accept whichever appears first.
            //
            // The previous version waited on the modal closing ALONE and
            // re-clicked SUBMIT every 1–2 s for 60 s. On a slow staging backend
            // the cert succeeds but the modal unmounts well after the toast
            // fires, so the modal-only wait timed out and falsely failed — and
            // the repeated re-clicks could re-trigger or stall the in-flight
            // cert request. Racing the toast in fixes both.
            const waitForSuccess = (timeout) =>
                Promise.race([
                    successToast.waitFor({ state: 'visible', timeout }),
                    this.modal.waitFor({ state: 'hidden', timeout }),
                ]);

            await clickSubmit();
            const succeeded = await waitForSuccess(20000)
                .then(() => true)
                .catch(() => false);

            if (!succeeded) {
                // Re-click only when SUBMIT is still enabled — a disabled button
                // means the first click registered and a cert is in flight; on a
                // slow staging backend re-clicking would duplicate that request.
                const inFlight = await this.submitBtn.isDisabled().catch(() => false);
                if (!inFlight) {
                    await clickSubmit();
                }
                await waitForSuccess(60000);
            }
        });
    }

    /**
     * Arms broker-certification-PDF capture, submits, waits for the modal to
     * close, and returns the still-pending capture promise (wrapped so the test
     * runner does not await it here).
     *
     * The caller MUST assert the transient "Certification completed
     * successfully" toast BEFORE awaiting the returned promise — the toast
     * auto-dismisses within a few seconds, whereas the PDF can take longer to
     * surface. Awaiting the PDF first would miss the toast entirely.
     *
     * The PDF surfaces differently per environment: a headed browser renders it
     * in a NEW TAB (the popup's URL becomes the S3 PDF link), while headless CI
     * cannot render PDFs and serves it as a DOWNLOAD (the popup navigates to ":"
     * and a download fires on that popup). We listen for both paths and resolve
     * whichever produces the document URL first. The download handler is
     * attached to the popup the instant it opens so a fast headless download is
     * never missed by a late listener. The 30 s capture bound starts after
     * submit and the modal closes, not when listeners are registered.
     *
     * @returns {Promise<{ pdfUrlPromise: Promise<string|null> }>}
     *   pdfUrlPromise resolves to the broker certification PDF URL, or null if
     *   neither a PDF tab nor a download appeared within the timeout.
     */
    async submitCertificationAndStartPdfCapture() {
        return await test.step('Submit MLO certification (capturing broker certification PDF)', async () => {
            const ctx = this.page.context();

            // Arm listeners before submit so a fast headless download is never
            // missed; the 30 s bound starts only after submit completes.
            const pdfCapturePromise = new Promise((resolve) => {
                // Headless: download may fire on the original page in some flows.
                this.page.on('download', (d) => resolve(d.url()));

                ctx.on('page', (popup) => {
                    // Headless: the popup navigates to the PDF then downloads it.
                    popup.on('download', (d) => resolve(d.url()));
                    // Headed: the popup's URL becomes the rendered PDF link.
                    popup.waitForURL(/\.pdf/i, { timeout: 25000 })
                        .then(() => resolve(popup.url()))
                        .catch(() => { });
                });
            });

            await this.submitBtn.scrollIntoViewIfNeeded();
            await this.submitBtn.click();
            await expect(this.modal).toBeHidden({ timeout: 15000 });

            const pdfUrlPromise = Promise.race([
                pdfCapturePromise,
                // Bound the wait so a missing PDF fails fast in the caller rather
                // than hanging until the test timeout. catch() guards against the
                // page closing before the timer elapses.
                this.page.waitForTimeout(30000).then(() => null).catch(() => null),
            ]);

            // Wrap in an object so test.step resolves immediately instead of
            // awaiting the still-pending capture promise.
            return { pdfUrlPromise };
        });
    }
}

export default MloCertificationModal;
