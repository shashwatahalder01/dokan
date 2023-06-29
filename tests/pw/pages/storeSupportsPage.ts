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
	async searchSupportTicket(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.clearInputField(selector.admin.dokan.storeSupport.searchTicket); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.supportTicket, selector.admin.dokan.storeSupport.searchTicket, vendorName);
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorCell(vendorName))).toBeVisible();
	}

	// store support bulk action
	async storeSupportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.click(selector.admin.dokan.storeSupport.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.storeSupport.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.supportTicket, selector.admin.dokan.storeSupport.bulkActions.applyAction);
	}

	// filter store supports
	async filterStoreSupports(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		// await this.clickIfVisible(selector.admin.dokan.storeReviews.filters.filterClear);
		//TODO: multiple filter exists
		//filter by vendor
		await this.click(selector.admin.dokan.storeReviews.filters.filterByVendor);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.storeReviews.filters.filterInput, vendorName);
		await this.pressAndWaitForResponse(data.subUrls.backend.storeReviews, data.key.enter);
	}

}
