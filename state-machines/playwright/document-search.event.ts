import { Page } from "@playwright/test";
import { DocumentSearchPage } from "../../pages/playwright/document-search.page";

const documentSearchEvent = ({
    PERFORM_SEARCH: async (documentSearchPage: DocumentSearchPage) => {
        const validSearchTerm = 'Text selector';
        // let documentSearch = new DocumentSearchPage(page);
        await documentSearchPage.searchTerm(validSearchTerm);
    },
    PERFORM_INVALID_SEARCH: async (documentSearchPage: DocumentSearchPage) => {
        const invalidSearchTerm = 'pztr';
        // let documentSearch = new DocumentSearchPage(page);
        await documentSearchPage.searchTerm(invalidSearchTerm);
    },
    RESET_SEARCH: async (documentSearchPage: DocumentSearchPage) => {
        // let documentSearch = new DocumentSearchPage(page);
        await documentSearchPage.navigate();
    },
});

export { documentSearchEvent }