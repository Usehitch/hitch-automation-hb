# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.js >> authenticate
- Location: tests/auth.setup.js:6:6

# Error details

```
Test timeout of 180000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 180000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e4]:
    - img "Homebridge Financial Services, Inc. Logo" [ref=e9]
    - generic [ref=e10]:
      - generic [ref=e11]:
        - heading "Are you a consumer?" [level=3] [ref=e12]
        - heading "Do you already have an HELOC application with one of our partners?" [level=5] [ref=e13]
        - link "Continue Application" [ref=e14] [cursor=pointer]:
          - /url: /app/login
          - button "Continue Application" [ref=e15]: Continue Application
      - separator [ref=e16]
      - generic [ref=e17]:
        - heading "I'm a loan officer" [level=4] [ref=e18]
        - link "Go to Loan Officer Portal" [ref=e19] [cursor=pointer]:
          - /url: /portal
          - button "Go to Loan Officer Portal" [ref=e20]: Go to Loan Officer Portal
    - generic [ref=e21]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - img "Equal Housing Lender" [ref=e26]
          - generic [ref=e27]:
            - paragraph [ref=e28]:
              - text: Homebridge Financial Services, Inc.
              - generic [ref=e29]: "NMLS #6521"
            - paragraph [ref=e30]: 99 Wood Avenue South. Suite 301, Iselin, NJ, 08830
        - link "Privacy Policy" [ref=e31] [cursor=pointer]:
          - /url: https://usehitch.com/privacy-policy
          - paragraph [ref=e32]: Privacy Policy
        - link "Terms of Use" [ref=e33] [cursor=pointer]:
          - /url: https://usehitch.com/terms-conditions/
          - paragraph [ref=e34]: Terms of Use
        - link "NMLS Consumer Access" [ref=e35] [cursor=pointer]:
          - /url: https://www.nmlsconsumeraccess.org
          - paragraph [ref=e36]: NMLS Consumer Access
      - paragraph [ref=e41]: 1. This content provided is for informational purposes only. This does not constitute a lock, a commitment to make a loan, or an offer for the extension of credit. Programs and rates are subject to change without notice. Programs not available in all states. All loans are subject to credit approval. Other restrictions may apply.
  - alert [ref=e42]
  - generic:
    - generic:
      - generic [ref=e44]:
        - iframe [ref=e45]:
          - button "Close message from company" [ref=f11e4] [cursor=pointer]:
            - img [ref=f11e5]
        - iframe [ref=e46]:
          - button "Hi. Need any help?" [ref=f12e5] [cursor=pointer]
      - iframe [ref=e47]:
        - button "Open messaging window" [ref=f13e5] [cursor=pointer]:
          - img [ref=f13e7]
          - img [ref=f13e10]
```

# Test source

```ts
  1  | import { expect, test as setup } from '../fixtures';
  2  | import { OTPService } from '../services/otp.service';
  3  | 
  4  | const authFile = '.playwright/.auth/user.json';
  5  | 
  6  | setup('authenticate', async ({ page, context, loginPage }) => {
  7  |     await context.clearCookies();
  8  | 
  9  |     await page.goto('/');
> 10 |     await page.waitForLoadState('networkidle');
     |                ^ Error: page.waitForLoadState: Test timeout of 180000ms exceeded.
  11 |     await loginPage.clickGoToBrokerPortal();
  12 | 
  13 |     await expect(page).toHaveURL(/portal\/login/);
  14 | 
  15 |     const otpService = new OTPService(process.env.OTP_SECRET);
  16 | 
  17 |     // Submit credentials first, then regenerate OTP just before the OTP page
  18 |     // needs it — avoids the code expiring during the login page load/network wait.
  19 |     await loginPage.submitCredentials(process.env.EMAIL, process.env.PASSWORD);
  20 |     // await loginPage.submitOtp(otpService.generateOTP());
  21 |     await expect(page).toHaveURL('/portal');
  22 | 
  23 |     await context.storageState({ path: authFile });
  24 | });
  25 | 
```