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

test.describe.skip('Withdraw test', () => {
	//TODO: need multiple withdraw request

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan admin withdraw menu page is rendering properly @lite @pro', async ( ) => {
		await adminPage.adminWithdrawsRenderProperly();
	});

	test('filter withdraws by vendor @lite @pro', async ( ) => {
		await adminPage.filterWithdraws(data.predefined.vendorStores.vendor1);
	});

	test('admin add note to withdraw request @lite @pro', async ( ) => {
		await adminPage.addNoteWithdrawRequest(data.predefined.vendorStores.vendor1, 'test withdraw note');
	});

	test('admin approve withdraw request @lite @pro', async ( ) => {
		await adminPage.updateWithdrawRequest(data.predefined.vendorStores.vendor1, 'approve');
	});

	test('admin cancel withdraw request  @lite @pro', async ( ) => {
		await adminPage.updateWithdrawRequest(data.predefined.vendorStores.vendor1, 'cancel');
	});

	test('admin delete withdraw request  @lite @pro', async ( ) => {
		await adminPage.updateWithdrawRequest(data.predefined.vendorStores.vendor1,  'delete');
	});

	test('withdraw bulk actions @lite @pro', async ( ) => {
		await adminPage.withdrawBulkAction('cancelled');
	});


});
