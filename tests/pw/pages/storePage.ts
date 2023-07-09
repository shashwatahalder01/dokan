import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';

const { DOKAN_PRO } = process.env;


export class StorePage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}


	// vendors

	async adminVendorsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		// vendor text is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorsText)).toBeVisible();

		// and new vendor  is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.addNewVendor)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.bulkActions);

		// search vendor input is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.search)).toBeVisible();

		// vendor table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.table);
	}

	// admin add new vendors
	async addVendor(vendorInfo: any) {
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		const firstName = vendorInfo.firstName();
		const email = vendorInfo.email();

		// add new vendor
		await this.click(selector.admin.dokan.vendors.addNewVendor);
		// account info
		await this.type(selector.admin.dokan.vendors.newVendor.firstName, firstName);
		await this.type(selector.admin.dokan.vendors.newVendor.lastName, vendorInfo.lastName());
		await this.type(selector.admin.dokan.vendors.newVendor.storeName, vendorInfo.shopName);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.newVendor.storeUrl, vendorInfo.shopName);
		await this.type(selector.admin.dokan.vendors.newVendor.phoneNumber, vendorInfo.phoneNumber);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.newVendor.email, email);
		await this.click(selector.admin.dokan.vendors.newVendor.generatePassword);
		await this.clearAndType(selector.admin.dokan.vendors.newVendor.password, vendorInfo.password);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.newVendor.username, firstName);
		await this.type(selector.admin.dokan.vendors.newVendor.companyName, vendorInfo.companyName);
		await this.type(selector.admin.dokan.vendors.newVendor.companyIdEuidNumber, vendorInfo.companyId);
		await this.type(selector.admin.dokan.vendors.newVendor.vatOrTaxNumber, vendorInfo.vatNumber);
		await this.type(selector.admin.dokan.vendors.newVendor.nameOfBank, vendorInfo.bankName);
		await this.type(selector.admin.dokan.vendors.newVendor.bankIban, vendorInfo.bankIban);
		await this.click(selector.admin.dokan.vendors.newVendor.next);
		// address
		await this.type(selector.admin.dokan.vendors.newVendor.street1, vendorInfo.street1);
		await this.type(selector.admin.dokan.vendors.newVendor.street2, vendorInfo.street2);
		await this.type(selector.admin.dokan.vendors.newVendor.city, vendorInfo.city);
		await this.type(selector.admin.dokan.vendors.newVendor.zip, vendorInfo.zipCode);
		await this.click(selector.admin.dokan.vendors.newVendor.country);
		await this.type(selector.admin.dokan.vendors.newVendor.countryInput, vendorInfo.country);
		await this.press(data.key.enter);
		await this.click(selector.admin.dokan.vendors.newVendor.state);
		await this.type(selector.admin.dokan.vendors.newVendor.stateInput, vendorInfo.state);
		await this.press(data.key.enter);
		await this.click(selector.admin.dokan.vendors.newVendor.next);
		// payment options
		await this.type(selector.admin.dokan.vendors.newVendor.accountName, vendorInfo.accountName);
		await this.type(selector.admin.dokan.vendors.newVendor.accountNumber, vendorInfo.accountNumber);
		await this.type(selector.admin.dokan.vendors.newVendor.bankName, vendorInfo.bankName);
		await this.type(selector.admin.dokan.vendors.newVendor.bankAddress, vendorInfo.bankAddress);
		await this.type(selector.admin.dokan.vendors.newVendor.routingNumber, vendorInfo.routingNumber);
		await this.type(selector.admin.dokan.vendors.newVendor.iban, vendorInfo.iban);
		await this.type(selector.admin.dokan.vendors.newVendor.swift, vendorInfo.swiftCode);
		await this.fill(selector.admin.dokan.vendors.newVendor.payPalEmail, vendorInfo.email());
		await this.check(selector.admin.dokan.vendors.newVendor.enableSelling);
		await this.check(selector.admin.dokan.vendors.newVendor.publishProductDirectly);
		await this.check(selector.admin.dokan.vendors.newVendor.makeVendorFeature);
		// create vendor
		await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.newVendor.createVendor);
		await expect(this.page.locator(selector.admin.dokan.vendors.sweetAlertTitle)).toContainText('Vendor Created');
		await this.click(selector.admin.dokan.vendors.closeSweetAlert);
	}

	// edit vendor
	async editVendor(vendor: any ){
		await this.searchVendor(vendor.storeName);

		await this.hover(selector.admin.dokan.vendors.vendorCell(vendor.storeName));
		await this.clickAndWaitForNavigation(selector.admin.dokan.vendors.vendorEdit);

		if (!DOKAN_PRO){
			console.log('lite');

			// store settings
			// await this.clearAndType(selector.admin.users.dokanStoreName, vendorName );

			// // vendor address
			// await this.clearAndType(selector.admin.users.dokanStoreUrl, vendorName );
			// await this.clearAndType(selector.admin.users.dokanAddress1, vendorName );
			// await this.clearAndType(selector.admin.users.dokanAddress2, vendorName);
			// await this.clearAndType(selector.admin.users.dokanCity, vendorName);
			// await this.clearAndType(selector.admin.users.dokanPostcode, vendorName);
			// await this.clearAndType(selector.admin.users.dokanStoreName, vendorName);
			// await this.clearAndType(selector.admin.users.dokanStoreName, vendorName);
			// await this.click(selector.admin.users.dokanCountry);
			// await this.clearAndType(selector.admin.users.dokanCountryInput, vendorName);
			// await this.press(data.key.enter);
			// await this.click(selector.admin.users.dokanState);
			// await this.clearAndType(selector.admin.users.dokanStateInput, vendorName);
			// await this.press(data.key.enter);

			// await this.clearAndType(selector.admin.users.dokanPhone, vendorName);

			// // social options
			// await this.clearAndType(selector.admin.users.dokanFacebook, vendorName);
			// await this.clearAndType(selector.admin.users.dokanTwitter, vendorName);
			// await this.clearAndType(selector.admin.users.dokanPinterest, vendorName);
			// await this.clearAndType(selector.admin.users.dokanLinkedin, vendorName);
			// await this.clearAndType(selector.admin.users.dokanInstagram, vendorName);
			// await this.clearAndType(selector.admin.users.dokanFlicker, vendorName);

			// other settings
			await this.click(selector.admin.users.dokanSelling);
			await this.click(selector.admin.users.dokanPublishing);
			await this.click(selector.admin.users.dokanFeaturedVendor);
			// TODO: fix this
		} else {

			// basic
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.firstName, vendor.username);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.lastName, vendor.lastname);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.storeName, vendor.vendorInfo.storeName);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.phoneNumber, vendor.vendorInfo.phone); //TODO: change input after fix
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.email, vendor.username + data.vendor.vendorInfo.emailDomain);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.companyName, vendor.vendorInfo.companyName);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.companyIdEuidNumber, vendor.vendorInfo.companyId);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.vatOrTaxNumber, vendor.vendorInfo.vatNumber);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.nameOfBank, vendor.vendorInfo.bankName);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.bankIban, vendor.vendorInfo.bankIban);

			// address
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.street1, vendor.vendorInfo.street1);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.street2, vendor.vendorInfo.street2);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.city, vendor.vendorInfo.city);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.zipCode, vendor.vendorInfo.zipCode);
			await this.click(selector.admin.dokan.vendors.editVendor.country);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.countryInput, vendor.vendorInfo.country);
			await this.press(data.key.enter);
			await this.click(selector.admin.dokan.vendors.editVendor.state);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.stateInput, vendor.vendorInfo.state);
			await this.press(data.key.enter);

			// social options
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.facebook, vendor.vendorInfo.socialProfileUrls.facebook);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.flickr, vendor.vendorInfo.socialProfileUrls.flickr);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.twitter, vendor.vendorInfo.socialProfileUrls.twitter);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.youtube, vendor.vendorInfo.socialProfileUrls.youtube);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.linkedin, vendor.vendorInfo.socialProfileUrls.linkedin);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.pinterest, vendor.vendorInfo.socialProfileUrls.pinterest);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.instagram, vendor.vendorInfo.socialProfileUrls.instagram);

			// payment options
			// bank
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.accountName, vendor.vendorInfo.payment.bankAccountName);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.accountNumber, vendor.vendorInfo.payment.bankAccountNumber);
			await this.selectByValue(selector.admin.dokan.vendors.editVendor.accountType, vendor.vendorInfo.payment.bankAccountType);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.bankName, vendor.vendorInfo.payment.bankName);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.bankAddress, vendor.vendorInfo.payment.bankAddress);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.routingNumber, vendor.vendorInfo.payment.bankRoutingNumber);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.iban, vendor.vendorInfo.payment.bankIban);
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.swift, vendor.vendorInfo.payment.bankSwiftCode);
			//paypal
			await this.clearAndType(selector.admin.dokan.vendors.editVendor.payPalEmail, vendor.vendorInfo.payment.email());

			//TODO: admin commission
			//TODO: vendor subscription

			// other settings
			await this.enableSwitcher(selector.admin.dokan.vendors.editVendor.enableSelling);
			await this.enableSwitcher(selector.admin.dokan.vendors.editVendor.publishProductDirectly);
			await this.enableSwitcher(selector.admin.dokan.vendors.editVendor.makeVendorFeature);

			await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.editVendor.saveChanges);

		}
	}

	// search vendor
	async searchVendor(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		await this.clearInputField(selector.admin.dokan.vendors.search);

		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.search, vendorName);
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorCell(vendorName))).toBeVisible();  //TODO: add this to base page

		// negative scenario //TODO: add this to all search also add flag to avoid this scenario
		// await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.search, vendorName + 'abcdefgh');
		// await expect(this.page.locator(selector.admin.dokan.vendors.noVendorsFound)).toBeVisible();

	}

	// update vendor
	async updateVendor(vendorName: string, action: string ){
		await this.searchVendor(vendorName);

		switch(action){

		case 'enable' :
			await this.enableSwitcherAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.statusSlider(vendorName));
			break;

		case 'disable' :
			await this.disableSwitcherAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.statusSlider(vendorName));
			break;

		default :
			break;

		}

	}

	// view vendor orders, products
	async viewVendor(vendorName: string, action: string ){
		await this.searchVendor(vendorName);

		await this.hover(selector.admin.dokan.vendors.vendorCell(vendorName));

		switch(action){

		case 'products' :
			await this.clickAndWaitForNavigation(selector.admin.dokan.vendors.vendorProducts);
			break;

		case 'orders' :
			await this.clickAndWaitForNavigation(selector.admin.dokan.vendors.vendorOrders);
			break;

		default :
			break;

		}

		const count = (await this.getElementText(selector.admin.dokan.vendors.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

	}

	// vendor bulk action
	async vendorBulkAction(action: string){
		// await this.searchVendor(vendorName); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		// ensure row exists
		await expect(this.page.locator(selector.admin.dokan.vendors.noRowsFound)).not.toBeVisible();

		await this.click(selector.admin.dokan.vendors.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.vendors.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.bulkActions.applyAction);
	}

}
