import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { data } from 'utils/testData';


let adminPage: AdminPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Dokan help test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan help menu page is rendering properly @lite @pro', async ( ) => {
		await adminPage.adminHelpRenderProperly();
	});

	test('dokan get help dropdown is rendering properly @lite @pro', async ( ) => {
		await adminPage.adminGetHelpDropdownRenderProperly();
	});

});
