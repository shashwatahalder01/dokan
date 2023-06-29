import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class ProPromoPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// dokan pro promo
	async dokanProPromo(){
		// dokan promo banner
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);

		// promo banner elements are visible
		await this.multipleElementVisible(selector.admin.dokan.promoBanner);

		// dokan lite modules
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanLiteModules);

		// pro upgrade popup elements are visible
		await this.multipleElementVisible(selector.admin.dokan.modules.lite.popup);

		// module cards are visible
		await this.click(selector.admin.dokan.modules.lite.popup.closeDokanUpgradePopup);
		await expect(this.page.locator(selector.admin.dokan.modules.lite.moduleText)).toBeVisible();
		await expect(this.page.locator(selector.admin.dokan.modules.lite.moduleCard)).toHaveCount(27);

		// dokan pro features menu
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProFeatures);

		// dokan pro feature sections are visible
		await this.multipleElementVisible(selector.admin.dokan.proFeatures);

		// dokan settings pro advertisement
		await this.goToDokanSettings();

		// settings pro advertisement banner elements are visible
		await this.multipleElementVisible(selector.admin.dokan.settings.proAdvertisementBanner);
	}

}
