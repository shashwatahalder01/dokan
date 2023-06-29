import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class WholesalePage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// wholesale customers
	async adminWholesaleCustomersRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		// wholesale customer text is visible
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.wholesaleCustomer.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.wholesaleCustomer.bulkActions);

		// search wholesale customer input is visible
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.search)).toBeVisible();

		// wholesale customer table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.wholesaleCustomer.table);

	}

	// search wholesale customer
	async searchWholesaleCustomer(wholesaleCustomer: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		await this.clearInputField(selector.admin.dokan.wholesaleCustomer.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.search, wholesaleCustomer);
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer))).toBeVisible();
	}

	// vendor bulk action
	async wholesaleCustomerBulkAction(action: string){
		// await this.searchWholesaleCustomer(wholesaleCustomer); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		await this.click(selector.admin.dokan.wholesaleCustomer.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.wholesaleCustomer.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.bulkActions.applyAction);
	}

	// update wholesale customer status
	async updateWholesaleCustomerStatus(wholesaleCustomer: string, ){
		//TODO: add choice and based on choice enable or disable status
		await this.searchWholesaleCustomer(wholesaleCustomer);

		await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.statusSlider(wholesaleCustomer));
	}

}
