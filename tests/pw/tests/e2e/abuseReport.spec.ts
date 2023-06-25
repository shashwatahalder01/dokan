import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';


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

test.describe.skip('Abuse report test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan abuse report menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminAbuseReportRenderProperly();
	});

	test('admin can perform abuse report bulk action @pro', async ( ) => {
		await adminPage.abuseReportBulkAction('delete');
	});

	test.fixme('admin can filter abuse reports @pro', async ( ) => {
		// await adminPage.filterAbuseReports();
	});

});
