/**
 * LO Pipeline Management — visual pipeline buckets
 *
 * The portal gives loan officers visual "buckets" to track each loan's status
 * across the pipeline (Pre-Qual, In Process, Closing, Funded — plus a Pending
 * MLO Certification bucket). This spec verifies, under the LO session, that:
 *   1. The My Loans pipeline page loads
 *   2. The Overview summary tiles (per-bucket counts / dollar totals) render
 *   3. Each pipeline bucket/section is present
 *   4. The bucket tables expose the expected columns and row actions
 *
 * Runs under the LO session (.playwright/.auth/lo-user.json) via the
 * chromium-lo project — see playwright.config.js. Read-only: it inspects the
 * pipeline structure and does not mutate any loan, so it is safe to run anytime
 * regardless of staging data state.
 */

import { test, expect } from '../../fixtures';

test.describe('LO - Pipeline Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('LO can view the pipeline buckets and their contents', async ({ activePage }) => {
        // -- Page heading ------------------------------------------------------
        await expect(activePage.pageHeading).toBeVisible({ timeout: 20000 });

        // -- Overview tiles ----------------------------------------------------
        // Per-bucket summary bar: My Loans / Pre-Qual / In Process / Closing /
        // Funded. Counts and dollar amounts are dynamic — labels only.
        await activePage.verifyOverviewTiles();

        // -- Toolbar -----------------------------------------------------------
        // Search + filter let the LO locate loans within the pipeline.
        await activePage.verifyToolbar();

        // -- Pipeline buckets --------------------------------------------------
        // The visual status buckets: Pre-Qual / In Process / Closing / Funded.
        await activePage.verifyPipelineSections();

        // -- Bucket tables -----------------------------------------------------
        // Standard pipeline tables share the Processor / LOA column and a View
        // action (View only asserted when the bucket has loans).
        await activePage.verifyStandardPipelineTables();
    });

    test('LO sees the Pending MLO Certification bucket when loans await certification', async ({ activePage }) => {
        await expect(activePage.pageHeading).toBeVisible({ timeout: 20000 });

        // The Pending MLO Certification heading stays visible even when the
        // section has "No results". Check for an actual Certify button — it only
        // renders when at least one loan is awaiting certification.
        const hasPending = await activePage.certifyBtn
            .isVisible({ timeout: 15000 })
            .catch(() => false);
        test.skip(!hasPending, 'No loans currently pending MLO certification on staging');

        await activePage.verifyPendingMloCertTable();
    });
});
