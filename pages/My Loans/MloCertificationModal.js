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
            // Wait for the field to exist before acting, then let fill() do the
            // work: it auto-scrolls, auto-waits for actionability, and — crucially
            // — re-resolves the locator and retries if the modal re-renders and
            // detaches the input mid-action. A standalone scrollIntoViewIfNeeded
            // does NOT retry on detach, so it was throwing "Element is not
            // attached to the DOM" whenever the cert modal re-rendered.
            await this.brokerMloNameInput.waitFor({ state: 'visible', timeout: 15000 });
            await this.brokerMloNameInput.fill(name);
            // Blur so the form's onBlur/onTouched validation fires and SUBMIT can
            // enable — a bare .fill() leaves focus in the field and the form's
            // isValid can stay false. Same commit pattern as ConsentsPage and
            // NewApplicationPage.fillApplicationDetails.
            await this.brokerMloNameInput.press('Tab');
        });
    }

    async submit() {
        await test.step('Submit MLO certification', async () => {
            const successToast = this.page.getByText(/Certification completed successfully/i);

            // Click SUBMIT once, tolerating a mid-click detach. After the last
            // checkbox is ticked the modal can re-render, and a successful click
            // makes the modal start unmounting — Playwright then reports
            // "element was detached from the DOM" for the in-flight click. That
            // detachment means the click LANDED, not that it failed, so we
            // swallow click errors here and let waitForSuccess be the authority.
            //
            // The previous version wrapped the click in expect(...).toPass():
            // once submit started unmounting the modal, every retry hit the
            // detached/absent button, toPass never saw a "successful" click, and
            // it threw a false failure after 15 s — even though the cert had
            // actually gone through.
            const clickSubmit = async () => {
                try {
                    await this.submitBtn.scrollIntoViewIfNeeded();
                    await this.submitBtn.click({ timeout: 5000 });
                } catch {
                    // Detached/absent button = modal already unmounting from a
                    // click that registered. waitForSuccess confirms below.
                }
            };

            // Success is signalled by EITHER the "Certification completed
            // successfully" toast (authoritative — every caller asserts it) OR
            // the modal unmounting. Accept whichever appears first.
            const waitForSuccess = (timeout) =>
                Promise.race([
                    successToast.waitFor({ state: 'visible', timeout }),
                    this.modal.waitFor({ state: 'hidden', timeout }),
                ])
                    .then(() => true)
                    .catch(() => false);

            await clickSubmit();
            let succeeded = await waitForSuccess(20000);

            if (!succeeded) {
                // Re-click only when SUBMIT is still present AND enabled — a
                // disabled or absent button means the first click registered and
                // a cert is in flight; on a slow staging backend re-clicking
                // would duplicate that request.
                const stillOpen = await this.submitBtn.isVisible().catch(() => false);
                const inFlight  = stillOpen
                    ? await this.submitBtn.isDisabled().catch(() => false)
                    : true;
                if (stillOpen && !inFlight) {
                    await clickSubmit();
                }
                succeeded = await waitForSuccess(60000);
            }

            // Surface genuine failures instead of letting a silent miss fall
            // through to a confusing toast assertion in the caller.
            expect(
                succeeded,
                'MLO certification did not complete: neither the success toast nor modal close was observed',
            ).toBeTruthy();
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
