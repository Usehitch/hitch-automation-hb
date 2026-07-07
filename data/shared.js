/**
 * Shared test constants reused across application data files.
 * Update here and all tests pick up the change automatically.
 */
export const SHARED = {
    // -- Property ----------------------------------------------------------
    street:         '4556 Eliot St',
    city:           'Denver',
    county:         'Denver',   // Denver County, CO
    state:          'Colorado',
    zip:            '80211',
    isListed:       false,        // not listed for sale
    heldInTrust:    false,
    estimatedValue: '500000',
    usage:          'Primary Residence',

    // -- Property / building type ------------------------------------------
    buildingType:   'Single Family', // broker portal label
    propertyType:   'Single Family', // DTC borrower flow label

    // -- Loan --------------------------------------------------------------
    loanPurpose:    'Home Improvement',

    // -- Borrower ----------------------------------------------------------
    firstName:      'Andy',
    lastName:       'America',
    phoneNumber:    '3855130513',  // Method Fi dev sandbox phone
};
