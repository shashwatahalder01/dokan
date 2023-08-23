import { test, Page } from '@playwright/test';
import { VendorDeliveryTimePage } from 'pages/vendorDeliveryTimePage';
import { dbData } from 'utils/dbData';
import { dbUtils } from 'utils/dbUtils';
// import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';


test.describe('Vendor delivery time test', () => {


	let vendor: VendorDeliveryTimePage;
	let customer: VendorDeliveryTimePage;
	let vPage: Page, cPage: Page;
	// let apiUtils: ApiUtils;


	test.beforeAll(async ({ browser }) => {
		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		vendor = new VendorDeliveryTimePage(vPage);

		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		cPage = await customerContext.newPage();
		customer = new VendorDeliveryTimePage(cPage);

		await dbUtils.setDokanSettings(dbData.dokan.optionName.deliveryTime, dbData.dokan.deliveryTimeSettings); 		//todo: added , previous test is disable store pickup somehow fix it

		// apiUtils = new ApiUtils(request);

	});


	test.afterAll(async () => {
		await vPage.close();
		await cPage.close();
	});

	test('vendor delivery time menu page is rendering properly @pro @explo', async ( ) => {
		await vendor.vendorDeliveryTimeRenderProperly();
	});

	test('vendor delivery time settings menu page is rendering properly @pro @explo', async ( ) => {
		await vendor.vendorDeliveryTimeSettingsRenderProperly();
	});


	test('vendor can filter delivery time @pro', async ( ) => {
		await vendor.filterDeliveryTime('delivery');
	});

	test('vendor can change view style of delivery time calender @pro', async ( ) => {
		await vendor.updateCalendarView('week');
	});


	//todo: add vendor delivery time setup from vendor settings

	test('customer can buy product with delivery time @pro', async ( ) => {
		await customer.addProductToCart(data.predefined.simpleProduct.product1.name, 'single-product');
		await customer.placeOrderWithDeliverTimeStorePickup('delivery-time', data.deliveryTime);
	});


	test('customer can buy product with store pickup @pro', async ( ) => {
		await customer.addProductToCart(data.predefined.simpleProduct.product1.name, 'single-product');
		await customer.placeOrderWithDeliverTimeStorePickup('store-pickup', data.deliveryTime);
	});


});