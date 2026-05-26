// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

// Fail immediately with a readable message rather than a cryptic
// "Cannot navigate to invalid URL" error inside auth.setup.js.
if (!process.env.BASE_URL) {
  throw new Error(
    '\n\n❌  BASE_URL is not set.\n' +
    '    • Local dev  : add BASE_URL=https://... to your .env file\n' +
    '    • CI         : add BASE_URL as a repository secret\n' +
    '                   (Settings → Secrets and variables → Actions)\n'
  );
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,       // tests within a file run sequentially (safer for shared staging data)
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,   // 1 retry in CI (was 2) — saves ~1 run per failing test
  workers: process.env.CI ? 1 : undefined, // 2 parallel workers in CI (was 1) — halves total time
  timeout: 180000, // 3 min — finalization involves real API calls (credit pull, employment verify)
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    // Runs login once and saves session to .playwright/.auth/user.json
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },

    // All other tests reuse the saved session — no repeated logins
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.playwright/.auth/user.json',
        // viewport: null — use the actual window size instead of the fixed
        // canvas inherited from devices['Desktop Chrome'] (e.g. 1280×720).
        // deviceScaleFactor must be cleared too: Playwright throws
        // '"deviceScaleFactor" option is not supported with null "viewport"'
        // when the device preset's scale factor is left in place.
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
      dependencies: ['setup'],
    },
  ],
});