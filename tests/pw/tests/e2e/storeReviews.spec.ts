import { test, Page } from '@playwright/test';
import { StoreReviewsPage } from 'pages/storeReviewsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


const { VENDOR_ID } = process.env;


let storeReviewsPage: StoreReviewsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	storeReviewsPage = new StoreReviewsPage(aPage);
	apiUtils = new ApiUtils(request);
	await apiUtils.createStoreReview(VENDOR_ID, payloads.createStoreReview, payloads.customerAuth);
	const [, reviewId] = await apiUtils.createStoreReview(VENDOR_ID, { ...payloads.createStoreReview, title: 'trashed test review' }, payloads.customerAuth);
	await apiUtils.deleteStoreReview(reviewId, payloads.adminAuth);
});

test.afterAll(async ( ) => {
	await aPage.close(); //TODO: close all pages at once instead of one by one
});

test.describe('Store Reviews test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

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
		await storeReviewsPage.deleteStoreReview();
	});

	test('admin can restore deleted store review @pro', async ( ) => {
		await storeReviewsPage.restoreStoreReview();
	});

	test('admin can permanently delete store review @pro', async ( ) => {
		await storeReviewsPage.permanentlyDeleteStoreReview();
	});

	test('admin can perform store reviews bulk action @pro', async ( ) => {
		await apiUtils.createStoreReview(VENDOR_ID, payloads.createStoreReview, payloads.customerAuth);
		await storeReviewsPage.storeReviewsBulkAction('trash');
	});

});
