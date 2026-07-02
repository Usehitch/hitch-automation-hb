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
/**
 * Opens the borrower's Mailinator public inbox, waits for the Hitch invitation
 * email, opens the message, and extracts the invite CTA link ("REVIEW OFFER" —
 * a SendGrid click-tracking URL that redirects to /borrower/invite/<token>).
 *
 * Subsumes [[expectInvitationEmailReceived]]: reaching the link asserts the
 * email was delivered AND actionable. Uses an isolated context (cleaned up
 * before returning) so the caller's portal session is never touched.
 *
 * @param {import('@playwright/test').BrowserContext} sourceContext  any context on the target browser
 * @param {string} email   full mailinator address whose inbox to check
 * @param {string} label   prefix for the test.step name
 * @returns {Promise<string>} the invite link URL from the email body
 */
export async function openInvitationEmailAndGetLink(sourceContext, email, label) {
    const inboxName = email.split('@')[0];
    const mailinatorUrl =
        `https://www.mailinator.com/v4/public/inboxes.jsp?to=${encodeURIComponent(inboxName)}`;

    const ctx = await sourceContext.browser().newContext();

    try {
        return await test.step(`${label}: open invitation email and extract the invite link`, async () => {
            const inboxTab = await ctx.newPage();
            await inboxTab.goto(mailinatorUrl, { waitUntil: 'domcontentloaded' });

            // Same poll-with-refresh pattern as expectInvitationEmailReceived —
            // free Mailinator public inboxes can take up to ~3 min to deliver.
            const emailSubjectPattern =
                /prequalified|invited to apply|apply for a loan|loan application|started.*application/i;
            let emailRow = inboxTab.getByText(emailSubjectPattern).first();
            const deadline = Date.now() + 180000;
            while (!(await emailRow.isVisible().catch(() => false))) {
                if (Date.now() > deadline) break;
                await inboxTab.reload({ waitUntil: 'domcontentloaded' });
                await inboxTab.waitForTimeout(5000);
                emailRow = inboxTab.getByText(emailSubjectPattern).first();
            }
            await expect(
                emailRow,
                `No invitation email arrived for ${email} within 180s`
            ).toBeVisible({ timeout: 10000 });

            // Open the message — Mailinator renders the body inside an iframe,
            // so scan every frame for anchors once it settles.
            await emailRow.click();
            const collectLinks = async () => {
                const links = [];
                for (const frame of inboxTab.frames()) {
                    const frameLinks = await frame.evaluate(() =>
                        [...document.querySelectorAll('a[href]')].map(a => ({
                            text: (a.innerText || '').trim(),
                            href: a.href,
                        }))
                    ).catch(() => []);
                    links.push(...frameLinks);
                }
                return links;
            };

            // The CTA button in the invite is "REVIEW OFFER"; fall back to the
            // first non-Mailinator link so a copy change doesn't break the helper.
            let inviteLink = null;
            const linkDeadline = Date.now() + 30000;
            while (!inviteLink && Date.now() < linkDeadline) {
                const links = (await collectLinks()).filter(l =>
                    /^https?:/i.test(l.href) && !/mailinator/i.test(l.href));
                inviteLink =
                    links.find(l => /review offer|complete application|get started|apply|view offer/i.test(l.text))
                    ?? links[0]
                    ?? null;
                if (!inviteLink) await inboxTab.waitForTimeout(2000);
            }
            expect(
                inviteLink,
                `No invite link found in the invitation email for ${email}`
            ).toBeTruthy();

            await inboxTab.close();
            return inviteLink.href;
        });
    } finally {
        await ctx.close().catch(() => { });
    }
}

export async function expectInvitationEmailReceived(sourceContext, email, label) {
    const inboxName = email.split('@')[0];
    const mailinatorUrl =
        `https://www.mailinator.com/v4/public/inboxes.jsp?to=${encodeURIComponent(inboxName)}`;

    const ctx = await sourceContext.browser().newContext();

    try {
        await test.step(`${label}: verify invitation email in Mailinator`, async () => {
            const inboxTab = await ctx.newPage();
            await inboxTab.goto(mailinatorUrl, { waitUntil: 'domcontentloaded' });

            // Poll with page refresh — email delivery can take 30 s to a few
            // minutes on staging (free Mailinator public inboxes are slow/rate-
            // limited). 180 s window matches observed worst-case delivery.
            // Actual subject from staging: "You've been prequalified for a HELOC!"
            const emailSubjectPattern =
                /prequalified|invited to apply|apply for a loan|loan application|started.*application/i;
            let emailRow = inboxTab.getByText(emailSubjectPattern).first();
            const deadline = Date.now() + 180000;
            while (!(await emailRow.isVisible().catch(() => false))) {
                if (Date.now() > deadline) break;
                await inboxTab.reload({ waitUntil: 'domcontentloaded' });
                await inboxTab.waitForTimeout(5000);
                emailRow = inboxTab.getByText(emailSubjectPattern).first();
            }

            // Assert the subject row is visible — confirms the email was delivered.
            await expect(
                emailRow,
                `No invitation email arrived for ${email} within 180s`
            ).toBeVisible({ timeout: 10000 });

            await inboxTab.close();
        });
    } finally {
        await ctx.close().catch(() => { });
    }
}
