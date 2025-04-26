import { Page } from "@playwright/test";
import { DocumentSearch } from "../../pages/document-search.page";

const documentSearchEvent = ({
    PERFORM_SEARCH: async (page: Page) => {
        const validSearchTerm = 'Text selector';
        let documentSearch = new DocumentSearch(page);
        await documentSearch.searchTerm(validSearchTerm);
    },
    PERFORM_INVALID_SEARCH: async (page: Page) => {
        const invalidSearchTerm = 'pztr';
        let documentSearch = new DocumentSearch(page);
        await documentSearch.searchTerm(invalidSearchTerm);
    },
    RESET_SEARCH: async (page: Page) => {
        let documentSearch = new DocumentSearch(page);
        await documentSearch.navigate();
    },
});

export { documentSearchEvent }