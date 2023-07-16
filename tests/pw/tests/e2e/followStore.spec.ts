import { test, Page } from '@playwright/test';
import { FollowStorePage } from 'pages/followStorePage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';


test.describe('Follow stores functionality test', () => {

	// test.use({ storageState: data.auth.customerAuthFile });

	let followStorePage: FollowStorePage;
	let page: Page;
	let apiUtils: ApiUtils;

	test.beforeAll(async ({ browser, request }) => {
		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		page = await customerContext.newPage();
		followStorePage = new FollowStorePage(page);
		apiUtils = new ApiUtils(request);

	});

	test.afterAll(async () => {
		await page.close();
	});


	// follow store page


	test('customer can follow store @lite @pro', async ( ) => {
		await followStorePage.followStore(data.predefined.vendorStores.vendor1, data.predefined.vendorStores.followFromStoreListing); //TODO: update parameter
	});

	test('customer can follow store on single store @pro', async ( ) => {
		await followStorePage.followStore(data.predefined.vendorStores.vendor1, data.predefined.vendorStores.followFromSingleStore);
	});

});
