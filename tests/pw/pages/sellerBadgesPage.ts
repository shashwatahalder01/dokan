import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class SellerBadgesPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// seller badge

	async adminSellerBadgeRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSellerBadge);

		// seller badge text is visible
		await expect(this.page.locator(selector.admin.dokan.sellerBadge.sellerBadgeText)).toBeVisible();

		// create badge is visible
		await expect(this.page.locator(selector.admin.dokan.sellerBadge.createBadge)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.sellerBadge.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.sellerBadge.bulkActions);

		// search seller badge is visible
		await expect(this.page.locator(selector.admin.dokan.sellerBadge.search)).toBeVisible();

		//  seller badge table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.sellerBadge.table);

	}

	// search seller badge
	async searchSellerBadge(badgeName: string){
		await this.goto(data.subUrls.backend.dokan.dokanSellerBadge);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanSellerBadge);

		await this.clearInputField(selector.admin.dokan.sellerBadge.search); // TODO: clear by cross, or use type instead of fill
		await this.typeAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.search, badgeName);
		await expect(this.page.locator(selector.admin.dokan.sellerBadge.sellerBadgeCell(badgeName))).toBeVisible();
	}

	// create seller badge
	async createSellerBadge(badge: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSellerBadge);

		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadgeEvent, selector.admin.dokan.sellerBadge.createBadge);
		await this.click(selector.admin.dokan.sellerBadge.badgeDetails.badgeEventDropdown);
		await this.click(selector.admin.dokan.sellerBadge.badgeDetails.badgeEvent(badge.badgeName));
		await this.clearAndType(selector.admin.dokan.sellerBadge.badgeDetails.badgeName, badge.badgeName);

		const isLevelExists = await this.isVisible(selector.admin.dokan.sellerBadge.badgeDetails.startingLevelValue);
		if(isLevelExists){
			await this.clearAndType(selector.admin.dokan.sellerBadge.badgeDetails.startingLevelValue, badge.startingLevelValue);
			for(let i = 1; i < badge.maxLevel; i++){
				await this.click(selector.admin.dokan.sellerBadge.badgeDetails.addBadgeLevel);
			}
		} else {
			if(badge.badgeName === 'Trending Product'){
				await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.trendingProductPeriod, badge.trendingProductPeriod);
				await this.clearAndType(selector.admin.dokan.sellerBadge.badgeDetails.trendingProductTopBestSellingProduct, badge.trendingProductTopBestSellingProduct);
			}
			if(badge.badgeName ===  'Verified Seller'){
				// await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.verifiedSellerMethod, badge.verificationMethod);
				const methods: string[]  = Object.values(badge.verifiedSellerMethod);
				for(let i = 1; i <= methods.length; i++){
					await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.verifiedSellerMethod1(i), methods[i-1] as string );
					if( i === methods.length ) { continue; }
					await this.click(selector.admin.dokan.sellerBadge.badgeDetails.addBadgeLevel);
				}
			}
		}

		await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.badgeStatus, badge.badgeStatus );
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.badgeDetails.create);
		await this.click(selector.admin.dokan.sellerBadge.badgeDetails.badgeAddedSuccessfully);

	}


	// edit seller badge
	async editSellerBadge(badge: any){
		await this.searchSellerBadge(badge.badgeName);

		await this.hover(selector.admin.dokan.sellerBadge.sellerBadgeCell(badge.badgeName));
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.sellerBadgeEdit);

		await this.clearAndType(selector.admin.dokan.sellerBadge.badgeDetails.badgeName, badge.badgeName);

		const isLevelExists = await this.isVisible(selector.admin.dokan.sellerBadge.badgeDetails.startingLevelValue);
		if(isLevelExists){
			// remove previous badge level
			const maxLevel = await this.countLocator(selector.admin.dokan.sellerBadge.badgeDetails.badgeLevel);
			for(let i = 1; i < maxLevel; i++){
				await this.click(selector.admin.dokan.sellerBadge.badgeDetails.removeBadgeLevel);
			}
			// add badge level
			await this.clearAndType(selector.admin.dokan.sellerBadge.badgeDetails.startingLevelValue, badge.startingLevelValue);
			for(let i = 1; i < badge.maxLevel; i++){
				await this.click(selector.admin.dokan.sellerBadge.badgeDetails.addBadgeLevel);
			}
		} else {

			if(badge.badgeName === 'Trending Product'){
				await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.trendingProductPeriod, badge.trendingProductPeriod);
				await this.clearAndType(selector.admin.dokan.sellerBadge.badgeDetails.trendingProductTopBestSellingProduct, badge.trendingProductTopBestSellingProduct);
			}
			if(badge.badgeName ===  'Verified Seller'){
				// await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.verifiedSellerMethod, badge.verificationMethod);
				// remove previous badge level
				await this.waitForSelector(selector.admin.dokan.sellerBadge.badgeDetails.badgeLevel);
				const maxLevel = await this.countLocator(selector.admin.dokan.sellerBadge.badgeDetails.badgeLevel);
				for(let i = 1; i < maxLevel; i++){
					await this.click(selector.admin.dokan.sellerBadge.badgeDetails.removeBadgeLevel);
				}

				// add badge level
				const methods: string[]  = Object.values(badge.verifiedSellerMethod);
				for(let i = 1; i <= methods.length; i++){
					await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.verifiedSellerMethod1(i), methods[i-1] as string);
					if( i === methods.length ) { continue; }
					await this.click(selector.admin.dokan.sellerBadge.badgeDetails.addBadgeLevel);
				}
			}
		}

		await this.selectByValue(selector.admin.dokan.sellerBadge.badgeDetails.badgeStatus, badge.badgeStatus );
		await this.click(selector.admin.dokan.sellerBadge.badgeDetails.update);
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.badgeDetails.confirmBadgeUpdate);
		await this.click(selector.admin.dokan.sellerBadge.badgeDetails.badgeAddedSuccessfully);

	}

	// preview seller badge
	async previewSellerBadge(badgeName: string){
		await this.searchSellerBadge(badgeName);

		const badgeLevel = await this.getElementText(selector.admin.dokan.sellerBadge.sellerBadgeLevel(badgeName));

		await this.hover(selector.admin.dokan.sellerBadge.sellerBadgeCell(badgeName));
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.sellerBadgePreview);

		// badge preview modal is visible
		await expect(this.page.locator(selector.admin.dokan.sellerBadge.previewBadgeDetails.modal)).toBeVisible();

		// badge preview header elements are visible
		await this.multipleElementVisible(selector.admin.dokan.sellerBadge.previewBadgeDetails.modalHeader);

		await expect(this.page.locator(selector.admin.dokan.sellerBadge.previewBadgeDetails.levelBox)).toHaveCount(Number(badgeLevel));

		await this.click(selector.admin.dokan.sellerBadge.previewBadgeDetails.modalHeader.modalClose);
	}

	// filter vendors by badge
	async filterVendorsByBadge(badgeName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		await this.clickIfVisible(selector.admin.dokan.vendors.filters.clearFilter);
		await this.selectByLabel( selector.admin.dokan.vendors.filters.filterByBadges, badgeName);

		const count = (await this.getElementText(selector.admin.dokan.vendors.numberOfVendorsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);
		//TOdo: either this or that assertion
		//todo: to have count more than
	}

	// seller badge vendors
	async sellerBadgeVendors(badgeName: string){
		await this.searchSellerBadge(badgeName);

		await this.hover(selector.admin.dokan.sellerBadge.sellerBadgeCell(badgeName));
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.sellerBadgeVendors);

		// await expect(this.page.locator(selector.admin.dokan.vendors.vendorCell(badgeName))).toBeVisible();
		const count = (await this.getElementText(selector.admin.dokan.vendors.numberOfVendorsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);
		//TOdo: either this or that assertion

	}

	// badges acquired by vendor
	async sellerBadgeAcquiredByVendor(vendorName: string){
		await this.searchVendor(vendorName);

		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.vendors.vendorViewDetails(vendorName));
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorDetails.badgesAcquired)).toBeVisible();
		//TOdo: either this or that assertion
	}


	// delete seller badge
	async updateSellerBadgeStatus(badgeName: string, status: string){
		await this.searchSellerBadge(badgeName);

		await this.hover(selector.admin.dokan.sellerBadge.sellerBadgeCell(badgeName));
		switch (status) {

		case 'publish' :
			await this.click(selector.admin.dokan.sellerBadge.sellerBadgePublish);
			break;

		case 'draft' :
			await this.click(selector.admin.dokan.sellerBadge.sellerBadgeDraft);
			break;

		default :
			break;
		}

		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.confirmAction);
		await this.click(selector.admin.dokan.sellerBadge.successMessage);
	}

	// delete seller badge
	async deleteSellerBadge(badgeName: string){
		await this.searchSellerBadge(badgeName);

		await this.hover(selector.admin.dokan.sellerBadge.sellerBadgeCell(badgeName));
		await this.click(selector.admin.dokan.sellerBadge.sellerBadgeDelete);
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.confirmAction);
		await this.click(selector.admin.dokan.sellerBadge.successMessage);
	}

	// seller badge bulk action
	async sellerBadgeBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSellerBadge);

		await this.click(selector.admin.dokan.sellerBadge.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.sellerBadge.bulkActions.selectAction, action);
		await this.click( selector.admin.dokan.sellerBadge.bulkActions.applyAction);
		await this.clickAndWaitForResponse(data.subUrls.backend.sellerBadge, selector.admin.dokan.sellerBadge.confirmAction);
		await this.click(selector.admin.dokan.sellerBadge.successMessage);
	}


	// vendor achieved badges congrats popup
	async sellerBadgeCongratsPopup(){
		await this.goIfNotThere(data.subUrls.frontend.badges);

		const congratsModalIsVisible = await this.isVisible(selector.vendor.vBadges.congratsModal.sellerBadgeModal);
		if (congratsModalIsVisible){
			//  seller badge congrats modal elements are visible
			await this.multipleElementVisible(selector.vendor.vBadges.congratsModal);

			await this.clickIfVisible(selector.vendor.vBadges.congratsModal.closeModal);
		} else {
			console.log('No Congrats message appeared');

		}

	}


	// vendor search seller badge
	async vendorSearchSellerBadge(badgeName: string){
		await this.clickIfVisible(selector.vendor.vBadges.congratsModal.closeModal);

		await this.goIfNotThere(data.subUrls.frontend.badges);
		await this.clearAndType( selector.vendor.vBadges.search, badgeName);
		await expect(this.page.locator(selector.vendor.vBadges.sellerBadgeCell(badgeName))).toBeVisible();
	}

	// vendor filter seller badge
	async filterSellerBadges(option: string){
		await this.clickIfVisible(selector.vendor.vBadges.congratsModal.closeModal);

		await this.goIfNotThere(data.subUrls.frontend.badges);
		await this.selectByLabel( selector.vendor.vBadges.filterBadges, option);
		const count = (await this.getElementText(selector.vendor.vBadges.numberOfBadgesFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);
		//TOdo: either this or that assertion
		//todo: to have count more than
	}

}
