import { test, Page } from '@playwright/test';
import { StoreReviewsPage } from 'pages/storeReviewsPage';
import { data } from 'utils/testData';


let storeReviewsPage: StoreReviewsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	storeReviewsPage = new StoreReviewsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Store Reviews test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store reviews menu page is rendering properly @pro @explo', async ( ) => {
		await storeReviewsPage.adminStoreReviewsRenderProperly();
	});

	test('admin can edit store review @pro', async ( ) => {
		await storeReviewsPage.editStoreReview(data.storeReview);
	});
	test('admin can filter store reviews by vendor @pro', async ( ) => {
		await storeReviewsPage.filterStoreReviews(data.storeReview.filter.byVendor);
	});

	test('admin can delete store review @pro', async ( ) => {
		await storeReviewsPage.deleteStoreReview(data.storeReview);
	});

	test.skip('admin can restore deleted store review @pro', async ( ) => {
		// await storeReviewsPage.restoreStoreReview(data.storeReview);
	});

	test.skip('admin can permanently delete store review @pro', async ( ) => {
		// await storeReviewsPage.permanentlyDeleteStoreReview(data.storeReview);
	});

	test.skip('admin can perform store reviews bulk action @pro', async ( ) => {
		await storeReviewsPage.storeReviewsBulkAction('trash');
	});

});
