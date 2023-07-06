import { test, Page, expect } from '@playwright/test';
import { ReportsPage } from 'pages/reportsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let reportsPage: ReportsPage;
let aPage: Page;
let apiUtils: ApiUtils;
let orderId: string;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	reportsPage = new ReportsPage(aPage);
	apiUtils = new ApiUtils(request);
	orderId = String(await apiUtils.getOrderId(payloads.adminAuth)); //TODO: can be replaced with create order
	console.log(orderId);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Reports test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	// reports

	test('orderid exists @pro @explo', async ( ) => {
		expect(orderId).toBeTruthy();
	});


});
