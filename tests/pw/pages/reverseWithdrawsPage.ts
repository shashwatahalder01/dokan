import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class ReverseWithdrawsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// reverse withdraw

	async adminReverseWithdrawRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanReverseWithdraw);

		// reverse withdraw text is visible
		await expect(this.page.locator(selector.admin.dokan.reverseWithdraw.reverseWithdrawText)).toBeVisible();

		// fact cards elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reverseWithdraw.reverseWithdrawFactCards);

		//TODO: add filters

		// reverse withdraw table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reverseWithdraw.table);
	}

}
