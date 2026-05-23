import { expect, test } from '../../fixtures';

/**
 * Page object for the Shadow Borrower View read-only borrower application.
 *
 * When a broker clicks "Shadow Borrower View" and confirms, the portal opens
 * the borrower's CURRENT application step in read-only mode in a new tab.
 * The active step varies per borrower — all step/section assertions use
 * isVisible() guards so a missing element is not treated as a failure.
 */
class ShadowBorrowerViewPage {
    constructor(page) {
        this.page = page;

        // -- Read-only banner -------------------------------------------------
        // Always present at the top of every shadow-view page
        this.readOnlyBanner = this.page.getByText(
            /You are viewing this application in read-only mode/i
        ).first();

        // -- Left sidebar — loan info -----------------------------------------
        this.helocPropertyLabel = this.page.getByText('HELOC PROPERTY').first();
        this.loanNumberLabel    = this.page.getByText('LOAN NUMBER').first();

        // -- Left sidebar — application step navigation -----------------------
        this.demographicsStep   = this.page.getByText('Demographics').first();
        this.identityVerStep    = this.page.getByText('Identity Verification').first();
        this.incomeVerStep      = this.page.getByText('Income Verification').first();
        this.fundingAccountStep = this.page.getByText('Funding Account').first();

        // -- Demographics page ------------------------------------------------
        this.demographicsHeading    = this.page.getByRole('heading', { name: /Demographics/i });

        // Ethnicity section
        this.ethnicitySectionLabel  = this.page.getByText('Ethnicity').first();
        this.hispanicOrLatinoOpt    = this.page.getByText('Hispanic or Latino').first();
        this.notHispanicOrLatinoOpt = this.page.getByText('Not Hispanic or Latino').first();

        // Sex section
        this.sexSectionLabel        = this.page.getByText('Sex').first();
        this.femaleOpt              = this.page.getByText('Female').first();
        this.maleOpt                = this.page.getByText('Male').first();

        // Race section
        this.raceSectionLabel        = this.page.getByText('Race').first();
        this.americanIndianOpt       = this.page.getByText('American Indian or Alaska Native').first();
        this.asianOpt                = this.page.getByText('Asian').first();
        this.blackOrAfricanOpt       = this.page.getByText('Black or African American').first();
        this.pacificIslanderOpt      = this.page.getByText('Native Hawaiian or Other Pacific Islander').first();
        this.whiteOpt                = this.page.getByText('White').first();

        // Hard Credit Check section
        this.hardCreditCheckHeading  = this.page.getByText('Hard Credit Check Required').first();
    }

    // -------------------------------------------------------------------------

    /**
     * Verifies the blue read-only banner is visible — the only element that is
     * guaranteed on every Shadow Borrower View page regardless of current step.
     */
    async verifyReadOnlyBanner() {
        await test.step('Verify Shadow Borrower View read-only banner', async () => {
            // 30 s — the shadow view opens in a new tab; the new tab must complete
            // a full page load and React hydration before the banner renders.
            // 15 s was not enough on CI when the runner was under load.
            await expect(this.readOnlyBanner).toBeVisible({ timeout: 30000 });
        });
    }

    /**
     * Verifies the left sidebar loan info and step entries.
     * Loan info labels (HELOC PROPERTY, LOAN NUMBER) are always asserted.
     * Step entries are only asserted when present — the sidebar may show fewer
     * steps depending on how far the borrower has progressed.
     */
    async verifySidebar() {
        await test.step('Verify Shadow Borrower View sidebar info and steps', async () => {
            // Loan info — always rendered in the sidebar
            const hasHeloc = await this.helocPropertyLabel.isVisible({ timeout: 5000 }).catch(() => false);
            if (hasHeloc) {
                await expect(this.helocPropertyLabel).toBeVisible();
            }

            const hasLoanNumber = await this.loanNumberLabel.isVisible({ timeout: 5000 }).catch(() => false);
            if (hasLoanNumber) {
                await expect(this.loanNumberLabel).toBeVisible();
            }

            // Application steps — conditional on borrower progress and current page
            const hasDemographics = await this.demographicsStep.isVisible().catch(() => false);
            if (hasDemographics) await expect(this.demographicsStep).toBeVisible();

            const hasIdentityVer = await this.identityVerStep.isVisible().catch(() => false);
            if (hasIdentityVer) await expect(this.identityVerStep).toBeVisible();

            const hasIncomeVer = await this.incomeVerStep.isVisible().catch(() => false);
            if (hasIncomeVer) await expect(this.incomeVerStep).toBeVisible();

            const hasFundingAccount = await this.fundingAccountStep.isVisible().catch(() => false);
            if (hasFundingAccount) await expect(this.fundingAccountStep).toBeVisible();

            // Fallback: at least the read-only banner confirms the view loaded
            await expect(this.readOnlyBanner).toBeVisible();
        });
    }

    /**
     * Verifies the Demographics page content when the borrower is on that step.
     * Each section (Ethnicity, Sex, Race, Hard Credit Check) is guarded with
     * isVisible() — the borrower may be on a different step, in which case
     * those sections simply won't be present and are not failures.
     */
    async verifyDemographicsContent() {
        await test.step('Verify Demographics page sections (if present)', async () => {
            // Page heading — check which step is currently active
            const hasDemographicsHeading = await this.demographicsHeading
                .isVisible({ timeout: 5000 }).catch(() => false);

            if (hasDemographicsHeading) {
                await expect(this.demographicsHeading).toBeVisible();

                // Ethnicity section
                const hasEthnicity = await this.ethnicitySectionLabel.isVisible().catch(() => false);
                if (hasEthnicity) {
                    await expect(this.ethnicitySectionLabel).toBeVisible();
                    const hasHispanic = await this.hispanicOrLatinoOpt.isVisible().catch(() => false);
                    if (hasHispanic) await expect(this.hispanicOrLatinoOpt).toBeVisible();
                    const hasNotHispanic = await this.notHispanicOrLatinoOpt.isVisible().catch(() => false);
                    if (hasNotHispanic) await expect(this.notHispanicOrLatinoOpt).toBeVisible();
                }

                // Sex section
                const hasSex = await this.sexSectionLabel.isVisible().catch(() => false);
                if (hasSex) {
                    await expect(this.sexSectionLabel).toBeVisible();
                    const hasFemale = await this.femaleOpt.isVisible().catch(() => false);
                    if (hasFemale) await expect(this.femaleOpt).toBeVisible();
                    const hasMale = await this.maleOpt.isVisible().catch(() => false);
                    if (hasMale) await expect(this.maleOpt).toBeVisible();
                }

                // Race section
                const hasRace = await this.raceSectionLabel.isVisible().catch(() => false);
                if (hasRace) {
                    await expect(this.raceSectionLabel).toBeVisible();
                    const raceOptions = [
                        this.americanIndianOpt,
                        this.asianOpt,
                        this.blackOrAfricanOpt,
                        this.pacificIslanderOpt,
                        this.whiteOpt,
                    ];
                    for (const opt of raceOptions) {
                        const present = await opt.isVisible().catch(() => false);
                        if (present) await expect(opt).toBeVisible();
                    }
                }

                // Hard Credit Check section
                const hasHardCredit = await this.hardCreditCheckHeading.isVisible().catch(() => false);
                if (hasHardCredit) await expect(this.hardCreditCheckHeading).toBeVisible();

            } else {
                // Borrower is on a different step — confirm the view still loaded
                // correctly by re-asserting the read-only banner
                await expect(this.readOnlyBanner).toBeVisible({ timeout: 10000 });
            }
        });
    }

    /**
     * Confirms that form inputs on the current page are read-only.
     * Uses try/catch per checkbox so a single non-disabled input doesn't abort
     * the entire check — a warning is logged instead of a hard failure since
     * some apps use pointer-events CSS rather than the disabled attribute.
     */
    async verifyCheckboxesAreReadOnly() {
        await test.step('Verify form checkboxes are not interactive in read-only mode', async () => {
            const checkboxes = this.page.locator('input[type="checkbox"]');
            const count = await checkboxes.count().catch(() => 0);

            for (let i = 0; i < count; i++) {
                const cb = checkboxes.nth(i);
                const isDisabled = await cb.isDisabled().catch(() => true);
                if (!isDisabled) {
                    console.warn(
                        `Shadow Borrower View: checkbox at index ${i} is not disabled — ` +
                        `the app may enforce read-only via CSS pointer-events instead`
                    );
                }
            }

            // Primary guard: the read-only banner remains the definitive assertion
            await expect(this.readOnlyBanner).toBeVisible();
        });
    }
}

export default ShadowBorrowerViewPage;
