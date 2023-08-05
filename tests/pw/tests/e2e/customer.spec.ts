import { test, Page } from '@playwright/test';
import { LoginPage } from 'pages/loginPage';
import { CustomerPage } from 'pages/customerPage';
// import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';

test.describe('Customer user functionality test', () => {

	test.use({ storageState: { cookies: [], origins: [] } });

	let loginPage: LoginPage;
	let customer: CustomerPage;
	let page: Page;


	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		page = await context.newPage();
		loginPage = new LoginPage(page);
		customer = new CustomerPage(page);
	});


	test.afterAll(async () => {
		await page.close();
	});


	test('customer can register @lite @pro', async () => {
		await customer.customerRegister(data.customer.customerInfo);
	});

	test('customer can login @lite @pro', async () => {
		await loginPage.login(data.customer);
	});

	test('customer can logout @lite @pro', async () => {
		await loginPage.login(data.customer);
		await loginPage.logout();
	});

	test('customer can become a vendor @lite @pro', async () => {
		await customer.customerRegister(data.customer.customerInfo);
		await customer.customerBecomeVendor(data.customer.customerInfo);
	});

});


test.describe('Customer functionality test', () => {


	let customer: CustomerPage;
	let cPage: Page;
	// let apiUtils: ApiUtils;

	test.beforeAll(async ({ browser,  }) => {
		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		cPage = await customerContext.newPage();
		customer = new CustomerPage(cPage);
		// apiUtils = new ApiUtils(request);
	});

	test.afterAll(async () => {
		await cPage.close();
	});

	test('customer can add billing details @lite @pro', async ( ) => {
		await customer.addBillingAddress(data.customer.customerInfo.billing);
	});

	test('customer can add shipping details @lite @pro', async ( ) => {
		await customer.addShippingAddress(data.customer.customerInfo.shipping);
	});

	test('customer can add customer details @lite @pro', async ( ) => {
		await customer.addCustomerDetails(data.customer);
	});

	test('customer can add product to cart @lite @pro', async ( ) => {
		const productName = data.predefined.simpleProduct.product1.name;
		await customer.addProductToCart(productName, 'single-product');
		await customer.productIsOnCart(productName);
	});

	test('customer can apply coupon @pro', async ( ) => {
		await customer.addProductToCart(data.predefined.simpleProduct.product1.name, 'single-product');
		await customer.applyCoupon(data.predefined.coupon.couponCode);
	});

	test.only('customer can buy product @lite @pro', async ( ) => {
		// await customer.addProductToCart(data.predefined.simpleProduct.product1.name, 'single-product');
		// await customer.placeOrder();
		console.log(
			await customer.getOrderDetails('1027'));
	});

	//customer can buy product with applied coupon

	// test.skip('customer can download downloadables @lite @pro', async ( ) => {
	// 	// pre: complete download product
	// });


});
