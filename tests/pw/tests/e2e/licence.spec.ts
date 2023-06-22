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

test.describe('License test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin license menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminLicenseRenderProperly();
	});

	// test.skip('admin can activate license @lite @pro', async ( ) => {
	// 	await adminPage.activateLicense(LicenseKey);
	// });


});
