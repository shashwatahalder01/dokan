import { test, Page } from '@playwright/test';
import { StoreSupportsPage } from 'pages/storeSupportsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


const { VENDOR_ID, CUSTOMER_ID } = process.env;


let storeSupportsAdmin: StoreSupportsPage;
let storeSupportsCustomer: StoreSupportsPage;
let unsignedUser: StoreSupportsPage;
let aPage: Page, cPage: Page, uPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	storeSupportsAdmin = new StoreSupportsPage(aPage);

	const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
	cPage = await customerContext.newPage();
	storeSupportsCustomer = new StoreSupportsPage(cPage);

	const unsignedContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
	uPage = await unsignedContext.newPage();
	unsignedUser =  new StoreSupportsPage(uPage);

	apiUtils = new ApiUtils(request);
	await apiUtils.createSupportTicket({ ...payloads.createSupportTicket, author: CUSTOMER_ID, store_id: VENDOR_ID }, payloads.adminAuth );
	const[, supportTicketId] = await apiUtils.createSupportTicket({ ...payloads.createSupportTicket, author: CUSTOMER_ID, store_id: VENDOR_ID }, payloads.adminAuth );
	await apiUtils.updateSupportTicketStatus(supportTicketId, 'close', payloads.adminAuth);
});

test.afterAll(async ( ) => {
	await aPage.close();
	await cPage.close();
	await uPage.close();
});

test.describe('Store Support test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store support menu page is rendering properly @pro @explo', async ( ) => {
		await storeSupportsAdmin.adminStoreSupportRenderProperly();
	});

	test('admin can search support ticket @pro', async ( ) => {
		await storeSupportsAdmin.searchSupportTicket(data.storeSupport.title);
	});

	test('admin can filter store support by vendor @pro', async ( ) => {
		await storeSupportsAdmin.filterStoreSupports(data.storeSupport.filter.byVendor, 'by-vendor');
	});

	test('admin can filter store support by customer @pro', async ( ) => {
		await storeSupportsAdmin.filterStoreSupports(data.storeSupport.filter.byCustomer, 'by-customer');
	});

	test('admin can reply to support ticket as admin @pro', async ( ) => {
		await storeSupportsAdmin.replySupportTicket(data.storeSupport.chatReply.asAdmin);
	});

	test('admin can reply to support ticket as vendor @pro', async ( ) => {
		await storeSupportsAdmin.replySupportTicket(data.storeSupport.chatReply.asVendor);
	});

	test('admin can disable support ticket email notification @pro', async ( ) => {
		await storeSupportsAdmin.updateSupportTicketEmailNotification('disable');
	});

	test('admin can enable support ticket email notification @pro', async ( ) => {
		await storeSupportsAdmin.updateSupportTicketEmailNotification('enable');
	});

	test('admin can close store support @pro', async ( ) => {
		await storeSupportsAdmin.closeSupportTicket();
	});

	test('admin can reopen closed store support @pro', async ( ) => {
		await storeSupportsAdmin.reopenSupportTicket();
	});

	test('admin can perform store support bulk action @pro', async ( ) => {
		await storeSupportsAdmin.storeSupportBulkAction('close');
	});

	//todo: filter store support by calendar


	test('customer can ask for store support on single product @pro', async ( ) => {
		await storeSupportsCustomer.storeSupport(data.predefined.simpleProduct.product1.name, data.customer.customerInfo.getSupport, true);
	});

	test('customer can ask for store support on single store @pro', async ( ) => {
		await storeSupportsCustomer.storeSupport(data.predefined.vendorStores.vendor1, data.customer.customerInfo.getSupport);
	});

	test('customer can send message to support ticket @pro', async ( ) => {
		await storeSupportsCustomer.storeSupport(data.predefined.vendorStores.vendor1, data.customer.customerInfo.getSupport);
		await storeSupportsCustomer.sendMessageCustomerSupportTicket(data.customer.supportTicket);
	});

	test('guest customer need to login before asking for store support @pro', async ( ) => {
		await unsignedUser.storeSupport(data.predefined.vendorStores.vendor1, data.customer.customerInfo.getSupport);
	});

});
