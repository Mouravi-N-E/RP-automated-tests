import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../ui/pages/loginPage';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginWithCredentials();
    await page.context().storageState({ path: authFile });
});
