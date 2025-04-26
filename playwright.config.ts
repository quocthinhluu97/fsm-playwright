import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000, // Global timeout of 60 seconds
  expect: {
    timeout: 10000, // Timeout for expect assertions
  },
  fullyParallel: false, // Disable parallel execution for state machine tests
  forbidOnly: !!process.env.CI, // Forbid test.only in CI
  retries: process.env.CI ? 2 : 0, // Retries in CI
  workers: 1, // Run tests sequentially for state machine tests
  reporter: [
    ['html'], // HTML report
    ['list'] // Console output
  ],
  use: {
    baseURL: 'https://www.google.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000, // Timeout for actions like click
    navigationTimeout: 30000, // Timeout for navigation
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // Record test steps for better debugging
    testIdAttribute: 'data-testid',
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  outputDir: 'test-results',
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});