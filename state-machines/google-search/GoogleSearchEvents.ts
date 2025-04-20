import { GoogleSearchPage } from '../../pages/GoogleSearchPage';

export const GOOGLE_SEARCH_EVENTS = ({
    PERFORM_SEARCH: {
        exec: async (googleSearchPage: GoogleSearchPage) => {
            const validSearchTerm = 'Playwright';
            await googleSearchPage.search(validSearchTerm);
        }
    },
    PERFORM_INVALID_SEARCH: {
        exec: async (googleSearchPage: GoogleSearchPage) => {
            const invalidSearchTerm = 'sdafsdafasdflkj1u24oiu124';
            await googleSearchPage.search(invalidSearchTerm);
        }
    },
    RESET_SEARCH: {
        exec: async (googleSearchPage: GoogleSearchPage) => {
            await googleSearchPage.goto();
        },
    },
}); 