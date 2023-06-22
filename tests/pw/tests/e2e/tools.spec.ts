import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';


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

test.describe('Wholesale customer test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan wholesale customers menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminWholesaleCustomersRenderProperly();
	});

	test('admin can search wholesale customer @pro', async ( ) => {
		await adminPage.searchWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test('admin can perform wholesale customer bulk action @pro', async ( ) => {
		await adminPage.wholesaleCustomerBulkAction('activate');
	});

	test('admin can update wholesale customer wholesale capability @pro', async ( ) => {
		await adminPage.updateWholesaleCustomerStatus(data.predefined.customerInfo.username1);
	});

	test.skip('admin can edit wholesale customer  @pro', async ( ) => {
		// await adminPage.editWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test.skip('admin can view wholesale customer orders @pro', async ( ) => {
		// await adminPage.viewWholesaleCustomerOrders(data.predefined.customerInfo.username1);
	});

	test.skip('admin can delete wholesale customer  @pro', async ( ) => {
		// await adminPage.deleteWholesaleCustomer(data.predefined.customerInfo.username1);
	});


});
