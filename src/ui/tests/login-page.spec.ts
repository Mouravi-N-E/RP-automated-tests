import { test, expect } from '../fixtures/loginPageFixture';

test.describe('Login page Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } })
  test('Login with credentials happy path', {
    tag: '@Smoke'
  }, async ({ loginPage }) => {
    await loginPage.loginWithCredentials({ isAdmin: true });
    await expect(loginPage.page).toHaveTitle(/Report Portal/);
  });

  test.skip('Socials links', {
    tag: '@Smoke'
  }, async ({ loginValidations }) => {
    await loginValidations.validateSocialLinks();
  });
})
