/**
 * Manage Emails — Email Templates page coverage tests.
 *
 * Verifies the Email Templates admin page (/portal/manage-emails):
 *   • Page structure   — heading, search toolbar, Trigger filter
 *   • Table columns    — Name, Trigger, Delay, Status, Created By,
 *                        Created At, Updated At, Actions
 *   • Template list    — core active templates always present
 *   • Status badges    — both "active" and "draft" states visible
 *   • Search           — narrows results by name/subject fragment
 *   • Edit action      — opens the template editor for a given row
 *   • Trigger filter   — dropdown filters the list by trigger type
 *   • Add New Template — form structure, Event dropdown options,
 *                        fill all fields, save as draft, verify in
 *                        list, then delete (cleanup)
 *
 * Navigation: portal → Admin → Manage Emails (sidebar link).
 * All tests share the same beforeEach that lands on the page.
 */

import { expect, test } from '../../fixtures';

// ---------------------------------------------------------------------------
// Test data for the "Add New Template" flow.
// Template name must be unique enough to search reliably; no PII used.
// ---------------------------------------------------------------------------
const NEW_TEMPLATE = {
    event:        'Welcome Applicant',
    templateName: 'Automation Test Template',
    subject:      'Automation Test Subject',
    delay:        '4',
    status:       'Active',
    toEmail:      'test@mailinator.com',
    ccEmail:      'test1@mailinator.com',
    bccEmail:     'test2@mailinator.com',
    body:         'This is an automated test email template.',
};

// Fields changed during the update step — only the delta, not the full form.
const UPDATED_TEMPLATE = {
    subject: 'Updated Automation Test Subject',
    body:    'This template body has been updated by automation.',
};

// Template used specifically for the "Save as Draft" test.
// No status field — leaves the form default ("Inactive") so the draft badge
// is driven entirely by the SAVE AS DRAFT button, not the Status dropdown.
const DRAFT_TEMPLATE = {
    event:        'Conditions',
    templateName: 'Automation Draft Template',
    subject:      'Automation Draft Subject',
    toEmail:      'draft-test@mailinator.com',
    body:         'Draft template created by automation.',
};

test.describe('Manage Emails - Email Templates (CRUD)', () => {
    test.beforeEach(async ({ page, manageEmailsPage }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await manageEmailsPage.navigateTo();
    });

    // -------------------------------------------------------------------------

    test('Email Templates table shows all column headers', async ({
        manageEmailsPage,
    }) => {
        await manageEmailsPage.verifyTableColumns();
    });

    // -------------------------------------------------------------------------

    test('Active and draft status badges are both visible', async ({
        manageEmailsPage,
    }) => {
        await manageEmailsPage.verifyStatusBadges();
    });

    // -------------------------------------------------------------------------

    test('Search narrows results by template name', async ({
        manageEmailsPage,
    }) => {
        // Search for a known active template name fragment
        await manageEmailsPage.search('Applicant Portal');

        // The matching row must still be visible after narrowing
        await expect(
            manageEmailsPage.applicantPortalInviteRow
        ).toBeVisible({ timeout: 10000 });

        // The unrelated row should no longer be visible
        await expect(
            manageEmailsPage.newApplicantCreatedRow
        ).not.toBeVisible({ timeout: 5000 });

        // Reset — full list is restored
        await manageEmailsPage.clearSearch();
        await manageEmailsPage.verifyActiveTemplates();
    });

    // -------------------------------------------------------------------------

    test('Edit action opens the template editor for Applicant Portal Invite', async ({
        manageEmailsPage,
    }) => {
        await manageEmailsPage.clickEditForTemplate(/Applicant Portal Invite/i);
        await manageEmailsPage.verifyEditFormOpened();
    });

    // -------------------------------------------------------------------------

    test('Trigger dropdown filter narrows the template list', async ({
        manageEmailsPage,
    }) => {
        // Filter by "Borrower Invitation" — only templates with that trigger appear
        await manageEmailsPage.filterByTrigger('Borrower Invitation');

        // Applicant Portal Invite uses the "Borrower Invitation" trigger
        await expect(
            manageEmailsPage.applicantPortalInviteRow
        ).toBeVisible({ timeout: 10000 });

        // Templates with a different trigger should not be visible
        await expect(
            manageEmailsPage.newApplicantCreatedRow
        ).not.toBeVisible({ timeout: 5000 });
    });

    // -------------------------------------------------------------------------

    test('ADD NEW TEMPLATE button is visible and pagination shows template count', async ({
        manageEmailsPage,
    }) => {
        await expect(manageEmailsPage.addNewTemplateBtn).toBeVisible();
        await expect(manageEmailsPage.paginationInfo).toBeVisible();
    });

    // -------------------------------------------------------------------------

    test('New Email Template form shows all fields and Event dropdown options', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        await manageEmailsPage.clickAddNewTemplate();

        // Verify all form sections render correctly
        await newEmailTemplatePage.verifyFormStructure();

        // Verify the Event dropdown lists the expected options
        await newEmailTemplatePage.verifyEventDropdownOptions();
    });

    // -------------------------------------------------------------------------

    test('Preview Email modal opens, shows correct elements, and closes', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        // Open the New Template form — no need to fill fields;
        // the preview renders the email shell even with an empty body
        await manageEmailsPage.clickAddNewTemplate();
        await newEmailTemplatePage.waitForForm();

        // Open preview and verify all modal elements
        await newEmailTemplatePage.openPreview();
        await newEmailTemplatePage.verifyPreviewModal();

        // Close preview — confirm the modal dismisses and form is still active
        await newEmailTemplatePage.closePreview();
    });

    // -------------------------------------------------------------------------

    test('Preview modal — SAVE EMAIL TEMPLATE saves and returns to the list', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        // Create a minimal filled template so Save succeeds (required fields)
        await manageEmailsPage.clickAddNewTemplate();
        await newEmailTemplatePage.waitForForm();
        await newEmailTemplatePage.fillNewTemplate(NEW_TEMPLATE);

        // Open Preview and save from within the modal
        await newEmailTemplatePage.openPreview();
        await newEmailTemplatePage.verifyPreviewModal();
        await newEmailTemplatePage.saveFromPreview();

        // Confirm the portal navigated back and the template appears in the list
        await manageEmailsPage.search(NEW_TEMPLATE.templateName);
        const createdRow = manageEmailsPage.page.getByRole('row', {
            name: new RegExp(NEW_TEMPLATE.templateName, 'i'),
        });
        await expect(createdRow).toBeVisible({ timeout: 10000 });

        // Cleanup
        await manageEmailsPage.deleteTemplate(NEW_TEMPLATE.templateName);
    });

    // -------------------------------------------------------------------------

    test('Send Test Email shows "Email sent successfully" toast', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        // Open the edit form for "Applicant Portal Invite" — it is always active
        // and already has To/CC/BCC recipients configured, so the send will
        // succeed without any additional setup or cleanup.
        await manageEmailsPage.clickEditForTemplate(/Applicant Portal Invite/i);
        await newEmailTemplatePage.waitForForm();

        // Click SEND TEST EMAIL and verify the success toast
        await newEmailTemplatePage.sendTestEmail();
    });

    // -------------------------------------------------------------------------

    test('Save as draft — template appears in list with draft status badge', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        // -- Step 1: Open the New Template form ------------------------------
        await manageEmailsPage.clickAddNewTemplate();
        await newEmailTemplatePage.waitForForm();

        // -- Step 2: Fill required fields (no Status change — stays Inactive) -
        await newEmailTemplatePage.fillNewTemplate(DRAFT_TEMPLATE);

        // -- Step 3: Click SAVE AS DRAFT ------------------------------------
        await newEmailTemplatePage.saveAsDraft();

        // -- Step 4: Search for the template in the list --------------------
        await manageEmailsPage.search(DRAFT_TEMPLATE.templateName);
        const draftRow = manageEmailsPage.page.getByRole('row', {
            name: new RegExp(DRAFT_TEMPLATE.templateName, 'i'),
        });
        await expect(draftRow).toBeVisible({ timeout: 10000 });

        // -- Step 5: Verify the status column shows "draft" -----------------
        // The draft badge is a styled text cell inside the row — assert it
        // is present specifically within this row (not just anywhere on the page).
        await expect(
            draftRow.getByText('draft', { exact: true })
        ).toBeVisible({ timeout: 5000 });

        // -- Step 6: Verify the event/trigger column matches ----------------
        await expect(
            draftRow.getByText(DRAFT_TEMPLATE.event, { exact: false })
        ).toBeVisible();

        // -- Step 7: Cleanup — delete the draft template --------------------
        await manageEmailsPage.deleteTemplate(DRAFT_TEMPLATE.templateName);
        await expect(draftRow).toBeHidden({ timeout: 10000 });
    });

    // -------------------------------------------------------------------------

    test('Create a new email template, verify it in the list, then delete it', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        // -- Step 1: Open the create form ------------------------------------
        await manageEmailsPage.clickAddNewTemplate();
        await newEmailTemplatePage.waitForForm();

        // -- Step 2: Fill all fields -----------------------------------------
        await newEmailTemplatePage.fillNewTemplate(NEW_TEMPLATE);

        // -- Step 3: Save as draft and return to the list --------------------
        await newEmailTemplatePage.saveAsDraft();

        // -- Step 4: Verify the new template appears in the list -------------
        await manageEmailsPage.search(NEW_TEMPLATE.templateName);
        const createdRow = manageEmailsPage.page.getByRole('row', {
            name: new RegExp(NEW_TEMPLATE.templateName, 'i'),
        });
        await expect(createdRow).toBeVisible({ timeout: 10000 });

        // Confirm the event/trigger column matches what we selected
        await expect(
            createdRow.getByText(NEW_TEMPLATE.event, { exact: false })
        ).toBeVisible();

        // -- Step 5: Cleanup — delete the test template ----------------------
        await manageEmailsPage.deleteTemplate(NEW_TEMPLATE.templateName);
        await expect(createdRow).toBeHidden({ timeout: 10000 });
    });

    // -------------------------------------------------------------------------

    test('Create a template, update it, verify the changes, then delete it', async ({
        manageEmailsPage,
        newEmailTemplatePage,
    }) => {
        // -- Step 1: Create the template -------------------------------------
        await manageEmailsPage.clickAddNewTemplate();
        await newEmailTemplatePage.waitForForm();
        await newEmailTemplatePage.fillNewTemplate(NEW_TEMPLATE);
        await newEmailTemplatePage.saveAsDraft();

        // -- Step 2: Search for the created template and open edit ----------
        await manageEmailsPage.search(NEW_TEMPLATE.templateName);
        const templateRow = manageEmailsPage.page.getByRole('row', {
            name: new RegExp(NEW_TEMPLATE.templateName, 'i'),
        });
        await expect(templateRow).toBeVisible({ timeout: 10000 });
        await manageEmailsPage.clickEditForTemplate(new RegExp(NEW_TEMPLATE.templateName, 'i'));
        await newEmailTemplatePage.waitForForm();

        // -- Step 3: Update the subject and body ----------------------------
        await newEmailTemplatePage.updateTemplateFields(UPDATED_TEMPLATE);

        // -- Step 4: Save and return to the list ----------------------------
        await newEmailTemplatePage.saveAsDraft();

        // -- Step 5: Verify the updated subject is reflected ---------------
        // Search for the template by its (unchanged) name
        await manageEmailsPage.search(NEW_TEMPLATE.templateName);
        await expect(templateRow).toBeVisible({ timeout: 10000 });

        // Open edit again and confirm the subject field holds the new value
        await manageEmailsPage.clickEditForTemplate(new RegExp(NEW_TEMPLATE.templateName, 'i'));
        await newEmailTemplatePage.waitForForm();
        await expect(newEmailTemplatePage.subjectInput).toHaveValue(UPDATED_TEMPLATE.subject);

        // -- Step 6: Cleanup — go back and delete --------------------------
        await newEmailTemplatePage.goBackLink.click();
        await manageEmailsPage.pageHeading.waitFor({ state: 'visible', timeout: 10000 });
        await manageEmailsPage.deleteTemplate(NEW_TEMPLATE.templateName);
    });
});
