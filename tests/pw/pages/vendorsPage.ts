import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class vendorsPage extends AdminPage {

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

	// search vendor
	async searchVendor(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		await this.clearInputField(selector.admin.dokan.vendors.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.search, vendorName);
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorCell(vendorName))).toBeVisible();

		// negative scenario //TODO: add this to all search also add flag to avoid this scenario
		// await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.search, vendorName + 'abcdefgh');
		// await expect(this.page.locator(selector.admin.dokan.vendors.noVendorsFound)).toBeVisible();

	}

	// vendor bulk action
	async vendorBulkAction(action: string){
		// await this.searchVendor(vendorName); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		await this.click(selector.admin.dokan.vendors.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.vendors.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.bulkActions.applyAction);
	}

	// update vendor status
	async updateVendorStatus(vendorName: string){
		await this.searchVendor(vendorName);

		await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.statusSlider(vendorName));
	}

	// edit vendor
	async editVendor(vendorName: string, ){
		await this.searchVendor(vendorName);

		await this.hover(selector.admin.dokan.vendors.vendorCell(vendorName));
		await this.clickAndWaitForNavigation(selector.admin.dokan.vendors.vendorEdit);

		if (vendorName){
			// store settings
			await this.clearAndType(selector.admin.users.dokanStoreName, vendorName );

			// vendor address
			await this.clearAndType(selector.admin.users.dokanStoreUrl, vendorName );
			await this.clearAndType(selector.admin.users.dokanAddress1, vendorName );
			await this.clearAndType(selector.admin.users.dokanAddress2, vendorName);
			await this.clearAndType(selector.admin.users.dokanCity, vendorName);
			await this.clearAndType(selector.admin.users.dokanPostcode, vendorName);
			await this.clearAndType(selector.admin.users.dokanStoreName, vendorName);
			await this.clearAndType(selector.admin.users.dokanStoreName, vendorName);
			await this.click(selector.admin.users.dokanCountry);
			await this.clearAndType(selector.admin.users.dokanCountryInput, vendorName);
			await this.press(data.key.enter);
			await this.click(selector.admin.users.dokanState);
			await this.clearAndType(selector.admin.users.dokanStateInput, vendorName);
			await this.press(data.key.enter);

			await this.clearAndType(selector.admin.users.dokanPhone, vendorName);

			// social options
			await this.clearAndType(selector.admin.users.dokanFacebook, vendorName);
			await this.clearAndType(selector.admin.users.dokanTwitter, vendorName);
			await this.clearAndType(selector.admin.users.dokanPinterest, vendorName);
			await this.clearAndType(selector.admin.users.dokanLinkedin, vendorName);
			await this.clearAndType(selector.admin.users.dokanInstagram, vendorName);
			await this.clearAndType(selector.admin.users.dokanFlicker, vendorName);

			// other settings
			await this.click(selector.admin.users.dokanSelling);
			await this.click(selector.admin.users.dokanPublishing);
			await this.click(selector.admin.users.dokanFeaturedVendor);
		} else {
			//TODO: pro vendor edit
		}
	}

}
