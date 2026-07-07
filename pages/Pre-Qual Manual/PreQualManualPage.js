import { expect, test } from "@playwright/test";

class PreQualManualPage {
    constructor(page) {
        this.page = page;

        // Fresh browser contexts opened for the borrower DTC flow (see
        // openShareableLinkInNewTab). Closed in the preQualManualPage fixture
        // teardown so they don't leak across tests.
        this.borrowerContexts = [];

        // -- Portal header actions --------------------------------------------
        this.startApp_btn = this.page.getByRole("button", { name: "Start App" });
        this.sharableAppLinkBtn = this.page.getByRole("button", { name: /Sharable App Link/i })
            .or(this.page.getByText(/Sharable App Link/i)).first();

        // -- "Start HELOC Loan Application" modal -----------------------------
        // Domain-agnostic (staging serves onrender.com, prod serves
        // hbwheloc.homebridge.com) — match any host/path-shaped value instead.
        this.shareableLinkInput = this.page.getByRole('textbox').filter({
            has: this.page.locator('[value*="://"], [value$=".com"], [value*=".com/"]'),
        }).or(this.page.locator('input[value*=".com/"]')).first();
        this.copyLinkBtn = this.page.locator('button[aria-label*="copy" i], button[title*="copy" i]')
            .or(this.page.locator('input[value*=".com/"] ~ button'))
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

            // URL is rendered in a <p> tag (not an input) — read text content.
            // Match any host/path shape (domain.tld/path), not a specific domain —
            // staging serves onrender.com, prod serves hbwheloc.homebridge.com.
            const linkText = this.page.locator('p').filter({ hasText: /[\w-]+\.[a-z]{2,}\/\S+/i }).first();
            await linkText.waitFor({ state: 'visible', timeout: 10000 });
            const shareableUrl = (await linkText.textContent()).trim();

            // Open the borrower link in a FRESH, unauthenticated context. A real
            // borrower/co-borrower is not signed in as the MLO. Opening it as a
            // new tab in the LO's context inherits the MLO session cookies, and
            // the DTC app then redirects the tab to /portal (My Loans) partway
            // through the flow — surfacing as unrelated timeouts (the loan-purpose
            // card or the Demographics opt-out never appearing) while the page was
            // actually the MLO dashboard. Tracked and closed in the
            // preQualManualPage fixture teardown (closeBorrowerContexts).
            const borrowerContext = await this.page.context().browser().newContext();
            this.borrowerContexts.push(borrowerContext);
            const newTab = await borrowerContext.newPage();
            await newTab.goto(`https://${shareableUrl.replace(/^https?:\/\//, '')}`);
            await newTab.waitForLoadState('domcontentloaded');

            // Dismiss the modal on the LO tab so the next test starts clean.
            await this.page.getByRole('button', { name: 'close' })
                .click({ force: true }).catch(() => { });

            return newTab;
        });
    };

    /** Close any borrower contexts opened via openShareableLinkInNewTab. */
    async closeBorrowerContexts() {
        for (const ctx of this.borrowerContexts) {
            await ctx.close().catch(() => { });
        }
        this.borrowerContexts = [];
    };
};

export default PreQualManualPage;