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

test.describe.skip('Vendors test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin vendors menu page is rendering properly @lite @pro', async ( ) => {
		await adminPage.adminVendorsRenderProperly();
	});

	test('admin can add new vendor @lite @pro', async ( ) => {
		await adminPage.addVendor(data.vendor.vendorInfo);
	});

	// test.fixme('admin can add edit vendor info  @lite @pro', async ( ) => {
	// 	await adminPage.editVendor(data.vendor.vendorInfo);
	// });

	test('admin can search vendors @lite @pro', async ( ) => {
		await adminPage.searchVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can perform vendor bulk actions @lite @pro', async ( ) => {
		await adminPage.vendorBulkAction('approved');
	});

	//TODO: test('admin can update vendor selling capability @lite @pro', async ( ) => {
	// await adminPage.vendorBulkAction('approved');
	// });


});
