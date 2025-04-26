import test, { Page } from "@playwright/test";
import { documentSearchModel } from "../state-machines/playwright/document-search.machine";

let page: Page;

test.describe('Playwright document search', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.beforeEach(async () => {
        await page.goto('https://playwright.dev/');
    });

    test.afterAll(async ({ browser }) => {
        for (let context of browser.contexts())
            await context.close();
    });

    const testPlans = documentSearchModel.getSimplePathPlans();
    testPlans.forEach((plan, _) => {
        plan.paths.forEach((path, _) => {
            test(path.description, async () => {
                await path.test(page);
            })
        })
    });
});