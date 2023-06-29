import { test, Page } from '@playwright/test';
import { AnnouncementsPage } from 'pages/announcementsPage';
import { data } from 'utils/testData';


let announcementsPage: AnnouncementsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext({});
	page = await context.newPage();
	announcementsPage = new AnnouncementsPage(page);
});

test.afterAll(async ( ) => {
	await page.close();
});

test.describe('Announcements test', () => {

	test.use({ storageState: data.auth.adminAuthFile });

	test('dokan announcements menu page is rendering properly @pro @explo', async ( ) => {
		await announcementsPage.adminAnnouncementsRenderProperly();
	});

	test('admin can perform announcements bulk action @pro', async ( ) => {
		await announcementsPage.announcementBulkAction('trash');
	});

	test.fixme('admin can add announcement @pro', async ( ) => {
		await announcementsPage.addAnnouncement(data.announcement);
	});

	test.fixme('admin can edit announcement @pro', async ( ) => {
		await announcementsPage.editAnnouncement(data.predefined.customerInfo.username1);
	});

	test.fixme('admin can delete announcements  @pro', async ( ) => {
		await announcementsPage.deleteAnnouncement(data.predefined.customerInfo.username1);
	});


});
