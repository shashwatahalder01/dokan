import { Page } from '@playwright/test';
import { VendorPage } from 'pages/vendorPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';
import { order } from 'utils/interfaces';

export class VendorReturnRequestPage extends VendorPage {

	constructor(page: Page) {
		super(page);
	}


	// return request

	// vendor return request render properly
	async vendorReturnRequestRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.returnRequest);

		// return request menu elements are visible
		await this.toBeVisible(selector.vendor.vReturnRequest.menus.all); //todo: add all menus

		// return request table elements are visible
		await this.multipleElementVisible(selector.vendor.vReturnRequest.table);

		await this.toBeVisible(selector.vendor.vReturnRequest.noRowsFound);
		//todo: add more fields

	}


	// vendor rma render properly
	async vendorRmaSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsRma);

		// return and warranty text is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.returnAndWarrantyText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.visitStore);

		// rma label input is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.label);

		// rma type input is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.type);

		// rma policy input is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.refundPolicyIframe);

		// save changes is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.saveChanges);
	}


	// vendor send rma message
	async vendorSendRmaMessage(orderNumber: string, message: string): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.returnRequest);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.returnRequest, selector.vendor.vReturnRequest.view(orderNumber));
		await this.clearAndType(selector.vendor.vReturnRequest.returnRequestDetails.message, message);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.returnRequest, selector.vendor.vReturnRequest.returnRequestDetails.sendMessage, 302);
		await this.toContainText(selector.customer.cWooSelector.wooCommerceSuccessMessage, data.customer.rma.sendMessage);
	}

	// vendor update rma status
	async vendorUpdateRmaStatus(orderNumber: string, status: string){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.returnRequest);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.returnRequest, selector.vendor.vReturnRequest.view(orderNumber));
		await this.selectByValue(selector.vendor.vReturnRequest.returnRequestDetails.changeStatus, status);
		await this.clickAndAcceptAndWaitForResponse(data.subUrls.ajax, selector.vendor.vReturnRequest.returnRequestDetails.update);
	}

	// vendor send rma refund
	async vendorRmaRefund(orderNumber: string, productName: string){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.returnRequest);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.returnRequest, selector.vendor.vReturnRequest.view(orderNumber));
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vReturnRequest.returnRequestDetails.sendRefund);
		const taxIsVisible = await this.isVisible(selector.vendor.vReturnRequest.returnRequestDetails.taxRefundColumn);
		taxIsVisible && await this.clearAndType(selector.vendor.vReturnRequest.returnRequestDetails.taxRefund(productName), '10'); //todo: add shipping, remove hardcoded value
		await this.type(selector.vendor.vReturnRequest.returnRequestDetails.subTotalRefund(productName), '100'); //todo:dont work
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.ajax, selector.vendor.vReturnRequest.returnRequestDetails.sendRequest);
		await this.toContainText(selector.vendor.vReturnRequest.returnRequestDetails.sendRequestSuccessMessage, 'Already send refund request. Wait for admin approval');
	}

	// vendor delete rma request
	async vendorDeleteRmaRequest(orderNumber: string){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.returnRequest);
		await this.hover(selector.vendor.vReturnRequest.returnRequestCell(orderNumber));
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.returnRequest, selector.vendor.vReturnRequest.delete(orderNumber));
		await this.toContainText(selector.customer.cWooSelector.wooCommerceSuccessMessage, 'Return Request has been deleted successfully');
	}


	// customer request warranty
	async customerRequestWarranty(orderNumber: string, productName: string, refund: order['requestWarranty']){
		await this.goIfNotThere(data.subUrls.frontend.myOrders);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.requestWarranty, selector.customer.cMyOrders.orderRequestWarranty(orderNumber));

		await this.click(selector.customer.cOrders.requestWarranty.warrantyRequestItemCheckbox(productName));
		await this.selectByValue(selector.customer.cOrders.requestWarranty.warrantyRequestItemQuantity(productName), refund.itemQuantity);
		await this.selectByValue(selector.customer.cOrders.requestWarranty.warrantyRequestType, refund.refundRequestType);
		const refundReasonIsVisible = await this.isVisible(selector.customer.cOrders.requestWarranty.warrantyRequestReason);
		refundReasonIsVisible && await this.selectByValue(selector.customer.cOrders.requestWarranty.warrantyRequestReason, refund.refundRequestReasons);
		await this.clearAndType(selector.customer.cOrders.requestWarranty.warrantyRequestDetails, refund.refundRequestDetails);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.requestWarranty, selector.customer.cOrders.requestWarranty.warrantySubmitRequest, 302);
		await this.toContainText(selector.customer.cWooSelector.wooCommerceSuccessMessage, refund.refundSubmitSuccessMessage);
	}


	// customer send Rma message
	async customerSendRmaMessage(orderNumber: string, message: string): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.rmaRequests);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.viewRmaRequests, selector.customer.cRma.view(orderNumber));
		await this.clearAndType(selector.customer.cRma.message, message);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.viewRmaRequests, selector.customer.cRma.sendMessage);
		await this.toContainText(selector.customer.cWooSelector.wooCommerceSuccessMessage, data.customer.rma.sendMessage);
	}


}
