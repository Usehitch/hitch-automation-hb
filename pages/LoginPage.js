import { test } from "@playwright/test";

class LoginPage {
    constructor(page) {
        this.page = page;
        this.goToBrokerPortal_btn = this.page.getByRole('button', { name: "Go to Loan Officer Portal" });
        this.email = this.page.locator('#email');
        this.password = this.page.locator('#password');
        this.login_btn = this.page.getByRole('button', { name: "Login" });
        this.verify_btn = this.page.getByRole('button', { name: "Verify" });
    };
    async submitCredentials(email, password) {
        await test.step('Submit email and password', async () => {
            await this.email.fill(email);
            await this.password.fill(password);
            await this.login_btn.click();
            await this.page.waitForLoadState('networkidle');
        });
    };

    async submitOtp(otp) {
        await test.step('Submit OTP', async () => {
            const digits = otp.toString().split('');
            const otpInputs = this.page.locator('input[type="text"]');
            for (let i = 0; i < digits.length; i++) {
                await otpInputs.nth(i).fill(digits[i]);
            }
            await this.verify_btn.click();
            await this.page.waitForLoadState('networkidle');
        });
    };

    async loginUser(email, password, otp) {
        await this.submitCredentials(email, password);
        await this.submitOtp(otp);
    };
    async clickGoToBrokerPortal() {
        await test.step('Click the go to broker portal', async () => {
            await this.goToBrokerPortal_btn.click();
        });
    };
};

export default LoginPage;