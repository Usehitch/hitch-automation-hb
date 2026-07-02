# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: LO Flow/property-applicant-data.spec.js >> LO - Property and Applicant Data >> LO can proceed past a revocable trust (control — no block)
- Location: tests/LO Flow/property-applicant-data.spec.js:58:9

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  getByRole('button', { name: 'Next' })
Expected: enabled
Received: disabled
Timeout:  45000ms

Call log:
  - Expect "toBeEnabled" with timeout 45000ms
  - waiting for getByRole('button', { name: 'Next' })
    48 × locator resolved to <button disabled id=":ru:" tabindex="-1" type="button" class="MuiButtonBase-root MuiButton-root MuiLoadingButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary Mui-disabled MuiButton-root MuiLoadingButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-h69d4t">Next</button>
       - unexpected value "disabled"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - button "Go back" [ref=e7] [cursor=pointer]:
          - img [ref=e8]
        - generic [ref=e10]: New Application
      - generic [ref=e12]:
        - generic [ref=e14]:
          - img [ref=e16]:
            - generic [ref=e18]: "1"
          - paragraph [ref=e21]: APPLICATION DETAILS
        - generic [ref=e25]:
          - img [ref=e27]:
            - generic [ref=e29]: "2"
          - paragraph [ref=e32]: MORTGAGES & LIENS
        - generic [ref=e36]:
          - img [ref=e38]:
            - generic [ref=e40]: "3"
          - paragraph [ref=e43]: OFFER REVIEW
    - generic [ref=e44]:
      - generic [ref=e45]:
        - generic [ref=e46] [cursor=pointer]:
          - generic [ref=e47]:
            - img [ref=e49]
            - paragraph [ref=e53]: Property Address for Financing
          - generic [ref=e54]:
            - img [ref=e56]
            - button "Expand" [ref=e58]:
              - img [ref=e59]
        - generic: Street Address*
        - generic: "Unit/Apt # (optional)"
        - generic: City*
        - generic: County (optional)
        - generic: State*
        - generic: Zip*
      - generic [ref=e61]:
        - generic [ref=e62] [cursor=pointer]:
          - generic [ref=e63]:
            - img [ref=e65]
            - paragraph [ref=e69]: Subject Property Information
          - generic [ref=e70]:
            - img [ref=e72]
            - button "Collapse" [ref=e74]:
              - img [ref=e75]
        - generic [ref=e81]:
          - generic [ref=e82]:
            - paragraph [ref=e83]: Property Usage*
            - group [ref=e84]:
              - button "Primary Residence" [pressed] [ref=e85] [cursor=pointer]: Primary Residence
              - button "Investment Property" [ref=e86] [cursor=pointer]: Investment Property
              - button "Second Home" [ref=e87] [cursor=pointer]: Second Home
          - generic [ref=e88]:
            - paragraph [ref=e89]: Building Type*
            - group [ref=e90]:
              - button "Single Family" [pressed] [ref=e91] [cursor=pointer]: Single Family
              - button "Condo" [ref=e92] [cursor=pointer]: Condo
              - button "2-4 Unit" [ref=e93] [cursor=pointer]: 2-4 Unit
          - generic [ref=e94]:
            - paragraph [ref=e95]: Property Status*
            - radiogroup [ref=e96]:
              - generic [ref=e97] [cursor=pointer]:
                - generic [ref=e98]:
                  - radio "Not listed for sale" [checked] [ref=e99]
                  - generic [ref=e100]:
                    - img [ref=e101]
                    - img [ref=e103]
                - generic [ref=e105]: Not listed for sale
              - generic [ref=e106] [cursor=pointer]:
                - generic [ref=e107]:
                  - radio "Listed or recently listed for sale in the last 60 days" [ref=e108]
                  - img [ref=e110]
                - generic [ref=e112]: Listed or recently listed for sale in the last 60 days
          - generic [ref=e114]:
            - generic [ref=e115]: Estimated Property Value *
            - generic [ref=e116]:
              - textbox "Estimated Property Value *" [ref=e117]: $500,000
              - group:
                - generic: Estimated Property Value *
          - generic [ref=e118]:
            - paragraph [ref=e119]: Is the HELOC property currently held in a trust?
            - radiogroup [ref=e120]:
              - generic [ref=e121] [cursor=pointer]:
                - generic [ref=e122]:
                  - radio "Yes" [checked] [ref=e123]
                  - generic [ref=e124]:
                    - img [ref=e125]
                    - img [ref=e127]
                - generic [ref=e129]: "Yes"
              - generic [ref=e130] [cursor=pointer]:
                - generic [ref=e131]:
                  - radio "No" [ref=e132]
                  - img [ref=e134]
                - generic [ref=e136]: "No"
          - generic [ref=e137]:
            - paragraph [ref=e138]: What type of trust holds this property?
            - group [ref=e139]:
              - button "Revocable Trust A trust that can be modified or revoked by the grantor during their lifetime." [pressed] [ref=e140] [cursor=pointer]:
                - text: Revocable Trust
                - button "A trust that can be modified or revoked by the grantor during their lifetime." [ref=e141]:
                  - img [ref=e142]
              - button "Irrevocable Trust A trust that cannot be modified or revoked after it is created." [ref=e144] [cursor=pointer]:
                - text: Irrevocable Trust
                - button "A trust that cannot be modified or revoked after it is created." [ref=e145]:
                  - img [ref=e146]
              - button "LLC (Limited Liability Company) A business structure that combines pass-through taxation with limited liability." [ref=e148] [cursor=pointer]:
                - text: LLC (Limited Liability Company)
                - button "A business structure that combines pass-through taxation with limited liability." [ref=e149]:
                  - img [ref=e150]
      - generic [ref=e152]:
        - generic [ref=e153] [cursor=pointer]:
          - generic [ref=e154]:
            - img [ref=e156]
            - paragraph [ref=e160]: Main Applicant Information
          - generic [ref=e161]:
            - img [ref=e163]
            - button "Collapse" [ref=e165]:
              - img [ref=e166]
        - generic [ref=e172]:
          - generic [ref=e173]:
            - generic [ref=e174]:
              - generic [ref=e175]:
                - text: First Name
                - generic [ref=e176]: "*"
              - generic [ref=e177]:
                - textbox "First Name" [ref=e178]: Andy
                - group:
                  - generic: First Name *
            - generic [ref=e179]:
              - generic [ref=e180]:
                - text: Last Name
                - generic [ref=e181]: "*"
              - generic [ref=e182]:
                - textbox "Last Name" [ref=e183]: America
                - group:
                  - generic: Last Name *
          - generic [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]:
                - text: Email Address
                - generic [ref=e187]: "*"
              - generic [ref=e188]:
                - textbox "Email Address" [ref=e189]: test.8ufq6.1783001204634@mailinator.com
                - group:
                  - generic: Email Address *
            - generic [ref=e191]:
              - generic [ref=e192]:
                - text: SSN
                - generic [ref=e193]: "*"
              - generic [ref=e194]:
                - textbox "SSN" [ref=e195]: 999-60-3333
                - group:
                  - generic: SSN *
          - generic [ref=e196]:
            - generic [ref=e198]:
              - generic [ref=e199]:
                - text: Date of Birth *
                - generic [ref=e200]: "*"
              - generic [ref=e201]:
                - textbox "Date of Birth *" [ref=e202]:
                  - /placeholder: MM/DD/YYYY
                  - text: 01/15/1985
                - group:
                  - generic: Date of Birth * *
            - generic [ref=e203]:
              - generic [ref=e204]: Phone Number *
              - generic [ref=e205]:
                - paragraph [ref=e207]: "+1"
                - textbox "Phone Number *" [ref=e208]: (512) 123-1113
                - group:
                  - generic: Phone Number *
          - generic [ref=e210]:
            - generic [ref=e211]:
              - generic [ref=e212]:
                - paragraph [ref=e213]: Income Sources*
                - paragraph [ref=e214]: Select at least one income source to calculate your total annual income.
              - alert [ref=e215]:
                - generic [ref=e216]: We were able to automatically identify and pre-fill your employer information. Please add any additional income sources in the sections that follow, if applicable.
            - generic [ref=e217]:
              - generic [ref=e218]:
                - generic [ref=e220]:
                  - generic:
                    - checkbox "Salary or hourly wages" [checked] [disabled]
                    - img
                - paragraph [ref=e221]: Salary or hourly wages
              - generic [ref=e222]:
                - generic [ref=e223]:
                  - img [ref=e224]
                  - paragraph [ref=e226]: You can only add up to two jobs. For additional entries, please use the 'Other Income' section
                - button "Add Another Job" [ref=e227] [cursor=pointer]:
                  - img [ref=e229]
                  - text: Add Another Job
            - generic [ref=e232] [cursor=pointer]:
              - generic [ref=e235]:
                - checkbox "Self Employed" [ref=e236]
                - img [ref=e237]
              - paragraph [ref=e239]: Self Employed
            - generic [ref=e241] [cursor=pointer]:
              - generic [ref=e244]:
                - checkbox "Benefits Income" [ref=e245]
                - img [ref=e246]
              - paragraph [ref=e248]: Benefits Income
            - generic [ref=e250] [cursor=pointer]:
              - generic [ref=e253]:
                - checkbox "Rental Income" [ref=e254]
                - img [ref=e255]
              - paragraph [ref=e257]: Rental Income
            - generic [ref=e259] [cursor=pointer]:
              - generic [ref=e262]:
                - checkbox "Other" [ref=e263]
                - img [ref=e264]
              - paragraph [ref=e266]: Other
            - generic [ref=e267]:
              - paragraph [ref=e268]: Total Annual Income
              - paragraph [ref=e269]: $67,324
            - paragraph [ref=e270]: You may include income that is considered community or marital income in your state. Disclosures of alimony, child support, or separate maintenance payment is not required.
          - generic [ref=e271]:
            - paragraph [ref=e272]: Loan Purpose*
            - generic [ref=e273]:
              - button "Debt Consolidation" [ref=e274] [cursor=pointer]:
                - generic [ref=e275]: Debt Consolidation
              - button "Home Improvement" [ref=e276] [cursor=pointer]:
                - generic [ref=e277]: Home Improvement
              - button "Other" [ref=e278] [cursor=pointer]:
                - generic [ref=e279]: Other
      - generic [ref=e281] [cursor=pointer]:
        - generic [ref=e282]:
          - img [ref=e284]
          - paragraph [ref=e290]: Co-Borrower
        - button "Expand" [ref=e292]:
          - img [ref=e293]
      - generic [ref=e295]:
        - generic [ref=e296] [cursor=pointer]:
          - generic [ref=e297]:
            - img [ref=e299]
            - generic [ref=e302]:
              - paragraph [ref=e303]: Loan Officer Assistant
              - paragraph [ref=e304]: (Optional)
          - button "Collapse" [ref=e306]:
            - img [ref=e307]
        - generic [ref=e316]:
          - img [ref=e318]
          - combobox "Select Loan Officer Assistant" [ref=e321]
          - button "Open" [ref=e323] [cursor=pointer]:
            - img [ref=e324]
          - group
      - generic [ref=e327] [cursor=pointer]:
        - generic [ref=e330]:
          - checkbox [checked] [ref=e331]
          - img [ref=e332]
        - generic [ref=e335]:
          - paragraph [ref=e336]: Consent to Soft Credit Check
          - paragraph [ref=e337]:
            - text: I certify that I have obtained consent from the prospective
            - strong [ref=e338]: borrower and, if applicable, any co-borrower
            - text: to conduct a
            - strong [ref=e339]: soft credit check
            - text: to evaluate potential rates and terms. This soft credit inquiry
            - strong [ref=e340]: will not affect their credit score(s)
            - text: .
          - paragraph [ref=e341]: I understand that if the borrower and, if applicable, co-borrower choose to proceed and complete a full application, a hard credit inquiry may be requested from one or more consumer reporting agencies, which may impact their credit score(s).
          - paragraph [ref=e342]:
            - text: I further certify that I have obtained the borrower's and co-borrower's (if applicable) consent for Forward Lending, Inc. d/b/a Method to perform a soft credit pull and to access their
            - strong [ref=e343]: liability account data
            - text: from their financial institutions or service providers on their behalf, and to
            - strong [ref=e344]: share that data with us
            - text: for evaluation purposes.
          - paragraph [ref=e345]:
            - text: I also acknowledge and agree to Method's
            - link "Privacy Policy" [ref=e346]:
              - /url: https://methodfi.com/legal/privacy-policy
            - text: and
            - link "Terms of Service" [ref=e347]:
              - /url: https://methodfi.com/legal/terms-of-service-for-end-users
    - generic [ref=e348]:
      - button "SAVE FOR LATER" [disabled]
      - button "Next" [disabled]
  - alert [ref=e349]: /portal/new-application
  - generic:
    - generic:
      - generic [ref=e351]:
        - iframe [ref=e352]:
          - button "Close message from company" [ref=f9e4] [cursor=pointer]:
            - img [ref=f9e5]
        - iframe [ref=e353]:
          - button "Hi. Need any help?" [ref=f10e5] [cursor=pointer]
      - iframe [ref=e354]:
        - button "Open messaging window" [ref=f11e5] [cursor=pointer]:
          - img [ref=f11e7]
          - img [ref=f11e10]
```

# Test source

```ts
  262 |             await this.coBorrowerFirstNameInput.press('Tab');
  263 | 
  264 |             await this.coBorrowerLastNameInput.fill(coBorrower.lastName);
  265 |             await this.coBorrowerLastNameInput.press('Tab');
  266 | 
  267 |             await this.coBorrowerEmailInput.fill(coBorrower.email);
  268 |             await this.coBorrowerEmailInput.press('Tab');
  269 | 
  270 |             await this.coBorrowerSsnInput.fill(coBorrower.ssn);
  271 |             await this.coBorrowerSsnInput.press('Tab');
  272 | 
  273 |             await this.coBorrowerDobInput.fill(coBorrower.dateOfBirth);
  274 |             await this.coBorrowerDobInput.press('Tab');
  275 | 
  276 |             await this.coBorrowerPhoneInput.fill(coBorrower.phoneNumber);
  277 |             await this.coBorrowerPhoneInput.press('Tab');
  278 |         });
  279 |     };
  280 | 
  281 |     async fillJobDetails(job) {
  282 |         await test.step('Fill job details', async () => {
  283 |             await this.companyNameInput.waitFor({ state: 'visible' });
  284 |             await this.companyNameInput.fill(job.companyName);
  285 |             await this.companyNameInput.press('Tab');
  286 | 
  287 |             await this.totalAnnualCompensationInput.fill(job.totalAnnualCompensation);
  288 |             await this.totalAnnualCompensationInput.press('Tab');
  289 | 
  290 |             await this.startDateInput.fill(job.startDate);
  291 |             await this.startDateInput.press('Tab');
  292 | 
  293 |             await this.doneEditingBtn.click({ force: true });
  294 |         });
  295 |     };
  296 | 
  297 |     async fillApplicationDetails(data) {
  298 |         await test.step('Fill application details', async () => {
  299 |             await this.fillPropertyAddress(data.property.address);
  300 | 
  301 |             await this.#selectToggleButton(this.#propertyUsageMap()[data.property.usage]);
  302 |             await this.#selectToggleButton(this.#buildingTypeMap()[data.property.buildingType]);
  303 | 
  304 |             const statusRadio = data.property.isListed ? this.listedRadio : this.notListedRadio;
  305 |             await statusRadio.check();
  306 | 
  307 |             await this.estimatedValueInput.clear();
  308 |             await this.estimatedValueInput.fill(data.property.estimatedValue);
  309 |             await this.estimatedValueInput.press('Tab');
  310 | 
  311 |             const trustRadio = data.property.heldInTrust ? this.trustYesRadio : this.trustNoRadio;
  312 |             await trustRadio.check();
  313 | 
  314 |             // When held in a trust, pick the trust type if one was provided.
  315 |             if (data.property.heldInTrust && data.property.trustType) {
  316 |                 await this.selectTrustType(data.property.trustType);
  317 |             }
  318 | 
  319 |             await this.firstNameInput.fill(data.applicant.firstName);
  320 |             await this.firstNameInput.press('Tab');
  321 | 
  322 |             await this.lastNameInput.fill(data.applicant.lastName);
  323 |             await this.lastNameInput.press('Tab');
  324 | 
  325 |             await this.emailInput.fill(data.applicant.email);
  326 |             await this.emailInput.press('Tab');
  327 | 
  328 |             await this.ssnInput.fill(data.applicant.ssn);
  329 |             await this.ssnInput.press('Tab');
  330 | 
  331 |             await this.dobInput.fill(data.applicant.dateOfBirth);
  332 |             await this.dobInput.press('Tab');
  333 | 
  334 |             await this.phoneInput.fill(data.applicant.phoneNumber);
  335 |             await this.phoneInput.press('Tab');
  336 | 
  337 |             const incomeMap = this.#incomeSourceMap();
  338 |             for (const source of data.applicant.incomeSources) {
  339 |                 await ensureChecked(incomeMap[source], { page: this.page, label: source });
  340 |             }
  341 | 
  342 |             if (data.applicant.incomeSources.includes('Salary or hourly wages') && data.applicant.job) {
  343 |                 await this.fillJobDetails(data.applicant.job);
  344 |             }
  345 | 
  346 |             await this.#selectToggleButton(this.#loanPurposeMap()[data.applicant.loanPurpose]);
  347 | 
  348 |             if (data.coBorrower?.hasCoBorrower) {
  349 |                 await this.fillCoBorrowerDetails(data.coBorrower);
  350 |             }
  351 | 
  352 |             if (data.consent.softCreditCheck) {
  353 |                 await ensureChecked(this.softCreditCheckConsent, {
  354 |                     page: this.page,
  355 |                     label: 'Consent to Soft Credit Check',
  356 |                 });
  357 |                 // Blur the consent block — Tab can land on inline Policy/TOS links
  358 |                 // and leave the form thinking a required toggle is still unset.
  359 |                 await this.applicationDetailsMarker.click({ force: true });
  360 |             }
  361 | 
> 362 |             await expect(this.nextBtn).toBeEnabled({ timeout: 45000 });
      |                                        ^ Error: expect(locator).toBeEnabled() failed
  363 |         });
  364 |     };
  365 | 
  366 |     /**
  367 |      * Selects a trust-type toggle button (revealed after choosing "Yes" to the
  368 |      * held-in-trust question). Accepts 'Revocable Trust', 'Irrevocable Trust',
  369 |      * or 'LLC'.
  370 |      */
  371 |     async selectTrustType(trustType) {
  372 |         await test.step(`Select trust type: ${trustType}`, async () => {
  373 |             const btn = this.#trustTypeMap()[trustType];
  374 |             await btn.waitFor({ state: 'visible', timeout: 10000 });
  375 |             await btn.click({ force: true });
  376 |         });
  377 |     };
  378 | 
  379 |     /**
  380 |      * Clicks Next expecting the irrevocable-trust / LLC lending block: asserts
  381 |      * the "can not currently lend" message appears and the form stays on the
  382 |      * Application Details step (does not advance to Mortgages & Liens). Used to
  383 |      * verify the pause behavior without proceeding into finalization.
  384 |      */
  385 |     async clickNextExpectingTrustBlock() {
  386 |         await test.step('Click Next and expect the trust/LLC lending block', async () => {
  387 |             await this.nextBtn.click({ force: true });
  388 |             await expect(this.trustLendingBlockMessage).toBeVisible({ timeout: 10000 });
  389 |             // Confirm we did NOT advance — still on Application Details, step 2 not shown.
  390 |             await expect(this.applicationDetailsMarker).toBeVisible();
  391 |             await expect(this.mortgagesHeading).toBeHidden();
  392 |         });
  393 |     };
  394 |     async clickNext() {
  395 |         await test.step('Click Next to proceed to Mortgages & Liens', async () => {
  396 |             // Collect ALL new pages that open during finalization.
  397 |             // co-borrower flow opens two soft-credit consent PDFs — one per applicant.
  398 |             // waitForEvent only catches the first; the uncaught second tab can call
  399 |             // window.opener.close() and destroy the main page before line 74 runs.
  400 |             const consentTabs = [];
  401 |             const onPage = (p) => { if (p !== this.page) consentTabs.push(p); };
  402 |             this.page.context().on('page', onPage);
  403 | 
  404 |             await withProcessAppRetry(this.page, async () => {
  405 |                 // NEXT enables only after the Application Details form passes
  406 |                 // validation. If a field value failed to commit (an intermittent
  407 |                 // issue with MUI .fill() not firing the events the form's
  408 |                 // validation listens to), NEXT stays disabled — and a plain
  409 |                 // .click() then AUTO-WAITS for it to become enabled until the
  410 |                 // whole test times out (~11 min). Bound that wait and fail fast
  411 |                 // with a diagnostic message instead of a silent multi-minute hang.
  412 |                 await expect(
  413 |                     this.nextBtn,
  414 |                     'NEXT did not enable within 45s — Application Details failed validation (a required field likely did not commit). See the attached screenshot.'
  415 |                 ).toBeEnabled({ timeout: 45000 });
  416 | 
  417 |                 await this.nextBtn.click();
  418 | 
  419 |                 // The "Finalizing pre-qualification" overlay may be skipped when the
  420 |                 // app processes faster than Playwright resolves the locator (especially
  421 |                 // on co-borrower flows or CI retries).  Wait up to 5 s for it; if it
  422 |                 // never appears proceed directly — mortgagesHeading waitFor below catches
  423 |                 // any true failure.
  424 |                 const appeared = await this.finalizingHeading
  425 |                     .waitFor({ state: 'visible', timeout: 5000 })
  426 |                     .then(() => true)
  427 |                     .catch(() => false);
  428 | 
  429 |                 if (appeared) {
  430 |                     // Wait for finalization to fully complete (URL stays the same — SPA).
  431 |                     // 300s — raised from 200s after REMN prod exceeded that ceiling;
  432 |                     // its finalization backend runs slower than HB prod/staging.
  433 |                     await this.finalizingHeading.waitFor({ state: 'hidden', timeout: 300000 });
  434 |                 }
  435 |             });
  436 | 
  437 |             // Confirm step 2 loaded.
  438 |             // 120 s — on CI, the Finalizing overlay may hide quickly but the
  439 |             // Mortgages & Liens page still takes many seconds to hydrate its data
  440 |             // (especially on co-borrower flows where two credit pulls are in flight).
  441 |             // Raised from 60s after prod nightlies hit the ceiling then passed clean
  442 |             // on retry — backend hydration occasionally runs past 60s under load.
  443 |             await this.mortgagesHeading.waitFor({ state: 'visible', timeout: 120000 });
  444 | 
  445 |             // Brief buffer so any late-opening tabs (e.g. co-borrower consent) are captured
  446 |             await this.page.waitForTimeout(1500);
  447 |             this.page.context().off('page', onPage);
  448 | 
  449 |             await test.step('Close soft credit consent PDF tab(s)', async () => {
  450 |                 for (const tab of consentTabs) {
  451 |                     if (tab.isClosed()) continue;
  452 |                     await tab.waitForLoadState('load').catch(() => null);
  453 |                     const url = tab.url();
  454 |                     // Only close tabs that are the expected consent PDF or blank popups
  455 |                     if (url.includes('borrowerSoftCreditConsentSignature') || url === 'about:blank') {
  456 |                         await tab.close().catch(() => null);
  457 |                     }
  458 |                 }
  459 |                 // Re-focus the main page in case the browser switched focus on tab close
  460 |                 await this.page.bringToFront();
  461 |             });
  462 |         });
```