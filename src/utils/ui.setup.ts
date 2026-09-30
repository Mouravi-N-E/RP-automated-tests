import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../ui/pages/loginPage';

const authFile = path.join(__dirname, '../playwright/.setup/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginWithCredentials({isAdmin: false, iniTialize: true});
    await page.context().storageState({ path: authFile });
});
