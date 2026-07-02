import { randomEmail } from '../utils/dataGenerator';
import { SHARED } from './shared';

/**
 * Builds a fresh single-borrower application payload with a NEW applicant email
 * on every call.
 *
 * This MUST be a factory, not a module-level const: Node caches the module, so a
 * const's email is frozen for the worker's lifetime. Any spec that FINALIZES a
 * pre-qual with a reused email trips "This email is already associated with an
 * existing application" and the form can't advance past Application Details.
 * That happens two ways: (1) two create-flow specs sharing a worker reuse the
 * same frozen email, and (2) a Playwright retry reuses the prior attempt's
 * email. Call this once inside each create-flow test body so every run
 * (including retries) gets an unused email. See [[makeCoBorrowerApplicationData]].
 */
export const makeApplicationData = () => ({
    property: {
        address: {
            street:  SHARED.street,
            unit:    '',               // optional
            city:    SHARED.city,
            county:  SHARED.county,
            state:   SHARED.state,
            zip:     SHARED.zip,
        },
        usage:          SHARED.usage,
        buildingType:   SHARED.buildingType, // 'Single Family' | 'Condo' | '2-4 Unit'
        isListed:       SHARED.isListed,     // false = "Not listed for sale"
        estimatedValue: SHARED.estimatedValue,
        heldInTrust:    SHARED.heldInTrust,  // false = No
    },
    applicant: {
        firstName:    SHARED.firstName,
        lastName:     SHARED.lastName,
        email:        randomEmail(),
        ssn:          '999603333',           // Test SSN — Method Fi sandbox
        dateOfBirth:  '01/15/1985',
        phoneNumber:  SHARED.phoneNumber,
        incomeSources: ['Salary or hourly wages'], // one or more: 'Salary or hourly wages' | 'Self Employed' | 'Benefits Income' | 'Rental Income' | 'Other'
        job: {
            companyName:             'Hitch',
            totalAnnualCompensation: '220000',
            startDate:               '01/01/2020',
        },
        loanPurpose: SHARED.loanPurpose,     // 'Debt Consolidation' | 'Home Improvement' | 'Other'
    },
    coBorrower: {
        hasCoBorrower: false,
    },
    consent: {
        softCreditCheck: true,
        brokerMloName:   'Ace Simon Gebilaguin', // Broker MLO Name for Step 4 signature
    },
    mortgages: {
        freeAndClear:        false, // true = "They own the property free and clear"
        selectFirstMortgage: true,  // true = select the first mortgage returned (e.g. CHASE)
        annualHoaFee:        '0',
        requestedLoanAmount: '100000',
    },
    offerReview: {
        changeLoanAmount:     false,  // true = open CHANGE modal and set newLoanAmount below
        newLoanAmount:        '50000',
        expectedInterestRate: null,   // e.g. '8.94%' — null = assert any % is shown (dynamic)
        debtPayoff: {
            manage:             true,  // true = click MANAGE to open the payoff modal
            expectedDti:        null,  // dynamic — skip exact DTI assertion
            saveDebtPayoffPlan: true,  // true = click SAVE DEBT PAYOFF PLAN to close modal
        },
        initialDraw: {
            edit:                  true,  // true = click EDIT to open upfront draw modal
            expectedAvailableDraw: null,  // e.g. '$100,000.00' — null = just assert row visible
            drawPercent:           75,    // target % (75–100); slider nudged via arrow keys
            confirm:               true,  // true = click CONFIRM to save and close modal
        },
        // acknowledgeDtiLimit handled automatically — checkbox detected by visibility, not data flag
    },
});

/**
 * Frozen single-borrower instance for specs that only READ static fields (e.g.
 * `consent.brokerMloName`) or fill the form WITHOUT finalizing a new pre-qual.
 * Any spec that creates an application must call [[makeApplicationData]] instead
 * so it gets a unique email — see the factory comment above.
 */
export const applicationData = makeApplicationData();

/**
 * Builds a fresh application payload whose ONLY income source is Self Employed.
 *
 * Same factory rationale as [[makeApplicationData]] — call inside each test
 * body so every run/retry gets an unused email. The Self Employed checkbox
 * reveals an "Add Business" editor with a single required field (Total Annual
 * Compensation); `applicant.business` feeds it. `applicant.job` is left in
 * place but unused — fillJobDetails only runs when 'Salary or hourly wages'
 * is among the income sources.
 */
export const makeSelfEmployedApplicationData = () => {
    const data = makeApplicationData();
    return {
        ...data,
        applicant: {
            ...data.applicant,
            incomeSources: ['Self Employed'],
            business: {
                totalAnnualCompensation: '220000',
            },
        },
    };
};

/**
 * Builds a fresh co-borrower application payload with NEW applicant and
 * co-borrower emails on every call.
 *
 * Same factory rationale as [[makeApplicationData]] — a module-cached const's
 * emails are fixed for the worker's lifetime, so on a Playwright retry the first
 * (failed) attempt has already created the co-borrower invitation and reusing the
 * same email trips "This email is already associated to a coborrower invitation".
 * Call this once inside each test body so every attempt gets unused emails.
 */
export const makeCoBorrowerApplicationData = () => ({
    ...makeApplicationData(), // fresh applicant email
    coBorrower: {
        hasCoBorrower: true,
        firstName:    'Amy',
        lastName:     'America',
        email:        randomEmail(),
        ssn:          '500-22-2000',   // Method Fi sandbox test SSN for co-borrower
        dateOfBirth:  '05/10/1978',
        phoneNumber:  '5121231114',
    },
});
