import { createMachine } from 'xstate';
import { GOOGLE_SEARCH_EVENTS } from './GoogleSearchEvents';
import { createModel } from '@xstate/test';
import { GoogleSearchPage } from '../../pages/GoogleSearchPage';

const googleSearchMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5RQPYqgGzAZTAQwCcBjACwDoBLCLAYgAUBRAJQDEB5JgWQH1sGBBJgGEAEgG0ADAF1EoAA4pYFAC4UUAO1kgAHogCMADgBsAGhABPRACYAzDbITHEvQFYrLgwHYDATglGAXwCzVHQsXEJSSmowemZ2Lm4ASQA5ADV+ABkkgBFeAWFxaS0FJVUNLV0EQ1MLfRsrBydXdy9ffyCQtEwcfGJyAjgAVwxlWBYUIfUIGiYGPgAVfMFRSRkkEFKVNU0NqqtPTzIXHxtvCRc9TxdvPTNLaoNGl2a3D28-QOCQUJ6I-rI6hQTGGo1gs3mDCWfBWRXW8kU2wqe2sh2Op3Ol2ut3uiAMemOQW+QIgcC0v3CfVIJUR5V2oCqAFpag9mZ0ft1KZFyFQsDSyjtKogACxWXEIKx6HxkHwvZxvNp+Fzsim9blkQawEZjCZTCD8pH0nQilxGMhXKUXLE3fHiqwHGV6IxGfE+dzClw3ZXfVX-KJAkFasEGulChAes0WpXWnF1BA+I7uJwvYxWIw2CQ2IkBIA */
    predictableActionArguments: true,
    id: 'googleSearch',
    initial: 'IDLE',
    states: {
        IDLE: {
            on: {
                PERFORM_SEARCH: 'RESULTS_FOUND',
                PERFORM_INVALID_SEARCH: 'NO_RESULTS_FOUND',
            },
        },
        RESULTS_FOUND: {
            on: {
                RESET_SEARCH: 'IDLE',
            },
            meta: {
                test: async (googleSearchPage: GoogleSearchPage) => {
                    await googleSearchPage.verifyResultsFound();
                }
            }
        },
        NO_RESULTS_FOUND: {
            on: {
                RESET_SEARCH: 'IDLE'
            },
        },
    },
});

const googleSearchModel = createModel(googleSearchMachine).withEvents({...GOOGLE_SEARCH_EVENTS});

const googleSearchSimplePathPlans = googleSearchModel.getSimplePathPlans();
const googleSearchShortestPathPlans = googleSearchModel.getShortestPathPlans();

export {
    googleSearchShortestPathPlans,
    googleSearchSimplePathPlans
}
