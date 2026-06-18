/**
 * Borrower / Co-Borrower Flow — Support (Help Desk Widget)
 * ---------------------------------------------------------------------------
 * Feature under test:
 *   Throughout the process a help desk widget is available for both borrowers
 *   and loan officers, providing access to an AI chat bot and the ability to
 *   submit support tickets.
 *
 * The widget is the bottom-right chat widget present on every page (the
 * "live-chat widget" other page objects deliberately avoid). It does NOT
 * require the full application flow — it is available on the loan-officer
 * portal and on borrower-facing pages alike — so this spec checks it directly
 * in both contexts without driving the multi-minute pre-qual flow.
 *
 * Scope notes (verified green against the live widget — LO + borrower):
 *   • The launcher ("Open messaging window") is available and the messaging
 *     window opens in both contexts.
 *   • The opened messenger exposes an AI-chat-bot entry and a submit-ticket /
 *     message entry. These are asserted with tolerant copy (the widget is a
 *     third-party iframe) — see the TODO on HelpDeskWidget to tighten to exact
 *     selectors if the messenger copy is locked down.
 */

import { test } from '../../fixtures';
import HelpDeskWidget from '../../pages/Support/HelpDeskWidget';

test.describe('Support — Help Desk Widget', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });

    test('Loan officer can access the help desk widget (AI bot + submit ticket)', async ({
        page,
    }) => {
        const widget = new HelpDeskWidget(page);

        await widget.verifyAvailable();
        await widget.open();
        await widget.verifyAiChatBotAvailable();
        await widget.verifySubmitTicketAvailable();
    });

    test('Borrower can access the help desk widget on the application', async ({
        preQualManualPage,
    }) => {
        // The widget is available "throughout the process" — confirm it on a
        // borrower-facing page reached via the shareable application link.
        const borrowerTab = await preQualManualPage.openShareableLinkInNewTab();
        const widget = new HelpDeskWidget(borrowerTab);

        await widget.verifyAvailable();
        await widget.open();
    });

});
