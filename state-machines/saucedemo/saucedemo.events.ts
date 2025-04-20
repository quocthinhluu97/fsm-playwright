import { createMachine } from "xstate";
import { Page } from '@playwright/test';
import { MenuComponent } from "../../pages/menu.component";
import { LoginPage } from "../../pages/Login.page";

export const saucedemoEvents = (page: Page) => ({
    LOGIN: async ({username, password}: {username: string, password: string}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
    },
    LOGOUT: async () => {
        const menu = new MenuComponent(page);
        await menu.openMenu();
        await menu.logout();
    },
    // GO_TO_CART: async () => {
    //     const inventoryPage = new InventoryPage(page);
    //     await inventoryPage.goToCart();
    // },
    // LOGOUT: async () => {
});