import { expect, test } from '../../fixtures';
import { withProcessAppRetry } from '../../utils/routeHelpers';
import { ensureChecked } from '../../utils/checkboxHelpers';

class NewApplicationPage {
    constructor(page) {
        this.page = page;

        // -- Property Address --------------------------------------------------
        this.enterManuallyLink = this.page.getByText("Can't find your address? Enter it manually.");
        this.streetInput = this.page.getByLabel(/Street Address/);
        this.unitInput = this.page.getByLabel(/Unit\/Apt/);
        this.cityInput = this.page.getByLabel(/^City/);
        this.countyInput = this.page.getByLabel(/County/);
        this.stateInput = this.page.getByLabel(/^State/);
        this.zipInput = this.page.getByLabel(/^Zip/);

        // -- Subject Property Information --------------------------------------
        this.primaryResidenceBtn = this.page.getByRole('button', { name: 'Primary Residence' });
        this.investmentPropertyBtn = this.page.getByRole('button', { name: 'Investment Property' });
        this.secondHomeBtn = this.page.getByRole('button', { name: 'Second Home' });

        this.singleFamilyBtn = this.page.getByRole('button', { name: 'Single Family' });
        this.condoBtn = this.page.getByRole('button', { name: 'Condo' });
        this.twoToFourUnitBtn = this.page.getByRole('button', { name: '2-4 Unit' });

        this.notListedRadio = this.page.getByRole('radio', { name: 'Not listed for sale' });
        this.listedRadio = this.page.getByRole('radio', { name: /Listed or recently listed/ });

        this.estimatedValueInput = this.page.getByLabel('Estimated Property Value');

        // Trust radios scoped to their section to avoid collision with other Yes/No groups
        this.trustSection = this.page.locator('text=Is the HELOC property currently held in a trust?').locator('..');
        this.trustYesRadio = this.trustSection.getByRole('radio', { name: 'Yes' });
        this.trustNoRadio = this.trustSection.getByRole('radio', { name: 'No' });

        // Trust-type toggle buttons — revealed only after selecting "Yes" above.
        // Selecting Irrevocable Trust or LLC and pressing Next surfaces a lending
        // block (see trustLendingBlockMessage) and prevents advancing.
        //
        // Names are anchored regexes, NOT plain strings: each button's accessible
        // name includes its tooltip ("Revocable Trust A trust that can be…"), and
        // a substring match for 'Revocable Trust' also matches 'IRrevocable Trust'
        // — a strict-mode collision. Anchoring with ^ keeps each unique.
        this.revocableTrustBtn = this.page.getByRole('button', { name: /^Revocable Trust/ });
        this.irrevocableTrustBtn = this.page.getByRole('button', { name: /^Irrevocable Trust/ });
        this.llcTrustBtn = this.page.getByRole('button', { name: /^LLC/ });

        // Inline block shown after pressing Next with an irrevocable trust / LLC.
        // Wording observed: "We're sorry but as we can not currently lend in
        // irrevocable trusts." — match flexibly so the LLC variant also matches.
        this.trustLendingBlockMessage = this.page.getByText(/currently lend/i);

        // Step-1 marker — present only while on the Application Details step.
        this.applicationDetailsMarker = this.page.getByText('Property Address for Financing');

        // -- Main Applicant Information ----------------------------------------
        this.firstNameInput = this.page.getByLabel('First Name');
        this.lastNameInput = this.page.getByLabel('Last Name');
        this.emailInput = this.page.getByLabel('Email Address');
        this.ssnInput = this.page.getByLabel('SSN');
        this.dobInput = this.page.getByLabel('Date of Birth');
        this.phoneInput = this.page.getByLabel('Phone Number');

        // -- Income Sources (checkboxes) ---------------------------------------
        this.salaryCheckbox = this.page.getByRole('checkbox', { name: 'Salary or hourly wages' });
        this.selfEmployedCheckbox = this.page.getByRole('checkbox', { name: 'Self Employed' });
        this.benefitsCheckbox = this.page.getByRole('checkbox', { name: 'Benefits Income' });
        this.rentalCheckbox = this.page.getByRole('checkbox', { name: 'Rental Income' });
        this.otherIncomeCheckbox = this.page.getByRole('checkbox', { name: 'Other' });

        // -- Add Job (expands when Salary or hourly wages is checked) ----------
        this.companyNameInput = this.page.getByLabel('Company Name');
        this.totalAnnualCompensationInput = this.page.getByLabel(/Total Annual Compensation/);
        this.startDateInput = this.page.getByLabel(/Start Date/);
        this.doneEditingBtn = this.page.getByRole('button', { name: 'Done Editing' });

        // -- Loan Purpose (toggle buttons) -------------------------------------
        this.debtConsolidationBtn = this.page.getByRole('button', { name: 'Debt Consolidation' });
        this.homeImprovementBtn = this.page.getByRole('button', { name: 'Home Improvement' });
        this.otherPurposeBtn = this.page.getByRole('button', { name: 'Other' });

        // -- Co-Borrower -------------------------------------------------------
        // Accordion header — its expanded/collapsed state varies between runs.
        this.coBorrowerAccordionHeader = this.page.getByText('Co-Borrower', { exact: true });

        // Expand toggle, scoped to the Co-Borrower accordion header row (the
        // innermost div holding both the "Co-Borrower" label and an Expand/Collapse
        // button). When the section is collapsed an "Expand" button is present; when
        // expanded it shows "Collapse" instead, so this locator resolves to nothing.
        // Decide expansion from THIS, not from the radios — the radios aren't
        // rendered while collapsed, and a radio-based scope would fall back to the
        // trust Yes/No group and silently target the wrong control.
        this.coBorrowerExpandBtn = this.page.locator('div')
            .filter({ has: this.page.getByText('Co-Borrower', { exact: true }) })
            .filter({ has: this.page.getByRole('button', { name: 'Expand' }) })
            .last()
            .getByRole('button', { name: 'Expand' });

        // The co-borrower choice is a Yes/No radio group. Scope to the Co-Borrower
        // accordion (the innermost div holding both the label and a radio) so its
        // "Yes"/"No" don't collide with the trust Yes/No radios. Only valid once
        // the section is expanded — callers must expand first.
        this.coBorrowerSection = this.page.locator('div')
            .filter({ has: this.page.getByText('Co-Borrower', { exact: true }) })
            .filter({ has: this.page.getByRole('radio', { name: 'Yes' }) })
            .last();
        this.coBorrowerYesRadio = this.coBorrowerSection.getByRole('radio', { name: 'Yes' });
        this.coBorrowerNoRadio = this.coBorrowerSection.getByRole('radio', { name: 'No' });

        // First/Last name expose stable data-testids.
        this.coBorrowerFirstNameInput = this.page.getByTestId('coborrowerFirstName');
        this.coBorrowerLastNameInput = this.page.getByTestId('coborrowerLastName');

        // Remaining fields have no testid, so match them by label scoped to the
        // co-borrower accordion (which wraps the whole sub-form). This isolates
        // them from the identically-labelled main-applicant fields, which live in
        // a separate accordion. Note the SSN field is labelled "SSN" (not
        // "Social Security Number").
        this.coBorrowerEmailInput = this.coBorrowerSection.getByLabel(/Email Address/);
        this.coBorrowerSsnInput = this.coBorrowerSection.getByLabel(/^SSN/);
        this.coBorrowerDobInput = this.coBorrowerSection.getByLabel(/Date of Birth/);
        this.coBorrowerPhoneInput = this.coBorrowerSection.getByLabel(/Phone Number/);

        // -- Consent -----------------------------------------------------------
        this.softCreditCheckConsent = this.page.getByRole('checkbox', { name: /Consent to Soft Credit Check/ });

        // -- Finalization loading screen ---------------------------------------
        this.finalizingHeading = this.page.getByText('Finalizing pre-qualification').first();
        this.mortgagesHeading = this.page.getByText('Review Mortgages & Liens on Subject Property');

        // -- Actions -----------------------------------------------------------
        this.nextBtn = this.page.getByRole('button', { name: 'Next' });
        this.saveForLaterBtn = this.page.getByRole('button', { name: 'Save for Later' });
    };

    // -- Private helpers -------------------------------------------------------

    #propertyUsageMap() {
        return {
            'Primary Residence': this.primaryResidenceBtn,
            'Investment Property': this.investmentPropertyBtn,
            'Second Home': this.secondHomeBtn,
        };
    };

    #buildingTypeMap() {
        return {
            'Single Family': this.singleFamilyBtn,
            'Condo': this.condoBtn,
            '2-4 Unit': this.twoToFourUnitBtn,
        };
    };

    #incomeSourceMap() {
        return {
            'Salary or hourly wages': this.salaryCheckbox,
            'Self Employed': this.selfEmployedCheckbox,
            'Benefits Income': this.benefitsCheckbox,
            'Rental Income': this.rentalCheckbox,
            'Other': this.otherIncomeCheckbox,
        };
    };

    #loanPurposeMap() {
        return {
            'Debt Consolidation': this.debtConsolidationBtn,
            'Home Improvement': this.homeImprovementBtn,
            'Other': this.otherPurposeBtn,
        };
    };

    #trustTypeMap() {
        return {
            'Revocable Trust': this.revocableTrustBtn,
            'Irrevocable Trust': this.irrevocableTrustBtn,
            'LLC': this.llcTrustBtn,
        };
    };

    async #isSelectedToggle(btn) {
        return btn.evaluate(el =>
            el.getAttribute('aria-pressed') === 'true'
            || el.classList.contains('MuiChip-filledPrimary'),
        );
    }

    /** Clicks a MUI toggle/chip until its selected state is reflected in the DOM. */
    async #selectToggleButton(btn) {
        await btn.scrollIntoViewIfNeeded();
        if (await this.#isSelectedToggle(btn)) return;
        await btn.click({ force: true });
        await expect.poll(async () => this.#isSelectedToggle(btn)).toBe(true);
    };

    // -- Public methods --------------------------------------------------------

    async fillPropertyAddress(address) {
        await test.step('Fill property address', async () => {
            await this.enterManuallyLink.click();
            await this.streetInput.waitFor({ state: 'visible' });
            await this.streetInput.fill(address.street);
            await this.streetInput.press('Tab');

            if (address.unit) {
                await this.unitInput.fill(address.unit);
                await this.unitInput.press('Tab');
            }

            await this.cityInput.fill(address.city);
            await this.cityInput.press('Tab');

            if (address.county) {
                await this.countyInput.fill(address.county);
                await this.countyInput.press('Tab');
            }

            // State is an MUI Autocomplete — fill then select from dropdown (no Tab needed)
            await this.stateInput.fill(address.state);
            await this.page.getByRole('option', { name: address.state, exact: true }).click();

            await this.zipInput.fill(address.zip);
            await this.zipInput.press('Tab');
        });
    };

    async fillCoBorrowerDetails(coBorrower) {
        await test.step('Fill co-borrower details', async () => {
            // The accordion's default state varies between runs. Expand only when
            // an "Expand" button is present — re-clicking an open accordion would
            // collapse it. Decide from the header button, not the radios (see the
            // coBorrowerExpandBtn locator note).
            const collapsed = await this.coBorrowerExpandBtn
                .isVisible({ timeout: 2000 })
                .catch(() => false);
            if (collapsed) {
                await this.coBorrowerExpandBtn.click();
            }
            await this.coBorrowerYesRadio.waitFor({ state: 'visible', timeout: 10000 });

            await this.coBorrowerYesRadio.check();

            await this.coBorrowerFirstNameInput.waitFor({ state: 'visible', timeout: 10000 });
            await this.coBorrowerFirstNameInput.fill(coBorrower.firstName);
            await this.coBorrowerFirstNameInput.press('Tab');

            await this.coBorrowerLastNameInput.fill(coBorrower.lastName);
            await this.coBorrowerLastNameInput.press('Tab');

            await this.coBorrowerEmailInput.fill(coBorrower.email);
            await this.coBorrowerEmailInput.press('Tab');

            await this.coBorrowerSsnInput.fill(coBorrower.ssn);
            await this.coBorrowerSsnInput.press('Tab');

            await this.coBorrowerDobInput.fill(coBorrower.dateOfBirth);
            await this.coBorrowerDobInput.press('Tab');

            await this.coBorrowerPhoneInput.fill(coBorrower.phoneNumber);
            await this.coBorrowerPhoneInput.press('Tab');
        });
    };

    async fillJobDetails(job) {
        await test.step('Fill job details', async () => {
            await this.companyNameInput.waitFor({ state: 'visible' });
            await this.companyNameInput.fill(job.companyName);
            await this.companyNameInput.press('Tab');

            await this.totalAnnualCompensationInput.fill(job.totalAnnualCompensation);
            await this.totalAnnualCompensationInput.press('Tab');

            await this.startDateInput.fill(job.startDate);
            await this.startDateInput.press('Tab');

            await this.doneEditingBtn.click({ force: true });
        });
    };

    async fillApplicationDetails(data) {
        await test.step('Fill application details', async () => {
            await this.fillPropertyAddress(data.property.address);

            await this.#selectToggleButton(this.#propertyUsageMap()[data.property.usage]);
            await this.#selectToggleButton(this.#buildingTypeMap()[data.property.buildingType]);

            const statusRadio = data.property.isListed ? this.listedRadio : this.notListedRadio;
            await statusRadio.check();

            await this.estimatedValueInput.clear();
            await this.estimatedValueInput.fill(data.property.estimatedValue);
            await this.estimatedValueInput.press('Tab');

            const trustRadio = data.property.heldInTrust ? this.trustYesRadio : this.trustNoRadio;
            await trustRadio.check();

            // When held in a trust, pick the trust type if one was provided.
            if (data.property.heldInTrust && data.property.trustType) {
                await this.selectTrustType(data.property.trustType);
            }

            await this.firstNameInput.fill(data.applicant.firstName);
            await this.firstNameInput.press('Tab');

            await this.lastNameInput.fill(data.applicant.lastName);
            await this.lastNameInput.press('Tab');

            await this.emailInput.fill(data.applicant.email);
            await this.emailInput.press('Tab');

            await this.ssnInput.fill(data.applicant.ssn);
            await this.ssnInput.press('Tab');

            await this.dobInput.fill(data.applicant.dateOfBirth);
            await this.dobInput.press('Tab');

            await this.phoneInput.fill(data.applicant.phoneNumber);
            await this.phoneInput.press('Tab');

            const incomeMap = this.#incomeSourceMap();
            for (const source of data.applicant.incomeSources) {
                await ensureChecked(incomeMap[source], { page: this.page, label: source });
            }

            if (data.applicant.incomeSources.includes('Salary or hourly wages') && data.applicant.job) {
                await this.fillJobDetails(data.applicant.job);
            }

            await this.#selectToggleButton(this.#loanPurposeMap()[data.applicant.loanPurpose]);

            if (data.coBorrower?.hasCoBorrower) {
                await this.fillCoBorrowerDetails(data.coBorrower);
            }

            if (data.consent.softCreditCheck) {
                await ensureChecked(this.softCreditCheckConsent, {
                    page: this.page,
                    label: 'Consent to Soft Credit Check',
                });
                // Blur the consent block — Tab can land on inline Policy/TOS links
                // and leave the form thinking a required toggle is still unset.
                await this.applicationDetailsMarker.click({ force: true });
            }

            await expect(this.nextBtn).toBeEnabled({ timeout: 45000 });
        });
    };

    /**
     * Selects a trust-type toggle button (revealed after choosing "Yes" to the
     * held-in-trust question). Accepts 'Revocable Trust', 'Irrevocable Trust',
     * or 'LLC'.
     */
    async selectTrustType(trustType) {
        await test.step(`Select trust type: ${trustType}`, async () => {
            const btn = this.#trustTypeMap()[trustType];
            await btn.waitFor({ state: 'visible', timeout: 10000 });
            await btn.click({ force: true });
        });
    };

    /**
     * Clicks Next expecting the irrevocable-trust / LLC lending block: asserts
     * the "can not currently lend" message appears and the form stays on the
     * Application Details step (does not advance to Mortgages & Liens). Used to
     * verify the pause behavior without proceeding into finalization.
     */
    async clickNextExpectingTrustBlock() {
        await test.step('Click Next and expect the trust/LLC lending block', async () => {
            await this.nextBtn.click({ force: true });
            await expect(this.trustLendingBlockMessage).toBeVisible({ timeout: 10000 });
            // Confirm we did NOT advance — still on Application Details, step 2 not shown.
            await expect(this.applicationDetailsMarker).toBeVisible();
            await expect(this.mortgagesHeading).toBeHidden();
        });
    };
    async clickNext() {
        await test.step('Click Next to proceed to Mortgages & Liens', async () => {
            // Collect ALL new pages that open during finalization.
            // co-borrower flow opens two soft-credit consent PDFs — one per applicant.
            // waitForEvent only catches the first; the uncaught second tab can call
            // window.opener.close() and destroy the main page before line 74 runs.
            const consentTabs = [];
            const onPage = (p) => { if (p !== this.page) consentTabs.push(p); };
            this.page.context().on('page', onPage);

            await withProcessAppRetry(this.page, async () => {
                // NEXT enables only after the Application Details form passes
                // validation. If a field value failed to commit (an intermittent
                // issue with MUI .fill() not firing the events the form's
                // validation listens to), NEXT stays disabled — and a plain
                // .click() then AUTO-WAITS for it to become enabled until the
                // whole test times out (~11 min). Bound that wait and fail fast
                // with a diagnostic message instead of a silent multi-minute hang.
                await expect(
                    this.nextBtn,
                    'NEXT did not enable within 45s — Application Details failed validation (a required field likely did not commit). See the attached screenshot.'
                ).toBeEnabled({ timeout: 45000 });

                await this.nextBtn.click();

                // The "Finalizing pre-qualification" overlay may be skipped when the
                // app processes faster than Playwright resolves the locator (especially
                // on co-borrower flows or CI retries).  Wait up to 5 s for it; if it
                // never appears proceed directly — mortgagesHeading waitFor below catches
                // any true failure.
                const appeared = await this.finalizingHeading
                    .waitFor({ state: 'visible', timeout: 5000 })
                    .then(() => true)
                    .catch(() => false);

                if (appeared) {
                    // Wait for finalization to fully complete (URL stays the same — SPA)
                    await this.finalizingHeading.waitFor({ state: 'hidden', timeout: 200000 });
                }
            });

            // Confirm step 2 loaded.
            // 60 s — on CI, the Finalizing overlay may hide quickly but the
            // Mortgages & Liens page still takes many seconds to hydrate its data
            // (especially on co-borrower flows where two credit pulls are in flight).
            await this.mortgagesHeading.waitFor({ state: 'visible', timeout: 60000 });

            // Brief buffer so any late-opening tabs (e.g. co-borrower consent) are captured
            await this.page.waitForTimeout(1500);
            this.page.context().off('page', onPage);

            await test.step('Close soft credit consent PDF tab(s)', async () => {
                for (const tab of consentTabs) {
                    if (tab.isClosed()) continue;
                    await tab.waitForLoadState('load').catch(() => null);
                    const url = tab.url();
                    // Only close tabs that are the expected consent PDF or blank popups
                    if (url.includes('borrowerSoftCreditConsentSignature') || url === 'about:blank') {
                        await tab.close().catch(() => null);
                    }
                }
                // Re-focus the main page in case the browser switched focus on tab close
                await this.page.bringToFront();
            });
        });
    };
};

export default NewApplicationPage;



