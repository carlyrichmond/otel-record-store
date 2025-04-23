import { test, expect } from '@playwright/test';
test('assert records page loads with records', async ({ page }) => {
  await page.goto('/records');

  const header = await page.locator('h1');
  expect(await header.textContent()).toBe('OTel Records');

  const cards = await page.getByTestId('record-card');
  expect(await cards.count()).toBeGreaterThanOrEqual(5);	
});

test('assert searching for beat returns records', async ({ page }) => {
	await page.goto('/records');

	const cards = page.getByTestId('record-card');
	expect(await cards.count()).toBeGreaterThanOrEqual(8);	
	
	const query = 'beat';
	const searchBar = page.getByTestId('search-bar');
	await expect(searchBar).toHaveValue('');

	searchBar.fill(query)
	await expect(searchBar).toHaveValue(query);
	
	// Check we have less results after debounce
	await page.waitForTimeout(5000);

	expect(await cards.count()).toBeGreaterThanOrEqual(2);
	expect(await cards.count()).toBeLessThan(8);		
  });

  test('assert clearing search bar resets cards', async ({ page }) => {
	await page.goto('/records');

	const cards = page.getByTestId('record-card');
	expect(await cards.count()).toBeGreaterThanOrEqual(8);	
	
	const query = 'dead';
	const searchBar = page.getByTestId('search-bar');
	await expect(searchBar).toHaveValue('');

	searchBar.fill(query)
	await expect(searchBar).toHaveValue(query);
	
	// Check we have less results after debounce
	await page.waitForTimeout(5000);

	expect(await cards.count()).toBeGreaterThanOrEqual(1);
	expect(await cards.count()).toBeLessThan(3);
	
	// Clear results
	searchBar.fill('');
	await expect(searchBar).toHaveValue('');

	// Check we have more results after debounce
	await page.waitForTimeout(5000);

	expect(await cards.count()).toBeGreaterThanOrEqual(8);
  });