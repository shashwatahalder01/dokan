import { test, Page } from '@playwright/test';
import { AnnouncementsPage } from 'pages/announcementsPage';
import { ApiUtils } from 'utils/apiUtils';
import { data } from 'utils/testData';
import { payloads } from 'utils/payloads';


let announcementsPage: AnnouncementsPage;
let aPage: Page;
let apiUtils: ApiUtils;

test.beforeAll(async ({ browser, request }) => {
	const adminContext = await browser.newContext({ storageState: data.auth.adminAuthFile });
	aPage = await adminContext.newPage();
	announcementsPage = new AnnouncementsPage(aPage);
	apiUtils = new ApiUtils(request);
});

test.afterAll(async ( ) => {
	await aPage.close();
});

test.describe('Announcements test', () => {

	// test.use({ storageState: data.auth.adminAuthFile });

	test('dokan announcements menu page is rendering properly @pro @explo', async ( ) => {
		await announcementsPage.adminAnnouncementsRenderProperly();
	});

	test('admin can add announcement @pro', async ( ) => {
		await announcementsPage.addAnnouncement(data.announcement.create);
	});

	// test('admin can edit announcement @pro', async ( ) => {  //TODO: don't exist
	// 	await announcementsPage.editAnnouncement(data.announcement.update);
	// });

	test('admin can delete announcements @pro', async ( ) => {
		await announcementsPage.deleteAnnouncement(data.announcement.create.title);
	});

	test('admin can perform announcements bulk action @pro', async ( ) => {
		await announcementsPage.announcementBulkAction('trash');
	});


});
