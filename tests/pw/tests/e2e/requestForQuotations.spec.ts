import { test, Page } from '@playwright/test';
import { RequestForQuotationsPage } from 'pages/requestForQuotationsPage';
import { data } from 'utils/testData';


let requestForQuotationsPage: RequestForQuotationsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	requestForQuotationsPage = new RequestForQuotationsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Request for quotation test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	// quote rules

	test('admin quote rules menu page is rendering properly @pro @explo', async ( ) => {
		await requestForQuotationsPage.adminQuoteRulesRenderProperly();
	});

	test('admin can add quote rule @pro', async ( ) => {
		await requestForQuotationsPage.addQuoteRule({ ...data.requestForQuotation.quoteRule, userRole:data.requestForQuotation.userRole.customer });
	});

	test('admin can edit quote rule @pro', async ( ) => {
		await requestForQuotationsPage.editQuoteRule({ ...data.requestForQuotation.updateQuoteRule, userRole:data.requestForQuotation.userRole.customer });
	});

	test('admin can trash quote rule @pro', async ( ) => {
		await requestForQuotationsPage.updateQuoteRule(data.requestForQuotation.quoteRule.title, 'trash');
	});

	test('admin can restore quote rule @pro', async ( ) => {
		await requestForQuotationsPage.updateQuoteRule(data.requestForQuotation.quoteRule.title, 'restore');
	});

	test('admin can permanently delete quote rule @pro', async ( ) => {
		await requestForQuotationsPage.updateQuoteRule(data.requestForQuotation.quoteRule.title, 'permanently-delete');
	});

	test('admin can perform quote rule bulk actions @pro', async ( ) => {
		await requestForQuotationsPage.quoteRulesBulkAction('trash');
	});


	// quotes

	test('admin quotes menu page is rendering properly @pro @explo', async ( ) => {
		await requestForQuotationsPage.adminQuotesRenderProperly();
	});

	test('admin can add quote @pro', async ( ) => {
		await requestForQuotationsPage.addQuote(data.requestForQuotation.quote);
	});

	test('admin can edit quote @pro', async ( ) => {
		await requestForQuotationsPage.editQuote(data.requestForQuotation.updateQuote);
	});

	test('admin can trash quote @pro', async ( ) => {
		await requestForQuotationsPage.updateQuote(data.requestForQuotation.quote.title, 'trash');
	});

	test('admin can restore quote @pro', async ( ) => {
		await requestForQuotationsPage.updateQuote(data.requestForQuotation.quote.title, 'restore');
	});

	test('admin can permanently delete quote @pro', async ( ) => {
		await requestForQuotationsPage.updateQuote(data.requestForQuotation.quote.title, 'permanently-delete');
	});

	test('admin can convert quote to order @pro', async ( ) => {
		await requestForQuotationsPage.convertQuoteToOrder(data.requestForQuotation.quote);
	});


	test('admin can perform quote bulk actions @pro', async ( ) => {
		await requestForQuotationsPage.quotesBulkAction('trash');
	});

});
