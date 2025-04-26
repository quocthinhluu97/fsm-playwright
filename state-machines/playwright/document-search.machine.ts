import { createModel } from "@xstate/test";
import { createMachine } from "xstate";
import { documentSearchEvent } from "./document-search.event";
import { DocumentSearchPage } from "../../pages/playwright/document-search.page";

const documentSearchMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QQPYGMCuBbMA7ALgMpgCGATmgBYB0AlhADZgDEACgKIBKAYgPKcBZAPqF2AQU4BhABIBtAAwBdRKAAOKWLXy0UuFSAAeiAIwA2YwBoQATxMAWeQF9HV1JhwFi5KnUYsOPPzCAJIAcgBqYgAywQAiIuJSckr66prauvpGCGaWNogAHMbUAKzOrujYeESkFDRkcBgM+LDcKBi4EMyc7KIAKgkSMgrKSCBpWjp6Y9klAOwAnNSLpgVzJVa2OQ7lIG5VnrU+uCicjc2w3b3sA6JDyaNqGpOZM4jzSytrG-kIRaXOFwgE4QOD6fYeGreSipZ4ZaagbIAWlMm0QKN2EOqXjqviYsPSUyyiDsACY0X8CtQ7GZTHT6Qy5pjKpCcT4GrAmi02h0IASXgjDCSAMzFYxzYzfCnGBwAoFYw7Q6gnM6ci78+HEhB2WXyYULeSmUk-LYFUnM9zYo71UgQaxtMihMAGKF1DVEt4IdZU4XrCkFKk0hnBulMwFAA */
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
