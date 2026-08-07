import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'global setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'ui teardown',
      testMatch: /ui\.teardown\.ts/,
    },
    {
      name: 'ui setup',
      testMatch: /ui\.setup\.ts/,
      teardown: 'ui teardown',
      dependencies: ['global setup'],
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
    // {
    //   name: 'Smoke',
    //   grep: /@Smoke/,
    //   retries: 1,
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     headless: process.env.HEADLESS === 'true',
    //     screenshot: 'only-on-failure',
    //     trace: 'on-first-retry',    
    //   },
    //   dependencies: ['global setup'],
    //   timeout: 30 * 1000, // 30 seconds
    // },
    {
      name: 'UI-full-regression',
      testMatch: 'src/ui/tests/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'src/playwright/.auth/user.json',
        headless: process.env.HEADLESS === 'true',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',    
      },
      dependencies: ['ui setup'],
    },
    {
      name: 'api-full-regression',
      testMatch: 'src/api/tests/*.spec.ts',
      use: {
        trace: 'on-first-retry',    
      },
      dependencies: ['global setup', ],
    }
  ],
});
