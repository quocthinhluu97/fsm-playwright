import { createMachine } from 'xstate';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

export const createGoogleSearchMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5RQPYqgGzAZTAQwCcBjACwDoBLCLAYgAUBRAJQDEB5JgWQH1sGBBJgGEAEgG0ADAF1EoAA4pYFAC4UUAO1kgAHogCMADgBsAGhABPRACYAzDbITHEvQFYrLgwHYDATglGAXwCzVHQsXEJSSmowemZ2Lm4ASQA5ADV+ABkkgBFeAWFxaS0FJVUNLV0EQ1MLfRsrBydXdy9ffyCQtEwcfGJyAjgAVwxlWBYUIfUIGiYGPgAVfMFRSRkkEFKVNU0NqqtPTzIXHxtvCRc9TxdvPTNLaoNGl2a3D28-QOCQUJ6I-rI6hQTGGo1gs3mDCWfBWRXW8kU2wqe2sh2Op3Ol2ut3uiAMemOQW+QIgcC0v3CfVIJUR5V2oCqAFpag9mZ0ft1KZFyFQsDSyjtKogACxWXEIKx6HxkHwvZxvNp+Fzsim9blkQawEZjCZTCD8pH0nQilxGMhXKUXLE3fHiqwHGV6IxGfE+dzClw3ZXfVX-KJAkFasEGulChAes0WpXWnF1BA+I7uJwvYxWIw2CQ2IkBIA */
    predictableActionArguments: true,
    id: 'googleSearch',
    initial: 'idle',
    states: {
        idle: {
            on: {
                PERFORM_SEARCH: 'resultsFound',
                PERFORM_INVALID_SEARCH: 'noResults',
            },
        },
        resultsFound: {
            on: {
                RESET_SEARCH: 'idle',
            },
        },
        noResults: {
            on: { 
                RESET_SEARCH: 'idle' 
            },
        },
    },
}); 