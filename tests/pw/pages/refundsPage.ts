import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class RefundsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// refunds

	async adminRefundRequestsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRefunds);

		// refund request text is visible
		await expect(this.page.locator(selector.admin.dokan.refunds.refundRequestsText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.refunds.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.refunds.bulkActions);

		// refund request search is visible
		await expect(this.page.locator(selector.admin.dokan.refunds.search)).toBeVisible();

		// refund table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.refunds.table);

	}

	// search refund request
	async searchRefundRequests(orderOrStore: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRefunds);

		await this.clearInputField(selector.admin.dokan.refunds.search);

		await this.typeAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.search, String(orderOrStore));
		if (!isNaN(Number(orderOrStore))){
			await expect(this.page.locator(selector.admin.dokan.refunds.refundCell(orderOrStore))).toBeVisible();

		} else {
			const count = (await this.getElementText(selector.admin.dokan.refunds.numberOfRowsFound))?.split(' ')[0];
			expect(Number(count)).not.toBe(0);
		}
	}

	// update refund request
	async updateRefundRequests(orderNumber: any, action: string){
		await this.searchRefundRequests(orderNumber);

		await this.hover(selector.admin.dokan.refunds.refundCell(orderNumber));
		switch (action) {

		case 'approve' :
			await this.clickAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.approveRefund(orderNumber));
			break;

		case 'cancel' :
			await this.clickAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.cancelRefund(orderNumber));
			break;

		default :
			break;
		}

	}

	// refund request bulk action
	async refundRequestsBulkAction(action: string){
		await this.goto(data.subUrls.backend.dokan.dokanRefunds);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanRefunds);

		await this.click(selector.admin.dokan.refunds.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.refunds.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.bulkActions.applyAction);
	}


}
