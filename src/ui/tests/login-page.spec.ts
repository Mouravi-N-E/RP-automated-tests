import { test, expect } from '../fixtures/loginPageFixture';

test.describe('Login page Tests', () => {
  test.use({
    storageState: ''
  })
  test('Login with credentials happy path', {
    tag: '@Smoke'
  }, async ({ loginPage }) => {

    await expect(loginPage.page).toHaveTitle(/Report Portal/);

    await loginPage.loginWithCredentials({ isAdmin: true });
  });

  test('Socials links', {
    tag: '@Smoke'
  }, async ({ loginValidations }) => {
    await loginValidations.validateSocialLinks();
  });
})
