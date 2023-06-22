// import { test, Page } from '@playwright/test';
// import { AdminPage } from '../../pages/adminPage';
// import { ApiUtils } from '../../utils/apiUtils';
// import { data } from '../../utils/testData';


// let adminPage: AdminPage;
// let page: Page;
// let apiUtils: ApiUtils;

// test.beforeAll(async ({ browser, request }) => {
// 	const context = await browser.newContext({});
// 	page = await context.newPage();
// 	adminPage = new AdminPage(page);
// 	apiUtils = new ApiUtils(request);
// });

// test.afterAll(async ( ) => {
// 	await page.close();
// });

// test.describe('Product Advertising test', () => {

// 	test.use({ storageState: data.auth.adminAuthFile });

// 	test('dokan product advertising menu page is rendering properly @pro', async ( ) => {
// 		await adminPage.adminProductAdvertisingRenderProperly();
// 	});

// 	test('admin can perform product advertising bulk action @pro', async ( ) => {
// 		await adminPage.announcementBulkAction('activate');
// 	});

// 	test.skip('admin can add product advertising  @pro', async ( ) => {
// 		await adminPage.addProductAdvertising(data.predefined.customerInfo.username1);
// 	});

// 	test.skip('admin can edit announcement @pro', async ( ) => {
// 		await adminPage.editProductAdvertising(data.predefined.customerInfo.username1);
// 	});

// 	test.skip('admin can delete announcements  @pro', async ( ) => {
// 		await adminPage.deleteProductAdvertising(data.predefined.customerInfo.username1);
// 	});


// });
