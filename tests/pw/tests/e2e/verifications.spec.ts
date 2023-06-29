import { test, Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


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

test.describe.skip('Verifications test', () => {
	//TODO: need multiple verification request

	test.use({ storageState: data.auth.adminAuthFile });

	test('admin verifications menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminVerificationsRenderProperly();
	});

	test('admin can approve ID verification request @pro', async ( ) => {
		await adminPage.idVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test('admin can approve address verification request @pro', async ( ) => {
		await adminPage.addressVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test('admin can approve company verification request @pro', async ( ) => {
		await adminPage.companyVerificationRequest(data.predefined.vendorInfo.username, 'approve');
	});

	test.skip('admin can approve phone verification request @pro', async ( ) => {
		//TODO: await adminPage.phoneVerificationRequest(data.predefined.vendorInfo.username,'approve');
	});


});
