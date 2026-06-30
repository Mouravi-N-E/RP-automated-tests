import { test as base } from '@playwright/test';
import { DashboardsPage } from "../pages/dashboardsPage";

interface DashboardsFixtures { 
    dashboardsPage: DashboardsPage;
//    dashboardsValidations: DashboardsValidations;
}

export const test = base.extend<DashboardsFixtures>({
  dashboardsPage: async ({ page }, use) => {
    const dashboardsPage = new DashboardsPage(page);
    await use(dashboardsPage);
  },
//   dashboardsValidations: async ({ page }, use) => {
//    
//   },
});

export { expect } from '@playwright/test';
