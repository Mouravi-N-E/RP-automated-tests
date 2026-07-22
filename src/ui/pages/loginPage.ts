import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
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

  async loginWithCredentials(options: { username?: string; password?: string; isAdmin?: boolean } = {}) {
    if (options.isAdmin) {
      options.username = process.env.LOGIN_ADMIN!;
      options.password = process.env.PASSWORD_ADMIN!;
    }
    if (!options.username || !options.password) {
      options.username = process.env.LOGIN_DEFAULT!;
      options.password = process.env.PASSWORD_DEFAULT!;
    }

    const { username, password } = options;
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
