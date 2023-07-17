import { Page, expect } from '@playwright/test';
import { VendorPage } from 'pages/vendorPage';
import { selector } from 'pages/selectors';
import { helpers } from 'utils/helpers';
import { data } from 'utils/testData';
import { user, } from 'utils/interfaces';

export class VendorDashboardPage extends VendorPage {

	constructor(page: Page) {
		super(page);
	}


	// vendor dashboard

	// vendor dashboard render properly
	async vendorDashboardRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.dashboard);

		// dashboard text is visible
		await this.toBeVisible(selector.admin.dokan.dashboard.dashboardText);

		// header elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.header);

		// at a glance elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.atAGlance);

		// overview elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.overview);

		// dokan new update elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.dokanNewUpdates);

		// Subscribe box elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { thankYouMessage, ...subscribeBox } = selector.admin.dokan.dashboard.subscribeBox;
		await this.multipleElementVisible(subscribeBox);
	}


}
