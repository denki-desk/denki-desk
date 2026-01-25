import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/sign-in');
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('ava.johnson@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/');
  // Alternatively, we can wait until the page reaches a state where all cookies are set.
  await expect(
    page.getByRole('button', { name: 'AJ', exact: true })
  ).toBeVisible();
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
