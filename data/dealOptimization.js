import { randomEmail } from '../utils/dataGenerator';
import { applicationData } from './newApplication';

/**
 * LO - Deal Optimization test data.
 *
 * Drives the two DTI-optimization levers on the Offer Review (Pre-Qualification
 * Summary) step:
 *   • changeLoanAmount → reduce the requested loan amount via the CHANGE modal
 *     (a smaller HELOC means a smaller new payment, which lowers DTI).
 *   • debtPayoff.manage → open the debt payoff modal and select debts to pay off
 *     (removing a debt's monthly payment recalculates "DTI After Proposed Payoff").
 *
 * Built off applicationData so property / applicant / mortgage inputs stay in one
 * place — only the offerReview levers differ. initialDraw.edit is turned off to
 * keep the test focused on the two optimization tools (the upfront-draw modal is
 * covered by pre-qual-manual.spec.js).
 */
export const dealOptimizationData = {
    ...applicationData,
    applicant: {
        ...applicationData.applicant,
        email: randomEmail(), // fresh email — avoids "already associated" collisions
    },
    offerReview: {
        ...applicationData.offerReview,
        changeLoanAmount: true,     // exercise the loan-amount optimization lever
        newLoanAmount:    '50000',  // reduced from the requested 100000
        debtPayoff: {
            manage:             true,  // open MANAGE to select debts to pay off
            expectedDti:        null,  // DTI is dynamic — asserted by recalculation, not exact value
            saveDebtPayoffPlan: true,  // persist the payoff plan
        },
        initialDraw: {
            ...applicationData.offerReview.initialDraw,
            edit: false,  // out of scope for deal optimization
        },
    },
};
