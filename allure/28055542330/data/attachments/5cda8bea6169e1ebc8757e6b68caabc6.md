# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/loandetail.spec.js >> Loan Detail — Tracker tab >> Identity Verification expanded detail shows borrower card
- Location: tests/Broker Flow/loandetail.spec.js:157:9

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByText('Identity Verification').first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e8]:
      - list [ref=e10]:
        - listitem [ref=e11]:
          - button "logo":
            - generic:
              - generic:
                - img "logo"
      - generic [ref=e12]:
        - list [ref=e15]:
          - listitem [ref=e16]:
            - button "You're in Dev":
              - img
              - text: You're in Dev
        - list [ref=e19]:
          - listitem [ref=e20]:
            - button "My Loans Chevron down" [ref=e22] [cursor=pointer]:
              - img [ref=e23]
              - text: My Loans
              - img [ref=e26]
              - generic [ref=e28]: Chevron down
          - listitem [ref=e29]:
            - button "Manage Users" [ref=e31] [cursor=pointer]:
              - img [ref=e32]
              - text: Manage Users
          - listitem [ref=e37]:
            - button "Companies" [ref=e39] [cursor=pointer]:
              - img [ref=e40]
              - text: Companies
          - listitem [ref=e44]:
            - button "Company Branches" [ref=e46] [cursor=pointer]:
              - img [ref=e47]
              - text: Company Branches
          - listitem [ref=e52]:
            - button "Quick Pricer" [ref=e54] [cursor=pointer]:
              - img [ref=e55]
              - text: Quick Pricer
          - listitem [ref=e57]:
            - button "Release Notes" [ref=e59] [cursor=pointer]:
              - img [ref=e60]
              - text: Release Notes
        - generic [ref=e65]:
          - listitem [ref=e66]:
            - button "Manage Emails" [ref=e68] [cursor=pointer]:
              - img [ref=e69]
              - text: Manage Emails
          - listitem [ref=e72]:
            - button "AUS Rules" [ref=e74] [cursor=pointer]:
              - img [ref=e75]
              - text: AUS Rules
          - listitem [ref=e78]:
            - button "Loan Configuration" [ref=e80] [cursor=pointer]:
              - img [ref=e81]
              - text: Loan Configuration
        - listitem [ref=e83]:
          - button "Show Old Design" [ref=e85] [cursor=pointer]:
            - img [ref=e86]
            - text: Show Old Design
      - list [ref=e89]:
        - listitem [ref=e90]:
          - button "AS Ace Simon Gebilaguin ace@usehitch.com" [ref=e91] [cursor=pointer]:
            - generic [ref=e93]: AS
            - generic [ref=e94]:
              - paragraph [ref=e95]: Ace Simon Gebilaguin
              - paragraph [ref=e96]: ace@usehitch.com
            - img [ref=e97]
    - main [ref=e101]:
      - generic [ref=e102]:
        - button [ref=e104] [cursor=pointer]:
          - img
        - generic [ref=e105]:
          - generic [ref=e106]:
            - paragraph [ref=e107]:
              - text: Andy America
              - generic [ref=e108]: (B1)
              - text: ","
            - paragraph [ref=e109]:
              - text: Amy America
              - generic [ref=e110]: (B2)
          - generic [ref=e111]:
            - paragraph [ref=e112]: 4556 Eliot St, Denver, CO 80211
            - generic [ref=e114]:
              - generic [ref=e115]: "Loan ID:"
              - generic [ref=e116]: "300000000006496"
              - button [ref=e117] [cursor=pointer]:
                - img
        - generic [ref=e118]:
          - button "Share Links" [ref=e119] [cursor=pointer]:
            - img
            - text: Share Links
          - button "View Application" [ref=e120] [cursor=pointer]:
            - img
            - text: View Application
          - button "Shadow Borrower View" [ref=e121] [cursor=pointer]:
            - img
            - text: Shadow Borrower View
          - button "More Actions" [ref=e122] [cursor=pointer]:
            - img
      - generic [ref=e123]:
        - list [ref=e125]:
          - listitem [ref=e126]:
            - generic [ref=e127]:
              - generic "Tracker Indicator active" [ref=e128]
              - paragraph [ref=e130]: Pre-Qual
          - listitem [ref=e131]:
            - generic [ref=e132]:
              - generic "Tracker Indicator notCompleted" [ref=e133]:
                - img [ref=e134]
              - paragraph [ref=e143]: In Process
          - listitem [ref=e144]:
            - generic [ref=e145]:
              - generic "Tracker Indicator notCompleted" [ref=e146]:
                - img [ref=e147]
              - paragraph [ref=e156]: Closing
          - listitem [ref=e157]:
            - generic [ref=e158]:
              - generic "Tracker Indicator notCompleted" [ref=e159]:
                - img [ref=e160]
              - paragraph [ref=e169]: Funded
        - tablist [ref=e171]:
          - tab "Application Summary" [ref=e172] [cursor=pointer]:
            - img [ref=e173]
            - text: Application Summary
          - tab "Tracker" [active] [selected] [ref=e176] [cursor=pointer]:
            - img [ref=e177]
            - text: Tracker
          - tab "Conditions" [ref=e179] [cursor=pointer]:
            - img [ref=e180]
            - text: Conditions
          - tab "Documents" [ref=e181] [cursor=pointer]:
            - img [ref=e182]
            - text: Documents
        - generic [ref=e186]:
          - list [ref=e187]:
            - listitem [ref=e188]:
              - button "Tracker Indicator notCompleted Pre-Qual" [ref=e189] [cursor=pointer]:
                - generic [ref=e190]:
                  - generic "Tracker Indicator notCompleted" [ref=e191]:
                    - img [ref=e192]
                  - paragraph [ref=e202]: Pre-Qual
            - listitem [ref=e203]
            - listitem [ref=e204]:
              - button "Tracker Indicator active In Process" [ref=e205] [cursor=pointer]:
                - generic [ref=e206]:
                  - generic "Tracker Indicator active" [ref=e207]
                  - paragraph [ref=e210]: In Process
            - listitem [ref=e211]
            - listitem [ref=e212]:
              - button "Tracker Indicator notCompleted Closing" [ref=e213] [cursor=pointer]:
                - generic [ref=e214]:
                  - generic "Tracker Indicator notCompleted" [ref=e215]:
                    - img [ref=e216]
                  - paragraph [ref=e226]: Closing
            - listitem [ref=e227]
            - listitem [ref=e228]:
              - button "Tracker Indicator notCompleted Funded" [ref=e229] [cursor=pointer]:
                - generic [ref=e230]:
                  - generic "Tracker Indicator notCompleted" [ref=e231]:
                    - img [ref=e232]
                  - paragraph [ref=e242]: Funded
          - generic [ref=e243]:
            - generic [ref=e244]:
              - paragraph [ref=e245]: "Stage 2: In Process"
              - generic [ref=e246]: Current
            - paragraph [ref=e247]: 1/11 steps completed
          - region "Accordion" [ref=e248]:
            - generic [ref=e249]:
              - button "ID Verification Pending Andy America (B1) Amy America (B2)" [ref=e252] [cursor=pointer]:
                - img [ref=e254]
                - generic [ref=e263]:
                  - generic [ref=e264]: ID Verification
                  - generic [ref=e266]:
                    - generic [ref=e267]: Pending
                    - generic [ref=e268]:
                      - generic [ref=e269]:
                        - img [ref=e270]
                        - generic [ref=e272]: Andy America (B1)
                      - generic [ref=e273]:
                        - img [ref=e274]
                        - generic [ref=e276]: Amy America (B2)
                - img [ref=e277]
              - button "Credit Pending" [ref=e281] [cursor=pointer]:
                - img [ref=e283]
                - generic [ref=e292]:
                  - generic [ref=e293]: Credit
                  - generic [ref=e294]: Pending
                - img [ref=e295]
              - button "Property Validation Pending" [ref=e299] [cursor=pointer]:
                - img [ref=e301]
                - generic [ref=e310]:
                  - generic [ref=e311]: Property Validation
                  - generic [ref=e312]: Pending
              - button "Valuation Pending" [ref=e315] [cursor=pointer]:
                - img [ref=e317]
                - generic [ref=e326]:
                  - generic [ref=e327]: Valuation
                  - generic [ref=e328]: Pending
              - button "Loan Officer Certifications" [ref=e331] [cursor=pointer]:
                - img [ref=e333]
                - generic [ref=e336]: Loan Officer Certifications
              - button "Broker Disclosures Pending" [ref=e339] [cursor=pointer]:
                - img [ref=e341]
                - generic [ref=e350]:
                  - generic [ref=e351]: Broker Disclosures
                  - generic [ref=e352]: Pending
              - button "Lender Disclosures 0/3 sub-steps completed" [ref=e355] [cursor=pointer]:
                - img [ref=e357]
                - generic [ref=e359]:
                  - generic [ref=e360]: Lender Disclosures
                  - generic [ref=e361]: 0/3 sub-steps completed
                - img [ref=e362]
              - button "HOI Pending" [ref=e366] [cursor=pointer]:
                - img [ref=e368]
                - generic [ref=e377]:
                  - generic [ref=e378]: HOI
                  - generic [ref=e379]: Pending
              - button "Income Verification & DTI Pending" [ref=e382] [cursor=pointer]:
                - img [ref=e384]
                - generic [ref=e393]:
                  - generic [ref=e394]: Income Verification & DTI
                  - generic [ref=e395]: Pending
              - button "Title Pending" [ref=e398] [cursor=pointer]:
                - img [ref=e400]
                - generic [ref=e409]:
                  - generic [ref=e410]: Title
                  - generic [ref=e411]: Pending
              - button "Final Offer Accepted Pending" [ref=e414] [cursor=pointer]:
                - img [ref=e416]
                - generic [ref=e425]:
                  - generic [ref=e426]: Final Offer Accepted
                  - generic [ref=e427]: Pending
  - alert [ref=e428]: Applications Portal - Loan Card
  - generic:
    - generic:
      - generic [ref=e430]:
        - iframe [ref=e431]:
          - button "Close message from company" [ref=f14e4] [cursor=pointer]:
            - img [ref=f14e5]
        - iframe [ref=e432]:
          - button "Hi. Need any help?" [ref=f15e5] [cursor=pointer]
      - iframe [ref=e433]:
        - button "Open messaging window" [ref=f16e5] [cursor=pointer]:
          - img [ref=f16e7]
          - img [ref=f16e10]
```

# Test source

```ts
  478 |     }
  479 | 
  480 |     /**
  481 |      * Verifies the two sections of the Financials sub-nav:
  482 |      *   • Credit Information — borrower credit table (EQUIFAX / MID SCORE columns)
  483 |      *   • Debt to Income    — Monthly Income, Current Debt, Final DTI Ratio, Employment Income
  484 |      * Actual dollar amounts and percentages are dynamic — labels only are asserted.
  485 |      */
  486 |     async verifyFinancialsContent() {
  487 |         await test.step('Verify Financials section content', async () => {
  488 |             // Credit Information — always present
  489 |             await expect(this.financialsCreditInfoHeading).toBeVisible({ timeout: 10000 });
  490 |             await expect(this.financialsEquifaxLabel).toBeVisible();
  491 |             await expect(this.financialsMidScoreLabel).toBeVisible();
  492 | 
  493 |             // Debt to Income — core labels always present
  494 |             await expect(this.financialsDtiSection).toBeVisible();
  495 |             await expect(this.financialsMonthlyIncomeLabel).toBeVisible();
  496 |             await expect(this.financialsCurrentDebtLabel).toBeVisible();
  497 |             await expect(this.financialsFinalDtiLabel).toBeVisible();
  498 | 
  499 |             // Employment Income — income source label varies by borrower type
  500 |             // (e.g. W-2 shows "Employment Income"; other types show different labels)
  501 |             const hasEmploymentIncome = await this.financialsEmploymentIncome
  502 |                 .isVisible().catch(() => false);
  503 |             if (hasEmploymentIncome) await expect(this.financialsEmploymentIncome).toBeVisible();
  504 |         });
  505 |     }
  506 | 
  507 |     // -- Tracker tab ----------------------------------------------------------
  508 | 
  509 |     async clickTrackerTab() {
  510 |         await test.step('Click Tracker tab', async () => {
  511 |             await this.trackerTab.click();
  512 |             // waitForLoadState('domcontentloaded') is a no-op for SPA tab clicks.
  513 |             // Wait for the top stepper's first stage label to appear instead.
  514 |             await this.trackerPreQual
  515 |                 .waitFor({ state: 'visible', timeout: 10000 });
  516 |         });
  517 |     }
  518 | 
  519 |     /**
  520 |      * Verifies the Tracker tab structure:
  521 |      *   1. Top stepper — all four lifecycle stage labels visible
  522 |      *   2. Current stage panel — "Stage N: <name>", "Current" badge,
  523 |      *      "N/M steps completed" counter
  524 |      *   3. Step rows — Identity Verification, Credit Check, Valuation,
  525 |      *      Initial Offer; each row is only asserted when present (steps
  526 |      *      may not exist for all loan types / stages)
  527 |      */
  528 |     async verifyTrackerContent() {
  529 |         await test.step('Verify Tracker tab content', async () => {
  530 |             // Top stepper — always present
  531 |             await expect(this.trackerPreQual).toBeVisible({ timeout: 10000 });
  532 |             await expect(this.trackerInProcess).toBeVisible();
  533 |             await expect(this.trackerClosing).toBeVisible();
  534 |             await expect(this.trackerFunded).toBeVisible();
  535 | 
  536 |             // Current stage detail panel
  537 |             await expect(this.trackerCurrentStageLabel).toBeVisible();
  538 | 
  539 |             // "Current" badge — soft-assert because the badge text varies by
  540 |             // loan state/UI version.  Some loans show the badge as "Active" or
  541 |             // omit it entirely.  Log a warning rather than failing the whole test.
  542 |             const hasCurrentBadge = await this.trackerCurrentBadge
  543 |                 .isVisible({ timeout: 5000 }).catch(() => false);
  544 |             if (!hasCurrentBadge) {
  545 |                 console.warn('trackerCurrentBadge: "Current" text not visible — badge may use different text for this loan stage');
  546 |             }
  547 | 
  548 |             await expect(this.trackerStepsCompleted).toBeVisible();
  549 | 
  550 |             // Step rows — conditional: presence depends on loan stage and type
  551 |             const hasIdentityVer = await this.trackerIdentityVerStep
  552 |                 .isVisible().catch(() => false);
  553 |             if (hasIdentityVer) await expect(this.trackerIdentityVerStep).toBeVisible();
  554 | 
  555 |             const hasCreditCheck = await this.trackerCreditCheckStep
  556 |                 .isVisible().catch(() => false);
  557 |             if (hasCreditCheck) await expect(this.trackerCreditCheckStep).toBeVisible();
  558 | 
  559 |             const hasValuation = await this.trackerValuationStep
  560 |                 .isVisible().catch(() => false);
  561 |             if (hasValuation) await expect(this.trackerValuationStep).toBeVisible();
  562 | 
  563 |             const hasInitialOffer = await this.trackerInitialOfferStep
  564 |                 .isVisible().catch(() => false);
  565 |             if (hasInitialOffer) await expect(this.trackerInitialOfferStep).toBeVisible();
  566 |         });
  567 |     }
  568 | 
  569 |     /**
  570 |      * Clicks the Identity Verification row to expand it, then verifies the
  571 |      * borrower detail card (Borrower 1 label, name, Started Application badge).
  572 |      * Pass { firstName, lastName } from shared test data.
  573 |      */
  574 |     async verifyIdentityVerificationExpanded({ firstName, lastName }) {
  575 |         await test.step('Verify Identity Verification expanded detail', async () => {
  576 |             // Click the row header to expand if not already open
  577 |             const alreadyOpen = await this.trackerBorrower1Label.isVisible().catch(() => false);
> 578 |             if (!alreadyOpen) await this.trackerIdentityVerStep.click();
      |                                                                 ^ Error: locator.click: Test timeout of 180000ms exceeded.
  579 | 
  580 |             await expect(this.trackerBorrower1Label).toBeVisible({ timeout: 10000 });
  581 | 
  582 |             // Name may be split across child elements or belong to a different loan —
  583 |             // check first and last name independently with if/else guards
  584 |             const firstNameLocator = this.page.getByText(firstName, { exact: false }).first();
  585 |             const lastNameLocator  = this.page.getByText(lastName,  { exact: false }).first();
  586 | 
  587 |             const firstFound = await firstNameLocator.isVisible().catch(() => false);
  588 |             const lastFound  = await lastNameLocator.isVisible().catch(() => false);
  589 | 
  590 |             if (firstFound) await expect(firstNameLocator).toBeVisible();
  591 |             if (lastFound)  await expect(lastNameLocator).toBeVisible();
  592 | 
  593 |             // "Started Application" badge — only shown when the borrower has begun
  594 |             const hasStarted = await this.trackerStartedApplicationBadge
  595 |                 .isVisible().catch(() => false);
  596 |             if (hasStarted) await expect(this.trackerStartedApplicationBadge).toBeVisible();
  597 |         });
  598 |     }
  599 | 
  600 |     /**
  601 |      * Clicks the Credit Check row to expand it, then verifies all six detail
  602 |      * label fields are rendered (values may be "—" when pull hasn't run yet).
  603 |      */
  604 |     async verifyCreditCheckExpanded() {
  605 |         await test.step('Verify Credit Check expanded detail', async () => {
  606 |             // Click the row header to expand if not already open
  607 |             const alreadyOpen = await this.trackerSoftPullScoreLabel.isVisible().catch(() => false);
  608 |             if (!alreadyOpen) await this.trackerCreditCheckStep.click();
  609 | 
  610 |             await expect(this.trackerSoftPullScoreLabel).toBeVisible({ timeout: 10000 });
  611 |             await expect(this.trackerSoftPullDateLabel).toBeVisible();
  612 |             await expect(this.trackerHardPullScoreLabel).toBeVisible();
  613 |             await expect(this.trackerHardPullDateLabel).toBeVisible();
  614 |             await expect(this.trackerLoanBalanceLabel).toBeVisible();
  615 |             await expect(this.trackerMonthlyDebtLabel).toBeVisible();
  616 |         });
  617 |     }
  618 | 
  619 |     /**
  620 |      * Verifies the Valuation and Initial Offer step rows are present on the Tracker.
  621 |      * Both steps are always rendered, but their status text is loan-dependent:
  622 |      *   • "Pending"  — step has not started yet
  623 |      *   • completion text (e.g. "Valuation accepted") — step is done
  624 |      * We assert the step headers unconditionally and the "Pending" badge only
  625 |      * when at least one incomplete step is visible on this particular loan.
  626 |      */
  627 |     async verifyPendingSteps() {
  628 |         await test.step('Verify Valuation and Initial Offer steps are present', async () => {
  629 |             await expect(this.trackerValuationStep).toBeVisible({ timeout: 10000 });
  630 |             await expect(this.trackerInitialOfferStep).toBeVisible();
  631 | 
  632 |             // "Pending" appears only when the step has not been started — guard so
  633 |             // a fully-progressed loan does not cause a false failure
  634 |             const hasPending = await this.trackerPendingStatus
  635 |                 .isVisible({ timeout: 3000 })
  636 |                 .catch(() => false);
  637 |             if (hasPending) {
  638 |                 await expect(this.trackerPendingStatus).toBeVisible();
  639 |             }
  640 |         });
  641 |     }
  642 | 
  643 |     // -- Conditions tab -------------------------------------------------------
  644 | 
  645 |     async clickConditionsTab() {
  646 |         await test.step('Click Conditions tab', async () => {
  647 |             await this.conditionsTab.click();
  648 |             // waitForLoadState('domcontentloaded') is a no-op for SPA tab clicks.
  649 |             // Wait for the Borrower Tasks sub-tab to appear instead.
  650 |             await this.conditionsBorrowerTasksTab
  651 |                 .waitFor({ state: 'visible', timeout: 10000 });
  652 |         });
  653 |     }
  654 | 
  655 |     /**
  656 |      * Verifies the Conditions tab chrome: both sub-tab buttons, the Progress
  657 |      * label, and the progress counter are visible regardless of task count.
  658 |      * The task area content (empty state vs populated list) is checked
  659 |      * separately so failures are precise.
  660 |      */
  661 |     async verifyConditionsChrome() {
  662 |         await test.step('Verify Conditions tab chrome', async () => {
  663 |             await expect(this.conditionsBorrowerTasksTab).toBeVisible({ timeout: 10000 });
  664 |             await expect(this.conditionsLenderTasksTab).toBeVisible();
  665 |             await expect(this.conditionsProgressLabel).toBeVisible();
  666 |             await expect(this.conditionsProgressCounter).toBeVisible();
  667 |         });
  668 |     }
  669 | 
  670 |     /**
  671 |      * Verifies the task area content after a sub-tab is selected.
  672 |      *   • Empty state  — "No tasks assigned yet" is shown
  673 |      *   • Populated    — at least one task row/item is visible
  674 |      *   • Fallback     — if neither is found the sub-tab heading itself is
  675 |      *                    re-asserted, confirming the tab rendered without error
  676 |      */
  677 |     async verifyConditionsTaskArea() {
  678 |         await test.step('Verify Conditions task area (empty or populated)', async () => {
```