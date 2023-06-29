import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


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

test.describe.skip('Refunds test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin refunds menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminRefundRequestsRenderProperly();
	});

	test('admin can search refund requests @pro', async ( ) => {
		await adminPage.searchRefundRequests(data.refunds);
	});

	test('admin can approve refund request @pro', async ( ) => {
		await adminPage.updateRefundRequests(data.predefined.vendorStores.vendor1, 'approve');
	});

	test('admin can cancel refund requests @pro', async ( ) => {
		await adminPage.updateRefundRequests(data.predefined.vendorStores.vendor1, 'cancel');
	});

	test('admin can perform refund requests bulk actions @pro', async ( ) => {
		await adminPage.refundRequestsBulkAction('delete');
	});

});
