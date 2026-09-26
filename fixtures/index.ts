import { test as base, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

type AppFixtures = {
	loginPage: LoginPage;
	dashboardPage: DashboardPage;
	authenticatedDashboard: DashboardPage;
	guardarCaptura: void;
};

export const test = base.extend<AppFixtures>({
	guardarCaptura: [async ({ page }, use, testInfo) => {
		await use();

		const nombre = [...testInfo.titlePath, testInfo.project.name, `intento-${testInfo.retry}`]
			.join('-')
			.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
		const ruta = `evidencias/${nombre}.png`;
		await page.screenshot({ path: ruta, fullPage: true });
	}, { auto: true }],
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	dashboardPage: async ({ page }, use) => {
		await use(new DashboardPage(page));
	},
	authenticatedDashboard: async ({ page, dashboardPage }, use) => {
		await loginAs(page);
		await use(dashboardPage);
	},
});

export { expect };
