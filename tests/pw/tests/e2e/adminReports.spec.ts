import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';
import { payloads } from '../../utils/payloads';


let adminPage: AdminPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Reports test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	// reports

	test('admin reports menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminReportsRenderProperly();
	});

	// all logs

	test('admin All Logs menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminAllLogsRenderProperly();
	});

	test('admin can search all logs @pro', async ( ) => {
		await adminPage.searchAllLogs('470');
	});

	test('admin can export all logs @pro', async ( ) => {
		await adminPage.exportAllLogs('470');
	});

	test('admin can filter all logs by store name @pro', async ( ) => {
		await adminPage.filterAllLogsByStore(data.predefined.vendorStores.vendor1);
	});

	test('admin can filter all logs by order status @pro', async ( ) => {
		await adminPage.filterAllLogsByStatus('completed');
	});

});
