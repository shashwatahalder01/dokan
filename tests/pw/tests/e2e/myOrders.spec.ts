import { test, Page } from '@playwright/test';
import { CustomerPage } from 'pages/customerPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';

const { CUSTOMER, PRODUCT_ID } = process.env;


test.describe('My Orders functionality test', () => {

	// test.use({ storageState: data.auth.customerAuthFile });

	let customerPage: CustomerPage;
	let page: Page;
	let apiUtils: ApiUtils;

	test.beforeAll(async ({ browser, request }) => {
		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		page = await customerContext.newPage();
		customerPage = new CustomerPage(page);
		apiUtils = new ApiUtils(request);
	});

	test.afterAll(async () => {
		await page.close();
	});


	test('dokan my orders page is rendering properly @lite @pro', async ( ) => {
		await customerPage.myOrdersRenderProperly();
	});

	test('customer can view order details @lite @pro', async ( ) => {
		const [,, orderId, ] = await apiUtils.createOrderWithStatus(PRODUCT_ID, { ...payloads.createOrder, customer_id: CUSTOMER }, data.order.orderStatus.completed, payloads.vendorAuth);
		await customerPage.viewOrderDetails(orderId);
	});

	test('customer can pay pending payment order @lite @pro', async ( ) => {
		const [,, orderId, ] = await apiUtils.createOrderWithStatus(PRODUCT_ID, { ...payloads.createOrder, customer_id: CUSTOMER }, data.order.orderStatus.pending, payloads.vendorAuth);
		await customerPage.payPendingOrder(orderId, 'bank');
	});

	test('customer can cancel order @lite @pro', async ( ) => {
		const [,, orderId, ] = await apiUtils.createOrderWithStatus(PRODUCT_ID, { ...payloads.createOrder, customer_id: CUSTOMER }, data.order.orderStatus.pending, payloads.vendorAuth);
		await customerPage.cancelPendingOrder(orderId);
	});


});
