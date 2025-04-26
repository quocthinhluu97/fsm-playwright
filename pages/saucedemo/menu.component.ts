import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class MenuComponent {
    readonly page: Page;
    
    // Selectors
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('button', { hasText: 'Open Menu'});
        this.logoutLink = page.locator('//a[contains(text(), "Logout")]');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }
}
