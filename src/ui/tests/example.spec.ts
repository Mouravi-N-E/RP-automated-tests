import { test, expect } from '../fixtures/loginPageFixture';

test('Login with credentials happy path', {
  tag: '@Smoke'
}, async ({ loginPage }) => {
  // REVIEW What if there another language in the app, how would you check the title?
  await expect(loginPage.page).toHaveTitle(/Report Portal/);
  
  await loginPage.loginWithCredentials(process.env.LOGIN_DEFAULT!, process.env.PASSWORD_DEFAULT!);
});

test('Socials links',{
  tag: '@Smoke'
}, async ({ loginValidations }) => {
  await loginValidations.validateSocialLinks();
});
