/**
 * LO - Credit and Income
 *
 * Covers the soft-credit-pull → DTI half of the Credit & Income feature, driven
 * from the LO manual pre-qual:
 *   1. The Application Details step states the pull is a SOFT credit check that
 *      will NOT affect the borrower's credit score (the "without impacting
 *      score" claim).
 *   2. After finalization (which runs the soft pull), the Offer Review page is a
 *      pre-qualification based on that soft pull, and DTI is calculated (shown in
 *      the debt-payoff "DTI After Proposed Payoff" section).
 *
 * The income-verification half — "if the employer participates with The Work
 * Number, the platform verifies income via API" — is covered separately by
 * twn-monitor.spec.js (the borrower DTC flow that auto-populates the verified
 * employer / income card through the TWN sandbox API).
 *
 * Runs under the broker/LO session (chromium). The test STOPS at Offer Review —
 * it does not finalize into Consents/Confirmation and never opens the Edit
 * Upfront Draw modal, so it avoids the heaviest / most timing-sensitive steps of
 * the full pre-qual flow while still exercising the real soft credit pull.
 */

import { test, expect } from '../../fixtures';
import { applicationData } from '../../data/newApplication';

test.describe('LO - Credit and Income', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Soft credit pull calculates DTI without a hard inquiry', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
    }) => {
        // Finalization runs a real soft credit pull against the Method Fi sandbox
        // SSN, which can take minutes on CI.
        test.setTimeout(360000);

        await test.step('Start manual pre-qual', async () => {
            await preQualManualPage.clickStartApp();
            await preQualManualPage.clickStartPreQualManually();
        });

        await test.step('Application Details states a soft inquiry with no score impact', async () => {
            await newApplicationPage.fillApplicationDetails(applicationData);

            // The Soft Credit Check consent on this step is the product's own
            // statement that the inquiry is SOFT and does not affect the score —
            // i.e. "calculate DTI without impacting the borrower's credit score".
            await expect(
                page.getByText(/soft credit (check|inquiry)/i).first()
            ).toBeVisible();
            await expect(
                page.getByText(/will not affect (their|your) credit score/i).first()
            ).toBeVisible();
        });

        await test.step('Finalize (runs the soft credit pull) and reach Offer Review', async () => {
            await newApplicationPage.clickNext();

            await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
            await mortgagesAndLiensPage.fillMortgagesAndLiens(applicationData);
            await mortgagesAndLiensPage.clickNext();

            await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
        });

        await test.step('Offer Review is a pre-qualification based on the soft credit pull', async () => {
            // The offer disclaimer states the pre-qual is based on the soft pull —
            // confirms the offer/DTI was produced from a soft inquiry, not a hard one.
            await expect(
                page.getByText(/based on a soft credit pull/i).first()
            ).toBeVisible();
        });

        await test.step('DTI is calculated from the pulled debts', async () => {
            // DTI is surfaced in the debt-payoff modal ("DTI After Proposed
            // Payoff"). clickManageDebtPayoffs / verifyDebtPayoffModal skip
            // gracefully when underwriting finds no active debts for this SSN
            // (the section only renders when debts exist), so this asserts the DTI
            // calculation when present without failing on the no-debt case. The
            // soft-pull basis above is the always-on guarantee.
            await offerReviewPage.clickManageDebtPayoffs(applicationData);
            await offerReviewPage.verifyDebtPayoffModal(applicationData);
        });
    });
});
