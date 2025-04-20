import { test, Page } from '@playwright/test';
import { createModel } from '@xstate/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';
// import { createGoogleSearchMachine } from '../statemachines/GoogleSearchMachine';
// import { createGoogleSearchEvents } from '../statemachines/GoogleSearchEvents';

import { createMachine } from 'xstate';
import { createGoogleSearchMachine } from '../statemachines/GoogleSearchMachine';
import { interpret } from 'xstate';

let page: Page;
let googleSearchPage: GoogleSearchPage;

test.describe('Google Search State Machine Coverage Tests', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        googleSearchPage = new GoogleSearchPage(page);
    });

    test.beforeEach(async () => {
        await googleSearchPage.goto();
    });

    test.afterAll(async () => {
        await page.close();
    });

    // Create the test model
    // const googleSearchMachine = createGoogleSearchMachine(googleSearchPage);
    // const events = createGoogleSearchEvents(googleSearchPage);
    
    // const testModel = createModel(googleSearchMachine).withEvents(events);

    test('should handle multiple searches without reset', async () => {
        const service = interpret(createGoogleSearchMachine).start();
        // await events.PERFORM_SEARCH();
    });

    // Test all possible paths
    test.describe('Path Coverage Tests', () => {
        const testPlans = testModel.getShortestPathPlans();
        
        test(`State machine should have ${testPlans.length} different paths`, () => {
            console.log('Total number of paths:', testPlans.length);
        });

        testPlans.forEach((plan) => {
            test(plan.description, async () => {
                await plan.test({ page: googleSearchPage });
            });
        });

        test('Coverage report', () => {
            testModel.testCoverage();
        });
    });

    // Test specific scenarios
    test.describe('Specific Scenario Tests', () => {
        test('should handle multiple searches without reset', async () => {
            await events.PERFORM_SEARCH();
            await events.RESET_SEARCH();
            await events.PERFORM_SEARCH();
        });

        test('should handle alternating valid and invalid searches', async () => {
            await events.PERFORM_SEARCH();
            await events.RESET_SEARCH();
            await events.PERFORM_INVALID_SEARCH();
            await events.RESET_SEARCH();
            await events.PERFORM_SEARCH();
        });

        test('should handle multiple invalid searches', async () => {
            await events.PERFORM_INVALID_SEARCH();
            await events.RESET_SEARCH();
            await events.PERFORM_INVALID_SEARCH();
        });
    });

    // Test edge cases
    test.describe('Edge Cases', () => {
        test('should handle rapid state transitions', async () => {
            // Quickly alternate between states
            for (let i = 0; i < 3; i++) {
                await events.PERFORM_SEARCH();
                await events.RESET_SEARCH();
            }
        });

        test('should handle reset from any state', async () => {
            // Test reset from resultsFound
            await events.PERFORM_SEARCH();
            await events.RESET_SEARCH();

            // Test reset from noResults
            await events.PERFORM_INVALID_SEARCH();
            await events.RESET_SEARCH();
        });
    });
}); 