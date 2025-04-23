import { test, expect } from '@playwright/test';
test('assert news page loads', async ({ page }) => {
  await page.goto('/news');

  const header = await page.locator('h1');
  expect(await header.textContent()).toBe('OTel Records');

  const eventsLabel = await page.getByTestId('news-label');
  expect(await eventsLabel.textContent()).toBe('⚠️ Unable to obtain news stories');
});

test('assert news subscription successful', async ({ page }) => {
  await page.goto('/news');

  const header = await page.locator('h1');
  expect(await header.textContent()).toBe('OTel Records');

  const subscribeBtn = await page.getByTestId('subscribe-btn');
  expect(subscribeBtn).toBeVisible();

  // Enabling Alert Handling for simple alert
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toBe('Thank you for subscribing!');
    await dialog.accept();
  });
  await subscribeBtn.click();
});