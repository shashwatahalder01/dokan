import { test, Page } from '@playwright/test';
import { WholesalePage } from 'pages/wholesalePage';
import { data } from 'utils/testData';


let wholesalePage: WholesalePage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	wholesalePage = new WholesalePage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Wholesale customers test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan wholesale customers menu page is rendering properly @pro @explo', async ( ) => {
		await wholesalePage.adminWholesaleCustomersRenderProperly();
	});

	test('admin can search wholesale customer @pro', async ( ) => {
		await wholesalePage.searchWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test('admin can perform wholesale customer bulk action @pro', async ( ) => {
		await wholesalePage.wholesaleCustomerBulkAction('activate');
	});

	test('admin can update wholesale customer wholesale capability @pro', async ( ) => {
		await wholesalePage.updateWholesaleCustomerStatus(data.predefined.customerInfo.username1);
	});

	test.skip('admin can edit wholesale customer  @pro', async ( ) => {
		// await wholesalePage.editWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test.skip('admin can view wholesale customer orders @pro', async ( ) => {
		// await wholesalePage.viewWholesaleCustomerOrders(data.predefined.customerInfo.username1);
	});

	test.skip('admin can delete wholesale customer  @pro', async ( ) => {
		// await wholesalePage.deleteWholesaleCustomer(data.predefined.customerInfo.username1);
	});


});
