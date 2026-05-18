import { expect, test } from '../../fixtures';
import { withProcessAppRetry } from '../../utils/routeHelpers';

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
        // Accordion header — collapsed by default; must be clicked to reveal Yes/No cards
        this.coBorrowerAccordionHeader = this.page.getByText('Co-Borrower', { exact: true });

        this.coBorrowerYesBtn = this.page.getByRole('button', { name: /I have a co-borrower/ });
        this.coBorrowerNoBtn = this.page.getByRole('button', { name: /I am applying by myself/ });

        // Co-borrower confirmed data-testids (first two verified from error output)
        this.coBorrowerFirstNameInput = this.page.getByTestId('coborrowerFirstName');
        this.coBorrowerLastNameInput = this.page.getByTestId('coborrowerLastName');

        // Remaining fields: scope to the Applicant Information card that does NOT
        // contain the main applicant's firstName — safely isolates the co-borrower sub-form
        this.coBorrowerForm = this.page.locator('div').filter({
            has: this.page.getByText('Applicant Information', { exact: true }),
            hasNot: this.page.getByTestId('firstName'),
        }).first();
        this.coBorrowerEmailInput = this.coBorrowerForm.getByLabel(/Email Address/);
        this.coBorrowerSsnInput = this.coBorrowerForm.getByLabel(/Social Security Number/);
        this.coBorrowerDobInput = this.coBorrowerForm.getByLabel(/Date of Birth/);
        this.coBorrowerPhoneInput = this.coBorrowerForm.getByLabel(/Phone Number/);

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
            await this.coBorrowerAccordionHeader.click();
            await this.coBorrowerYesBtn.waitFor({ state: 'visible' });
            await this.coBorrowerYesBtn.click();

            await this.coBorrowerFirstNameInput.waitFor({ state: 'visible' });
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

            await this.#propertyUsageMap()[data.property.usage].click({ force: true });
            await this.#buildingTypeMap()[data.property.buildingType].click({ force: true });

            const statusRadio = data.property.isListed ? this.listedRadio : this.notListedRadio;
            await statusRadio.check();

            await this.estimatedValueInput.clear();
            await this.estimatedValueInput.fill(data.property.estimatedValue);
            await this.estimatedValueInput.press('Tab');

            const trustRadio = data.property.heldInTrust ? this.trustYesRadio : this.trustNoRadio;
            await trustRadio.check();

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
                await incomeMap[source].check({ force: true });
            }

            if (data.applicant.incomeSources.includes('Salary or hourly wages') && data.applicant.job) {
                await this.fillJobDetails(data.applicant.job);
            }

            await this.#loanPurposeMap()[data.applicant.loanPurpose].click({ force: true });

            if (data.coBorrower?.hasCoBorrower) {
                await this.fillCoBorrowerDetails(data.coBorrower);
            }

            if (data.consent.softCreditCheck) {
                await this.softCreditCheckConsent.check();
            }
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
                await this.nextBtn.click();

                // Confirm finalization screen appeared
                await this.finalizingHeading.waitFor({ state: 'visible', timeout: 10000 });

                // Wait for finalization to fully complete (URL stays the same — this is a SPA)
                await this.finalizingHeading.waitFor({ state: 'hidden', timeout: 200000 });
            });

            // Confirm step 2 loaded
            await this.mortgagesHeading.waitFor({ state: 'visible', timeout: 15000 });

            // Brief buffer so any late-opening tabs (e.g. co-borrower consent) are captured
            await this.page.waitForTimeout(1500);
            this.page.context().off('page', onPage);

            await test.step('Close soft credit consent PDF tab(s)', async () => {
                for (const tab of consentTabs) {
                    if (tab.isClosed()) continue;
                    await tab.waitForLoadState('domcontentloaded').catch(() => null);
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



