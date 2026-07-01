import { LoginPage } from "../pages/loginPage.ts";
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

Given('I am logged in as a {string} user', async function (string: string) {
  console.log('Logging in as a user with role:', string);
    const loginPage = new LoginPage(this.page);
    await loginPage.loginWithCredentials(process.env.LOGIN_DEFAULT!, process.env.PASSWORD_DEFAULT!);
    return 'pending';
});

Given('I open {string} project', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('I am on the dashboards page', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on {string}', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I fill in {string} with {string}', async function (string: string, string2: string    ) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I should see {string} in the list of dashboards', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Given('I have a dashboard named {string}', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I click on {string} next to {string}', async function (string: string, string2: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('I confirm the deletion', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('I should not see {string} in the list of dashboards', async function (string: string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});