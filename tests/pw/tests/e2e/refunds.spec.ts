import { test, Page } from '@playwright/test';
import { RefundsPage } from 'pages/refundsPage';
import { data } from 'utils/testData';


let refundsPage: RefundsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	refundsPage = new RefundsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('refundsPage test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin refundsPage menu page is rendering properly @pro @explo', async ( ) => {
		await refundsPage.adminRefundRequestsRenderProperly();
	});

	test('admin can search refund requests @pro', async ( ) => {
		await refundsPage.searchRefundRequests(data.predefined.vendorStores.vendor1);
	});

	test.skip('admin can approve refund request @pro', async ( ) => {
		await refundsPage.updateRefundRequests(data.predefined.vendorStores.vendor1, 'approve');
	});

	test.skip('admin can cancel refund requests @pro', async ( ) => {
		await refundsPage.updateRefundRequests(data.predefined.vendorStores.vendor1, 'cancel');
	});

	test.skip('admin can perform refund requests bulk actions @pro', async ( ) => {
		await refundsPage.refundRequestsBulkAction('delete');
	});

});
