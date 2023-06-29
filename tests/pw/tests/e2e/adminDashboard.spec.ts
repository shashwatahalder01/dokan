import { test, Page } from '@playwright/test';
import { AdminDashboardPage } from 'pages/adminDashboardPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';

let adminDashboardPage: AdminDashboardPage;
let page: Page;
let apiUtils: ApiUtils;
let summary: any;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminDashboardPage = new AdminDashboardPage(page);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await page.close();
});


test.describe('Admin dashboard test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan admin dashboard is rendering properly @lite @pro @explo', async ( ) => {
		await adminDashboardPage.adminDashboardRenderProperly();
	});

	test.skip('admin dashboard at a glance values are accurate @lite @pro', async ({ request } ) => {
		const apiUtils = new ApiUtils(request);
		const summary = await apiUtils.getAdminReportSummary( payloads.adminAuth); //TODO: fix admin auth don't work if test use auth from storageJ son
		await adminDashboardPage.dokanAtAGlanceValueAccuracy(summary);
	});

	test('admin can add dokan news subscriber @lite @pro', async ( ) => {
		await adminDashboardPage.addDokanNewsSubscriber(data.user.userDetails);
	});

});