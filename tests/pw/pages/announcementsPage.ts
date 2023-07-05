import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class AnnouncementsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// announcements

	async adminAnnouncementsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		// announcement text is visible
		await expect(this.page.locator(selector.admin.dokan.announcements.announcementText)).toBeVisible();

		// and announcement is visible
		await expect(this.page.locator(selector.admin.dokan.announcements.addNewAnnouncement)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.announcements.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.announcements.bulkActions);

		// announcement table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.announcements.table);

	}


	// add announcement
	async addAnnouncement(announcement: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.click(selector.admin.dokan.announcements.addNewAnnouncement);

		await this.clearAndType(selector.admin.dokan.announcements.addAnnouncement.title, announcement.title);
		await this.typeFrameSelector(selector.admin.dokan.announcements.addAnnouncement.contentIframe, selector.admin.dokan.announcements.addAnnouncement.contentHtmlBody, announcement.content);
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.addAnnouncement.publish);
		//TODO: add assertion
	}

	// edit announcement
	async editAnnouncement(announcement: any){
		await this.goto(data.subUrls.backend.dokan.dokanAnnouncements);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.hover(selector.admin.dokan.announcements.announcementCell(announcement.title));
		await this.click(selector.admin.dokan.announcements.announcementEdit);

		await this.typeFrameSelector(selector.admin.dokan.announcements.addAnnouncement.contentIframe, selector.admin.dokan.announcements.addAnnouncement.contentHtmlBody, announcement.content);
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.addAnnouncement.publish);
		//TODO: add assertion
	}

	// delete announcement
	async deleteAnnouncement(announcementTitle: string){
		await this.goto(data.subUrls.backend.dokan.dokanAnnouncements);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.hover(selector.admin.dokan.announcements.announcementCell(announcementTitle));
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.announcementDelete);
	}

	// announcement bulk action
	async announcementBulkAction(action: string){
		await this.goto(data.subUrls.backend.dokan.dokanAnnouncements);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.click(selector.admin.dokan.announcements.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.announcements.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.bulkActions.applyAction);
	}

}
