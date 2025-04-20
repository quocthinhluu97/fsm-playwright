import { Page } from '@playwright/test';
import { MenuComponent } from './menu.component';

export class BasePage {
    protected page: Page;
    readonly menu: MenuComponent;
    constructor(page: Page) {
        this.page = page;
        this.menu = new MenuComponent(page);
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }
}