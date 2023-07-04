import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { helpers } from 'utils/helpers';
import { data } from 'utils/testData';


export class AdminDashboardPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// admin dashboard

	// admin dashboard render properly
	async adminDashboardRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);

		// dashboard text is visible
		await expect(this.page.locator(selector.admin.dokan.dashboard.dashboardText)).toBeVisible();

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

	// at a glance value
	async dokanAtAGlanceValueAccuracy(atAGlanceValues: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);
		const netSales = await this.getElementText(selector.admin.dokan.dashboard.atAGlance.netSalesThisMonth) as string;
		const commissionEarned = await this.getElementText(selector.admin.dokan.dashboard.atAGlance.commissionEarned) as string;

		expect(helpers.roundToTwo(Number(helpers.price(netSales)))).toBe(helpers.roundToTwo(Number(atAGlanceValues.sales.this_month))); // TODO: check for further errors
		expect(helpers.roundToTwo(Number(helpers.price(commissionEarned)))).toBe(helpers.roundToTwo(Number(atAGlanceValues.earning.this_month))); // TODO: check for further errors
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.signupThisMonth)).toContainText(atAGlanceValues.vendors.this_month + ' Vendor');
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.vendorAwaitingApproval)).toContainText(atAGlanceValues.vendors.inactive + ' Vendor');
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.productCreatedThisMonth)).toContainText(atAGlanceValues.products.this_month + ' Products');
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.withdrawAwaitingApproval)).toContainText(atAGlanceValues.withdraw.pending + ' Withdrawals');
	}

	// add dokan news subscriber
	async addDokanNewsSubscriber(user:any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);

		await this.clearAndType(selector.admin.dokan.dashboard.subscribeBox.subscriberName, user.name());
		await this.clearAndType(selector.admin.dokan.dashboard.subscribeBox.subscriberEmail, user.email());
		await this.clickAndWaitForResponse(data.subUrls.backend.subscribe, selector.admin.dokan.dashboard.subscribeBox.subscribeButton);
		await expect(this.page.locator(selector.admin.dokan.dashboard.subscribeBox.thankYouMessage)).toContainText('Thank you for subscribing!');

	}

}
