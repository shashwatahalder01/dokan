import { test, Page } from '@playwright/test';
import { StoreSupportsPage } from 'pages/storeSupportsPage';
import { data } from 'utils/testData';


let storeSupportsPage: StoreSupportsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	storeSupportsPage = new StoreSupportsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Store Support test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store support menu page is rendering properly @pro @explo', async ( ) => {
		await storeSupportsPage.adminStoreSupportRenderProperly();
	});

	test('admin can search support ticket @pro', async ( ) => {
		await storeSupportsPage.searchSupportTicket('support ticket subject');
	});

	test.only('admin can filter store support by vendor @pro', async ( ) => {
		await storeSupportsPage.filterStoreSupports(data.storeReview.filter.byVendor);
	});

	// test('admin can close store support @pro', async ( ) => {
	// 	await storeSupportsPage.editStoreSupport(data.storesupport);
	// });

	// test('admin can reopen close store support @pro', async ( ) => {
	// 	await storeSupportsPage.deleteStoresupport(data.storesupport);
	// });

	// test('admin can restore deleted store support @pro', async ( ) => {
	// 	await storeSupportsPage.restoreStoresupport(data.storesupport);
	// });

	// test('admin can permanently delete store support @pro', async ( ) => {
	// 	await storeSupportsPage.permanentlyDeleteStoresupport(data.storesupport);
	// });

	test('admin can perform store support bulk action @pro', async ( ) => {
		await storeSupportsPage.storeSupportBulkAction('close');
	});

});
