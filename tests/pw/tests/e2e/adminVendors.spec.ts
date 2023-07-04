import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let adminPage: AdminPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	adminPage = new AdminPage(aPage);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Vendors test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('admin vendors menu page is rendering properly @lite @pro @explo', async ( ) => {
		await adminPage.adminVendorsRenderProperly();
	});

	test('admin can add new vendor @lite @pro', async ( ) => {
		await adminPage.addVendor(data.vendor.vendorInfo);
	});

	test.skip('admin can add edit vendor info  @lite @pro', async ( ) => {
		// await adminPage.editVendor(data.vendor.vendorInfo);
	});

	test('admin can search vendors @lite @pro', async ( ) => {
		await adminPage.searchVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can perform vendor bulk actions @lite @pro', async ( ) => {
		await adminPage.vendorBulkAction('approved');
	});

	test.skip('admin can update vendor selling capability @lite @pro', async ( ) => {
	// await adminPage.vendorBulkAction('approved');
	});


});
