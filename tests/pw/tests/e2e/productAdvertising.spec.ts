import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';


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

test.describe('Product Advertising test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan product advertising menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminProductAdvertisingRenderProperly();
	});

	test.skip('product advertisement payment product exists @pro', async ( ) => {
		//todo
	});

	test('admin can add product advertisement @pro', async ( ) => {
		await adminPage.addNewProductAdvertisement(data.productAdvertisement);
	});

	test('admin can search advertised product @pro', async ( ) => {
		await adminPage.searchAdvertisedProduct(data.productAdvertisement.advertisedProduct);
	});

	test('admin can expire advertised product @pro', async ( ) => {
		await adminPage.updateAdvertisedProduct(data.productAdvertisement.advertisedProduct, 'expire');
	});

	test('admin can delete advertised product @pro', async ( ) => {
		await adminPage.updateAdvertisedProduct(data.productAdvertisement.advertisedProduct, 'delete');
	});

	test.skip('admin can filter advertised product @pro', async ( ) => {
		// await adminPage.filterAdvertisedProduct(data.productAdvertisement.advertisedProduct, 'delete');
	});

	test('admin can perform product advertising bulk action @pro', async ( ) => {
		await adminPage.productAdvertisingBulkAction('delete');
	});

	test.skip('vendor can buy product advertising  @pro', async ( ) => {
		// await vendorPage.buyProductAdvertising(data.productAdvertisement.advertisedProduct);
	});


});
