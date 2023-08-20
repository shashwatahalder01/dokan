import { test, Page } from '@playwright/test';
import { RequestForQuotationsPage } from 'pages/requestForQuotationsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


test.describe('Request for quotation test admin', () => {

	let admin: RequestForQuotationsPage;
	let aPage: Page;
	let apiUtils: ApiUtils;
	const productId: string[] = [];
	const quoteTitle = data.requestForQuotation.quote.title();


	test.beforeAll(async ({ browser, request }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		admin = new RequestForQuotationsPage(aPage);

		apiUtils = new ApiUtils(request);
		const [, pId,] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
		productId.push(pId);
		await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: quoteTitle }, payloads.adminAuth);

	});


	test.afterAll(async () => {
		await aPage.close();
	});

	// quotes

	test('admin quotes menu page is rendering properly @pro @explo', async ( ) => {
		await admin.adminQuotesRenderProperly();
	});

	test('admin can add quote @pro', async ( ) => {
		await admin.addQuote({ ...data.requestForQuotation.quote, title: data.requestForQuotation.quote.title() });
	});

	test('admin can edit quote @pro', async ( ) => {
		await admin.editQuote({ ...data.requestForQuotation.quote, title: quoteTitle });
	});

	test('admin can trash quote @pro', async ( ) => {
		await admin.updateQuote(quoteTitle, 'trash');
	});

	test('admin can restore quote @pro', async ( ) => {
		await admin.updateQuote(quoteTitle, 'restore');
	});

	test('admin can permanently delete quote @pro', async ( ) => {
		await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: data.requestForQuotation.trashedQuote.title, status: 'trash' }, payloads.adminAuth);
		await admin.updateQuote(data.requestForQuotation.trashedQuote.title, 'permanently-delete');
	});

	test('admin can approve quote @pro', async ( ) => {
		await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: data.requestForQuotation.convertedQuote.title }, payloads.adminAuth);
		await admin.approveQuote(data.requestForQuotation.convertedQuote.title);
	});

	test('admin can convert quote to order @pro', async ( ) => {
		await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: data.requestForQuotation.convertedQuote.title, status: 'approve' }, payloads.adminAuth);
		await admin.convertQuoteToOrder(data.requestForQuotation.convertedQuote.title);
	});

	test('admin can perform quote bulk actions @pro', async ( ) => {
		await admin.quotesBulkAction('trash');
	});


});


test.describe('Request for quotation test vendor', () => {

	let vendor: RequestForQuotationsPage;
	let vPage:Page;
	let apiUtils: ApiUtils;
	const productId: string[] = [];
	const quoteTitle = data.requestForQuotation.quote.title();
	let productName: string;
	let pId: string;
	let quoteId: string;


	test.beforeAll(async ({ browser, request }) => {

		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		vendor = new RequestForQuotationsPage(vPage);

		apiUtils = new ApiUtils(request);
		[, pId, productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
		productId.push(pId);
		[, quoteId] = await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: quoteTitle }, payloads.adminAuth);

	});


	test.afterAll(async () => {
		await vPage.close();
	});

	test('vendor request quotes menu page is rendering properly @pro @explo', async ( ) => {
		await vendor.vendorRequestQuotesRenderProperly();
	});

	test('vendor can view request quote details @pro @explo', async ( ) => {
		await vendor.vendorViewQuoteDetails(quoteTitle);
	});

	test('vendor can update quote request @pro', async ( ) => {
		await vendor.vendorUpdateQuoteRequest(quoteId, { ...data.requestForQuotation.vendorUpdateQuote, productName:productName });
	});

	test('vendor can approve quote request @pro', async ( ) => {
		await vendor.vendorApproveQuoteRequest(quoteId);
	});

	test('vendor can convert quote request to order @pro', async ( ) => {
		// const [, quoteId] = await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: quoteTitle, status: 'approve' }, payloads.adminAuth);
		await vendor.vendorConvertQuoteToOrder(quoteId);
	});


});


test.describe('Request for quotation test customer', () => {

	let customer: RequestForQuotationsPage;
	let guest: RequestForQuotationsPage;
	let cPage:Page, uPage:Page;
	let apiUtils: ApiUtils;
	const productId: string[] = [];
	const quoteTitle = data.requestForQuotation.quote.title();
	let productName: string;
	let pId: string;
	let quoteId: string;


	test.beforeAll(async ({ browser, request }) => {

		const customerContext = await browser.newContext({ storageState: data.auth.customerAuthFile });
		cPage = await customerContext.newPage();
		customer = new RequestForQuotationsPage(cPage);

		// const guestContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
		// uPage = await guestContext.newPage();
		// guest =  new RequestForQuotationsPage(uPage);

		apiUtils = new ApiUtils(request);

		[, pId, productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
		productId.push(pId);
		await apiUtils.createQuoteRule({ ...payloads.createQuoteRule(), product_ids: productId, apply_on_all_product: '0', }, payloads.adminAuth);
		[, quoteId] = await apiUtils.createRequestQuote({ ...payloads.createRequestQuote(), product_ids: productId, quote_title: quoteTitle }, payloads.adminAuth);

		// console.log(productName, quoteId);

	});


	test.afterAll(async () => {
		await cPage.close();
		// await uPage.close();
	});


	test.only('customer request for quote menu page is rendering properly @pro @explo', async ( ) => {
		await customer.requestForQuoteRenderProperly();
	});

	test.only('customer requested quote page is rendering properly @pro @explo', async ( ) => {
		await customer.requestedQuotesRenderProperly();
	});

	test.only('customer can view requested quote details @pro @explo', async ( ) => {
		await customer.customerViewQuoteDetails(quoteTitle);
	});

	test.only('customer can update quote request @pro', async ( ) => {
		await customer.customerUpdateQuoteRequest(quoteId, { ...data.requestForQuotation.customerQuoteProduct, productName:productName });
	});

	test.only('customer can pay order converted from quote request @pro', async ( ) => {
		await apiUtils.convertQuoteToOrder(quoteId, payloads.adminAuth);
		await customer.payConvertedQuote(quoteId);
	});

	test.only('customer can quote product @pro @explo', async ( ) => {
		await customer.customerQuoteProduct({ ...data.requestForQuotation.customerQuoteProduct, productName:productName });
	});

	// test.only('guest customer can quote product @pro @explo', async ( ) => {
	// 	await guest.customerQuoteProduct({ ...data.requestForQuotation.customerQuoteProduct, productName:productName }, data.requestForQuotation.guest());
	// });


});