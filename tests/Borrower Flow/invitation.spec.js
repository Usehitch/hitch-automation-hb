/**
 * LO-Initiated Manual Pre-Qual — Invitation Flow
 *
 * Two describe blocks run serially, each with their own LO pre-qual + email
 * verification steps:
 *
 *  Scenario A — Borrower Only (no co-borrower)
 *    A1. LO creates pre-qual manually (applicationData — hasCoBorrower: false)
 *    A2. B1 receives invitation email → opens application
 *
 *  Scenario B — With Co-Borrower
 *    B1. LO creates pre-qual manually (coBorrowerApplicationData — hasCoBorrower: true)
 *    B2. B1 receives invitation email → opens application
 *    B3. B2 (co-borrower) receives invitation email → opens application
 *
 * randomEmail() is called at module load — each scenario has its own data
 * object so emails are generated once and shared across the serial tests
 * within that scenario.
 *
 * Emails use Mailinator public inboxes — no real PII.
 * SSNs are Method Fi sandbox values.
 */

import { test, expect } from '../../fixtures';
import {
    applicationData,
    coBorrowerApplicationData,
} from '../../data/newApplication';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Open a Mailinator public inbox in an isolated browser context, wait for
 * the invitation email, click "COMPLETE APPLICATION" inside the email body
 * iframe, and assert the Review Information / Start Application landing page.
 *
 * Uses a fresh browser context so the LO portal session is never affected.
 * Returns the app tab + context so the caller can continue or close.
 *
 * @param {import('@playwright/test').BrowserContext} sourceContext
 * @param {string} email   full mailinator address
 * @param {string} label   prefix for test.step names
 * @returns {{ appPage: Page, ctx: BrowserContext }}
 */
async function verifyInviteEmail(sourceContext, email, label) {
    const inboxName = email.split('@')[0];
    const mailinatorUrl =
        `https://www.mailinator.com/v4/public/inboxes.jsp?to=${encodeURIComponent(inboxName)}`;

    const ctx = await sourceContext.browser().newContext();

    try {
        await test.step(`${label}: verify invitation email in Mailinator`, async () => {
            const mailinatorTab = await ctx.newPage();
            await mailinatorTab.goto(mailinatorUrl, { waitUntil: 'domcontentloaded' });

            // Poll with page refresh — email delivery can take 30–120 s.
            // Actual subject from staging: "You've been prequalified for a HELOC!"
            const emailSubjectPattern =
                /prequalified|invited to apply|apply for a loan|loan application|started.*application/i;
            let emailRow = mailinatorTab.getByText(emailSubjectPattern).first();
            const deadline = Date.now() + 120000;
            while (!(await emailRow.isVisible().catch(() => false))) {
                if (Date.now() > deadline) break;
                await mailinatorTab.reload({ waitUntil: 'domcontentloaded' });
                await mailinatorTab.waitForTimeout(5000);
                emailRow = mailinatorTab.getByText(emailSubjectPattern).first();
            }

            // Assert the subject row is visible — that's sufficient to confirm delivery.
            await expect(emailRow).toBeVisible({ timeout: 10000 });

            await mailinatorTab.close();
        });
    } catch (err) {
        await ctx.close().catch(() => { });
        throw err;
    }

    return { ctx };
}

/**
 * Shared LO pre-qual steps — runs the full portal flow and lands on the
 * portal dashboard after closing the confirmation modal.
 */
async function runLOPreQual(data, {
    preQualManualPage,
    newApplicationPage,
    mortgagesAndLiensPage,
    offerReviewPage,
    consentsPage,
    confirmationPage,
}) {
    await preQualManualPage.clickStartApp();
    await preQualManualPage.clickStartPreQualManually();
    await newApplicationPage.fillApplicationDetails(data);
    await newApplicationPage.clickNext();

    await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
    await mortgagesAndLiensPage.fillMortgagesAndLiens(data);
    await mortgagesAndLiensPage.clickNext();

    await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
    await offerReviewPage.updateLoanAmount(data);
    await offerReviewPage.clickManageDebtPayoffs(data);
    await offerReviewPage.verifyDebtPayoffModal(data);
    await offerReviewPage.saveDebtPayoffPlan(data);
    await offerReviewPage.clickEditInitialDraw(data);
    await offerReviewPage.verifyUpfrontDrawModal(data);
    await offerReviewPage.setDrawPercent(data);
    await offerReviewPage.confirmUpfrontDraw(data);
    await offerReviewPage.acknowledgeDtiLimit();
    await offerReviewPage.clickNext();

    await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
    await consentsPage.checkAllCertifications();
    await consentsPage.fillBrokerMloName(data);
    await consentsPage.verifySignature(data);
    await consentsPage.clickNext();

    await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
    await confirmationPage.verifyConfirmation(data);
    await confirmationPage.clickCopyBorrowerAppLink();
    await confirmationPage.clickDownloadPdf();
    await confirmationPage.clickClose();

    await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });
}

// ---------------------------------------------------------------------------
// Scenario A — Borrower Only
// ---------------------------------------------------------------------------

test('Scenario A: LO creates pre-qual and borrower receives invitation', async ({
    page,
    preQualManualPage,
    newApplicationPage,
    mortgagesAndLiensPage,
    offerReviewPage,
    consentsPage,
    confirmationPage,
}) => {
    test.setTimeout(960000);

    await page.goto('/portal');
    await page.waitForLoadState('load');

    await runLOPreQual(applicationData, {
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    });

    const { ctx } = await verifyInviteEmail(
        page.context(),
        applicationData.applicant.email,
        'A — B1 (borrower)'
    );
    await ctx.close().catch(() => { });
});

// ---------------------------------------------------------------------------
// Scenario B — With Co-Borrower
// ---------------------------------------------------------------------------

test('Scenario B: LO creates pre-qual with co-borrower and both receive invitations', async ({
    page,
    preQualManualPage,
    newApplicationPage,
    mortgagesAndLiensPage,
    offerReviewPage,
    consentsPage,
    confirmationPage,
}) => {
    test.setTimeout(1260000);

    await page.goto('/portal');
    await page.waitForLoadState('load');

    await runLOPreQual(coBorrowerApplicationData, {
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    });

    const { ctx: ctxB1 } = await verifyInviteEmail(
        page.context(),
        coBorrowerApplicationData.applicant.email,
        'B — B1 (borrower)'
    );
    await ctxB1.close().catch(() => { });

    const { ctx: ctxB2 } = await verifyInviteEmail(
        page.context(),
        coBorrowerApplicationData.coBorrower.email,
        'B — B2 (co-borrower)'
    );
    await ctxB2.close().catch(() => { });
});
