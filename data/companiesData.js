/**
 * Companies test data — used by tests/companies.spec.js.
 *
 * All uniqueness-sensitive fields (display name, tag, NMLS, TPO ID, phone,
 * email) are generated fresh on every module import so parallel runs and
 * back-to-back runs never collide.
 *
 * Realistic company names, US addresses, and industry-standard identifiers
 * are used so data looks authentic in the portal and is easy to spot in logs.
 */

import { randomEmail } from '../utils/dataGenerator';

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

/** Random 7-digit NMLS number (industry standard length). */
const randomNmls   = () => String(Math.floor(1000000  + Math.random() * 9000000));

/** Random 5-digit TPO ID. */
const randomTpoId  = () => String(Math.floor(10000    + Math.random() * 90000));

/** Random 10-digit US phone — starts with 2–9 to avoid invalid prefixes. */
const randomPhone  = () => String(Math.floor(2000000000 + Math.random() * 7999999999));

/** 5-char uppercase alphanumeric suffix — collision-proof within same millisecond. */
const randomSuffix = () => Math.random().toString(36).substring(2, 7).toUpperCase();

const ts = Date.now();

// ---------------------------------------------------------------------------
// Create company — submitted via the "Add New Company" modal
// ---------------------------------------------------------------------------

export const createCompanyData = {
    // Company Details
    // Display name and tag are unique per run; full legal name is realistic.
    displayName:  `Pacific Coast Lending ${randomSuffix()}`,
    tag:          `pcl-${ts}`,
    fullName:     'Pacific Coast Lending Group LLC',
    phone:        randomPhone(),
    email:        randomEmail(),

    // Address Information — real Santa Monica, CA business district address
    street:       '2450 Colorado Ave',
    state:        'California',
    postalCode:   '90404',
    city:         'Santa Monica',

    // License Information
    nmls:         randomNmls(),
    tpoId:        randomTpoId(),
    privacyUrl:   'https://pacificcoastlending.com/privacy',
    termsUrl:     'https://pacificcoastlending.com/terms',
};

// ---------------------------------------------------------------------------
// Edit company — independent values submitted via the "Edit Company" modal
//
// All four fields are regenerated independently from createCompanyData so
// the edit test verifies a real data change, not just a no-op update.
// ---------------------------------------------------------------------------

export const editCompanyData = {
    displayName:  `Pacific Coast Financial ${randomSuffix()}`,
    fullName:     'Pacific Coast Financial Partners LLC',
    nmls:         randomNmls(),
    tpoId:        randomTpoId(),
};
