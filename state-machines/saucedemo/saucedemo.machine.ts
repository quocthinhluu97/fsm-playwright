import { createModel } from "@xstate/test";
import { createMachine } from "xstate";
import { saucedemoEvents } from "./saucedemo.events";
import { LoginPage } from "../../pages/saucedemo/login.page";
import { MenuComponent } from "../../pages/saucedemo/menu.component";

const saucedemoMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5SwIYFcDGkwFsD2AdAHIDyAKgPoAyJA4gJJEDENDRA2gAwC6ioADnlgBLAC7C8AOz4gAHogCMADk4EArAHYlCgExqANCACeibeoC+5w6kzZ8BRgDUAokTIkASgE0mtEhXcKAGEAQQ8yLl4kEEERcSkZeQQAFgBmBQIFTgBOVI0DY1MMtUtrdCwIXEJQ8N9yAP8ggAlnIIBpEgBVCJ4ZWLEJaWikjSyCTmSANiV8wxMEMxLSkEk8SvhomwqqvqEBhOHEAFpJuePJ5a27QlJKVkZduMHExGSdM4Wdcc4fzlTtKbZDQ6DSXcrXBxEFxuTxeR77IagJI6JTZAhKFG6ArzDHfX7-BSA4GgqwgK6Vew1Mjw+KIuSINTZDITaazQqfPE-AlEkFg2wU6otdpdanRfq0l4IbI6L46bKs7GmL6-LkAyZA3mWcxAA */
    predictableActionArguments: true,
    id: 'saucedemo',
    initial: 'NOT_LOGIN',
    states: {
        NOT_LOGIN: {
           on: {
            LOGIN: 'INVENTORY',
           } 
        },
        INVENTORY: {
            on: {
                // GO_TO_CART: 'CART',
                LOGOUT: 'NOT_LOGIN',
            }
        },
        // CART: {
        //     on: {
        //         GOT_TO_CHECKOUT: 'CHECKOUT',
        //         LOGOUT: 'NOT_LOGIN',
        //     }
        // },
        // CHECKOUT: {
        //     on: {
        //         LOGOUT: 'NOT_LOGIN',
        //     }
        // },
    }
});

const saucedemoModel = createModel(saucedemoMachine).withEvents({
    LOGIN: {
        exec: async ({username, password, page}) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(username, password);
            const menuComponent = new MenuComponent(page);
            await menuComponent.openMenu();
            await menuComponent.logout();
        }
    },
    LOGOUT: {
        exec: async ({username, password, page}) => {
            const menuComponent = new MenuComponent(page);
            await menuComponent.openMenu();
            await menuComponent.logout();
        }
    }
});

const saucedemoSimplePathPlans = saucedemoModel.getSimplePathPlans();
const saucedemoShortestPathPlans = saucedemoModel.getShortestPathPlans();

export {
    saucedemoSimplePathPlans,
    saucedemoShortestPathPlans
}