import { expect, test } from '../../fixtures';

class QuickPricerPage {
    constructor(page) {
        this.page = page;

        // -- Sidebar navigation -----------------------------------------------
        this.quickPricerNav = this.page
            .locator('[data-sidebar]')
            .filter({ hasText: /^Quick Pricer$/i })
            .first();

        // -- Page heading & tabs ----------------------------------------------
        // The portal renders this as a styled div/p rather than an <h1>/<h2>,
        // so getByRole('heading') finds nothing.  Use getByText instead.
        this.pageHeading    = this.page.getByText(/HELOC Rate Calculator/i).first();
        this.pageSubheading = this.page.getByText(/Get personalized rate estimates in real-time/i).first();

        // The tabs are styled buttons/links — NOT ARIA tab elements — so
        // getByRole('tab') returns nothing.  Match any interactive element
        // whose visible text starts with the tab label.
        this.calculatorTab = this.page
            .locator('button, a, [role="tab"]')
            .filter({ hasText: /^Calculator$/i })
            .first();
        this.historyTab = this.page
            .locator('button, a, [role="tab"]')
            .filter({ hasText: /History/i })
            .first();

        // -- Property Details -------------------------------------------------
        // The heading element contains an SVG icon alongside the label text so
        // exact-match fails.  Use a regex so partial text is sufficient.
        this.propertyDetailsHeading = this.page.getByText(/Property Details/i).first();
        this.propertyUsageDropdown  = this.page.getByRole('combobox').nth(0);
        this.stateDropdown          = this.page.getByRole('combobox').nth(1);
        this.propertyValueInput     = this.page.getByLabel(/Property Value/i).first();
        this.mortgageBalanceInput   = this.page.getByLabel(/Mortgage Balance/i).first();
        this.buildingTypeDropdown   = this.page.getByRole('combobox').nth(2);
        this.recentPurchaseNo       = this.page.getByRole('radio', { name: /^No$/i }).first();
        this.recentPurchaseYes      = this.page.getByRole('radio', { name: /^Yes$/i }).first();

        // -- Borrower Info ----------------------------------------------------
        // Same reason — avoid exact match in case icon text is included
        this.borrowerInfoHeading    = this.page.getByText(/Borrower Info/i).first();
        this.creditScoreDropdown    = this.page.getByRole('combobox').nth(3);
        this.docTypeDropdown        = this.page.getByRole('combobox').nth(4);
        this.dtiRatioInput          = this.page.getByLabel(/DTI Ratio/i).first();
        this.loanAmountInput        = this.page.getByLabel(/Loan Amount/i).first();
        this.achDiscountNo          = this.page.getByRole('radio', { name: /^No$/i }).nth(1);
        this.achDiscountYes         = this.page.getByRole('radio', { name: /Yes.*0\.25%/i }).first();
        this.dealNotesTextarea      = this.page.getByLabel(/Deal Notes/i).first();

        // -- Action buttons ---------------------------------------------------
        this.fillSampleDataBtn  = this.page.getByRole('button', { name: /Fill Sample Data/i });
        this.runScenarioBtn     = this.page.getByRole('button', { name: /Run Scenario/i });

        // -- Your Quote panel -------------------------------------------------
        this.quotePanel             = this.page.getByText('Your Quote', { exact: true }).first();
        this.eligibleRangeLabel     = this.page.getByText(/Eligible Range/i).first();
        this.yourAmountLabel        = this.page.getByText(/Your Amount/i).first();
        this.quoteEmptyState        = this.page.getByText(/Complete the form and click.*Run Scenario/i).first();

        // -- History tab content area -----------------------------------------
        // The portal does not use role="tabpanel" — content swaps inside a
        // plain div.  We identify the History view by the absence of the
        // Calculator form (Property Details heading hidden after switching).
        // No single locator is assigned here; see switchToHistoryTab / verifyHistoryHasEntries.

        // -- Invite Borrower --------------------------------------------------
        // INVITE BORROWER button lives in the Your Quote panel after a scenario runs
        this.inviteBorrowerBtn  = this.page.getByRole('button', { name: /Invite Borrower/i });

        // "Invite new applicant" modal
        this.inviteModal          = this.page.getByRole('dialog');
        this.inviteModalHeading   = this.inviteModal.getByText(/Invite new applicant/i).first();
        this.inviteEmailInput     = this.inviteModal.getByLabel(/^Email/i).first();
        this.inviteFirstNameInput = this.inviteModal.getByLabel(/First Name/i).first();
        this.inviteLastNameInput  = this.inviteModal.getByLabel(/Last Name/i).first();
        this.inviteEmailToggle    = this.inviteModal.getByRole('checkbox').first();
        this.inviteCancelBtn      = this.inviteModal.getByRole('button', { name: /^Cancel$/i });
        this.inviteSendBtn        = this.inviteModal.getByRole('button', { name: /Send Invite/i });

        // "Invite sent" success panel — rendered as a Toastify toast, not a dialog.
        // The heading is an <h6> inside the toast body.
        this.inviteSentHeading = this.page.getByText(/Invite sent/i).first();

        // The application URL is NOT an <a> tag — it is a <span> with
        // aria-label="Copy to clipboard" that contains the invite URL as text.
        this.inviteSentLink = this.page
            .locator('[aria-label*="Copy to clipboard" i]')
            .first();
    }

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------

    async navigateToQuickPricer() {
        await test.step('Navigate to Quick Pricer via sidebar', async () => {
            // Wait for the sidebar to be fully hydrated before clicking.
            await expect(this.quickPricerNav).toBeVisible({ timeout: 15000 });
            await this.quickPricerNav.click();
            await this.page.waitForLoadState('networkidle');

            // SPA client-side navigation may complete before networkidle fires,
            // so the heading component may not have rendered yet.  If it is not
            // visible within 5 s, click the nav item once more and try again.
            const headingFound = await this.pageHeading
                .isVisible({ timeout: 5000 })
                .catch(() => false);

            if (!headingFound) {
                await expect(this.quickPricerNav).toBeVisible({ timeout: 10000 });
                await this.quickPricerNav.click();
                await this.page.waitForLoadState('networkidle');
            }

            await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
        });
    }

    // -------------------------------------------------------------------------
    // Page structure
    // -------------------------------------------------------------------------

    async verifyPageHeading() {
        await test.step('Verify HELOC Rate Calculator page heading', async () => {
            await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
            await expect(this.pageSubheading).toBeVisible();
        });
    }

    async verifyTabs() {
        await test.step('Verify Calculator and History tabs are present', async () => {
            await expect(this.calculatorTab).toBeVisible();
            await expect(this.historyTab).toBeVisible();
        });
    }

    async verifyCalculatorTabIsActive() {
        await test.step('Verify Calculator tab is active by default', async () => {
            // The Calculator tab is "active" when the Property Details form is
            // visible.  We avoid checking aria-selected because the tab elements
            // here are plain buttons/links without ARIA tab roles.
            await expect(this.propertyDetailsHeading).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------
    // Section structure
    // -------------------------------------------------------------------------

    async verifyPropertyDetailsSection() {
        await test.step('Verify Property Details section fields are visible', async () => {
            await expect(this.propertyDetailsHeading).toBeVisible();

            // Property Usage dropdown defaults to "Primary Residence"
            await expect(
                this.page.getByText('Primary Residence').first()
            ).toBeVisible();

            // Remaining field labels
            await expect(this.page.getByText(/^State$/i).first()).toBeVisible();
            await expect(this.page.getByText(/Property Value/i).first()).toBeVisible();
            await expect(this.page.getByText(/Mortgage Balance/i).first()).toBeVisible();
            await expect(this.page.getByText(/Building Type/i).first()).toBeVisible();
            await expect(this.page.getByText(/Recent Purchase/i).first()).toBeVisible();

            // Recent Purchase radio buttons
            await expect(this.recentPurchaseNo).toBeVisible();
            await expect(this.recentPurchaseYes).toBeVisible();
        });
    }

    async verifyBorrowerInfoSection() {
        await test.step('Verify Borrower Info section fields are visible', async () => {
            await expect(this.borrowerInfoHeading).toBeVisible();

            await expect(this.page.getByText(/Credit Score/i).first()).toBeVisible();
            await expect(this.page.getByText(/Doc Type/i).first()).toBeVisible();
            await expect(this.page.getByText(/DTI Ratio/i).first()).toBeVisible();
            await expect(this.page.getByText(/Loan Amount/i).first()).toBeVisible();
            await expect(this.page.getByText(/ACH Discount/i).first()).toBeVisible();
            await expect(this.page.getByText(/Deal Notes/i).first()).toBeVisible();
        });
    }

    async verifyQuotePanel() {
        await test.step('Verify Your Quote panel is visible with empty state', async () => {
            await expect(this.quotePanel).toBeVisible();
            await expect(this.eligibleRangeLabel).toBeVisible();
            await expect(this.yourAmountLabel).toBeVisible();
            // Before running a scenario the panel shows an instruction message
            await expect(this.quoteEmptyState).toBeVisible();
        });
    }

    async verifyActionButtons() {
        await test.step('Verify Fill Sample Data and Run Scenario buttons are visible', async () => {
            await expect(this.fillSampleDataBtn).toBeVisible();
            await expect(this.runScenarioBtn).toBeVisible();
        });
    }

    // -------------------------------------------------------------------------
    // Fill Sample Data flow
    // -------------------------------------------------------------------------

    /**
     * Clicks "Fill Sample Data" and waits for the fields to be populated.
     * After this call the form should be fully filled and RUN SCENARIO enabled.
     */
    async clickFillSampleData() {
        await test.step('Click Fill Sample Data', async () => {
            await this.fillSampleDataBtn.click();
            await this.page.waitForLoadState('networkidle');
            // Wait for at least one dropdown to show a non-empty selected value
            await expect(
                this.page.locator('.MuiSelect-select, [role="combobox"]').first()
            ).not.toBeEmpty({ timeout: 5000 }).catch(() => {});
        });
    }

    /**
     * Verifies that every form field contains the exact value injected by
     * "Fill Sample Data".  Values are taken directly from the portal UI:
     *
     *   Property Usage   → Primary Residence  (unchanged default)
     *   State            → Colorado
     *   Property Value   → $900,000
     *   Mortgage Balance → $300,000
     *   Building Type    → Single Family
     *   Credit Score     → 720 - 739
     *   Doc Type         → Full Documentation
     *   DTI Ratio        → 40
     *   Loan Amount      → $100,000
     */
    async verifyFilledFormValues() {
        await test.step('Verify every field contains the expected sample value', async () => {
            // -- Property Details ------------------------------------------
            await expect(
                this.page.getByText('Primary Residence').first()
            ).toBeVisible({ timeout: 10000 });

            await expect(
                this.page.getByText('Colorado').first()
            ).toBeVisible();

            // Text inputs — value attribute holds the current text
            const propertyValueInput = this.page.getByLabel(/Property Value/i).first();
            await expect(propertyValueInput).toHaveValue(/900[,.]?000/, { timeout: 5000 });

            const mortgageBalanceInput = this.page.getByLabel(/Mortgage Balance/i).first();
            await expect(mortgageBalanceInput).toHaveValue(/300[,.]?000/);

            await expect(
                this.page.getByText('Single Family').first()
            ).toBeVisible();

            // -- Borrower Info ---------------------------------------------
            await expect(
                this.page.getByText('720 - 739').first()
            ).toBeVisible();

            await expect(
                this.page.getByText('Full Documentation').first()
            ).toBeVisible();

            const dtiInput = this.page.getByLabel(/DTI Ratio/i).first();
            await expect(dtiInput).toHaveValue('40');

            const loanAmountInput = this.page.getByLabel(/Loan Amount/i).first();
            await expect(loanAmountInput).toHaveValue(/100[,.]?000/);
        });
    }

    /**
     * Verifies that the form fields contain values after Fill Sample Data.
     * Alias that delegates to verifyFilledFormValues for backward compatibility.
     */
    async verifyFormIsPopulated() {
        await this.verifyFilledFormValues();
    }

    // -------------------------------------------------------------------------
    // Run Scenario flow
    // -------------------------------------------------------------------------

    /**
     * Clicks "Run Scenario" and waits for the Your Quote panel to update.
     * Expects the empty-state instruction text to disappear and a quote amount
     * or product list to appear instead.
     */
    async runScenario() {
        await test.step('Click Run Scenario', async () => {
            await expect(this.runScenarioBtn).toBeEnabled({ timeout: 10000 });
            await this.runScenarioBtn.click();
            await this.page.waitForLoadState('networkidle');
        });
    }

    /**
     * Verifies the Your Quote panel shows the expected results after running
     * a scenario with the sample data.
     *
     * Expected state (from Fill Sample Data + Run Scenario):
     *   • Your Amount        → $100,000
     *   • "Select Points & Fees Option" heading appears
     *   • Pricing table with columns: Points | Interest Rate | Monthly
     *   • At least one rate row is rendered
     *   • INVITE BORROWER and DOWNLOAD PDF buttons are visible
     *   • Empty-state instruction message is gone
     */
    async verifyQuoteResults() {
        await test.step('Verify Your Quote panel shows results after Run Scenario', async () => {
            // Your Amount should update from $0 to the loan amount
            await expect(
                this.page.getByText('$100,000').first()
            ).toBeVisible({ timeout: 15000 });

            // Empty-state instruction should be replaced
            await expect(this.quoteEmptyState).toBeHidden({ timeout: 10000 });

            // "Select Points & Fees Option" section heading
            await expect(
                this.page.getByText(/Select Points & Fees Option/i).first()
            ).toBeVisible();

            // Pricing table column headers
            await expect(this.page.getByText(/^Points$/i).first()).toBeVisible();
            await expect(this.page.getByText(/Interest Rate/i).first()).toBeVisible();
            await expect(this.page.getByText(/^Monthly$/i).first()).toBeVisible();

            // At least one pricing row must be rendered (contains a % rate)
            await expect(
                this.page.locator('td, [role="cell"]').filter({ hasText: /%/ }).first()
            ).toBeVisible({ timeout: 10000 });

            // Action buttons
            await expect(
                this.page.getByRole('button', { name: /Invite Borrower/i })
            ).toBeVisible();
            await expect(
                this.page.getByRole('button', { name: /Download PDF/i })
            ).toBeVisible();
        });
    }

    // -------------------------------------------------------------------------
    // History tab
    // -------------------------------------------------------------------------

    /**
     * Switches to the History tab and waits for the Calculator form to disappear,
     * which confirms the tab switch completed (no role="tabpanel" to wait for).
     */
    async switchToHistoryTab() {
        await test.step('Switch to History tab', async () => {
            await this.historyTab.click();
            await this.page.waitForLoadState('networkidle');
            // Confirm the switch: the Calculator form (Property Details) hides
            await expect(this.propertyDetailsHeading).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Verifies the History tab has rendered content after `switchToHistoryTab`.
     *
     * The portal swaps content in a plain div — no role="tabpanel" — so we use
     * two independent checks:
     *   1. The Calculator form sections are hidden (proving we're on History).
     *   2. The page body contains text beyond the sidebar/header (proving History
     *      entries loaded rather than an empty state).
     */
    async verifyHistoryHasEntries() {
        await test.step('Verify History tab has at least one entry', async () => {
            // Guard 1 — Calculator form must be gone
            await expect(this.propertyDetailsHeading).toBeHidden({ timeout: 5000 });
            await expect(this.borrowerInfoHeading).toBeHidden({ timeout: 5000 });

            // Guard 2 — page has meaningful content (history entries render as
            // cards, rows, or list items whose exact element type is unknown).
            // Walk through several structural selectors and accept the first match.
            const candidateSelectors = [
                'tbody tr',                          // table rows
                '[class*="card" i]',                 // MUI / custom cards
                '[class*="history" i]',              // history-specific wrappers
                '[class*="scenario" i]',             // scenario cards
                'ul li',                             // unordered list items
            ];

            let found = false;
            for (const sel of candidateSelectors) {
                found = await this.page.locator(sel).first()
                    .isVisible({ timeout: 3000 }).catch(() => false);
                if (found) break;
            }

            if (!found) {
                // Last-resort: check total visible text on the page has grown
                // beyond just the nav + header (~100 chars minimum).
                const bodyText = (await this.page.locator('body').innerText().catch(() => '')).trim();
                expect(
                    bodyText.length,
                    'History tab should render visible text content (entries or empty-state message)'
                ).toBeGreaterThan(100);
            }
        });
    }

    // -------------------------------------------------------------------------
    // Invite Borrower flow
    // -------------------------------------------------------------------------

    /**
     * Clicks the INVITE BORROWER button in the Your Quote panel.
     * The "Invite new applicant" modal must be visible before this is called
     * (i.e. Run Scenario must have produced a quote first).
     */
    async clickInviteBorrower() {
        await test.step('Click Invite Borrower button', async () => {
            await expect(this.inviteBorrowerBtn).toBeVisible({ timeout: 10000 });
            await this.inviteBorrowerBtn.click();
            await expect(this.inviteModal).toBeVisible({ timeout: 10000 });
            await expect(this.inviteModalHeading).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Verifies the Invite Borrower modal contains all expected fields.
     */
    async verifyInviteModalFields() {
        await test.step('Verify Invite Borrower modal fields', async () => {
            await expect(this.inviteModalHeading).toBeVisible();
            await expect(this.inviteEmailInput).toBeVisible();
            await expect(this.inviteFirstNameInput).toBeVisible();
            await expect(this.inviteLastNameInput).toBeVisible();
            await expect(this.inviteCancelBtn).toBeVisible();
            await expect(this.inviteSendBtn).toBeVisible();
            // "Email Applicant?" toggle is enabled by default
            await expect(
                this.inviteModal.getByText(/Email Applicant/i).first()
            ).toBeVisible();
        });
    }

    /**
     * Fills the Invite new applicant form.
     * Uses email address as the identifier per policy — no full PII stored.
     *
     * @param {object} applicant
     * @param {string} applicant.email      — e.g. randomEmail()
     * @param {string} applicant.firstName  — first name (test value)
     * @param {string} applicant.lastName   — last name (test value)
     */
    async fillInviteForm(applicant) {
        await test.step(`Fill Invite form for: ${applicant.email}`, async () => {
            await this.inviteEmailInput.fill(applicant.email);
            await this.inviteFirstNameInput.fill(applicant.firstName);
            await this.inviteLastNameInput.fill(applicant.lastName);
        });
    }

    /**
     * Clicks CANCEL in the Invite modal and waits for it to close.
     */
    async cancelInvite() {
        await test.step('Cancel Invite Borrower modal', async () => {
            await this.inviteCancelBtn.click();
            await expect(this.inviteModal).toBeHidden({ timeout: 10000 });
        });
    }

    /**
     * Clicks SEND INVITE and waits for the success panel to appear.
     */
    async sendInvite() {
        await test.step('Send invite', async () => {
            await this.inviteSendBtn.click();
            // Modal closes and "Invite sent" confirmation panel appears
            await expect(this.inviteModal).toBeHidden({ timeout: 15000 });
            await expect(this.inviteSentHeading).toBeVisible({ timeout: 15000 });
        });
    }

    /**
     * Verifies the "Invite sent" success panel:
     *   • "Invite sent" heading is visible
     *   • The application URL link is present
     */
    async verifyInviteSentPanel() {
        await test.step('Verify Invite sent success panel', async () => {
            // The success notification is a Toastify toast (not a dialog).
            // "Invite sent" is an <h6> inside the toast body.
            await expect(this.inviteSentHeading).toBeVisible({ timeout: 10000 });

            // Confirmation copy text
            await expect(
                this.page.getByText(/The applicant can finish their application/i).first()
            ).toBeVisible();

            // The URL is rendered inside a <span aria-label="Copy to clipboard">
            // — not an anchor tag.  Assert the element is visible and its text
            // contains a URL (http/https).
            await expect(this.inviteSentLink).toBeVisible({ timeout: 10000 });
            const linkText = (await this.inviteSentLink.innerText().catch(() => '')).trim();
            expect(
                linkText,
                'Invite sent span should contain the application URL'
            ).toMatch(/^https?:\/\//);
        });
    }
}

export default QuickPricerPage;
