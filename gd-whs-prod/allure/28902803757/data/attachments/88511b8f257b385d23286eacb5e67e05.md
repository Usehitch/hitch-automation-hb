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
                - textbox "Email Address" [ref=e189]: test.2x0x6.1783465177659@mailinator.com
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
                - textbox "Phone Number *" [ref=e208]: (385) 513-0513
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
                - generic [ref=e228]:
                  - generic [ref=e230]:
                    - paragraph [ref=e231]: Enterprise
                    - paragraph [ref=e232]: DEMO EMPLOYEE
                  - generic [ref=e233]:
                    - generic [ref=e234]:
                      - paragraph [ref=e235]: Start Date
                      - paragraph [ref=e236]: May 2011
                    - generic [ref=e237]:
                      - paragraph [ref=e238]: Annual Income
                      - paragraph [ref=e239]: $67,324
                  - separator [ref=e240]
                  - paragraph [ref=e241]: This record was verified through The Work Number and cannot be modified or deleted to maintain audit trail integrity.
                - generic [ref=e242]:
                  - img [ref=e243]
                  - paragraph [ref=e245]: You can only add up to two jobs. For additional entries, please use the 'Other Income' section
                - button "Add Another Job" [ref=e246] [cursor=pointer]:
                  - img [ref=e248]
                  - text: Add Another Job
            - generic [ref=e251] [cursor=pointer]:
              - generic [ref=e254]:
                - checkbox "Self Employed" [ref=e255]
                - img [ref=e256]
              - paragraph [ref=e258]: Self Employed
            - generic [ref=e260] [cursor=pointer]:
              - generic [ref=e263]:
                - checkbox "Benefits Income" [ref=e264]
                - img [ref=e265]
              - paragraph [ref=e267]: Benefits Income
            - generic [ref=e269] [cursor=pointer]:
              - generic [ref=e272]:
                - checkbox "Rental Income" [ref=e273]
                - img [ref=e274]
              - paragraph [ref=e276]: Rental Income
            - generic [ref=e278] [cursor=pointer]:
              - generic [ref=e281]:
                - checkbox "Other" [ref=e282]
                - img [ref=e283]
              - paragraph [ref=e285]: Other
            - generic [ref=e286]:
              - paragraph [ref=e287]: Total Annual Income
              - paragraph [ref=e288]: $67,324
            - paragraph [ref=e289]: You may include income that is considered community or marital income in your state. Disclosures of alimony, child support, or separate maintenance payment is not required.
          - generic [ref=e290]:
            - paragraph [ref=e291]: Loan Purpose*
            - generic [ref=e292]:
              - button "Debt Consolidation" [ref=e293] [cursor=pointer]:
                - generic [ref=e294]: Debt Consolidation
              - button "Home Improvement" [ref=e295] [cursor=pointer]:
                - generic [ref=e296]: Home Improvement
              - button "Other" [ref=e297] [cursor=pointer]:
                - generic [ref=e298]: Other
      - generic [ref=e300] [cursor=pointer]:
        - generic [ref=e301]:
          - img [ref=e303]
          - paragraph [ref=e309]: Co-Borrower
        - button "Expand" [ref=e311]:
          - img [ref=e312]
      - generic [ref=e314]:
        - generic [ref=e315] [cursor=pointer]:
          - generic [ref=e316]:
            - img [ref=e318]
            - generic [ref=e321]:
              - paragraph [ref=e322]: Loan Officer Assistant
              - paragraph [ref=e323]: (Optional)
          - button "Collapse" [ref=e325]:
            - img [ref=e326]
        - generic [ref=e335]:
          - img [ref=e337]
          - combobox "Select Loan Officer Assistant" [ref=e340]
          - button "Open" [ref=e342] [cursor=pointer]:
            - img [ref=e343]
          - group
      - generic [ref=e346] [cursor=pointer]:
        - generic [ref=e349]:
          - checkbox [checked] [ref=e350]
          - img [ref=e351]
        - generic [ref=e354]:
          - paragraph [ref=e355]: Consent to Soft Credit Check
          - paragraph [ref=e356]:
            - text: I certify that I have obtained consent from the prospective
            - strong [ref=e357]: borrower and, if applicable, any co-borrower
            - text: to conduct a
            - strong [ref=e358]: soft credit check
            - text: to evaluate potential rates and terms. This soft credit inquiry
            - strong [ref=e359]: will not affect their credit score(s)
            - text: .
          - paragraph [ref=e360]: I understand that if the borrower and, if applicable, co-borrower choose to proceed and complete a full application, a hard credit inquiry may be requested from one or more consumer reporting agencies, which may impact their credit score(s).
          - paragraph [ref=e361]:
            - text: I further certify that I have obtained the borrower's and co-borrower's (if applicable) consent for Forward Lending, Inc. d/b/a Method to perform a soft credit pull and to access their
            - strong [ref=e362]: liability account data
            - text: from their financial institutions or service providers on their behalf, and to
            - strong [ref=e363]: share that data with us
            - text: for evaluation purposes.
          - paragraph [ref=e364]:
            - text: I also acknowledge and agree to Method's
            - link "Privacy Policy" [ref=e365]:
              - /url: https://methodfi.com/legal/privacy-policy
            - text: and
            - link "Terms of Service" [ref=e366]:
              - /url: https://methodfi.com/legal/terms-of-service-for-end-users
    - generic [ref=e367]:
      - button "SAVE FOR LATER" [disabled]
      - button "Next" [disabled]
  - alert [ref=e368]: /portal/new-application
  - generic:
    - generic:
      - generic [ref=e370]:
        - iframe [ref=e371]:
          - button "Close message from company" [ref=f10e4] [cursor=pointer]:
            - img [ref=f10e5]
        - iframe [ref=e372]:
          - button "Hi. Need any help?" [ref=f11e5] [cursor=pointer]
      - iframe [ref=e373]:
        - button "Open messaging window" [ref=f12e5] [cursor=pointer]:
          - img [ref=f12e7]
          - img [ref=f12e10]
```

# Test source

```ts
  355 |     };
  356 | 
  357 |     /**
  358 |      * Fills the currently open "Add Business" editor (revealed by checking the
  359 |      * Self Employed income source, or by ADD ANOTHER BUSINESS) and closes it
  360 |      * with DONE EDITING. The compensation field is the editor's only input.
  361 |      * @param {{ totalAnnualCompensation: string }} business
  362 |      */
  363 |     async fillSelfEmployedBusiness(business) {
  364 |         await test.step('Fill self-employed business details', async () => {
  365 |             await this.businessCompensationInput.waitFor({ state: 'visible', timeout: 10000 });
  366 |             await this.businessCompensationInput.fill(business.totalAnnualCompensation);
  367 |             await this.businessCompensationInput.press('Tab');
  368 | 
  369 |             await this.businessDoneEditingBtn.click({ force: true });
  370 |         });
  371 |     };
  372 | 
  373 |     /**
  374 |      * Clicks ADD ANOTHER BUSINESS (enabled only after the previous business
  375 |      * editor was closed with DONE EDITING) and fills the new editor.
  376 |      * @param {{ totalAnnualCompensation: string }} business
  377 |      */
  378 |     async addAnotherBusiness(business) {
  379 |         await test.step('Add another self-employed business', async () => {
  380 |             await expect(this.addAnotherBusinessBtn).toBeEnabled({ timeout: 10000 });
  381 |             await this.addAnotherBusinessBtn.click();
  382 |             await this.fillSelfEmployedBusiness(business);
  383 |         });
  384 |     };
  385 | 
  386 |     async fillApplicationDetails(data) {
  387 |         await test.step('Fill application details', async () => {
  388 |             await this.fillPropertyAddress(data.property.address);
  389 | 
  390 |             await this.#selectToggleButton(this.#propertyUsageMap()[data.property.usage]);
  391 |             await this.#selectToggleButton(this.#buildingTypeMap()[data.property.buildingType]);
  392 | 
  393 |             const statusRadio = data.property.isListed ? this.listedRadio : this.notListedRadio;
  394 |             await statusRadio.check();
  395 | 
  396 |             await this.estimatedValueInput.clear();
  397 |             await this.estimatedValueInput.fill(data.property.estimatedValue);
  398 |             await this.estimatedValueInput.press('Tab');
  399 | 
  400 |             const trustRadio = data.property.heldInTrust ? this.trustYesRadio : this.trustNoRadio;
  401 |             await trustRadio.check();
  402 | 
  403 |             // When held in a trust, pick the trust type if one was provided.
  404 |             if (data.property.heldInTrust && data.property.trustType) {
  405 |                 await this.selectTrustType(data.property.trustType);
  406 |             }
  407 | 
  408 |             await this.firstNameInput.fill(data.applicant.firstName);
  409 |             await this.firstNameInput.press('Tab');
  410 | 
  411 |             await this.lastNameInput.fill(data.applicant.lastName);
  412 |             await this.lastNameInput.press('Tab');
  413 | 
  414 |             await this.emailInput.fill(data.applicant.email);
  415 |             await this.emailInput.press('Tab');
  416 | 
  417 |             await this.ssnInput.fill(data.applicant.ssn);
  418 |             await this.ssnInput.press('Tab');
  419 | 
  420 |             await this.dobInput.fill(data.applicant.dateOfBirth);
  421 |             await this.dobInput.press('Tab');
  422 | 
  423 |             await this.phoneInput.fill(data.applicant.phoneNumber);
  424 |             await this.phoneInput.press('Tab');
  425 | 
  426 |             const incomeMap = this.#incomeSourceMap();
  427 |             for (const source of data.applicant.incomeSources) {
  428 |                 await ensureChecked(incomeMap[source], { page: this.page, label: source });
  429 |             }
  430 | 
  431 |             if (data.applicant.incomeSources.includes('Salary or hourly wages') && data.applicant.job) {
  432 |                 await this.fillJobDetails(data.applicant.job);
  433 |             }
  434 | 
  435 |             if (data.applicant.incomeSources.includes('Self Employed') && data.applicant.business) {
  436 |                 await this.fillSelfEmployedBusiness(data.applicant.business);
  437 |             }
  438 | 
  439 |             await this.#selectToggleButton(this.#loanPurposeMap()[data.applicant.loanPurpose]);
  440 | 
  441 |             if (data.coBorrower?.hasCoBorrower) {
  442 |                 await this.fillCoBorrowerDetails(data.coBorrower);
  443 |             }
  444 | 
  445 |             if (data.consent.softCreditCheck) {
  446 |                 await ensureChecked(this.softCreditCheckConsent, {
  447 |                     page: this.page,
  448 |                     label: 'Consent to Soft Credit Check',
  449 |                 });
  450 |                 // Blur the consent block — Tab can land on inline Policy/TOS links
  451 |                 // and leave the form thinking a required toggle is still unset.
  452 |                 await this.applicationDetailsMarker.click({ force: true });
  453 |             }
  454 | 
> 455 |             await expect(this.nextBtn).toBeEnabled({ timeout: 45000 });
      |                                        ^ Error: expect(locator).toBeEnabled() failed
  456 |         });
  457 |     };
  458 | 
  459 |     /**
  460 |      * Selects a trust-type toggle button (revealed after choosing "Yes" to the
  461 |      * held-in-trust question). Accepts 'Revocable Trust', 'Irrevocable Trust',
  462 |      * or 'LLC'.
  463 |      */
  464 |     async selectTrustType(trustType) {
  465 |         await test.step(`Select trust type: ${trustType}`, async () => {
  466 |             const btn = this.#trustTypeMap()[trustType];
  467 |             await btn.waitFor({ state: 'visible', timeout: 10000 });
  468 |             await btn.click({ force: true });
  469 |         });
  470 |     };
  471 | 
  472 |     /**
  473 |      * Clicks Next expecting the irrevocable-trust / LLC lending block: asserts
  474 |      * the "can not currently lend" message appears and the form stays on the
  475 |      * Application Details step (does not advance to Mortgages & Liens). Used to
  476 |      * verify the pause behavior without proceeding into finalization.
  477 |      */
  478 |     async clickNextExpectingTrustBlock() {
  479 |         await test.step('Click Next and expect the trust/LLC lending block', async () => {
  480 |             await this.nextBtn.click({ force: true });
  481 |             await expect(this.trustLendingBlockMessage).toBeVisible({ timeout: 10000 });
  482 |             // Confirm we did NOT advance — still on Application Details, step 2 not shown.
  483 |             await expect(this.applicationDetailsMarker).toBeVisible();
  484 |             await expect(this.mortgagesHeading).toBeHidden();
  485 |         });
  486 |     };
  487 |     async clickNext() {
  488 |         await test.step('Click Next to proceed to Mortgages & Liens', async () => {
  489 |             // Collect ALL new pages that open during finalization.
  490 |             // co-borrower flow opens two soft-credit consent PDFs — one per applicant.
  491 |             // waitForEvent only catches the first; the uncaught second tab can call
  492 |             // window.opener.close() and destroy the main page before line 74 runs.
  493 |             const consentTabs = [];
  494 |             const onPage = (p) => { if (p !== this.page) consentTabs.push(p); };
  495 |             this.page.context().on('page', onPage);
  496 | 
  497 |             await withProcessAppRetry(this.page, async () => {
  498 |                 // NEXT enables only after the Application Details form passes
  499 |                 // validation. If a field value failed to commit (an intermittent
  500 |                 // issue with MUI .fill() not firing the events the form's
  501 |                 // validation listens to), NEXT stays disabled — and a plain
  502 |                 // .click() then AUTO-WAITS for it to become enabled until the
  503 |                 // whole test times out (~11 min). Bound that wait and fail fast
  504 |                 // with a diagnostic message instead of a silent multi-minute hang.
  505 |                 await expect(
  506 |                     this.nextBtn,
  507 |                     'NEXT did not enable within 45s — Application Details failed validation (a required field likely did not commit). See the attached screenshot.'
  508 |                 ).toBeEnabled({ timeout: 45000 });
  509 | 
  510 |                 await this.nextBtn.click();
  511 | 
  512 |                 // The "Finalizing pre-qualification" overlay may be skipped when the
  513 |                 // app processes faster than Playwright resolves the locator (especially
  514 |                 // on co-borrower flows or CI retries).  Wait up to 5 s for it; if it
  515 |                 // never appears proceed directly — mortgagesHeading waitFor below catches
  516 |                 // any true failure.
  517 |                 const appeared = await this.finalizingHeading
  518 |                     .waitFor({ state: 'visible', timeout: 5000 })
  519 |                     .then(() => true)
  520 |                     .catch(() => false);
  521 | 
  522 |                 if (appeared) {
  523 |                     // Wait for finalization to fully complete (URL stays the same — SPA).
  524 |                     // 300s — raised from 200s after REMN prod exceeded that ceiling;
  525 |                     // its finalization backend runs slower than HB prod/staging.
  526 |                     await this.finalizingHeading.waitFor({ state: 'hidden', timeout: 300000 });
  527 |                 }
  528 |             });
  529 | 
  530 |             // Confirm step 2 loaded.
  531 |             // 120 s — on CI, the Finalizing overlay may hide quickly but the
  532 |             // Mortgages & Liens page still takes many seconds to hydrate its data
  533 |             // (especially on co-borrower flows where two credit pulls are in flight).
  534 |             // Raised from 60s after prod nightlies hit the ceiling then passed clean
  535 |             // on retry — backend hydration occasionally runs past 60s under load.
  536 |             await this.mortgagesHeading.waitFor({ state: 'visible', timeout: 120000 });
  537 | 
  538 |             // Brief buffer so any late-opening tabs (e.g. co-borrower consent) are captured
  539 |             await this.page.waitForTimeout(1500);
  540 |             this.page.context().off('page', onPage);
  541 | 
  542 |             await test.step('Close soft credit consent PDF tab(s)', async () => {
  543 |                 for (const tab of consentTabs) {
  544 |                     if (tab.isClosed()) continue;
  545 |                     await tab.waitForLoadState('load').catch(() => null);
  546 |                     const url = tab.url();
  547 |                     // Only close tabs that are the expected consent PDF or blank popups
  548 |                     if (url.includes('borrowerSoftCreditConsentSignature') || url === 'about:blank') {
  549 |                         await tab.close().catch(() => null);
  550 |                     }
  551 |                 }
  552 |                 // Re-focus the main page in case the browser switched focus on tab close
  553 |                 await this.page.bringToFront();
  554 |             });
  555 |         });
```