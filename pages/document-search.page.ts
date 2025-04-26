import { Locator, Page } from "@playwright/test";

export class DocumentSearch {
    readonly page: Page;

    readonly searchInput: Locator;
    readonly searchPopup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('text=Search');
        this.searchPopup = page.locator('#docsearch-input');
    }

    async searchTerm(term: string) {
        await this.searchInput.click();
        await this.searchPopup.fill(term);
    }

    async navigate() {
        await this.page.goto('https://playwright.dev/');
    }
}