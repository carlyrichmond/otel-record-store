import { test, expect } from '@playwright/test';
test('assert events page loads', async ({ page }) => {
  await page.goto('/events');

  const header = await page.locator('h1');
  expect(await header.textContent()).toBe('OTel Records');

  const eventsLabel = await page.getByTestId('events-label');
  expect(await eventsLabel.textContent()).toBe('No events scheduled');
});