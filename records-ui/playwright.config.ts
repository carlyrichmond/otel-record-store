import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'Desktop Safari',
			use: {
				...devices['Desktop Safari']
			}
		},
		{
			name: 'Desktop Edge',
			use: {
				...devices['Desktop Edge']
			}
		},
		{
			name: 'Desktop Firefox',
			use: {
				...devices['Desktop Firefox']
			}
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 13']
			}
		},
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Pixel 7']
			}
		},
		{
			name: 'Mobile Chrome Landscape',
			use: {
				...devices['Pixel 7 Landscape']
			}
		},
		{
			name: 'Common Tablet',
			use: {
				...devices['iPad Pro 11 landscape']
			}
		}
	],
	testDir: 'e2e'
});
