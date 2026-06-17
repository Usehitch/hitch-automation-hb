/**
 * LO - Deal Optimization
 *
 * The platform gives loan officers tools on the Offer Review (Pre-Qualification
 * Summary) step to improve the borrower's DTI ratio:
 *   1. Adjust the requested loan amount (CHANGE → "Reduce Requested Loan Amount")
 *      — a smaller HELOC means a smaller new payment.
 *   2. Select specific debts to pay off (MANAGE → debt payoff modal) — paying off
 *      a debt removes its monthly payment, lowering "DTI After Proposed Payoff".
 *
 * This test reaches Offer Review via the LO manual pre-qual (real soft credit
 * pull against the Method Fi sandbox SSN), exercises both levers, and asserts the
 * DTI recalculates — and does not increase — when a debt is selected for payoff.
 *
 * Debt data is dynamic: the sandbox SSN does not always return active debts. The
 * debt-payoff DTI assertion degrades gracefully (warns + skips) when no debts are
 * present, mirroring credit-and-income.spec.js. The loan-amount lever is always
 * exercised. The test STOPS at Offer Review — it never finalizes into Consents.
 *
 * Runs under the LO portal session (chromium-lo project — ace34@mailinator.com).
 */

import { test, expect } from '../../fixtures';
import { dealOptimizationData } from '../../data/dealOptimization';

test.describe('LO - Deal Optimization', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('LO optimizes the deal to improve DTI (loan amount + debt payoff)', async ({
        page,
        preQualManualPage,
        newApplicationPage,
        mortgagesAndLiensPage,
        offerReviewPage,
    }) => {
        // Finalization runs a real soft credit pull against the sandbox SSN, which
        // can take minutes on CI.
        test.setTimeout(360000);

        await test.step('Start manual pre-qual and reach Offer Review', async () => {
            await preQualManualPage.clickStartApp();
            await preQualManualPage.clickStartPreQualManually();

            await newApplicationPage.fillApplicationDetails(dealOptimizationData);
            await newApplicationPage.clickNext();

            await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
            await mortgagesAndLiensPage.fillMortgagesAndLiens(dealOptimizationData);
            await mortgagesAndLiensPage.clickNext();

            await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
        });

        await test.step('Lever 1 — adjust the requested loan amount', async () => {
            await offerReviewPage.updateLoanAmount(dealOptimizationData);
            await offerReviewPage.verifyLoanAmountReduced(dealOptimizationData);
        });

        await test.step('Lever 2 — select a debt to pay off and confirm DTI recalculates', async () => {
            await offerReviewPage.clickManageDebtPayoffs(dealOptimizationData);
            await offerReviewPage.verifyDebtPayoffModal(dealOptimizationData);

            const dti = await offerReviewPage.payOffFundableDebtAndMeasureDti();
            if (dti.debtsPresent && dti.fundable) {
                // Paying off a debt removes its monthly payment, so the proposed
                // DTI must drop. (The page object already confirmed it changed and
                // that the plan is fundable; this pins the direction — the actual
                // "optimization".)
                expect(
                    dti.after,
                    `Paying off a debt should lower DTI (before=${dti.before}%, after=${dti.after}%)`
                ).toBeLessThan(dti.before);
            } else if (dti.debtsPresent) {
                console.warn('Deal Optimization: debts present but none fundable with the reduced loan amount — DTI-drop assertion skipped (loan-amount lever still verified)');
            } else {
                console.warn('Deal Optimization: no debts returned for this SSN — DTI-drop assertion skipped (loan-amount lever still verified)');
            }

            await offerReviewPage.saveDebtPayoffPlan(dealOptimizationData);
        });
    });
});
