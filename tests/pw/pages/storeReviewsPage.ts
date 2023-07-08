import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class StoreReviewsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// store reviews

	async adminStoreReviewsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);

		// store reviews text is visible
		await expect(this.page.locator(selector.admin.dokan.storeReviews.storeReviewsText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.storeReviews.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.storeReviews.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, filterClear, ...filters } = selector.admin.dokan.storeReviews.filters;
		await this.multipleElementVisible(filters);

		// store reviews table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.storeReviews.table);
	}


	// filter store reviews
	async filterStoreReviews(vendorName: string){
		// await this.clickIfVisible(selector.admin.dokan.storeReviews.filters.filterClear);
		await this.goto(data.subUrls.backend.dokan.dokanStoreReviews);
		//TODO: fix this clear filter not works
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);
		// const clearIsVisible = await this.isVisible(selector.admin.dokan.storeReviews.filters.filterClear);
		// if(clearIsVisible) {
		// 	await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.filters.filterClear);
		// }

		//filter by vendor
		await this.click(selector.admin.dokan.storeReviews.filters.filterByVendor);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.storeReviews.filters.filterInput, vendorName);
		await this.pressAndWaitForResponse(data.subUrls.backend.storeReviews, data.key.enter);
	}

	// edit store review
	async editStoreReview(review: any){
		await this.goto(data.subUrls.backend.dokan.dokanStoreReviews);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);
		await this.hover(selector.admin.dokan.storeReviews.storeReviewFirstCell);
		await this.click(selector.admin.dokan.storeReviews.storeReviewEdit);

		await this.click(selector.admin.dokan.storeReviews.editReview.rating(review.update.rating));
		await this.clearAndType(selector.admin.dokan.storeReviews.editReview.title, review.update.title );
		await this.clearAndType(selector.admin.dokan.storeReviews.editReview.content, review.update.content );

		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.editReview.update);
	}

	// delete store review
	async deleteStoreReview(){
		await this.goto(data.subUrls.backend.dokan.dokanStoreReviews);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);
		await this.hover(selector.admin.dokan.storeReviews.storeReviewFirstCell);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.storeReviewDelete);
		//TODO: also wait for content to load
	}

	// TODO: delete, restore, and  permanently delete can be merged into one

	// restore store review
	async restoreStoreReview(){
		await this.goto(data.subUrls.backend.dokan.dokanStoreReviews);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.navTabs.trash);

		await this.hover(selector.admin.dokan.storeReviews.storeReviewFirstCell);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.storeReviewRestore);
	}

	// permanently delete store review
	async permanentlyDeleteStoreReview(){
		await this.goto(data.subUrls.backend.dokan.dokanStoreReviews);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.navTabs.trash);

		await this.hover(selector.admin.dokan.storeReviews.storeReviewFirstCell);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.storeReviewPermanentlyDelete);
	}

	// store reviews bulk action
	async storeReviewsBulkAction(action: string){
		await this.goto(data.subUrls.backend.dokan.dokanStoreReviews);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews); //Todo: fix this

		// ensure row exists
		await expect(this.page.locator(selector.admin.dokan.storeReviews.noRowsFound)).not.toBeVisible();

		await this.click(selector.admin.dokan.storeReviews.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.storeReviews.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.bulkActions.applyAction);
	}

}
