import { LoginPage } from "../../pages/saucedemo/login.page";
import { MenuComponent } from "../../pages/saucedemo/menu.component";


export const saucedemoEvents = ({
    LOGIN: {
        exec: async (loginPage: LoginPage, {username, password}: {username: string, password: string}) => {
            await loginPage.login(username, password);
        }
    },
    LOGOUT: {
        exec: async (menuComponent: MenuComponent) => {
            await menuComponent.openMenu();
            await menuComponent.logout();
        },
    },
}); 
    // GO_TO_CART: async () => {
    //     const inventoryPage = new InventoryPage(page);
    //     await inventoryPage.goToCart();
    // },
    // LOGOUT: async () => {