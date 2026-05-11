// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
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
      },
      dependencies: ['setup'],
    },
  ],
});