import { test, expect } from '@playwright/test';
test('assert home page loads', async ({ page }) => {
  await page.goto('/');

  const header = await page.locator('h1');
  expect(await header.textContent()).toBe('OTel Records');
});

test('assert featured records are shown', async ({ page }) => {
	await page.goto('/');
  
	const cards = await page.getByTestId('record-card');
	expect(await cards.count()).toEqual(5);	
  });

  test('assert navigate to records page', async ({ page }) => {
	await page.goto('/');
  
	const browseBtn = await page.getByTestId('browse-records-btn');
	await browseBtn.scrollIntoViewIfNeeded();
	await browseBtn.click();

	// Wait for login
	await page.waitForURL('**/records');

	const searchBar = page.getByTestId('search-bar');
	expect(searchBar).toBeDefined();
	expect(searchBar).toHaveValue('');
  
	const cards = await page.getByTestId('record-card');
	expect(await cards.count()).toBeGreaterThan(7);
  });