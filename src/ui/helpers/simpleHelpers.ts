import { expect, type Locator, type Page } from '@playwright/test';

export async function checkReferenceLink(page: Page, link: Locator, url: string, closeAfter = false) {
    const pagePromise = page.context().waitForEvent('page');
    await link.click();
    const newPage = await pagePromise;
    await expect(newPage).toHaveURL(url);
    if (closeAfter) {
        await newPage.close();
    }
}
