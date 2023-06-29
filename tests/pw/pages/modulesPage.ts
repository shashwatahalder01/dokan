import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class ModulesPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// modules

	async adminModulesRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);

		// modules text is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleText)).toBeVisible();

		// module plan elements are visible
		await this.multipleElementVisible(selector.admin.dokan.modules.pro.modulePlan);

		// navTab elements are visible
		await this.multipleElementVisible(selector.admin.dokan.modules.pro.navTabs);

		// module filter  is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleFilter)).toBeVisible();

		// modules search is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.searchBox)).toBeVisible();

		// modules view mode switcher is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleViewMode)).toBeVisible();

		// module cards and card details are visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCard)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleIcon)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCheckbox)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleName)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleDescription)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleActivationSwitch)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleDocs)).toHaveCount(38);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleVideos)).toHaveCount(17);

		// module category tags are visible
		//TODO: try to remove hardcoded category
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Product Management'))).toHaveCount(13);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Integration'))).toHaveCount(6);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('UI & UX'))).toHaveCount(2);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Shipping'))).toHaveCount(3);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Store Management'))).toHaveCount(10);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Payment'))).toHaveCount(7);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Order Management'))).toHaveCount(2);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Vendor Management'))).toHaveCount(1);

	}

	// search module
	async searchModule(moduleName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);
		await this.clickIfVisible(selector.admin.dokan.modules.pro.clearFilter); //TODO: why clear filer

		await this.clearAndType(selector.admin.dokan.modules.pro.searchBox, moduleName);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCardByName(moduleName))).toBeVisible();

	}

	// filter modules
	async filterModules(category: string){
		await this.goto(data.subUrls.backend.dokan.dokanModules);

		await this.hover(selector.admin.dokan.modules.pro.moduleFilter);
		await this.click(selector.admin.dokan.modules.pro.moduleFilterCheckBox(category));
		const numOfModules = await this.countLocator(selector.admin.dokan.modules.pro.moduleCard);
		const numOfCategoryTag = await this.countLocator(selector.admin.dokan.modules.pro.moduleCategoryTag(category));
		expect(numOfModules).toBe(numOfCategoryTag);
	}

	// activate deactivate module
	async activateDeactivateModule(moduleName: string){
		await this.searchModule(moduleName);
		await this.clickAndWaitForResponse(data.subUrls.backend.modules, selector.admin.dokan.modules.pro.moduleActivationSwitch);
	}

	// modules bulk action
	async moduleBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);

		await this.click(selector.admin.dokan.modules.pro.firstModuleCheckbox);
		await this.click(selector.admin.dokan.modules.pro.selectAllBulkAction);
		switch (action) {

		case 'activate' :
			await this.clickAndWaitForResponse(data.subUrls.backend.modules, selector.admin.dokan.modules.pro.activeAll);
			break;

		case 'deactivate' :
			await this.clickAndWaitForResponse(data.subUrls.backend.modules, selector.admin.dokan.modules.pro.deActivateAll);
			break;

		default :
			break;
		}

	}

	// module view layout
	async moduleViewLayout(style: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);

		const currentStyle = await this.getClassValue(selector.admin.dokan.modules.pro.currentLayout);

		if(!(currentStyle?.includes(style))){
			await this.click(selector.admin.dokan.modules.pro.moduleViewMode);
			await expect(this.page.locator(selector.admin.dokan.modules.pro.currentLayout)).toHaveClass(style);
		}

	}

}
