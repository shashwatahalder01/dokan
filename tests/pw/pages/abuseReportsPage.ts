import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class AbuseReportsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// abuse reports

	async adminAbuseReportRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

		// abuse reports text is visible
		await expect(this.page.locator(selector.admin.dokan.abuseReports.abuseReportsText)).toBeVisible();

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.abuseReports.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, ...filters } = selector.admin.dokan.abuseReports.filters;
		await this.multipleElementVisible(filters);

		// abuse report table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.abuseReports.table);

	}

	// abuse report bulk action
	async abuseReportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

		await this.click(selector.admin.dokan.abuseReports.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.abuseReports.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.abuseReports, selector.admin.dokan.abuseReports.bulkActions.applyAction);
	}

	// filter abuse reports
	// async filterAbuseReports(vendorName){
	// 	await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

	// 	await this.click(selector.admin.dokan.abuseReports.filters.filterByAbuseReason);
	// 	await this.typeAndWaitForResponse(data.subUrls.backend.abuseReports, selector.admin.dokan.withdraw.filters.filterByVendorInput, vendorName);
	// 	await this.pressAndWaitForResponse(data.subUrls.backend.abuseReports, data.key.enter);
	// }


}
