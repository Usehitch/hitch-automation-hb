import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import PreQualManualPage from '../pages/Pre-Qual Manual/PreQualManualPage';
import NewApplicationPage from '../pages/Pre-Qual Manual/NewApplicationPage';
import MortgagesAndLiensPage from '../pages/Pre-Qual Manual/MortgagesAndLiensPage';
import OfferReviewPage from '../pages/Pre-Qual Manual/OfferReviewPage';
import ConsentsPage from '../pages/Pre-Qual Manual/ConsentsPage';
import ConfirmationPage from '../pages/Pre-Qual Manual/ConfirmationPage';
import ActivePage from '../pages/My Loans/ActivePage';
import MloCertificationModal from '../pages/My Loans/MloCertificationModal';
import LoanDetailPage from '../pages/My Loans/LoanDetailPage';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    preQualManualPage: async ({ page }, use) => {
        await use(new PreQualManualPage(page));
    },

    newApplicationPage: async ({ page }, use) => {
        await use(new NewApplicationPage(page));
    },

    mortgagesAndLiensPage: async ({ page }, use) => {
        await use(new MortgagesAndLiensPage(page));
    },

    offerReviewPage: async ({ page }, use) => {
        await use(new OfferReviewPage(page));
    },

    consentsPage: async ({ page }, use) => {
        await use(new ConsentsPage(page));
    },

    confirmationPage: async ({ page }, use) => {
        await use(new ConfirmationPage(page));
    },

    activePage: async ({ page }, use) => {
        await use(new ActivePage(page));
    },

    mloCertificationModal: async ({ page }, use) => {
        await use(new MloCertificationModal(page));
    },

    loanDetailPage: async ({ page }, use) => {
        await use(new LoanDetailPage(page));
    },
});

export { expect } from '@playwright/test';
