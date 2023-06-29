import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class LicensePage extends AdminPage {
	constructor(page: Page) {
		super(page);
	}

	// license
	async adminLicenseRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanLicense);

		// license settings text is visible
		await expect(this.page.locator(selector.admin.dokan.license.licenseText)).toBeVisible();

		// license section elements are visible
		await this.multipleElementVisible(selector.admin.dokan.license.activateSection);

	}

	// activate license
	async activateLicense(key: string, type = 'correct'){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanLicense);
		await this.clearAndType(selector.admin.dokan.license.activateSection.licenseKeyInput, key);
		await this.clickAndWaitForResponse(data.subUrls.backend.dokan.dokanLicense, selector.admin.dokan.license.activateSection.activateLicense);
		if(type === 'correct') {
			//TODO:
		} else {
			await expect(this.page.locator(selector.admin.dokan.license.activateSection.errorNotice)).toContainText('Invalid License Key');
		}
	}

}
