import { test, Page } from '@playwright/test';
import { SellerBadgesPage } from 'pages/sellerBadgesPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let sellerBadgesAdmin: SellerBadgesPage;
let sellerBadgesVendor: SellerBadgesPage;
let aPage: Page, vPage: Page;
let apiUtils: ApiUtils;


test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	sellerBadgesAdmin = new SellerBadgesPage(aPage);

	const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
	vPage = await vendorContext.newPage();
	sellerBadgesVendor = new SellerBadgesPage(vPage);

	apiUtils = new ApiUtils(request);
	await apiUtils.deleteAllSellerBadges(payloads.adminAuth);
	await apiUtils.createSellerBadge(payloads.createSellerBadgeExclusiveToPlatform, payloads.adminAuth);
});

test.afterAll(async ( ) => {
	await aPage.close();
	await vPage.close();
});

test.describe('Seller badge test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan seller badge menu page is rendering properly @pro @explo', async ( ) => {
		await sellerBadgesAdmin.adminSellerBadgeRenderProperly();
	});

	test('admin can create seller badge @pro', async ( ) => {
		await sellerBadgesAdmin.createSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
	});

	test('admin can search seller badge @pro', async ( ) => {
		await sellerBadgesAdmin.searchSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can edit seller badge @pro', async ( ) => {
		await sellerBadgesAdmin.editSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
	});

	test('admin can preview seller badge @pro', async ( ) => {
		await sellerBadgesAdmin.previewSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test.skip('admin can view seller badge vendors @pro', async ( ) => {
		await sellerBadgesAdmin.sellerBadgeVendors(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can filter vendors by seller badge  @pro', async ( ) => {
		await sellerBadgesAdmin.filterVendorsByBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can view seller badges acquired by vendor @pro', async ( ) => {
		await sellerBadgesAdmin.sellerBadgeAcquiredByVendor(data.predefined.vendorStores.vendor1);
	});

	test('admin can update seller badge status @pro', async ( ) => {
		await sellerBadgesAdmin.updateSellerBadgeStatus(data.sellerBadge.eventName.productsPublished, 'draft');
	});

	test('admin can delete seller badge @pro', async ( ) => {
		await sellerBadgesAdmin.deleteSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('admin can perform seller badge bulk action @pro', async ( ) => {
		await sellerBadgesAdmin.sellerBadgeBulkAction('delete');
	});

	test('vendor can view badge acquired congratulation popup message action @pro', async ( ) => {
		await sellerBadgesVendor.sellerBadgeCongratsPopup();
	});

	test('vendor can search seller badge @pro', async ( ) => {
		await sellerBadgesVendor.vendorSearchSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test('vendor can filter seller badges  @pro', async ( ) => {
		await sellerBadgesVendor.filterSellerBadges(data.sellerBadge.eventName.productsPublished);
	});

});
