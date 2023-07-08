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

	// filter abuse reports
	async abuseReportDetails(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);
		await this.click(selector.admin.dokan.abuseReports.abuseReportFirstCell);

		// abuse report modal elements are visible
		await this.multipleElementVisible(selector.admin.dokan.abuseReports.abuseReportModal);
		await this.click(selector.admin.dokan.abuseReports.abuseReportModal.closeModal);
	}


	// filter abuse reports
	async filterAbuseReports(input: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

		switch(action){

		case 'by-reason' :
			await this.selectByLabelAndWaitForResponse(data.subUrls.backend.abuseReports, selector.admin.dokan.abuseReports.filters.filterByAbuseReason, input);
			break;

		case 'by-product' :
			await this.click(selector.admin.dokan.abuseReports.filters.filterByProduct);
			await this.typeAndWaitForResponse(data.subUrls.api.wc.wcProducts, selector.admin.dokan.abuseReports.filters.filterInput, input);
			await this.pressAndWaitForResponse(data.subUrls.backend.abuseReports, data.key.enter);
			break;

		case 'by-vendor' :
			await this.click(selector.admin.dokan.abuseReports.filters.filterByVendors);
			await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.abuseReports.filters.filterInput, input);
			await this.pressAndWaitForResponse(data.subUrls.backend.abuseReports, data.key.enter);
			break;

		default :
			break;

		}

		const count = (await this.getElementText(selector.admin.dokan.abuseReports.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

	}

	// abuse report bulk action
	async abuseReportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

		// ensure row exists
		await expect(this.page.locator(selector.admin.dokan.abuseReports.noRowsFound)).not.toBeVisible();

		await this.click(selector.admin.dokan.abuseReports.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.abuseReports.bulkActions.selectAction, action);
		await this.clickAndAcceptAndWaitForResponse(data.subUrls.backend.abuseReports, selector.admin.dokan.abuseReports.bulkActions.applyAction);
	}


}
