# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/loandetail.spec.js >> Loan Detail — Tracker tab >> Credit Check expanded detail shows all six pull data fields
- Location: tests/Broker Flow/loandetail.spec.js:166:9

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: locator.click: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByText('Credit Check').first()

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
            - paragraph [ref=e112]: 4556 ELIOT ST, DENVER, CO 80211
            - generic [ref=e114]:
              - generic [ref=e115]: "Loan ID:"
              - generic [ref=e116]: "300000000006648"
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
              - generic "Tracker Indicator completed" [ref=e128]:
                - img [ref=e129]
              - paragraph [ref=e131]: Pre-Qual
          - listitem [ref=e132]:
            - generic [ref=e133]:
              - generic "Tracker Indicator active" [ref=e134]
              - paragraph [ref=e136]: In Process
          - listitem [ref=e137]:
            - generic [ref=e138]:
              - generic "Tracker Indicator notCompleted" [ref=e139]:
                - img [ref=e140]
              - paragraph [ref=e149]: Closing
          - listitem [ref=e150]:
            - generic [ref=e151]:
              - generic "Tracker Indicator notCompleted" [ref=e152]:
                - img [ref=e153]
              - paragraph [ref=e162]: Funded
        - tablist [ref=e164]:
          - tab "Application Summary" [ref=e165] [cursor=pointer]:
            - img [ref=e166]
            - text: Application Summary
          - tab "Tracker" [active] [selected] [ref=e169] [cursor=pointer]:
            - img [ref=e170]
            - text: Tracker
          - tab "Conditions" [ref=e172] [cursor=pointer]:
            - img [ref=e173]
            - text: Conditions
          - tab "Documents" [ref=e174] [cursor=pointer]:
            - img [ref=e175]
            - text: Documents
        - generic [ref=e179]:
          - list [ref=e180]:
            - listitem [ref=e181]:
              - button "Tracker Indicator completed Pre-Qual" [ref=e182] [cursor=pointer]:
                - generic [ref=e183]:
                  - generic "Tracker Indicator completed" [ref=e184]:
                    - img [ref=e185]
                  - paragraph [ref=e188]: Pre-Qual
            - listitem [ref=e189]
            - listitem [ref=e190]:
              - button "Tracker Indicator active In Process" [ref=e191] [cursor=pointer]:
                - generic [ref=e192]:
                  - generic "Tracker Indicator active" [ref=e193]
                  - paragraph [ref=e196]: In Process
            - listitem [ref=e197]
            - listitem [ref=e198]:
              - button "Tracker Indicator notCompleted Closing" [ref=e199] [cursor=pointer]:
                - generic [ref=e200]:
                  - generic "Tracker Indicator notCompleted" [ref=e201]:
                    - img [ref=e202]
                  - paragraph [ref=e212]: Closing
            - listitem [ref=e213]
            - listitem [ref=e214]:
              - button "Tracker Indicator notCompleted Funded" [ref=e215] [cursor=pointer]:
                - generic [ref=e216]:
                  - generic "Tracker Indicator notCompleted" [ref=e217]:
                    - img [ref=e218]
                  - paragraph [ref=e228]: Funded
          - generic [ref=e229]:
            - generic [ref=e230]:
              - paragraph [ref=e231]: "Stage 2: In Process"
              - generic [ref=e232]: Current
            - paragraph [ref=e233]: 2/11 steps completed
          - region "Accordion" [ref=e234]:
            - generic [ref=e235]:
              - button "ID Verification Andy America (B1) Amy America (B2)" [ref=e238] [cursor=pointer]:
                - img [ref=e240]
                - generic [ref=e242]:
                  - generic [ref=e243]: ID Verification
                  - generic [ref=e246]:
                    - generic [ref=e247]:
                      - img [ref=e248]
                      - generic [ref=e250]: Andy America (B1)
                    - generic [ref=e251]:
                      - img [ref=e252]
                      - generic [ref=e254]: Amy America (B2)
                - img [ref=e255]
              - button "Credit Pending" [ref=e259] [cursor=pointer]:
                - img [ref=e261]
                - generic [ref=e270]:
                  - generic [ref=e271]: Credit
                  - generic [ref=e272]: Pending
                - img [ref=e273]
              - button "Property Validation Pending" [ref=e277] [cursor=pointer]:
                - img [ref=e279]
                - generic [ref=e288]:
                  - generic [ref=e289]: Property Validation
                  - generic [ref=e290]: Pending
              - button "Valuation 1/1 sub-steps completed" [ref=e293] [cursor=pointer]:
                - img [ref=e295]
                - generic [ref=e297]:
                  - generic [ref=e298]: Valuation
                  - generic [ref=e299]: 1/1 sub-steps completed
                - img [ref=e300]
              - button "Loan Officer Certifications Pending" [ref=e304] [cursor=pointer]:
                - img [ref=e306]
                - generic [ref=e315]:
                  - generic [ref=e316]: Loan Officer Certifications
                  - generic [ref=e317]: Pending
              - button "Broker Disclosures Pending" [ref=e320] [cursor=pointer]:
                - img [ref=e322]
                - generic [ref=e331]:
                  - generic [ref=e332]: Broker Disclosures
                  - generic [ref=e333]: Pending
              - button "Lender Disclosures 0/3 sub-steps completed" [ref=e336] [cursor=pointer]:
                - img [ref=e338]
                - generic [ref=e340]:
                  - generic [ref=e341]: Lender Disclosures
                  - generic [ref=e342]: 0/3 sub-steps completed
                - img [ref=e343]
              - button "Income Verification & DTI Pending" [ref=e347] [cursor=pointer]:
                - img [ref=e349]
                - generic [ref=e358]:
                  - generic [ref=e359]: Income Verification & DTI
                  - generic [ref=e360]: Pending
              - button "Title Pending" [ref=e363] [cursor=pointer]:
                - img [ref=e365]
                - generic [ref=e374]:
                  - generic [ref=e375]: Title
                  - generic [ref=e376]: Pending
              - button "Final Offer Accepted Pending" [ref=e379] [cursor=pointer]:
                - img [ref=e381]
                - generic [ref=e390]:
                  - generic [ref=e391]: Final Offer Accepted
                  - generic [ref=e392]: Pending
  - alert [ref=e393]: Applications Portal - Loan Card
  - generic:
    - generic:
      - generic [ref=e395]:
        - iframe [ref=e396]:
          - button "Close message from company" [ref=f9e4] [cursor=pointer]:
            - img [ref=f9e5]
        - iframe [ref=e397]:
          - button "Hi. Need any help?" [ref=f10e5] [cursor=pointer]
      - iframe [ref=e398]:
        - button "Open messaging window" [ref=f11e5] [cursor=pointer]:
          - img [ref=f11e7]
          - img [ref=f11e10]
```

# Test source

```ts
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
  578 |             if (!alreadyOpen) await this.trackerIdentityVerStep.click();
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
> 608 |             if (!alreadyOpen) await this.trackerCreditCheckStep.click();
      |                                                                 ^ Error: locator.click: Test timeout of 180000ms exceeded.
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
  679 |             const isEmpty = await this.conditionsEmptyState
  680 |                 .isVisible({ timeout: 5000 }).catch(() => false);
  681 | 
  682 |             if (isEmpty) {
  683 |                 await expect(this.conditionsEmptyState).toBeVisible();
  684 |                 return;
  685 |             }
  686 | 
  687 |             // Populated: look for any task row — MUI renders these as <li> or <tr>
  688 |             const taskRow = this.page
  689 |                 .locator('li, tr')
  690 |                 .filter({ hasText: /\S+/ })
  691 |                 .first();
  692 |             const hasRows = await taskRow.isVisible({ timeout: 5000 }).catch(() => false);
  693 | 
  694 |             if (hasRows) {
  695 |                 await expect(taskRow).toBeVisible();
  696 |             } else {
  697 |                 // Fallback: sub-tab label visible confirms the panel loaded correctly
  698 |                 await expect(this.conditionsBorrowerTasksTab).toBeVisible({ timeout: 5000 });
  699 |             }
  700 |         });
  701 |     }
  702 | 
  703 |     /**
  704 |      * Clicks the Lender Tasks sub-tab and waits for the view to update.
  705 |      */
  706 |     async clickLenderTasksTab() {
  707 |         await test.step('Click Lender Tasks sub-tab', async () => {
  708 |             await this.conditionsLenderTasksTab.click();
```