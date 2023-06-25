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
	// const minimumWithdrawLimit = await apiUtils.getMinimumWithdrawLimit();
	// await apiUtils.createOrderWithStatus(payloads.createProduct(), payloads.createOrder, 'wc-completed');
	// await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit });
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Reverse withdraw test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan admin reverse withdraw menu page is rendering properly @lite @pro', async ( ) => {
		await adminPage.adminReverseWithdrawRenderProperly();
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
