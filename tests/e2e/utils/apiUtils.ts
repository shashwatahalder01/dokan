import { expect, type APIRequestContext, APIResponse, Request } from '@playwright/test';
import { endPoints } from './apiEndPoints';
import fs from 'fs';
import { payloads } from './payloads';

//TODO: gather all interfaces in one place

interface auth {
	[key: string]: string;
 }

 interface user { username: string; password: string; }

 interface taxRate {
	// [key: string]: string | number | boolean | string [];
	country: string,
	state: string,
	postcode: string,
	city: string,
	rate: string,
	name: string,
	priority: number,
	compound: boolean,
	shipping: boolean,
	order: number,
	class: string,
	postcodes: string[],
	cities: string[],
}

interface coupon {
		code: string,
		amount: string,
		discount_type: string,
		product_ids: number[],
		individual_use: boolean
}

interface reqOptions {
	data?: any;
	failOnStatusCode?: boolean | undefined;
	form?: { [key: string]: string | number | boolean; } | undefined;
	headers?: { [key: string]: string; } | undefined;
	ignoreHTTPSErrors?: boolean | undefined;
	maxRedirects?: number | undefined;
	multipart?: { [key: string]: string | number | boolean | fs.ReadStream | { name: string; mimeType: string; buffer: Buffer; }; } | undefined;
	params?: { [key: string]: string | number | boolean; } | undefined;
	timeout?: number | undefined;
}

export class ApiUtils {
	readonly request: APIRequestContext;

	constructor(request: APIRequestContext) {
		this.request = request;
	}

	// get basic auth
	getBasicAuth(user: user): string {
		const basicAuth = 'Basic ' + Buffer.from(user.username + ':' + user.password).toString('base64');
		return basicAuth;
	}

	/**
	 * request methods
	 */

	async get(url: string, options?: reqOptions | undefined){
		const response = await this.request.get(url, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async post(url: string, options?: reqOptions | undefined){
		const response = await this.request.post(url, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async put (url: string, options?: reqOptions | undefined){
		const response = await this.request.put(url, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async patch(url: string, options?: reqOptions | undefined){
		const response = await this.request.patch(url, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async delete(url: string, options?: reqOptions | undefined){
		const response = await this.request.delete(url, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async head(url: string, options?: reqOptions | undefined){
		const response = await this.request.head(url, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async fetch(urlOrRequest: string | Request, options?: reqOptions | undefined){
		const response = await this.request.fetch(urlOrRequest, options);
		const responseBody = await this.getResponseBody(response);
		return [response, responseBody];
	}

	async storageState(path?: string | undefined){  //TODO: test it
		await this.request.storageState({ path: path });
	}

	async disposeApiRequestContext(): Promise<void>{
		await this.request.dispose();
	}


	// get responseBody
	async getResponseBody(response: APIResponse, assert = true) {
		let responseBody: any;
		try {
			assert && expect(response.ok()).toBeTruthy();
			responseBody = await response.json();
			// console.log('ResponseBody: ', responseBody);
			// String(response.status())[0] != '2' && console.log('ResponseBody: ', responseBody);
			return responseBody;
		}
		catch (err: any) {
			console.log('End-point: ', response.url());
			console.log('Status Code: ', response.status());
			console.log('Error: ', err.message);
			console.log('Response text: ', await response.text());
			return false; //TODO: WHY FALSE
		}
	}

	// get site headers
	async getSiteHeaders(url: string = endPoints.serverUrl ) {
		const response = await this.request.head(url);
		const headers = response.headers();
		return headers;
	}

	/**
	 * dummy data api methods
	 */

	async importDummyData(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.importDummyData, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.importDummyData, { data: payload, headers: auth });
		return responseBody;
	}

	/**
	 * store api methods
	 */

	// get all stores
	async getAllStores(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllStores, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllStores, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get single store
	async getSingleStore(orderId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getSingleStore(orderId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getSingleStore(orderId), { headers: auth });
		return responseBody;
	}

	// get sellerId
	async getSellerId(storeName?: string, auth? : auth): Promise<string> {
		const allStores = await this.getAllStores(auth);
		const sellerId = storeName ? (allStores.find((o: { store_name: string; }) => o.store_name === storeName)).id : allStores[0].id;
		return sellerId;
	}

	// create store
	async createStore(payload: any, auth? : auth) {
		const response = await this.request.post(endPoints.createStore, { data: payload, headers: auth });
		const responseBody = await this.getResponseBody(response, false);
		let sellerId;
		if(responseBody.code){
			expect(response.status()).toBe(500);
			sellerId = await this.getSellerId(payload.store_name, auth);
		}
		else {
			expect(response.ok()).toBeTruthy();
			sellerId = responseBody.id;
		}
		return [responseBody, sellerId];
	}

	// create store review
	async createStoreReview(sellerId: string, payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.createStoreReview(sellerId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createStoreReview(sellerId), { data: payload, headers: auth });
		const reviewId = responseBody.id;
		return [responseBody, reviewId];
	}

	/**
	 * follow store methods
	 */

	// follow unfollow store
	async followUnfollowStore(sellerId: string, auth? : auth) {
		// const response = await this.request.post(endPoints.followUnfollowStore, { data: { vendor_id: Number(sellerId) }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.followUnfollowStore, { data: { vendor_id: Number(sellerId) }, headers: auth });
		return responseBody;
	}

	/**
	 * product api methods
	 */

	// get all products
	async getAllProducts(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllProducts, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllProducts, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get productId
	async getProductId(productName: string, auth? : auth) {
		const allProducts = await this.getAllProducts(auth);
		const productId = productName ? (allProducts.find((o: { name: string; }) => o.name === productName)).id : allProducts[0].id;
		return productId;
	}

	// create product
	async createProduct(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.createProduct, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createProduct, { data: payload, headers: auth });
		const productId = responseBody.id;
		return [responseBody, productId];
	}

	// delete product
	async deleteProduct(productId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.deleteProduct(productId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.deleteProduct(productId), { headers: auth });
		return responseBody;
	}

	// delete all products
	async deleteAllProducts( productName = '', auth? : auth) {
		const allProducts = await this.getAllProducts(auth);
		let allProductIds;
		// delete all products with same name
		if (productName){
			allProductIds = (allProducts.filter((o: { name: string; }) => o.name === productName)).map((a: { id: string }) => a.id);
		}
		else {
			allProductIds = (await this.getAllProducts(auth)).map((a: { id: string }) => a.id);
		}
		// const response = await this.request.put(endPoints.wc.updateBatchProducts, { data: { delete: allProductIds }, headers: payloads.adminAuth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wc.updateBatchProducts, { data: { delete: allProductIds }, headers: payloads.adminAuth });
		return responseBody;
	}

	/**
	 * product variation api methods
	 */

	// create product
	async createProductVariation(productId: string, payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.createProductVariation(productId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createProductVariation(productId), { data: payload, headers: auth });
		const variationId = responseBody.id;
		return [responseBody, variationId];
	}

	// get variationTd
	async getVariationId(productName: string, auth? : auth) {
		const productId = await this.getProductId(productName, auth);
		// const response = await this.request.get(endPoints.getAllProductVariations(productId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllProductVariations(productId), { headers: auth });
		const variationId = responseBody[0].id;
		return [productId, variationId];
	}

	// get variationTd
	async createVariableProductWithVariation(attribute: object, attributeTerm: object, product: object, auth? : auth) {
		const [, productId] = await this.createProduct(product, auth);
		const [body, attributeId] = await this.createAttributeTerm(attribute, attributeTerm, auth);
		const payload = { ...product, attributes: [{ id: attributeId,
			option: body.name, }], };
		const [, variationId] = await this.createProductVariation(productId, payload);
		return [productId, variationId];
	}

	/**
	 * attribute api methods
	 */

	// get all attributes
	async getAllAttributes(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllAttributes, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllAttributes, { headers: auth });
		return responseBody;
	}

	// get single attribute
	async getSingleAttribute(attributeId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getSingleAttribute(attributeId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getSingleAttribute(attributeId), { headers: auth });
		return responseBody;
	}

	// get attributeId
	async getAttributeId(auth? : auth) {
		const allAttributes = await this.getAllAttributes(auth);
		const attributeId = allAttributes[0].id;
		return attributeId;
	}

	// create attribute
	async createAttribute(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.createAttribute, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createAttribute, { data: payload, headers: auth });
		const attributeId = responseBody.id;
		return [responseBody, attributeId];
	}

	// update batch attributes
	async updateBatchAttributes(action: string, allIds: string[], auth? : auth) {
		// const response = await this.request.post(endPoints.wc.updateBatchAttributes, { data: { [action]: allIds }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [response, responseBody] = await this.post(endPoints.wc.updateBatchAttributes, { data: { [action]: allIds }, headers: auth });
		return [response, responseBody];
	}

	/**
	 * attribute term api methods
	 */

	// get all attribute terms
	async getAllAttributeTerms(attributeId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getAllAttributeTerms(attributeId), { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllAttributeTerms(attributeId), { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get single attribute term
	async getSingleAttributeTerm(attributeId: string, attributeTermId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getSingleAttributeTerm(attributeId, attributeTermId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getSingleAttributeTerm(attributeId, attributeTermId), { headers: auth });
		return responseBody;
	}

	// create attribute term
	async createAttributeTerm(attribute: object, attributeTerm: object, auth? : auth) {
		let attributeId: string;
		typeof (attribute) === 'object' ? [, attributeId] = await this.createAttribute(attribute) : attributeId = attribute;
		// const response = await this.request.post(endPoints.createAttributeTerm(attributeId), { data: attributeTerm, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createAttributeTerm(attributeId), { data: attributeTerm, headers: auth });
		const attributeTermId = responseBody.id;
		return [responseBody, attributeId, attributeTermId];
	}

	/**
	 * coupon api methods
	 */

	// get all coupons
	async getAllCoupons(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllCoupons, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllCoupons, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get couponId
	async getCouponId(couponCode: string, auth? : auth) {
		const allCoupons = await this.getAllCoupons(auth);
		const couponId = couponCode ? (allCoupons.find((o: { code: string; }) => o.code === couponCode)).id : allCoupons[0].id;
		return couponId;
	}

	// create coupon
	async createCoupon(productIds: string[], coupon: coupon, auth?: auth ) { // TODO: need to update; handle productIds can be empty
		const response = await this.request.post(endPoints.createCoupon, { data: { ...coupon, product_ids: productIds }, headers: auth });
		const responseBody = await this.getResponseBody(response, false);
		let couponId;
		if(responseBody.code === 'woocommerce_rest_coupon_code_already_exists'){
			expect(response.status()).toBe(400);
			couponId = await this.getCouponId(coupon.code, auth);
		}
		else {
			expect(response.ok()).toBeTruthy();
			couponId = responseBody.id;
		}
		return [responseBody, couponId];
	}

	// update coupon
	async updateCoupon(couponId: string, payload: object, auth? : auth) {
		// const response = await this.request.put(endPoints.updateCoupon(couponId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateCoupon(couponId), { data: payload, headers: auth });
		return responseBody;
	}

	/**
	 * withdraw api methods
	 */

	// get all withdraws
	async getMinimumWithdrawLimit(auth? : auth) {
		// const response = await this.request.get(endPoints.getBalanceDetails, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getBalanceDetails, { headers: auth });
		const minimumWithdrawLimit = String(Math.abs(responseBody.withdraw_limit));
		return minimumWithdrawLimit;
	}

	// get all withdraws
	async getAllWithdraws(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllWithdraws, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllWithdraws, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get all withdraws by status
	async getAllWithdrawsByStatus(status: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getAllWithdrawsByStatus(status), { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllWithdrawsByStatus(status), { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get withdrawId
	async getWithdrawId(auth? : auth) {
		const allWithdraws = await this.getAllWithdrawsByStatus('pending', auth);
		const withdrawId = allWithdraws[0].id;
		return withdrawId;
	}

	// create withdraw
	async createWithdraw(payload: object, auth? : auth): Promise<[object, string]> {
		const response = await this.request.post(endPoints.createWithdraw, { data: payload, headers: auth });
		const responseBody = await this.getResponseBody(response, false); //TODO: test if false is necessary
		const withdrawId = responseBody.id;
		return [responseBody, withdrawId];
	}

	// cancel withdraw
	async cancelWithdraw(withdrawId: string) {
		// const response = await this.request.delete(endPoints.cancelWithdraw(withdrawId));
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.cancelWithdraw(withdrawId));
		return responseBody;
	}

	/**
	 * order api methods
	 */

	// get all orders
	async getAllOrders(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllOrders, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllOrders, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get single order
	async getSingleOrder(orderId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getSingleOrder(orderId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getSingleOrder(orderId), { headers: auth });
		return responseBody;
	}

	// get orderId
	async getOrderId(auth? : auth) {
		const allOrders = await this.getAllOrders(auth);
		const orderId = allOrders[0].id;
		return orderId;
	}

	// update order status
	async updateOrderStatus(orderId: string, orderStatus: string, auth? : auth) {
		// const response = await this.request.put(endPoints.updateOrder(orderId), { data: { status: orderStatus }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateOrder(orderId), { data: { status: orderStatus }, headers: auth });
		return responseBody;
	}

	/**
	 * order notes api methods
	 */

	// create attribute term
	async createOrderNote(product: object, order: object, orderNote: object, auth? : auth) {
		const [, orderId] = await this.createOrder(product, order, auth);
		// const response = await this.request.post(endPoints.createOrderNote(orderId), { data: orderNote, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createOrderNote(orderId), { data: orderNote, headers: auth });
		const orderNoteId = responseBody.id;
		return [responseBody, orderId, orderNoteId];
	}

	/**
	 * admin api methods
	*/

	// get all order logs
	async getAllOrderLogs(auth? : auth) {
		// const response = await this.request.get(endPoints.getAdminLogs, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAdminLogs, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get single order log
	async getSingleOrderLog(orderId: string, auth? : auth) {
		const allOrderLogs = await this.getAllOrderLogs(auth);
		const singleOrderLog = (allOrderLogs.find((o: { order_id: string; }) => o.order_id === orderId));
		return singleOrderLog;
	}

	/**
	 * refund api methods
	 */

	// get all orders
	async getAllRefunds(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllRefunds, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllRefunds, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get orderId
	async getRefundId(auth? : auth) {
		const allRefunds = await this.getAllRefunds(auth);
		const refundId = allRefunds[0].id;
		return refundId;
	}

	/**
	 * dokan settings  api methods
	 */

	// get store settings
	async getStoreSettings(auth? : auth) {
		// const response = await this.request.get(endPoints.getSettings, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getSettings, { headers: auth });
		return responseBody;
	}

	// set store settings
	async setStoreSettings(payload: object, auth? : auth) {
		// const response = await this.request.put(endPoints.updateSettings, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateSettings, { data: payload, headers: auth });
		return responseBody;
	}

	/**
	 * support ticket  api methods
	 */

	// get all support tickets
	async getAllSupportTickets(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllSupportTickets, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllSupportTickets, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get support ticket id
	async getSupportTicketId(auth? : auth): Promise<[string, string]> {
		const allSupportTickets = await this.getAllSupportTickets(auth);
		const supportTicketId = allSupportTickets[0].ID;
		const sellerId = allSupportTickets[0].vendor_id;
		return [supportTicketId, sellerId];
	}

	// create support ticket comment
	async createSupportTicketComment(payload: object, auth? : auth) {
		const [supportTicketId] = await this.getSupportTicketId(auth);
		// const response = await this.request.post(endPoints.createSupportTicketComment(supportTicketId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createSupportTicketComment(supportTicketId), { data: payload, headers: auth });
		return responseBody;
	}

	// update support ticket status
	async updateSupportTicketStatus(supportTicketId: string, status: string, auth? : auth) {
		// const response = await this.request.post(endPoints.updateSupportTicketStatus(supportTicketId), { data: { status }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.updateSupportTicketStatus(supportTicketId), { data: { status }, headers: auth });
		return responseBody;
	}

	/**
	 * reverse withdrawal  api methods
	 */

	// get all reverse withdrawal stores
	async getAllReverseWithdrawalStores(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllReverseWithdrawalStores, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllReverseWithdrawalStores, { headers: auth });
		return responseBody;
	}

	// get orderId
	async getReverseWithdrawalStoreId(auth? : auth) {
		const allReverseWithdrawalStores = await this.getAllReverseWithdrawalStores(auth);
		const reverseWithdrawalStoreId = allReverseWithdrawalStores[0].id;
		return reverseWithdrawalStoreId;
	}

	/**
	 * module  api methods
	 */

	// get all modules         //TODO: covert all get request with params , and remove unnecessary endpoints in both api and e2e suites
	async getAllModules(params = {}, auth? : auth) {
		// const response = await this.request.get(endPoints.getAllModules, {  params: params, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllModules, { params: params, headers: auth  });
		return responseBody;
	}

	// get all modules ids
	async getAllModuleIds(params = {}, auth? : auth) {
		const allModuleIds = (await this.getAllModules(params, auth)).map((a: { id: string; }) => a.id);
		return allModuleIds;
	}

	// activate modules
	async activateModules(moduleIds: string, auth? : auth) {
		// const response = await this.request.put(endPoints.activateModule, { data: { module: [moduleIds] }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.activateModule, { data: { module: [moduleIds] }, headers: auth });
		return responseBody;
	}

	// deactivate modules
	async deactivateModules(moduleIds: string, auth? : auth) {
		// const response = await this.request.put(endPoints.deactivateModule, { data: { module: [moduleIds] }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.deactivateModule, { data: { module: [moduleIds] }, headers: auth });
		return responseBody;
	}

	/**
	 * customers  api methods
	 */

	// get all customers
	async getAllCustomers(auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllCustomers, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllCustomers, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get customerId
	async getCustomerId(username: string, auth? : auth) {
		const allCustomers = await this.getAllCustomers(auth);
		const customerId = (allCustomers.find((o: { username: string; }) => o.username === username)).id;
		return customerId;
	}

	// create customer
	async createCustomer(payload: any, auth? : auth) {
		const response = await this.request.post(endPoints.wc.createCustomer, { data: payload, headers: auth });
		const responseBody = await this.getResponseBody(response, false);
		let customerId;
		if(responseBody.code){
			expect(response.status()).toBe(400);
			customerId = await this.getCustomerId(payload.username, auth);
		}
		else {
			expect(response.ok()).toBeTruthy();
			customerId = responseBody.id;
		}
		return [responseBody, customerId];
	}

	// delete customer
	async deleteCustomer(userId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.deleteCustomer(userId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.deleteCustomer(userId), { headers: auth });
		return responseBody;
	}

	/**
	 * wholesale customers  api methods
	 */

	// get all wholesale customers
	async getAllWholesaleCustomers(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllWholesaleCustomers, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllWholesaleCustomers, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// create a wholesale customer
	async createWholesaleCustomer(payload: object, auth? : auth) {
		const [, customerId] = await this.createCustomer(payload, auth);
		// const response = await this.request.post(endPoints.createWholesaleCustomer, { data: { id: customerId }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createWholesaleCustomer, { data: { id: customerId }, headers: auth });
		return [responseBody, customerId];
	}

	/**
	 * product advertisement  api methods
	 */

	// get all product advertisements
	async getAllProductAdvertisements(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllProductAdvertisements, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllProductAdvertisements, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// create a product advertisement
	async createProductAdvertisement(product: object, auth? : auth) {
		const [body, productId] = await this.createProduct(product, auth);
		const sellerId = body.store.id;
		// const response = await this.request.post(endPoints.createProductAdvertisement, { data: { vendor_id: sellerId, product_id: productId }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createProductAdvertisement, { data: { vendor_id: sellerId, product_id: productId }, headers: auth });
		const productAdvertisementId = responseBody.id;
		return [responseBody, productAdvertisementId];
	}

	/**
	 * abuse report api methods
	 */

	// get all abuse reports
	async getAllAbuseReports(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllAbuseReports, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllAbuseReports, { headers: auth });
		return responseBody;
	}

	// get abuse reportIa
	async getAbuseReportId(auth? : auth) {
		const allAbuseReports = await this.getAllAbuseReports(auth);
		const abuseReportId = allAbuseReports[0].id;
		return abuseReportId;
	}

	/**
	 * announcements api methods
	 */

	// get all announcements
	async getAllAnnouncements(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllAnnouncements, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllAnnouncements, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// create announcement
	async createAnnouncement(payload: object, auth? : auth): Promise<[object, string]> {
		// const response = await this.request.post(endPoints.createAnnouncement, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createAnnouncement, { data: payload, headers: auth });
		const announcementId = responseBody.id;
		return [responseBody, announcementId];
	}

	// delete announcement
	async deleteAnnouncement(announcementId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.deleteAnnouncement(announcementId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.deleteAnnouncement(announcementId), { headers: auth });
		return responseBody;
	}

	// update batch announcements
	async updateBatchAnnouncements(action: string, allIds: string[], auth? : auth) {
		// const response = await this.request.put(endPoints.updateBatchAnnouncements, { data: { [action]: allIds }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateBatchAnnouncements, { data: { [action]: allIds }, headers: auth });
		return responseBody;
	}

	/**
	 * product reviews api methods
	 */

	// get all product reviews
	async getAllProductReviews(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllProductReviews, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllProductReviews, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get product review id
	async getProductReviewId(auth? : auth) {
		const allProductReviews = await this.getAllProductReviews(auth);
		const reviewId = allProductReviews[0].id;
		return reviewId;
	}

	/**
	 * store reviews api methods
	 */

	// get all store reviews
	async getAllStoreReviews(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllStoreReviews, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllStoreReviews, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get store review id
	async getStoreReviewId(auth? : auth) {
		const allStoreReviews = await this.getAllStoreReviews(auth);
		const reviewId = allStoreReviews[0].id;
		return reviewId;
	}

	// delete store review
	async deleteStoreReview(reviewId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.deleteStoreReview(reviewId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.deleteStoreReview(reviewId), { headers: auth });
		return responseBody;
	}

	// update batch store reviews
	async updateBatchStoreReviews(action: string, allIds: string[], auth? : auth) {
		// const response = await this.request.put(endPoints.updateBatchStoreReviews, { data: { [action]: allIds }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateBatchStoreReviews, { data: { [action]: allIds }, headers: auth });
		return responseBody;
	}

	/**
	 * store categories api methods
	 */

	// create store category
	async createStoreCategory(payload: object, auth? : auth): Promise<[object, string]> {
		// const response = await this.request.post(endPoints.createStoreCategory, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createStoreCategory, { data: payload, headers: auth });
		const categoryId = responseBody.id;
		return [responseBody, categoryId];
	}

	// get default store category
	async getDefaultStoreCategory(auth? : auth) {
		// const response = await this.request.get(endPoints.getDefaultStoreCategory, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getDefaultStoreCategory, { headers: auth });
		const categoryId = responseBody.id;
		return [responseBody, categoryId];
	}

	// get default store category
	async setDefaultStoreCategory(categoryId: string, auth? : auth) {
		// const response = await this.request.put(endPoints.setDefaultStoreCategory, { data: { id: categoryId }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.setDefaultStoreCategory, { data: { id: categoryId }, headers: auth });
		return responseBody;
	}

	/**
	 * quote rules api methods
	 */

	// get all quote rules
	async getAllQuoteRules(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllQuoteRules, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllQuoteRules, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// create quote rule
	async createQuoteRule(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.createQuoteRule, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createQuoteRule, { data: payload, headers: auth });
		const quoteRuleId = responseBody.id;
		return [responseBody, quoteRuleId];
	}

	// delete store review
	async deleteQuoteRule(quoteRuleId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.deleteQuoteRule(quoteRuleId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.deleteQuoteRule(quoteRuleId), { headers: auth });
		return responseBody;
	}

	// delete store review
	async deleteAllQuoteRules(auth? : auth) {
		const allQuoteRuleIds = (await this.getAllQuoteRules()).map((a: { id: string }) => a.id);
		// const response = await this.request.put(endPoints.updateBatchQuoteRules, { data: { trash: allQuoteRuleIds }, headers : auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateBatchQuoteRules, { data: { trash: allQuoteRuleIds }, headers : auth });
		return responseBody;
	}


	/**
	 * request quote api methods
	 */

	// get all quote rules
	async getAllRequestQuotes(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllRequestQuotes, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllRequestQuotes, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// create quote rule
	async createRequestQuote(payload: object, auth? : auth): Promise<[object, string]> {
		// const response = await this.request.post(endPoints.createRequestQuote, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createRequestQuote, { data: payload, headers: auth });
		const quoteRuleId = responseBody[0].data.id;
		return [responseBody, quoteRuleId];
	}

	// delete store review
	async deleteRequestQuote(quoteRuleId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.deleteRequestQuote(quoteRuleId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.deleteRequestQuote(quoteRuleId), { headers: auth });
		return responseBody;
	}
	/**
	 * order downloads  api methods
	 */

	// get all order download
	async getAllOrderDownloads(orderId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.getAllOrderDownloads(orderId), { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllOrderDownloads(orderId), { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// create order download
	async createOrderDownload(orderId: string, downloadableProducts: string[], auth? : auth): Promise<[object, string]> {
		// const response = await this.request.post(endPoints.createOrderDownload(orderId), { data: { ids: downloadableProducts }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.createOrderDownload(orderId), { data: { ids: downloadableProducts }, headers: auth });
		const downloadId = String((Object.keys(responseBody))[0]);
		return [responseBody, downloadId];
	}

	/**
	 * seller badge  api methods
	 */

	// get all seller badges
	async getAllSellerBadges(auth? : auth) {
		// const response = await this.request.get(endPoints.getAllSellerBadges, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.getAllSellerBadges, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get all seller badges
	async getSellerBadgeId(eventType: string, auth? : auth) {
		const allBadges = await this.getAllSellerBadges(auth);
		const badgeId = allBadges.find((o: { event_type: string; }) => o.event_type === eventType).id;
		return badgeId;
	}

	// create seller badge
	async createSellerBadge(payload: any, auth? : auth): Promise<[object, string]> {
		const response = await this.request.post(endPoints.createSellerBadge, { data: payload, headers: auth });
		const responseBody = await this.getResponseBody(response, false);
		const badgeId = responseBody.code === 'invalid-event-type' ? await this.getSellerBadgeId(payload.event_type) : responseBody.id;
		return [responseBody, badgeId];
	}

	// update batch seller badges
	async updateBatchSellerBadges(action: string, allIds: string[], auth? : auth) {
		// const response = await this.request.put(endPoints.updateBatchSellerBadges, { data: { [action]: allIds }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.updateBatchSellerBadges, { data: { [action]: allIds }, headers: auth });
		return responseBody;
	}


	/**
	 * wp  api methods
	 */

	// settings

	// get site settings
	async getSiteSettings(auth? : auth) {
		// const response = await this.request.get(endPoints.wp.getSiteSettings, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getSiteSettings, { headers: auth });
		return responseBody;
	}

	// set site settings
	async setSiteSettings(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.wp.setSiteSettings, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wp.setSiteSettings, { data: payload, headers: auth });
		return responseBody;
	}

	// wp users

	// get all users
	async getAllUsers(auth? : auth) {
		// const response = await this.request.get(endPoints.wp.getAllUsers, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getAllUsers, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get user by role
	async getAllUsersByRole(role: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wp.getAllUsersByRole(role), { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getAllUsersByRole(role), { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get current user
	async getCurrentUser(auth? : auth): Promise<[object, string]> {
		// const response = await this.request.get(endPoints.wp.getCurrentUser, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getCurrentUser, { headers: auth });
		const userId = responseBody.id;
		return [responseBody, userId];
	}

	// get user by Id
	async getUserById(userId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wp.getUserById(userId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getUserById(userId), { headers: auth });
		return responseBody;
	}

	// create user
	async createUser(payload: object, auth? : auth) { // administrator,  customer, seller
		// const response = await this.request.post(endPoints.wp.createUser, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wp.createUser, { data: payload, headers: auth });
		return responseBody;
	}

	// update user
	async updateUser(payload: object, auth? : auth) {
		// const response = await this.request.put(endPoints.wp.createUser, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wp.createUser, { data: payload, headers: auth });
		return responseBody;
	}

	// delete user
	async deleteUser(userId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.wp.deleteUser(userId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.wp.deleteUser(userId), { headers: auth });
		return responseBody;
	}

	// plugins

	// get all plugins
	async getAllPlugins(params = {}, auth? : auth) { //TODO: run loop & increment page to grab all plugins/products/...
		// const response = await this.request.get(endPoints.wp.getAllPlugins, { data: { per_page:100 }, params: params, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getAllPlugins, { data: { per_page:100 }, params: params, headers: auth });
		return responseBody;
	}

	// get single plugin
	async getSinglePlugin(plugin: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wp.getSinglePlugin(plugin), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getSinglePlugin(plugin), { headers: auth });
		return responseBody;
	}

	// update plugin
	async updatePlugin(plugin: string, payload: object, auth? : auth) {
		// const response = await this.request.put(endPoints.wp.updatePlugin(plugin), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wp.updatePlugin(plugin), { data: payload, headers: auth });
		return responseBody;
	}

	// delete plugin
	async deletePlugin(plugin: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.wp.deletePlugin(plugin), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.wp.deletePlugin(plugin), { headers: auth });
		return responseBody;
	}

	// upload media
	async uploadMedia(filePath: string) { //TODO: handle different file upload, hardcoded: image
		const payload = { headers: { Accept: '*/*',
			ContentType: 'multipart/form-data',
			// Authorization: auth.Authorization  //TODO: handle authorization
		},
		multipart: { file: { name: String((filePath.split('/')).pop()),
			mimeType: 'image/' + (filePath.split('.')).pop(),
			// buffer: fs.readFileSync(filePath),
			buffer: Buffer.from(filePath), //TODO: test then use it instead of previous
		}, } };
		const response = await this.request.post(endPoints.wp.createMediaItem, payload);
		const responseBody = await this.getResponseBody(response);
		const mediaId = responseBody.id;
		return [responseBody, mediaId];
	}

	// upload media
	async uploadMedia3(filePath: string) {
		// const payload = fs.readFileSync(filePath);
		const payload = Buffer.from(filePath); //TODO: test then use it instead of previous
		const headers = { 'content-disposition': `attachment; filename=${String((filePath.split('/')).pop())}` };
		const response = await this.request.post(endPoints.wp.createMediaItem, { data: payload, headers });
		const responseBody = await this.getResponseBody(response);
		const mediaId = responseBody.id;
		return [responseBody, mediaId];
	}

	// get all mediaItems
	async getAllMediaItems(auth? : auth) {
		// const response = await this.request.get(endPoints.wp.getAllMediaItems, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wp.getAllMediaItems, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get mediaItemId
	async getMediaItemId(auth? : auth) {
		const getAllMediaItems = await this.getAllMediaItems(auth);
		const mediaId = getAllMediaItems[0].id;
		return mediaId;
	}

	// create post
	async createPost(payload: object, auth? : auth) {
		// const response = await this.request.put(endPoints.wp.createPost, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wp.createPost, { data: payload, headers: auth });
		return responseBody;
	}

	/**
	 * woocommerce  api methods
	 */

	// settings

	// get all wc setting options
	async getAllWcSettings(groupId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllSettingOptions(groupId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllSettingOptions(groupId), { headers: auth });
		return responseBody;
	}

	// get all single wc settings option
	async getSingleWcSettingsOption(groupId: string, optionId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getSingleSettingOption(groupId, optionId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getSingleSettingOption(groupId, optionId), { headers: auth });
		return responseBody;
	}

	// set single wc settings option
	async updateSingleWcSettingsOption(groupId: string, optionId: string, payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.wc.updateSettingOption(groupId, optionId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.updateSettingOption(groupId, optionId), { data: payload, headers: auth });
		return responseBody;
	}

	// update single wc settings option
	async updateBatchWcSettingsOptions(groupId: string, payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.wc.updateBatchSettingOptions(groupId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.updateBatchSettingOptions(groupId), { data: payload, headers: auth });
		return responseBody;
	}

	// reviews

	//create product review
	async createProductReview(product: object, review: object, auth? : auth) {
		const [, productId] = await this.createProduct(product);
		// const response = await this.request.post(endPoints.wc.createReview, { data: { ...review, product_id: productId }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.createReview, { data: { ...review, product_id: productId }, headers: auth });
		const reviewId = responseBody.id;
		return [responseBody, reviewId];
	}

	// categories

	// get all categories
	async getAllCategories(auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllCategories, { data: { per_page:100 }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllCategories, { params: { per_page:100 }, headers: auth });
		return responseBody;
	}

	// get single category
	async getSingleCategory(categoryId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getSingleCategory(categoryId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getSingleCategory(categoryId), { headers: auth });
		return responseBody;
	}

	// get categoryId
	async getCategoryId(categoryName: string, auth? : auth) {
		const allCustomers = await this.getAllCustomers(auth);
		const customerId = (allCustomers.find((o: { name: string; }) => o.name === categoryName)).id;
		return customerId;
	}

	// create category
	async createCategory(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.wc.createCategory, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.createCategory, { data: payload, headers: auth });
		const categoryId = responseBody.id;
		return [responseBody, categoryId];
	}

	// update category
	async updateCategory(categoryId: string, payload: object, auth? : auth) {
		// const response = await this.request.put(endPoints.wc.updateCategory(categoryId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wc.updateCategory(categoryId), { data: payload, headers: auth });
		return responseBody;
	}

	// delete category
	async deleteCategory(categoryId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.wc.deleteCategory(categoryId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.wc.deleteCategory(categoryId), { headers: auth });
		return responseBody;
	}

	// update batch categories
	async updateBatchCategories(action: string, allIds: string[], auth? : auth) {
		// const response = await this.request.post(endPoints.wc.updateBatchCategories, { data: { [action]: allIds }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [response, responseBody] = await this.post(endPoints.wc.updateBatchCategories, { data: { [action]: allIds }, headers: auth });
		return [response, responseBody];
	}

	// order

	// create order
	async createOrder(productPayload: object, orderPayload: any, auth? : auth): Promise<[object, string, string]> {
		const [, productId] = await this.createProduct(productPayload, auth);
		const payload = orderPayload;
		payload.line_items[0].product_id = productId;
		// const response = await this.request.post(endPoints.wc.createOrder, { data: payload, headers: payloads.adminAuth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.createOrder, { data: payload, headers: payloads.adminAuth });
		const orderId = responseBody.id;
		return [responseBody, orderId, productId];
	}

	// create complete order
	async createOrderWithStatus(product: object, order: any, status: string, auth? : auth) {
		const [, orderId] = await this.createOrder(product, order, auth);
		await this.updateOrderStatus(orderId, status);
		return orderId;
	}

	// refund

	// create refund
	async createRefund(orderId: string, refund: object, auth? : auth): Promise<[object, string]> {
		// const response = await this.request.post(endPoints.wc.createRefund(orderId), { data: refund, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.createRefund(orderId), { data: refund, headers: auth });
		const refundId = responseBody.id;
		return [responseBody, refundId];
	}

	// tax

	// get all tax rate
	async getAllTaxRates(auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllTaxRates, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllTaxRates, { headers: auth });
		return responseBody;
	}

	// create tax rate
	async createTaxRate(payload: object, auth? : auth) {
		// const response = await this.request.post(endPoints.wc.createTaxRate, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.createTaxRate, { data: payload, headers: auth });
		return responseBody;
	}

	// update batch tax rates
	async updateBatchTaxRates(action: string, allIds: string[], auth? : auth) {
		// const response = await this.request.put(endPoints.wc.updateBatchTaxRates, { data: { [action]: allIds }, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wc.updateBatchTaxRates, { data: { [action]: allIds }, headers: auth });
		return responseBody;
	}

	// setup tax
	async setUpTaxRate(enableTaxPayload: object, taxPayload: taxRate):Promise<number> {
		// enable tax rate
		await this.updateBatchWcSettingsOptions('general', enableTaxPayload);

		// delete previous tax rates
		const allTaxRateIds = (await this.getAllTaxRates()).map((a: { id: string }) => a.id);
		if (allTaxRateIds.length) {
			await this.updateBatchTaxRates('delete', allTaxRateIds);
		}

		// create tax rate
		const taxRateResponse = await this.createTaxRate(taxPayload);
		expect(parseInt(taxRateResponse.rate)).toBe(parseInt(taxPayload.rate));
		return Number(taxPayload.rate);
	}

	// shipping

	// get all shipping zones
	async getAllShippingZones(auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllShippingZones, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllShippingZones, { headers: auth });
		return responseBody;
	}

	// get zoneId
	async getZoneId(zoneName: string, auth? : auth) {
		const allZones = await this.getAllShippingZones(auth);
		const zoneId = (allZones.find((o: { name: string; }) => o.name === zoneName)).id;
		return zoneId;
	}

	// create shipping zone
	async createShippingZone(payload: object, auth? : auth): Promise<[object, string]> {
		// const response = await this.request.post(endPoints.wc.createShippingZone, { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.createShippingZone, { data: payload, headers: auth });
		const shippingZoneId = responseBody.id;
		return [responseBody, shippingZoneId];
	}

	// delete shipping zone
	async deleteShippingZone(zoneId: string, auth? : auth) {
		// const response = await this.request.delete(endPoints.wc.deleteShippingZone(zoneId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.delete(endPoints.wc.deleteShippingZone(zoneId), { headers: auth });
		return responseBody;
	}

	// get all shipping zone locations
	async getAllShippingZoneLocations(zoneId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllShippingZoneLocations(zoneId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllShippingZoneLocations(zoneId), { headers: auth });
		return responseBody;
	}

	// add shipping zone location
	async addShippingZoneLocation(zoneId: string, zoneLocation: object, auth? : auth) {
		// const response = await this.request.put(endPoints.wc.addShippingZoneLocation(zoneId), { data: zoneLocation, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wc.addShippingZoneLocation(zoneId), { data: zoneLocation, headers: auth });
		return responseBody;
	}

	// get all shipping zone methods
	async getAllShippingZoneMethods(zoneId: string, auth? : auth) {
		// const response = await this.request.get(endPoints.wc.getAllShippingZoneMethods(zoneId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllShippingZoneMethods(zoneId), { headers: auth });
		return responseBody;
	}

	// add shipping method
	async addShippingZoneMethod(zoneId: string, zoneMethod: object, auth? : auth) {
		// const response = await this.request.post(endPoints.wc.addShippingZoneMethod(zoneId), { data: zoneMethod, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.post(endPoints.wc.addShippingZoneMethod(zoneId), { data: zoneMethod, headers: auth });
		return responseBody;
	}

	// payment

	// get all payment gateway
	async getAllPaymentGateways(auth? : auth): Promise<object> {
		// const response = await this.request.get(endPoints.wc.getAllPaymentGateways, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllPaymentGateways, { headers: auth });
		return responseBody;
	}

	// get single payment gateway
	async getSinglePaymentGateway(paymentGatewayId: string, auth? : auth): Promise<object> {
		// const response = await this.request.get(endPoints.wc.getSinglePaymentGateway(paymentGatewayId), { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getSinglePaymentGateway(paymentGatewayId), { headers: auth });
		return responseBody;
	}

	// update payment gateway
	async updatePaymentGateway(paymentGatewayId: string, payload: object, auth? : auth): Promise<object> {
		// const response = await this.request.put(endPoints.wc.updatePaymentGateway(paymentGatewayId), { data: payload, headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.put(endPoints.wc.updatePaymentGateway(paymentGatewayId), { data: payload, headers: auth });
		return responseBody;
	}

	// get system status
	async getSystemStatus(auth? : auth){
		// const response = await this.request.get(endPoints.wc.getAllSystemStatus, { headers: auth });
		// const responseBody = await this.getResponseBody(response);
		const [, responseBody] = await this.get(endPoints.wc.getAllSystemStatus, { headers: auth });
		return responseBody;
	}
}
