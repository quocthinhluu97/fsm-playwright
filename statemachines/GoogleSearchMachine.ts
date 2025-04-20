import { createMachine } from 'xstate';
import { createModel } from '@xstate/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

export const createGoogleSearchModel = (page: GoogleSearchPage) => {
    const machine = createMachine({
        predictableActionArguments: true,
        id: 'googleSearch',
        initial: 'IDLE',
        states: {
            IDLE: {
                meta: {
                    test: async () => await page.verifyIdle()
                },
                on: {
                    PERFORM_SEARCH: 'RESULTS_FOUND',
                    PERFORM_INVALID_SEARCH: 'NO_RESULTS_FOUND',
                },
            },
            RESULTS_FOUND: {
                meta: {
                    test: async () => await page.verifyResultsFound()
                },
                on: {
                    RESET_SEARCH: 'IDLE',
                },
            },
            NO_RESULTS_FOUND: {
                meta: {
                    test: async () => await page.verifyNoResultsFound()
                },
                on: { 
                    RESET_SEARCH: 'IDLE' 
                },
            },
        },
    });

    const model = createModel(machine).withEvents({
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
        }
    });

    return model;
};

export const getShortestPathPlans = (page: GoogleSearchPage) => {
    const model = createGoogleSearchModel(page);
    return model.getSimplePathPlans();
}; 