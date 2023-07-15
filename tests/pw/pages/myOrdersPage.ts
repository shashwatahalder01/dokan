import { Page } from '@playwright/test';
import { CustomerPage } from 'pages/customerPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';

const { DOKAN_PRO } = process.env;

export class MyOrderPage extends CustomerPage {

	constructor(page: Page) {
		super(page);
	}

	// my orders

	// my orders render properly
	async myOrdersRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.myOrders);

		const noOrders = await this.isVisible(selector.customer.cMyOrders.noOrdersFound);

		if (noOrders){
			await this.toContainText(selector.customer.cMyOrders.noOrdersFound, 'No orders found!');
			console.log('No orders found on my order page');

		} else {

			// my orders text is visible
			await this.toBeVisible(selector.customer.cMyOrders.myOrdersText);

			// recent orders text is visible
			await this.toBeVisible(selector.customer.cMyOrders.recentOrdersText);

			// my orders table elements are visible
			await this.multipleElementVisible(selector.customer.cMyOrders.table);
		}
	}

	//  view order details
	async viewOrderDetails(orderId: string){
		await this.goIfNotThere(data.subUrls.frontend.myOrders);
		await this.clickAndWaitForNavigation(selector.customer.cMyOrders.orderView(orderId));

		// order details are visible
		await this.multipleElementVisible(selector.customer.cOrderDetails.orderDetails);

		// customer details are visible
		await this.multipleElementVisible(selector.customer.cOrderDetails.customerDetails);

		DOKAN_PRO && await this.toBeVisible(selector.customer.cOrderDetails.getSupport);
	}

	//  pay pending order
	async payPendingOrder(orderId: string, paymentMethod = 'bank'){
		await this.goIfNotThere(data.subUrls.frontend.myOrders);
		await this.clickAndWaitForResponse(data.subUrls.frontend.orderPay, selector.customer.cMyOrders.orderPay(orderId));
		await this.paymentOrder(paymentMethod);
		await this.toBeVisible(selector.customer.cOrderReceived.orderReceivedSuccessMessage);
	}

	//  cancel order
	async cancelPendingOrder(orderId: string){
		await this.goIfNotThere(data.subUrls.frontend.myOrders);
		await this.clickAndWaitForResponse(data.subUrls.frontend.orderCancel, selector.customer.cMyOrders.orderCancel(orderId), 302);
		await this.toContainText(selector.customer.cWooSelector.wooCommerceInfo, 'Your order was cancelled.');
	}


}
