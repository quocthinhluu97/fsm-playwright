import { createModel } from "@xstate/test";
import { createMachine } from "xstate";
import { documentSearchEvent } from "./document-search.event";
import { DocumentSearchPage } from "../../pages/playwright/document-search.page";

const documentSearchMachine = createMachine({
    predictableActionArguments: true,
    id: 'documentSearch',
    initial: 'idle',
    states: {
        idle: {
            on: {
                PERFORM_SEARCH: 'resultsFound',
                PERFORM_INVALID_SEARCH: 'noResults',
            },
            meta: {
                test: async (documentSearchPage: DocumentSearchPage) => {
                    await documentSearchPage.verifyNavBarTitle(); 
                }
            }
        },
        resultsFound: {
            on: {
                RESET_SEARCH: 'readyForNextSearch',
            },
            meta: {
                test: async (documentSearchPage: DocumentSearchPage) => {
                    await documentSearchPage.verifyResultsFound(); 
                }
            }
        },
        noResults: {
            on: {
                RESET_SEARCH: 'readyForNextSearch',
            },
            meta: {
                test: async (documentSearchPage: DocumentSearchPage) => {
                    await documentSearchPage.verifyNoResultsFound(); 
                }
            }
        },
        readyForNextSearch: {
            type: 'final',
            meta: {
                test: async (documentSearchPage: DocumentSearchPage) => {
                    await documentSearchPage.verifyNavBarTitle(); 
                }
            }
        },
    }
});

const documentSearchModel = createModel(documentSearchMachine).withEvents(documentSearchEvent);

export { documentSearchModel }
