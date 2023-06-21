import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';
import { payloads } from '../../utils/payloads';


let adminPage: AdminPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Settings test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan admin settings menu page is rendering properly @lite @pro', async ( ) => {
		await adminPage.adminSettingsRenderProperly();
	});

	test('admin search settings @lite @pro', async ( ) => {
		await adminPage.searchSettings('Selling Options');
	});


});
