import { test, Page } from '@playwright/test';
import { SellerBadgesPage } from 'pages/sellerBadgesPage';
import { VendorPage } from 'pages/vendorPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';


let sellerBadgesPage: SellerBadgesPage;
let vendorPage: VendorPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	sellerBadgesPage = new SellerBadgesPage(page);
	vendorPage = new VendorPage(page);
	apiUtils = new ApiUtils(request);
	// await apiUtils.deleteAllSellerBadges(payloads.adminAuth);
	//TODO: create a badge for bulk action
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Seller badge test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan seller badge menu page is rendering properly @pro @explo', async ( ) => {
		await sellerBadgesPage.adminSellerBadgeRenderProperly();
	});

	test('admin can create seller badge @pro', async ( ) => {
		await sellerBadgesPage.createSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
	});

	test('admin can search seller badge @pro', async ( ) => {
		await sellerBadgesPage.searchSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can edit seller badge @pro', async ( ) => {
		await sellerBadgesPage.editSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
	});

	test('admin can preview seller badge @pro', async ( ) => {
		await sellerBadgesPage.previewSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can view seller badge vendors @pro', async ( ) => {
		await sellerBadgesPage.sellerBadgeVendors(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can filter vendors by seller badge  @pro', async ( ) => {
		await sellerBadgesPage.filterVendorsByBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can view seller badges acquired by vendor @pro', async ( ) => {
		await sellerBadgesPage.sellerBadgeAcquiredByVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can update seller badge status @pro', async ( ) => {
		await sellerBadgesPage.updateSellerBadgeStatus(data.sellerBadge.eventName.productsPublished, 'draft');
	});

	test('admin can delete seller badge @pro', async ( ) => {
		await sellerBadgesPage.deleteSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test.skip('admin can perform seller badge bulk action @pro', async ( ) => {
		await sellerBadgesPage.sellerBadgeBulkAction('delete');
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
