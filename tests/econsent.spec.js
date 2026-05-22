import { expect, test } from '../fixtures';
import { coBorrowerApplicationData } from '../data/newApplication';

test.describe('E-Consent', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Co-borrower method consent captured and accessible in Documents', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
        activePage,
        loanDetailPage,
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

        // Register listener before the click — broker certification PDF opens on submit
        const certPdfTabPromise = page.context().waitForEvent('page');
        await consentsPage.clickNext();

        // Step 4b — Verify broker certification PDF then close the tab
        await test.step('Verify and close broker certification PDF', async () => {
            const pdfTab = await certPdfTabPromise;
            await pdfTab.waitForURL(/brokerCertification.*\.pdf/i, { timeout: 30000 });
            await pdfTab.close();
            await page.bringToFront();
        });

        // Step 5 — Confirmation
        await expect(confirmationPage.successHeading).toBeVisible();
        await confirmationPage.verifyConfirmation(coBorrowerApplicationData);
        await confirmationPage.clickCopyBorrowerAppLink();
        await confirmationPage.clickDownloadPdf();
        await confirmationPage.clickClose();

        // Step 6 — My Loans: find the newly created loan by applicant email
        await activePage.search(coBorrowerApplicationData.applicant.email);
        await activePage.viewBtn.click();
        await loanDetailPage.verifyPageLoaded();

        // Step 7 — Documents tab: verify co-borrower method consent
        await loanDetailPage.clickDocumentsTab();
        await loanDetailPage.verifyESignedMethodConsent();
        await loanDetailPage.openCoBorrowerMethodConsent();
        await loanDetailPage.verifyCoBorrowerConsentDoc();
    });
});
