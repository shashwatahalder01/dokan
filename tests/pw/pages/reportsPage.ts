import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class ReportsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// reports

	async adminReportsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanReports);

		// report Menus are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.menus);

		// filter Menus are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.reports.filterMenus);

		// calender from input is visible
		await expect(this.page.locator(selector.admin.dokan.reports.reports.dateFrom)).toBeVisible();

		// calender from input is visible
		await expect(this.page.locator(selector.admin.dokan.reports.reports.dateTo)).toBeVisible();

		// show button is visible
		await expect(this.page.locator(selector.admin.dokan.reports.reports.show)).toBeVisible();

		// at a glance elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.reports.atAGlance);

		// overview elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.reports.overview);

	}

	// all logs

	async adminAllLogsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		// report Menus are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.menus);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterByStoreInput, filterByStatusInput, ...filters } = selector.admin.dokan.reports.allLogs.filters;
		await this.multipleElementVisible(filters);

		// search is visible
		await expect(this.page.locator(selector.admin.dokan.reports.allLogs.search)).toBeVisible();

		// export log is visible
		await expect(this.page.locator(selector.admin.dokan.reports.allLogs.exportLogs)).toBeVisible();

		// all logs table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.allLogs.table);

	}

	// search all logs
	async searchAllLogs(orderId: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		await this.clearInputField(selector.admin.dokan.reports.allLogs.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary
		await this.typeAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.search, orderId);
		await expect(this.page.locator(selector.admin.dokan.reports.allLogs.orderIdCell(orderId))).toBeVisible();
		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.filters.clear);

	}

	// export all logs
	async exportAllLogs(orderId: string){
		await this.searchAllLogs(orderId);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);
		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.exportLogs);
		// await this.page.waitForResponse((resp) => resp.url().includes('wp-admin/admin.php?download-order-log-csv') && resp.status() === 200); //TODO: MERGE WITH PREVIOUS
		// TODO: need to wait for multiple response
		await Promise.all([
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.logs) && resp.status() === 200),
			this.page.waitForResponse((resp) => resp.url().includes('wp-admin/admin.php?download-order-log-csv') && resp.status() === 200),
			this.page.locator(selector.admin.dokan.reports.allLogs.exportLogs).click()
		]);

		//TODO: add wait for multiple different response on base-page
		//TODO: might fail on CI, need to accept downloads
	}

	// filter all logs by store
	async filterAllLogsByStore(storeName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		await this.click(selector.admin.dokan.reports.allLogs.filters.filterByStore);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.reports.allLogs.filters.filterByStoreInput, storeName);
		await this.pressAndWaitForResponse(data.subUrls.backend.logs, data.key.enter);

		const count = (await this.getElementText(selector.admin.dokan.reports.allLogs.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.filters.clear);
	}

	// filter all logs by status
	async filterAllLogsByStatus(orderStatus: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		await this.click(selector.admin.dokan.reports.allLogs.filters.filterByStatus);
		await this.clearAndType( selector.admin.dokan.reports.allLogs.filters.filterByStatusInput, orderStatus);
		await this.pressAndWaitForResponse(data.subUrls.backend.logs, data.key.enter);

		const count = (await this.getElementText(selector.admin.dokan.reports.allLogs.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.filters.clear);
	}

}