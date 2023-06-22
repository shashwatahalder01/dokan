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

test.describe.skip('Modules test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan pro modules menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminModulesRenderProperly();
	});

	test('admin can search module @lite @pro', async ( ) => {
		await adminPage.searchModule('Selling Options');
	});

	test('admin can filter modules @lite @pro', async ( ) => {
		await adminPage.filterModule('Selling Options');
	});

	test('admin can deactivate module @lite @pro', async ( ) => {
		await adminPage.searchModule('Selling Options');
	});

	test('admin can activate module @lite @pro', async ( ) => {
		await adminPage.searchModule('Selling Options');
	});


});
