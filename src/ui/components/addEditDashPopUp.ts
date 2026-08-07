import { Page, Locator } from '@playwright/test';

export class AddOrEditDashPopUp {
    readonly page: Page;
    readonly titleField: Locator;
    readonly descriptionField: Locator;
    readonly closeButton: Locator;
    readonly cancelButton: Locator;
    readonly addButton: Locator;
    readonly updateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleField = page.getByRole('textbox', { name: 'Enter dashboard name' })
        this.descriptionField = page.getByRole('textbox', { name: 'Enter dashboard description' })
        this.closeButton = page.locator('.modalHeader__close-modal-icon--VeAZ5 > svg > path')
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.addButton = page.getByRole("button", {name: "Add"})
        this.updateButton = page.getByRole('button', { name: 'Update' })
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
        try {
            await this.addButton.click({timeout: 500})
        }catch{
            await this.updateButton.click()
        }
    }
}