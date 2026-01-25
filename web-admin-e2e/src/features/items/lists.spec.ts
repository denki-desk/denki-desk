import { test, expect } from '@playwright/test';

test.describe('Items - Lists', () => {
  test('lists page loads', async ({ page }) => {
    // navigate to lists
    await page.goto('/items');

    // assertion that proves lists actually loaded
    await expect(page.getByRole('heading', { name: 'Items' })).toBeVisible();
  });
});
