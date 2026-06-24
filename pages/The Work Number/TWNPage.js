import { expect, test } from '../../fixtures';
import HelpDeskWidget from '../Support/HelpDeskWidget';

class TWNPage {
    constructor(page) {
        this.page = page;
        this.helpDesk = new HelpDeskWidget(page);

        // -- Landing page ------------------------------------------------------
        this.getStartedNowBtn = this.page.getByRole('button', { name: /Get Started Now/i }).first();

        // -- Select Property Type (card-style, no button role) -----------------
        this.singleFamilyCard = this.page.getByText('Single Family', { exact: true });
        this.twoToFourUnitCard = this.page.getByText('2-4 Unit', { exact: true });
        this.condoCard         = this.page.getByText('Condo', { exact: true });

        // -- Loan Purpose (card-style) -----------------------------------------
        this.debtConsolidationCard  = this.page.getByText('Debt Consolidation', { exact: true });
        this.homeImprovementCard    = this.page.getByText('Home Improvement', { exact: true });
        this.otherLoanPurposeCard   = this.page.getByText('Other', { exact: true }).first();

        // -- Tell us about your property ---------------------------------------
        this.addressInput        = this.page.getByLabel(/Address/i).first();
        this.cityInput           = this.page.getByLabel(/City/i);
        this.countyInput         = this.page.getByLabel(/County/i);
        this.stateInput          = this.page.getByRole('combobox', { name: /State/i });
        this.zipInput            = this.page.getByLabel(/Zip/i);
        // Property Status radios — scoped to their radiogroup
        const propertyStatusGroup = this.page.getByRole('radiogroup', { name: /listed for sale|Property Status/i }).first();
        this.notListedRadio = propertyStatusGroup.getByRole('radio', { name: /No|Not listed/i }).first();
        this.listedRadio    = propertyStatusGroup.getByRole('radio', { name: /Yes|listed/i }).first();

        // Trust radios — aria-labels are "No for Held in trust" / "Yes for Held in trust"
        const trustGroup       = this.page.getByRole('radiogroup', { name: /Held in trust/i });
        this.trustNoRadio      = trustGroup.getByRole('radio', { name: /No/i }).first();
        this.trustYesRadio     = trustGroup.getByRole('radio', { name: /Yes/i }).first();
        this.estimatedValueInput = this.page.getByLabel(/Estimated Home Value/i)
                                       .or(this.page.getByLabel(/Estimated Value/i)).first();
        this.primaryResidenceRadio = this.page.getByRole('radio', { name: /Primary Residence/i });
        this.continueBtn         = this.page.getByRole('button', { name: /Continue/i }).first();

        // -- Tell us about yourself --------------------------------------------
        this.firstNameInput   = this.page.getByLabel(/First Name/i);
        this.lastNameInput    = this.page.getByLabel(/Last Name/i);
        this.emailInput       = this.page.getByLabel(/Email Address/i);
        this.phoneInput       = this.page.getByLabel(/Cell Phone Number/i)
                                    .or(this.page.getByLabel(/Phone Number/i)).first();
        this.passwordInput    = this.page.getByLabel(/^Password/i);
        this.eConsentCheckbox = this.page.locator("input[type='checkbox']");

        // -- Secure Identity Check (credit-check step) -------------------------
        this.ssnInput = this.page.getByLabel(/Social Security Number/i);
        this.dobInput = this.page.getByLabel(/Date of Birth/i);

        // -- Income Sources (TWN auto-populates) -------------------------------
        this.salaryCheckbox   = this.page.getByRole('checkbox', { name: /Salary or Hourly Wages/i });
        this.companyNameInput = this.page.getByLabel(/Company Name/i);
        this.startDateInput   = this.page.getByLabel(/Start Date/i);
        // Note: totalAnnualCompensation is rendered as read-only TEXT in the
        // verified employer card (not as an <input>), so no input locator is defined.
        // verifyTwnPopulated() checks it via getByText() instead.

        // -- Shared navigation -------------------------------------------------
        this.nextBtn = this.page.getByRole('button', { name: /^Next$/i }).first();
    };

    // -------------------------------------------------------------------------

    async clickGetStartedNow() {
        await test.step('Click Get Started Now', async () => {
            // Close the "Hi. Need any help?" chat bubble first — it floats over
            // the bottom-right corner and can intercept clicks on the page.
            await this.helpDesk.dismissProactiveBubble();
            await this.getStartedNowBtn.waitFor({ state: 'visible', timeout: 15000 });
            await this.getStartedNowBtn.click();
        });
    };

    async selectPropertyType(data) {
        await test.step('Select property type', async () => {
            const map = {
                'Single Family': this.singleFamilyCard,
                '2-4 Unit':      this.twoToFourUnitCard,
                'Condo':         this.condoCard,
            };
            const card = map[data.propertyType] ?? this.singleFamilyCard;
            await card.waitFor({ state: 'visible', timeout: 10000 });
            await card.click({ force: true });
        });
    };

    async selectLoanPurpose(data) {
        await test.step('Select loan purpose', async () => {
            const map = {
                'Debt Consolidation': this.debtConsolidationCard,
                'Home Improvement':   this.homeImprovementCard,
                'Other':              this.otherLoanPurposeCard,
            };
            const card = map[data.loanPurpose] ?? this.homeImprovementCard;
            await card.waitFor({ state: 'visible', timeout: 10000 });
            await card.click({ force: true });
        });
    };

    async fillPropertyInfo(data) {
        await test.step('Fill property info', async () => {
            const p = data.property;

            await this.addressInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.addressInput.fill(p.address);
            await this.addressInput.press('Tab');

            await this.cityInput.fill(p.city);
            await this.cityInput.press('Tab');

            if (p.county) {
                await this.countyInput.fill(p.county);
                await this.countyInput.press('Tab');
            }

            // State is MUI Autocomplete — fill then click the matching option
            await this.stateInput.fill(p.state);
            await this.page.getByRole('option', { name: p.state, exact: true }).click();

            await this.zipInput.fill(p.zip);
            await this.zipInput.press('Tab');

            // Property Status
            if (!p.isListed) {
                await this.notListedRadio.check({ force: true });
            } else {
                await this.listedRadio.check({ force: true });
            }

            // HELOC held in trust
            // Trust radios are the second set of Yes/No on the page
            if (!p.heldInTrust) {
                await this.trustNoRadio.check({ force: true });
            } else {
                await this.trustYesRadio.check({ force: true });
            }

            await this.estimatedValueInput.clear();
            await this.estimatedValueInput.fill(p.estimatedValue);
            await this.estimatedValueInput.press('Tab');

            await this.primaryResidenceRadio.check({ force: true });

            await this.continueBtn.click({ force: true });
        });
    };

    async fillAboutYourself(data) {
        await test.step('Fill about yourself', async () => {
            const b = data.borrower;

            await this.firstNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.firstNameInput.fill(b.firstName);
            await this.firstNameInput.press('Tab');

            await this.lastNameInput.fill(b.lastName);
            await this.lastNameInput.press('Tab');

            await this.emailInput.fill(b.email);
            await this.emailInput.press('Tab');

            await this.phoneInput.fill(b.phoneNumber);
            await this.phoneInput.press('Tab');

            await this.passwordInput.fill(b.password);
            await this.passwordInput.press('Tab');

            if (b.consentToElectronicRecords) {
                await this.eConsentCheckbox.check({ force: true });
            }
            await this.continueBtn.click({ force: true });
        });
    };

    async fillCreditCheck(data) {
        await test.step('Fill credit check fields (TWN)', async () => {
            const cc = data.creditCheck;

            // The prior "Tell us about yourself" Continue submit goes to the
            // staging POS backend, which can be slow to respond (Render). Allow
            // extra time for it to process and render the credit-check page.
            await this.ssnInput.waitFor({ state: 'visible', timeout: 60000 });
            await this.ssnInput.fill(cc.ssn);
            await this.ssnInput.press('Tab');

            await this.dobInput.fill(cc.dateOfBirth);
            await this.dobInput.press('Tab');
        });
    };

    /**
     * Fills the primary borrower's income sources when TWN did not auto-populate.
     * Selects each income source checkbox, then fills company name,
     * total annual compensation, and start date for salary income.
     *
     * @param {object} data  data.primaryIncome — incomeSources, companyName,
     *                       annualCompensation, startDate
     */
    async fillPrimaryIncomeSources(data) {
        await test.step('Fill primary borrower income sources', async () => {
            const inc = data.primaryIncome ?? {};

            // Wait for the income sources section to appear
            await this.page.getByText(/What are your income sources/i)
                .first()
                .waitFor({ state: 'visible', timeout: 15000 });

            for (const source of (inc.incomeSources ?? [])) {
                const checkbox = this.page.getByRole('checkbox', {
                    name: new RegExp(source, 'i'),
                });
                const alreadyChecked = await checkbox.isChecked().catch(() => false);
                if (!alreadyChecked) {
                    await checkbox.evaluate(el => el.click());
                }
            }

            // Job details — only when salary income is selected
            if ((inc.incomeSources ?? []).some(s => /salary|hourly/i.test(s))) {
                if (inc.companyName) {
                    const companyInput = this.page.getByPlaceholder(/Company Name/i).first()
                        .or(this.page.getByLabel(/Company Name/i).first());
                    await companyInput.waitFor({ state: 'visible', timeout: 10000 });
                    await companyInput.fill(inc.companyName);
                }

                if (inc.annualCompensation) {
                    const compInput = this.page
                        .getByLabel(/Total Annual Compensation|Annual Compensation/i).first();
                    await compInput.waitFor({ state: 'visible', timeout: 10000 });
                    await compInput.click({ clickCount: 3 });
                    await compInput.fill(inc.annualCompensation);
                    await compInput.press('Tab');
                }

                if (inc.startDate) {
                    const startInput = this.page.getByPlaceholder(/Start Date/i).first()
                        .or(this.page.getByLabel(/Start Date/i).first());
                    await startInput.waitFor({ state: 'visible', timeout: 10000 });
                    await startInput.fill(inc.startDate);
                    await startInput.press('Tab');
                }
            }
        });
    };

    /**
     * Asserts TWN populated the Salary or Hourly Wages checkbox and employer
     * card fields. Skips individual field checks when expected value is null.
     */
    async verifyTwnPopulated(data) {
        await test.step('Verify TWN auto-populated employer info', async () => {
            const inc = data.expectedIncome;

            // TWN response may take a moment — wait for checkbox to become checked, then scroll to it
            await expect(this.salaryCheckbox).toBeChecked({ timeout: 30000 });
            await this.salaryCheckbox.scrollIntoViewIfNeeded();

            // TWN populates a read-only card (not form inputs) — scroll then assert visible text
            if (inc?.companyName) {
                const el = this.page.getByText(inc.companyName, { exact: false }).first();
                await el.waitFor({ state: 'visible', timeout: 15000 });
                await el.scrollIntoViewIfNeeded();
                await expect(el).toBeVisible();
            }

            // Compensation: TWN renders the value as read-only text inside the
            // employer card (not as an <input> field) — the card is uneditable
            // because it is "verified through The Work Number and cannot be modified".
            // Strategy:
            //   • If a specific value is provided → assert that exact text is visible.
            //   • Otherwise → assert the "Annual Income" label rendered AND that a
            //     dollar-amount string ($N,NNN) appears anywhere on the page, which
            //     confirms TWN populated a figure without hard-coding the amount.
            if (inc?.totalAnnualCompensation) {
                const el = this.page.getByText(inc.totalAnnualCompensation, { exact: false }).first();
                await el.waitFor({ state: 'visible', timeout: 15000 });
                await el.scrollIntoViewIfNeeded();
                await expect(el).toBeVisible();
            } else {
                // Verify the "Annual Income" label is present (section rendered)
                const label = this.page.getByText(/Annual Income/i).first();
                await expect(label).toBeVisible({ timeout: 15000 });
                // Verify a dollar amount is visible next to the label
                const amount = this.page.locator('text=/\\$[0-9,]+/').first();
                await expect(amount).toBeVisible({ timeout: 5000 });
            }

            if (inc?.startDate) {
                const el = this.page.getByText(inc.startDate, { exact: false }).first();
                await el.waitFor({ state: 'visible', timeout: 15000 });
                await el.scrollIntoViewIfNeeded();
                await expect(el).toBeVisible();
            }
        });
    };
};

export default TWNPage;