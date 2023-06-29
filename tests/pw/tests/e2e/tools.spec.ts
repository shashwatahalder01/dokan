import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';


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

test.describe('Tools test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan tools menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminToolsRenderProperly();
	});

	test('admin can perform dokan page Installation @pro', async ( ) => {
		await adminPage.dokanPageInstallation();
	});

	test('admin can regenerate order sync table @pro', async ( ) => {
		await adminPage.regenerateOrderSyncTable();
	});

	test('admin can check for duplicate orders @pro', async ( ) => {
		await adminPage.checkForDuplicateOrders();
	});

	// test('admin can set dokan setup wizard @lite @pro', async ( ) => {
	// 	await adminPage.setDokanSetupWizard(data.dokanSetupWizard);
	// });

	test.skip('admin can regenerate variable product variations author IDs @pro', async ( ) => {
		await adminPage.regenerateVariableProductVariationsAuthorIds();
	});

	//ToDo:
	test.skip('admin can import dummy data @pro', async ( ) => {
		await adminPage.importDummyData();
	});

	test.skip('admin can clear dummy data @pro', async ( ) => {
		await adminPage.clearDummyData();
	});

	test('admin can test distance matrix API @pro', async ( ) => {
		await adminPage.testDistanceMatrixApi(data.tools.distanceMatrixApi);
	});

});
