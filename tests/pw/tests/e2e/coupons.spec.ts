import { test, Page } from '@playwright/test';
import { CouponsPage } from 'pages/couponsPage';
import { data } from 'utils/testData';


test.describe('Coupons test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	let couponsAdmin: CouponsPage;
	let couponsVendor: CouponsPage;
	let aPage: Page, vPage: Page;

	test.beforeAll(async ({ browser }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		couponsAdmin = new CouponsPage(aPage);

		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		couponsVendor = new CouponsPage(vPage);
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


});
