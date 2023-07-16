import { test, Page } from '@playwright/test';
import { CouponsPage } from 'pages/couponsPage';
import { data } from 'utils/testData';


test.describe('Coupons test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	let couponsAdmin: CouponsPage;
	let couponsVendor: CouponsPage;
	let couponsCustomer: CouponsPage;
	let aPage: Page, vPage: Page, cPage: Page;

	test.beforeAll(async ({ browser }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		couponsAdmin = new CouponsPage(aPage);

		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		couponsVendor = new CouponsPage(vPage);

		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		cPage = await customerContext.newPage();
		couponsCustomer = new CouponsPage(cPage);
	});

	test.afterAll(async ( ) => {
		await aPage.close();
		await vPage.close();
	});

	// test('admin can add marketplace coupon @lite @pro', async ( ) => {
	// 	await couponsAdmin.addMarketplaceCoupon(data.coupon);
	// });

	test('vendor can add coupon', async ( ) => {
		await couponsVendor.addCoupon(data.coupon);
	});


	test('customer can view coupon on single store @pro', async ( ) => {
		await couponsCustomer.storeCoupon(data.predefined.vendorStores.vendor1, 'c1_v1');
	});


});
