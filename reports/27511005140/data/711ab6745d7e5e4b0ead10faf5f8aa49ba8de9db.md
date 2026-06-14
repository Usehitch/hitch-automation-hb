# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/companies.spec.js >> Companies (CRU) >> Create a new company with generated data and verify it appears in the table
- Location: tests/Broker Flow/companies.spec.js:113:9

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  getByRole('dialog')
Expected: hidden
Received: visible
Timeout:  20000ms

Call log:
  - Expect "toBeHidden" with timeout 20000ms
  - waiting for getByRole('dialog')
    24 × locator resolved to <div role="dialog" aria-labelledby=":r2u:" class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiDialog-paperFullWidth css-mbdu2s">…</div>
       - unexpected value "visible"

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
            - button [ref=e35] [cursor=pointer]:
              - img [ref=e36]
              - text: Manage Users
          - listitem [ref=e41]:
            - button [expanded] [ref=e43] [cursor=pointer]:
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
      - heading [level=2] [ref=e107]: Companies
      - generic [ref=e109]:
        - generic [ref=e111]:
          - img [ref=e113]
          - textbox [ref=e115]:
            - /placeholder: Search by name, NMLS or TPO ID
          - img [ref=e117] [cursor=pointer]
        - button [ref=e119] [cursor=pointer]: Search
      - table [ref=e120]:
        - rowgroup [ref=e121]:
          - row [ref=e122]:
            - columnheader [ref=e123]: Name
            - columnheader [ref=e124]: Phone
            - columnheader [ref=e125]: NMLS
            - columnheader [ref=e126]: TPO ID
            - columnheader [ref=e127]: Key Contact
            - columnheader [ref=e128]:
              - paragraph [ref=e129]: Actions
        - rowgroup [ref=e130]:
          - row [ref=e131]:
            - cell [ref=e132]: Pacific Coast Financial TR7ZJ
            - cell [ref=e133]: "9484782557"
            - cell [ref=e134]: "8685096"
            - cell [ref=e135]: "60323"
            - cell [ref=e136]:
              - generic [ref=e138]: "-"
            - cell [ref=e139]:
              - button [ref=e140] [cursor=pointer]:
                - img [ref=e141]
          - row [ref=e143]:
            - cell [ref=e144]: Pacific Coast Financial N6VI2
            - cell [ref=e145]: "7679109511"
            - cell [ref=e146]: "3953757"
            - cell [ref=e147]: "80253"
            - cell [ref=e148]:
              - generic [ref=e150]: "-"
            - cell [ref=e151]:
              - button [ref=e152] [cursor=pointer]:
                - img [ref=e153]
          - row [ref=e155]:
            - cell [ref=e156]: Pacific Coast Financial WBSHI
            - cell [ref=e157]: "5621393624"
            - cell [ref=e158]: "8630749"
            - cell [ref=e159]: "88496"
            - cell [ref=e160]:
              - generic [ref=e162]: "-"
            - cell [ref=e163]:
              - button [ref=e164] [cursor=pointer]:
                - img [ref=e165]
          - row [ref=e167]:
            - cell [ref=e168]: Pacific Coast Financial TWW6W
            - cell [ref=e169]: "5394480384"
            - cell [ref=e170]: "9359825"
            - cell [ref=e171]: "28645"
            - cell [ref=e172]:
              - generic [ref=e174]: "-"
            - cell [ref=e175]:
              - button [ref=e176] [cursor=pointer]:
                - img [ref=e177]
          - row [ref=e179]:
            - cell [ref=e180]: Pacific Coast Lending 97WHE
            - cell [ref=e181]: "4970464891"
            - cell [ref=e182]: "1565556"
            - cell [ref=e183]: "65764"
            - cell [ref=e184]:
              - generic [ref=e186]: "-"
            - cell [ref=e187]:
              - button [ref=e188] [cursor=pointer]:
                - img [ref=e189]
          - row [ref=e191]:
            - cell [ref=e192]: Pacific Coast Financial WMCOU
            - cell [ref=e193]: "5921501727"
            - cell [ref=e194]: "7747028"
            - cell [ref=e195]: "64929"
            - cell [ref=e196]:
              - generic [ref=e198]: "-"
            - cell [ref=e199]:
              - button [ref=e200] [cursor=pointer]:
                - img [ref=e201]
          - row [ref=e203]:
            - cell [ref=e204]: Pacific Coast Financial SKK31
            - cell [ref=e205]: "7602936830"
            - cell [ref=e206]: "2200298"
            - cell [ref=e207]: "65360"
            - cell [ref=e208]:
              - generic [ref=e210]: "-"
            - cell [ref=e211]:
              - button [ref=e212] [cursor=pointer]:
                - img [ref=e213]
          - row [ref=e215]:
            - cell [ref=e216]: Pacific Coast Financial 1O6OV
            - cell [ref=e217]: "3070782217"
            - cell [ref=e218]: "6400349"
            - cell [ref=e219]: "57865"
            - cell [ref=e220]:
              - generic [ref=e222]: "-"
            - cell [ref=e223]:
              - button [ref=e224] [cursor=pointer]:
                - img [ref=e225]
          - row [ref=e227]:
            - cell [ref=e228]: Pacific Coast Financial G2XVC
            - cell [ref=e229]: "4144223954"
            - cell [ref=e230]: "8230612"
            - cell [ref=e231]: "30525"
            - cell [ref=e232]:
              - generic [ref=e234]: "-"
            - cell [ref=e235]:
              - button [ref=e236] [cursor=pointer]:
                - img [ref=e237]
          - row [ref=e239]:
            - cell [ref=e240]: Pacific Coast Financial EIEFU
            - cell [ref=e241]: "7163844897"
            - cell [ref=e242]: "2043452"
            - cell [ref=e243]: "46685"
            - cell [ref=e244]:
              - generic [ref=e246]: "-"
            - cell [ref=e247]:
              - button [ref=e248] [cursor=pointer]:
                - img [ref=e249]
      - generic [ref=e252]:
        - paragraph [ref=e253]: Officers per page
        - generic [ref=e254]:
          - combobox [ref=e255] [cursor=pointer]: "10"
          - textbox: "10"
          - img
        - paragraph [ref=e256]: 1–10 of 1200
        - generic [ref=e257]:
          - button [disabled]:
            - img
          - button [ref=e258] [cursor=pointer]:
            - img [ref=e259]
      - button [ref=e261] [cursor=pointer]: Add new Company
  - alert [ref=e262]: Applications Portal - Manage Companies
  - generic [ref=e264]:
    - iframe [ref=e265]:
      - button "Close message from company" [ref=f10e4] [cursor=pointer]:
        - img [ref=f10e5]
    - iframe [ref=e266]:
      - button "Hi. Need any help?" [ref=f11e5] [cursor=pointer]
  - iframe [ref=e267]:
    - button "Open messaging window" [ref=f12e5] [cursor=pointer]:
      - img [ref=f12e7]
      - img [ref=f12e10]
  - dialog "Add new Company" [ref=e270]:
    - heading "Add new Company" [level=2] [ref=e271]
    - main [ref=e274]:
      - generic [ref=e275]:
        - img [ref=e277]
        - heading "Company Details" [level=5] [ref=e279]
        - generic [ref=e280]:
          - generic [ref=e281]:
            - generic [ref=e282]:
              - generic [ref=e283]:
                - text: Display Name
                - generic [ref=e284]: "*"
              - generic [ref=e285]:
                - textbox "Display Name" [ref=e286]: Pacific Coast Lending OESAM
                - group:
                  - generic: Display Name *
            - generic [ref=e287]:
              - generic [ref=e288]:
                - text: Company tag
                - generic [ref=e289]: "*"
              - generic [ref=e290]:
                - textbox "Company tag" [ref=e291]: pcl-1781468957886
                - group:
                  - generic: Company tag *
            - generic [ref=e292]:
              - generic [ref=e293]:
                - text: Full Company Name
                - generic [ref=e294]: "*"
              - generic [ref=e295]:
                - textbox "Full Company Name" [ref=e296]: Pacific Coast Lending Group LLC
                - group:
                  - generic: Full Company Name *
            - paragraph [ref=e297]: "Company Logo (optional):"
            - generic [ref=e298]:
              - img "preview" [ref=e300]
              - generic [ref=e302] [cursor=pointer]:
                - img [ref=e304]
                - text: Logo
                - button "Logo" [ref=e306]
            - generic [ref=e307]:
              - generic [ref=e308]: Phone
              - generic [ref=e309]:
                - paragraph [ref=e311]: "+1"
                - textbox "Phone" [ref=e312]: (280) 111-8818
                - group:
                  - generic: Phone
            - generic [ref=e313]:
              - generic [ref=e314]:
                - text: Email
                - generic [ref=e315]: "*"
              - generic [ref=e316]:
                - textbox "Email" [ref=e317]: test.nsqj5.1781468957886@mailinator.com
                - group:
                  - generic: Email *
            - generic [ref=e318]:
              - paragraph [ref=e319]: "Primary Color:"
              - generic [ref=e320]:
                - button "color-0047BB" [ref=e321] [cursor=pointer]
                - textbox [ref=e326]: "#0047bb"
            - heading "Address Information" [level=6] [ref=e327]
            - generic [ref=e328]:
              - generic [ref=e329]:
                - text: Street Name
                - generic [ref=e330]: "*"
              - generic [ref=e331]:
                - textbox "Street Name" [ref=e332]: 2450 Colorado Ave
                - group:
                  - generic: Street Name *
            - generic [ref=e333]:
              - generic [ref=e334]:
                - text: State
                - generic [ref=e335]: "*"
              - generic [ref=e336]:
                - textbox "State" [ref=e337]: California
                - group:
                  - generic: State *
            - generic [ref=e338]:
              - generic [ref=e339]:
                - text: Postal Code
                - generic [ref=e340]: "*"
              - generic [ref=e341]:
                - textbox "Postal Code" [ref=e342]: "90404"
                - group:
                  - generic: Postal Code *
            - generic [ref=e343]:
              - generic [ref=e344]:
                - text: City
                - generic [ref=e345]: "*"
              - generic [ref=e346]:
                - textbox "City" [ref=e347]: Santa Monica
                - group:
                  - generic: City *
            - heading "License Information" [level=6] [ref=e348]
            - generic [ref=e349]:
              - generic [ref=e350]:
                - text: NMLS
                - generic [ref=e351]: "*"
              - generic [ref=e352]:
                - textbox "NMLS" [ref=e353]: "3502487"
                - group:
                  - generic: NMLS *
            - generic [ref=e354]:
              - generic [ref=e355]:
                - text: TPO ID
                - generic [ref=e356]: "*"
              - generic [ref=e357]:
                - textbox "TPO ID" [ref=e358]: "14616"
                - group:
                  - generic: TPO ID *
            - generic [ref=e359]:
              - generic [ref=e360]: Privacy Policy URL
              - generic [ref=e361]:
                - textbox "Privacy Policy URL" [ref=e362]: https://pacificcoastlending.com/privacy
                - group:
                  - generic: Privacy Policy URL
            - generic [ref=e363]:
              - generic [ref=e364]: Terms URL
              - generic [ref=e365]:
                - textbox "Terms URL" [ref=e366]: https://pacificcoastlending.com/terms
                - group:
                  - generic: Terms URL
          - generic [ref=e368]:
            - heading "Admin information" [level=6] [ref=e369]
            - separator [ref=e370]
            - generic [ref=e372]:
              - generic: Select from existing admins
              - generic [ref=e373]:
                - combobox "Select from existing admins" [ref=e374]
                - button "Open" [ref=e376] [cursor=pointer]:
                  - img [ref=e377]
                - group:
                  - generic: Select from existing admins
            - paragraph [ref=e379]: Either create a new broker admin or select an existing one
            - generic [ref=e380]:
              - generic [ref=e381] [cursor=pointer]:
                - checkbox [ref=e382]
                - img [ref=e383]
              - paragraph [ref=e385]: Create a new Admin Account
          - generic [ref=e386]:
            - generic [ref=e387] [cursor=pointer]:
              - checkbox [ref=e388]
              - img [ref=e389]
            - paragraph [ref=e391]: Add a relationship manager to this Company
          - generic [ref=e393]:
            - generic [ref=e394] [cursor=pointer]:
              - checkbox [ref=e395]
              - img [ref=e396]
            - paragraph [ref=e398]: Is the Key Contact different from the Company Admin?
          - generic [ref=e399]:
            - button "Cancel" [ref=e400] [cursor=pointer]: Cancel
            - button "Create" [ref=e401] [cursor=pointer]:
              - generic [ref=e402]: Create
```

# Test source

```ts
  388 |             await expect(
  389 |                 this.companyModal.getByText(/Admin [Ii]nformation/i).first()
  390 |             ).toBeVisible();
  391 |             await expect(this.addCompanyAdminDropdown).toBeVisible();
  392 |             await expect(this.addCompanyNewAdminChk).toBeVisible();
  393 |             await expect(this.addCompanyRelMgrChk).toBeVisible();
  394 |             await expect(this.addCompanyKeyContactChk).toBeVisible();
  395 | 
  396 |             // ── Action buttons ───────────────────────────────────────────────
  397 |             await expect(this.companyModalCancelBtn).toBeVisible();
  398 |             await expect(this.companyModalCreateBtn).toBeVisible();
  399 |         });
  400 |     }
  401 | 
  402 |     /**
  403 |      * Fills every field in the Add New Company form and clicks CREATE.
  404 |      * Waits for the modal to close, confirming the company was saved.
  405 |      *
  406 |      * State handling: the field is tested as a plain text input first.  If an
  407 |      * autocomplete listbox appears after typing, the first matching option is
  408 |      * clicked; otherwise the typed value is accepted as-is.
  409 |      *
  410 |      * Admin dropdown: the first available admin option is selected.  If the
  411 |      * listbox is empty the dropdown is dismissed and the form submitted without
  412 |      * an admin selection (portal may accept this for test companies).
  413 |      *
  414 |      * @param {object} data
  415 |      * @param {string} data.displayName  — required, shown in the table Name column
  416 |      * @param {string} data.tag          — required, URL-safe company slug
  417 |      * @param {string} data.fullName     — required, full legal name
  418 |      * @param {string} [data.phone]      — 10-digit phone string
  419 |      * @param {string} data.email        — required, company email
  420 |      * @param {string} data.street       — required, street address
  421 |      * @param {string} data.state        — required, state name or abbreviation
  422 |      * @param {string} data.postalCode   — required, ZIP / postal code
  423 |      * @param {string} data.city         — required, city
  424 |      * @param {string} data.nmls         — required, NMLS number digits
  425 |      * @param {string} data.tpoId        — required, TPO ID digits
  426 |      * @param {string} [data.privacyUrl] — optional Privacy Policy URL
  427 |      * @param {string} [data.termsUrl]   — optional Terms URL
  428 |      */
  429 |     async fillAndSubmitAddCompanyForm(data) {
  430 |         await test.step('Fill Add New Company form and submit', async () => {
  431 |             // ── Company Details ──────────────────────────────────────────────
  432 |             await this.addCompanyDisplayName.fill(data.displayName);
  433 |             await this.addCompanyTag.fill(data.tag);
  434 |             await this.addCompanyFullName.fill(data.fullName);
  435 | 
  436 |             if (data.phone) {
  437 |                 // The Phone field pre-fills "+1"; clear it before typing
  438 |                 await this.addCompanyPhone.clear();
  439 |                 await this.addCompanyPhone.fill(data.phone);
  440 |             }
  441 | 
  442 |             await this.addCompanyEmail.fill(data.email);
  443 | 
  444 |             // ── Address Information ──────────────────────────────────────────
  445 |             await this.addCompanyStreet.fill(data.street);
  446 | 
  447 |             // State may be a plain input or a MUI Autocomplete — try fill first;
  448 |             // if a listbox appears, pick the first option that contains the typed text.
  449 |             await this.addCompanyState.fill(data.state);
  450 |             const stateListbox = this.page.getByRole('listbox');
  451 |             const stateListboxVisible = await stateListbox
  452 |                 .isVisible({ timeout: 1500 })
  453 |                 .catch(() => false);
  454 |             if (stateListboxVisible) {
  455 |                 const firstOption = stateListbox.locator('[role="option"]').first();
  456 |                 const hasOption = await firstOption.isVisible({ timeout: 1000 }).catch(() => false);
  457 |                 if (hasOption) await firstOption.click();
  458 |                 else await this.page.keyboard.press('Escape');
  459 |             }
  460 | 
  461 |             await this.addCompanyPostalCode.fill(data.postalCode);
  462 |             await this.addCompanyCity.fill(data.city);
  463 | 
  464 |             // ── License Information ──────────────────────────────────────────
  465 |             await this.addCompanyNmls.fill(data.nmls);
  466 |             await this.addCompanyTpoId.fill(data.tpoId);
  467 | 
  468 |             if (data.privacyUrl) await this.addCompanyPrivacyUrl.fill(data.privacyUrl);
  469 |             if (data.termsUrl)   await this.addCompanyTermsUrl.fill(data.termsUrl);
  470 | 
  471 |             // ── Admin Information ────────────────────────────────────────────
  472 |             // Select the first existing admin; dismiss the dropdown if empty.
  473 |             await this.addCompanyAdminDropdown.click();
  474 |             const adminListbox = this.page.getByRole('listbox');
  475 |             const adminListboxVisible = await adminListbox
  476 |                 .isVisible({ timeout: 3000 })
  477 |                 .catch(() => false);
  478 |             if (adminListboxVisible) {
  479 |                 const firstAdmin = adminListbox.locator('[role="option"]').first();
  480 |                 const hasAdmin = await firstAdmin.isVisible({ timeout: 2000 }).catch(() => false);
  481 |                 if (hasAdmin) await firstAdmin.click();
  482 |                 else await this.page.keyboard.press('Escape');
  483 |             }
  484 | 
  485 |             // ── Submit ───────────────────────────────────────────────────────
  486 |             await this.companyModalCreateBtn.click();
  487 |             // Modal hiding + downstream verifyCompanyInTable search covers the wait
> 488 |             await expect(this.companyModal).toBeHidden({ timeout: 20000 });
      |                                             ^ Error: expect(locator).toBeHidden() failed
  489 |         });
  490 |     }
  491 | 
  492 |     /**
  493 |      * Searches by display name and verifies the company row is visible in the
  494 |      * table. Call this after `fillAndSubmitAddCompanyForm()`.
  495 |      *
  496 |      * @param {string} displayName  The Display Name used when creating the company
  497 |      */
  498 |     async verifyCompanyInTable(displayName) {
  499 |         await test.step(`Verify company "${displayName}" is visible in the table`, async () => {
  500 |             await this.search(displayName);
  501 |             const matchingRow = this.page
  502 |                 .locator('tr, [role="row"]')
  503 |                 .filter({ hasText: displayName })
  504 |                 .first();
  505 |             await expect(matchingRow).toBeVisible({ timeout: 10000 });
  506 |         });
  507 |     }
  508 | 
  509 |     /**
  510 |      * Cancels the modal and confirms it is hidden.
  511 |      */
  512 |     async cancelCompanyModal() {
  513 |         await test.step('Cancel Add New Company modal', async () => {
  514 |             await this.companyModalCancelBtn.click();
  515 |             await expect(this.companyModal).toBeHidden({ timeout: 10000 });
  516 |         });
  517 |     }
  518 | 
  519 |     // -------------------------------------------------------------------------
  520 |     // Edit Company modal
  521 |     // -------------------------------------------------------------------------
  522 | 
  523 |     /**
  524 |      * Clicks the pencil (edit) icon in the first data row to open the Edit
  525 |      * Company modal.
  526 |      */
  527 |     async openEditCompanyModal() {
  528 |         await test.step('Open Edit Company modal for the first row', async () => {
  529 |             // The page snapshot confirms each Actions cell contains exactly one
  530 |             // button with accessible name "edit".  Targeting by role + name is
  531 |             // more reliable than row-index arithmetic with tr/[role="row"] selectors.
  532 |             const firstEditBtn = this.page
  533 |                 .getByRole('button', { name: /^edit$/i })
  534 |                 .first();
  535 |             await firstEditBtn.click();
  536 |             // editCompanyModal visibility is the ready signal — no networkidle needed
  537 |             await expect(this.editCompanyModal).toBeVisible({ timeout: 10000 });
  538 |         });
  539 |     }
  540 | 
  541 |     /**
  542 |      * Finds the table row whose Name column matches `companyName`, then clicks
  543 |      * its pencil icon to open the Edit Company modal.
  544 |      *
  545 |      * @param {string} companyName  Display name of the company row to edit
  546 |      */
  547 |     async openEditCompanyModalForRow(companyName) {
  548 |         await test.step(`Open Edit Company modal for "${companyName}"`, async () => {
  549 |             const targetRow = this.page
  550 |                 .locator('tr, [role="row"]')
  551 |                 .filter({ hasText: companyName })
  552 |                 .first();
  553 |             await expect(targetRow).toBeVisible({ timeout: 10000 });
  554 | 
  555 |             // Use accessible name "edit" — matches the button label from the snapshot.
  556 |             const editBtn = targetRow.getByRole('button', { name: /^edit$/i });
  557 |             await editBtn.click();
  558 |             await expect(this.editCompanyModal).toBeVisible({ timeout: 10000 });
  559 |         });
  560 |     }
  561 | 
  562 |     /**
  563 |      * Updates editable fields inside the Edit Company modal.
  564 |      * Only keys supplied in `updatedData` are changed; omitted keys are skipped.
  565 |      *
  566 |      * @param {object} updatedData
  567 |      * @param {string} [updatedData.displayName]  — new company display name
  568 |      * @param {string} [updatedData.fullName]     — new full company name
  569 |      * @param {string} [updatedData.phone]        — new 10-digit phone string
  570 |      * @param {string} [updatedData.email]        — new email address
  571 |      * @param {string} [updatedData.street]       — new street address
  572 |      * @param {string} [updatedData.state]        — new state
  573 |      * @param {string} [updatedData.postalCode]   — new postal code
  574 |      * @param {string} [updatedData.city]         — new city
  575 |      * @param {string} [updatedData.nmls]         — new NMLS number
  576 |      * @param {string} [updatedData.tpoId]        — new TPO ID
  577 |      */
  578 |     async fillEditCompanyForm(updatedData) {
  579 |         await test.step('Fill Edit Company form with updated data', async () => {
  580 |             const replaceField = async (locator, value) => {
  581 |                 await locator.waitFor({ state: 'visible', timeout: 10000 });
  582 |                 await locator.click({ clickCount: 3 }); // select-all
  583 |                 await locator.fill(value);
  584 |             };
  585 | 
  586 |             if (updatedData.displayName !== undefined)
  587 |                 await replaceField(this.editCompanyNameInput, updatedData.displayName);
  588 |             if (updatedData.fullName !== undefined)
```