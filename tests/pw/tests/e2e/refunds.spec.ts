import { test, Page } from '@playwright/test';
import { RefundsPage } from 'pages/refundsPage';
import { ApiUtils } from 'utils/apiUtils';
import { dbUtils } from 'utils/dbUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let refundsPage: RefundsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	refundsPage = new RefundsPage(aPage);
	apiUtils = new ApiUtils(request);
	const [, orderResponseBody,] = await apiUtils.createOrderWithStatus(payloads.createProduct(), payloads.createOrder, 'wc-processing', payloads.vendorAuth);
	await dbUtils.createRefund(orderResponseBody);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('refunds test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('admin refunds menu page is rendering properly @pro @explo', async ( ) => {
		await refundsPage.adminRefundRequestsRenderProperly();
	});

	test('admin can search refund requests @pro', async ( ) => {
		await refundsPage.searchRefundRequests(data.predefined.vendorStores.vendor1);
	});

	test('admin can approve refund request @pro', async ( ) => {
		await refundsPage.updateRefundRequests(data.predefined.vendorStores.vendor1, 'approve');
	});

	test.skip('admin can cancel refund requests @pro', async ( ) => {
		await refundsPage.updateRefundRequests(data.predefined.vendorStores.vendor1, 'cancel');
	});

	test.skip('admin can perform refund requests bulk actions @pro', async ( ) => {
		await refundsPage.refundRequestsBulkAction('delete');
	});

});
