# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/Manage Users/manage-users.spec.js >> Manage Users >> Add User modal — Role dropdown lists all expected roles
- Location: tests/Broker Flow/Manage Users/manage-users.spec.js:162:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('listbox').getByRole('option', { name: 'Company Admin', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('listbox').getByRole('option', { name: 'Company Admin', exact: true })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e8]:
      - list [ref=e10]:
        - listitem [ref=e11]:
          - button:
            - generic:
              - generic:
                - img
          - button [ref=e12] [cursor=pointer]:
            - img
            - generic [ref=e13]: Toggle Sidebar
        - listitem [ref=e14]:
          - generic [ref=e15]: Homebridge Financial Services
      - generic [ref=e16]:
        - list [ref=e19]:
          - listitem [ref=e20]:
            - button:
              - img
              - text: You're in Dev
        - list [ref=e23]:
          - listitem [ref=e24]:
            - button [ref=e26] [cursor=pointer]:
              - img [ref=e27]
              - text: My Loans
              - img [ref=e30]
              - generic [ref=e32]: Chevron down
          - listitem [ref=e33]:
            - button [expanded] [ref=e35] [cursor=pointer]:
              - img [ref=e36]
              - text: Manage Users
          - listitem [ref=e41]:
            - button [ref=e43] [cursor=pointer]:
              - img [ref=e44]
              - text: Companies
          - listitem [ref=e48]:
            - button [ref=e50] [cursor=pointer]:
              - img [ref=e51]
              - text: Company Branches
          - listitem [ref=e56]:
            - button [ref=e58] [cursor=pointer]:
              - img [ref=e59]
              - text: Quick Pricer
          - listitem [ref=e61]:
            - button [ref=e63] [cursor=pointer]:
              - img [ref=e64]
              - text: Release Notes
        - generic [ref=e69]:
          - generic [ref=e70]: Admin
          - listitem [ref=e71]:
            - button [ref=e73] [cursor=pointer]:
              - img [ref=e74]
              - text: Manage Emails
          - listitem [ref=e77]:
            - button [ref=e79] [cursor=pointer]:
              - img [ref=e80]
              - text: AUS Rules
          - listitem [ref=e83]:
            - button [ref=e85] [cursor=pointer]:
              - img [ref=e86]
              - text: Loan Configuration
        - listitem [ref=e88]:
          - button [ref=e90] [cursor=pointer]:
            - img [ref=e91]
            - text: Show Old Design
      - list [ref=e94]:
        - listitem [ref=e95]:
          - button [ref=e96] [cursor=pointer]:
            - generic [ref=e98]: AS
            - generic [ref=e99]:
              - paragraph [ref=e100]: Ace Simon Gebilaguin
              - paragraph [ref=e101]: ace@usehitch.com
            - img [ref=e102]
    - main [ref=e106]:
      - heading [level=2] [ref=e107]: Portal Users
      - generic [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e111]:
            - img [ref=e113]
            - textbox [ref=e115]:
              - /placeholder: Search by name or email
            - img [ref=e117] [cursor=pointer]
          - button [ref=e119] [cursor=pointer]: Search
        - button [ref=e120] [cursor=pointer]: Add New User
      - generic [ref=e121]:
        - generic [ref=e123]:
          - paragraph [ref=e124]: Users per page
          - generic [ref=e125]:
            - combobox [ref=e126] [cursor=pointer]: "10"
            - textbox: "10"
            - img
          - paragraph [ref=e127]: 1–10 of 10405
          - generic [ref=e128]:
            - button [disabled]:
              - img
            - button [ref=e129] [cursor=pointer]:
              - img [ref=e130]
        - table [ref=e132]:
          - rowgroup [ref=e133]:
            - row [ref=e134]:
              - columnheader [ref=e135]: Name
              - columnheader [ref=e136]: Location
              - columnheader [ref=e137]: Role(s)
              - columnheader [ref=e138]: Email
              - columnheader [ref=e139]: Phone
              - columnheader [ref=e140]: NMLS
              - columnheader [ref=e141]: LOS Username
              - columnheader [ref=e142]: Active?
              - columnheader [ref=e143]:
                - button [ref=e144] [cursor=pointer]:
                  - text: Last Login
                  - img [ref=e145]
              - columnheader [ref=e147]:
                - paragraph [ref=e148]: Actions
          - rowgroup [ref=e149]:
            - row [ref=e150]:
              - cell [ref=e151]: Test User 1782238406279
              - cell [ref=e152]: Abcbroker Test
              - cell [ref=e153]: Loan Officer
              - cell [ref=e154]: test.jpp5w.1782238406279@mailinator.com
              - cell [ref=e155]: "4852275620"
              - cell [ref=e156]: "#17590815"
              - cell [ref=e157]: testuser1782238406279
              - cell [ref=e158]: "Yes"
              - cell [ref=e159]: Never
              - cell [ref=e160]:
                - button [ref=e161] [cursor=pointer]:
                  - img [ref=e162]
                - button [ref=e164] [cursor=pointer]:
                  - img [ref=e165]
                - button [ref=e167] [cursor=pointer]:
                  - img [ref=e168]
                - button [ref=e170] [cursor=pointer]:
                  - img [ref=e171]
            - row [ref=e173]:
              - cell [ref=e174]: Test User 1782238391628
              - cell [ref=e175]: Abcbroker Test
              - cell [ref=e176]: Loan Officer
              - cell [ref=e177]: test.lftku.1782238391628@mailinator.com
              - cell [ref=e178]: "7547786668"
              - cell [ref=e179]: "#87944234"
              - cell [ref=e180]: testuser1782238391628
              - cell [ref=e181]: "Yes"
              - cell [ref=e182]: Never
              - cell [ref=e183]:
                - button [ref=e184] [cursor=pointer]:
                  - img [ref=e185]
                - button [ref=e187] [cursor=pointer]:
                  - img [ref=e188]
                - button [ref=e190] [cursor=pointer]:
                  - img [ref=e191]
                - button [ref=e193] [cursor=pointer]:
                  - img [ref=e194]
            - row [ref=e196]:
              - cell [ref=e197]: Test User 1782238378308
              - cell [ref=e198]: Abcbroker Test
              - cell [ref=e199]: Loan Officer
              - cell [ref=e200]: test.olobt.1782238378308@mailinator.com
              - cell [ref=e201]: "6164729769"
              - cell [ref=e202]: "#56851619"
              - cell [ref=e203]: testuser1782238378308
              - cell [ref=e204]: "Yes"
              - cell [ref=e205]: Never
              - cell [ref=e206]:
                - button [ref=e207] [cursor=pointer]:
                  - img [ref=e208]
                - button [ref=e210] [cursor=pointer]:
                  - img [ref=e211]
                - button [ref=e213] [cursor=pointer]:
                  - img [ref=e214]
                - button [ref=e216] [cursor=pointer]:
                  - img [ref=e217]
            - row [ref=e219]:
              - cell [ref=e220]: Test User 1782238306084
              - cell [ref=e221]: Abcbroker Test
              - cell [ref=e222]: Loan Officer
              - cell [ref=e223]: test.5hg4d.1782238306084@mailinator.com
              - cell [ref=e224]: "2190038943"
              - cell [ref=e225]: "#46312159"
              - cell [ref=e226]: testuser1782238306084
              - cell [ref=e227]: "No"
              - cell [ref=e228]: Never
              - cell [ref=e229]:
                - button [ref=e230] [cursor=pointer]:
                  - img [ref=e231]
                - button [ref=e233] [cursor=pointer]:
                  - img [ref=e234]
                - button [ref=e236] [cursor=pointer]:
                  - img [ref=e237]
                - button [ref=e239] [cursor=pointer]:
                  - img [ref=e240]
            - row [ref=e242]:
              - cell [ref=e243]: Test User 1782238273548 (edited)
              - cell [ref=e244]: Abcbroker Test
              - cell [ref=e245]: Loan Officer
              - cell [ref=e246]: test.q3jep.1782238273548@mailinator.com
              - cell [ref=e247]: "9305949062"
              - cell [ref=e248]: "#57885065"
              - cell [ref=e249]: testuser1782238273548
              - cell [ref=e250]: "Yes"
              - cell [ref=e251]: Never
              - cell [ref=e252]:
                - button [ref=e253] [cursor=pointer]:
                  - img [ref=e254]
                - button [ref=e256] [cursor=pointer]:
                  - img [ref=e257]
                - button [ref=e259] [cursor=pointer]:
                  - img [ref=e260]
                - button [ref=e262] [cursor=pointer]:
                  - img [ref=e263]
            - row [ref=e265]:
              - cell [ref=e266]: Test User 1782238221027
              - cell [ref=e267]: Abcbroker Test
              - cell [ref=e268]: Loan Officer
              - cell [ref=e269]: test.p23wg.1782238221027@mailinator.com
              - cell [ref=e270]: "3002988179"
              - cell [ref=e271]: "#80091478"
              - cell [ref=e272]: testuser1782238221027
              - cell [ref=e273]: "Yes"
              - cell [ref=e274]: Never
              - cell [ref=e275]:
                - button [ref=e276] [cursor=pointer]:
                  - img [ref=e277]
                - button [ref=e279] [cursor=pointer]:
                  - img [ref=e280]
                - button [ref=e282] [cursor=pointer]:
                  - img [ref=e283]
                - button [ref=e285] [cursor=pointer]:
                  - img [ref=e286]
            - row [ref=e288]:
              - cell [ref=e289]: Manager CFDWD
              - cell [ref=e290]: Pcl1782238047178, WCB HLQSM
              - cell [ref=e291]: TPO Admin
              - cell [ref=e292]: mgr.94wq7@testbranch.com
              - cell [ref=e293]: "5378295379"
              - cell [ref=e294]: "-"
              - cell [ref=e295]: "-"
              - cell [ref=e296]: "Yes"
              - cell [ref=e297]: Never
              - cell [ref=e298]:
                - button [ref=e299] [cursor=pointer]:
                  - img [ref=e300]
                - button [ref=e302] [cursor=pointer]:
                  - img [ref=e303]
                - button [ref=e305] [cursor=pointer]:
                  - img [ref=e306]
                - button [ref=e308] [cursor=pointer]:
                  - img [ref=e309]
            - row [ref=e311]:
              - cell [ref=e312]: Test User 1782234515855
              - cell [ref=e313]: Abcbroker Test
              - cell [ref=e314]: Loan Officer
              - cell [ref=e315]: test.v7ke2.1782234515855@mailinator.com
              - cell [ref=e316]: "2167511737"
              - cell [ref=e317]: "#16033486"
              - cell [ref=e318]: testuser1782234515855
              - cell [ref=e319]: "Yes"
              - cell [ref=e320]: Never
              - cell [ref=e321]:
                - button [ref=e322] [cursor=pointer]:
                  - img [ref=e323]
                - button [ref=e325] [cursor=pointer]:
                  - img [ref=e326]
                - button [ref=e328] [cursor=pointer]:
                  - img [ref=e329]
                - button [ref=e331] [cursor=pointer]:
                  - img [ref=e332]
            - row [ref=e334]:
              - cell [ref=e335]: Test User 1782234151866 (edited)
              - cell [ref=e336]: Abcbroker Test
              - cell [ref=e337]: Loan Officer
              - cell [ref=e338]: test.du1ai.1782234151866@mailinator.com
              - cell [ref=e339]: "2846792923"
              - cell [ref=e340]: "#79265237"
              - cell [ref=e341]: testuser1782234151866
              - cell [ref=e342]: "Yes"
              - cell [ref=e343]: Never
              - cell [ref=e344]:
                - button [ref=e345] [cursor=pointer]:
                  - img [ref=e346]
                - button [ref=e348] [cursor=pointer]:
                  - img [ref=e349]
                - button [ref=e351] [cursor=pointer]:
                  - img [ref=e352]
                - button [ref=e354] [cursor=pointer]:
                  - img [ref=e355]
            - row [ref=e357]:
              - cell [ref=e358]: Test User 1782234077306
              - cell [ref=e359]: Abcbroker Test
              - cell [ref=e360]: Loan Officer
              - cell [ref=e361]: test.2zidq.1782234077306@mailinator.com
              - cell [ref=e362]: "2867613336"
              - cell [ref=e363]: "#58970598"
              - cell [ref=e364]: testuser1782234077306
              - cell [ref=e365]: "Yes"
              - cell [ref=e366]: Never
              - cell [ref=e367]:
                - button [ref=e368] [cursor=pointer]:
                  - img [ref=e369]
                - button [ref=e371] [cursor=pointer]:
                  - img [ref=e372]
                - button [ref=e374] [cursor=pointer]:
                  - img [ref=e375]
                - button [ref=e377] [cursor=pointer]:
                  - img [ref=e378]
          - rowgroup [ref=e380]:
            - row [ref=e381]:
              - cell [ref=e382]:
                - generic [ref=e384]:
                  - paragraph [ref=e385]: Users per page
                  - generic [ref=e386]:
                    - combobox [ref=e387] [cursor=pointer]: "10"
                    - textbox: "10"
                    - img
                  - paragraph [ref=e388]: 1–10 of 10405
                  - generic [ref=e389]:
                    - button [disabled]:
                      - img
                    - button [ref=e390] [cursor=pointer]:
                      - img [ref=e391]
  - alert [ref=e393]: Applications Portal - Portal Users
  - generic [ref=e395]:
    - iframe [ref=e396]:
      - button "Close message from company" [ref=f13e4] [cursor=pointer]:
        - img [ref=f13e5]
    - iframe [ref=e397]:
      - button "Hi. Need any help?" [ref=f14e5] [cursor=pointer]
  - iframe [ref=e398]:
    - button "Open messaging window" [ref=f15e5] [cursor=pointer]:
      - img [ref=f15e7]
      - img [ref=f15e10]
  - dialog [ref=e402]:
    - heading [level=2] [ref=e403]: Add User
    - main [ref=e406]:
      - generic [ref=e407]:
        - generic [ref=e409]:
          - generic [ref=e410]: Role
          - generic [ref=e411]:
            - combobox [expanded] [ref=e412] [cursor=pointer]
            - textbox
            - img
            - group:
              - generic: Role
        - generic [ref=e414]:
          - generic: Company
          - generic [ref=e415]:
            - combobox [ref=e416] [cursor=pointer]
            - textbox
            - img
            - group:
              - generic: Company
        - generic [ref=e417]:
          - generic [ref=e418]:
            - generic:
              - text: Name
              - generic: "*"
            - generic [ref=e419]:
              - textbox [ref=e420]
              - group:
                - generic: Name *
          - generic [ref=e421]:
            - generic [ref=e422]: Phone Number
            - generic [ref=e423]:
              - paragraph [ref=e425]: "+1"
              - textbox [ref=e426]
              - group:
                - generic: Phone Number
          - generic [ref=e427]:
            - generic:
              - text: Email Address
              - generic: "*"
            - generic [ref=e428]:
              - textbox [ref=e429]
              - group:
                - generic: Email Address *
          - generic [ref=e430]:
            - generic [ref=e431]:
              - generic [ref=e432]:
                - text: Initial Password (they can change it later)
                - generic [ref=e433]: "*"
              - generic [ref=e434]:
                - textbox [ref=e435]: "&3^XXpq5Y5Tj7YYU"
                - group:
                  - generic: Initial Password (they can change it later) *
            - generic [ref=e437] [cursor=pointer]:
              - generic [ref=e438]:
                - checkbox [ref=e439]
                - img [ref=e440]
              - paragraph [ref=e442]: Prompt user to reset password on first login
          - generic [ref=e443]:
            - img [ref=e445]
            - generic [ref=e447] [cursor=pointer]:
              - img [ref=e449]
              - text: Upload profile image
              - button [ref=e451]
          - generic [ref=e452]:
            - button [ref=e453] [cursor=pointer]: Cancel
            - button [ref=e454] [cursor=pointer]:
              - generic [ref=e455]: Create User
  - listbox [ref=e458]:
    - option "External" [ref=e459]
    - option "TPO Admin" [active] [ref=e460] [cursor=pointer]: TPO Admin
    - option "Loan Officer" [ref=e461] [cursor=pointer]: Loan Officer
    - option "Loan Officer Assistant" [ref=e462] [cursor=pointer]: Loan Officer Assistant
    - option "Internal" [ref=e463]
    - option "Platform Admin" [ref=e464] [cursor=pointer]: Platform Admin
    - option "Account Executive" [ref=e465] [cursor=pointer]: Account Executive
```

# Test source

```ts
  402 |     // -------------------------------------------------------------------------
  403 | 
  404 |     /**
  405 |      * Opens the Add New User modal and confirms its heading is visible.
  406 |      */
  407 |     async openAddNewUserModal() {
  408 |         await test.step('Open Add New User modal', async () => {
  409 |             await this.addNewUserBtn.click();
  410 |             await expect(this.addUserModal).toBeVisible({ timeout: 10000 });
  411 |         });
  412 |     }
  413 | 
  414 |     /**
  415 |      * Closes the Add New User modal via the Cancel button.
  416 |      */
  417 |     async cancelAddNewUser() {
  418 |         await test.step('Cancel Add New User modal', async () => {
  419 |             await this.addUserCancelBtn.click();
  420 |             await expect(this.addUserModal).toBeHidden({ timeout: 10000 });
  421 |         });
  422 |     }
  423 | 
  424 |     /**
  425 |      * Verifies all required fields in the Add User modal are visible:
  426 |      * Role dropdown, Company dropdown, Name, Phone, Email Address,
  427 |      * Initial Password, reset-password checkbox, Upload Image button,
  428 |      * Cancel, and Create User buttons.
  429 |      */
  430 |     async verifyAddUserModalFields() {
  431 |         await test.step('Verify all Add User modal fields are visible', async () => {
  432 |             await expect(this.addUserModalHeading).toBeVisible();
  433 | 
  434 |             // Dropdowns
  435 |             await expect(
  436 |                 this.addUserModal.getByText('Role', { exact: true }).first()
  437 |             ).toBeVisible();
  438 |             await expect(
  439 |                 this.addUserModal.getByText('Company', { exact: true }).first()
  440 |             ).toBeVisible();
  441 | 
  442 |             // Text inputs — located by their label text since the inputs may not
  443 |             // have accessible name attributes in all MUI versions
  444 |             await expect(
  445 |                 this.addUserModal.getByRole('textbox').first()
  446 |             ).toBeVisible(); // at least one input is present
  447 | 
  448 |             await expect(
  449 |                 this.addUserModal.getByText(/Name/i).first()
  450 |             ).toBeVisible();
  451 |             await expect(
  452 |                 this.addUserModal.getByText(/Email Address/i).first()
  453 |             ).toBeVisible();
  454 |             await expect(
  455 |                 this.addUserModal.getByText(/Initial Password/i).first()
  456 |             ).toBeVisible();
  457 |             await expect(
  458 |                 this.addUserModal.getByText(/Phone/i).first()
  459 |             ).toBeVisible();
  460 | 
  461 |             // Checkbox
  462 |             await expect(this.addUserResetChk).toBeVisible();
  463 | 
  464 |             // Upload image button
  465 |             await expect(this.addUserUploadImageBtn).toBeVisible();
  466 | 
  467 |             // Action buttons
  468 |             await expect(this.addUserCancelBtn).toBeVisible();
  469 |             await expect(this.addUserCreateBtn).toBeVisible();
  470 |         });
  471 |     }
  472 | 
  473 |     /**
  474 |      * Opens the Role dropdown inside the Add User modal and verifies all
  475 |      * expected role options are listed. Closes the dropdown without selecting.
  476 |      */
  477 |     async verifyRoleDropdownOptions() {
  478 |         await test.step('Verify Role dropdown options in Add User modal', async () => {
  479 |             // The MUI combobox <div role="combobox"> intercepts pointer events so
  480 |             // clicking the <label> never reaches the trigger.  Click the combobox
  481 |             // element directly — the same approach used in fillAndSubmitAddUserForm.
  482 |             const roleCombo = this.addUserModal.getByRole('combobox').first();
  483 |             await roleCombo.click();
  484 | 
  485 |             const listbox = this.page.getByRole('listbox');
  486 |             await expect(listbox).toBeVisible({ timeout: 5000 });
  487 | 
  488 |             const expectedRoles = [
  489 |                 'Company Admin',
  490 |                 'Branch Manager',
  491 |                 'Loan Officer',
  492 |                 'Processor',
  493 |                 'Lender Admin',
  494 |                 'Account Executive',
  495 |                 'Retail Admin',
  496 |                 'Wholesale Admin',
  497 |                 'Underwriter',
  498 |             ];
  499 |             for (const role of expectedRoles) {
  500 |                 await expect(
  501 |                     listbox.getByRole('option', { name: role, exact: true })
> 502 |                 ).toBeVisible();
      |                   ^ Error: expect(locator).toBeVisible() failed
  503 |             }
  504 | 
  505 |             await this.page.keyboard.press('Escape');
  506 |         });
  507 |     }
  508 | 
  509 |     /**
  510 |      * Opens the Company dropdown inside the Add User modal and verifies
  511 |      * the list is populated (at least one company option visible).
  512 |      * Closes without selecting.
  513 |      */
  514 |     async verifyCompanyDropdownPopulated() {
  515 |         await test.step('Verify Company dropdown is populated in Add User modal', async () => {
  516 |             // Same fix: click the combobox element directly, not the label.
  517 |             const companyCombo = this.addUserModal.getByRole('combobox').nth(1);
  518 |             await companyCombo.click();
  519 | 
  520 |             const listbox = this.page.getByRole('listbox');
  521 |             await expect(listbox).toBeVisible({ timeout: 5000 });
  522 | 
  523 |             // At least the first item should be visible
  524 |             await expect(
  525 |                 listbox.locator('[role="option"]').first()
  526 |             ).toBeVisible();
  527 | 
  528 |             await this.page.keyboard.press('Escape');
  529 |         });
  530 |     }
  531 | 
  532 |     // -------------------------------------------------------------------------
  533 |     // Create user flow
  534 |     // -------------------------------------------------------------------------
  535 | 
  536 |     /**
  537 |      * Selects an option from a MUI Select dropdown inside the Add User modal.
  538 |      * Clicks the dropdown trigger, then picks the option from the listbox.
  539 |      * @param {import('@playwright/test').Locator} dropdownTrigger
  540 |      * @param {string} optionText
  541 |      */
  542 |     async selectModalDropdown(dropdownTrigger, optionText) {
  543 |         await dropdownTrigger.click();
  544 |         const listbox = this.page.getByRole('listbox');
  545 |         await expect(listbox).toBeVisible({ timeout: 5000 });
  546 |         await listbox.getByRole('option', { name: optionText, exact: true }).click();
  547 |         await expect(listbox).toBeHidden({ timeout: 5000 });
  548 |     }
  549 | 
  550 |     /**
  551 |      * Fills every visible field in the Add User modal with the supplied data,
  552 |      * then clicks CREATE USER and waits for the modal to close.
  553 |      *
  554 |      * Conditional fields (Tag, NMLS, LOS Username) are only filled when the
  555 |      * role that reveals them has been selected (e.g. Loan Officer).
  556 |      *
  557 |      * @param {object} userData
  558 |      * @param {string} userData.role        — role option text, e.g. 'Loan Officer'
  559 |      * @param {string} userData.company     — company option text, e.g. 'ABC Broker - Test'
  560 |      * @param {string} userData.name        — display name
  561 |      * @param {string} [userData.tag]       — loan officer URL tag (slug)
  562 |      * @param {string} [userData.nmls]      — NMLS license number digits only
  563 |      * @param {string} [userData.losUsername] — LOS username
  564 |      * @param {string} [userData.phone]     — 10-digit phone string
  565 |      * @param {string} userData.email       — email address
  566 |      */
  567 |     async fillAndSubmitAddUserForm(userData) {
  568 |         await test.step('Fill Add User form and submit', async () => {
  569 |             // Role
  570 |             await test.step(`Select role: ${userData.role}`, async () => {
  571 |                 const roleCombo = this.addUserModal.getByRole('combobox').first();
  572 |                 await this.selectModalDropdown(roleCombo, userData.role);
  573 |             });
  574 | 
  575 |             // Company
  576 |             await test.step(`Select company: ${userData.company}`, async () => {
  577 |                 const companyCombo = this.addUserModal.getByRole('combobox').nth(1);
  578 |                 await this.selectModalDropdown(companyCombo, userData.company);
  579 |             });
  580 | 
  581 |             // Name
  582 |             await this.addUserNameInput.fill(userData.name);
  583 | 
  584 |             // Loan Officer-specific fields (appear after Loan Officer role selected)
  585 |             if (userData.tag) {
  586 |                 const tagVisible = await this.addUserTagInput.isVisible({ timeout: 3000 }).catch(() => false);
  587 |                 if (tagVisible) await this.addUserTagInput.fill(userData.tag);
  588 |             }
  589 |             if (userData.nmls) {
  590 |                 const nmlsVisible = await this.addUserNmlsInput.isVisible({ timeout: 3000 }).catch(() => false);
  591 |                 if (nmlsVisible) await this.addUserNmlsInput.fill(userData.nmls);
  592 |             }
  593 |             if (userData.losUsername) {
  594 |                 const losVisible = await this.addUserLosUsernameInput.isVisible({ timeout: 3000 }).catch(() => false);
  595 |                 if (losVisible) await this.addUserLosUsernameInput.fill(userData.losUsername);
  596 |             }
  597 | 
  598 |             // Phone — clear pre-filled "+1" then type digits
  599 |             if (userData.phone) {
  600 |                 await this.addUserPhoneInput.fill(userData.phone);
  601 |             }
  602 | 
```