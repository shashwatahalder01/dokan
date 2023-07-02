import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class RequestForQuotationsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// request for quote

	// quote rules

	async adminQuoteRulesRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		// request for quote menus are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.menus);

		// quote rules text is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesText)).toBeVisible();

		// new quote rules is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quoteRules.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quoteRules.bulkActions);

		// quote rules elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quoteRules.table);
	}


	async updateQuoteRuleFields(rule: any){
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.ruleTitle, rule.title);
		await this.check(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.applyQuoteFor(rule.userRole));

		// products
		await this.click(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.applyOnAllProducts);
		// await this.click(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.selectProductsDropDown);
		// await this.typeAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.selectProductsInput, rule.product);
		// await this.press(data.key.enter);

		// category
		// await this.check(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.selectCategories(rule.category));

		await this.selectByValue(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.hidePrice, rule.hidePrice);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.hidePriceText, rule.hidePriceText);
		await this.selectByValue(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.hideAddToCartButton, rule.hideAddToCartButton);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.customButtonLabel, rule.customButtonLabel);

		// priority
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.priorityOrder, rule.order);

		// publish
		await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.publishRule);
		// await this.wait(5);

	}

	// add quote rule
	async addQuoteRule(rule: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		// await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule);

		// TODO: need to wait for multiple response
		// // const qrs: string[][] = [[data.subUrls.backend.quotes, '200'], [data.subUrls.backend.products, '200']];
		// const qrs: string[][] = [[data.subUrls.backend.quotes, '200']];
		// await this.clickAndWaitForResponses(qrs, selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule);
		await Promise.all([
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.quotes) && resp.status() === 200),
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.products) && resp.status() === 200),
			this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule).click()
		]);

		await this.updateQuoteRuleFields(rule);
	}

	// edit quote rule
	async editQuoteRule(rule: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesCell(rule.title));
		// TODO: need to wait for multiple response
		// await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesEdit(rule.title));
		await Promise.all([
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.quotes) && resp.status() === 200),
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.products) && resp.status() === 200),
			this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesEdit(rule.title)).click()
		]);

		await this.updateQuoteRuleFields(rule);

	}

	// update quote rule
	async updateQuoteRule(quoteTitle: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		switch (action) {

		case 'trash' :
			await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesTrash(quoteTitle));
			break;

		case 'permanently-delete' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.trashedQuoteRulesCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesPermanentlyDelete(quoteTitle));
			break;

		case 'restore' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.trashedQuoteRulesCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesRestore(quoteTitle));
			break;

		default :
			break;
		}

	}

	// quote rules bulk action
	async quoteRulesBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		await this.click(selector.admin.dokan.requestForQuotation.quoteRules.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.requestForQuotation.quoteRules.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.bulkActions.applyAction);
	}


	// quotes

	async adminQuotesRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		// request for quote menus are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.menus);

		// quotes text is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quotesList.quotesText)).toBeVisible();

		// new quote is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quotesList.newQuote)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quotesList.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quotesList.bulkActions);

		// quotes table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quotesList.table);
	}

	async updateQuoteFields(quote: any, action = 'create'){

		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteTitle, quote.title);

		// customer information
		await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteUserDropDown);
		await this.typeAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteUserInput, quote.user);
		await this.press(data.key.enter);
		// await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.fullName, quote.fullName);
		// await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.email, quote.email);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.companyName, quote.companyName);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.phoneNumber, quote.phoneNumber);

		// quote product
		if (action === 'create'){
			await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.addProducts);

			await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteProductDropDown);
			await this.typeAndWaitForResponse(data.subUrls.backend.products, selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteProductInput, quote.product);
			await this.press(data.key.enter);

			await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteProductQuantity, quote.quantity);
			await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.addToQuote);
		}

		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.offerPrice, quote.offerPrice);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.offerProductQuantity, quote.offerProductQuantity);

		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.publishQuote);

	}

	// add quote
	async addQuote(quote: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.click(selector.admin.dokan.requestForQuotation.quotesList.newQuote);
		await this.updateQuoteFields(quote, 'create');
	}

	// add quote
	async editQuote(quote: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quote.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteEdit(quote.title));
		await this.updateQuoteFields(quote, 'update');
	}

	// update quote
	async updateQuote(quoteTitle: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		switch (action) {

		case 'trash' :
			await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteTrash(quoteTitle));
			break;

		case 'permanently-delete' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quotePermanentlyDelete(quoteTitle));
			break;

		case 'restore' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteRestore(quoteTitle));
			break;

		default :
			break;
		}

	}

	// convert quote to order
	async convertQuoteToOrder(quote: any){
		await this.addQuote(quote);

		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quote.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteEdit(quote.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.convertToOrder);

	}

	// quotes bulk action
	async quotesBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.click(selector.admin.dokan.requestForQuotation.quotesList.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.requestForQuotation.quotesList.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.bulkActions.applyAction);
	}

}
