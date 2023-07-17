import { Page } from '@playwright/test';
import { VendorPage } from 'pages/vendorPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';

export class VendorDashboardPage extends VendorPage {

	constructor(page: Page) {
		super(page);
	}


	// vendor dashboard

	// vendor dashboard render properly
	async vendorDashboardRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.dashboard);

		// profile progress elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.profileProgress);

		// at a glance elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.atAGlance);

		// graph elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.graph);

		// orders elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.orders);

		// reviews elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.reviews);

		// products elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.products);

		// announcement elements are visible
		await this.multipleElementVisible(selector.vendor.vDashboard.announcement);

	}

}
