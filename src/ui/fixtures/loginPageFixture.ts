import { LoginPageValidations } from "../helpers/loginPageValidations";
import { LoginPage } from "../pages/loginPage";
import { test as base } from '@playwright/test';



interface LoginFixtures { 
    loginPage: LoginPage;
    loginValidations: LoginPageValidations;
}

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  loginValidations: async ({ page }, use) => {
    const loginValidations = new LoginPageValidations(page);
    await loginValidations.goto();
    await use(loginValidations);
  },
});

export { expect } from '@playwright/test';
