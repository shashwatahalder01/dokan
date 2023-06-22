import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';


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

test.describe.skip('License test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin wholesale customers menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminWholesaleCustomersRenderProperly();
	});

	test('admin can search vendors @lite @pro', async ( ) => {
		await adminPage.searchVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can perform vendor bulk actions @lite @pro', async ( ) => {
		await adminPage.vendorBulkAction('approved');
	});

	test('admin can update vendor selling capability @lite @pro', async ( ) => {
		await adminPage.vendorBulkAction('approved');
	});


});
