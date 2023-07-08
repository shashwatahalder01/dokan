import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class ProductAdvertisingPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// product advertising

	// regenerate product advertisement payment product
	async recreateProductAdvertisementPaymentViaSettingsSave(){
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.productAdvertising);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.productAdvertisingSaveChanges);
		await expect(this.page.locator(selector.admin.dokan.settings.dokanUpdateSuccessMessage)).toContainText('Setting has been saved successfully.');
	}

	async adminProductAdvertisingRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		// product advertising text is visible
		await expect(this.page.locator(selector.admin.dokan.productAdvertising.productAdvertisingText)).toBeVisible();

		// add new Advertisement is visible
		await expect(this.page.locator(selector.admin.dokan.productAdvertising.addNewProductAdvertising)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.productAdvertising.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.productAdvertising.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterByStoreInput, filterByCreatedVia, ...filters } = selector.admin.dokan.productAdvertising.filters;
		await this.multipleElementVisible(filters);

		// product advertising search is visible
		await expect(this.page.locator(selector.admin.dokan.productAdvertising.search)).toBeVisible();

		// product advertising table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.productAdvertising.table);
	}

	// add new product advertisement
	async addNewProductAdvertisement(advertising: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		await this.click(selector.admin.dokan.productAdvertising.addNewProductAdvertising);

		await this.click(selector.admin.dokan.productAdvertising.addNewAdvertisement.selectStoreDropdown);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.productAdvertising.addNewAdvertisement.selectStoreInput, advertising.advertisedProductStore);
		await this.press(data.key.enter);

		await this.click(selector.admin.dokan.productAdvertising.addNewAdvertisement.selectProductDropdown);
		await this.typeAndWaitForResponse(data.subUrls.backend.products, selector.admin.dokan.productAdvertising.addNewAdvertisement.selectProductInput, advertising.advertisedProduct);
		await this.press(data.key.enter);

		await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.addNewAdvertisement.addNew);
		await this.click(selector.admin.dokan.productAdvertising.actionSuccessful);
		await this.click(selector.admin.dokan.productAdvertising.addNewAdvertisement.closeModal);
	}

	// search advertised product
	async searchAdvertisedProduct(productOrOrder: string | number){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		await this.clearInputField(selector.admin.dokan.productAdvertising.search);

		await this.typeAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.search, String(productOrOrder));
		if (typeof(productOrOrder) != 'number'){
			await expect(this.page.locator(selector.admin.dokan.productAdvertising.advertisedProductCell(productOrOrder))).toBeVisible();
		} else {
			await expect(this.page.locator(selector.admin.dokan.productAdvertising.advertisedProductOrderIdCell(productOrOrder))).toBeVisible();
		}
	}

	// filter advertised product
	async filterAdvertisedProduct(input: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		switch (action) {

		case 'by-store' :
			await this.click(selector.admin.dokan.productAdvertising.filters.allStoresDropdown);
			await this.typeAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.filters.filterByStoreInput, input);
			await this.pressAndWaitForResponse(data.subUrls.backend.productAdvertising, data.key.enter);
			break;

		case 'by-creation' :
			await this.click(selector.admin.dokan.productAdvertising.filters.createdViaDropdown);
			await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.filters.filterByCreatedVia(input));
			break;

		default :
			break;
		}

		const count = (await this.getElementText(selector.admin.dokan.productAdvertising.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

	}

	// update advertised product
	async updateAdvertisedProduct(productName: string, action: string){
		await this.searchAdvertisedProduct(productName);

		await this.hover(selector.admin.dokan.productAdvertising.advertisedProductCell(productName));
		switch (action) {

		case 'expire' :
			await this.click(selector.admin.dokan.productAdvertising.advertisedProductExpire);
			break;

		case 'delete' :
			await this.click(selector.admin.dokan.productAdvertising.advertisedProductDelete);
			break;

		default :
			break;
		}

		await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.confirmAction);
		await this.click(selector.admin.dokan.productAdvertising.actionSuccessful);
	}

	// product advertising bulk action
	async productAdvertisingBulkAction(action: string){
		// await this.searchAdvertisedProduct(vendorName); //TODO: can be used to minimized number of rows to be affected
		// await this.goto(data.subUrls.backend.dokan.dokanProductAdvertising);
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		await this.click(selector.admin.dokan.vendors.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.productAdvertising.bulkActions.selectAction, action);
		await this.click(selector.admin.dokan.productAdvertising.bulkActions.applyAction);
		await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.confirmAction);
		await this.click(selector.admin.dokan.productAdvertising.actionSuccessful);
	}

}
