import { test, Page } from '@playwright/test';
import { StoreSupportsPage } from 'pages/storeSupportsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


const { VENDOR_ID, CUSTOMER_ID } = process.env;


let storeSupportsPage: StoreSupportsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	storeSupportsPage = new StoreSupportsPage(aPage);
	apiUtils = new ApiUtils(request);
	await apiUtils.createSupportTicket({ ...payloads.createSupportTicket, author: CUSTOMER_ID, store_id: VENDOR_ID }, payloads.adminAuth );
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Store Support test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store support menu page is rendering properly @pro @explo', async ( ) => {
		await storeSupportsPage.adminStoreSupportRenderProperly();
	});

	test('admin can search support ticket @pro', async ( ) => {
		await storeSupportsPage.searchSupportTicket('support ticket subject');
	});

	test('admin can filter store support by vendor @pro', async ( ) => {
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
