import { expect, test } from '../../fixtures/index.js';
import { twnApplicationData } from '../../data/twnApplication.js';
import TWNPage from '../../pages/The Work Number/TWNPage.js';

test.describe('The Work Number (TWN)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/portal');
        await page.waitForLoadState('load');
    });
    test('TWN populates borrower info via shareable link', async ({
        preQualManualPage,
    }) => {
        const twnPage = await test.step('Open the shareable link in a new tab', async () => {
            // Step 1 — Copy shareable link and open in new tab
            const newTab = await preQualManualPage.openShareableLinkInNewTab();
            return new TWNPage(newTab);
        });

        await test.step('Walk the landing and selection screens', async () => {
            // Step 2 — Landing page → Get Started Now
            await twnPage.clickGetStartedNow();

            // Step 3 — Select property type (Single Family)
            await twnPage.selectPropertyType(twnApplicationData);

            // Step 4 — Select loan purpose (Home Improvement)
            await twnPage.selectLoanPurpose(twnApplicationData);
        });

        await test.step('Fill in the property and personal details', async () => {
            // Step 5 — Tell us about your property
            await twnPage.fillPropertyInfo(twnApplicationData);

            // Step 6 — Tell us about yourself (creates borrower account)
            await twnPage.fillAboutYourself(twnApplicationData);
        });

        await test.step('Complete the credit check with TWN sandbox data', async () => {
            // Step 7 — Credit check: fill TWN sandbox SSN + DOB
            await twnPage.fillCreditCheck(twnApplicationData);
        });

        await test.step('Verify TWN populated the employer card', async () => {
            // Step 8 — Assert TWN populated the employer card
            await twnPage.verifyTwnPopulated(twnApplicationData);
        });
    });
});
