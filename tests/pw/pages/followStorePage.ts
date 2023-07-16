import { Page } from '@playwright/test';
import { CustomerPage } from './customerPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';
import { helpers } from 'utils/helpers';


export class FollowStorePage extends CustomerPage {

	constructor(page: Page) {
		super(page);
	}


	// follow vendor
	async followStore(storeName: string, followLocation: string): Promise<void> {
		let currentFollowStatus: boolean;

		switch (followLocation) {

		// store listing page
		case 'storeListing' :
			await this.searchStore(storeName);
			currentFollowStatus = await this.hasText(selector.customer.cStoreList.currentFollowStatus(storeName), 'Following');
			// unfollow if not already
			if (currentFollowStatus) {
				await this.clickAndWaitForResponse(data.subUrls.ajax, selector.customer.cStoreList.followUnFollowStore(storeName));
				await this.toContainText(selector.customer.cStoreList.currentFollowStatus(storeName), 'Follow');
			}
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.customer.cStoreList.followUnFollowStore(storeName));
			await this.toContainText(selector.customer.cStoreList.currentFollowStatus(storeName), 'Following');
			break;


		// single store page
		case 'singleStore' :
			await this.goIfNotThere(data.subUrls.frontend.vendorDetails(helpers.slugify(storeName)));
			currentFollowStatus = await this.hasText(selector.customer.cStoreList.currentFollowStatusSingleStore, 'Following');

			// unfollow if not already
			if (currentFollowStatus) {
				await this.clickAndWaitForResponse(data.subUrls.ajax, selector.customer.cStoreList.followUnFollowStoreSingleStore);
				await this.toContainText(selector.customer.cStoreList.currentFollowStatusSingleStore, 'Follow');
			}
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.customer.cStoreList.followUnFollowStoreSingleStore);
			await this.toContainText(selector.customer.cStoreList.currentFollowStatusSingleStore, 'Following');
			break;

		default :
			break;
		}
	}


}
