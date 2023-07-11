import { Page, expect } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';
import{ coupon } from 'utils/interfaces';


export class CouponsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}


	// add marketplace coupon
	async addMarketplaceCoupon(coupon: coupon){
		await this.goIfNotThere(data.subUrls.backend.wc.coupons);

		await this.clickAndWaitForResponse(data.subUrls.backend.wc.addCoupon, selector.admin.marketing.addCoupon);
		await this.clearAndType(selector.admin.marketing.addNewCoupon.couponCode, coupon.title());
		await this.clearAndType(selector.admin.marketing.addNewCoupon.couponDescription, coupon.description);
		await this.selectByValue(selector.admin.marketing.addNewCoupon.discountType, coupon.discountType);
		await this.clearAndType(selector.admin.marketing.addNewCoupon.couponAmount, coupon.amount());

		await this.click(selector.admin.marketing.addNewCoupon.vendorLimits);
		await this.check(selector.admin.marketing.addNewCoupon.enableForAllVendors);
		await this.check(selector.admin.marketing.addNewCoupon.showOnStores);
		await this.check(selector.admin.marketing.addNewCoupon.notifyVendors);
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.marketing.addNewCoupon.publish);
		//Todo: add assertion
	}

	// vendor add coupon
	async addCoupon(coupon: coupon) {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.coupon);
		await this.click(selector.vendor.vCoupon.addNewCoupon);
		await this.type(selector.vendor.vCoupon.couponTitle, coupon.title());
		await this.type(selector.vendor.vCoupon.amount, coupon.amount());
		await this.click(selector.vendor.vCoupon.selectAll);
		await this.click(selector.vendor.vCoupon.applyForNewProducts);
		await this.click(selector.vendor.vCoupon.showOnStore);
		await this.clickAndWaitForResponse(data.subUrls.frontend.vDashboard.coupon, selector.vendor.vCoupon.createCoupon, 302);
		await expect(this.page.getByText(selector.vendor.vCoupon.couponSaveSuccessMessage)).toBeVisible();
		//todo: add more fields
	}
}
