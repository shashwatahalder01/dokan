import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class StoreSupportsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// store support

	async adminStoreSupportRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		// store support text is visible
		await expect(this.page.locator(selector.admin.dokan.storeSupport.storeSupportText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.storeSupport.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.storeSupport.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, ...filters } = selector.admin.dokan.storeSupport.filters;
		await this.multipleElementVisible(filters);

		// search store support is visible
		await expect(this.page.locator(selector.admin.dokan.storeSupport.searchTicket)).toBeVisible();

		// store support table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.storeSupport.table);
	}

	// search support ticket
	async searchSupportTicket(title: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.clearInputField(selector.admin.dokan.storeSupport.searchTicket); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.searchTicket, title);
		// await expect(this.page.locator(selector.admin.dokan.storeSupport.supportTicketLink(title))).toBeVisible();
		const count = (await this.getElementText(selector.admin.dokan.storeSupport.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);
	}

	// filter store supports
	async filterStoreSupports(input: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);
		// await this.clickIfVisible(selector.admin.dokan.storeSupport.filters.filterClear);

		switch(action){

		case 'by-vendor' :
			await this.click(selector.admin.dokan.storeSupport.filters.filterByVendors);
			await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.storeSupport.filters.filterInput, input);
			await this.press(data.key.enter);
			await this.clickAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.filters.filterButton);
			break;

		case 'by-customer' :
			await this.click(selector.admin.dokan.storeSupport.filters.filterByCustomers);
			await this.typeAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.filters.filterInput, input);
			await this.press(data.key.enter);
			await this.clickAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.filters.filterButton);
			break;

		default :
			break;
		}

		const count = (await this.getElementText(selector.admin.dokan.storeSupport.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);
	}


	// reply to support ticket
	async replySupportTicket(replyMessage: string, replier = 'admin'){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);
		await this.clickAndWaitForNavigation(selector.admin.dokan.storeSupport.supportTicketFirstCell);

		if(replier === 'vendor'){
			await this.selectByValue(selector.admin.dokan.storeSupport.supportTicketDetails.chatAuthor, 'vendor');
		}

		await this.clearAndType(selector.admin.dokan.storeSupport.supportTicketDetails.chatReply, replyMessage);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.supportTicketDetails.sendReply);

	}

	// update support ticket email notification
	async updateSupportTicketEmailNotification(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);
		await this.clickAndWaitForNavigation(selector.admin.dokan.storeSupport.supportTicketFirstCell);

		switch(action){

		case 'enable' :
			await this.enableSwitcherAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.supportTicketDetails.emailNotification);
			break;

		case 'disable' :
			await this.disableSwitcherAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.supportTicketDetails.emailNotification);
			break;

		default :
			break;

		}
	}

	// close support ticket
	async closeSupportTicket(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);
		await this.clickAndWaitForNavigation(selector.admin.dokan.storeSupport.supportTicketFirstCell);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.supportTicketDetails.closeTicket);
	}

	// reopen support ticket
	async reopenSupportTicket(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);
		await this.clickAndWaitForNavigation(selector.admin.dokan.storeSupport.navTabs.closed);
		await this.clickAndWaitForNavigation(selector.admin.dokan.storeSupport.supportTicketFirstCell);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.supportTicketDetails.reopenTicket);
	}


	// store support bulk action
	async storeSupportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.click(selector.admin.dokan.storeSupport.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.storeSupport.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeSupport, selector.admin.dokan.storeSupport.bulkActions.applyAction);
		//TODO: add assertion
	}

}
