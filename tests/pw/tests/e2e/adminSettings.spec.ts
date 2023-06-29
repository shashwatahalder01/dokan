import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
// import { payloads } from 'utils/payloads';


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

test.describe('Settings test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin settings menu page is rendering properly @lite @pro @explo', async ( ) => {
		await adminPage.adminSettingsRenderProperly();
	});

	test('admin can search settings @lite @pro', async ( ) => {
		await adminPage.searchSettings('Selling Options');
	});

	test('admin can scroll to top on settings @lite @pro', async ( ) => {
		await adminPage.scrollToTopSettings();
	});

	// dokan settings

	test('admin can set dokan general settings @lite @pro', async ( ) => {
		await adminPage.setDokanGeneralSettings(data.dokanSettings.general);
	});

	test('admin can set dokan selling settings @lite @pro', async ( ) => {
		await adminPage.setDokanSellingSettings(data.dokanSettings.selling);
	});

	test('admin can set dokan withdraw settings @lite @pro', async ( ) => {
		await adminPage.setDokanWithdrawSettings(data.dokanSettings.withdraw);
	});

	test('admin can set dokan reverse withdraw settings @lite @pro', async ( ) => {
		await adminPage.setDokanReverseWithdrawSettings(data.dokanSettings.reverseWithdraw);
	});

	test('admin can set dokan page settings @lite @pro', async ( ) => {
		await adminPage.setPageSettings(data.dokanSettings.page);
	});

	test('admin can set dokan appearance settings @lite @pro', async ( ) => {
		await adminPage.setDokanAppearanceSettings(data.dokanSettings.appearance);
	});

	test('admin can set dokan privacy policy settings @lite @pro', async ( ) => {
		await adminPage.setDokanPrivacyPolicySettings(data.dokanSettings.privacyPolicy);
	});

	test('admin can set dokan store support settings @pro', async ( ) => {
		await adminPage.setDokanStoreSupportSettings(data.dokanSettings.storeSupport);
	});

	test('admin can set dokan rma settings @pro', async ( ) => {
		await adminPage.setDokanRmaSettings(data.dokanSettings.rma);
	});

	test('admin can set dokan wholesale settings @pro', async ( ) => {
		await adminPage.setDokanWholesaleSettings(data.dokanSettings.wholesale);
	});

	test('admin can set dokan eu compliance settings @pro', async ( ) => {
		await adminPage.setDokanEuComplianceSettings(data.dokanSettings.euCompliance);
	});

	test.skip('admin can set dokan delivery time settings @pro', async ( ) => {
		await adminPage.setDokanDeliveryTimeSettings(data.dokanSettings.deliveryTime);
	});

	test('admin can set dokan product advertising settings @pro', async ( ) => {
		await adminPage.setDokanProductAdvertisingSettings(data.dokanSettings.productAdvertising);
	});

	test('admin can set dokan geolocation settings @pro', async ( ) => {
		await adminPage.setDokanGeolocationSettings(data.dokanSettings.geolocation);
	});

	test('admin can set dokan product report abuse settings @pro', async ( ) => {
		await adminPage.setDokanProductReportAbuseSettings(data.dokanSettings.productReportAbuse);
	});

	test('admin can set dokan spmv settings @pro', async ( ) => {
		await adminPage.setDokanSpmvSettings(data.dokanSettings.spmv);
	});

	test('admin can set dokan vendor subscription settings @pro', async ( ) => {
		await adminPage.setDokanVendorSubscriptionSettings(data.dokanSettings.vendorSubscription);
		await adminPage.disableDokanVendorSubscription(data.dokanSettings.vendorSubscription);
	});

	//TODO: add more set settings

});
