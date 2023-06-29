import { test, Page } from '@playwright/test';
import { AbuseReportsPage } from 'pages/abuseReportsPage';
import { data } from 'utils/testData';


let abuseReportsPage: AbuseReportsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	abuseReportsPage = new AbuseReportsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Abuse report test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan abuse report menu page is rendering properly @pro @explo', async ( ) => {
		await abuseReportsPage.adminAbuseReportRenderProperly();
	});

	test('admin can perform abuse report bulk action @pro', async ( ) => {
		await abuseReportsPage.abuseReportBulkAction('delete');
	});

	test.skip('admin can filter abuse reports @pro', async ( ) => {
		// await abuseReportsPage.filterAbuseReports();
	});

});
