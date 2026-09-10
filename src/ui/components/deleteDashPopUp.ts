import { Page, Locator } from '@playwright/test';

export class DeleteDashPopUp {
    readonly page: Page;
    readonly titleField: Locator;
    readonly descriptionField: Locator;
    readonly closeButton: Locator;
    readonly cancelButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleField = page.getByRole('textbox', { name: 'Enter dashboard name' })
        this.descriptionField = page.getByRole('textbox', { name: 'Enter dashboard description' })
        this.closeButton = page.locator('.modalHeader__close-modal-icon--VeAZ5 > svg > path')
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.deleteButton = page.getByRole("button", {name: "Delete"})
    }

    async fillName(name: string){
        await this.titleField.clear()
        await this.titleField.fill(name)
    }

    async fillDescription(description: string){
        await this.descriptionField.clear()
        await this.descriptionField.fill(description)
    }

    async confirm(){
        await this.page.waitForLoadState('networkidle');
        await this.deleteButton.click()
    }
}