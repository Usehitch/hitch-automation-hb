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
        // Co-borrower flow: finalization (200 s) + summary (250 s) + consents (200 s) on CI.
        // Additional loan-detail + document navigation adds ~30 s.  12 min covers the worst case.
        test.setTimeout(720000);

        // Step 1 — Application Details (includes co-borrower section)
        await preQualManualPage.clickStartApp();
        await preQualManualPage.clickStartPreQualManually();
        await newApplicationPage.fillApplicationDetails(coBorrowerApplicationData);
        await newApplicationPage.clickNext();

        // Step 2 — Mortgages & Liens
        await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
        await mortgagesAndLiensPage.fillMortgagesAndLiens(coBorrowerApplicationData);
        await mortgagesAndLiensPage.clickNext();

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

        // Step 4 — Consents
        await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
        await consentsPage.checkAllCertifications();
        await consentsPage.fillBrokerMloName(coBorrowerApplicationData);
        await consentsPage.verifySignature(coBorrowerApplicationData);

        // Register listener before the click — broker certification PDF may open in a
        // new tab, but CI serves it as a download so the tab navigates to ":" rather
        // than a PDF URL.  We wait up to 10 s for the tab event; if it never fires
        // (download-only path) we proceed without it.
        const certPdfTabPromise = page.context().waitForEvent('page', { timeout: 10000 }).catch(() => null);
        await consentsPage.clickNext();

        // Step 4b — Close the PDF tab if one opened; skip URL assertion in CI
        await test.step('Close broker certification PDF tab (if opened)', async () => {
            const pdfTab = await certPdfTabPromise;
            if (pdfTab) {
                await pdfTab.close().catch(() => {});
            }
            await page.bringToFront();
        });

        // Step 5 — Confirmation
        await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
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
