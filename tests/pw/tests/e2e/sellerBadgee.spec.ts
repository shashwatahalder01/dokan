import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';
import { LoginPage } from '../../pages/loginPage';
import { payloads } from '../../utils/payloads';


let adminPage: AdminPage;
let page: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	adminPage = new AdminPage(page);
	apiUtils = new ApiUtils(request);
	// await apiUtils.deleteAllSellerBadges(payloads.adminAuth);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Seller badge test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan seller badge menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminSellerBadgeRenderProperly();
	});

	test('admin can create seller badge @pro', async ( ) => {
		// await adminPage.createSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.productsPublished });
		await adminPage.createSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.verifiedSeller,  verificationMethod: data.sellerBadge.verifiedSellerMethod.addressVerification });
	});

	test('admin can search seller badge @pro', async ( ) => {
		await adminPage.searchSellerBadge(data.sellerBadge.eventName.productsPublished);
	});

	test.only('admin can edit seller badge @pro', async ( ) => {
		await adminPage.editSellerBadge({ ...data.sellerBadge, badgeName: data.sellerBadge.eventName.verifiedSeller,  verificationMethod: data.sellerBadge.verifiedSellerMethod.idVerification });
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


	// test('admin can perform seller badge bulk action @pro', async ( ) => {
	// 	await adminPage.sellerBadgeBulkAction('delete');
	// });


	// test.only('authenticate admin', async ({ page }) => {
	// 	const loginPage = new LoginPage(page);
	// 	await loginPage.adminLogin(data.admin, data.auth.adminAuthFile);
	// });
});
