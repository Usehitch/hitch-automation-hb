import { expect, test } from '../fixtures';
import { twnApplicationData } from '../data/twnApplication.js';
import TWNPage from '../pages/The Work Number/TWNPage.js';

test.describe('The Work Number (TWN)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('networkidle');
    });
    test('TWN populates borrower info via shareable link', async ({
        preQualManualPage,
    }) => {
        // Step 1 — Copy shareable link and open in new tab
        const newTab = await preQualManualPage.openShareableLinkInNewTab();
        const twnPage = new TWNPage(newTab);

        // Step 2 — Landing page → Get Started Now
        await twnPage.clickGetStartedNow();

        // Step 3 — Select property type (Single Family)
        await twnPage.selectPropertyType(twnApplicationData);

        // Step 4 — Select loan purpose (Home Improvement)
        await twnPage.selectLoanPurpose(twnApplicationData);

        // Step 5 — Tell us about your property
        await twnPage.fillPropertyInfo(twnApplicationData);

        // Step 6 — Tell us about yourself (creates borrower account)
        await twnPage.fillAboutYourself(twnApplicationData);

        // Step 7 — Credit check: fill TWN sandbox SSN + DOB
        await twnPage.fillCreditCheck(twnApplicationData);

        // Step 8 — Assert TWN populated the employer card
        await twnPage.verifyTwnPopulated(twnApplicationData);
    });
});
