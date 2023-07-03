import { expect, type Page } from '@playwright/test';
import { LoginPage } from 'pages/loginPage';
import { AdminPage } from 'pages/adminPage';
// import { CustomerPage } from './customerPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';



export class WholesaleCustomersPage extends AdminPage {
		// https://medium.com/@thevirtuoid/extending-multiple-classes-in-javascript-2f4752574e65
	constructor(page: Page) {
		super(page);
	}
	loginPage = new LoginPage(this.page);

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

	// view wholesale customer orders
	async viewWholesaleCustomerOrders(wholesaleCustomer: string){
		await this.searchWholesaleCustomer(wholesaleCustomer);
		await this.hover(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer));
		await this.clickAndWaitForNavigation(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerOrders);
		// await expect(this.page).toHaveURL(/.*wp-admin\/edit.php?post_type=shop_order&_customer_user.*/);
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
			await this.clickAndAcceptAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.wholesaleCustomerRemove);
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

	
	// customer request to become wholesale customer
	async customerRequestForBecomeWholesaleCustomer(): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.myAccount);
		await this.click(selector.customer.cDashboard.becomeWholesaleCustomer);
		await expect(this.page.locator(selector.customer.cDashboard.wholesaleRequestReturnMessage)).toContainText(data.wholesale.wholesaleRequestSendMessage);
	}

	// customer become wholesale customer
	async customerBecomeWholesaleCustomer(): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.myAccount);
		const currentUser = await this.getCurrentUser();
		await this.click(selector.customer.cDashboard.becomeWholesaleCustomer);
		const neeApproval = await this.isVisible(selector.customer.cDashboard.wholesaleRequestReturnMessage);
		if (!neeApproval) {
			await expect(this.page.locator(selector.customer.cWooSelector.wooCommerceSuccessMessage)).toContainText(data.wholesale.becomeWholesaleCustomerSuccessMessage);
		}
		else {
			await expect(this.page.locator(selector.customer.cWooSelector.wooCommerceSuccessMessage)).toContainText(data.wholesale.wholesaleRequestSendMessage);
			await this.loginPage.switchUser(data.admin);
			await this.updateWholesaleCustomer(currentUser!, 'enable'); //TOOD: fix this
		}
	}

}
