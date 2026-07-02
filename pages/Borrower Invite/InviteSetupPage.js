import { expect, test } from '@playwright/test';

/**
 * "Tell us about yourself" — the account-setup page an invited borrower lands
 * on after clicking REVIEW OFFER in the invitation email
 * (/borrower/invite/<token>).
 *
 * Confirmed against HBWHS staging (2026-07-03):
 *   • Email Address — empty, must match the invited address
 *   • Cell Phone Number — pre-filled from the LO's application data
 *   • Password — complexity rules: 8+ chars, 1 number, 1 special,
 *     1 uppercase, 1 lowercase
 *   • "Consent to Electronic Records" checkbox — gates CONTINUE
 *   • CONTINUE — disabled until the form is valid
 *
 * Constructed directly with the borrower tab (like CoBorrowerFlowPage), not
 * via a fixture — the invited borrower browses in its own clean context.
 */
class InviteSetupPage {
    constructor(page) {
        this.page = page;

        this.pageHeading = this.page.getByText('Tell us about yourself');
        this.emailInput = this.page.getByLabel(/Email Address/);
        this.phoneInput = this.page.getByLabel(/Cell Phone Number/);
        this.passwordInput = this.page.getByLabel(/^Password/);
        // Only checkbox on the page — the e-consent. MUI renders the consent
        // text in sibling nodes, so there is no accessible name to match on.
        this.eConsentCheckbox = this.page.locator('input[type="checkbox"]').first();
        this.continueBtn = this.page.getByRole('button', { name: /continue/i });

        // "Hi. Need any help?" chat widget — overlays the bottom-right and can
        // intercept clicks. Its dismiss button is the X next to the bubble.
        this.chatBubbleDismiss = this.page
            .locator('button[aria-label*="close" i], button:has-text("×")')
            .first();
    }

    /**
     * Fills the account-setup form and continues. The phone number is left as
     * pre-filled by the platform (it comes from the LO's application data).
     *
     * @param {{ email: string, password: string }} credentials
     */
    async completeAccountSetup({ email, password }) {
        await test.step('Complete invited-borrower account setup', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 30000 });

            // Best-effort chat-bubble dismissal so it can't intercept clicks.
            await this.chatBubbleDismiss.click({ timeout: 3000 }).catch(() => { });

            await this.emailInput.fill(email);
            await this.emailInput.press('Tab');

            await this.passwordInput.fill(password);
            await this.passwordInput.press('Tab');

            // MUI PrivateSwitchBase — evaluate(click) dispatches the DOM click
            // React's onChange listens for; check({ force }) would only set the
            // attribute without firing the synthetic event.
            const checked = await this.eConsentCheckbox.isChecked().catch(() => false);
            if (!checked) {
                await this.eConsentCheckbox.evaluate(el => el.click());
            }
            await expect(this.eConsentCheckbox).toBeChecked({ timeout: 5000 });

            // CONTINUE enables only when email/password/consent are all valid.
            await expect(this.continueBtn).toBeEnabled({ timeout: 15000 });
            await this.continueBtn.click();
        });
    }
}

export default InviteSetupPage;
