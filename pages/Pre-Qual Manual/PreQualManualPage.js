import { expect, test } from "@playwright/test";

class PreQualManualPage {
    constructor(page) {
        this.page = page;

        // -- Portal header actions --------------------------------------------
        this.startApp_btn = this.page.getByRole("button", { name: "Start App" });
        this.sharableAppLinkBtn = this.page.getByRole("button", { name: /Sharable App Link/i })
            .or(this.page.getByText(/Sharable App Link/i)).first();

        // -- "Start HELOC Loan Application" modal -----------------------------
        this.shareableLinkInput = this.page.getByRole('textbox').filter({
            has: this.page.locator('[value*="onrender.com"]'),
        }).or(this.page.locator('input[value*="onrender.com"]')).first();
        this.copyLinkBtn = this.page.locator('button[aria-label*="copy" i], button[title*="copy" i]')
            .or(this.page.locator('input[value*="onrender.com"] ~ button'))
            .first();
        this.startPreQualManual_btn = this.page.getByRole("button", { name: "Start Pre-Qual Manually" });
    };
    async clickStartPreQualManually() {
        await test.step('Click the start pre-qual manually button', async () => {
            await this.startPreQualManual_btn.click();
            await this.page.waitForLoadState('load');
            await expect(this.page).toHaveURL('/portal/new-application');
        });
    };
    async clickStartApp() {
        await test.step('Click the start app button', async () => {
            await this.startApp_btn.click();
            await expect(this.page.getByRole('heading', { name: 'Start HELOC Loan Application' })).toBeVisible();
        });
    };

    /**
     * Clicks "Sharable App Link", reads the broker-branded URL from the modal
     * input, then opens it in a new tab and returns that tab's Page object.
     */
    async openShareableLinkInNewTab() {
        return await test.step('Open shareable app link in new tab', async () => {
            // Wait for the portal dashboard to render the button before clicking.
            // click({ force: true }) bypasses actionability but still needs the element
            // in the DOM — without this guard, CI load can cause a silent 180 s wait.
            await this.sharableAppLinkBtn.waitFor({ state: 'visible', timeout: 30000 });
            // Open the modal
            await this.sharableAppLinkBtn.click({ force: true });
            await this.page.getByRole('heading', { name: 'Start HELOC Loan Application' })
                .waitFor({ state: 'visible', timeout: 10000 });

            // URL is rendered in a <p> tag (not an input) — read text content
            const linkText = this.page.locator('p').filter({ hasText: /onrender\.com\// }).first();
            await linkText.waitFor({ state: 'visible', timeout: 10000 });
            const shareableUrl = (await linkText.textContent()).trim();

            // Open in a new tab
            const newTab = await this.page.context().newPage();
            await newTab.goto(`https://${shareableUrl.replace(/^https?:\/\//, '')}`);
            await newTab.waitForLoadState('domcontentloaded');

            return newTab;
        });
    };
};

export default PreQualManualPage;