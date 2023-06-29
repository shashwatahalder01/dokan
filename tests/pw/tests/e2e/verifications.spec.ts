import { test, Page } from '@playwright/test';
import { VerificationsPage } from 'pages/verificationsPage';
import { data } from 'utils/testData';


let verificationsPage: VerificationsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	verificationsPage = new VerificationsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe.skip('Verifications test', () => {
	//TODO: need multiple verification request

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin verifications menu page is rendering properly @pro @explo', async ( ) => {
		await verificationsPage.adminVerificationsRenderProperly();
	});

	test('admin can approve ID verification request @pro', async ( ) => {
		await verificationsPage.idVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test('admin can approve address verification request @pro', async ( ) => {
		await verificationsPage.addressVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test('admin can approve company verification request @pro', async ( ) => {
		await verificationsPage.companyVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test.skip('admin can approve phone verification request @pro', async ( ) => {
		//TODO: await verificationsPage.phoneVerificationRequest(data.predefined.vendorInfo.username,'approve');
	});


});