# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Borrower Flow/Co-Borrower/coborrower.spec.js >> Co-Borrower Flow — End-to-End via Shareable Link >> Married co-borrower flow — no blocking errors end-to-end
- Location: tests/Borrower Flow/Co-Borrower/coborrower.spec.js:211:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Sharable App Link/i }).or(getByText(/Sharable App Link/i)).first() to be visible

```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | class PreQualManualPage {
  4  |     constructor(page) {
  5  |         this.page = page;
  6  | 
  7  |         // -- Portal header actions --------------------------------------------
  8  |         this.startApp_btn = this.page.getByRole("button", { name: "Start App" });
  9  |         this.sharableAppLinkBtn = this.page.getByRole("button", { name: /Sharable App Link/i })
  10 |             .or(this.page.getByText(/Sharable App Link/i)).first();
  11 | 
  12 |         // -- "Start HELOC Loan Application" modal -----------------------------
  13 |         // Domain-agnostic (staging serves onrender.com, prod serves
  14 |         // hbwheloc.homebridge.com) — match any host/path-shaped value instead.
  15 |         this.shareableLinkInput = this.page.getByRole('textbox').filter({
  16 |             has: this.page.locator('[value*="://"], [value$=".com"], [value*=".com/"]'),
  17 |         }).or(this.page.locator('input[value*=".com/"]')).first();
  18 |         this.copyLinkBtn = this.page.locator('button[aria-label*="copy" i], button[title*="copy" i]')
  19 |             .or(this.page.locator('input[value*=".com/"] ~ button'))
  20 |             .first();
  21 |         this.startPreQualManual_btn = this.page.getByRole("button", { name: "Start Pre-Qual Manually" });
  22 |     };
  23 |     async clickStartPreQualManually() {
  24 |         await test.step('Click the start pre-qual manually button', async () => {
  25 |             await this.startPreQualManual_btn.click();
  26 |             await this.page.waitForLoadState('load');
  27 |             await expect(this.page).toHaveURL('/portal/new-application');
  28 |         });
  29 |     };
  30 |     async clickStartApp() {
  31 |         await test.step('Click the start app button', async () => {
  32 |             await this.startApp_btn.click();
  33 |             await expect(this.page.getByRole('heading', { name: 'Start HELOC Loan Application' })).toBeVisible();
  34 |         });
  35 |     };
  36 | 
  37 |     /**
  38 |      * Clicks "Sharable App Link", reads the broker-branded URL from the modal
  39 |      * input, then opens it in a new tab and returns that tab's Page object.
  40 |      */
  41 |     async openShareableLinkInNewTab() {
  42 |         return await test.step('Open shareable app link in new tab', async () => {
  43 |             // Wait for the portal dashboard to render the button before clicking.
  44 |             // click({ force: true }) bypasses actionability but still needs the element
  45 |             // in the DOM — without this guard, CI load can cause a silent 180 s wait.
> 46 |             await this.sharableAppLinkBtn.waitFor({ state: 'visible', timeout: 30000 });
     |                                           ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  47 |             // Open the modal
  48 |             await this.sharableAppLinkBtn.click({ force: true });
  49 |             await this.page.getByRole('heading', { name: 'Start HELOC Loan Application' })
  50 |                 .waitFor({ state: 'visible', timeout: 10000 });
  51 | 
  52 |             // URL is rendered in a <p> tag (not an input) — read text content.
  53 |             // Match any host/path shape (domain.tld/path), not a specific domain —
  54 |             // staging serves onrender.com, prod serves hbwheloc.homebridge.com.
  55 |             const linkText = this.page.locator('p').filter({ hasText: /[\w-]+\.[a-z]{2,}\/\S+/i }).first();
  56 |             await linkText.waitFor({ state: 'visible', timeout: 10000 });
  57 |             const shareableUrl = (await linkText.textContent()).trim();
  58 | 
  59 |             // Open in a new tab
  60 |             const newTab = await this.page.context().newPage();
  61 |             await newTab.goto(`https://${shareableUrl.replace(/^https?:\/\//, '')}`);
  62 |             await newTab.waitForLoadState('domcontentloaded');
  63 | 
  64 |             // Dismiss the modal on the LO tab so the next test starts clean.
  65 |             await this.page.getByRole('button', { name: 'close' })
  66 |                 .click({ force: true }).catch(() => { });
  67 | 
  68 |             return newTab;
  69 |         });
  70 |     };
  71 | };
  72 | 
  73 | export default PreQualManualPage;
```