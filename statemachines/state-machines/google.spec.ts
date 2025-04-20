import { test, Page } from '@playwright/test';
import { createModel } from '@xstate/test';
import { GoogleSearchPage } from '../../pages/GoogleSearchPage';
import { createGoogleSearchMachine } from '../GoogleSearchMachine';
import { createGoogleSearchEvents } from '../GoogleSearchEvents';

let page: Page;
let googleSearchPage: GoogleSearchPage;

test.describe('Google Search Tests with XState Model', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        googleSearchPage = new GoogleSearchPage(page);
    });

    test.beforeEach(async () => {
        await googleSearchPage.goto();
    });

    test.afterAll(async () => {
        await page.close();
    });

    const googleSearchMachine = createGoogleSearchMachine(googleSearchPage);
    const events = createGoogleSearchEvents(googleSearchPage);

    const testModel = createModel(googleSearchMachine, {
        events: events,
    });

    const testPlans = testModel.getSimplePathPlans();
    testPlans.forEach((plan) => {
        plan.paths.forEach((path) => {
            test(path.description, async () => {
                await path.test(page);
            });
        });
    });
});