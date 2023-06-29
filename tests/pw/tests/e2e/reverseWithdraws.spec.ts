import { test, Page } from '@playwright/test';
import { ReverseWithdrawsPage } from 'pages/reverseWithdrawsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let reverseWithdrawsPage: ReverseWithdrawsPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	reverseWithdrawsPage = new ReverseWithdrawsPage(page);
	apiUtils = new ApiUtils(request);
	// const minimumWithdrawLimit = await apiUtils.getMinimumWithdrawLimit();
	// await apiUtils.createOrderWithStatus(payloads.createProduct(), payloads.createOrder, 'wc-completed');
	// await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit });
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Reverse withdraw test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan admin reverse withdraw menu page is rendering properly @lite @pro @explo', async ( ) => {
		await reverseWithdrawsPage.adminReverseWithdrawRenderProperly();
	});

	test.skip('reverse Withdraw payment product exists @lite @pro', async ( ) => {
		//todo
	});

	test.skip('filter reverse withdraws by store @lite @pro', async ( ) => {
		//todo
	});

	test.skip('filter reverse withdraws by calender @lite @pro', async ( ) => {
		//todo
	});

});
