import { test, Page } from '@playwright/test';
import { SpmvPage } from 'pages/spmvPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


test.describe('Vendor SPMV test', () => {


	let admin: SpmvPage;
	let vendor: SpmvPage;
	let aPage: Page, vPage: Page;
	let apiUtils: ApiUtils;
	let productName1: string;
	let productName: string;


	test.beforeAll(async ({ browser, request }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		admin = new SpmvPage(aPage);

		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		vendor = new SpmvPage(vPage);

		apiUtils = new ApiUtils(request);
		// [,, productName1] = await apiUtils.createProduct({ ...payloads.createProduct(), name: data.predefined.spmv.productName() }, payloads.vendor2Auth);
		[,, productName] = await apiUtils.createProduct({ ...payloads.createProduct(), name: data.predefined.spmv.productName() }, payloads.vendor2Auth);
	});


	test.afterAll(async () => {
		await aPage.close();
		await vPage.close();
	});


	// test.only('add can assign SPMV product to other vendor @pro', async ( ) => {
	// 	// await admin.assignSpmvProduct(productName1, data.predefined.vendorStores.vendor1);
	// 	await admin.assignSpmvProduct('2471', data.predefined.vendorStores.vendor1);
	// });


	test('vendor spmv menu page is rendering properly @pro @explo', async ( ) => {
		await vendor.vendorSpmvRenderProperly();
	});

	test('vendor can search similar product on spmv page @pro ', async ( ) => {
		await vendor.searchSimilarProduct(productName, 'spmv');
	});

	test('vendor can search similar product on product popup @pro', async ( ) => {
		await vendor.searchSimilarProduct(productName, 'popup');
	});

	// test('vendor can search similar booking product @pro', async ( ) => {
	//todo: need admin booking product via api
	// 	await vendor.searchSimilarProduct(productName, 'booking');
	// });

	// test('vendor can search similar auction product @pro', async ( ) => {
	//todo: need admin auction product via api
	// 	await vendor.searchSimilarProduct(productName, 'auction');
	// });

	test('vendor can go to product edit from spmv @pro', async ( ) => {
		await vendor.goToProductEditFromSPMV(data.predefined.simpleProduct.product1.name);
	});

	test('vendor can sort spmv products @pro', async ( ) => {
		await vendor.sortSpmvProduct('price');
	});

	test('vendor can clone product @pro', async ( ) => {
		await vendor.cloneProduct(productName);
	});

	//todo: add more spmv settings test


	//todo: admin can add spmv product to other vendor


});