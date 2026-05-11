import { randomEmail } from '../utils/dataGenerator';
import { SHARED } from './shared';

/**
 * Test data for the TWN (The Work Number) vendor monitor.
 * SSNs sourced from DEV TEST DATA tab → "TEST SSNS — THE WORK NUMBER".
 *
 * Available TWN sandbox SSNs:
 *   799-00-5059  →  Total Income: $83,200
 *   799-00-5144  →  Total Income: $173,306
 *   666-00-0114  →  Total Income: $1,031,104
 *   799-00-5001  →  Total Income: $85,000
 */
export const twnApplicationData = {
    propertyType: SHARED.propertyType, // 'Single Family' | '2-4 Unit' | 'Condo'
    loanPurpose:  SHARED.loanPurpose,  // 'Debt Consolidation' | 'Home Improvement' | 'Other'

    property: {
        address:        SHARED.street,
        city:           SHARED.city,
        state:          SHARED.state,
        zip:            SHARED.zip,
        isListed:       SHARED.isListed,       // No — not listed for sale
        heldInTrust:    SHARED.heldInTrust,    // No
        estimatedValue: SHARED.estimatedValue,
        usage:          SHARED.usage,
    },

    borrower: {
        firstName:   SHARED.firstName,
        lastName:    SHARED.lastName,
        email:       randomEmail(),  // unique per run — avoids duplicate account errors
        phoneNumber: SHARED.phoneNumber,
        password:    'TestPass1!',   // meets: 9 chars, uppercase, lowercase, number, special
        consentToElectronicRecords: true,
    },

    creditCheck: {
        ssn:         '799005144',   // TEST SSNS — THE WORK NUMBER: 799-00-5144
        dateOfBirth: '05/10/1978',  // DOB paired with 799-00-5144 sandbox record
    },

    expectedIncome: {
        companyName:             'Enterprise One-Verifier Integrations Only', // TWN sandbox employer
        totalAnnualCompensation: '$173,306',  // displayed as currency text in the card
        startDate:               null,        // null = skip assertion (start date may vary)
    },
};
