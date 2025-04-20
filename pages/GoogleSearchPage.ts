import { Page, Locator, expect } from '@playwright/test';

export class GoogleSearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchResults: Locator;
    readonly noResultsMessage: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('textarea[name="q"]');
        this.searchResults = page.locator('//h3[text()[contains(.,"Playwright: Fast and reliable")]]');
        this.noResultsMessage = page.locator('//*[text()[contains(.,"did not match any documents.")]]');
        this.acceptCookiesButton = page.locator('//*[text()="Accept all"]');
    }

    async goto() {
        await this.page.goto('https://www.google.com');
        await this.acceptCookiesIfPresent();
    }

    async acceptCookiesIfPresent() {
        if (await this.acceptCookiesButton.count() > 0) {
            await this.acceptCookiesButton.click();
        }
    }

    async search(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.page.press('textarea[name="q"]', 'Enter');
    }

    async verifyIdle() {
        await expect(this.page.url()).toContain('https://www.google.com');
        await expect(this.searchInput).toBeVisible();
    }

    async verifyResultsFound() {
        await expect(this.searchResults).toBeVisible();
    }

    async verifyNoResultsFound() {
        await expect(this.noResultsMessage).toBeVisible();
    }
}