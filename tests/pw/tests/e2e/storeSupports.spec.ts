import { test, Page } from '@playwright/test';
import { StoreSupportsPage } from 'pages/storeSupportsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


const { VENDOR_ID, CUSTOMER_ID } = process.env;


let storeSupportsPage: StoreSupportsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	storeSupportsPage = new StoreSupportsPage(aPage);
	apiUtils = new ApiUtils(request);
	await apiUtils.createSupportTicket({ ...payloads.createSupportTicket, author: CUSTOMER_ID, store_id: VENDOR_ID }, payloads.adminAuth );
	const[, supportTicketId] = await apiUtils.createSupportTicket({ ...payloads.createSupportTicket, author: CUSTOMER_ID, store_id: VENDOR_ID }, payloads.adminAuth );
	await apiUtils.updateSupportTicketStatus(supportTicketId, 'close', payloads.adminAuth);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Store Support test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan store support menu page is rendering properly @pro @explo', async ( ) => {
		await storeSupportsPage.adminStoreSupportRenderProperly();
	});

	test('admin can search support ticket @pro', async ( ) => {
		await storeSupportsPage.searchSupportTicket(data.storeSupport.title);
	});

	test('admin can filter store support by vendor @pro', async ( ) => {
		await storeSupportsPage.filterStoreSupports(data.storeSupport.filter.byVendor, 'by-vendor');
	});

	test('admin can filter store support by customer @pro', async ( ) => {
		await storeSupportsPage.filterStoreSupports(data.storeSupport.filter.byCustomer, 'by-customer');
	});

	test('admin can reply to support ticket as admin @pro', async ( ) => {
		await storeSupportsPage.replySupportTicket(data.storeSupport.chatReply.asAdmin);
	});

	test('admin can reply to support ticket as vendor @pro', async ( ) => {
		await storeSupportsPage.replySupportTicket(data.storeSupport.chatReply.asVendor);
	});

	test('admin can disable support ticket email notification @pro', async ( ) => {
		await storeSupportsPage.updateSupportTicketEmailNotification('disable');
	});

	test('admin can enable support ticket email notification @pro', async ( ) => {
		await storeSupportsPage.updateSupportTicketEmailNotification('enable');
	});

	test('admin can close store support @pro', async ( ) => {
		await storeSupportsPage.closeSupportTicket();
	});

	test('admin can reopen closed store support @pro', async ( ) => {
		await storeSupportsPage.reopenSupportTicket();
	});

	test('admin can perform store support bulk action @pro', async ( ) => {
		await storeSupportsPage.storeSupportBulkAction('close');
	});

	//todo: filter store support by calender


});
