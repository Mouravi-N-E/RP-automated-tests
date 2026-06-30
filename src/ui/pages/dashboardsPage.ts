import { Page, Locator } from '@playwright/test';

export class DashboardsPage {
    readonly page: Page;
    readonly searchBar: Locator
    readonly addNewDashboardButton: Locator;
    readonly gridViewButton: Locator;
    readonly listViewButton: Locator;
    readonly dashboardsTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByRole('textbox', { name: 'Search by name' });
        this.addNewDashboardButton = page.getByRole('button', { name: 'Add New Dashboard' });
        this.gridViewButton = page.getByRole('button').nth(1);
        this.listViewButton = page.getByRole('button').nth(2);
        this.dashboardsTable = page.locator('xpath=//*[@id="app"]/div/div/div/div/div[2]/div[2]/div[1]/div/div[2]/div/div[2]/div[2]');
    }

    async openDashboard(dashboardName: string) {
        await this.page.getByRole('link', { name: dashboardName }).click();
    }

    async searchDashboard(dashboardName: string, andOpen = false) {
        if (dashboardName.length < 3) {
            throw new Error('Dashboard name must be at least 3 characters long');
        }
        await this.searchBar.fill(dashboardName);
        if (andOpen) {
            await this.page.getByRole('link', { name: dashboardName }).click();
        }
        await this.page.waitForTimeout(3000);
    }

    async getDashboardsInTable(): Promise<string[]> {
        const dashboardNames: string[] = [];
        const dashboardItems = this.dashboardsTable.locator('xpath=./div');
        const all = await dashboardItems.all()
        const count = await dashboardItems.count();
        for (let i = 1; i < count; i++) {
            const tem = await all[i].locator('xpath=./div/div[1]');
            const name = await tem.allTextContents();
            dashboardNames.push(name[0]!);
        }
        return dashboardNames;
    }

    async addNewDashboard(dashboardName: string, description?: string) {
        await this.addNewDashboardButton.click();
        await this.page.getByRole('textbox', { name: 'Enter dashboard name' }).fill(dashboardName);
        if (description) {
            await this.page.getByRole('textbox', { name: 'Enter dashboard description' }).fill(description);
        }       
        await this.page.getByRole('button', { name: 'Add', exact: true }).click();
        await this.page.waitForTimeout(2000);
        const dashboardId = await this.page.url().split('/').pop();
        return {'dashboardId': dashboardId, 'dashboardName': dashboardName};
    }

    async deleteDashboard(dashboardName: string) { 
        await this.searchDashboard(dashboardName);
        await this.page.getByRole('button').nth(5).click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }
}
