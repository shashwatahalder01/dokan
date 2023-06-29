import { test, Page } from '@playwright/test';
import { ReportsPage } from 'pages/reportsPage';
import { data } from 'utils/testData';


let reportsPage: ReportsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	reportsPage = new ReportsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Reports test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	// reports

	test('admin reports menu page is rendering properly @pro @explo', async ( ) => {
		await reportsPage.adminReportsRenderProperly();
	});

	// all logs

	test('admin All Logs menu page is rendering properly @pro @explo', async ( ) => {
		await reportsPage.adminAllLogsRenderProperly();
	});

	test.skip('admin can search all logs @pro', async ( ) => {
		await reportsPage.searchAllLogs('470');
	});

	test.skip('admin can export all logs @pro', async ( ) => {
		await reportsPage.exportAllLogs('470');
	});

	test('admin can filter all logs by store name @pro', async ( ) => {
		await reportsPage.filterAllLogsByStore(data.predefined.vendorStores.vendor1);
	});

	test('admin can filter all logs by order status @pro', async ( ) => {
		await reportsPage.filterAllLogsByStatus('completed');
	});

});
