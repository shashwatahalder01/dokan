import { test, Page } from '@playwright/test';
import { StorePage } from 'pages/storePage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let storePage: StorePage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	storePage = new StorePage(aPage);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Vendors test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('admin vendors menu page is rendering properly @lite @pro @explo', async ( ) => {
		await storePage.adminVendorsRenderProperly();
	});

	test('admin can add new vendor @lite @pro', async ( ) => {
		await storePage.addVendor(data.vendor.vendorInfo);
	});

	test('admin can search vendors @lite @pro', async ( ) => {
		await storePage.searchVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can disable vendor\'s selling capability @lite @pro', async ( ) => {
		await storePage.updateVendor(data.predefined.vendorStores.vendor1, 'disable');
	});

	test('admin can enable vendor\'s selling capability @lite @pro', async ( ) => {
		await storePage.updateVendor(data.predefined.vendorStores.vendor1, 'enable');
	});

	test('admin can add edit vendor info  @lite @pro', async ( ) => {
		await storePage.editVendor(data.vendor);
	});

	test('admin can view vendor products @lite @pro', async ( ) => {
		await storePage.viewVendor(data.predefined.vendorStores.vendor1, 'products');
	});
	test('admin can view vendor orders @lite @pro', async ( ) => {
		await storePage.viewVendor(data.predefined.vendorStores.vendor1, 'orders');
	});

	test('admin can perform vendor bulk actions @lite @pro', async ( ) => {
		await storePage.vendorBulkAction('approved');
	});


});
