
require('dotenv').config();

const { Before, After, Status, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium } = require("@playwright/test");

setDefaultTimeout(60 * 1000);

Before(async function () {

 this.browser = await chromium.launch({ headless: false });

 this.context = await this.browser.newContext();

 this.page = await this.context.newPage();

 await this.page.goto(process.env.BASE_URL);

});

After(async function (scenario) {

 if (scenario.result?.status === Status.FAILED && this.page) {

   const screenshot = await this.page.screenshot({ fullPage: true });

   await this.attach(screenshot, "image/png");

 }

 await this.page?.close();

 await this.context?.close();

 await this.browser?.close();

});