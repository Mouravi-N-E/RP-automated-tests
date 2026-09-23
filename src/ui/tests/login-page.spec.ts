import { test, expect } from '../fixtures/loginPageFixture';

test.describe('Login page Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } })
  test('Login with credentials happy path', {
    tag: '@Smoke'
  }, async ({ loginPage, page }) => {

    // await expect(loginPage.page).toHaveTitle(/Report Portal/);
    await page.goto('http://localhost:8080')

    await loginPage.loginWithCredentials({ isAdmin: true });
  });

  test.skip('Socials links', {
    tag: '@Smoke'
  }, async ({ loginValidations }) => {
    await loginValidations.validateSocialLinks();
  });
})
