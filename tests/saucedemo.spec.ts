import { test, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { saucedemoSimplePathPlans, saucedemoShortestPathPlans } from '../state-machines/saucedemo/saucedemo.machine';

let page: Page;
let loginPage: LoginPage;

test.describe('Sauce Demo State Machine Coverage Tests', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test.afterAll(async ({ browser }) => {
        for (let context of browser.contexts())
            await context.close();
    });

    for (const plan of saucedemoShortestPathPlans) {
        test.describe(`${plan.description}`, () => {
            for (const path of plan.paths) {
                test(path.description, async () => {
                    await path.test({username: 'standard_user', password: 'secret_sauce', page});
                });
            }
        });
    }
}); 