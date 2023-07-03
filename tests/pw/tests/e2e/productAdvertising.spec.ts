import { test, Page } from '@playwright/test';
import { ProductAdvertisingPage } from 'pages/productAdvertisingPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let productAdvertisingPage: ProductAdvertisingPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	productAdvertisingPage = new ProductAdvertisingPage(aPage);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Product Advertising test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan product advertising menu page is rendering properly @pro @explo', async ( ) => {
		await productAdvertisingPage.adminProductAdvertisingRenderProperly();
	});

	test.skip('product advertisement payment product exists @pro', async ( ) => {
		//todo: move to beforeall
	});

	test('product advertisement payment product exists @pro', async ( ) => {
		const product = await apiUtils.productExistsOrNot('Reverse Withdrawal Payment',  payloads.adminAuth);
		expect(product).toBeTruthy();
	});

	test('admin can add product advertisement @pro', async ( ) => {
		await productAdvertisingPage.addNewProductAdvertisement(data.productAdvertisement);
	});

	test('admin can search advertised product @pro', async ( ) => {
		await productAdvertisingPage.searchAdvertisedProduct(data.productAdvertisement.advertisedProduct);
	});

	test('admin can expire advertised product @pro', async ( ) => {
		await productAdvertisingPage.updateAdvertisedProduct(data.productAdvertisement.advertisedProduct, 'expire');
	});

	test('admin can delete advertised product @pro', async ( ) => {
		await productAdvertisingPage.updateAdvertisedProduct(data.productAdvertisement.advertisedProduct, 'delete');
	});

	test.skip('admin can filter advertised product @pro', async ( ) => {
		// await productAdvertisingPage.filterAdvertisedProduct(data.productAdvertisement.advertisedProduct, 'delete');
	});

	test.skip('admin can perform product advertising bulk action @pro', async ( ) => {
		await productAdvertisingPage.productAdvertisingBulkAction('delete');
	});

	test.skip('vendor can buy product advertising  @pro', async ( ) => {
		// await vendorPage.buyProductAdvertising(data.productAdvertisement.advertisedProduct);
	});


});
