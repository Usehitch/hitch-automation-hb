/**
 * Test data for the co-borrower DTC (Direct-to-Consumer) end-to-end flow.
 *
 * Two scenarios are exported:
 *   marriedCoBorrowerData   — primary borrower is married; co-borrower added
 *   unmarriedCoBorrowerData — primary borrower is unmarried; co-borrower added
 *
 * Both share the same property address and test SSNs so they exercise the
 * same loan parameters, differing only in marital status.
 *
 * SSNs are Method Fi + TWN sandbox values — do NOT use real SSNs.
 */

import { randomEmail } from '../utils/dataGenerator';
import { SHARED } from './shared';

// ---------------------------------------------------------------------------
// Shared fragments — DRY helpers for the two scenarios
// ---------------------------------------------------------------------------

/** Co-borrower personal info — same in both scenarios */
const BASE_CO_BORROWER = {
    firstName:   'Amy',
    lastName:    'America',
    phoneNumber: '5121231114',
    // email is generated per-scenario below to avoid duplicate-account errors
};

/** Property info — reuses the shared test address used across all tests */
const BASE_PROPERTY = {
    address:        SHARED.street,          // 4556 Eliot St
    city:           SHARED.city,            // Denver
    county:         SHARED.county,          // Denver
    state:          SHARED.state,           // Colorado
    zip:            SHARED.zip,             // 80211
    isListed:       SHARED.isListed,        // false — not listed for sale
    heldInTrust:    SHARED.heldInTrust,     // false
    estimatedValue: SHARED.estimatedValue,  // 500000
    usage:          SHARED.usage,           // Primary Residence
};

// ---------------------------------------------------------------------------
// Married co-borrower scenario
// ---------------------------------------------------------------------------
/**
 * Builds the Married-scenario payload with NEW borrower and co-borrower emails
 * on every call.
 *
 * This MUST be a factory, not a module-level const: Node caches the module, so
 * a const's emails are fixed for the worker's lifetime. On a Playwright retry
 * the first (failed) attempt has already created those accounts/invitations, so
 * reusing the same emails trips duplicate-account / "already associated" errors.
 * Call this once inside each test body so every attempt (including retries) gets
 * unused emails.
 */
export const makeMarriedCoBorrowerData = () => ({
    propertyType: SHARED.propertyType,   // 'Single Family'
    loanPurpose:  SHARED.loanPurpose,    // 'Home Improvement'

    property: BASE_PROPERTY,

    borrower: {
        firstName:                 SHARED.firstName,   // 'Andy'
        lastName:                  SHARED.lastName,    // 'America'
        email:                     randomEmail(),      // unique per run
        phoneNumber:               SHARED.phoneNumber, // '5121231113'
        password:                  'TestPass1!',
        consentToElectronicRecords: true,
        maritalStatus:             'Married',
        hasCoBorrower:             true,
    },

    creditCheck: {
        ssn:         '999-60-3333',   // TWN sandbox record — Method Fi dev
        dateOfBirth: '05/10/1978',
    },

    primaryIncome: {
        incomeSources:      ['Salary or Hourly Wages'],
        companyName:        'Hitch',
        annualCompensation: '300000',
        startDate:          '10/25/2020',
    },

    coBorrower: {
        ...BASE_CO_BORROWER,
        email:       randomEmail(),
        ssn:         '500-60-2222',   // Method Fi sandbox test SSN
        dateOfBirth: '01/15/1985',
        // Income sources on the Application Participants page
        incomeSources:       ['Salary or hourly wages'],
        companyName:         'Hitch',
        annualCompensation:  '200000',
        startDate:           '12/29/2004',
        livesWithBorrower:   true,   // "Does co-borrower live with you?"
    },

    // Marital status + who the borrower is married to (Application Participants)
    participants: {
        marriedTo:        'Co-Borrower',  // 'Co-Borrower' | 'Another Person'
        otherTitleOwners: false,
    },

    // Mortgages & Liens (DTC step that follows Application Participants)
    mortgages: {
        selectFirstMortgage: true,   // check the first listed mortgage row
        requestedLoanAmount: '180000', // Requested Loan Amount field
    },
});

// ---------------------------------------------------------------------------
// Unmarried co-borrower scenario
// ---------------------------------------------------------------------------
/**
 * Builds the Unmarried-scenario payload. Starts from a fresh Married payload
 * (so emails are freshly generated) and overrides marital status, the
 * scenario-specific loan amount, and the participants block. See
 * makeMarriedCoBorrowerData for why this is a factory.
 */
export const makeUnmarriedCoBorrowerData = () => {
    const base = makeMarriedCoBorrowerData();
    return {
        ...base,

        borrower: {
            ...base.borrower,
            maritalStatus: 'Unmarried',
        },

        participants: {
            marriedTo:        null,  // not applicable when Unmarried
            otherTitleOwners: false,
        },

        mortgages: {
            selectFirstMortgage: true,
            requestedLoanAmount: '250000',
        },
    };
};
