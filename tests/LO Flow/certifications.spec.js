/**
 * LO Certification — Pending MLO Certification Flow
 *
 * After an application reaches the "Pending MLO Certification" stage in the
 * portal pipeline, the Loan Officer must certify it before it advances to
 * Pre-Qual. This spec drives that single responsibility end-to-end:
 *
 *   1. LO opens the portal pipeline (My Loans → Active)
 *   2. Pending MLO Certification section is present with a loan to certify
 *   3. LO clicks Certify → Loan Officer Certifications modal opens
 *   4. LO checks every certification checkbox + signs (Broker MLO Name)
 *   5. LO submits → "Certification completed successfully" toast confirms
 *   6. The broker certification PDF the portal produces is verified — its
 *      filename matches brokerCertification-*.pdf and the URL returns genuine
 *      PDF content (%PDF- magic bytes)
 *
 * Runs under the LO session (.playwright/.auth/lo-user.json) — see the
 * chromium-lo project in playwright.config.js. Targets a specific loan by
 * searching the pipeline (LOAN_SEARCH below) so the test certifies a known
 * application rather than whatever happens to be first in the queue.
 *
 * LOAN_SEARCH defaults to the shared test property address — stable across
 * runs and not borrower PII. Swap it for a loan number or borrower email to
 * point the test at a different application.
 */

import { test, expect } from '../../fixtures';
import { applicationData } from '../../data/newApplication';
import { SHARED } from '../../data/shared';

// Search key for the loan to certify. Full property address is stable and
// non-PII; replace with a loan number or email to target a different
// application. The portal search box matches on the full address as displayed,
// and the Pending MLO Certification table renders the address in uppercase
// (e.g. "4556 ELIOT ST, DENVER, CO 80211"), so the search term is uppercased
// to match.
const LOAN_SEARCH =
    `${SHARED.street}, ${SHARED.city}, CO ${SHARED.zip}`.toUpperCase(); // '4556 ELIOT ST, DENVER, CO 80211'

test('LO certifies the pending MLO application', async ({
    page,
    activePage,
    mloCertificationModal,
}) => {
    // Certification can trigger background underwriting checks on submit —
    // give the whole flow generous headroom on CI.
    test.setTimeout(240000);

    await test.step('Open the portal pipeline', async () => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
        await expect(activePage.pageHeading).toBeVisible({ timeout: 20000 });
    });

    await test.step(`Find the loan to certify (search "${LOAN_SEARCH}")`, async () => {
        // Narrow the pipeline to the target loan so the Certify button we click
        // belongs to that specific application, not whatever is first in the
        // full queue.
        await activePage.search(LOAN_SEARCH);

        // The Pending MLO Certification heading is always present even when the
        // section has "No results", so asserting the heading is not enough.
        // Wait for an actual Certify button — that only exists when a matching
        // loan is genuinely awaiting certification. A clear failure here means
        // no loan matching LOAN_SEARCH is currently pending MLO certification
        // (e.g. it was already certified, or has not reached this stage yet).
        await expect(
            activePage.certifyBtn,
            `No loan matching "${LOAN_SEARCH}" is pending MLO certification`
        ).toBeVisible({ timeout: 30000 });
    });

    let pdfUrlPromise;
    await test.step('Certify the pending MLO loan', async () => {
        await activePage.clickCertify();

        await mloCertificationModal.waitForModal();
        // Refresh-tolerant: prod's background pipeline refetch can unmount the
        // modal mid-interaction — prepareCertification reopens and redoes.
        await mloCertificationModal.prepareCertification({
            reopen: () => activePage.clickCertify(),
            name: applicationData.consent.brokerMloName,
        });
        // Arm broker-certification-PDF capture and submit. The PDF promise is
        // awaited later — the transient success toast must be checked first.
        ({ pdfUrlPromise } = await mloCertificationModal.submitCertificationAndStartPdfCapture());
    });

    await test.step('Verify certification succeeded', async () => {
        // Transient toast — assert it before awaiting the PDF below, which can
        // take several seconds to surface (the toast auto-dismisses by then).
        await expect(
            page.getByText(/Certification completed successfully/i)
        ).toBeVisible({ timeout: 15000 });
    });

    await test.step('Verify the broker certification PDF', async () => {
        // A document URL must have been produced — a new tab (headed) or a
        // download (headless). Its filename is the broker certification PDF.
        const pdfUrl = await pdfUrlPromise;
        expect(
            pdfUrl,
            'No broker certification PDF was produced after certifying'
        ).toBeTruthy();
        expect(pdfUrl).toMatch(/brokerCertification-.*\.pdf/i);

        // Fetch the document to confirm it is a real, retrievable PDF — the
        // presigned S3 URL is self-contained, so a plain GET works without the
        // portal session. Asserting the %PDF- magic bytes confirms genuine PDF
        // content rather than an error or HTML page served at that URL.
        const resp = await page.request.get(pdfUrl);
        expect(resp.ok(), `PDF request failed with status ${resp.status()}`).toBeTruthy();

        const body = await resp.body();
        expect(body.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    });
});
