import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let adminPage: AdminPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Dokan pro feature promo test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan pro features promo @lite', async ({ request } ) => {
		const apiUtils = new ApiUtils(request);
		// await apiUtils.updatePlugin('dokan-pro/dokan-pro', { status:'inactive' }, payloads.adminAuth);
		await adminPage.dokanProFeaturesPromo();
		// await apiUtils.updatePlugin('dokan-pro/dokan-pro', { status:'inactive' }, payloads.adminAuth);
	});

});
