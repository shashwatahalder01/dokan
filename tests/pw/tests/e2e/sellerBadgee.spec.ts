import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { VendorPage } from 'pages/vendorPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let adminPage: AdminPage;
let vendorPage: VendorPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
	vendorPage = new VendorPage(page);
	apiUtils = new ApiUtils(request);
	// await apiUtils.deleteAllSellerBadges(payloads.adminAuth);
	//TODO: create a badge for bulk action
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Seller badge test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan seller badge menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminSellerBadgeRenderProperly();
	});

	test('admin can create seller badge @pro', async ( ) => {
		await adminPage.createSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
	});

	test('admin can search seller badge @pro', async ( ) => {
		await adminPage.searchSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can edit seller badge @pro', async ( ) => {
		await adminPage.editSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
	});

	test('admin can preview seller badge @pro', async ( ) => {
		await adminPage.previewSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can view seller badge vendors @pro', async ( ) => {
		await adminPage.sellerBadgeVendors(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can filter vendors by seller badge  @pro', async ( ) => {
		await adminPage.filterVendorsByBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can view seller badges acquired by vendor @pro', async ( ) => {
		await adminPage.sellerBadgeAcquiredByVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can update seller badge status @pro', async ( ) => {
		await adminPage.updateSellerBadgeStatus(data.sellerBadge.eventName.productsPublished, 'draft');
	});

	test('admin can delete seller badge @pro', async ( ) => {
		await adminPage.deleteSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can perform seller badge bulk action @pro', async ( ) => {
		await adminPage.sellerBadgeBulkAction('delete');
	});

	// test.skip('vendor can view badge acquired congratulation popup message action @pro', async ( ) => {
	// 	//TODO: await vendorPage.sellerBadgeCongratsPopup();
	// });

	// test.skip('vendor can search seller badge @pro', async ( ) => {
	// 	await vendorPage.searchSellerBadge(data.sellerBadge.eventName.productsPublished);
	// });

	// test.skip('vendor can filter seller badges  @pro', async ( ) => {
	// 	await vendorPage.filterBadges(data.sellerBadge.eventName.productsPublished);
	// });

});
