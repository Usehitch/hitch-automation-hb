import { expect, test as setup } from '../fixtures';
import { OTPService } from '../services/otp.service';

const authFile = '.playwright/.auth/user.json';

setup('authenticate', async ({ page, context, loginPage }) => {
    await context.clearCookies();

    await page.goto('/');
    // No networkidle wait: the staging SPA (chat widget / analytics) never goes
    // idle and hangs the full test timeout. clickGoToBrokerPortal() auto-waits
    // for the button (45s + cold-start reload), which is the real ready signal.
    await loginPage.clickGoToBrokerPortal();

    await expect(page).toHaveURL(/portal\/login/);

    const otpService = new OTPService(process.env.OTP_SECRET);

    // Submit credentials first, then regenerate OTP just before the OTP page
    // needs it — avoids the code expiring during the login page load/network wait.
    await loginPage.submitCredentials(process.env.EMAIL, process.env.PASSWORD);
    // await loginPage.submitOtp(otpService.generateOTP());
    await expect(page).toHaveURL('/portal');

    await context.storageState({ path: authFile });
});
