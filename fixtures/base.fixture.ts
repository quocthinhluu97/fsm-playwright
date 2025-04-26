import { DocumentSearchPage } from "../pages/playwright/document-search.page";
import { test as base } from '@playwright/test';

type BaseFixture = {
    documentSearchPage: DocumentSearchPage;
}

export const test = base.extend<BaseFixture>({
    documentSearchPage: async ({page}, use) => {
        const documentSearchPage = new DocumentSearchPage(page);
        await documentSearchPage.navigate(); 
        await use(documentSearchPage);
    }
});

export { expect } from '@playwright/test';