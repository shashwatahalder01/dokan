import { test, Page } from '@playwright/test';
import { WholesaleCustomersPage } from 'pages/wholesaleCustomersPage';
import { CustomerPage } from 'pages/customerPage';
import { data } from 'utils/testData';


let wholesaleAdmin: WholesaleCustomersPage;
let wholesaleCustomer: WholesaleCustomersPage;


let wholesaleCustomersPage: WholesaleCustomersPage;
let customerPage: CustomerPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	// const context = await browser.newContext({});
	// page = await context.newPage();
	// wholesaleCustomersPage = new WholesaleCustomersPage(page);
	// customerPage = new CustomerPage(page);


	//TODO: apply this for multiple user role
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	const admin = await adminContext.newPage();
	wholesaleAdmin = new WholesaleCustomersPage(admin);

	const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
	const customer = await customerContext.newPage();
	customerPage = new CustomerPage(customer);
	wholesaleCustomer = new WholesaleCustomersPage(customer);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Wholesale customers test', () => {

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

	test.skip('admin can view wholesale customer orders @pro', async ( ) => {
		await wholesaleCustomersPage.viewWholesaleCustomerOrders(data.predefined.customerInfo.username1);
	});

	test('admin can delete wholesale customer @pro', async ( ) => {
		await wholesaleCustomersPage.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'delete');
	});

	test.skip('customer can request for become a wholesale customer', async () => {
		await customerPage.customerRegister(data.customer.customerInfo);
		await wholesaleCustomersPage.customerRequestForBecomeWholesaleCustomer(); // TODO
	});

	test.skip('customer can become a wholesale customer', async () => {
		// await customerPage.customerRegister(data.customer.customerInfo);
		// await wholesaleCustomersPage.customerBecomeWholesaleCustomer();
		await customerPage.customerRegister(data.customer.customerInfo);
		await wholesaleAdmin.customerBecomeWholesaleCustomer();
	});


});
