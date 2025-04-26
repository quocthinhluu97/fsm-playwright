import { expect, Locator, Page } from "@playwright/test";

export class DocumentSearchPage {
    readonly page: Page;

    readonly searchInput: Locator;
    readonly searchPopup: Locator;
    readonly navBarTitle: Locator;
    readonly searchHitItems: Locator;
    readonly noResultsFoundPopup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('text=Search');
        this.searchPopup = page.locator('#docsearch-input');
        this.navBarTitle = page.locator('.navbar__title');
        this.searchHitItems = page.locator('#docsearch-list .DocSearch-Hit-title >> text="text"');
        this.noResultsFoundPopup = page.locator('.DocSearch-NoResults');
    }

    async searchTerm(term: string) {
        await this.searchInput.click();
        await this.searchPopup.fill(term);
    }

    async navigate() {
        await this.page.goto('https://playwright.dev/');
    }

    async verifyNavBarTitle() {
        await expect(this.navBarTitle).toHaveText('Playwright');
    }

    async verifyResultsFound() {
        await expect(this.searchHitItems.first()).toBeVisible();
    }

    async verifyNoResultsFound() {
        await expect(this.noResultsFoundPopup).toBeVisible();
    }
}