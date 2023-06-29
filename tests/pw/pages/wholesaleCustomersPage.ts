import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class WholesaleCustomersPage extends AdminPage {

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

	// edit wholesale customer
	async editWholesaleCustomer(wholesaleCustomer: string){
		await this.searchWholesaleCustomer(wholesaleCustomer);
		await this.hover(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer));
		await this.clickAndWaitForNavigation(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerEdit);
		//TODO:
	}


	// view wholesale customer
	async viewWholesaleCustomerOrders(wholesaleCustomer: string){
		await this.searchWholesaleCustomer(wholesaleCustomer);
		await this.hover(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer));
		await this.clickAndWaitForNavigation(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerOrders);
		//TODO: add assertion
	}

	// update wholesale customer
	async updateWholesaleCustomer(wholesaleCustomer: string, action: string ){
		await this.searchWholesaleCustomer(wholesaleCustomer);

		switch(action){

		case 'enable' :
			await this.enableSwitcherAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.statusSlider(wholesaleCustomer));
			break;

		case 'disable' :
			await this.disableSwitcherAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.statusSlider(wholesaleCustomer));
			break;

		case 'delete' :
			await this.hover(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer));
			this.acceptAlert();
			await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.wholesaleCustomerRemove);
			break;

		default :
			break;

		}

	}

	//  wholesale customers bulk action
	async wholesaleCustomerBulkAction(action: string){
		// await this.searchWholesaleCustomer(wholesaleCustomer); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		await this.click(selector.admin.dokan.wholesaleCustomer.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.wholesaleCustomer.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.bulkActions.applyAction);
	}

}
