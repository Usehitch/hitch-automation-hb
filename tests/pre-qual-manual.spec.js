import { expect, test } from '../fixtures';
import { applicationData, coBorrowerApplicationData } from '../data/newApplication';

test.describe('Pre-Qual Manually', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });
    test('Create new application', async ({
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    }) => {
        // Step 1 — Application Details
        await preQualManualPage.clickStartApp();
        await preQualManualPage.clickStartPreQualManually();
        await newApplicationPage.fillApplicationDetails(applicationData);
        await newApplicationPage.clickNext();

        // Step 2 — Mortgages & Liens
        await expect(newApplicationPage.mortgagesHeading).toBeVisible();
        await mortgagesAndLiensPage.fillMortgagesAndLiens(applicationData);
        await mortgagesAndLiensPage.clickNext();

        // Step 3 — Offer Review (Pre-Qualification Summary)
        await expect(offerReviewPage.pageHeading).toBeVisible();
        await offerReviewPage.updateLoanAmount(applicationData);
        await offerReviewPage.clickManageDebtPayoffs(applicationData);
        await offerReviewPage.verifyDebtPayoffModal(applicationData);
        await offerReviewPage.saveDebtPayoffPlan(applicationData);
        await offerReviewPage.clickEditInitialDraw(applicationData);
        await offerReviewPage.verifyUpfrontDrawModal(applicationData);
        await offerReviewPage.setDrawPercent(applicationData);
        await offerReviewPage.confirmUpfrontDraw(applicationData);
        await offerReviewPage.acknowledgeDtiLimit();
        await offerReviewPage.clickNext();

        // Step 4 — Consents
        await expect(consentsPage.pageHeading).toBeVisible();
        await consentsPage.checkAllCertifications();
        await consentsPage.fillBrokerMloName(applicationData);
        await consentsPage.verifySignature(applicationData);
        await consentsPage.clickNext();

        // Step 5 — Confirmation
        await expect(confirmationPage.successHeading).toBeVisible();
        await confirmationPage.verifyConfirmation(applicationData);
        await confirmationPage.clickCopyBorrowerAppLink();
        await confirmationPage.clickDownloadPdf();
        await confirmationPage.clickClose();

        // Verify redirect back to portal dashboard
        await expect(confirmationPage.portalPipelineSection).toBeVisible();
    });

    test('Create new application with Co-Borrower', async ({
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
    }) => {
        // Step 1 — Application Details (includes co-borrower section)
        await preQualManualPage.clickStartApp();
        await preQualManualPage.clickStartPreQualManually();
        await newApplicationPage.fillApplicationDetails(coBorrowerApplicationData);
        await newApplicationPage.clickNext();

        // Step 2 — Mortgages & Liens
        await expect(newApplicationPage.mortgagesHeading).toBeVisible();
        await mortgagesAndLiensPage.fillMortgagesAndLiens(coBorrowerApplicationData);
        await mortgagesAndLiensPage.clickNext();

        // Step 3 — Offer Review
        await expect(offerReviewPage.pageHeading).toBeVisible();
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

        // Step 4 — Consents
        await expect(consentsPage.pageHeading).toBeVisible();
        await consentsPage.checkAllCertifications();
        await consentsPage.fillBrokerMloName(coBorrowerApplicationData);
        await consentsPage.verifySignature(coBorrowerApplicationData);
        await consentsPage.clickNext();

        // Step 5 — Confirmation
        await expect(confirmationPage.successHeading).toBeVisible();
        await confirmationPage.verifyConfirmation(coBorrowerApplicationData);
        await confirmationPage.clickCopyBorrowerAppLink();
        await confirmationPage.clickDownloadPdf();
        await confirmationPage.clickClose();

        await expect(confirmationPage.portalPipelineSection).toBeVisible();
    });

});
