import { expect, test as setup } from '../fixtures';

const authFile = '.playwright/.auth/lo-user.json';

setup('authenticate as LO', async ({ page, context, loginPage }) => {
    await context.clearCookies();

    await page.goto('/');
    // No networkidle wait: the staging SPA (chat widget / analytics) never goes
    // idle and hangs the full test timeout. clickGoToBrokerPortal() auto-waits
    // for the button (45s + cold-start reload), which is the real ready signal.
    await loginPage.clickGoToBrokerPortal();

    await expect(page).toHaveURL(/portal\/login/);

    await loginPage.submitCredentials(process.env.EMAIL_LO, process.env.PASSWORD_LO);
    await expect(page).toHaveURL('/portal');

    await context.storageState({ path: authFile });
});
