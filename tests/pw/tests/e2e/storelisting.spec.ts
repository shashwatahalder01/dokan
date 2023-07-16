import { test, Page } from '@playwright/test';
import { StoreListingPage } from 'pages/storeListingPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';


test.describe('Store listing functionality test', () => {

	// test.use({ storageState: data.auth.customerAuthFile });

	let storeListingPage: StoreListingPage;
	let page: Page;
	let apiUtils: ApiUtils;

	test.beforeAll(async ({ browser, request }) => {
		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		page = await customerContext.newPage();
		storeListingPage = new StoreListingPage(page);
		apiUtils = new ApiUtils(request);
	});

	test.afterAll(async () => {
		await page.close();
	});


	// store list page


	test('dokan store list page is rendering properly @lite @pro @explo', async ( ) => {
		await storeListingPage.storeListRenderProperly();
	});

	test('customer can sort store @lite @pro', async ( ) => {
		await storeListingPage.sortStores('most_recent');
	});

	test('customer can change store view layout @lite @pro', async ( ) => {
		await storeListingPage.storeViewLayout('list');
	});

	test('customer can search store @lite @pro', async ( ) => {
		await storeListingPage.searchStore(data.predefined.vendorStores.vendor1);
	});

	test.skip('customer can view stores on map @lite @pro', async ( ) => {
	});


	test.skip('customer can go to single store page from store list @lite @pro', async ( ) => {
	});


});
