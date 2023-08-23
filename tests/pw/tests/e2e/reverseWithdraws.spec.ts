import { test, Page } from '@playwright/test';
import { ReverseWithdrawsPage } from 'pages/reverseWithdrawsPage';
import { OrdersPage } from 'pages/ordersPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';
import { dbUtils } from 'utils/dbUtils';
import { dbData } from 'utils/dbData';

const { PRODUCT_ID } = process.env;


test.describe('Reverse withdraw test', () => {

	let admin: ReverseWithdrawsPage;
	let vendor: ReverseWithdrawsPage;
	let aPage: Page, vPage: Page;
	let apiUtils: ApiUtils;
	let orderId: string;


	test.beforeAll(async ({ browser, request }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		admin = new ReverseWithdrawsPage(aPage);

		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		vendor = new ReverseWithdrawsPage(vPage);
		const vendor1 = new OrdersPage(vPage);

		apiUtils = new ApiUtils(request);
		await dbUtils.setDokanSettings(dbData.dokan.optionName.reverseWithdraw, dbData.dokan.reverseWithdrawSettings);

		// await apiUtils.createOrderWithStatus(PRODUCT_ID, payloads.createOrderCod, data.order.orderStatus.completed, payloads.vendorAuth);

		[,, orderId,]= await apiUtils.createOrderWithStatus(PRODUCT_ID, payloads.createOrderCod, data.order.orderStatus.processing, payloads.vendorAuth);
		await vendor1.updateOrderStatusOnTable(orderId, 'complete');

		// await admin.addReverseWithdrawal({ ...data.reverseWithdraw, amount: '1000', withdrawalBalanceType: 'debit' } );

	});


	test.afterAll(async () => {
		await dbUtils.setDokanSettings(dbData.dokan.optionName.reverseWithdraw, { ...dbData.dokan.reverseWithdrawSettings, enabled: 'off' });
		await aPage.close();
		await vPage.close();
	});


	test('dokan admin reverse withdraw menu page is rendering properly @lite @explo', async ( ) => {
		await admin.adminReverseWithdrawRenderProperly();
	});

	test.skip('filter reverse withdraws by store @lite', async ( ) => {
		await admin.filterReverseWithdraws(data.predefined.vendorStores.vendor1);
	});

	test('admin can crete reverse withdraws @lite', async ( ) => {
		await admin.addReverseWithdrawal(data.reverseWithdraw);
	});


	// vendor


	test('vendor reverse withdrawal menu page is rendering properly @lite @explo', async ( ) => {
		await vendor.vendorReverseWithdrawalRenderProperly();
	});

	test('vendor can view reverse withdrawal notice @lite @explo', async ( ) => {
		await vendor.vendorViewReverseWithdrawalNotice();
	});

	test('vendor can view reverse withdrawal announcement @lite @explo', async ( ) => {
		await vendor.vendorViewReverseWithdrawalAnnouncement();
	});

	test('vendor can filter reverse withdrawals @lite', async ( ) => {
		await vendor.vendorFilterReverseWithdrawals( data.date.dateRange );
	});

	test('vendor can pay reverse pay balance @lite', async ( ) => {
		const orderId = await vendor.vendorPayReversePayBalance();
		await apiUtils.updateOrderStatus(orderId, 'wc-completed', payloads.adminAuth);
	});

	//todo: vendor cant withdraw when reverse withdrawal rule applied
	//todo: add to cart button removed when reverse withdrawal rule applied


});
