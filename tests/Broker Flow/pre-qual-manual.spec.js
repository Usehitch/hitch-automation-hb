import { expect, test } from '../../fixtures';
import { makeApplicationData, makeCoBorrowerApplicationData } from '../../data/newApplication';
import { expectInvitationEmailReceived } from '../../utils/emailHelpers';

test.describe('Pre-Qual Manually', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });
    test('Create new application', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    }) => {
        // Extend timeout: finalization (200 s) + summary (250 s) + consents (200 s) on CI.
        // 11 min covers the full stack of worst-case API waits.
        test.setTimeout(660000);

        // Fresh email per run — a reused email (another create-flow spec sharing
        // this worker, or a Playwright retry) trips "already associated with an
        // existing application" and the form can't advance past Application Details.
        const appData = makeApplicationData();

        await test.step('Fill in the application details', async () => {
            // Step 1 — Application Details
            await preQualManualPage.clickStartApp();
            await preQualManualPage.clickStartPreQualManually();
            await newApplicationPage.fillApplicationDetails(appData);
            await newApplicationPage.clickNext();
        });

        await test.step('Fill in mortgages and liens', async () => {
            // Step 2 — Mortgages & Liens
            await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
            await mortgagesAndLiensPage.fillMortgagesAndLiens(appData);
            await mortgagesAndLiensPage.clickNext();
        });

        await test.step('Review the pre-qualification offer', async () => {
            // Step 3 — Offer Review (Pre-Qualification Summary)
            await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
            await offerReviewPage.updateLoanAmount(appData);
            await offerReviewPage.clickManageDebtPayoffs(appData);
            await offerReviewPage.verifyDebtPayoffModal(appData);
            await offerReviewPage.saveDebtPayoffPlan(appData);
            await offerReviewPage.clickEditInitialDraw(appData);
            await offerReviewPage.verifyUpfrontDrawModal(appData);
            await offerReviewPage.setDrawPercent(appData);
            await offerReviewPage.confirmUpfrontDraw(appData);
            await offerReviewPage.acknowledgeDtiLimit();
            await offerReviewPage.clickNext();
        });

        await test.step('Complete the consents', async () => {
            // Step 4 — Consents
            await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
            await consentsPage.checkAllCertifications();
            await consentsPage.fillBrokerMloName(appData);
            await consentsPage.verifySignature(appData);
            await consentsPage.clickNext();
        });

        await test.step('Verify the confirmation and return to the portal', async () => {
            // Step 5 — Confirmation
            await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
            await confirmationPage.verifyConfirmation(appData);
            await confirmationPage.clickCopyBorrowerAppLink();
            await confirmationPage.clickDownloadPdf();
            await confirmationPage.clickClose();

            // Verify redirect back to portal dashboard
            await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });
        });

        await test.step('Confirm the borrower received the invitation email', async () => {
            // Step 6 — Confirm the borrower actually received the invitation email.
            await expectInvitationEmailReceived(
                page.context(),
                appData.applicant.email,
                'Borrower invite',
            );
        });
    });

    test('Create new application with Co-Borrower', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    }) => {
        // Co-borrower flows run two credit pulls — finalization (200 s) + summary (250 s)
        // + consents (200 s) can stack on CI.  11 min covers the worst case.
        test.setTimeout(660000);

        // Fresh emails per attempt — a retry must not reuse the prior attempt's
        // co-borrower email or it hits "already associated to a coborrower invitation".
        const coBorrowerApplicationData = makeCoBorrowerApplicationData();

        await test.step('Fill in the application details with a co-borrower', async () => {
            // Step 1 — Application Details (includes co-borrower section)
            await preQualManualPage.clickStartApp();
            await preQualManualPage.clickStartPreQualManually();
            await newApplicationPage.fillApplicationDetails(coBorrowerApplicationData);
            await newApplicationPage.clickNext();
        });

        await test.step('Fill in mortgages and liens', async () => {
            // Step 2 — Mortgages & Liens
            await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
            await mortgagesAndLiensPage.fillMortgagesAndLiens(coBorrowerApplicationData);
            await mortgagesAndLiensPage.clickNext();
        });

        await test.step('Review the pre-qualification offer', async () => {
            // Step 3 — Offer Review
            await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
            await offerReviewPage.updateLoanAmount(coBorrowerApplicationData);
            await offerReviewPage.clickManageDebtPayoffs(coBorrowerApplicationData);
            await offerReviewPage.verifyDebtPayoffModal(coBorrowerApplicationData);
            await offerReviewPage.saveDebtPayoffPlan(coBorrowerApplicationData);
            await offerReviewPage.clickEditInitialDraw(coBorrowerApplicationData);
            await offerReviewPage.verifyUpfrontDrawModal(coBorrowerApplicationData);
            await offerReviewPage.setDrawPercent(coBorrowerApplicationData);
            await offerReviewPage.confirmUpfrontDraw(coBorrowerApplicationData);
            await offerReviewPage.acknowledgeDtiLimit();
            await offerReviewPage.clickNext();
        });

        await test.step('Complete the consents', async () => {
            // Step 4 — Consents
            await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
            await consentsPage.checkAllCertifications();
            await consentsPage.fillBrokerMloName(coBorrowerApplicationData);
            await consentsPage.verifySignature(coBorrowerApplicationData);
            await consentsPage.clickNext();
        });

        await test.step('Verify the confirmation and return to the portal', async () => {
            // Step 5 — Confirmation
            await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
            await confirmationPage.verifyConfirmation(coBorrowerApplicationData);
            await confirmationPage.clickCopyBorrowerAppLink();
            await confirmationPage.clickDownloadPdf();
            await confirmationPage.clickClose();

            await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });
        });

        await test.step('Confirm the borrower and co-borrower received their invites', async () => {
            // Step 6 — Confirm both the borrower and co-borrower received their invites.
            await expectInvitationEmailReceived(
                page.context(),
                coBorrowerApplicationData.applicant.email,
                'Borrower invite',
            );
            await expectInvitationEmailReceived(
                page.context(),
                coBorrowerApplicationData.coBorrower.email,
                'Co-borrower invite',
            );
        });
    });

});
