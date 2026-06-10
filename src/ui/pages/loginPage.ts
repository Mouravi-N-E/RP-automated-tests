import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage  {
  readonly page: Page;
  readonly loginWithEpamButton: Locator;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly forgotPasswordButton: Locator;
  readonly loginButton: Locator;
  readonly githubLink: Locator;
  readonly facebookLink: Locator;
  readonly privacyPolicyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginWithEpamButton = page.locator('button', { hasText: 'Login with EPAM' });
    this.loginField = page.getByRole('textbox', { name: 'login' });
    this.passwordField = page.getByRole('textbox', { name: 'password' });
    this.forgotPasswordButton = page.getByRole('link', { name: 'Forgot password?' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.githubLink = page.getByRole('link').nth(4);
    this.facebookLink = page.getByRole('link').nth(5);
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async loginWithCredentials(username: string, password: string) {
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click(); 
    await expect(this.page).not.toHaveURL(/members/);
  }
}
