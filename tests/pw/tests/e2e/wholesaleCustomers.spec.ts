import { test, Page } from '@playwright/test';
import { WholesaleCustomersPage } from 'pages/wholesaleCustomersPage';
import { CustomerPage } from 'pages/customerPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let wholesaleAdmin: WholesaleCustomersPage;
let wholesaleCustomer: WholesaleCustomersPage;
let customerPage: CustomerPage;
let aPage: Page, cPage: Page;
let apiUtils: ApiUtils;


test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	const admin = await adminContext.newPage();
	wholesaleAdmin = new WholesaleCustomersPage(admin);

	const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
	const customer = await customerContext.newPage();
	customerPage = new CustomerPage(customer);
	wholesaleCustomer = new WholesaleCustomersPage(customer);

	apiUtils = new ApiUtils(request);
	// await apiUtils.createWholesaleCustomer(payloads.createCustomer(), payloads.adminAuth);
});

test.afterAll(async ( ) => {
	await aPage.close();  //TODO: close all pages at once
	await cPage.close();
});

test.describe('Wholesale customers test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan wholesale customers menu page is rendering properly @pro @explo', async ( ) => {
		await wholesaleAdmin.adminWholesaleCustomersRenderProperly();
	});

	test('admin can search wholesale customer @pro', async ( ) => {
		await wholesaleAdmin.searchWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test('admin can enable customer\'s  wholesale capability @pro', async ( ) => {
		await wholesaleAdmin.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'enable');
	});

	test('admin can disable customer\'s  wholesale capability @pro', async ( ) => {
		await wholesaleAdmin.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'disable');
	});

	test.skip('admin can edit wholesale customer @pro', async ( ) => {
		await wholesaleAdmin.editWholesaleCustomer(data.predefined.customerInfo.username1);
	});

	test('admin can perform wholesale customer bulk action @pro', async ( ) => {
		await wholesaleAdmin.wholesaleCustomerBulkAction('activate');
	});

	test.skip('admin can view wholesale customer orders @pro', async ( ) => {
		await wholesaleAdmin.viewWholesaleCustomerOrders(data.predefined.customerInfo.username1);
	});

	test('admin can delete wholesale customer @pro', async ( ) => {
		await wholesaleAdmin.updateWholesaleCustomer(data.predefined.customerInfo.username1, 'delete');
	});

	test.skip('customer can request for become a wholesale customer', async () => {
		await customerPage.customerRegister(data.customer.customerInfo);
		await wholesaleCustomer.customerRequestForBecomeWholesaleCustomer(); // TODO
	});

	test.skip('customer can become a wholesale customer', async () => {
		// await customerPage.customerRegister(data.customer.customerInfo);
		// await wholesaleCustomersPage.customerBecomeWholesaleCustomer();
		await customerPage.customerRegister(data.customer.customerInfo);
		await wholesaleAdmin.customerBecomeWholesaleCustomer();
	});


});
