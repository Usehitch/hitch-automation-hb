# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/pre-qual-manual.spec.js >> Pre-Qual Manually >> Create new application
- Location: tests/Broker Flow/pre-qual-manual.spec.js:10:9

# Error details

```
Test timeout of 660000ms exceeded.
```

```
Error: locator.click: Test timeout of 660000ms exceeded.
Call log:
  - waiting for getByText('Can\'t find your address? Enter it manually.')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - img "502" [ref=e4]
      - heading "Bad Gateway" [level=1] [ref=e6]
    - main [ref=e7]:
      - generic [ref=e8]: "Request ID: a136b646ed6b71e7-SJC"
      - generic [ref=e9]: This service is currently unavailable. Please try again in a few minutes.
      - generic [ref=e10]:
        - text: If you are the site owner, refer to
        - link "Render’s documentation" [ref=e11] [cursor=pointer]:
          - /url: https://render.com/docs/troubleshooting-deploys#502-bad-gateway
        - text: for troubleshooting.
  - contentinfo [ref=e12]:
    - generic [ref=e13]:
      - text: Powered by
      - link "Render" [ref=e14] [cursor=pointer]:
        - /url: https://render.com
        - img "Render" [ref=e15]
```

# Test source

```ts
  100 |         // The co-borrower choice is a Yes/No radio group. Scope to the Co-Borrower
  101 |         // accordion (the innermost div holding both the label and a radio) so its
  102 |         // "Yes"/"No" don't collide with the trust Yes/No radios. Only valid once
  103 |         // the section is expanded — callers must expand first.
  104 |         this.coBorrowerSection = this.page.locator('div')
  105 |             .filter({ has: this.page.getByText('Co-Borrower', { exact: true }) })
  106 |             .filter({ has: this.page.getByRole('radio', { name: 'Yes' }) })
  107 |             .last();
  108 |         this.coBorrowerYesRadio = this.coBorrowerSection.getByRole('radio', { name: 'Yes' });
  109 |         this.coBorrowerNoRadio = this.coBorrowerSection.getByRole('radio', { name: 'No' });
  110 | 
  111 |         // First/Last name expose stable data-testids.
  112 |         this.coBorrowerFirstNameInput = this.page.getByTestId('coborrowerFirstName');
  113 |         this.coBorrowerLastNameInput = this.page.getByTestId('coborrowerLastName');
  114 | 
  115 |         // Remaining fields have no testid, so match them by label scoped to the
  116 |         // co-borrower accordion (which wraps the whole sub-form). This isolates
  117 |         // them from the identically-labelled main-applicant fields, which live in
  118 |         // a separate accordion. Note the SSN field is labelled "SSN" (not
  119 |         // "Social Security Number").
  120 |         this.coBorrowerEmailInput = this.coBorrowerSection.getByLabel(/Email Address/);
  121 |         this.coBorrowerSsnInput = this.coBorrowerSection.getByLabel(/^SSN/);
  122 |         this.coBorrowerDobInput = this.coBorrowerSection.getByLabel(/Date of Birth/);
  123 |         this.coBorrowerPhoneInput = this.coBorrowerSection.getByLabel(/Phone Number/);
  124 | 
  125 |         // -- Consent -----------------------------------------------------------
  126 |         this.softCreditCheckConsent = this.page.getByRole('checkbox', { name: /Consent to Soft Credit Check/ });
  127 | 
  128 |         // -- Finalization loading screen ---------------------------------------
  129 |         this.finalizingHeading = this.page.getByText('Finalizing pre-qualification').first();
  130 |         this.mortgagesHeading = this.page.getByText('Review Mortgages & Liens on Subject Property');
  131 | 
  132 |         // -- Actions -----------------------------------------------------------
  133 |         this.nextBtn = this.page.getByRole('button', { name: 'Next' });
  134 |         this.saveForLaterBtn = this.page.getByRole('button', { name: 'Save for Later' });
  135 |     };
  136 | 
  137 |     // -- Private helpers -------------------------------------------------------
  138 | 
  139 |     #propertyUsageMap() {
  140 |         return {
  141 |             'Primary Residence': this.primaryResidenceBtn,
  142 |             'Investment Property': this.investmentPropertyBtn,
  143 |             'Second Home': this.secondHomeBtn,
  144 |         };
  145 |     };
  146 | 
  147 |     #buildingTypeMap() {
  148 |         return {
  149 |             'Single Family': this.singleFamilyBtn,
  150 |             'Condo': this.condoBtn,
  151 |             '2-4 Unit': this.twoToFourUnitBtn,
  152 |         };
  153 |     };
  154 | 
  155 |     #incomeSourceMap() {
  156 |         return {
  157 |             'Salary or hourly wages': this.salaryCheckbox,
  158 |             'Self Employed': this.selfEmployedCheckbox,
  159 |             'Benefits Income': this.benefitsCheckbox,
  160 |             'Rental Income': this.rentalCheckbox,
  161 |             'Other': this.otherIncomeCheckbox,
  162 |         };
  163 |     };
  164 | 
  165 |     #loanPurposeMap() {
  166 |         return {
  167 |             'Debt Consolidation': this.debtConsolidationBtn,
  168 |             'Home Improvement': this.homeImprovementBtn,
  169 |             'Other': this.otherPurposeBtn,
  170 |         };
  171 |     };
  172 | 
  173 |     #trustTypeMap() {
  174 |         return {
  175 |             'Revocable Trust': this.revocableTrustBtn,
  176 |             'Irrevocable Trust': this.irrevocableTrustBtn,
  177 |             'LLC': this.llcTrustBtn,
  178 |         };
  179 |     };
  180 | 
  181 |     async #isSelectedToggle(btn) {
  182 |         return btn.evaluate(el =>
  183 |             el.getAttribute('aria-pressed') === 'true'
  184 |             || el.classList.contains('MuiChip-filledPrimary'),
  185 |         );
  186 |     }
  187 | 
  188 |     /** Clicks a MUI toggle/chip until its selected state is reflected in the DOM. */
  189 |     async #selectToggleButton(btn) {
  190 |         await btn.scrollIntoViewIfNeeded();
  191 |         if (await this.#isSelectedToggle(btn)) return;
  192 |         await btn.click({ force: true });
  193 |         await expect.poll(async () => this.#isSelectedToggle(btn)).toBe(true);
  194 |     };
  195 | 
  196 |     // -- Public methods --------------------------------------------------------
  197 | 
  198 |     async fillPropertyAddress(address) {
  199 |         await test.step('Fill property address', async () => {
> 200 |             await this.enterManuallyLink.click();
      |                                          ^ Error: locator.click: Test timeout of 660000ms exceeded.
  201 |             await this.streetInput.waitFor({ state: 'visible' });
  202 |             await this.streetInput.fill(address.street);
  203 |             await this.streetInput.press('Tab');
  204 | 
  205 |             if (address.unit) {
  206 |                 await this.unitInput.fill(address.unit);
  207 |                 await this.unitInput.press('Tab');
  208 |             }
  209 | 
  210 |             await this.cityInput.fill(address.city);
  211 |             await this.cityInput.press('Tab');
  212 | 
  213 |             if (address.county) {
  214 |                 await this.countyInput.fill(address.county);
  215 |                 await this.countyInput.press('Tab');
  216 |             }
  217 | 
  218 |             // State is an MUI Autocomplete. Commit the choice via the keyboard
  219 |             // rather than clicking the <li> option: a floating "TEST DATA"
  220 |             // environment chip overlaps the dropdown and intercepts pointer
  221 |             // events on the option, so a click intermittently fails ("...chip
  222 |             // subtree intercepts pointer events" then the option detaches).
  223 |             // Filling filters to the match; ArrowDown highlights it, Enter commits.
  224 |             //
  225 |             // Key the input via its combobox role, NOT this.stateInput
  226 |             // (getByLabel(/^State/)): once the dropdown opens the listbox is
  227 |             // aria-labelledby the same "State" label, so getByLabel matches two
  228 |             // elements and press() trips strict mode.
  229 |             const stateCombo = this.page.getByRole('combobox', { name: /^State/ });
  230 |             await this.stateInput.fill(address.state);
  231 |             await this.page
  232 |                 .getByRole('option', { name: address.state, exact: true })
  233 |                 .waitFor({ state: 'visible', timeout: 10000 });
  234 |             await stateCombo.press('ArrowDown');
  235 |             await stateCombo.press('Enter');
  236 | 
  237 |             await this.zipInput.fill(address.zip);
  238 |             await this.zipInput.press('Tab');
  239 |         });
  240 |     };
  241 | 
  242 |     async fillCoBorrowerDetails(coBorrower) {
  243 |         await test.step('Fill co-borrower details', async () => {
  244 |             // The accordion's default state varies between runs. Expand only when
  245 |             // an "Expand" button is present — re-clicking an open accordion would
  246 |             // collapse it. Decide from the header button, not the radios (see the
  247 |             // coBorrowerExpandBtn locator note).
  248 |             const collapsed = await this.coBorrowerExpandBtn
  249 |                 .isVisible({ timeout: 2000 })
  250 |                 .catch(() => false);
  251 |             if (collapsed) {
  252 |                 await this.coBorrowerExpandBtn.click();
  253 |             }
  254 |             await this.coBorrowerYesRadio.waitFor({ state: 'visible', timeout: 10000 });
  255 | 
  256 |             await this.coBorrowerYesRadio.check();
  257 | 
  258 |             await this.coBorrowerFirstNameInput.waitFor({ state: 'visible', timeout: 10000 });
  259 |             await this.coBorrowerFirstNameInput.fill(coBorrower.firstName);
  260 |             await this.coBorrowerFirstNameInput.press('Tab');
  261 | 
  262 |             await this.coBorrowerLastNameInput.fill(coBorrower.lastName);
  263 |             await this.coBorrowerLastNameInput.press('Tab');
  264 | 
  265 |             await this.coBorrowerEmailInput.fill(coBorrower.email);
  266 |             await this.coBorrowerEmailInput.press('Tab');
  267 | 
  268 |             await this.coBorrowerSsnInput.fill(coBorrower.ssn);
  269 |             await this.coBorrowerSsnInput.press('Tab');
  270 | 
  271 |             await this.coBorrowerDobInput.fill(coBorrower.dateOfBirth);
  272 |             await this.coBorrowerDobInput.press('Tab');
  273 | 
  274 |             await this.coBorrowerPhoneInput.fill(coBorrower.phoneNumber);
  275 |             await this.coBorrowerPhoneInput.press('Tab');
  276 |         });
  277 |     };
  278 | 
  279 |     async fillJobDetails(job) {
  280 |         await test.step('Fill job details', async () => {
  281 |             await this.companyNameInput.waitFor({ state: 'visible' });
  282 |             await this.companyNameInput.fill(job.companyName);
  283 |             await this.companyNameInput.press('Tab');
  284 | 
  285 |             await this.totalAnnualCompensationInput.fill(job.totalAnnualCompensation);
  286 |             await this.totalAnnualCompensationInput.press('Tab');
  287 | 
  288 |             await this.startDateInput.fill(job.startDate);
  289 |             await this.startDateInput.press('Tab');
  290 | 
  291 |             await this.doneEditingBtn.click({ force: true });
  292 |         });
  293 |     };
  294 | 
  295 |     async fillApplicationDetails(data) {
  296 |         await test.step('Fill application details', async () => {
  297 |             await this.fillPropertyAddress(data.property.address);
  298 | 
  299 |             await this.#selectToggleButton(this.#propertyUsageMap()[data.property.usage]);
  300 |             await this.#selectToggleButton(this.#buildingTypeMap()[data.property.buildingType]);
```