/**
 * Quick Pricer — Pricing Engine Health Monitor.
 *
 * A lightweight, single-purpose check designed to run on a tight schedule
 * (every 15 minutes via .github/workflows/quick-pricer-monitor.yml).
 *
 * The Quick Pricer's "Run Scenario" path exercises the same pricing engine the
 * rest of the product depends on, so a failure here is an early warning that
 * pricing is down BEFORE it surfaces in live borrower flows.
 *
 * Critical path:
 *   1. Open the Quick Pricer (HELOC Rate Calculator)
 *   2. Fill Sample Data (a known-valid scenario)
 *   3. Run Scenario
 *   4. Assert a VALID offer came back — Your Amount renders AND at least one
 *      pricing row has a non-zero interest rate and a non-zero monthly payment.
 *
 * If step 4 fails (e.g. $0 / 0.000%), the engine is not returning valid offers
 * and the workflow fires Slack + email alerts.
 */

import { test } from '../../fixtures';

test.describe('Quick Pricer — Pricing Engine Monitor', () => {
    test('Run Scenario returns a valid offer (non-zero rate & monthly payment)', async ({
        page,
        quickPricerPage,
    }) => {
        await test.step('Open the Quick Pricer page', async () => {
            // Step 1 — Land on the Quick Pricer page
            await page.goto('/portal');
            await page.waitForLoadState('load');
            await quickPricerPage.navigateToQuickPricer();
        });

        await test.step('Fill the known-valid sample scenario', async () => {
            // Step 2 — Fill the known-valid sample scenario
            await quickPricerPage.clickFillSampleData();
            await quickPricerPage.verifyFilledFormValues();
        });

        await test.step('Run the scenario against the live pricing engine', async () => {
            // Step 3 — Run the scenario against the live pricing engine
            await quickPricerPage.runScenario();
        });

        await test.step('Verify the engine produced a valid offer', async () => {
            // Step 4 — Confirm the engine produced a valid offer.
            //   • Your Amount + pricing table render
            //   • at least one row has a non-zero interest rate AND monthly payment
            await quickPricerPage.verifyQuoteResults();
        });
    });
});
