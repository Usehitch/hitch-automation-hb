import { randomEmail } from '../utils/dataGenerator';
import { SHARED } from './shared';

export const applicationData = {
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
};

export const coBorrowerApplicationData = {
    ...applicationData,
    applicant: {
        ...applicationData.applicant,
        email: randomEmail(),  // fresh email — avoids "already associated" error when solo test ran first
    },
    coBorrower: {
        hasCoBorrower: true,
        firstName:    'Amy',
        lastName:     'America',
        email:        randomEmail(),
        ssn:          '500-22-2000',   // Method Fi sandbox test SSN for co-borrower
        dateOfBirth:  '05/10/1978',
        phoneNumber:  '5121231114',
    },
    offerReview: {
        ...applicationData.offerReview,
        // acknowledgeDtiLimit handled automatically — checkbox detected by visibility, not data flag
    },
};
