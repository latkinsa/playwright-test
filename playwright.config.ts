import type {PlaywrightTestConfig} from "@playwright/test";
import {devices} from "@playwright/test";
import path from "path";

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, "tests") /* Test directory */,
  forbidOnly:
    !!process.env
      .CI /* Whether to exit with an error if any tests or groups are marked as test.only() or test.describe.only(). Useful on CI. */,
  retries: process.env.CI
    ? 2
    : 0 /* If a test fails on CI, retry it additional 2 times */,
  // timeout: 30 * 1000,                        /* Timeout per test */
  // outputDir: 'test-results/',                /* Artifacts folder where screenshots, videos, and traces are stored. */

  webServer: {
    command: `PORT=3011 npm run dev`,
    port: 3011,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    trace:
      "on-first-retry" /* Retry a test if its failing with enabled tracing (analyse the DOM, console logs, network traffic): https://playwright.dev/docs/trace-viewer */,
    // contextOptions: {                        /* All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context */
    //   ignoreHTTPSErrors: true,
    // },
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //   },
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against stable browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],
};
export default config;
