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
export const marriedCoBorrowerData = {
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
        ssn:         '999405000',   // TWN sandbox record — Method Fi dev
        dateOfBirth: '05/10/1978',
    },

    coBorrower: {
        ...BASE_CO_BORROWER,
        email:       randomEmail(),
        ssn:         '999603333',   // Method Fi sandbox test SSN
        dateOfBirth: '01/15/1985',
        // Income sources on the Application Participants page
        incomeSources:       ['Salary or hourly wages'],
        companyName:         'Hitch',
        annualCompensation:  '60000',
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
        requestedLoanAmount: '80000', // Requested Loan Amount field
    },
};

// ---------------------------------------------------------------------------
// Unmarried co-borrower scenario
// ---------------------------------------------------------------------------
export const unmarriedCoBorrowerData = {
    ...marriedCoBorrowerData,

    borrower: {
        ...marriedCoBorrowerData.borrower,
        email:         randomEmail(),  // separate account — must be unique
        maritalStatus: 'Unmarried',
    },

    coBorrower: {
        ...BASE_CO_BORROWER,
        email:       randomEmail(),    // separate account — must be unique
        ssn:         '999603333',
        dateOfBirth: '01/15/1985',
        incomeSources:      ['Salary or hourly wages'],
        companyName:        'Hitch',
        annualCompensation: '60000',
        startDate:          '12/29/2004',
        livesWithBorrower:  true,
    },

    participants: {
        marriedTo:        null,  // not applicable when Unmarried
        otherTitleOwners: false,
    },

    mortgages: {
        selectFirstMortgage: true,
        requestedLoanAmount: '80000',
    },
};
