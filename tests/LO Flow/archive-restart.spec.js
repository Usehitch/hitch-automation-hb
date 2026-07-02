/**
 * LO Archive & Restart — duplicate check must not block re-entry (NJ-823)
 *
 * The portal lets an LO archive a loan application, but there is no unarchive
 * (confirmed with the client — planned, not built). The supported "restart" is
 * manual: re-enter the SAME application data as a brand-new pre-qual. A
 * duplicate-check config issue previously blocked exactly that — re-creating a
 * loan whose original was archived — so this spec pins the regression:
 *
 *   1. LO creates a full manual pre-qual application (Steps 1–5)
 *   2. LO finds the loan in the pipeline (search by applicant email), opens it,
 *      and archives it from the detail page's "..." menu
 *   3. LO re-creates the application with the EXACT same data — same email,
 *      same property, same everything (per client: "it should reuse exact
 *      same data")
 *   4. The duplicate check must NOT block the re-entry: Step 1 advances past
 *      Application Details and the flow completes to Confirmation again
 *
 * Deliberately re-uses ONE makeApplicationData() payload for both creations —
 * the opposite of every other create-flow spec. The email collision is the
 * point: an archived loan must not trip "This email is already associated
 * with an existing application".
 *
 * Out of scope (client direction): re-entering the same data while the
 * original loan is still ACTIVE. That module is known-failing and will be
 * covered once it is fixed.
 *
 * Runs under the LO session (.playwright/.auth/lo-user.json) via the
 * chromium-lo project — see playwright.config.js.
 */

import { test, expect } from '../../fixtures';
import { makeApplicationData } from '../../data/newApplication';

test('LO archives a loan and re-creates it with the same data (duplicate check allows re-entry)', async ({
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
    // Two full create flows (each budgeted up to 11 min worst-case on CI — see
    // pre-qual-manual.spec.js) plus the archive step in between.
    test.setTimeout(1500000);

    // ONE payload for the whole test — the second creation must reuse the exact
    // same data (including email) to exercise the duplicate check against the
    // archived original. Do not call the factory twice.
    const appData = makeApplicationData();

    /**
     * Drives the manual pre-qual from Start App through Confirmation and back
     * to the portal dashboard. `onDuplicateCheck` labels the Step-1 advance so
     * a duplicate-check block on the second pass fails with the NJ-823 message
     * instead of a generic timeout.
     */
    async function createApplication({ onDuplicateCheck = false } = {}) {
        // Step 1 — Application Details
        await preQualManualPage.clickStartApp();
        await preQualManualPage.clickStartPreQualManually();
        await newApplicationPage.fillApplicationDetails(appData);
        try {
            await newApplicationPage.clickNext();
        } catch (err) {
            if (onDuplicateCheck) {
                const dupBlocked = await page
                    .getByText(/already associated/i)
                    .isVisible()
                    .catch(() => false);
                if (dupBlocked) {
                    throw new Error(
                        'Duplicate check blocked re-creating the application with the same ' +
                        'data after the original loan was archived — NJ-823 regression ' +
                        '(archived loans must not count as duplicates).'
                    );
                }
            }
            throw err;
        }

        // Step 2 — Mortgages & Liens
        await expect(newApplicationPage.mortgagesHeading).toBeVisible({ timeout: 15000 });
        await mortgagesAndLiensPage.fillMortgagesAndLiens(appData);
        await mortgagesAndLiensPage.clickNext();

        // Step 3 — Offer Review (Pre-Qualification Summary)
        await expect(offerReviewPage.pageHeading).toBeVisible({ timeout: 15000 });
        await offerReviewPage.acknowledgeDtiLimit();
        await offerReviewPage.clickNext();

        // Step 4 — Consents
        await expect(consentsPage.pageHeading).toBeVisible({ timeout: 15000 });
        await consentsPage.checkAllCertifications();
        await consentsPage.fillBrokerMloName(appData);
        await consentsPage.verifySignature(appData);
        await consentsPage.clickNext();

        // Step 5 — Confirmation → back to the portal dashboard
        await expect(confirmationPage.successHeading).toBeVisible({ timeout: 15000 });
        await confirmationPage.clickClose();
        await expect(confirmationPage.portalPipelineSection).toBeVisible({ timeout: 15000 });
    }

    await test.step('Create the original application', async () => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await createApplication();
    });

    await test.step('Open the loan and archive it', async () => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await expect(activePage.pageHeading).toBeVisible({ timeout: 20000 });

        // Search by the applicant email — unique to this run, so the View
        // button we click belongs to the loan just created. The retry loop
        // absorbs My Loans search-index lag on a freshly created loan.
        await activePage.searchAndWaitForResult(appData.applicant.email);
        await activePage.viewBtn.click();
        await loanDetailPage.verifyPageLoaded();

        await loanDetailPage.archiveLoan();
    });

    await test.step('Verify the loan left the active pipeline', async () => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await expect(activePage.pageHeading).toBeVisible({ timeout: 20000 });

        await activePage.search(appData.applicant.email);
        // Soft check — archiving should remove the loan from the Active
        // pipeline, so no View button matches the email anymore. Warn rather
        // than fail: where archived loans surface (hidden vs Inactive tab) is
        // not the behavior under test here.
        const stillListed = await activePage.viewBtn
            .isVisible({ timeout: 10000 })
            .catch(() => false);
        if (stillListed) {
            console.warn(
                'Archived loan still appears in the Active pipeline search — ' +
                'verify where archived loans are expected to surface.'
            );
        }
        await activePage.clearSearch();
    });

    await test.step('Re-create the application with the exact same data', async () => {
        // The archived original must not trip the duplicate check — reaching
        // Confirmation again with the identical payload is the NJ-823 pass
        // condition.
        await createApplication({ onDuplicateCheck: true });
    });
});
