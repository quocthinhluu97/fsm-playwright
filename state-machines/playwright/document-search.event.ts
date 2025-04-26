import { DocumentSearchPage } from "../../pages/playwright/document-search.page";

const documentSearchEvent = ({
    PERFORM_SEARCH: async (documentSearchPage: DocumentSearchPage) => {
        const validSearchTerm = 'Text selector';
        await documentSearchPage.searchTerm(validSearchTerm);
    },
    PERFORM_INVALID_SEARCH: async (documentSearchPage: DocumentSearchPage) => {
        const invalidSearchTerm = 'pztr';
        await documentSearchPage.searchTerm(invalidSearchTerm);
    },
    RESET_SEARCH: async (documentSearchPage: DocumentSearchPage) => {
        await documentSearchPage.navigate();
    },
});

export { documentSearchEvent }