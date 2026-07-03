import { expect, test } from '../../fixtures';
import { OTPService } from '../../services/otp.service';

test.describe('Login', () => {
    test.beforeEach(async ({ page, context, loginPage }) => {
        await context.clearCookies();

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        await loginPage.clickGoToBrokerPortal();
        await expect(page).toHaveURL(/portal\/login/);
    });
    test('Valid credentials', async ({ page, loginPage }) => {
        const otpService = new OTPService(process.env.OTP_SECRET);
        const code = otpService.generateOTP();

        await test.step('Log in with email, password and OTP code', async () => {
            await loginPage.loginUser(process.env.EMAIL, process.env.PASSWORD, code);
        });

        await test.step('Verify landing on the portal', async () => {
            await expect(page).toHaveURL('/portal');
        });
    });
    test.afterEach(async ({ context }) => {
        await context.clearCookies();
    });
});
