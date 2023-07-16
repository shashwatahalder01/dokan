import { test, Page } from '@playwright/test';
import { SingleProductPage } from 'pages/singleProductPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';


test.describe('Single product functionality test', () => {

	// test.use({ storageState: data.auth.customerAuthFile });

	let singleProductPage: SingleProductPage;
	let page: Page;
	let apiUtils: ApiUtils;

	test.beforeAll(async ({ browser, request }) => {
		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		page = await customerContext.newPage();
		singleProductPage = new SingleProductPage(page);
		apiUtils = new ApiUtils(request);
	});

	test.afterAll(async () => {
		await page.close();
	});


	// single product page

	test.skip('customer can view vendor ratings and vendor info @lite @pro', async ( ) => {
		await singleProductPage.productVendorInfo(data.predefined.simpleProduct.product1.name);
	});

	test.skip('customer can view more products @lite @pro', async ( ) => {
		await singleProductPage.viewMoreProduct(data.predefined.simpleProduct.product1.name);
		// pre: complete order
	});

});
