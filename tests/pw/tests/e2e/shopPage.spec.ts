import { test, Page } from '@playwright/test';
import { ShopPage } from 'pages/shopPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';


test.describe('Shop functionality test', () => {

	// test.use({ storageState: data.auth.customerAuthFile });

	let shopPage: ShopPage;
	let page: Page;
	let apiUtils: ApiUtils;

	test.beforeAll(async ({ browser, request }) => {
		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		page = await customerContext.newPage();
		shopPage = new ShopPage(page);
		apiUtils = new ApiUtils(request);
	});

	test.afterAll(async () => {
		await page.close();
	});


	// shop page

	test.skip('dokan shop page is rendering properly @lite @pro', async ( ) => {
		await shopPage.shopRenderProperly();
	});

	test.skip('customer can sort products @lite @pro', async ( ) => {
		await shopPage.sortProducts('price');
	});


});
