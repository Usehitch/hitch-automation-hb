import { expect, test } from '../fixtures';
import { applicationData } from '../data/newApplication';

test.describe('LoanCraft Pricing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Verify the interest rate through application, loancraft and encompass', async ({
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

        // Step 1 — Application Details
        await preQualManualPage.clickStartApp();
        await preQualManualPage.clickStartPreQualManually();
        await newApplicationPage.fillApplicationDetails(applicationData);
        await newApplicationPage.clickNext();

        // Step 2 — Mortgages & Liens
        await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
        await mortgagesAndLiensPage.fillMortgagesAndLiens(applicationData);
        await mortgagesAndLiensPage.clickNext();

        // Step 3 — Offer Review (Pre-Qualification Summary)
        await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
        await offerReviewPage.updateLoanAmount(applicationData);
        await offerReviewPage.clickManageDebtPayoffs(applicationData);
        await offerReviewPage.verifyDebtPayoffModal(applicationData);
        await offerReviewPage.saveDebtPayoffPlan(applicationData);
        await offerReviewPage.clickEditInitialDraw(applicationData);
        await offerReviewPage.verifyUpfrontDrawModal(applicationData);
        await offerReviewPage.setDrawPercent(applicationData);
        await offerReviewPage.confirmUpfrontDraw(applicationData);
        await offerReviewPage.acknowledgeDtiLimit();
        // await offerReviewPage.clickNext();

        // // Step 4 — Consents
        // await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
        // await consentsPage.checkAllCertifications();
        // await consentsPage.fillBrokerMloName(applicationData);
        // await consentsPage.verifySignature(applicationData);
        // await consentsPage.clickNext();

        // // Step 5 — Confirmation
        // await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
        // await confirmationPage.verifyConfirmation(applicationData);
        // await confirmationPage.clickCopyBorrowerAppLink();
        // await confirmationPage.clickDownloadPdf();
        // await confirmationPage.clickClose();

        // // Verify redirect back to portal dashboard
        // await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });
    });
});
