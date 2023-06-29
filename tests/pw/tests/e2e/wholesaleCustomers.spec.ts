import { test, Page } from '@playwright/test';
import { WholesaleCustomersPage } from 'pages/wholesaleCustomersPage';
import { data } from 'utils/testData';


let wholesaleCustomersPage: WholesaleCustomersPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	wholesaleCustomersPage = new WholesaleCustomersPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Wholesale customers test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan wholesale customers menu page is rendering properly @pro @explo', async ( ) => {
		await wholesaleCustomersPage.adminWholesaleCustomersRenderProperly();
	});

	test('admin can search wholesale customer @pro', async ( ) => {
		await wholesaleCustomersPage.searchWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test('admin can enable customer\'s  wholesale capability @pro', async ( ) => {
		await wholesaleCustomersPage.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'enable');
	});

	test('admin can disable customer\'s  wholesale capability @pro', async ( ) => {
		await wholesaleCustomersPage.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'disable');
	});


	test.skip('admin can edit wholesale customer @pro', async ( ) => {
		await wholesaleCustomersPage.editWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test('admin can perform wholesale customer bulk action @pro', async ( ) => {
		await wholesaleCustomersPage.wholesaleCustomerBulkAction('activate');
	});


	test('admin can view wholesale customer orders @pro', async ( ) => {
		await wholesaleCustomersPage.viewWholesaleCustomerOrders(data.predefined.customerInfo.username1);
	});

	test('admin can delete wholesale customer  @pro', async ( ) => {
		await wholesaleCustomersPage.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'delete');
	});


});
