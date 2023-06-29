import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';
import { LoginPage } from 'pages/loginPage';


let adminPage: AdminPage;
let loginPage: LoginPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
	loginPage = new LoginPage(page);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Modules test', () => {

	test.use({ storageState: data.auth.adminAuthFile });
	// test('authenticate admin', async () => {
	// 	const loginPage = new LoginPage(page);
	// 	await loginPage.adminLogin(data.admin, data.auth.adminAuthFile);
	// });

	test('dokan modules menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminModulesRenderProperly();
	});

	test('admin can search module @pro', async ( ) => {
		await adminPage.searchModule(data.modules.modulesName.AuctionIntegration);
	});

	test('admin can filter modules by category @pro', async ( ) => {
		await adminPage.filterModules(data.modules.moduleCategory.productManagement);
	});

	test('admin can deactivate module  @pro', async ( ) => {
		await adminPage.activateDeactivateModule(data.modules.modulesName.AuctionIntegration);
	});

	test('admin can activate module @pro', async ( ) => {
		await adminPage.activateDeactivateModule(data.modules.modulesName.AuctionIntegration);
	});

	test('admin can perform module bulk action @pro', async ( ) => {
		await adminPage.moduleBulkAction('activate');
	});

	test('admin can change module view layout @pro', async ( ) => {
		await adminPage.moduleViewLayout(data.modules.layout.list);
	});


});
