import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly page: Page;
    
    // Selectors
    private readonly usernameInput = '[data-test="username"]';
    private readonly passwordInput = '[data-test="password"]';
    private readonly loginButton = '[data-test="login-button"]';
    private readonly burgerMenu = '#react-burger-menu-btn';
    private readonly logoutLink = '#logout_sidebar_link';

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async logout() {
        await this.page.click(this.burgerMenu);
        await this.page.click(this.logoutLink);
    }

    async isLoggedOut() {
        return await this.page.isVisible(this.loginButton);
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }
} 