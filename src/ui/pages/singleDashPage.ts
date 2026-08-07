import { Page, Locator } from '@playwright/test';
import { AddOrEditDashPopUp } from '../components/addEditDashPopUp';

export class SingleDashPage {
    readonly page: Page;
    readonly lockButton: Locator
    readonly editButtton: Locator;
    readonly fullScreenButton: Locator;
    readonly deleteButton: Locator;
    readonly printButton: Locator;
    readonly addWidgetButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lockButton = page.getByRole('button', { name: 'Lock' });
        this.editButtton = page.getByRole('button', { name: 'Edit' });
        this.fullScreenButton = page.getByRole('button', {name: 'Full screen'});
        this.deleteButton = page.getByRole('button', {name: 'Delete'});
        this.printButton = page.getByRole('button', {name: 'Print'});
        this.addWidgetButton = page.getByRole('button', {name: 'Add new widget'});
    }

    async openDashboardById(projectName: string, dashId: number) {
            await this.page.goto(`/ui/#${projectName}/dashboard/${dashId}`) 
    }

    async deleteDashboard() {
        await this.deleteButton.click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }

    async editDashBoard(newName?: string, newDescription?: string) {
        await this.editButtton.click();
        const popUp = new AddOrEditDashPopUp(this.page)
        if (newName) {
            await popUp.fillName(newName);
        }
        if (newDescription) {
            await popUp.fillDescription(newDescription)
        }
        await popUp.confirm()
    }
}
