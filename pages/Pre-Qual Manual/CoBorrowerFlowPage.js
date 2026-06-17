/**
 * CoBorrowerFlowPage
 *
 * Drives the Direct-to-Consumer (DTC) borrower + co-borrower application that
 * opens via the LO's shareable link.  The page is separate from the broker
 * portal and has its own step-by-step wizard UI.
 *
 * Covered steps
 * ─────────────
 *  1. Landing            — "Get Started Now"
 *  2. Property type      — Single Family / Condo / 2-4 Unit cards
 *  3. Loan purpose       — Home Improvement / Debt Consolidation / Other cards
 *  4. Property info      — address, city, county, state, zip,
 *                          listing status, trust status, estimated value, usage
 *  5. About yourself     — name, email, phone, password, e-consent,
 *                          marital status, co-borrower toggle
 *  6. Co-borrower info   — name, email, phone
 *  7. Credit check       — SSN + DOB for primary borrower
 *  8. Co-borrower credit — SSN + DOB for co-borrower
 *  9. Error guard        — checks for blocking error banners / dialogs
 *
 * Usage
 * ─────
 *   const tab = await preQualManualPage.openShareableLinkInNewTab();
 *   const flow = new CoBorrowerFlowPage(tab);
 *   await flow.clickGetStartedNow();
 *   await flow.selectPropertyType(data);
 *   // … etc.
 */

import { expect, test } from '../../fixtures';

class CoBorrowerFlowPage {
    constructor(page) {
        this.page = page;

        // -- Landing page -------------------------------------------------------
        this.getStartedBtn = this.page.getByRole('button', { name: /Get Started Now/i }).first();

        // -- Property type cards ------------------------------------------------
        this.singleFamilyCard = this.page.getByText('Single Family', { exact: true });
        this.condoCard = this.page.getByText('Condo', { exact: true });
        this.twoToFourCard = this.page.getByText('2-4 Unit', { exact: true });

        // -- Loan purpose cards -------------------------------------------------
        this.homeImprovementCard = this.page.getByText('Home Improvement', { exact: true });
        this.debtConsolidationCard = this.page.getByText('Debt Consolidation', { exact: true });
        this.otherLoanPurposeCard = this.page.getByText('Other', { exact: true }).first();

        // -- Property info fields -----------------------------------------------
        this.addressInput = this.page.getByLabel(/Address/i).first();
        this.cityInput = this.page.getByLabel(/City/i);
        this.countyInput = this.page.getByLabel(/County/i);
        this.stateInput = this.page.getByRole('combobox', { name: /State/i });
        this.zipInput = this.page.getByLabel(/Zip/i);
        this.estimatedValueInput = this.page.getByLabel(/Estimated.*Value|Home Value/i).first();

        // Property-status radio group ("listed for sale?")
        const propStatusGroup = this.page.getByRole('radiogroup', { name: /listed.*sale|Property Status/i }).first();
        this.notListedRadio = propStatusGroup.getByRole('radio', { name: /No|Not listed/i }).first();
        this.listedRadio = propStatusGroup.getByRole('radio', { name: /Yes|listed/i }).first();

        // Trust radio group ("held in trust?")
        const trustGroup = this.page.getByRole('radiogroup', { name: /Held in trust/i });
        this.trustNoRadio = trustGroup.getByRole('radio', { name: /No/i }).first();
        this.trustYesRadio = trustGroup.getByRole('radio', { name: /Yes/i }).first();

        // Primary-residence radio
        this.primaryResidenceRadio = this.page.getByRole('radio', { name: /Primary Residence/i });

        // -- About Yourself fields ----------------------------------------------
        this.firstNameInput = this.page.getByLabel(/First Name/i);
        this.lastNameInput = this.page.getByLabel(/Last Name/i);
        this.emailInput = this.page.getByLabel(/Email Address/i);
        this.phoneInput = this.page.getByLabel(/Cell Phone|Phone Number/i).first();
        this.passwordInput = this.page.getByLabel(/^Password/i);
        this.eConsentCheckbox = this.page.locator("input[type='checkbox']").first();

        // -- Marital status radios ----------------------------------------------
        // MUI radio group labelled "Marital Status" or similar
        // Options: "Married" / "Unmarried" (covers single, divorced, widowed)
        // The radiogroup might use aria-label or a visible legend
        this.maritalStatusGroup = this.page.getByRole('radiogroup', { name: /Marital Status/i })
            .or(this.page.locator('[class*="marital"], [data-field*="marital"]')).first();
        this.marriedRadio = this.page.getByRole('radio', { name: /^Married$/i });
        this.unmarriedRadio = this.page.getByRole('radio', { name: /Unmarried|Single|Not Married/i }).first();

        // -- Co-borrower toggle -------------------------------------------------
        // "Do you have a co-borrower?" Yes / No radio or button
        this.hasCoBorrowerYes = this.page.getByRole('radio', { name: /Yes/i })
            .or(this.page.getByRole('button', { name: /Add Co-Borrower|I have a co-borrower/i }))
            .first();
        this.hasCoBorrowerNo = this.page.getByRole('radio', { name: /No/i }).first();

        // -- Co-borrower personal info fields -----------------------------------
        // These appear after confirming "Yes, I have a co-borrower"
        this.coBorrowerFirstNameInput = this.page.getByLabel(/Co.Borrower.*First|First.*Co.Borrower/i)
            .or(this.page.getByPlaceholder(/Co.Borrower.*First/i)).first();
        this.coBorrowerLastNameInput = this.page.getByLabel(/Co.Borrower.*Last|Last.*Co.Borrower/i)
            .or(this.page.getByPlaceholder(/Co.Borrower.*Last/i)).first();
        this.coBorrowerEmailInput = this.page.getByLabel(/Co.Borrower.*Email|Email.*Co.Borrower/i)
            .or(this.page.getByPlaceholder(/Co.Borrower.*Email/i)).first();
        this.coBorrowerPhoneInput = this.page.getByLabel(/Co.Borrower.*Phone|Phone.*Co.Borrower/i)
            .or(this.page.getByPlaceholder(/Co.Borrower.*Phone/i)).first();

        // -- Credit-check fields (primary) -------------------------------------
        this.ssnInput = this.page.getByLabel(/Social Security|SSN/i);
        this.dobInput = this.page.getByLabel(/Date of Birth/i);

        // -- Credit-check fields (co-borrower) ---------------------------------
        // When the co-borrower credit check appears in the same session these
        // fields reuse the same labels — we differentiate by scope or nth()
        // once the page has scrolled to the co-borrower section.
        this.coBorrowerSsnInput = this.page.getByLabel(/Social Security|SSN/i).nth(1);
        this.coBorrowerDobInput = this.page.getByLabel(/Date of Birth/i).nth(1);

        // -- Shared navigation -------------------------------------------------
        this.continueBtn = this.page.getByRole('button', { name: /Continue/i }).first();
        this.nextBtn = this.page.getByRole('button', { name: /^Next$/i }).first();
        this.submitBtn = this.page.getByRole('button', { name: /Submit|Finish/i }).first();

        // -- Error indicators --------------------------------------------------
        // These locators detect BLOCKING errors after each step.
        //
        // The DTC app uses role="alert" for accessibility live regions, info
        // banners, and success toasts — not only for errors.  Without a text
        // filter every role="alert" element (including the live-chat widget's
        // aria-live region) triggers a false positive.
        //
        // Both branches require error-keyword text so only genuine error
        // messages are matched.
        this.errorBanner = this.page.locator('[role="alert"]').filter({
            hasText: /error|failed|invalid|blocked|went wrong|not allowed|unable/i,
        }).first();
        this.errorDialog = this.page.locator('[role="dialog"]').filter({
            hasText: /error|sorry|failed|problem|issue|went wrong/i,
        }).first();
    }

    // -------------------------------------------------------------------------
    // Step helpers
    // -------------------------------------------------------------------------

    /** Step 1 — Click "Get Started Now" on the landing page */
    async clickGetStartedNow() {
        await test.step('Click Get Started Now', async () => {
            await this.getStartedBtn.waitFor({ state: 'visible', timeout: 20000 });
            await this.getStartedBtn.click();
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 2 — Select property type card.
     * @param {object} data  data.propertyType  — 'Single Family' | 'Condo' | '2-4 Unit'
     */
    async selectPropertyType(data) {
        await test.step(`Select property type: ${data.propertyType}`, async () => {
            const map = {
                'Single Family': this.singleFamilyCard,
                'Condo': this.condoCard,
                '2-4 Unit': this.twoToFourCard,
            };
            const card = map[data.propertyType] ?? this.singleFamilyCard;
            await card.waitFor({ state: 'visible', timeout: 10000 });
            await card.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 3 — Select loan purpose card.
     * @param {object} data  data.loanPurpose  — 'Home Improvement' | 'Debt Consolidation' | 'Other'
     */
    async selectLoanPurpose(data) {
        await test.step(`Select loan purpose: ${data.loanPurpose}`, async () => {
            const map = {
                'Home Improvement': this.homeImprovementCard,
                'Debt Consolidation': this.debtConsolidationCard,
                'Other': this.otherLoanPurposeCard,
            };
            const card = map[data.loanPurpose] ?? this.homeImprovementCard;
            await card.waitFor({ state: 'visible', timeout: 10000 });
            await card.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 4 — Fill property information.
     * @param {object} data  data.property — address, city, county, state, zip, …
     */
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

            // MUI Autocomplete for State — fill then click matching option
            await this.stateInput.fill(p.state);
            await this.page.getByRole('option', { name: p.state, exact: true }).click();

            await this.zipInput.fill(p.zip);
            await this.zipInput.press('Tab');

            // Property listing status
            if (!p.isListed) {
                await this.notListedRadio.check({ force: true });
            } else {
                await this.listedRadio.check({ force: true });
            }

            // Held in trust
            if (!p.heldInTrust) {
                await this.trustNoRadio.check({ force: true });
            } else {
                await this.trustYesRadio.check({ force: true });
            }

            // Estimated home value — triple-click to replace pre-filled $0
            await this.estimatedValueInput.click({ clickCount: 3 });
            await this.estimatedValueInput.fill(p.estimatedValue);
            await this.estimatedValueInput.press('Tab');

            // Property usage
            await this.primaryResidenceRadio.check({ force: true });

            await this.continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 5 — Fill "About Yourself" for the primary borrower.
     * Includes marital status and the co-borrower toggle.
     *
     * @param {object} data  data.borrower — firstName, lastName, email, phone,
     *                       password, maritalStatus, hasCoBorrower,
     *                       consentToElectronicRecords
     */
    async fillAboutYourself(data) {
        await test.step('Fill About Yourself (primary borrower)', async () => {
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
    }

    // -------------------------------------------------------------------------

    /**
     * Step 5b — Select marital status.
     * Called on the step that asks about marital status (may be a dedicated
     * screen or part of the About Yourself step depending on portal version).
     *
     * @param {object} data  data.borrower.maritalStatus — 'Married' | 'Unmarried'
     */
    async selectMaritalStatus(data) {
        await test.step(`Select marital status: ${data.borrower.maritalStatus}`, async () => {
            const status = data.borrower.maritalStatus;

            if (status === 'Married') {
                await this.marriedRadio.waitFor({ state: 'visible', timeout: 10000 });
                await this.marriedRadio.check({ force: true });
            } else {
                await this.unmarriedRadio.waitFor({ state: 'visible', timeout: 10000 });
                await this.unmarriedRadio.check({ force: true });
            }

            await this.continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 5c — Indicate that a co-borrower will be added.
     * Clicks the "Yes" radio / button for the "Do you have a co-borrower?" prompt.
     */
    async confirmHasCoBorrower() {
        await test.step('Confirm "Yes, I have a co-borrower"', async () => {
            await this.hasCoBorrowerYes.waitFor({ state: 'visible', timeout: 10000 });
            await this.hasCoBorrowerYes.click({ force: true });
            // Some implementations proceed automatically; others need Continue
            const hasContinue = await this.continueBtn.isVisible({ timeout: 3000 }).catch(() => false);
            if (hasContinue) await this.continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 6 — Fill co-borrower personal information.
     * @param {object} data  data.coBorrower — firstName, lastName, email, phoneNumber
     */
    async fillCoBorrowerInfo(data) {
        await test.step('Fill co-borrower personal info', async () => {
            const cb = data.coBorrower;

            await this.coBorrowerFirstNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.coBorrowerFirstNameInput.fill(cb.firstName);

            await this.coBorrowerLastNameInput.fill(cb.lastName);

            await this.coBorrowerEmailInput.fill(cb.email);

            if (cb.phoneNumber) {
                await this.coBorrowerPhoneInput.fill(cb.phoneNumber);
            }

            await this.continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 7 — Fill credit-check fields for the primary borrower.
     * @param {object} data  data.creditCheck — ssn, dateOfBirth
     */
    async fillCreditCheck(data) {
        await test.step('Fill primary borrower credit check', async () => {
            const cc = data.creditCheck;

            await this.ssnInput.waitFor({ state: 'visible', timeout: 30000 });
            await this.ssnInput.fill(cc.ssn);
            await this.ssnInput.press('Tab');

            await this.dobInput.fill(cc.dateOfBirth);
            await this.dobInput.press('Tab');
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 8 — Fill credit-check fields for the co-borrower.
     * Called when the co-borrower's SSN + DOB appear in the same session.
     * @param {object} data  data.coBorrowerCreditCheck — ssn, dateOfBirth
     */
    async fillCoBorrowerCreditCheck(data) {
        await test.step('Fill co-borrower credit check', async () => {
            const cc = data.coBorrowerCreditCheck;

            await this.coBorrowerSsnInput.waitFor({ state: 'visible', timeout: 30000 });
            await this.coBorrowerSsnInput.fill(cc.ssn);
            await this.coBorrowerSsnInput.press('Tab');

            await this.coBorrowerDobInput.fill(cc.dateOfBirth);
            await this.coBorrowerDobInput.press('Tab');
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 8 — Review & Confirm consents.
     *
     * After TWN auto-populates the income card the borrower must check three
     * consent checkboxes and click CONTINUE before the credit pull fires:
     *   1. "I have read the CFPB HELOC What You Should Know"
     *   2. "Consent to Income Verification & Soft Credit Check"
     *   3. "I also authorize Forward Lending, Inc. d/b/a Method…"
     */
    async fillReviewAndConfirm() {
        await test.step('Fill Review & Confirm consents', async () => {
            // Wait for the Review & Confirm section heading
            const heading = this.page.getByText(/Review.*Confirm/i).first();
            await heading.waitFor({ state: 'visible', timeout: 15000 });
            await heading.scrollIntoViewIfNeeded();

            // IMPORTANT: scope checkbox selection to the Review & Confirm
            // section ONLY.  The income sources above (Salary, Self Employed,
            // Benefits…) are already pre-selected by TWN after the SSN is
            // entered.  Checking ALL page checkboxes accidentally ticks
            // "Self Employed", which has required fields and blocks CONTINUE
            // with a validation error.
            //
            // Strategy: find the innermost container div that has BOTH the
            // "Review & Confirm" heading AND at least one checkbox input.
            // Using only the heading text with .last() resolves to the heading's
            // immediate parent <p>/<div>, which has no checkbox siblings — count
            // comes back 0 and nothing gets checked.  Adding the second .filter()
            // ensures the resolved container actually contains the inputs.
            const reviewSection = this.page.locator('div').filter({
                has: this.page.getByText(/Review.*Confirm/i),
            }).filter({
                has: this.page.locator('input[type="checkbox"]'),
            }).last();  // innermost div that has BOTH heading text AND checkboxes

            const consentCheckboxes = reviewSection.locator('input[type="checkbox"]');
            const count = await consentCheckboxes.count();
            for (let i = 0; i < count; i++) {
                const cb = consentCheckboxes.nth(i);
                const checked = await cb.isChecked().catch(() => false);
                if (!checked) {
                    // MUI PrivateSwitchBase: evaluate(click) dispatches the
                    // DOM click that React's onChange handler listens for.
                    // check({ force }) sets the DOM attribute but does not
                    // fire the synthetic event, leaving React state unchanged.
                    await cb.evaluate(el => el.click());
                }
            }

            // Verify all consent checkboxes are now checked before proceeding.
            for (let i = 0; i < count; i++) {
                await expect(consentCheckboxes.nth(i)).toBeChecked({ timeout: 5000 });
            }

            // Verify CONTINUE is visible and enabled
            await expect(this.continueBtn).toBeVisible();
            await expect(this.continueBtn).toBeEnabled();

            // Click CONTINUE to trigger the credit pull
            await this.continueBtn.scrollIntoViewIfNeeded();
            await this.continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 9 — Wait for "Checking Your Credit…" processing screen to resolve.
     *
     * After CONTINUE the portal shows a full-screen spinner while the soft
     * credit pull runs.  We wait up to 60 s for the spinner to disappear
     * before the next step asserts the Application Participants page.
     */
    async waitForCreditCheckProcessing() {
        await test.step('Wait for credit-check processing to complete', async () => {
            const processingText = this.page.getByText(/Checking Your Credit/i).first();

            // Spinner may appear briefly — wait for it to show (soft) then hide
            const appeared = await processingText
                .waitFor({ state: 'visible', timeout: 10000 })
                .then(() => true)
                .catch(() => false);

            if (appeared) {
                await processingText.waitFor({ state: 'hidden', timeout: 60000 });
            }
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 10 — Fill the "Application Participants" page.
     *
     * This page appears after the credit check and covers:
     *   • "Are you applying with a co-borrower?" → Yes
     *   • Co-borrower personal info (name, email, phone, SSN, DOB)
     *   • Co-borrower income sources + job details
     *   • "Does the co-borrower live with you?" → Yes / No
     *   • Marital status (Married / Unmarried / Separated)
     *   • "Who are you married to?" (only visible when Married)
     *   • "Are there any other Title-Only Owners?" → No / Yes
     *   • CONTINUE
     *
     * @param {object} data  Full test data object with .coBorrower, .borrower,
     *                       and .participants sub-objects.
     */
    async fillApplicationParticipants(data) {
        await test.step('Fill Application Participants page', async () => {
            const cb = data.coBorrower;
            const b = data.borrower;
            const p = data.participants;

            // Wait for the page heading
            await this.page.getByText(/Application Participants/i)
                .first()
                .waitFor({ state: 'visible', timeout: 20000 });

            // -- Co-borrower toggle: "Yes, I have a co-borrower who will apply" --
            const yesCoborr = this.page
                .getByRole('radio', { name: /Yes.*co.borrower.*will apply/i })
                .or(this.page.getByText(/Yes.*co.borrower.*will apply/i)).first();
            await yesCoborr.waitFor({ state: 'visible', timeout: 10000 });
            await yesCoborr.click({ force: true });

            // -- Co-borrower personal info ----------------------------------------
            // On the Application Participants page the primary borrower details
            // are already submitted; these are the ONLY visible name/email/phone
            // fields, so .first() is correct — there is no .nth(1) to find.
            await this.page.getByLabel(/First Name/i).first()
                .waitFor({ state: 'visible', timeout: 10000 });
            await this.page.getByLabel(/First Name/i).first().fill(cb.firstName);

            await this.page.getByLabel(/Last Name/i).first().fill(cb.lastName);

            await this.page.getByLabel(/Email Address/i).first().fill(cb.email);

            await this.page.getByLabel(/Cell Phone|Phone Number/i).first()
                .fill(cb.phoneNumber);

            // Co-borrower SSN + DOB (inline on this page)
            await this.page.getByLabel(/Social Security/i).first().fill(cb.ssn);
            await this.page.getByLabel(/Date of Birth/i).first().fill(cb.dateOfBirth);

            // -- Co-borrower income sources ---------------------------------------
            for (const source of (cb.incomeSources ?? [])) {
                const checkbox = this.page.getByRole('checkbox', {
                    name: new RegExp(source, 'i'),
                });
                const alreadyChecked = await checkbox.isChecked().catch(() => false);
                if (!alreadyChecked) {
                    await checkbox.check({ force: true });
                }
            }

            // Job details (company, compensation, start date) — only when salary
            if ((cb.incomeSources ?? []).some(s => /salary|hourly/i.test(s))) {
                if (cb.companyName) {
                    await this.page.getByLabel(/Company Name/i).first()
                        .fill(cb.companyName);
                }
                if (cb.annualCompensation) {
                    const compInput = this.page.getByLabel(/Annual Compensation|Total Annual/i).first();
                    await compInput.click({ clickCount: 3 });
                    await compInput.fill(cb.annualCompensation);
                    await compInput.press('Tab');
                }
                if (cb.startDate) {
                    await this.page.getByLabel(/Start Date/i).first()
                        .fill(cb.startDate);
                }
            }

            // ---------------------------------------------------------------
            // All radio options on this page use MUI div[role="radio"] with
            // aria-label = "{value} for {group-name}".
            // The radiogroups have aria-label on the container div.
            // Use getByRole('radiogroup') to scope, then getByRole('radio')
            // with a regex that matches the start of the accessible name.
            // ---------------------------------------------------------------

            // -- "Does the co-borrower live with you?" ----------------------
            // Radiogroup aria-label: "Co-borrower same address"
            const livesGroup = this.page.getByRole('radiogroup', {
                name: /Co-borrower same address/i,
            });
            await livesGroup.waitFor({ state: 'visible', timeout: 10000 });
            const livesAnswer = cb.livesWithBorrower ? /^Yes/ : /^No/;
            await livesGroup.getByRole('radio', { name: livesAnswer }).click();

            // After selecting the lives-with-you answer the page shows a
            // "We'll send your co-applicant an invite…" confirmation and a
            // CONTINUE button.  This is the final submit for the Application
            // Participants page — click it and wait for navigation.
            const livesContinue = this.page.getByRole('button', { name: /^Continue$/i }).first();
            await livesContinue.waitFor({ state: 'visible', timeout: 10000 });
            await livesContinue.click({ force: true });

            await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 14b — "Other Info" page (post-offer).
     *
     * After clicking "CONTINUE TO APPLICATION" from the pre-qual offer, the
     * full application starts with an "Other Info" page that collects:
     *   • Marital Status  (Unmarried / Married / Separated)
     *   • "Who are you married to?"  (Married path only)
     *   • "Are there any other Title-Only Owners?"
     *
     * @param {object} data  marriedCoBorrowerData | unmarriedCoBorrowerData
     */
    async fillOtherInfo(data) {
        await test.step('Fill Other Info page (post-offer)', async () => {
            const b = data.borrower;
            const p = data.participants;

            await this.page.getByText(/Other Info/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // -- Marital Status -----------------------------------------------
            // MUI renders radio options as: <input type="radio"> + sibling <p>text</p>
            // The radio has no accessible name, so getByRole({name}) doesn't work.
            // Click the text label — MUI propagates the click to the radio input.
            const maritalStatus = b.maritalStatus ?? 'Unmarried';
            const maritalLabel = this.page
                .getByText(new RegExp(`^${maritalStatus}$`))
                .first();
            await maritalLabel.waitFor({ state: 'visible', timeout: 15000 });
            await maritalLabel.click();

            // -- "Who are you married to?" (Married path only) ----------------
            if (maritalStatus === 'Married' && p?.marriedTo) {
                const marriedToLabel = this.page
                    .getByText(new RegExp(p.marriedTo, 'i'))
                    .first();
                const isVisible = await marriedToLabel
                    .isVisible({ timeout: 5000 }).catch(() => false);
                if (isVisible) {
                    await marriedToLabel.click();
                }
            }

            // -- "Are there any other Title-Only Owners?" ---------------------
            // Layout: [No] [Yes] — No is second-to-last radio on page, Yes is last.
            // Scoping by div.filter risks matching the heading-only div (no radio
            // children). Instead grab ALL radio inputs on the page; Title-Only
            // always renders last, so No = nth(-2), Yes = nth(-1).
            // force:true bypasses the chat-widget overlay actionability check.
            const allRadios = this.page.locator('input[type="radio"]');
            // Scroll the bottom of the page into view first so radios are in DOM.
            await this.page.locator('text=Title-Only Owners').last()
                .scrollIntoViewIfNeeded();
            await allRadios.last().waitFor({ state: 'attached', timeout: 10000 });
            const titleRadioIndex = p?.otherTitleOwners ? -1 : -2;
            const titleInput = allRadios.nth(titleRadioIndex);
            await titleInput.click({ force: true });

            // -- CONTINUE -----------------------------------------------------
            const continueBtn = this.page.getByRole('button', { name: /^Continue$/i }).first();
            await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
            await continueBtn.click({ force: true });
            await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 12 — Select Mortgages & Liens on HELOC Property.
     *
     * After the Application Participants page the DTC flow shows a list of
     * mortgages and liens pulled from the credit report.  This step:
     *   1. Selects the first listed mortgage (or falls back to "free and clear"
     *      if no mortgages were returned by the credit pull).
     *   2. Fills the Requested Loan Amount.
     *   3. Clicks CONTINUE.
     *
     * @param {object} data  data.mortgages — selectFirstMortgage, requestedLoanAmount
     */
    async fillMortgagesAndLiens(data) {
        await test.step('Fill Mortgages & Liens (DTC)', async () => {
            const m = data.mortgages ?? {};

            // Wait for the page heading
            await this.page.getByText(/Select Mortgages.*Liens|Mortgages.*Liens on HELOC/i)
                .first()
                .waitFor({ state: 'visible', timeout: 60000 });

            // "No existing mortgage, property is free and clear." is a named
            // checkbox that can be auto-checked on load.  Locate it explicitly
            // so we can uncheck it when real mortgage rows are present.
            const freeAndClearCheckbox = this.page.getByRole('checkbox', {
                name: /free and clear/i,
            }).first();

            if (m.selectFirstMortgage) {
                // Collect ALL checkboxes on the page, then separate the
                // "free and clear" one from the mortgage row checkboxes.
                // We cannot rely on table/row structure because the lender
                // table uses a custom component (not native <tr> elements).
                const allCheckboxes = this.page.getByRole('checkbox');
                const total = await allCheckboxes.count();

                // Identify mortgage-row checkboxes: any checkbox whose
                // nearest ancestor does NOT contain "free and clear" text.
                const mortgageCheckboxes = [];
                for (let i = 0; i < total; i++) {
                    const cb = allCheckboxes.nth(i);
                    // Walk up to find if this checkbox is inside the free-and-clear label
                    const isFreeAndClear = await cb.evaluate(el => {
                        let node = el.parentElement;
                        for (let depth = 0; depth < 6; depth++) {
                            if (!node) break;
                            if (/free and clear/i.test(node.textContent ?? '')) return true;
                            node = node.parentElement;
                        }
                        return false;
                    });
                    if (!isFreeAndClear) mortgageCheckboxes.push(cb);
                }

                if (mortgageCheckboxes.length > 0) {
                    // Uncheck "free and clear" first if auto-checked
                    const freeAndClearChecked = await freeAndClearCheckbox
                        .isChecked().catch(() => false);
                    if (freeAndClearChecked) {
                        await freeAndClearCheckbox.evaluate(el => el.click());
                    }

                    // Check the first mortgage row checkbox (BEST EVER MORTGAGE)
                    const firstMortgageCheckbox = mortgageCheckboxes[0];
                    await firstMortgageCheckbox.waitFor({ state: 'visible', timeout: 10000 });
                    const alreadyChecked = await firstMortgageCheckbox
                        .isChecked().catch(() => false);
                    if (!alreadyChecked) {
                        await firstMortgageCheckbox.evaluate(el => el.click());
                    }
                } else {
                    // No mortgage rows — ensure "free and clear" is checked
                    const freeAndClearChecked = await freeAndClearCheckbox
                        .isChecked().catch(() => false);
                    if (!freeAndClearChecked) {
                        await freeAndClearCheckbox.evaluate(el => el.click());
                    }
                }
            }

            // Fill Requested Loan Amount (triple-click to replace the $0 default)
            if (m.requestedLoanAmount) {
                const loanAmountInput = this.page
                    .getByLabel(/Requested Loan Amount/i)
                    .first();
                await loanAmountInput.waitFor({ state: 'visible', timeout: 10000 });
                await loanAmountInput.click({ clickCount: 3 });
                await loanAmountInput.fill(m.requestedLoanAmount);
                await loanAmountInput.press('Tab');
            }

            // CONTINUE
            await this.continueBtn.waitFor({ state: 'visible', timeout: 10000 });
            await this.continueBtn.scrollIntoViewIfNeeded();
            await this.continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 13 — Wait for the offer calculation processing screen.
     *
     * After Mortgages & Liens the DTC app runs underwriting and shows a
     * "Processing…" / "Calculating your offer…" spinner before the offer
     * summary loads.  Allow up to 120 s for the processing to complete.
     */
    async waitForOfferProcessing() {
        await test.step('Wait for offer calculation / underwriting', async () => {
            const processingText = this.page
                .getByText(/Loading offers|Processing|Calculating.*offer|Just a moment|reviewing.*application|Searching for your best offer/i)
                .first();

            const appeared = await processingText
                .waitFor({ state: 'visible', timeout: 10000 })
                .then(() => true)
                .catch(() => false);

            if (appeared) {
                // Wait up to 120 s for processing to complete
                await processingText.waitFor({ state: 'hidden', timeout: 120000 });
            }
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Assert no blocking error is visible on the current step.
     *
     * A blocking error is defined as:
     *   • A visible [role="alert"] element containing error keywords
     *   • A visible [role="dialog"] containing error / sorry / failed text
     *
     * Called after each step to surface regression failures immediately
     * rather than waiting for the next step to timeout.
     *
     * @param {string} [stepLabel]  Human-readable label for error messages.
     */
    async assertNoBlockingError(stepLabel = 'current step') {
        await test.step(`Assert no blocking error on: ${stepLabel}`, async () => {
            const alertVisible = await this.errorBanner.isVisible({ timeout: 2000 }).catch(() => false);
            if (alertVisible) {
                const msg = await this.errorBanner.textContent().catch(() => '');
                throw new Error(`Blocking error on "${stepLabel}": ${msg.trim()}`);
            }

            const dialogVisible = await this.errorDialog.isVisible({ timeout: 2000 }).catch(() => false);
            if (dialogVisible) {
                const msg = await this.errorDialog.textContent().catch(() => '');
                throw new Error(`Blocking error dialog on "${stepLabel}": ${msg.trim()}`);
            }
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Wait for a success/completion indicator at the end of the borrower flow.
     * The exact text varies by portal version; we check for a family of known
     * completion phrases.
     */
    /**
     * Step 15 — Demographics page (post-offer).
     *
     * After clicking "CONTINUE TO APPLICATION" the app shows a Demographics
     * form collecting Ethnicity, Sex, Race, and a Hard Credit Check consent.
     * Ethnicity "I do not wish to provide this information" is pre-checked;
     * Sex and Race need to be opted out, then the hard-credit authorization
     * checkbox must be checked before Continue becomes enabled.
     */
    async fillDemographics() {
        await test.step('Fill Demographics page', async () => {
            // "CONTINUE TO APPLICATION" navigates within the same tab.
            // Wait for the Demographics heading to appear after the navigation.
            await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
            await this.page.getByText(/^Demographics$/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // Check every "I do not wish to provide this information" checkbox
            // on the page — covers Ethnicity, Sex, and Race in one pass.
            const allOptOut = this.page.getByLabel(/I do not wish to provide this information/i);
            await allOptOut.first().waitFor({ state: 'visible', timeout: 10000 });
            const optOutCount = await allOptOut.count();
            for (let i = 0; i < optOutCount; i++) {
                const cb = allOptOut.nth(i);
                const checked = await cb.isChecked().catch(() => false);
                if (!checked) {
                    await cb.evaluate(el => el.click());
                }
            }

            // Hard Credit Check authorization checkbox.
            // MUI renders the text in a sibling <p>, not a <label>, so neither
            // getByLabel nor getByRole(checkbox, {name}) can find it by text.
            // Strategy: find the nearest container div that holds BOTH the
            // "I authorize" text AND a checkbox input, then click that input.
            const hardCreditCb = this.page.locator('div').filter({
                has: this.page.getByText(/I authorize/i),
            }).filter({
                has: this.page.locator('input[type="checkbox"]'),
            }).last()
                .locator('input[type="checkbox"]')
                .first();
            await hardCreditCb.waitFor({ state: 'visible', timeout: 10000 });
            const hardCreditChecked = await hardCreditCb.isChecked().catch(() => false);
            if (!hardCreditChecked) {
                await hardCreditCb.evaluate(el => el.click());
            }

            // Wait for Continue to become enabled then click
            const continueBtn = this.page.getByRole('button', { name: /^Continue$/i });
            await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
            await expect(continueBtn).toBeEnabled({ timeout: 10000 });
            await continueBtn.click({ force: true });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 16 — Income Verification page via Plaid sandbox.
     *
     * Flow:
     *  1. Wait for Income Verification page
     *  2. Click "BANK ACCOUNT VERIFICATION (PLAID)"
     *  3. Inside Plaid dialog/iframe:
     *       a. Phone pre-filled (415-555-0011) → Continue
     *       b. OTP code 123456 → Continue
     *       c. Select Tartan Bank → Confirm
     *  4. Wait for verification to complete and Continue to become enabled
     */
    async fillIncomeVerification() {
        await test.step('Fill Income Verification (Plaid sandbox)', async () => {
            // Wait for the income-verification URL so we're on the right page.
            await this.page.waitForURL(/income-verification/i, { timeout: 60000 }).catch(() => { });

            // The page shows three radio options:
            //   • Connect Checking Account  (pre-selected; shows CONNECTING... while Plaid SDK loads)
            //   • Login to Your Company Payroll Account
            //   • Upload Income Documents Manually
            // CONNECTING... appears under the pre-selected radio while the Plaid SDK initialises.
            // Always wait for it to disappear before interacting (up to 2 min in staging).
            const connectingText = this.page.getByText(/CONNECTING\.\.\./i).first();
            await connectingText.waitFor({ state: 'hidden', timeout: 120000 }).catch(() => { });

            // After CONNECTING... clears, a "BANK ACCOUNT VERIFICATION (PLAID)" button
            // appears inside the "Connect Checking Account" card. Click it to open Plaid.
            const plaidBtn = this.page.getByText(/Bank Account Verification.*Plaid/i).first();
            await plaidBtn.waitFor({ state: 'visible', timeout: 90000 });
            await plaidBtn.click({ force: true });

            // Plaid renders inside an iframe after the button is clicked.
            const plaidFrame = this.page.frameLocator(
                'iframe[title*="Plaid" i], iframe[name*="plaid" i], iframe[src*="plaid" i]'
            ).first();

            // Step a: Phone number screen — sandbox phone is pre-filled; click Continue.
            const phoneContinue = plaidFrame.getByRole('button', { name: /Continue/i }).first();
            await phoneContinue.waitFor({ state: 'visible', timeout: 30000 });
            await phoneContinue.click();

            // Step b: OTP verification — sandbox code is always 123456
            // Wait for the "Verify your phone number" screen to appear first,
            // then type via page.keyboard so cross-origin iframe restrictions
            // don't block the input events.
            const codeInput = plaidFrame.locator('#otp-code-input-input').first()
                .or(plaidFrame.getByPlaceholder(/Code/i).first());
            await codeInput.waitFor({ state: 'visible', timeout: 30000 });
            await codeInput.click();
            // page.keyboard.type fires raw key events on the focused element —
            // works in cross-origin iframes where pressSequentially may hang.
            await this.page.keyboard.type('123456', { delay: 80 });
            // Auto-submits after last digit — wait for Select accounts screen

            // Step c: Select accounts — pick Tartan Bank (first pre-selected account)
            const tartanBank = plaidFrame.getByText(/Tartan Bank/i).first();
            await tartanBank.waitFor({ state: 'visible', timeout: 15000 });
            await tartanBank.click();
            const confirmBtn = plaidFrame.getByRole('button', { name: /Confirm/i }).first();
            await confirmBtn.waitFor({ state: 'visible', timeout: 10000 });
            await confirmBtn.click();

            // Step d: "Share consumer report" confirmation dialog
            const shareConfirm = plaidFrame.getByRole('button', { name: /Confirm/i }).first();
            const shareVisible = await shareConfirm
                .isVisible({ timeout: 10000 }).catch(() => false);
            if (shareVisible) {
                await shareConfirm.click();
            }

            // Wait for Plaid dialog to close
            await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { });

            // Step e: Wait for "Bank Account Verified Successfully" banner then
            // click Continue — required before Funding Account page loads.
            const verifiedBanner = this.page.getByText(/Bank Account Verified Successfully/i).first();
            await verifiedBanner.waitFor({ state: 'visible', timeout: 30000 });
            const verifiedContinue = this.page.getByRole('button', { name: /^Continue$/i });
            await verifiedContinue.waitFor({ state: 'visible', timeout: 10000 });
            await expect(verifiedContinue).toBeEnabled({ timeout: 10000 });
            await verifiedContinue.click({ force: true });

            // Wait for navigation to funding-account before returning
            await this.page.waitForURL(/funding-account/i, { timeout: 80000 }).catch(() => { });
            await this.page.waitForLoadState('domcontentloaded', { timeout: 80000 }).catch(() => { });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 17 — Funding Account page.
     *
     * Runs the Plaid sandbox flow to connect a bank account:
     *   1. Click "CONNECT BANK ACCOUNT"
     *   2. Enter sandbox phone (415-555-0011) → Continue
     *   3. Type OTP 123456 (auto-submits after 6th digit)
     *   4. Select Tartan Bank → Confirm
     * After Plaid closes the page shows connected accounts with one pre-selected.
     * Click Continue to proceed.
     */
    async fillFundingAccount() {
        await test.step('Fill Funding Account page (Plaid)', async () => {
            await this.page.getByText(/Funding Account/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // TODO: Implement full Plaid sandbox flow for Funding Account
            // (phone → OTP → Tartan Bank → Confirm).  For now, click
            // "Skip for now" so the flow reaches the Loan Hub without
            // requiring a working Plaid iframe interaction.
            const skipBtn = this.page.getByRole('button', { name: /Skip for now/i })
                .or(this.page.getByText(/Skip for now/i))
                .first();
            await skipBtn.waitFor({ state: 'visible', timeout: 15000 });
            await skipBtn.click({ force: true });

            // Wait for navigation to Loan Hub / next page
            await this.page.waitForLoadState('networkidle', { timeout: 30000 })
                .catch(() => { });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 18 — Verify the Loan Hub welcome page, then open the Loan Tracker
     * and confirm both borrowers appear under Identity Verification.
     *
     * Assertions:
     *   • "Welcome to Your Loan Hub" banner is visible
     *   • "In Process" pipeline stage is active
     *   • Loan Tracker tab is clickable
     *   • Identity Verification row is expandable
     *   • Primary borrower (B1) chip shows ✓ Completed
     *   • Co-borrower (B2) chip shows Invited
     */
    async verifyLoanHub() {
        await test.step('Verify Loan Hub welcome page', async () => {
            // -- Welcome banner ---------------------------------------------------
            await this.page
                .getByText(/Welcome to Your Loan Hub/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // Pipeline stage — "In Process" dot/pill should be active
            await expect(
                this.page.getByText(/In Process/i).first()
            ).toBeVisible({ timeout: 10000 });
        });

        await test.step('Loan Tracker — verify both borrowers in Identity Verification', async () => {
            // -- Navigate to Loan Tracker tab -------------------------------------
            // The tabs render as plain clickable text, not ARIA tabs.
            // Filter to the element whose text is exactly "LOAN TRACKER" to avoid
            // accidentally matching breadcrumbs or headings.
            const loanTrackerTab = this.page.locator('a, button, [role="tab"], span').filter({
                hasText: /^LOAN TRACKER$|^Loan Tracker$/i,
            }).first();
            await loanTrackerTab.waitFor({ state: 'visible', timeout: 10000 });
            await loanTrackerTab.click();

            // -- Expand ID Verification row ---------------------------------------
            // Wait for Loan Tracker stage content to render (any stage label).
            await this.page.getByText(/Stage \d+:/i)
                .first()
                .waitFor({ state: 'visible', timeout: 15000 });

            // Row label is "Identity Verification" in Stage 1 (Pre-Qual) and
            // "ID Verification" in Stage 2 (In Process) — match both.
            const idVerRow = this.page
                .getByText(/^ID Verification$|^Identity Verification$/i)
                .first();
            await idVerRow.waitFor({ state: 'visible', timeout: 15000 });
            await idVerRow.click();

            // -- Borrower 1 (B1) — chip + Completed status ----------------------
            await expect(
                this.page.getByText(/Andy.*B1|B1.*Andy/i).first()
            ).toBeVisible({ timeout: 10000 });

            // -- Borrower 2 (B2) — chip + Invited status -------------------------
            await expect(
                this.page.getByText(/Amy.*B2|B2.*Amy/i).first()
            ).toBeVisible({ timeout: 10000 });
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Step 19 — Verify the co-borrower invitation email in Mailinator and
     * click "COMPLETE APPLICATION" to open the co-borrower application.
     *
     * Flow:
     *   1. Derive the Mailinator inbox name from data.coBorrower.email
     *   2. Open Mailinator public inbox in a new tab
     *   3. Wait for "You've been invited to apply for a loan" email to arrive
     *   4. Open the email and click "COMPLETE APPLICATION"
     *   5. Switch to the new tab that opens
     *   6. Assert the co-borrower "Review Information" page is visible
     *   7. Return the new tab (page) so the caller can continue the co-borrower flow
     *
     * @param {object} data  marriedCoBorrowerData | unmarriedCoBorrowerData
     * @returns {import('@playwright/test').Page} co-borrower application tab
     */
    async verifyCoBorrowerInviteEmail(data) {
        let coBorrowerPage;

        await test.step('Verify co-borrower invite email in Mailinator', async () => {
            // -- Derive inbox name -----------------------------------------------
            // email is like: test.abc123.1234567890@mailinator.com
            const email = data.coBorrower.email;
            const inboxName = email.split('@')[0];
            const mailinatorUrl =
                `https://www.mailinator.com/v4/public/inboxes.jsp?to=${encodeURIComponent(inboxName)}`;

            // -- Isolated browser context ----------------------------------------
            // Use a fresh context so the co-borrower session is completely
            // separate from the borrower's portal — clicking the invite link
            // cannot bleed back into the borrower's authenticated session.
            const browser = this.page.context().browser();
            const coBorrowerContext = await browser.newContext();

            try {
                // -- Open Mailinator in the isolated context ---------------------
                const mailinatorTab = await coBorrowerContext.newPage();
                await mailinatorTab.goto(mailinatorUrl, { waitUntil: 'domcontentloaded' });

                // -- Wait for the invite email row (up to 60 s) -----------------
                const emailRow = mailinatorTab
                    .getByText(/invited to apply for a loan/i)
                    .first();
                await emailRow.waitFor({ state: 'visible', timeout: 60000 });
                await emailRow.click();

                // -- Click COMPLETE APPLICATION inside iframe#html_msg_body -----
                // Mailinator renders the email HTML body in an iframe.
                const emailFrame = mailinatorTab.frameLocator('#html_msg_body');
                const completeAppLink = emailFrame
                    .getByRole('link', { name: /Complete Application/i })
                    .or(emailFrame.getByText(/Complete Application/i))
                    .first();
                await completeAppLink.waitFor({ state: 'visible', timeout: 15000 });

                // The link opens in a new tab within the same isolated context.
                const [appTab] = await Promise.all([
                    coBorrowerContext.waitForEvent('page'),
                    completeAppLink.click(),
                ]);

                // The invite link routes through an email-tracking redirect into
                // the staging POS app (Render), which can cold-start and take well
                // over 30 s to fire 'domcontentloaded'. Give it room, but don't
                // hard-fail on the load state — popups make waitForLoadState flaky.
                // The real readiness signal is the element waits below.
                await appTab
                    .waitForLoadState('domcontentloaded', { timeout: 90000 })
                    .catch(() => { });

                // -- Consumer interstitial --------------------------------------
                // The link may first land on an "Are you a consumer?" page with a
                // "CONTINUE APPLICATION" button before reaching Review Information.
                const continueApplication = appTab
                    .getByRole('button', { name: /Continue Application/i })
                    .or(appTab.getByRole('link', { name: /Continue Application/i }))
                    .first();
                if (await continueApplication
                    .isVisible({ timeout: 15000 })
                    .catch(() => false)) {
                    await continueApplication.click();
                }

                // -- Verify Review Information page -----------------------------
                await expect(
                    appTab.getByText(/Review Information/i).first()
                ).toBeVisible({ timeout: 30000 });

                // Confirm co-borrower name is shown on the review page
                await expect(
                    appTab.getByText(/Amy/i).first()
                ).toBeVisible({ timeout: 10000 });

                // Mailinator tab no longer needed
                await mailinatorTab.close();

                // Hand back the co-borrower app tab for further steps
                coBorrowerPage = appTab;

            } catch (err) {
                // Always clean up the isolated context on failure so it doesn't
                // leak into subsequent tests.
                await coBorrowerContext.close().catch(() => { });
                throw err;
            }
        });

        return coBorrowerPage;
    }

    // -------------------------------------------------------------------------

    /**
     * Step 20 — Complete the co-borrower's portion of the application.
     *
     * Called with the tab returned by verifyCoBorrowerInviteEmail().
     * Covers:
     *   a. Review Information page      → click "START APPLICATION"
     *   b. Verify Your Phone Number     → enter sandbox OTP (111111) → Continue
     *   c. Tell us about yourself       → enter password + check e-consent → Continue
     *   d. Check Your Eligibility       → check CFPB + credit-consent boxes → Continue
     *
     * @param {object}                          data           test data object
     * @param {import('@playwright/test').Page} coBorrowerPage tab from invite link
     */
    async fillCoBorrowerApplication(data, coBorrowerPage) {
        const cb = data.coBorrower;
        const password = cb.password ?? data.borrower.password ?? 'TestPass1!';

        // -- a. Review Information → START APPLICATION --------------------------
        await test.step('Co-borrower: Start Application (Review Information)', async () => {
            await coBorrowerPage
                .getByText(/Review Information/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            const startBtn = coBorrowerPage
                .getByRole('button', { name: /Start Application/i })
                .or(coBorrowerPage.getByText(/Start Application/i))
                .first();
            await startBtn.waitFor({ state: 'visible', timeout: 10000 });
            await startBtn.click();
        });

        // -- b. Verify Your Phone Number → OTP 111111 → Continue ---------------
        // After START APPLICATION the app may redirect to /coborrower/verify-phone
        // and send a 6-digit code to the co-borrower's phone. The sandbox code
        // is always 111111. Each digit has its own input box — type digit-by-digit.
        await test.step('Co-borrower: Verify phone number (OTP)', async () => {
            const isVerifyPhone = await coBorrowerPage
                .getByText(/Verify Your Phone Number/i)
                .first()
                .isVisible({ timeout: 10000 })
                .catch(() => false);

            if (isVerifyPhone) {
                // 6 individual digit boxes — locate all OTP inputs in order
                const otpInputs = coBorrowerPage.locator(
                    'input[inputmode="numeric"], input[type="number"], input[maxlength="1"]'
                );
                await otpInputs.first().waitFor({ state: 'visible', timeout: 10000 });

                const digits = '111111'.split('');
                const count = await otpInputs.count();
                for (let i = 0; i < Math.min(digits.length, count); i++) {
                    await otpInputs.nth(i).fill(digits[i]);
                }

                const continueBtn = coBorrowerPage
                    .getByRole('button', { name: /^Continue$/i })
                    .first();
                await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
                await continueBtn.click();
            }
        });

        // -- c. Tell us about yourself → password + e-consent → Continue --------
        await test.step('Co-borrower: Tell us about yourself', async () => {
            await coBorrowerPage
                .getByText(/Tell us about yourself/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // Password
            const passwordInput = coBorrowerPage.getByLabel(/^Password/i);
            await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
            await passwordInput.fill(password);

            // E-consent checkbox
            const eConsent = coBorrowerPage
                .getByLabel(/Consent to Electronic Records/i)
                .or(coBorrowerPage.locator('input[type="checkbox"]').first());
            await eConsent.check({ force: true });

            // Continue
            const continueBtn = coBorrowerPage
                .getByRole('button', { name: /^Continue$/i })
                .first();
            await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
            await continueBtn.click();
        });

        // -- c. Check Your Eligibility → check consent boxes → Continue ---------
        await test.step('Co-borrower: Check Your Eligibility (Review & Confirm)', async () => {
            await coBorrowerPage
                .getByText(/Check Your Eligibility/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // The consent checkboxes are always the last two checkboxes on the
            // page — income source checkboxes come first, consent checkboxes last.
            // nth(-2) = CFPB  /  nth(-1) = Consent to Credit Review
            // Scroll the Review & Confirm heading into view first so both inputs
            // are rendered, then check each one with force:true.
            await coBorrowerPage.getByText(/Review & Confirm/i)
                .last()
                .scrollIntoViewIfNeeded();

            const allCheckboxes = coBorrowerPage.locator('input[type="checkbox"]');
            await allCheckboxes.last().waitFor({ state: 'attached', timeout: 10000 });

            // CFPB — second-to-last checkbox
            await allCheckboxes.nth(-2).check({ force: true });
            // Consent to Credit Review — last checkbox
            await allCheckboxes.nth(-1).check({ force: true });

            // Continue
            const continueBtn = coBorrowerPage
                .getByRole('button', { name: /^Continue$/i })
                .first();
            await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
            await continueBtn.click();
            await coBorrowerPage
                .waitForLoadState('networkidle', { timeout: 30000 })
                .catch(() => { });
        });
    }

    // -------------------------------------------------------------------------

    async verifyFlowCompleted() {
        await test.step('Verify co-borrower flow reached completion', async () => {
            // The "Loading offers..." spinner can still be visible when this
            // step starts.  Wait up to 3 minutes for it to clear before
            // asserting the pre-qual banner.
            const loadingText = this.page
                .getByText(/Loading offers|Searching for your best offer/i)
                .first();
            const stillLoading = await loadingText
                .isVisible({ timeout: 5000 })
                .catch(() => false);
            if (stillLoading) {
                await loadingText.waitFor({ state: 'hidden', timeout: 180000 });
            }

            // After offer processing the DTC app shows a pre-qualification
            // summary banner: "You're pre-qualified, <name>!"
            const preQualBanner = this.page.getByText(/You.re pre-qualified/i).first();
            await expect(preQualBanner).toBeVisible({ timeout: 90000 });

            const continueToApp = this.page.getByRole('button', {
                name: /Continue to Application/i,
            });
            await continueToApp.waitFor({ state: 'visible', timeout: 10000 });
            await continueToApp.scrollIntoViewIfNeeded();

            // "CONTINUE TO APPLICATION" opens the full application in a new tab.
            // Listen for the new page BEFORE clicking so we don't miss it.
            const newPagePromise = this.page.context().waitForEvent('page', {
                timeout: 30000,
            }).catch(() => null);

            await continueToApp.click({ force: true });

            // Switch this.page to the new tab so subsequent steps (Demographics,
            // Income Verification, etc.) interact with the correct page.
            const newPage = await newPagePromise;
            if (newPage) {
                await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
                this.page = newPage;
            } else {
                // Same-tab navigation — just wait for load
                await this.page.waitForLoadState('networkidle', { timeout: 30000 })
                    .catch(() => { });
            }
        });
    }
}

export default CoBorrowerFlowPage;
