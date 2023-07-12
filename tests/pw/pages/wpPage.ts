import { Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class WpPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}


	// wordpress site settings

	// plugin activation check
	async checkActivePlugins(plugins: any) {
		await this.goIfNotThere(data.subUrls.backend.plugins);
		for (const pluginSlug of plugins.pluginSlugList) {
			await this.toHaveClass(selector.admin.plugins.plugin(pluginSlug), plugins.activeClass);
		}
	}


	// admin set wordpress site settings
	async setWpSettings(wpSettings: any) {
		await this.setWpGeneralSettings(wpSettings.general);
		await this.setPermalinkSettings(wpSettings.permalink);
	}


	// set wp general settings
	async setWpGeneralSettings(general: any) {
		await this.goto(data.subUrls.backend.general);

		// enable user registration
		await this.check(selector.admin.settings.membership);
		// timezone
		await this.selectByValue(selector.admin.settings.timezone, general.timezone);
		await this.click(selector.admin.settings.generalSaveChanges);
		await this.toContainText(selector.admin.settings.updatedSuccessMessage, general.saveSuccessMessage);
	}


	// admin set permalink settings
	async setPermalinkSettings(permalink: any) {
		await this.goto(data.subUrls.backend.permalinks);

		// set permalinks settings
		await this.click(selector.admin.settings.postName);
		const customBaseIsVisible = await this.isVisible(selector.admin.settings.customBase);
		if(customBaseIsVisible){
			await this.click(selector.admin.settings.customBase);
			await this.clearAndType(selector.admin.settings.customBaseInput, permalink.customBaseInput);
		}
		await this.click(selector.admin.settings.permalinkSaveChanges);
		await this.toContainText(selector.admin.settings.updatedSuccessMessage, permalink.saveSuccessMessage);
	}


}
