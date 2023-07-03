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

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, clearFilter, filteredResult,  ...filters } = selector.admin.dokan.reverseWithdraw.filters;
		await this.multipleElementVisible(filters);

		// reverse withdraw table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reverseWithdraw.table);
	}

	// filter reverse withdraw
	async filterReverseWithdraws(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanReverseWithdraw);

		await this.clickIfVisible(selector.admin.dokan.reverseWithdraw.filters.clearFilter);

		await this.click(selector.admin.dokan.reverseWithdraw.filters.filterByStore);
		await this.typeAndWaitForResponse(data.subUrls.backend.reverseWithdraws, selector.admin.dokan.reverseWithdraw.filters.filterInput, vendorName);
		await this.clickAndWaitForResponse(data.subUrls.backend.reverseWithdraws, selector.admin.dokan.reverseWithdraw.filters.filteredResult(vendorName));
		await expect(this.page.locator(selector.admin.dokan.reverseWithdraw.revereWithdrawCell(vendorName))).toBeVisible();

	}

}
