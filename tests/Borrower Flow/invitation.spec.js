/**
 * LO-Initiated Manual Pre-Qual — Invitation Flow
 *
 * Two describe blocks run serially, each with their own LO pre-qual + email
 * verification steps:
 *
 *  Scenario A — Borrower Only (no co-borrower)
 *    A1. LO creates pre-qual manually (makeApplicationData — hasCoBorrower: false)
 *    A2. B1 receives invitation email (asserted via Mailinator)
 *
 *  Scenario B — With Co-Borrower
 *    B1. LO creates pre-qual manually (makeCoBorrowerApplicationData — hasCoBorrower: true)
 *    B2. B1 receives invitation email (asserted via Mailinator)
 *    B3. B2 (co-borrower) receives invitation email (asserted via Mailinator)
 *
 * Each test builds its data from a factory (makeApplicationData /
 * makeCoBorrowerApplicationData) so every run and retry gets fresh, unused
 * emails — a reused email trips "already associated with an existing
 * application". Email receipt is asserted by expectInvitationEmailReceived.
 *
 * Emails use Mailinator public inboxes — no real PII.
 * SSNs are Method Fi sandbox values.
 */

import { test, expect } from '../../fixtures';
import {
    makeApplicationData,
    makeCoBorrowerApplicationData,
} from '../../data/newApplication';
import { expectInvitationEmailReceived } from '../../utils/emailHelpers';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

    // Fresh email per run — a reused email (another create-flow spec sharing this
    // worker, or a retry) trips "already associated with an existing application".
    const applicationData = makeApplicationData();

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

    await expectInvitationEmailReceived(
        page.context(),
        applicationData.applicant.email,
        'A — B1 (borrower)'
    );
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

    // Fresh emails per attempt — a retry must not reuse the prior attempt's
    // co-borrower email or it hits "already associated to a coborrower invitation".
    const coBorrowerApplicationData = makeCoBorrowerApplicationData();

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

    await expectInvitationEmailReceived(
        page.context(),
        coBorrowerApplicationData.applicant.email,
        'B — B1 (borrower)'
    );

    await expectInvitationEmailReceived(
        page.context(),
        coBorrowerApplicationData.coBorrower.email,
        'B — B2 (co-borrower)'
    );
});
