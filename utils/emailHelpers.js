import { expect, test } from '@playwright/test';

/**
 * Opens the borrower's Mailinator public inbox in an isolated browser context,
 * polls (with refresh) until the Hitch invitation / pre-qual email arrives, and
 * asserts the subject row is visible — confirming the email was actually
 * delivered to that address.
 *
 * Uses a fresh browser context so the caller's portal session is never touched,
 * and always cleans up that context (and the inbox tab) before returning.
 *
 * Emails use Mailinator public inboxes — no real PII.
 *
 * @param {import('@playwright/test').BrowserContext} sourceContext  any context on the target browser
 * @param {string} email   full mailinator address whose inbox to check
 * @param {string} label   prefix for the test.step name
 */
export async function expectInvitationEmailReceived(sourceContext, email, label) {
    const inboxName = email.split('@')[0];
    const mailinatorUrl =
        `https://www.mailinator.com/v4/public/inboxes.jsp?to=${encodeURIComponent(inboxName)}`;

    const ctx = await sourceContext.browser().newContext();

    try {
        await test.step(`${label}: verify invitation email in Mailinator`, async () => {
            const inboxTab = await ctx.newPage();
            await inboxTab.goto(mailinatorUrl, { waitUntil: 'domcontentloaded' });

            // Poll with page refresh — email delivery can take 30–120 s.
            // Actual subject from staging: "You've been prequalified for a HELOC!"
            const emailSubjectPattern =
                /prequalified|invited to apply|apply for a loan|loan application|started.*application/i;
            let emailRow = inboxTab.getByText(emailSubjectPattern).first();
            const deadline = Date.now() + 120000;
            while (!(await emailRow.isVisible().catch(() => false))) {
                if (Date.now() > deadline) break;
                await inboxTab.reload({ waitUntil: 'domcontentloaded' });
                await inboxTab.waitForTimeout(5000);
                emailRow = inboxTab.getByText(emailSubjectPattern).first();
            }

            // Assert the subject row is visible — confirms the email was delivered.
            await expect(
                emailRow,
                `No invitation email arrived for ${email} within 120s`
            ).toBeVisible({ timeout: 10000 });

            await inboxTab.close();
        });
    } finally {
        await ctx.close().catch(() => { });
    }
}
