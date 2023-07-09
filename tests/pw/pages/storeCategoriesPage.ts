import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';

export class StoreCategoriesPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// store categories


	async adminStoreCategoryRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);
		await this.click(selector.admin.dokan.vendors.storeCategories);

		// add new category elements are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.storeCategory.addNewCategory);

		// search category input is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.storeCategory.search)).toBeVisible();

		// store category table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.storeCategory.table);

	}

	// add store category
	async addStoreCategory(storeCategory: any) {
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);
		await this.click(selector.admin.dokan.vendors.storeCategories);

		await this.clearAndType(selector.admin.dokan.vendors.storeCategory.addNewCategory.name, storeCategory.name);
		await this.clearAndType(selector.admin.dokan.vendors.storeCategory.addNewCategory.description, storeCategory.description);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeCategories, selector.admin.dokan.vendors.storeCategory.addNewCategory.addNewCategory);
	}

	// search store category
	async searchStoreCategory(categoryName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreCategories);
		// await this.click(selector.admin.dokan.vendors.storeCategories);

		await this.clearInputField(selector.admin.dokan.vendors.storeCategory.search);

		await this.typeAndWaitForResponse(data.subUrls.backend.storeCategories, selector.admin.dokan.vendors.storeCategory.search, categoryName);
		await expect(this.page.locator(selector.admin.dokan.vendors.storeCategory.storeCategoryCell(categoryName))).toBeVisible();

	}

	// edit store category
	async editStoreCategory(storeCategory: any) {
		await this.searchStoreCategory(storeCategory.name);

		await this.hover(selector.admin.dokan.vendors.storeCategory.storeCategoryCell(storeCategory.name));
		await this.clickAndWaitForResponse(data.subUrls.backend.storeCategories, selector.admin.dokan.vendors.storeCategory.storeCategoryEdit);
		await this.clearAndType(selector.admin.dokan.vendors.storeCategory.editCategory.name, storeCategory.name);
		await this.clearAndType(selector.admin.dokan.vendors.storeCategory.editCategory.description, storeCategory.description);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeCategories, selector.admin.dokan.vendors.storeCategory.editCategory.update);

	}

	// update store category
	async updateStoreCategory(categoryName: string, action: string) {
		await this.searchStoreCategory(categoryName);

		await this.hover(selector.admin.dokan.vendors.storeCategory.storeCategoryCell(categoryName));

		switch(action){

		case 'set-default' :
			await this.clickAndWaitForResponse(data.subUrls.backend.storeCategories, selector.admin.dokan.vendors.storeCategory.storeCategorySetDefault);
			break;

		case 'delete' :
			await this.clickAndAcceptAndWaitForResponse(data.subUrls.backend.storeCategories, selector.admin.dokan.vendors.storeCategory.storeCategoryDelete);
			break;

		default :
			break;

		}


	}

}
