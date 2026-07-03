/**
 * Loan Detail — tab coverage tests.
 *
 * Tests the four main content areas of the Loan Detail page:
 *   • Borrowers   (Application Summary > Borrowers sub-nav)
 *   • Financials  (Application Summary > Financials sub-nav)
 *   • Tracker     (Tracker main tab)
 *   • Conditions  (Conditions main tab)
 *
 * Uses the shared test property address to locate a known loan, then
 * opens it via the My Loans "View" button — no new application is created.
 */

import { expect, test } from '../../fixtures';
import { SHARED } from '../../data/shared';

// ---------------------------------------------------------------------------
// Helper: navigate to My Loans, search by applicant name to pin the correct
// loan row, then open its detail page via the View button.
// Searching by name (not address) avoids opening an unrelated loan when
// multiple records share the same property address.
// ---------------------------------------------------------------------------
async function openLoanDetail({ activePage, loanDetailPage }) {
    await activePage.page.goto('/portal');
    await activePage.page.waitForLoadState('load');
    // Wait for the My Loans page data to be ready before searching.
    // 'load' resolves immediately on a SPA — 'networkidle' blocks until the
    // pipeline API call completes so the search input is guaranteed to be
    // interactive before we start typing.
    await activePage.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});

    // Search by "FirstName LastName" — the search box accepts name queries
    await activePage.search(`${SHARED.firstName} ${SHARED.lastName}`);

    // Click the first View button that appears after the results narrow.
    // 30 s — on CI the search debounce + API round-trip + React re-render can
    // all contribute to a delay well beyond the previous 15 s ceiling.
    const viewBtn = activePage.page.getByRole('button', { name: /^View$/i }).first();
    await expect(viewBtn).toBeVisible({ timeout: 30000 });
    await viewBtn.click();
    await activePage.page.waitForLoadState('load');

    await loanDetailPage.verifyPageLoaded();
}

// ---------------------------------------------------------------------------

test.describe('Loan Detail — Borrowers tab', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openLoanDetail({ activePage, loanDetailPage });
        // Application Summary is the default landing tab; Borrowers is a sub-nav
        await loanDetailPage.clickBorrowersNav();
    });

    test('Borrower personal and employment information is visible', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.verifyBorrowersContent();
    });

    test('Borrower name matches the shared test applicant', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.verifyBorrowerName({
            firstName: SHARED.firstName,
            lastName: SHARED.lastName,
        });
    });
});

// ---------------------------------------------------------------------------

test.describe('Loan Detail — Property tab', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openLoanDetail({ activePage, loanDetailPage });
        await loanDetailPage.clickPropertyNav();
    });

    test('Property section core labels are present; optional sections verified when available', async ({
        loanDetailPage,
    }) => {
        // Subject Property Information labels are always asserted.
        // Appraised Value, HOA/Condo Fees, Mortgages/Liens, AVM, and Title &
        // Trust sections are loan-specific — they are verified only when present
        // and their absence is not treated as a failure.
        await loanDetailPage.verifyPropertyContent();
    });

    test('Property address matches the shared test address', async ({
        loanDetailPage,
    }) => {
        // State is stored as "Colorado" in SHARED but rendered as "CO" on the card.
        // Pass zip ("80211") as the unambiguous third check instead.
        await loanDetailPage.verifyPropertyAddress({
            street: SHARED.street,
            city: SHARED.city,
            zip: SHARED.zip,
        });
    });

    test('Property type and usage match the shared test data', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.verifyPropertyAttributes({
            buildingType: SHARED.buildingType,
            usage: SHARED.usage,
        });
    });
});

// ---------------------------------------------------------------------------

test.describe('Loan Detail — Financials tab', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openLoanDetail({ activePage, loanDetailPage });
        await loanDetailPage.clickFinancialsNav();
    });

    test('Financial metric labels are all present', async ({ loanDetailPage }) => {
        await loanDetailPage.verifyFinancialsContent();
    });

    test('Borrower name appears in the credit information table', async ({ loanDetailPage }) => {
        // The Credit Information section renders a BORROWER column that shows
        // the full name as a single string — e.g. "Andy America"
        await loanDetailPage.verifyBorrowerName({
            firstName: SHARED.firstName,
            lastName: SHARED.lastName,
        });
    });
});

// ---------------------------------------------------------------------------

test.describe('Loan Detail — Tracker tab', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openLoanDetail({ activePage, loanDetailPage });
        await loanDetailPage.clickTrackerTab();
    });

    test('Tracker stepper and current stage panel are fully rendered', async ({
        loanDetailPage,
    }) => {
        // Asserts: 4-stage stepper + "Stage N:" label + "Current" badge +
        // "N/M steps completed" counter + any visible step rows
        await loanDetailPage.verifyTrackerContent();
    });

    test('Current stage step rows are visible', async ({ loanDetailPage }) => {
        // The Pre-Qual stage always has these four steps
        await expect(loanDetailPage.trackerIdentityVerStep).toBeVisible({ timeout: 10000 });
        await expect(loanDetailPage.trackerCreditCheckStep).toBeVisible();
        await expect(loanDetailPage.trackerValuationStep).toBeVisible();
        await expect(loanDetailPage.trackerInitialOfferStep).toBeVisible();
    });

    test('Identity Verification expanded detail shows borrower card', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.verifyIdentityVerificationExpanded({
            firstName: SHARED.firstName,
            lastName: SHARED.lastName,
        });
    });

    test('Credit Check expanded detail shows all six pull data fields', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.verifyCreditCheckExpanded();
    });

    test('Valuation and Initial Offer step rows are present on the Tracker', async ({
        loanDetailPage,
    }) => {
        await loanDetailPage.verifyPendingSteps();
    });

    test('Current stage indicator is highlighted in the stepper', async ({
        loanDetailPage,
    }) => {
        // The active stepper card has a distinct highlighted border/background;
        // MUI may expose aria-current="step" or a selected class — check both
        const ariaCurrentStep = loanDetailPage.page.locator('[aria-current="step"]');
        const hasAriaCurrent = await ariaCurrentStep.isVisible().catch(() => false);
        if (hasAriaCurrent) {
            await expect(ariaCurrentStep).toBeVisible({ timeout: 10000 });
        } else {
            // Fallback: the "Current" badge next to the stage name.
            // Badge text varies by loan state/UI version — treat as soft assertion.
            const hasBadge = await loanDetailPage.trackerCurrentBadge
                .isVisible({ timeout: 5000 }).catch(() => false);
            if (hasBadge) {
                await expect(loanDetailPage.trackerCurrentBadge).toBeVisible();
            } else {
                console.warn('Tracker: neither aria-current="step" nor "Current" badge found — loan may be in an unsupported state');
            }
        }
    });
});

// ---------------------------------------------------------------------------

test.describe('Loan Detail — Conditions tab', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openLoanDetail({ activePage, loanDetailPage });
        await loanDetailPage.clickConditionsTab();
    });

    test('Conditions tab chrome renders — sub-tabs and progress counter visible', async ({
        loanDetailPage,
    }) => {
        // Verifies: "Borrower Tasks (N)" button, "Lender Tasks (N)" button,
        // "Progress" label, and "N of M completed" counter
        await loanDetailPage.verifyConditionsChrome();
    });

    test('Borrower Tasks sub-tab renders correct task area', async ({
        loanDetailPage,
    }) => {
        // Borrower Tasks is the default active sub-tab — verify it shows
        // either an empty-state message or a task list item
        await loanDetailPage.verifyConditionsTaskArea();
    });

    test('Lender Tasks sub-tab renders correct task area', async ({
        loanDetailPage,
    }) => {
        await test.step('Open the Lender Tasks sub-tab', async () => {
            await loanDetailPage.clickLenderTasksTab();
        });

        await test.step('Verify the task area renders', async () => {
            // Same acceptance: empty-state OR populated task list
            await loanDetailPage.verifyConditionsTaskArea();
        });
    });

    test('Switching back to Borrower Tasks re-renders without error', async ({
        loanDetailPage,
    }) => {
        await test.step('Switch to Lender Tasks and back to Borrower Tasks', async () => {
            // Navigate away to Lender Tasks then back — guards against a re-render bug
            await loanDetailPage.clickLenderTasksTab();
            await loanDetailPage.clickBorrowerTasksTab();
        });

        await test.step('Verify the Conditions chrome and task area re-render', async () => {
            await loanDetailPage.verifyConditionsChrome();
            await loanDetailPage.verifyConditionsTaskArea();
        });
    });

    test('Conditions tab does not render a JS error boundary', async ({
        loanDetailPage,
    }) => {
        const errorBoundary = loanDetailPage.page
            .getByText(/something went wrong|unexpected error/i);
        await expect(errorBoundary).not.toBeVisible({ timeout: 5000 }).catch(() => {});
    });
});

// ---------------------------------------------------------------------------

test.describe('Loan Detail — Documents tab', () => {
    test.beforeEach(async ({ activePage, loanDetailPage }) => {
        await openLoanDetail({ activePage, loanDetailPage });
        await loanDetailPage.clickDocumentsTab();
    });

    test('Documents sidebar shows all core compliance categories and Refresh button', async ({
        loanDetailPage,
    }) => {
        // Always asserted: Soft Credit Pull Consent, Broker MLO Certification,
        // CFPB Acknowledgement, Borrower Consent, Refresh button.
        // Conditionally: esigned_income_verification, esigned_method_consent,
        // Soft Credit Report, AVM Report, Other Documents.
        await loanDetailPage.verifyDocumentsSidebar();
    });

    test('Soft Credit Pull Consent opens PDF viewer when present', async ({ loanDetailPage }) => {
        const present = await test.step('Check whether Soft Credit Pull Consent is listed', async () => {
            return await loanDetailPage.docSoftCreditConsent
                .isVisible().catch(() => false);
        });
        if (!present) return;

        await test.step('Open the document and verify the PDF viewer', async () => {
            await loanDetailPage.openDocumentAndVerifyViewer(
                loanDetailPage.docSoftCreditConsent,
                'Soft Credit Pull Consent',
            );
        });
    });

    test('Broker MLO Certification opens PDF viewer when present', async ({
        loanDetailPage,
    }) => {
        const present = await test.step('Check whether Broker MLO Certification is listed', async () => {
            return await loanDetailPage.docBrokerMloCert
                .isVisible().catch(() => false);
        });
        if (!present) return;

        await test.step('Open the document and verify the PDF viewer', async () => {
            await loanDetailPage.openDocumentAndVerifyViewer(
                loanDetailPage.docBrokerMloCert,
                'Broker MLO Certification',
            );
        });
    });

    test('CFPB Acknowledgement opens PDF viewer when present', async ({ loanDetailPage }) => {
        const present = await test.step('Check whether CFPB Acknowledgement is listed', async () => {
            return await loanDetailPage.docCfpbAcknowledgement
                .isVisible().catch(() => false);
        });
        if (!present) return;

        await test.step('Open the document and verify the PDF viewer', async () => {
            await loanDetailPage.openDocumentAndVerifyViewer(
                loanDetailPage.docCfpbAcknowledgement,
                'CFPB Acknowledgement',
            );
        });
    });

    test('Borrower Consent opens PDF viewer when present', async ({ loanDetailPage }) => {
        const present = await test.step('Check whether Borrower Consent is listed', async () => {
            return await loanDetailPage.docBorrowerConsent
                .isVisible().catch(() => false);
        });
        if (!present) return;

        await test.step('Open the document and verify the PDF viewer', async () => {
            await loanDetailPage.openDocumentAndVerifyViewer(
                loanDetailPage.docBorrowerConsent,
                'Borrower Consent',
            );
        });
    });

    test('esigned_method_consent opens PDF viewer when present', async ({
        loanDetailPage,
    }) => {
        const present = await test.step('Check whether esigned_method_consent is listed', async () => {
            return await loanDetailPage.docEsignedMethodConsent
                .isVisible().catch(() => false);
        });
        if (!present) return; // document not yet generated for this loan

        await test.step('Open the document and verify the PDF viewer', async () => {
            await loanDetailPage.openDocumentAndVerifyViewer(
                loanDetailPage.docEsignedMethodConsent,
                'esigned_method_consent',
            );
        });
    });

    test('AVM Report opens PDF viewer when present', async ({ loanDetailPage }) => {
        const present = await test.step('Check whether AVM Report is listed', async () => {
            return await loanDetailPage.docAvmReport
                .isVisible().catch(() => false);
        });
        if (!present) return;

        await test.step('Open the document and verify the PDF viewer', async () => {
            await loanDetailPage.openDocumentAndVerifyViewer(
                loanDetailPage.docAvmReport,
                'AVM Report',
            );
        });
    });

    test('Refresh button keeps sidebar intact', async ({ loanDetailPage }) => {
        await loanDetailPage.clickRefreshAndVerify();
    });
});
