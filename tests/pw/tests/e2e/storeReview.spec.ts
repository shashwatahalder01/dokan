import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';


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

test.describe.skip('Store Reviews test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store reviews menu page is rendering properly @pro @explo', async ( ) => {
		await adminPage.adminStoreReviewsRenderProperly();
	});

	test('admin can filter store reviews by vendor @pro', async ( ) => {
		await adminPage.filterStoreReviews(data.storeReview.filter.byVendor);
	});

	test('admin can edit store review @pro', async ( ) => {
		await adminPage.editStoreReview(data.storeReview);
	});

	test('admin can delete store review @pro', async ( ) => {
		await adminPage.deleteStoreReview(data.storeReview);
	});

	// test('admin can restore deleted store review @pro', async ( ) => {
	// 	await adminPage.restoreStoreReview(data.storeReview);
	// });

	// test('admin can permanently delete store review @pro', async ( ) => {
	// 	await adminPage.permanentlyDeleteStoreReview(data.storeReview);
	// });

	test('admin can perform store reviews bulk action @pro', async ( ) => {
		await adminPage.storeReviewsBulkAction('trash');
	});

});
