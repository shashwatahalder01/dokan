import { expect, type Page } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class SettingsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}

	// settings

	async adminSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSettings);

		// settings text is visible
		await this.toBeVisible(selector.admin.dokan.settings.settingsText);

		// settings section elements are visible
		await this.multipleElementVisible(selector.admin.dokan.settings.sections);

		// settings header elements are visible
		await this.multipleElementVisible(selector.admin.dokan.settings.header);

		// settings field is visible
		await this.toBeVisible(selector.admin.dokan.settings.fields);

		// settings save Changes is visible
		await this.toBeVisible(selector.admin.dokan.settings.saveChanges);
	}

	// search settings
	async searchSettings(settings: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSettings);

		await this.clearAndType(selector.admin.dokan.settings.search.input, settings);
		await this.toBeVisible(selector.admin.dokan.settings.fields);
	}

	// scroll to top settings
	async scrollToTopSettings(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSettings);

		await this.scrollToBottom();
		await this.toBeVisible(selector.admin.dokan.settings.backToTop);
	}

	// dokan settings

	// admin set dokan general settings
	async setDokanGeneralSettings(general: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.general);

		// site options
		await this.enableSwitcher(selector.admin.dokan.settings.adminAreaAccess);
		await this.clearAndType(selector.admin.dokan.settings.vendorStoreUrl, general.vendorStoreUrl);
		await this.click(selector.admin.dokan.settings.sellingProductTypes(general.sellingProductTypes));

		// vendor store options
		await this.enableSwitcher(selector.admin.dokan.settings.storeTermsAndConditions);
		await this.clearAndType(selector.admin.dokan.settings.storeProductPerPage, general.storeProductPerPage);
		await this.enableSwitcher(selector.admin.dokan.settings.enableTermsAndCondition);
		await this.click(selector.admin.dokan.settings.storCategory(general.storCategory));

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.generalSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, general.saveSuccessMessage );
	}

	// admin set dokan selling settings
	async setDokanSellingSettings(selling: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.sellingOptions);

		// commission settings
		await this.selectByValue(selector.admin.dokan.settings.commissionType, selling.commissionType);
		await this.clearAndType(selector.admin.dokan.settings.adminCommission, selling.adminCommission);
		await this.click(selector.admin.dokan.settings.shippingFeeRecipient(selling.shippingFeeRecipient));
		await this.click(selector.admin.dokan.settings.taxFeeRecipient(selling.taxFeeRecipient));

		// vendor capability
		await this.enableSwitcher(selector.admin.dokan.settings.newVendorProductUpload);
		await this.enableSwitcher(selector.admin.dokan.settings.orderStatusChange);
		await this.click(selector.admin.dokan.settings.newProductStatus(selling.newProductStatus));
		await this.enableSwitcher(selector.admin.dokan.settings.duplicateProduct);
		await this.enableSwitcher(selector.admin.dokan.settings.productMailNotification);
		await this.click(selector.admin.dokan.settings.productCategorySelection(selling.productCategorySelection));
		await this.enableSwitcher(selector.admin.dokan.settings.vendorsCanCreateTags);
		await this.enableSwitcher(selector.admin.dokan.settings.orderDiscount);
		await this.enableSwitcher(selector.admin.dokan.settings.productDiscount);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorProductReview);
		await this.enableSwitcher(selector.admin.dokan.settings.guestProductEnquiry);
		await this.enableSwitcher(selector.admin.dokan.settings.newVendorEnableAuction);
		await this.enableSwitcher(selector.admin.dokan.settings.enableMinMaxQuantities);
		await this.enableSwitcher(selector.admin.dokan.settings.enableMinMaxAmount);

		// save settings
		// TODO: fix or delete
		// await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.sellingOptionsSaveChanges);
		// await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, selling.saveSuccessMessage );
		await this.clickAndWaitForNavigation(selector.admin.dokan.settings.sellingOptionsSaveChanges);
		await this.toHaveValue(selector.admin.dokan.settings.adminCommission, selling.adminCommission);
	}

	// Admin Set Dokan Withdraw Settings
	async setDokanWithdrawSettings(withdraw: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.withdrawOptions);

		// Withdraw Options
		await this.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsPaypal);
		await this.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsBankTransfer);
		await this.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsDokanCustom);
		await this.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsSkrill);
		await this.clearAndType(selector.admin.dokan.settings.customMethodName, withdraw.customMethodName);
		await this.clearAndType(selector.admin.dokan.settings.customMethodType, withdraw.customMethodType);
		await this.clearAndType(selector.admin.dokan.settings.minimumWithdrawAmount, withdraw.minimumWithdrawAmount);
		await this.enableSwitcher(selector.admin.dokan.settings.orderStatusForWithdrawCompleted);
		await this.enableSwitcher(selector.admin.dokan.settings.orderStatusForWithdrawProcessing);
		await this.clearAndType(selector.admin.dokan.settings.withdrawThreshold, withdraw.withdrawThreshold);

		// Disbursement Schedule Settings
		await this.enableSwitcher(selector.admin.dokan.settings.withdrawDisbursementManual);
		await this.enableSwitcher(selector.admin.dokan.settings.withdrawDisbursementAuto);

		// Disbursement Schedule
		await this.enableSwitcher(selector.admin.dokan.settings.disburseMentQuarterlySchedule);
		await this.enableSwitcher(selector.admin.dokan.settings.disburseMentMonthlySchedule);
		await this.enableSwitcher(selector.admin.dokan.settings.disburseMentBiweeklySchedule);
		await this.enableSwitcher(selector.admin.dokan.settings.disburseMentWeeklySchedule);

		// Quarterly Schedule
		await this.selectByValue(selector.admin.dokan.settings.quarterlyScheduleMonth, withdraw.quarterlyScheduleMonth);
		await this.selectByValue(selector.admin.dokan.settings.quarterlyScheduleWeek, withdraw.quarterlyScheduleWeek);
		await this.selectByValue(selector.admin.dokan.settings.quarterlyScheduleDay, withdraw.quarterlyScheduleDay);
		// Monthly Schedule
		await this.selectByValue(selector.admin.dokan.settings.monthlyScheduleWeek, withdraw.monthlyScheduleWeek);
		await this.selectByValue(selector.admin.dokan.settings.monthlyScheduleDay, withdraw.monthlyScheduleDay);
		// Biweekly Schedule
		await this.selectByValue(selector.admin.dokan.settings.biweeklyScheduleWeek, withdraw.biweeklyScheduleWeek);
		await this.selectByValue(selector.admin.dokan.settings.biweeklyScheduleDay, withdraw.biweeklyScheduleDay);
		// Weekly Schedule
		await this.selectByValue(selector.admin.dokan.settings.weeklyScheduleDay, withdraw.weeklyScheduleDay);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.withdrawSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, withdraw.saveSuccessMessage );
	}

	// Admin Set Dokan Reverse Withdraw Settings
	async setDokanReverseWithdrawSettings(reverseWithdraw: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.reverseWithdrawal);

		// reverse withdraw options
		await this.enableSwitcher(selector.admin.dokan.settings.enableReverseWithdrawal);
		await this.enableSwitcher(selector.admin.dokan.settings.enableReverseWithdrawalForThisGateway);

		await this.selectByValue(selector.admin.dokan.settings.billingType, reverseWithdraw.billingType);
		await this.clearAndType(selector.admin.dokan.settings.reverseBalanceThreshold, reverseWithdraw.reverseBalanceThreshold);
		await this.clearAndType(selector.admin.dokan.settings.gracePeriod, reverseWithdraw.gracePeriod);

		await this.enableSwitcher(selector.admin.dokan.settings.disableAddToCartButton);
		await this.enableSwitcher(selector.admin.dokan.settings.hideWithdrawMenu);
		await this.enableSwitcher(selector.admin.dokan.settings.MakeVendorStatusInactive);

		await this.enableSwitcher(selector.admin.dokan.settings.displayNoticeDuringGracePeriod);
		await this.enableSwitcher(selector.admin.dokan.settings.sendAnnouncement);

		// save settings
		// TODO: fix or delete
		// await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.reverseWithdrawSaveChanges);
		// await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, reverseWithdraw.saveSuccessMessage );
		await this.clickAndWaitForNavigation(selector.admin.dokan.settings.reverseWithdrawSaveChanges);
		await this.toHaveValue(selector.admin.dokan.settings.reverseBalanceThreshold, reverseWithdraw.reverseBalanceThreshold);
	}


	// Admin Set Dokan Page Settings
	async setPageSettings(page: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.pageSettings);

		await this.selectByLabel(selector.admin.dokan.settings.termsAndConditionsPage, page.termsAndConditionsPage);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.pageSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, page.saveSuccessMessage );
	}

	// Admin Set Dokan Appearance Settings
	async setDokanAppearanceSettings(appearance: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.appearance);

		// Appearance Settings
		await this.enableSwitcher(selector.admin.dokan.settings.showMapOnStorePage);
		await this.click(selector.admin.dokan.settings.mapApiSourceGoogleMaps);
		await this.clearAndType(selector.admin.dokan.settings.googleMapApiKey, appearance.googleMapApiKey);
		await this.click(selector.admin.dokan.settings.storeHeaderTemplate2);
		await this.click(selector.admin.dokan.settings.storeHeaderTemplate1);
		await this.clearAndType(selector.admin.dokan.settings.storeBannerWidth, appearance.storeBannerWidth);
		await this.clearAndType(selector.admin.dokan.settings.storeBannerHeight, appearance.storeBannerHeight);
		await this.enableSwitcher(selector.admin.dokan.settings.storeOpeningClosingTimeWidget);
		await this.enableSwitcher(selector.admin.dokan.settings.showVendorInfo);

		// save settings
		// TODO: fix or delete
		// await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.appearanceSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, appearance.saveSuccessMessage );

		await this.clickAndWaitForNavigation(selector.admin.dokan.settings.appearanceSaveChanges);
		await this.toHaveValue(selector.admin.dokan.settings.googleMapApiKey, appearance.googleMapApiKey);
	}

	// Admin Set Dokan Privacy Policy Settings
	async setDokanPrivacyPolicySettings(privacyPolicy: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.privacyPolicy);

		// Privacy Policy Settings
		await this.enableSwitcher(selector.admin.dokan.settings.enablePrivacyPolicy);
		await this.selectByValue(selector.admin.dokan.settings.privacyPage, privacyPolicy.privacyPage);
		await this.typeFrameSelector(selector.admin.dokan.settings.privacyPolicyIframe, selector.admin.dokan.settings.privacyPolicyHtmlBody, privacyPolicy.privacyPolicyHtmlBody);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.privacyPolicySaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, privacyPolicy.saveSuccessMessage );
	}

	// Admin Set Dokan Store Support Settings
	async setDokanStoreSupportSettings(storeSupport: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.storeSupport);

		// Store Support Settings
		await this.enableSwitcher(selector.admin.dokan.settings.displayOnOrderDetails);
		await this.selectByValue(selector.admin.dokan.settings.displayOnSingleProductPage, storeSupport.displayOnSingleProductPage);
		await this.clearAndType(selector.admin.dokan.settings.supportButtonLabel, storeSupport.supportButtonLabel);
		await this.enableSwitcher(selector.admin.dokan.settings.supportTicketEmailNotification);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.storeSupportSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, storeSupport.saveSuccessMessage );
	}

	// Admin Set Dokan Rma Settings
	async setDokanRmaSettings(rma: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.rma);

		// Rma Settings
		await this.selectByValue(selector.admin.dokan.settings.orderStatus, rma.orderStatus);
		await this.enableSwitcher(selector.admin.dokan.settings.enableRefundRequests);
		await this.enableSwitcher(selector.admin.dokan.settings.enableCouponRequests);

		for (const rmaReason of rma.rmaReasons) {
			await this.deleteIfExists(selector.admin.dokan.settings.reasonsForRmaSingle(rmaReason));
			await this.clearAndType(selector.admin.dokan.settings.reasonsForRmaInput, rmaReason);
			await this.click(selector.admin.dokan.settings.reasonsForRmaAdd);
		}

		await this.typeFrameSelector(selector.admin.dokan.settings.refundPolicyIframe, selector.admin.dokan.settings.refundPolicyHtmlBody, rma.refundPolicyHtmlBody);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.rmaSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, rma.saveSuccessMessage );
	}

	// Admin Set Dokan Wholesale Settings
	async setDokanWholesaleSettings(wholesale: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.wholesale);

		// Wholesale Settings
		await this.click(selector.admin.dokan.settings.whoCanSeeWholesalePrice(wholesale.whoCanSeeWholesalePrice));
		await this.enableSwitcher(selector.admin.dokan.settings.showWholesalePriceOnShopArchive);
		await this.disableSwitcher(selector.admin.dokan.settings.needApprovalForCustomer);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.wholesaleSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, wholesale.saveSuccessMessage );
	}

	// Admin Set Dokan Eu Compliance Settings
	async setDokanEuComplianceSettings(euCompliance: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.euComplianceFields);

		// Eu Compliance Settings
		await this.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsCompanyName);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsCompanyIdOrEuidNumber);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsVatOrTaxNumber);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsNameOfBank);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsBankIban);
		await this.enableSwitcher(selector.admin.dokan.settings.displayInVendorRegistrationForm);
		await this.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsCompanyIdOrEuidNumber);
		await this.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsVatOrTaxNumber);
		await this.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsNameOfBank);
		await this.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsBankIban);
		await this.enableSwitcher(selector.admin.dokan.settings.enableGermanizedSupportForVendors);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorsWillBeAbleToOverrideInvoiceNumber);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.euComplianceFieldsSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, euCompliance.saveSuccessMessage );
	}

	// Admin Set Dokan Delivery Time Settings
	async setDokanDeliveryTimeSettings(deliveryTime: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.deliveryTime);

		// Delivery Time Settings
		await this.enableSwitcher(selector.admin.dokan.settings.allowVendorSettings);
		await this.enableSwitcher(selector.admin.dokan.settings.homeDelivery);
		await this.enableSwitcher(selector.admin.dokan.settings.storePickup);
		await this.clearAndType(selector.admin.dokan.settings.deliveryDateLabel, deliveryTime.deliveryDateLabel);
		await this.clearAndType(selector.admin.dokan.settings.deliveryBlockedBuffer, deliveryTime.deliveryBlockedBuffer);
		await this.clearAndType(selector.admin.dokan.settings.timeSlot, deliveryTime.timeSlot);
		await this.clearAndType(selector.admin.dokan.settings.orderPerSlot, deliveryTime.orderPerSlot);
		await this.clearAndType(selector.admin.dokan.settings.deliveryBoxInfo, deliveryTime.deliveryBoxInfo);
		await this.disableSwitcher(selector.admin.dokan.settings.requireDeliveryDateAndTime);
		for (const day of deliveryTime.days) {
			await this.enableSwitcher(selector.admin.dokan.settings.deliveryDay(day));
			await this.click(selector.admin.dokan.settings.openingTime(day));
			// await this.page.getByRole('listitem').filter({ hasText: 'Full day' }).click();
			// comment below lines for full day
			await this.page.getByRole('listitem').filter({ hasText: deliveryTime.openingTime }).click(); //TODO: convert by locator, also move this to base page
			await this.click(selector.admin.dokan.settings.closingTime(day));
			await this.page.getByRole('listitem').filter({ hasText: deliveryTime.closingTime }).click();
		}
		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.deliveryTimeSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, deliveryTime.saveSuccessMessage );
	}

	// Admin Set Dokan Product Advertising Settings
	async setDokanProductAdvertisingSettings(productAdvertising: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.productAdvertising);

		// Product Advertising Settings
		await this.clearAndType(selector.admin.dokan.settings.noOfAvailableSlot, productAdvertising.noOfAvailableSlot);
		await this.clearAndType(selector.admin.dokan.settings.expireAfterDays, productAdvertising.expireAfterDays);
		await this.enableSwitcher(selector.admin.dokan.settings.vendorCanPurchaseAdvertisement);
		await this.clearAndType(selector.admin.dokan.settings.advertisementCost, productAdvertising.advertisementCost);
		await this.enableSwitcher(selector.admin.dokan.settings.enableAdvertisementInSubscription);
		await this.enableSwitcher(selector.admin.dokan.settings.markAdvertisedProductAsFeatured);
		await this.enableSwitcher(selector.admin.dokan.settings.displayAdvertisedProductOnTop);
		await this.enableSwitcher(selector.admin.dokan.settings.outOfStockVisibility);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.productAdvertisingSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, productAdvertising.saveSuccessMessage );
	}

	// Admin Set Dokan Geolocation Settings
	async setDokanGeolocationSettings(geolocation: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.geolocation);

		// Geolocation Settings
		await this.click(selector.admin.dokan.settings.locationMapPosition(geolocation.locationMapPosition));
		await this.click(selector.admin.dokan.settings.showMap(geolocation.showMap));
		await this.enableSwitcher(selector.admin.dokan.settings.showFiltersBeforeLocationMap);
		await this.enableSwitcher(selector.admin.dokan.settings.productLocationTab);
		await this.click(selector.admin.dokan.settings.radiusSearchUnit(geolocation.radiusSearchUnit));
		await this.clearAndType(selector.admin.dokan.settings.radiusSearchMinimumDistance, geolocation.radiusSearchMinimumDistance);
		await this.clearAndType(selector.admin.dokan.settings.radiusSearchMaximumDistance, geolocation.radiusSearchMaximumDistance);
		await this.clearAndType(selector.admin.dokan.settings.mapZoomLevel, geolocation.mapZoomLevel);
		await this.focus(selector.admin.dokan.settings.defaultLocation);
		await this.typeAndWaitForResponse(data.subUrls.gmap, selector.admin.dokan.settings.defaultLocation, geolocation.defaultLocation);
		// await this.wait(2)
		await this.press(data.key.arrowDown);
		await this.press(data.key.enter); // TODO: map not saving
		// await this.wait(2)

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.geolocationSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, geolocation.saveSuccessMessage );
	}

	// Admin Set Dokan Product Report Abuse Settings
	async setDokanProductReportAbuseSettings(productReportAbuse: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.productReportAbuse);

		// Product Report Abuse Settings
		await this.deleteIfExists(selector.admin.dokan.settings.reasonsForAbuseReportSingle(productReportAbuse.reasonsForAbuseReport));
		await this.clearAndType(selector.admin.dokan.settings.reasonsForAbuseReportInput, productReportAbuse.reasonsForAbuseReport);
		await this.click(selector.admin.dokan.settings.reasonsForAbuseReportAdd);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.productReportAbuseSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, productReportAbuse.saveSuccessMessage );
	}

	// Admin Set Dokan Spmv Settings
	async setDokanSpmvSettings(spmv: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.singleProductMultiVendor);

		await this.enableSwitcher(selector.admin.dokan.settings.enableSingleProductMultipleVendor);
		await this.clearAndType(selector.admin.dokan.settings.sellItemButtonText, spmv.sellItemButtonText);
		await this.clearAndType(selector.admin.dokan.settings.availableVendorDisplayAreaTitle, spmv.availableVendorDisplayAreaTitle);
		await this.selectByValue(selector.admin.dokan.settings.availableVendorSectionDisplayPosition, spmv.availableVendorSectionDisplayPosition);
		await this.selectByValue(selector.admin.dokan.settings.showSpmvProducts, spmv.showSpmvProducts);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.singleProductMultiVendorSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, spmv.saveSuccessMessage );

	}

	// Admin Set Dokan Vendor Subscription Settings
	async setDokanVendorSubscriptionSettings(subscription: any) {
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.vendorSubscription);

		// Vendor Subscription Settings
		await this.selectByValue(selector.admin.dokan.settings.subscription, subscription.displayPage);
		await this.enableSwitcher(selector.admin.dokan.settings.enableProductSubscription);
		await this.enableSwitcher(selector.admin.dokan.settings.enableSubscriptionInRegistrationForm);
		await this.enableSwitcher(selector.admin.dokan.settings.enableEmailNotification);
		await this.clearAndType(selector.admin.dokan.settings.noOfDays, subscription.noOfDays);
		await this.selectByValue(selector.admin.dokan.settings.productStatus, subscription.productStatus);
		await this.clearAndType(selector.admin.dokan.settings.cancellingEmailSubject, subscription.cancellingEmailSubject);
		await this.clearAndType(selector.admin.dokan.settings.cancellingEmailBody, subscription.cancellingEmailBody);
		await this.clearAndType(selector.admin.dokan.settings.alertEmailSubject, subscription.alertEmailSubject);
		await this.clearAndType(selector.admin.dokan.settings.alertEmailBody, subscription.alertEmailBody);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.vendorSubscriptionSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, subscription.saveSuccessMessage );

	}

	async disableDokanVendorSubscription(subscription: any){
		await this.goToDokanSettings();
		await this.click(selector.admin.dokan.settings.vendorSubscription);

		// Disabling Vendor Subscription
		await this.disableSwitcher(selector.admin.dokan.settings.enableProductSubscription);

		// save settings
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.settings.vendorSubscriptionSaveChanges);
		await this.toContainText(selector.admin.dokan.settings.dokanUpdateSuccessMessage, subscription.saveSuccessMessage );

	}

}
