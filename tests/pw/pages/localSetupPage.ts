import { Page } from '@playwright/test';
import { WpPage } from 'pages/wpPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class LocalSetupPage extends WpPage {

	constructor(page: Page) {
		super(page);
	}


	//  local site setup

	// setup wordpress
	async setupWp() {
		await this.goto(data.subUrls.backend.setupWP);
		const alreadyInstalledIsVisible = await this.isVisible(selector.backend.alreadyInstalled);
		if (alreadyInstalledIsVisible) {
			return;
		}
		await this.clickAndWaitForNavigation(selector.backend.languageContinue);
		const letsGoIsVisible = await this.isVisible(selector.backend.letsGo);

		if (letsGoIsVisible) {
			await this.clickAndWaitForNavigation(selector.backend.letsGo);
			await this.fill(selector.backend.dbName, data.installWp.dbName);
			await this.fill(selector.backend.dbUserName, data.installWp.dbUserName);
			await this.fill(selector.backend.dbPassword, data.installWp.dbPassword);
			await this.fill(selector.backend.dbHost, data.installWp.dbHost);
			await this.fill(selector.backend.dbTablePrefix, data.installWp.dbTablePrefix);
			await this.clickAndWaitForNavigation(selector.backend.submit);
			await this.clickAndWaitForNavigation(selector.backend.runTheInstallation);

		} else {
			await this.fill(selector.backend.siteTitle, data.installWp.siteTitle);
			await this.fill(selector.backend.adminUserName, data.installWp.adminUserName);
			await this.fill(selector.backend.adminPassword, data.installWp.adminPassword);
			await this.fill(selector.backend.adminEmail, data.installWp.adminEmail);
			await this.clickAndWaitForNavigation(selector.backend.installWp);
			await this.clickAndWaitForNavigation(selector.backend.successLoginIn);
		}
	}

}
