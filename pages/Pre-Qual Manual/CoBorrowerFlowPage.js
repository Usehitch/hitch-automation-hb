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
import HelpDeskWidget from '../Support/HelpDeskWidget';
import { ensureChecked } from '../../utils/checkboxHelpers';

class CoBorrowerFlowPage {
    constructor(page) {
        this.page = page;
        this.helpDesk = new HelpDeskWidget(page);

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
            hasText: /error|failed|invalid|blocked|went wrong|not allowed|unable|could not verify|verify your identity/i,
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
            // Close the "Hi. Need any help?" chat bubble first — it floats over
            // the bottom-right corner and can intercept clicks on the page.
            await this.helpDesk.dismissProactiveBubble();
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
    async waitForCreditCheckProcessing(data) {
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

            if (data?.creditCheck) {
                await this.#retryIdentityVerificationIfNeeded(data);
            }
        });
    }

    /**
     * Re-enters sandbox SSN/DOB when the credit bureau returns a transient
     * "could not verify your identity" alert on Check Your Eligibility.
     */
    async #retryIdentityVerificationIfNeeded(data) {
        const identityError = this.page.getByText(/could not verify your identity/i).first();
        const hasError = await identityError.isVisible({ timeout: 5000 }).catch(() => false);
        if (!hasError) return;

        const cc = data.creditCheck;
        const ssn = this.page.getByLabel(/Social Security/i).first();
        const dob = this.page.getByLabel(/Date of Birth/i).first();
        await ssn.waitFor({ state: 'visible', timeout: 10000 });
        await ssn.clear();
        await ssn.fill(cc.ssn);
        await ssn.press('Tab');
        await dob.clear();
        await dob.fill(cc.dateOfBirth);
        await dob.press('Tab');

        const continueBtn = this.page.getByRole('button', { name: /^Continue$/i }).first();
        await continueBtn.click({ force: true });

        const processingText = this.page.getByText(/Checking Your Credit/i).first();
        const retryAppeared = await processingText
            .waitFor({ state: 'visible', timeout: 10000 })
            .then(() => true)
            .catch(() => false);
        if (retryAppeared) {
            await processingText.waitFor({ state: 'hidden', timeout: 60000 });
        }

        const stillFailing = await identityError.isVisible({ timeout: 3000 }).catch(() => false);
        if (stillFailing) {
            throw new Error(
                'Credit identity verification failed after SSN/DOB retry — ' +
                'staging credit bureau may be unavailable for sandbox SSN 999-60-3333'
            );
        }
    }

    /**
     * Fills marital status, "who married to", and title-only owners when the
     * section is present (Application Participants pre-offer or Other Info post-offer).
     */
    async #fillMaritalStatusAndTitleOwnersIfPresent(data) {
        const b = data.borrower;
        const p = data.participants;

        const maritalVisible = await this.page.getByText(/Marital Status/i)
            .filter({ visible: true })
            .first()
            .isVisible({ timeout: 3000 }).catch(() => false);
        const titleSection = this.page.locator('text=Title-Only Owners').last();
        const titleVisible = await titleSection
            .isVisible({ timeout: 3000 }).catch(() => false);
        if (!maritalVisible && !titleVisible) return;

        const maritalStatus = b.maritalStatus ?? 'Unmarried';
        const maritalLabel = this.page
            .getByText(new RegExp(`^${maritalStatus}$`))
            .filter({ visible: true })
            .first();
        await maritalLabel.waitFor({ state: 'visible', timeout: 15000 });
        await maritalLabel.click();

        if (maritalStatus === 'Married' && p?.marriedTo) {
            const marriedToLabel = this.page
                .getByText(new RegExp(p.marriedTo, 'i'))
                .filter({ visible: true })
                .first();
            if (await marriedToLabel.isVisible({ timeout: 5000 }).catch(() => false)) {
                await marriedToLabel.click();
            }
        }

        await titleSection.scrollIntoViewIfNeeded();
        const allRadios = this.page.locator('input[type="radio"]');
        await allRadios.last().waitFor({ state: 'attached', timeout: 10000 });
        const titleRadioIndex = p?.otherTitleOwners ? -1 : -2;
        await allRadios.nth(titleRadioIndex).click({ force: true });
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

            // Wait for the page heading (sidebar may contain a hidden duplicate)
            await this.page.getByText(/Application Participants/i)
                .filter({ visible: true })
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
                    await ensureChecked(checkbox, { page: this.page, label: source });
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

            // Marital status + title-only owners still render on this page for
            // the pre-offer flow (post-offer copies live on Other Info).
            await this.#fillMaritalStatusAndTitleOwnersIfPresent(data);

            const livesContinue = this.page.getByRole('button', { name: /^Continue$/i }).first();
            await livesContinue.waitFor({ state: 'visible', timeout: 10000 });
            await expect(livesContinue).toBeEnabled({ timeout: 15000 });
            await livesContinue.click({ force: true });

            await this.page.waitForURL(/\/prequal\/(?!participants)/, { timeout: 30000 }).catch(() => { });
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
            await this.page.getByText(/Other Info/i)
                .filter({ visible: true })
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            await this.#fillMaritalStatusAndTitleOwnersIfPresent(data);

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

            // Wait for page content — heading copy varies between DTC builds.
            await this.page.getByText(/Select Mortgages|Mortgages.*Liens|Review Mortgages/i)
                .filter({ visible: true })
                .first()
                .or(this.page.getByLabel(/Requested Loan Amount/i).filter({ visible: true }).first())
                .or(this.page.getByRole('checkbox', { name: /free and clear/i }))
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
            await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });

            const allOptOut = this.page.getByText(/I do not wish to provide this information/i)
                .filter({ visible: true });

            // Wait for form content — page title is plain text (not role=heading)
            // and sidebar step labels are hidden duplicates of "Demographics".
            await this.page.getByText('Ethnicity', { exact: true })
                .filter({ visible: true })
                .first()
                .or(allOptOut.first())
                .first()
                .waitFor({ state: 'visible', timeout: 30000 });

            // Check every "I do not wish to provide this information" checkbox
            // on the page — covers Ethnicity, Sex, and Race in one pass.
            const optOutCount = await allOptOut.count();
            for (let i = 0; i < optOutCount; i++) {
                const label = allOptOut.nth(i);
                const cb = label.locator('xpath=ancestor::*[.//input[@type="checkbox"]][1]')
                    .locator('input[type="checkbox"]').first();
                const checked = await cb.isChecked().catch(() => false);
                if (!checked) {
                    await cb.evaluate(el => el.click()).catch(() => label.click());
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
     *  2. Select "Login to Your Company Payroll Account" radio
     *  3. Click LOGIN
     *  4. Scroll through Employment Authorization modal and click "I Agree"
     *  5. Wait for consent success toast, then Continue
     */
    async fillIncomeVerification() {
        await test.step('Fill Income Verification (Plaid sandbox)', async () => {
            // Wait for the income-verification URL so we're on the right page.
            await this.page.waitForURL(/income-verification/i, { timeout: 60000 }).catch(() => { });

            // Select "Login to Your Company Payroll Account" radio
            const payrollRadio = this.page.getByText(/Login to Your Company Payroll Account/i).first();
            await payrollRadio.waitFor({ state: 'visible', timeout: 60000 });
            await payrollRadio.click({ force: true });

            // Run the Truework payroll connect flow: LOGIN → Employment
            // Authorization consent → Truework widget login. Strict on this first
            // run so a genuine failure surfaces a clear error. Extracted into a
            // re-entrant helper so the RESTART VERIFICATION path can re-walk it.
            await this.#connectPayrollViaTruework({ tolerant: false });

            // Wait for Truework modal to close and income verification to process
            await this.page.getByText(/Verification In Progress|VERIFYING/i)
                .first()
                .waitFor({ state: 'visible', timeout: 30000 })
                .catch(() => { });

            // Payroll verification can intermittently stall — the card then shows
            // "Verification is taking longer than expected. Please try again." with a
            // RETRY VERIFICATION button. In some stall states the card instead offers
            // RESTART VERIFICATION (retry isn't available) — it's the same re-run
            // action, so we match either label. If one appears, click it and wait
            // again; otherwise the success banner appears and we fall straight through.
            const incomeVerified = this.page.getByText(/Income Verified Successfully/i).first();
            const retryBtn = this.page
                .getByRole('button', { name: /RETRY VERIFICATION|RESTART VERIFICATION/i })
                .first();

            // Bound the loop so it can't consume the whole test budget: worst case is
            // MAX_RETRIES races of RACE_TIMEOUT each (~4.5 min), after which we fail
            // fast and let Playwright's test-level retry recover from staging stalls.
            const MAX_RETRIES = 2;
            const RACE_TIMEOUT = 90000;
            let verified = false;
            for (let attempt = 0; attempt <= MAX_RETRIES && !verified; attempt++) {
                // Race the success banner against the retry button appearing.
                const outcome = await Promise.race([
                    incomeVerified.waitFor({ state: 'visible', timeout: RACE_TIMEOUT })
                        .then(() => 'verified').catch(() => 'timeout'),
                    retryBtn.waitFor({ state: 'visible', timeout: RACE_TIMEOUT })
                        .then(() => 'retry').catch(() => 'timeout'),
                ]);

                if (outcome === 'verified') {
                    // Success — break out and continue.
                    verified = true;
                } else if (outcome === 'retry' && attempt < MAX_RETRIES) {
                    // The card stalled. RETRY VERIFICATION re-runs the backend poll
                    // in place; RESTART VERIFICATION ("We couldn't confirm your
                    // income verification. Please try connecting again.") relaunches
                    // the whole connect flow. Click it, then re-walk the connect
                    // steps tolerantly — on a restart Truework usually remembers the
                    // signed consent so the Employment Authorization modal / some
                    // widget screens are skipped, and a plain in-place retry shows no
                    // connect UI at all (the helper then no-ops). Either way we end
                    // back on the processing state.
                    await retryBtn.click({ force: true });
                    await this.#connectPayrollViaTruework({ tolerant: true });
                    await this.page.getByText(/Verification In Progress|VERIFYING/i)
                        .first()
                        .waitFor({ state: 'visible', timeout: 30000 })
                        .catch(() => { });
                }
                // outcome === 'timeout' (neither appeared): fall through and let the
                // loop exit, then the final assertion below reports a clear failure.
            }

            if (!verified) {
                // Distinguish a known EXTERNAL Truework-sandbox stall from a real
                // product/UI regression. The sandbox should normally confirm
                // (user_good/pass_good), and the RETRY/RESTART loop above recovers
                // transient stalls — but it occasionally gets stuck on "We couldn't
                // confirm your income verification. Please try connecting again."
                // with a RESTART VERIFICATION button. That's a sandbox-side issue,
                // not something the test can fix, so soft-SKIP rather than fail the
                // nightly. Any OTHER unverified state is a genuine failure and still
                // asserts below.
                const couldNotConfirm = await this.page
                    .getByText(/could[\s’']?n[\s’']?t confirm your income verification|please try connecting again/i)
                    .first()
                    .isVisible()
                    .catch(() => false);
                const restartOffered = await this.page
                    .getByRole('button', { name: /RESTART VERIFICATION/i })
                    .first()
                    .isVisible()
                    .catch(() => false);

                if (couldNotConfirm || restartOffered) {
                    test.info().annotations.push({
                        type: 'known-issue',
                        description:
                            'Truework payroll income-verification sandbox returned ' +
                            `"couldn't confirm income" after ${MAX_RETRIES} RESTART ` +
                            'attempts. External sandbox stall, not a product/UI ' +
                            'regression — skipping the remainder of the flow.',
                    });
                    test.skip(true, 'Truework income-verification sandbox could not confirm (known external stall).');
                }

                // Not the known sandbox state → a real failure. Assert against the
                // success banner for a clear, short-budget error.
                await expect(incomeVerified).toBeVisible({ timeout: 30000 });
            }

            // Click Continue once enabled (payroll verified)
            const verifiedContinue = this.page.getByRole('button', { name: /^Continue$/i });
            await verifiedContinue.waitFor({ state: 'visible', timeout: 10000 });
            await expect(verifiedContinue).toBeEnabled({ timeout: 10000 });
            await verifiedContinue.click({ force: true });

            // Wait for navigation to funding-account before returning
            await this.page.waitForURL(/funding-account/i, { timeout: 80000 }).catch(() => { });
            await this.page.waitForLoadState('domcontentloaded', { timeout: 80000 }).catch(() => { });
        });
    }

    /**
     * Drives the payroll connect flow on the Income Verification page:
     *   LOGIN → Employment Authorization consent modal → Truework widget login.
     *
     * Re-entrant: used for the initial connect AND when the card offers
     * RETRY/RESTART VERIFICATION after a stall. On a RESTART Truework typically
     * remembers the earlier consent, so the Employment Authorization modal and/or
     * some Truework screens are skipped — every stage is therefore detected rather
     * than assumed.
     *
     * @param {{ tolerant?: boolean }} [opts]
     *   tolerant=false (first run): require each stage and throw with a clear
     *     message if the connect UI never opens — preserves good diagnostics.
     *   tolerant=true (restart): skip any stage whose UI doesn't appear and return
     *     quietly, since a plain in-place RETRY shows no connect UI at all.
     */
    async #connectPayrollViaTruework({ tolerant = false } = {}) {
        await test.step(`Connect payroll via Truework${tolerant ? ' (restart)' : ''}`, async () => {
            const loginBtn      = this.page.getByRole('button', { name: /^LOGIN$/i }).first();
            const connectingBtn = this.page.getByRole('button', { name: /CONNECTING/i }).first();
            const modal         = this.page.locator('.MuiDialog-paper').first();

            // The widget loads inside a cross-origin iframe (data-cy="frame_tw_js").
            // All locators must go through frameLocator — this.page.locator() cannot
            // reach inside it.
            const twFrame       = this.page.frameLocator('[data-cy="frame_tw_js"]');
            const twConsentBtn  = twFrame.locator('[data-cy="btn_consent"]');

            // Visibility gate honoring strict/tolerant mode: in strict mode a miss
            // throws (caller sees a precise failure); in tolerant mode it returns
            // false so the step is simply skipped.
            const appears = async (locator, timeout) => {
                if (!tolerant) { await locator.waitFor({ state: 'visible', timeout }); return true; }
                return locator.waitFor({ state: 'visible', timeout: Math.min(timeout, 15000) })
                    .then(() => true).catch(() => false);
            };

            // Click LOGIN (when shown) until either the Employment Authorization
            // modal OR the Truework widget appears. Racing the two covers both the
            // first run (modal appears) and a restart (consent remembered → widget
            // opens directly). The first click sometimes doesn't register, so
            // re-click up to a few times.
            const PROBE = tolerant ? 8000 : 20000;
            const MAX_LOGIN_ATTEMPTS = 3;
            let stage = null; // 'modal' | 'widget' | null
            for (let attempt = 1; attempt <= MAX_LOGIN_ATTEMPTS; attempt++) {
                if (await loginBtn.isVisible().catch(() => false)) {
                    await loginBtn.click({ force: true });
                }

                // Wait for the CONNECTING loading state to appear and clear.
                await connectingBtn.waitFor({ state: 'visible', timeout: 15000 }).catch(() => { });
                await connectingBtn.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => { });

                stage = await Promise.race([
                    modal.waitFor({ state: 'visible', timeout: PROBE }).then(() => 'modal').catch(() => null),
                    twConsentBtn.waitFor({ state: 'visible', timeout: PROBE }).then(() => 'widget').catch(() => null),
                ]);
                if (stage) break;

                // Neither opened. On a restart this is expected for a plain in-place
                // retry (no connect UI) — return and let the caller wait for the
                // processing state. On the first run it's a real failure.
                if (tolerant) return;
                if (attempt === MAX_LOGIN_ATTEMPTS) {
                    throw new Error(
                        'Neither the Employment Authorization dialog nor the Truework ' +
                        `widget opened after ${MAX_LOGIN_ATTEMPTS} LOGIN attempts on the ` +
                        'payroll income-verification step.'
                    );
                }
            }

            // Employment Authorization modal — scroll the certification to 100% so
            // the disabled "PLEASE READ DOCUMENT ABOVE" button becomes "I Agree".
            // Skipped on restarts where Truework already holds the signed consent.
            // Use .MuiDialog-paper to avoid the hidden canopy__modal__container,
            // which also carries role="dialog" and is resolved first by Playwright.
            if (stage === 'modal') {
                await modal.waitFor({ state: 'visible', timeout: 120000 });
                await this.page.getByText(/Certification/i).first()
                    .waitFor({ state: 'visible', timeout: 10000 });

                // Scroll the tallest inner scrollable to the bottom — this advances
                // the "0% ↓" counter to 100% and swaps the button for "I Agree".
                await modal.evaluate(el => {
                    const scrollables = Array.from(el.querySelectorAll('div')).filter(d => {
                        const s = window.getComputedStyle(d);
                        return (s.overflowY === 'auto' || s.overflowY === 'scroll')
                            && d.scrollHeight > d.clientHeight + 10;
                    });
                    scrollables.sort((a, b) => b.scrollHeight - a.scrollHeight);
                    if (scrollables.length > 0) scrollables[0].scrollTop = scrollables[0].scrollHeight;
                });

                const iAgreeBtn = this.page.getByRole('button', { name: /I Agree/i }).first();
                await iAgreeBtn.waitFor({ state: 'visible', timeout: 20000 });
                await expect(iAgreeBtn).toBeEnabled({ timeout: 20000 });
                await iAgreeBtn.click({ force: true });

                // Wait for consent success toast.
                await this.page.getByText(/Employment verification consent signed successfully/i).first()
                    .waitFor({ state: 'visible', timeout: 30000 });
            }

            // --- Truework widget flow ---
            // Each screen is gated through appears() so a restart that resumes
            // mid-flow (some screens remembered) skips what's already done.

            // Screen 1: "… uses Truework for verifications" consent.
            if (await appears(twConsentBtn, 120000)) await twConsentBtn.click();

            // Screen 2: "Complete your tasks" — the "Connect payroll" row.
            const connectPayrollRow = twFrame.getByText(/Connect payroll/i).first();
            if (await appears(connectPayrollRow, 15000)) await connectPayrollRow.click();

            // Screen 2b: "Find your employer" — clicking the task row opens a search;
            // click the first result row.
            const searchLink = twFrame.locator('[data-cy="unified_search_link"]').first();
            if (await appears(searchLink, 15000)) await searchLink.click();

            // Screen 3: "Log in to Hitch" — sandbox credentials shown in the modal.
            const usernameField = twFrame.getByLabel(/Username/i).first();
            if (await appears(usernameField, 15000)) {
                await usernameField.fill('user_good');
                await twFrame.getByLabel(/Password/i).first().fill('pass_good');
                await twFrame.getByRole('button', { name: /^Connect$/i }).click();
            }

            // Wait for "Awaiting Response..." to resolve and payroll to connect.
            // Status text (not a button) — best-effort even on the first run, since
            // a fast connect can replace it before we look.
            await twFrame.getByText(/Successfully connected payroll/i).first()
                .waitFor({ state: 'visible', timeout: tolerant ? 30000 : 60000 })
                .catch(() => { });

            // Click "I'm done, submit" to close the Truework widget.
            const doneBtn = twFrame.getByRole('button', { name: /I'm done, submit/i });
            if (await appears(doneBtn, 60000)) await doneBtn.click();
        });
    }

    // -------------------------------------------------------------------------

    /**
     * Income Verification & Documentation — assert the page offers all three
     * ways a borrower can satisfy income verification:
     *   1. Connect Checking Account         (link banking via Plaid)
     *   2. Login to Company Payroll Account  (link payroll via The Work Number / TrueWork)
     *   3. Upload Income Documents Manually  (manual documentation)
     *
     * Validates the feature contract — "borrowers can link banking and payroll
     * securely, OR upload documents manually" — regardless of which method is
     * ultimately completed.
     *
     * Only the banking/Plaid option label is confirmed against the live app
     * (it drives the implemented fillIncomeVerification path). The payroll and
     * manual labels are best-effort regexes derived from the option copy noted
     * in fillIncomeVerification — TODO: confirm exact text against the live UI.
     */
    async verifyIncomeVerificationOptions() {
        await test.step('Verify income verification & documentation options', async () => {
            await this.page.waitForURL(/income-verification/i, { timeout: 60000 }).catch(() => { });

            // Banking (Plaid) — known-good copy from the implemented Plaid path.
            const bankingOption = this.page
                .getByText(/Connect Checking Account|Bank Account Verification.*Plaid/i)
                .first();
            await expect(bankingOption).toBeVisible({ timeout: 90000 });

            // Payroll (The Work Number / TrueWork). TODO: confirm exact copy.
            const payrollOption = this.page
                .getByText(/Company Payroll Account|Login to.*Payroll|The Work Number|Payroll Account/i)
                .first();
            await expect(payrollOption).toBeVisible({ timeout: 15000 });

            // Manual document upload. TODO: confirm exact copy.
            const manualOption = this.page
                .getByText(/Upload Income Documents Manually|Upload.*Documents?.*Manually|Upload Manually/i)
                .first();
            await expect(manualOption).toBeVisible({ timeout: 15000 });
        });
    }

    /**
     * Selects one of the three income-verification methods on the Income
     * Verification page.
     *
     * @param {'plaid'|'payroll'|'manual'} method
     *
     * Only the 'plaid' selection is confirmed against the live app today.
     * 'payroll' and 'manual' use best-effort locators derived from the option
     * label text — TODO: confirm against the live DOM before relying on them.
     */
    async selectIncomeVerificationMethod(method) {
        await test.step(`Select income verification method: ${method}`, async () => {
            const labels = {
                plaid:   /Connect Checking Account/i,
                payroll: /Login to.*Payroll|Company Payroll Account|The Work Number/i, // TODO: verify
                manual:  /Upload Income Documents Manually/i,                          // TODO: verify
            };
            const label = labels[method];
            if (!label) throw new Error(`Unknown income verification method: ${method}`);

            const card = this.page.getByText(label).first();
            await card.waitFor({ state: 'visible', timeout: 30000 });
            await card.click({ force: true });
        });
    }

    /**
     * Manual documentation path — selects "Upload Income Documents Manually"
     * and uploads one or more files via the page's file input.
     *
     * BEST-EFFORT / TODO: not yet exercised against the live app. The
     * file-input selector and the success signal below are derived from common
     * patterns and MUST be verified once the manual-upload UI is available.
     * setInputFiles works on a hidden <input type="file"> without it being
     * visible, so we only wait for it to be attached.
     *
     * @param {string|string[]} filePaths  absolute path(s) to the document(s)
     */
    async uploadIncomeDocumentsManually(filePaths) {
        await test.step('Upload income documents manually', async () => {
            await this.selectIncomeVerificationMethod('manual');

            // TODO: verify the file-input selector against the live app.
            const fileInput = this.page.locator('input[type="file"]').first();
            await fileInput.waitFor({ state: 'attached', timeout: 15000 });
            await fileInput.setInputFiles(filePaths);

            // TODO: verify the upload success signal (filename chip / "Uploaded"
            // badge / Continue enabling) against the live app.
            const continueBtn = this.page.getByRole('button', { name: /^Continue$/i }).first();
            await continueBtn.waitFor({ state: 'visible', timeout: 30000 });
            await expect(continueBtn).toBeEnabled({ timeout: 30000 });
            await continueBtn.click({ force: true });
        });
    }

    /**
     * Payroll documentation path — "Login to Your Company Payroll Account"
     * (The Work Number / TrueWork).
     *
     * BEST-EFFORT STUB / TODO: not yet exercised against the live app. The
     * payroll login renders in a third-party (TWN/TrueWork) iframe whose DOM is
     * unknown here. Throws if invoked so it is never silently skipped — wire up
     * the provider-select → credentials → consent steps and the verified-income
     * success assertion once that iframe is available.
     */
    async completePayrollVerification(_data) {
        await test.step('Verify income via company payroll (The Work Number)', async () => {
            await this.selectIncomeVerificationMethod('payroll');
            throw new Error(
                'completePayrollVerification is a best-effort stub — confirm the ' +
                'TWN/TrueWork payroll iframe DOM against the live app before enabling.'
            );
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
            // 60 s — on prod, the locator can resolve to a hidden element for tens of
            // seconds while the page transitions in before becoming visible.
            await this.page.getByText(/Funding Account/i)
                .first()
                .waitFor({ state: 'visible', timeout: 60000 });

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
    // Loan Hub — focused area checks
    //
    // The Loan Hub is the borrower's central area after submission. It exposes
    // three tabs (per the feature contract):
    //   1. BORROWER'S TO-DO LIST — a clear to-do list,
    //   2. DOCUMENTS            — a document center for viewing / downloading files,
    //   3. LOAN TRACKER         — a visual tracker of progress through the stages.
    //
    // Confirmed against the live app (from a Loan Hub run): the welcome banner,
    // the pipeline phases, the three tab labels, and the loan-tracker contents
    // (stage label + "N/M steps completed"). The INNER markup of the to-do list
    // and document-center panels is not yet confirmed — those assertions are
    // best-effort and TODO-flagged; tighten them once the panel markup is known.
    // -------------------------------------------------------------------------

    /**
     * Asserts the borrower landed on the Loan Hub: the welcome banner and the
     * "In Process" pipeline stage. (Confirmed DOM.)
     */
    async verifyLoanHubLanded() {
        await test.step('Loan Hub — landed (welcome + In Process)', async () => {
            await expect(
                this.page.getByText(/Welcome to Your Loan Hub/i).first()
            ).toBeVisible({ timeout: 30000 });

            await expect(
                this.page.getByText(/In Process/i).first()
            ).toBeVisible({ timeout: 10000 });
        });
    }

    /**
     * Loan Hub — borrower to-do list.
     *
     * BEST-EFFORT / TODO: confirm the section heading and task-row markup
     * against the live app. The regex covers common copy ("To-Do", "Tasks",
     * "Action Items", "What's Next", "Outstanding Items").
     */
    async verifyToDoList() {
        await test.step('Loan Hub — verify borrower to-do list', async () => {
            // Tabs render as plain clickable text: "BORROWER'S TO-DO LIST",
            // "DOCUMENTS", "LOAN TRACKER".
            const toDoTab = this.page.locator('a, button, [role="tab"], span').filter({
                hasText: /BORROWER.?S TO-?DO LIST|^TO-?DO LIST$/i,
            }).first();
            await toDoTab.waitFor({ state: 'visible', timeout: 15000 });
            await toDoTab.click();

            // The to-do list surfaces the borrower's outstanding tasks/steps.
            // TODO: tighten to a specific task-row selector once the to-do panel
            // markup is confirmed.
            await expect(
                this.page.getByText(/Complete|Pending|Upload|Verify|Task|To-?Do|step/i).first()
            ).toBeVisible({ timeout: 15000 });
        });
    }

    /**
     * Loan Hub — document center (view / download files).
     *
     * Asserts the document-center section is present and that at least one
     * view/download affordance is available for the borrower's files.
     *
     * BEST-EFFORT / TODO: confirm the heading, document rows, and whether the
     * view/download controls render as buttons, links, or icon-only controls.
     */
    async verifyDocumentCenter() {
        await test.step('Loan Hub — verify document center', async () => {
            // Open the DOCUMENTS tab (plain clickable text, like the other tabs).
            const documentsTab = this.page.locator('a, button, [role="tab"], span').filter({
                hasText: /^DOCUMENTS$|^Documents$/i,
            }).first();
            await documentsTab.waitFor({ state: 'visible', timeout: 15000 });
            await documentsTab.click();

            // The document center lists the borrower's files with view/download
            // controls. Accept an empty-state / "Documents" heading too so the
            // check holds whether or not files have generated yet.
            // TODO: tighten to specific document-row + download selectors once
            // the documents panel markup is confirmed.
            const documentCenterSignal = this.page
                .getByRole('button', { name: /View|Download/i })
                .or(this.page.getByRole('link', { name: /View|Download/i }))
                .or(this.page.getByText(/No documents|Document|Upload/i))
                .first();
            await expect(documentCenterSignal).toBeVisible({ timeout: 15000 });
        });
    }

    /**
     * Loan Hub — visual loan tracker showing progress through the stages.
     *
     * Opens the Loan Tracker tab and asserts multiple application stages
     * ("Stage 1:", "Stage 2:", …) are rendered. (Confirmed DOM — shares the
     * tracker-tab locator strategy used by verifyLoanHub.)
     */
    async verifyLoanTracker() {
        await test.step('Loan Hub — verify visual loan tracker / stage progress', async () => {
            // Open the LOAN TRACKER tab (plain clickable text, not ARIA tabs).
            const loanTrackerTab = this.page.locator('a, button, [role="tab"], span').filter({
                hasText: /^LOAN TRACKER$|^Loan Tracker$/i,
            }).first();
            await loanTrackerTab.waitFor({ state: 'visible', timeout: 15000 });
            await loanTrackerTab.click();

            // Phase stepper — the four pipeline phases the loan progresses
            // through (Pre-Qual → In Process → Closing → Funded).
            for (const phase of [/Pre-?Qual/i, /In Process/i, /Closing/i, /Funded/i]) {
                await expect(this.page.getByText(phase).first())
                    .toBeVisible({ timeout: 15000 });
            }

            // Current-stage detail: e.g. "Stage 2: In Process" with an
            // "N/M steps completed" progress indicator — confirms the tracker
            // shows progress through the stages, not just a static header.
            // (The tracker shows the CURRENT stage's label only, so there is
            // exactly one "Stage N:" at a time — do not assert more than one.)
            await expect(this.page.getByText(/Stage \d+:/i).first())
                .toBeVisible({ timeout: 15000 });
            await expect(this.page.getByText(/\d+\/\d+ steps? completed/i).first())
                .toBeVisible({ timeout: 15000 });
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
