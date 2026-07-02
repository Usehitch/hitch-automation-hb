/**
 * LO Self-Employed Income Sources
 *
 * The manual pre-qual Application Details step lets the LO declare income
 * sources via checkboxes. Checking "Self Employed" reveals an "Add Business"
 * editor with one REQUIRED field — Total Annual Compensation — plus DONE
 * EDITING and ADD ANOTHER BUSINESS (multiple businesses are supported). Every
 * business feeds the "Total Annual Income" summary row under the checkboxes.
 *
 * Two tests:
 *   1. Form behavior (no application created — never clicks Next):
 *      self-employed compensation flows into Total Annual Income, a second
 *      business ADDs to the total, and the form stays submittable.
 *   2. End-to-end: a full pre-qual finalizes to Confirmation with Self
 *      Employed as the applicant's ONLY income source — proving underwriting/
 *      finalization accepts a purely self-employed borrower — and the borrower
 *      receives the invitation email (Mailinator receipt check).
 *
 * Field labels confirmed against HBWHS staging DOM (2026-07-02): the business
 * editor's compensation input shares its label with the Salary job form, so
 * the page object scopes it to the "Add Business" section.
 *
 * Runs under the LO session (.playwright/.auth/lo-user.json) via the
 * chromium-lo project — see playwright.config.js.
 */

import { test, expect } from '../../fixtures';
import { makeSelfEmployedApplicationData } from '../../data/newApplication';
import { expectInvitationEmailReceived } from '../../utils/emailHelpers';

test.describe('LO - Self-Employed Income Sources', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Self-employed businesses feed Total Annual Income (multi-business)', async ({
        page,
        preQualManualPage,
        newApplicationPage,
    }) => {
        test.setTimeout(240000);

        // Fresh email per run — nothing is finalized here, but a retry after a
        // partial failure must still start from unused data.
        const appData = makeSelfEmployedApplicationData();

        await test.step('Fill Application Details with Self Employed income only', async () => {
            await preQualManualPage.clickStartApp();
            await preQualManualPage.clickStartPreQualManually();
            // Fills business 1 (220,000) via the Add Business editor and asserts
            // NEXT enables — i.e. a self-employed-only applicant passes Step-1
            // validation.
            await newApplicationPage.fillApplicationDetails(appData);
        });

        await test.step('Verify the business compensation flows into Total Annual Income', async () => {
            await expect(newApplicationPage.totalAnnualIncomeLabel).toBeVisible();
            await expect(page.getByText(/\$220,000/).first()).toBeVisible({ timeout: 10000 });
        });

        await test.step('Add a second business and verify the total sums', async () => {
            await newApplicationPage.addAnotherBusiness({ totalAnnualCompensation: '110000' });

            // 220,000 + 110,000 — the summary row must recalculate to the sum.
            await expect(page.getByText(/\$330,000/).first()).toBeVisible({ timeout: 10000 });

            // The form must remain submittable with multiple businesses.
            await expect(newApplicationPage.nextBtn).toBeEnabled({ timeout: 15000 });
        });

        // Deliberately NO clickNext — this test verifies form behavior only and
        // must not create an application or trigger finalization.
    });

    test('LO creates a pre-qual with Self Employed as the only income source', async ({
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
        consentsPage,
        confirmationPage,
        page,
    }) => {
        // Full create flow — finalization (300 s) + mortgages hydration (120 s)
        // + consents can stack on CI. Same 11-min budget as pre-qual-manual.
        test.setTimeout(660000);

        // Fresh email per run — a reused email trips "already associated with an
        // existing application" and the form can't advance past Step 1.
        const appData = makeSelfEmployedApplicationData();

        // Step 1 — Application Details (Self Employed only)
        await preQualManualPage.clickStartApp();
        await preQualManualPage.clickStartPreQualManually();
        await newApplicationPage.fillApplicationDetails(appData);
        await expect(page.getByText(/\$220,000/).first()).toBeVisible({ timeout: 10000 });
        await newApplicationPage.clickNext();

        // Step 2 — Mortgages & Liens
        await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
        await mortgagesAndLiensPage.fillMortgagesAndLiens(appData);
        await mortgagesAndLiensPage.clickNext();

        // Step 3 — Offer Review (levers are exercised by pre-qual-manual.spec.js;
        // here the coverage target is the income source, so take the minimal path)
        await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
        await offerReviewPage.acknowledgeDtiLimit();
        await offerReviewPage.clickNext();

        // Step 4 — Consents
        await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
        await consentsPage.checkAllCertifications();
        await consentsPage.fillBrokerMloName(appData);
        await consentsPage.verifySignature(appData);
        await consentsPage.clickNext();

        // Step 5 — Confirmation
        await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
        await confirmationPage.clickClose();
        await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });

        // Step 6 — Confirm the borrower actually received the invitation email.
        await expectInvitationEmailReceived(
            page.context(),
            appData.applicant.email,
            'Borrower invite',
        );
    });
});
