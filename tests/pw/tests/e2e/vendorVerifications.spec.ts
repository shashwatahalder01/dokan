import { test, Page } from '@playwright/test';
import { vendorVerificationsPage } from 'pages/vendorVerificationsPage';
import { data } from 'utils/testData';


test.describe('Verifications test', () => {

	let admin: vendorVerificationsPage;
	let vendor: vendorVerificationsPage;
	let aPage: Page, vPage: Page;


	test.beforeAll(async ({ browser }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		admin = new vendorVerificationsPage(aPage);

		const vendorContext = await browser.newContext({ storageState: data.auth.vendorAuthFile });
		vPage = await vendorContext.newPage();
		vendor = new vendorVerificationsPage(vPage);


	});


	test.afterAll(async () => {
		await aPage.close();
		await vPage.close();
	});


	// vendor


	test('vendor can send id verification request @pro', async ( ) => {
		await vendor.sendIdVerificationRequest(data.vendor.verification);
	});

	test('vendor can send address verification request @pro', async ( ) => {
		await vendor.sendAddressVerificationRequest(data.vendor.verification);
	});

	test('vendor can send company verification request @pro', async ( ) => {
		await vendor.sendCompanyVerificationRequest(data.vendor.verification);
	});

	//todo: remove dependency: admin tests depends on vendor tests

	test('admin verifications menu page is rendering properly @pro @explo', async ( ) => {
		await admin.adminVerificationsRenderProperly();
	});

	test('admin can approve ID verification request @pro', async ( ) => {
		await admin.idVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test('admin can approve address verification request @pro', async ( ) => {
		await admin.addressVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test('admin can approve company verification request @pro', async ( ) => {
		await admin.companyVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});



});
