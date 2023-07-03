import { test, Page, expect } from '@playwright/test';
import { ReverseWithdrawsPage } from 'pages/reverseWithdrawsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let reverseWithdrawsPage: ReverseWithdrawsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	reverseWithdrawsPage = new ReverseWithdrawsPage(aPage);
	apiUtils = new ApiUtils(request);
	await apiUtils.createOrderWithStatus(payloads.createProduct(), payloads.createOrderCod, 'wc-completed', payloads.vendorAuth);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Reverse withdraw test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan admin reverse withdraw menu page is rendering properly @lite @pro @explo', async ( ) => {
		await reverseWithdrawsPage.adminReverseWithdrawRenderProperly();
	});

	test('reverse Withdraw payment product exists @lite @pro', async ( ) => {
		const product = await apiUtils.productExistsOrNot('Reverse Withdrawal Payment',  payloads.adminAuth);
		expect(product).toBeTruthy();
	});

	test('filter reverse withdraws by store @lite @pro', async ( ) => {
		await reverseWithdrawsPage.filterReverseWithdraws(data.predefined.vendorStores.vendor1);
	});

	// test.skip('filter reverse withdraws by calender @lite @pro', async ( ) => {
	// 	//todo
	// });

	//TODO: add vendor tests

});
