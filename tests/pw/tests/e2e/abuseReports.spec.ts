import { test, Page } from '@playwright/test';
import { AbuseReportsPage } from 'pages/abuseReportsPage';
import { ApiUtils } from 'utils/apiUtils';
import { dbUtils } from 'utils/dbUtils';
import { data } from 'utils/testData';
import { dbData } from 'utils/dbData';
import { payloads } from 'utils/payloads';


const { VENDOR_ID, CUSTOMER_ID } = process.env;

let abuseReportsPage: AbuseReportsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	abuseReportsPage = new AbuseReportsPage(aPage);
	apiUtils = new ApiUtils(request);
	const productId = await apiUtils.getProductId(data.predefined.simpleProduct.product1.name, payloads.vendorAuth);
	await dbUtils.createAbuseReport(dbData.dokan.createAbuseReport, productId, VENDOR_ID, CUSTOMER_ID);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Abuse report test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan abuse report menu page is rendering properly @pro @explo', async ( ) => {
		await abuseReportsPage.adminAbuseReportRenderProperly();
	});

	test('admin can view abuse report details @pro', async ( ) => {
		await abuseReportsPage.abuseReportDetails();
	});

	test('admin can filter abuse reports by abuse reason @pro', async ( ) => {
		await abuseReportsPage.filterAbuseReports('This content is spam', 'by-reason');
	});

	test('admin can filter abuse reports by product @pro', async ( ) => {
		await abuseReportsPage.filterAbuseReports(data.predefined.simpleProduct.product1.name, 'by-product');
	});

	test('admin can filter abuse reports by vendor @pro', async ( ) => {
		await abuseReportsPage.filterAbuseReports(data.predefined.vendorStores.vendor1, 'by-vendor');
	});

	test('admin can perform abuse report bulk action @pro', async ( ) => {
		await abuseReportsPage.abuseReportBulkAction('delete');
	});

	//TODO: add customer tests

});
