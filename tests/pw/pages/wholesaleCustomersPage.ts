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

		await this.clearInputField(selector.admin.dokan.wholesaleCustomer.search);

		await this.typeAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.search, wholesaleCustomer);
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer))).toBeVisible();
	}

	// edit wholesale customer
	async editWholesaleCustomer(wholesaleCustomer: any){
		await this.searchWholesaleCustomer(wholesaleCustomer.username);
		await this.hover(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer.username));
		await this.clickAndWaitForNavigation(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerEdit);

		// basic info
		await this.selectByValue(selector.admin.users.userInfo.role, wholesaleCustomer.customerInfo.role);
		await this.clearAndType(selector.admin.users.userInfo.firstName, wholesaleCustomer.username);
		await this.clearAndType(selector.admin.users.userInfo.lastName, wholesaleCustomer.lastname);
		await this.clearAndType(selector.admin.users.userInfo.nickname, wholesaleCustomer.username );

		// contact info
		await this.clearAndType(selector.admin.users.userInfo.email, wholesaleCustomer.username + data.customer.customerInfo.emailDomain);

		// About the user
		await this.clearAndType(selector.admin.users.userInfo.biographicalInfo, wholesaleCustomer.customerInfo.biography);

		// customer address

		// billing
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.firstName, wholesaleCustomer.username );
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.lastName, wholesaleCustomer.lastname );
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.company, wholesaleCustomer.customerInfo.companyName);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.address1, wholesaleCustomer.customerInfo.street1);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.address2, wholesaleCustomer.customerInfo.street2);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.city, wholesaleCustomer.customerInfo.city);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.postcode, wholesaleCustomer.customerInfo.zipCode);
		await this.click(selector.admin.users.userInfo.billingAddress.country);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.countryInput, wholesaleCustomer.customerInfo.country);
		await this.press(data.key.enter);
		await this.click(selector.admin.users.userInfo.billingAddress.state);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.stateInput, wholesaleCustomer.customerInfo.state);
		await this.press(data.key.enter);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.phone, wholesaleCustomer.customerInfo.phone);
		await this.clearAndType(selector.admin.users.userInfo.billingAddress.email, wholesaleCustomer.username + data.customer.customerInfo.emailDomain);

		// shipping
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.firstName, wholesaleCustomer.username );
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.lastName, wholesaleCustomer.lastname );
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.company, wholesaleCustomer.customerInfo.companyName);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.address1, wholesaleCustomer.customerInfo.street1);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.address2, wholesaleCustomer.customerInfo.street2);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.city, wholesaleCustomer.customerInfo.city);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.postcode, wholesaleCustomer.customerInfo.zipCode);
		await this.click(selector.admin.users.userInfo.shippingAddress.country);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.countryInput, wholesaleCustomer.customerInfo.country);
		await this.press(data.key.enter);
		await this.click(selector.admin.users.userInfo.shippingAddress.state);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.stateInput, wholesaleCustomer.customerInfo.state);
		await this.press(data.key.enter);
		await this.clearAndType(selector.admin.users.userInfo.shippingAddress.phone, wholesaleCustomer.customerInfo.phone);

		// update user
		await this.clickAndWaitForResponse(data.subUrls.user, selector.admin.users.updateUser, 302);
		await expect(this.page.locator(selector.admin.users.updateSuccessMessage)).toContainText('User updated.');
	}

	// view wholesale customer orders
	async viewWholesaleCustomerOrders(wholesaleCustomer: string){
		await this.searchWholesaleCustomer(wholesaleCustomer);
		await this.hover(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer));
		await this.clickAndWaitForNavigation(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerOrders);
		// await expect(this.page).toHaveURL(/.*wp-admin\/edit.php?post_type=shop_order&_customer_user.*/);

		const count = (await this.getElementText(selector.admin.dokan.wholesaleCustomer.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);
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

		// ensure row exists
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.noRowsFound)).not.toBeVisible();

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
		await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleRegister, selector.customer.cDashboard.becomeWholesaleCustomer);
		const neeApproval = await this.isVisible(selector.customer.cDashboard.wholesaleRequestReturnMessage);
		if (!neeApproval) {
			await expect(this.page.locator(selector.customer.cWooSelector.wooCommerceSuccessMessage)).toContainText(data.wholesale.becomeWholesaleCustomerSuccessMessage);
		}
		else {
			await expect(this.page.locator(selector.customer.cDashboard.wholesaleRequestReturnMessage)).toContainText(data.wholesale.wholesaleRequestSendMessage);
			await this.loginPage.switchUser(data.admin);
			await this.updateWholesaleCustomer(currentUser!, 'enable'); //TODo: fix this
		}
	}

}
