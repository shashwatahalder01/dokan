import { test, Page } from '@playwright/test';
import { vendorVerificationsPage } from 'pages/vendorVerificationsPage';
import { data } from 'utils/testData';


test.describe('Verifications test', () => {

	let admin: vendorVerificationsPage;
	let aPage: Page;


	test.beforeAll(async ({ browser }) => {
		const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
		aPage = await adminContext.newPage();
		admin = new vendorVerificationsPage(aPage);
	});


	test.afterAll(async () => {
		await aPage.close();
	});


	test('admin verifications menu page is rendering properly @pro @explo', async ( ) => {
		await admin.adminVerificationsRenderProperly();
	});

	// test.skip('admin can approve ID verification request @pro', async ( ) => {
	// 	await admin.idVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	// });

	// test.skip('admin can approve address verification request @pro', async ( ) => {
	// 	await admin.addressVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	// });

	// test.skip('admin can approve company verification request @pro', async ( ) => {
	// 	await admin.companyVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	// });

	// test.skip('admin can approve phone verification request @pro', async ( ) => {
	// 	// await admin.phoneVerificationRequest(data.predefined.vendorInfo.username,'approve');
	// });


	// test.skip('vendor can send id verification request @pro', async ( )=> {
	// 	await vendor.sendIdVerificationRequest(data.vendor.verification);
	// });

	// test.skip('vendor can send address verification request @pro', async ( )=> {
	// 	await vendor.sendAddressVerificationRequest(data.vendor.verification);
	// });

	// test.skip('vendor can send company verification request @pro', async ( )=> {
	// 	await vendor.sendCompanyVerificationRequest(data.vendor.verification);
	// });

});
