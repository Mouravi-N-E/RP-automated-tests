import { test, expect } from '../fixtures/loginPageFixture';

test('get started link',  {
  tag: '@Smoke'
}, async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Login with credentials happy path', {
  tag: '@Smoke'
}, async ({ loginPage }) => {

  await expect(loginPage.page).toHaveTitle(/Report Portal/);

  await expect(loginPage.loginWithEpamButton).toBeEnabled();
  
  await loginPage.loginWithCredentials('test', 'test');
});

// test('Socials links',{
//   tag: '@Smoke'
// }, async ({ loginValidations }) => {
//   await loginValidations.validateSocialLinks();
// });

// test('Privacy policy',{
//   tag: '@Smoke'
// }, async ({ loginValidations }) => {
//   await loginValidations.validatePrivacyPolicyLink();
// });
