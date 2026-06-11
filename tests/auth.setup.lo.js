import { expect, test as setup } from '../fixtures';

const authFile = '.playwright/.auth/lo-user.json';

setup('authenticate as LO', async ({ page, context, loginPage }) => {
    await context.clearCookies();

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await loginPage.clickGoToBrokerPortal();

    await expect(page).toHaveURL(/portal\/login/);

    await loginPage.submitCredentials(process.env.EMAIL_LO, process.env.PASSWORD_LO);
    await expect(page).toHaveURL('/portal');

    await context.storageState({ path: authFile });
});
