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

		await this.typeAndWaitForResponse(data.subUrls.backend.supportTicket, selector.admin.dokan.storeSupport.searchTicket, title);
		await expect(this.page.locator(selector.admin.dokan.storeSupport.supportTicketLink(title))).toBeVisible();
	}

	// store support bulk action
	async storeSupportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.click(selector.admin.dokan.storeSupport.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.storeSupport.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.supportTicket, selector.admin.dokan.storeSupport.bulkActions.applyAction);
		//TODO: add assertion
	}

	// filter store supports
	async filterStoreSupports(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		// await this.clickIfVisible(selector.admin.dokan.storeReviews.filters.filterClear);
		//TODO: multiple filter exists
		//filter by vendor
		await this.click(selector.admin.dokan.storeSupport.filters.filterByVendors);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.storeSupport.filters.filterInput, vendorName);
		await this.press(data.key.enter);
		await this.clickAndWaitForResponse(data.subUrls.backend.dokan.dokanStoreSupport, selector.admin.dokan.storeSupport.filters.filterButton);
		//TODO: add assertion
	}

}
