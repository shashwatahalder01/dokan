import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';
import { payloads } from '../../utils/payloads';


let adminPage: AdminPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Request for quotation test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	// quote rules

	test('admin quote rules menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminQuoteRulesRenderProperly();
	});

	test('admin can add quote rule @pro', async ( ) => {
		await adminPage.addQuoteRule(data.requestForQuotation.quoteRule);
	});

	test('admin can edit quote rule @pro', async ( ) => {
		await adminPage.editQuoteRule(data.requestForQuotation.quoteRule);
	});

	test('admin can trash quote rule @pro', async ( ) => {
		await adminPage.updateQuoteRule(data.requestForQuotation.quoteRule.title, 'trash');
	});

	test('admin can restore quote rule @pro', async ( ) => {
		await adminPage.updateQuoteRule(data.requestForQuotation.quoteRule.title, 'restore');
	});

	test('admin can permanently delete quote rule @pro', async ( ) => {
		await adminPage.updateQuoteRule(data.requestForQuotation.quoteRule.title, 'permanently-delete');
	});

	test('admin can perform quote rule bulk actions @pro', async ( ) => {
		await adminPage.quoteRulesBulkAction('delete');
	});


	// quotes

	test('admin quotes menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminQuotesRenderProperly();
	});

	test('admin can add quote @pro', async ( ) => {
		await adminPage.addQuote(data.requestForQuotation.quoteRule);
	});

	test('admin can edit quote @pro', async ( ) => {
		await adminPage.editQuote(data.requestForQuotation.quoteRule);
	});

	test('admin can trash quote @pro', async ( ) => {
		await adminPage.updateQuote(data.requestForQuotation.quoteRule.title, 'trash');
	});

	test('admin can restore quote @pro', async ( ) => {
		await adminPage.updateQuote(data.requestForQuotation.quoteRule.title, 'restore');
	});

	test('admin can permanently delete quote @pro', async ( ) => {
		await adminPage.updateQuote(data.requestForQuotation.quoteRule.title, 'permanently-delete');
	});

	test('admin can convert quote to order @pro', async ( ) => {
		await adminPage.convertQuoteToOrder(data.requestForQuotation.quoteRule.title);
	});


	test('admin can perform quote bulk actions @pro', async ( ) => {
		await adminPage.quotesBulkAction('delete');
	});

});
