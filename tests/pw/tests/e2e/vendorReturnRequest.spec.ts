import { test, Page } from '@playwright/test';
import { VendorReturnRequestPage } from 'pages/vendorReturnRequestPage';
import { CustomerPage } from 'pages/customerPage';
import { OrdersPage } from 'pages/ordersPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


const { CUSTOMER_ID, PRODUCT_ID } = process.env;


test.describe('Vendor rma test', () => {


	let vendor: VendorReturnRequestPage;
	let vendor1: OrdersPage;
	let customer: VendorReturnRequestPage;
	let customer1: CustomerPage;
	let vPage: Page, cPage: Page;
	let apiUtils: ApiUtils;
	let orderId: string;


	test.beforeAll(async ({ browser, request }) => {
		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		vendor = new VendorReturnRequestPage(vPage);
		vendor1 = new OrdersPage(vPage);

		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		cPage = await customerContext.newPage();
		customer = new VendorReturnRequestPage(cPage);
		customer1 = new CustomerPage(cPage);

		// await customer1.addProductToCartFromSingleProductPage(data.predefined.simpleProduct.product1.name);
		// await customer1.goToCheckout();
		// orderId = await customer1.paymentOrder();
		// await vendor1.updateOrderStatusOnTable(orderId, 'processing');


		// apiUtils = new ApiUtils(request);
		// [,, orderId, ] = await apiUtils.createOrderWithStatus(PRODUCT_ID, { ...payloads.createOrder, customer_id: CUSTOMER_ID }, data.order.orderStatus.processing, payloads.vendorAuth);
		// [,, orderId, ] = await apiUtils.createOrderWithStatus(payloads.createProduct(), { ...payloads.createOrder, customer_id: CUSTOMER_ID }, data.order.orderStatus.processing, payloads.vendorAuth);


	});


	test.afterAll(async () => {
		// await vPage.close();
		await cPage.close();
	});


	test('vendor return request menu page is rendering properly @pro @explo', async ( ) => {
		await vendor.vendorReturnRequestRenderProperly();
	});

	test('vendor rma settings menu page is rendering properly @pro @explo', async ( ) => {
		await vendor.vendorRmaSettingsRenderProperly();  //todo: move to settings or not
	});

	test('vendor can set rma settings @pro', async ( ) => {
		await vendor.setRmaSettings(data.vendor.rma);  //todo: move to settings or not
	});

	// test('customer can request warranty @pro', async ( ) => {
	// 	await customer.customerRequestWarranty(orderId, data.predefined.simpleProduct.product1.name, data.rma.requestWarranty);
	// });

	// test('customer can send rma message @pro', async ( ) => {
	// 	await customer.customerSendRmaMessage('1002', 'test customer rma message');
	// });

	// test('vendor can send rma message @pro', async ( ) => {
	// 	await vendor.vendorSendRmaMessage('1002', 'test vendor rma message');
	// });

	// test('vendor can update rma status @pro', async ( ) => {
	// 	await vendor.vendorUpdateRmaStatus('1002', 'processing');
	// });

	// test.fixme('vendor can rma refund @pro', async ( ) => {
	// 	await vendor.vendorRmaRefund('1002', 'data.predefined.simpleProduct.product1.name'); //todo: send order amount to refund
	// });

	// test('vendor can delete rma request @pro', async ( ) => {
	// 	await vendor.vendorDeleteRmaRequest('984');
	// });

});