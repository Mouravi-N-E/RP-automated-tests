import { Page, Locator } from '@playwright/test';

export class NavBar {
  readonly page: Page;
  readonly projectSelector: Locator;
  readonly dashboards: Locator;
  readonly launches: Locator;
  readonly filters: Locator;
  readonly debug: Locator;
  readonly projectMembers: Locator;
  readonly projectSettings: Locator;
  readonly userSettings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectSelector = page.locator('div').filter({ hasText: /^..$/ }).nth(1);
    this.dashboards = page.getByRole('link').filter({ hasText: 'Dashboards' });
    this.launches = page.getByRole('link').filter({ hasText: 'Launches' });
    this.filters = page.getByRole('link').filter({ hasText: 'Filters' });
    this.debug = page.getByRole('link').filter({ hasText: 'Debug' });
    this.projectMembers = page.getByRole('link').filter({ hasText: 'Project Members' });
    this.projectSettings = page.getByRole('link').filter({ hasText: 'Project Settings' });
    this.userSettings = page.locator('#userSettings');
  }

  async openProject(projectName: string) { 
    await this.projectSelector.click();
    await this.page.locator(`text=${projectName}`).nth(0).click();
  }

  async openDashboards() {
    // To rework for more reliability 
    await this.dashboards.nth(1).click();
  }
  
  async openLaunches() {
    await this.launches.click();
  }

    async openFilters() {
    await this.filters.click();
  }

  async openDebug() {
    await this.debug.click();
  }

  async openProjectMembers() {
    await this.projectMembers.click();
  }

  async openProjectSettings() {
    await this.projectSettings.click();
  }

  async openUserSettings() {
    await this.userSettings.click();
  }
}