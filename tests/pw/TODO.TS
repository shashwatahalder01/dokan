

// todo:   export log test keep this, for wait for witch api is listed below
		// await Promise.all([
		// 	this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.api.dokan.logs) && resp.status() === 200),
		// 	this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.dokan.downloadOrderLogs) && resp.status() === 200),
		// 	this.page.locator(selector.admin.dokan.reports.allLogs.exportLogs).click()
		// ]); 




//********************************** tests to write **********************************

// todo: reverse withdraw : filter by calendar, do via vue locator
// todo: support ticket : filter by calendar
// todo: reports: filter by calendar on by day, by year, by vendor
// todo: all-logs : filter by calendar
// todo: vendor can send phone verification request
// todo: admin can approve phone verification request
// todo: need update to whole suite, merge both describe, update become customer tests
wholesale setting options tests
	// todo:   customer need or don't need approval : re-modify above two tests
	// todo:   only customer can see wholesale price
	// todo:   all users can see wholesale price
	// todo:   customer can purchase product at wholesale price
	// todo:   vendor can see Wholesale Price on Shop Archive
	// todo:   vendor can create wholesale product  via api

product advertisement
    // todo:   add search product advertisement by order
	// todo:   filter by calendar

rfq

// todo:   create a generic function for below scenario on base page
await Promise.all([
	this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.api.dokan.quotes) && resp.status() === 200),
	this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.api.dokan.products) && resp.status() === 200),
	this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule).click()
]);

reports 
	// todo:   filter by calendar

vendor stuff
	// todo: add tests for all permission group
	// todo:	add tests for email template

verifications
	// todo: need multiple verification request for admin, use db alteration
	// todo: admin can disapprove verification request
	// todo: add vendor tests
	// todo: admin can approve phone verification request

store review
	// test('customer can edit store review @pro', async ( ) => {
	// 	// todo:   need separate method or update locator, ensure previous review exits
	// 	await customer.reviewStore(data.predefined.vendorStores.vendor1, data.store);
	// });

	// todo:  delete, restore, and permanently delete can be merged into one

	// todo:   fix this clear filter not works
	// await this.goIfNotThere(data.subUrls.backend.dokan.storeReviews);
	// const clearIsVisible = await this.isVisible(selector.admin.dokan.storeReviews.filters.filterClear);
	// if(clearIsVisible) {
	// 	await this.clickAndWaitForResponse(data.subUrls.api.dokan.storeReviews, selector.admin.dokan.storeReviews.filters.filterClear);
	// }

follow Store
// todo:  need followers via api


seller badge
	// test.skip('admin can filter vendors by seller badge  @pro', async ( ) => {
	// 	// todo:   need to wait 1 min after badge create ; run via background process; can background process can be automated
	// 	await admin.filterVendorsByBadge(data.sellerBadge.eventName.productsPublished);
	// });

	// test.skip('admin can view seller badge vendors @pro', async ( ) => {
	// 	// todo:   need to wait 1 min after badge create; run via background process ; can background process can be automated
	// 	await admin.sellerBadgeVendors(data.sellerBadge.eventName.productsPublished);
	// });
stores spec
// test.beforeAll(async ({ browser,  }) => {
// 	const adminContext = await browser.newContext(data.auth.adminAuth);
// 	aPage = await adminContext.newPage();
// 	admin = new StoresPage(aPage);
	// apiUtils = new ApiUtils(request);
	// [,, storeName] = await apiUtils.createStore(payloads.createStore());  // todo:  ues different store all stores
});

stores page
store on map
// storeName && await this.toBeVisible(selector.customer.cStoreList.map.storeOnMap.storeOnList(storeName)); // todo:   need to update store settings via e2e to render on map for vendor1

products
	// todo:   import product


stores page

	// search vendor
	async searchVendor(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.vendors);
		await this.clearInputField(selector.admin.dokan.vendors.search);
		await this.typeAndWaitForResponse(data.subUrls.api.dokan.stores, selector.admin.dokan.vendors.search, vendorName);
		await this.toBeVisible(selector.admin.dokan.vendors.vendorCell(vendorName));

		// negative scenario // todo:   add this to all search also add flag to avoid this scenario
		// await this.typeAndWaitForResponse(data.subUrls.api.dokan.stores, selector.admin.dokan.vendors.search, vendorName + 'abcdefgh');
		// await this.toBeVisible(selector.admin.dokan.vendors.noRowsFound);

	}

	setup('add test vendor orders @pro', async ({ request }) => {  // todo:   required for which test, might be replaced with create order with status
		const apiUtils = new ApiUtils(request);
		await apiUtils.createOrder(payloads.createProduct(), { ...payloads.createOrder, customer_id: CUSTOMER_ID }, payloads.vendorAuth);
	});



	// view auction product
	async viewAuctionProduct(productName: string){
		await this.searchAuctionProduct(productName);
		await this.hover(selector.vendor.vAuction.productCell(productName));
		await this.clickAndWaitForLoadState(selector.vendor.vAuction.view(productName));

		// auction product elements are visible
		const { bidQuantity, bidButton, ...viewAuction } = selector.vendor.vAuction.viewAuction;
		await this.multipleElementVisible(viewAuction);
		// todo: actual value can be asserted
	}




















api Suite 

api env
// setup.describe(' setup environment', () => {

// 	// todo:  remove this after : replacing admin as vendor
// 	setup('setup store settings @lite', async () => {
// 		const [response, ] = await apiUtils.put(endPoints.updateSettings, { data: payloads.setupStore });
// 		expect(response.ok()).toBeTruthy();
// 	});


settings 
// test.afterAll(async () => {
// todo:   remove after update setting cause disable selling fix
// 	const [response, responseBody] = await apiUtils.put(endPoints.updateSettings, { data: payloads.setupStore });
// 	expect(response.ok()).toBeTruthy();
// 	expect(responseBody).toBeTruthy();
// });


refunds
test.beforeAll(async ({ request }) => {
	apiUtils = new ApiUtils(request);
	[, orderResponseBody,] = await apiUtils.createOrderWithStatus(PRODUCT_ID, payloads.createOrder, 'wc-processing', payloads.vendorAuth);
	[, refundId] = await dbUtils.createRefund(orderResponseBody);
	// todo:   dokan get all refunds dont recognize refunded by woocommerce, find out why & try to use refund by api instead of db
	// [, refundId] = await apiUtils.createRefund(orderId, payloads.createRefund); // via woocommerce
});

reversewithdrawal

test.beforeAll(async ({ request }) => {
	apiUtils = new ApiUtils(request);
	// check reverse withdrawal payment product exists // todo:  add reverse withdraw check on setup
	// await apiUtils.getReverseWithdrawalProductId(); // todo:   failed on git action. payment product not created
	// todo:   add create product via admin after feature merged with pro
	await apiUtils.createOrderWithStatus(PRODUCT_ID, payloads.createOrderCod, 'wc-completed', payloads.vendorAuth);
});




dbquery

	// execute db query
	async dbQuery(query: string): Promise<any> {
		const dbContext: DbContext = new DbContext(mySql);
		return await dbContext.inTransactionAsync(async (dbContext) => { // todo:   grab connection failed actual reason, ambiguous error message
			try{
				const result = await dbContext.executeAsync(query);
				const res = JSON.parse(JSON.stringify(result));
				expect(res).not.toHaveProperty('errno'); // todo:   ADD Actual ASSERT DB_QUERY IS SUCCESSES, update it
				return res;
			}
			catch(err: unknown){
				// console.log('dbError:', err);
				return err;
			}
		});
	},

dbdata
generalSettings: {

	//site settings
	site_options: '', // todo:  WHY EMPTY , value exists find out what

	// vendor store settings
	vendor_store_options: '', // todo:  WHY EMPTY
}



basepage

// todo:  apply pseudo-style
// todo:  add assertion to every base-page function
// todo:  update every page method with locator method
	// returns whether the element is visible
	async isVisible(selector: string): Promise<boolean> {
		// return await this.isVisibleViaPage(selector);  // todo:   keep which one is better ; also update every page method with locator
		return await this.isVisibleLocator(selector);
	}

	// upload file
	async uploadFile(selector: string, files: string | string[]): Promise<void> {
		// await this.page.setInputFiles(selector, files, { noWaitAfter: true });
		await this.page.setInputFiles(selector, files);
		await this.wait(2); // todo:   need to handle wait gracefully
	}

// assert element to contain text
async toContainText(selector: string, text: string){
	await expect(this.page.locator(selector)).toContainText(text); // todo:   add lowercase for both expected and received


	// assert element to be visible
	// any of them , out of all,	
async toBeVisibleAnyOfThem(selectors: string[],){
	const res = [];
	for (const selector of selectors) {
		res.push(await this.isVisible(selector));
	}
	const result = res.includes(true);
	expect(result).toBeTruthy();
	// todo:  which elements are true for further operation
}

async multipleElementVisible(selectors: any){

	// todo:  can also be merge with isVisible method and this method should support single selector too
	// todo:   implement for arrays
	// selectors = Object.values(selectors);
	// selectors.forEach( async (selector: string) => {
	// 	// console.log(selector);
	// await expect(this.page.locator(selector)).toBeVisible();
	// });

	for (const selector in selectors ) {
		// console.log(selectors[selector]);
		// await expect(this.page.locator(selectors[selector])).toBeVisible();
		await this.toBeVisible(selectors[selector]);
	}

}


	// delete element if exist (only first will delete) : dokan rma,report abuse
	async deleteIfExists(selector: string): Promise<void> {
		// todo:   there may be alternative solution, this method might not needed
		const elementExists = await this.isVisible(selector);
		if (elementExists) {
			const element = this.page.locator(selector);
			await element.click();
		}
	}




	// todo:  urgent : update wait for multiple different response
	// todo:  urgent : update wait for multiple same response

	// // click & wait for multiple responses
	// async clickAndWaitForResponses(subUrls:   string[][], selector: string, code = 200): Promise<void | Response[]> {
	// 	// 		// // const qrs: string[][] = [[data.subUrls.backend.quotes, '200'], [data.subUrls.backend.products, '200']];
	// 	// // const qrs: string[][] = [[data.subUrls.backend.quotes, '200']];
	// 	// await this.clickAndWaitForResponses(qrs, selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule);
	// 	// const promises = [];
	// 	// subUrls.forEach((subUrl) => {
	// 	// 	console.log('subUls: ', subUrl[0], ' code: ', subUrl[1]);
	// 	// 	// const promise = this.page.waitForResponse((resp) => resp.url().includes(subUrl[0] as string ) && resp.status() ===  (subUrl[1] ?? code));
	// 	// 	const promise = this.page.waitForResponse((resp) => resp.url().includes(subUrl[0]) && resp.status() ===  (subUrl[1]));
	// 	// 	promises.push(promise);
	// 	// });
	// 	// // promises.push(this.page.locator(selector).click());
	// 	// // const response = await Promise.all(promises);
	// 	// await Promise.all([
	// 	// 	...promises,
	// 	// 	this.page.locator(selector).click()
	// 	// ]);
	// 	// return response;
	// }

	// upload files when input file element is missing
	async uploadFileViaListener(selector: string, files: string | string[]): Promise<void> {
		this.page.on('filechooser', async (fileChooser) => { await fileChooser.setFiles(files); });
		await this.page.locator(selector).click(); // invokes the filechooser  // todo:  convert with pormise all

	}

//  **********************************          woocommerce            **********************************

// todo:  implement this for checkbox assert await expect( page.locator( '#woocommerce_calc_taxes' ) ).toBeChecked();

// todo:   reconsider that you need multiple assertion or not
		// Verify that settings have been saved
		await expect(
			page.locator( '#setting-error-settings_updated' )
		).toContainText( 'Permalink structure updated.' );
		await expect( page.locator( '#permalink_structure' ) ).toHaveValue(
			'/%postname%/'
		);
		await expect(
			page.locator( '#woocommerce_permalink_structure' )
		).toHaveValue( '/product/' );

// todo:   follow woocommerce project structure like global setup, teardown, ....

// todo:   can implement test.step

// todo:   what is expect.poll

await expect.poll(
						async () => {
							await page.goto( 'wp-admin/plugins.php', {
								waitUntil: 'networkidle',
							} );

							return await updateCompleteMessage.isVisible();
						},
						{
							intervals: [ 10_000 ],
							timeout: 120_000,
						}
					)
					.toEqual( true );

// todo:   try error.response.data

let response = await axios( options ).catch( ( error ) => {
    if ( error.response ) {
        console.error( error.response.data );
    }
    throw new Error( error.message );
} );

// todo:   use this for plugin download and activate scenario
response.data.pipe( fs.createWriteStream( zipFilePath ) );



// todo:   use this for run command via code , built a utility function
export const installPluginThruWpCli = async ( pluginPath ) => {
	const runWpCliCommand = async ( command ) => {
		const { stdout, stderr } = await execAsync(
			`pnpm exec wp-env run tests-cli "${ command }"`
		);

		console.log( stdout );
		console.error( stderr );
	};


    // todo:  try & convert xpath to this
    'input:below(:text("Search for a product…"))',
    // search for each product to add
		await page.click( 'text=Search for a product…' );


		// Recalculate taxes
		page.on( 'dialog', ( dialog ) => dialog.accept() );
		await page.click( 'text=Recalculate' );


    // todo:   what is page.dispatchEvent
    await page.goto(
        'wp-admin/admin.php?page=wc-settings&tab=shipping&section=classes'
    );

    await page.dispatchEvent(
        '.wc-shipping-class-delete >> nth=0',
        'click'
    );
    await page.dispatchEvent(
        '.wc-shipping-class-delete >> nth=0',
        'click'
    );
    await page.dispatchEvent( 'text=Save shipping classes', 'click' );


	// todo:   USe this for global setup, reporter or use two separate file for both suite
To expand on the process.env solution:

// playwright.config.ts
const config = {
	globalSetup: process.env.MODE === 'test' ? './test-global-setup.ts' : './production-global-setup.ts',
  };
  export default config;
  Run it like this:
  
  MODE=production npx playwright test












// todo: replace simple switch with below soln.

  40

Neither, because both are quite verbose for a very simple task. You can just do:

const result = ({
  1: 'One',
  2: 'Two',
  3: 'Three'
})[opt] ?? 'Default'  // opt can be 1, 2, 3 or anything (default)
This, of course, also works with strings, a mix of both or without a default case:

const result = ({
  first: 'One',
  'sec-ond': 'Two',
  3: 'Three'
})[opt]  // opt can be 'first', 'sec-ond' or 3
Explanation:
It works by creating an object where the options/cases are the keys and the results are the values. By putting the option into the brackets you access the value of the key that matches the expression via the bracket notation.

This returns undefined if the expression inside the brackets is not a valid key. We can detect this undefined-case by using the nullish coalescing operator ?? and return a default value.




		// todo:  this flags are not allowed in playwright project
		// globalSetup: './global-setup', /* Path to the global setup file. This file will be required and run before all the tests. */
		// // globalTeardown: './global-teardown', /* Path to the global teardown file. This file will be required and run after all the tests. */
		// globalTimeout: process.env.CI ? 20 * (60 * 1000) : 20 * (60 * 1000), /* Maximum time in milliseconds the whole test suite can run */
		// maxFailures: process.env.CI ? 30 : 30, /* The maximum number of test failures for the whole test suite run. After reaching this number, testing will stop and exit with an error. */
		// preserveOutput: 'always',  /* Whether to preserve test output in the testConfig.outputDir. Defaults to 'always'. */
		// forbidOnly: !!process.env.CI, 	/* Fail the build on CI if you accidentally left testonly in the source code. */
		// workers: process.env.CI ? 1 : 1, 	/* Opt out of parallel tests on CI. */
		// reportSlowTests: { max: 10, threshold: 20 },  /* Whether to report slow test files. Pass null to disable this feature. */
		// reporter: process.env.CI
		// 	? [
		// 		['html', { open: 'never', outputFolder: 'playwright-report/api/html/html-report-api' }],
		// 		['junit', { outputFile: 'playwright-report/api/junit-report/api-results.xml' }],
		// 		['list', { printSteps: true }]]
		// 	: [
		// 		['html', { open: 'never', outputFolder: 'playwright-report/api/html/html-report-api' }],
		// 		['junit', { outputFile: 'playwright-report/api/junit-report/api-results.xml' }],
		// 		['list', { printSteps: true }],
		// 		['allure-playwright',	{ detail: true, outputFolder: 'playwright-report/api/allure/allure-report', suiteTitle: false }]
		// 	],


// todo: only for reference
test.use({ storageState: data.auth.adminAuthFile });
test.use({ extraHTTPHeaders: { Authorization: payloads.adminAuth.Authorization } });


// todo: implement this
// Define an array of endpoint URLs
const endpoints = [
	endPoints.getAllDokanEndpointsAdmin,
	endPoints.getAllDokanEndpointsV1,
	endPoints.getAllDokanEndpointsV2,
  ];
  
  // Function to fetch data from an API endpoint and extract routes and methods
  async function fetchRoutesAndMethods(endpoint) {
	const [, responseBody] = await apiUtils.get(endpoint);
	return Object.entries(responseBody.routes).map(([route, { methods }]) =>
	  methods.map((method) => `${method} ${route}`)
	);
  }
  
  // Fetch data from all endpoints concurrently
  const allRouteMethods = await Promise.all(endpoints.map(fetchRoutesAndMethods));
  
  // Flatten the array and combine routes and methods
  const coverageArray = allRouteMethods.flat();
