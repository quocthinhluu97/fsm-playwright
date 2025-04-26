import { createModel } from "@xstate/test";
import { createMachine } from "xstate";
import { documentSearchEvent } from "./document-search.event";

const documentSearchMachine = createMachine({
    predictableActionArguments: true,
    id: 'documentSearch',
    initial: 'idle',
    states: {
        idle: {
            on: {
                PERFORM_SEARCH: 'resultsFound',
                PERFORM_INVALID_SEARCH: 'noResults',
            }
        },
        resultsFound: {
            on: {
                RESET_SEARCH: 'readyForNextSearch',
            }
        },
        noResults: {
            on: {
                RESET_SEARCH: 'readyForNextSearch',
            }
        },
        readyForNextSearch: {
            type: 'final'
        }
    }
});

const documentSearchModel = createModel(documentSearchMachine).withEvents(documentSearchEvent);

export { documentSearchModel }
