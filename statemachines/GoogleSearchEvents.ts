import { GoogleSearchPage } from '../pages/GoogleSearchPage';

export const createGoogleSearchEvents = (page: GoogleSearchPage) => ({
    PERFORM_SEARCH: async () => {
        const validSearchTerm = 'Playwright';
        await page.search(validSearchTerm);
    },
    PERFORM_INVALID_SEARCH: async () => {
        const invalidSearchTerm = 'sdafsdafasdflkj1u24oiu124';
        await page.search(invalidSearchTerm);
    },
    RESET_SEARCH: async () => {
        await page.goto();
    },
}); 