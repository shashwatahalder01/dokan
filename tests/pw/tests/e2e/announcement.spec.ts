import { test, Page } from '@playwright/test';
import { AdminPage } from '../../pages/adminPage';
import { ApiUtils } from '../../utils/apiUtils';
import { data } from '../../utils/testData';


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

test.describe('Announcements test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan announcements menu page is rendering properly @pro', async ( ) => {
		await adminPage.adminAnnouncementsRenderProperly();
	});

	test('admin can perform announcements bulk action @pro', async ( ) => {
		await adminPage.announcementBulkAction('trash');
	});

	test.fixme('admin can add announcement @pro', async ( ) => {
		await adminPage.addAnnouncement(data.announcement);
	});

	test.fixme('admin can edit announcement @pro', async ( ) => {
		await adminPage.editAnnouncement(data.predefined.customerInfo.username1);
	});

	test.fixme('admin can delete announcements  @pro', async ( ) => {
		await adminPage.deleteAnnouncement(data.predefined.customerInfo.username1);
	});


});
