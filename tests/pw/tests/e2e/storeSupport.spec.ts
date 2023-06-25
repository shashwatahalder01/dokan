import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';


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

test.describe.skip('Store Support test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store support menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminStoreSupportRenderProperly();
	});

	test('admin can search support ticket @pro', async ( ) => {
		await adminPage.searchSupportTicket(data.predefined.vendorStores.vendor1);
	});

	test('admin can filter store support by vendor @pro', async ( ) => {
		await adminPage.filterStoreSupports(data.storeReview.filter.byVendor);
	});

	// test('admin can close store support @pro', async ( ) => {
	// 	await adminPage.editStoreSupport(data.storesupport);
	// });

	// test('admin can reopen close store support @pro', async ( ) => {
	// 	await adminPage.deleteStoresupport(data.storesupport);
	// });

	// test('admin can restore deleted store support @pro', async ( ) => {
	// 	await adminPage.restoreStoresupport(data.storesupport);
	// });

	// test('admin can permanently delete store support @pro', async ( ) => {
	// 	await adminPage.permanentlyDeleteStoresupport(data.storesupport);
	// });

	test('admin can perform store support bulk action @pro', async ( ) => {
		await adminPage.storeSupportBulkAction('trash');
	});

});
