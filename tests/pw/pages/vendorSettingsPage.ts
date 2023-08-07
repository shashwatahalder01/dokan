import { Page, expect } from '@playwright/test';
import { VendorPage } from 'pages/vendorPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';
import { vendor } from 'utils/interfaces';


const { DOKAN_PRO } = process.env;

export class VendorSettingsPage extends VendorPage {

	constructor(page: Page) {
		super(page);
	}


	// vendor settings


	// vendor settings render properly
	async vendorStoreSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsStore);

		// settings text is visible
		await this.toBeVisible(selector.vendor.vStoreSettings.settingsText);

		//todo: update for lite

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vStoreSettings.banner);
		await this.toBeVisible(selector.vendor.vStoreSettings.profilePicture);
		await this.toBeVisible(selector.vendor.vStoreSettings.storeName);
		await this.toBeVisible(selector.vendor.vStoreSettings.storeProductsPerPage);
		await this.toBeVisible(selector.vendor.vStoreSettings.phoneNo);
		DOKAN_PRO && await this.toBeVisible(selector.vendor.vStoreSettings.multipleLocation);

		// store address location elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { cancelSaveLocation, deleteSaveLocation,  ...address } = selector.vendor.vStoreSettings.address;
		await this.multipleElementVisible(address);

		// company info elements are visible
		DOKAN_PRO && await this.multipleElementVisible(selector.vendor.vStoreSettings.companyInfo);

		await this.toBeVisible(selector.vendor.vStoreSettings.email);
		await this.toBeVisible(selector.vendor.vStoreSettings.moreProducts);

		// map is visible
		await this.toBeVisible(selector.vendor.vStoreSettings.map);

		//todo: catalog, discount, vacation, open close, store category

		// biography is visible
		DOKAN_PRO && await this.toBeVisible(selector.vendor.vStoreSettings.biographyIframe);

		//todo: min-max, store-support

		// update settings are visible
		await this.toBeVisible(selector.vendor.vStoreSettings.updateSettingsTop);
		await this.toBeVisible(selector.vendor.vStoreSettings.updateSettings);
	}


	// vendor verifications render properly
	async vendorVerificationsSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsVerification);

		// verification text is visible
		await this.toBeVisible(selector.vendor.vVerificationSettings.verificationText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vVerificationSettings.visitStore);

		await this.toBeVisible(selector.vendor.vVerificationSettings.id.startIdVerification);
		await this.toBeVisible(selector.vendor.vVerificationSettings.address.startAddressVerification);
		await this.toBeVisible(selector.vendor.vVerificationSettings.company.startCompanyVerification);

		await this.click(selector.vendor.vVerificationSettings.id.startIdVerification);
		await this.click(selector.vendor.vVerificationSettings.address.startAddressVerification);
		await this.click(selector.vendor.vVerificationSettings.company.startCompanyVerification);

		// product addon fields elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { startIdVerification, cancelIdVerificationRequest,  previousUploadedPhoto, removePreviousUploadedPhoto, idUpdateSuccessMessage,   ...idVerifications } = selector.vendor.vVerificationSettings.id;
		await this.multipleElementVisible(idVerifications);

		// product addon fields elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { startAddressVerification, cancelAddressVerificationRequest, previousUploadedResidenceProof, removePreviousUploadedResidenceProof, addressUpdateSuccessMessage,  ...addressVerifications } = selector.vendor.vVerificationSettings.address;
		await this.multipleElementVisible(addressVerifications);

		// product addon fields elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { startCompanyVerification, cancelCompanyVerificationRequest, uploadedCompanyFileClose, cancelSelectedInfo, companyInfoUpdateSuccessMessage,  ...companyVerifications } = selector.vendor.vVerificationSettings.company;
		await this.multipleElementVisible(companyVerifications);

	}


	// vendor shipping render properly
	async vendorShippingSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsShipping);

		// shipstation text is visible
		await this.toBeVisible(selector.vendor.vShippingSettings.shippingSettingsText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vShippingSettings.visitStore);

		// add shipping policies is visible
		await this.toBeVisible(selector.vendor.vShippingSettings.shippingPolicies.clickHereToAddShippingPolicies);

		// previous shipping settings link is visible
		await this.toBeVisible(selector.vendor.vShippingSettings.shippingPolicies.clickHereToAddShippingPolicies);

		// shipping zone table elements are visible
		await this.multipleElementVisible(selector.vendor.vShippingSettings.table);

		await this.clickAndWaitForLoadState(selector.vendor.vShippingSettings.shippingPolicies.clickHereToAddShippingPolicies);

		// shipping policy elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { clickHereToAddShippingPolicies, ...companyVerifications } = selector.vendor.vShippingSettings.shippingPolicies;
		await this.multipleElementVisible(companyVerifications);

		await this.clickAndWaitForLoadState(selector.vendor.vShippingSettings.shippingPolicies.backToZoneList);

		await this.clickAndWaitForLoadState(selector.vendor.vShippingSettings.previousShippingSettings.previousShippingSettings);

		// previous shipping settings elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { previousShippingSettings, ...previousShipping } = selector.vendor.vShippingSettings.previousShippingSettings;
		await this.multipleElementVisible(previousShipping);

		// await this.goBack();
	}


	// vendor shipstation render properly
	async vendorShipstationSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsShipstation);

		// shipstation text is visible
		await this.toBeVisible(selector.vendor.vShipStationSettings.shipStationText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vShipStationSettings.visitStore);

		// authentication key is visible
		await this.toBeVisible(selector.vendor.vShipStationSettings.authenticationKey);

		// export order statuses is visible
		await this.toBeVisible(selector.vendor.vShipStationSettings.exportOrderStatusesInput);

		// Shipped Order Status is visible
		await this.toBeVisible(selector.vendor.vShipStationSettings.shippedOrderStatusDropdown);

		// save changes is visible
		await this.toBeVisible(selector.vendor.vShipStationSettings.saveChanges);
	}


	// vendor social profile render properly
	async vendorSocialProfileSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsSocialProfile);

		// social profile text is visible
		await this.toBeVisible(selector.vendor.vSocialProfileSettings.socialProfileText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vSocialProfileSettings.visitStore);

		// social platform elements are visible
		await this.multipleElementVisible(selector.vendor.vSocialProfileSettings.platforms);

		// update settings is visible
		await this.toBeVisible(selector.vendor.vSocialProfileSettings.updateSettings);
	}


	// vendor rma render properly
	async vendorRmaSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsRma);

		// return and warranty text is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.returnAndWarrantyText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.visitStore);

		// rma label input is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.label);

		// rma type input is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.type);

		// rma policy input is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.refundPolicyIframe);

		// save changes is visible
		await this.toBeVisible(selector.vendor.vRmaSettings.saveChanges);
	}


	// vendor store seo render properly
	async vendorStoreSeoSettingsRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsSeo);

		// store seo text is visible
		await this.toBeVisible(selector.vendor.vStoreSeoSettings.storeSeoText);

		// visit store link is visible
		await this.toBeVisible(selector.vendor.vStoreSeoSettings.visitStore);

		// seo title is visible
		await this.toBeVisible(selector.vendor.vStoreSeoSettings.seoTitle);

		// meta description is visible
		await this.toBeVisible(selector.vendor.vStoreSeoSettings.metaDescription);

		// meta keywords is visible
		await this.toBeVisible(selector.vendor.vStoreSeoSettings.metaKeywords);

		// store seo facebook elements are visible
		await this.multipleElementVisible(selector.vendor.vStoreSeoSettings.facebook);

		// store seo twitter elements are visible
		await this.multipleElementVisible(selector.vendor.vStoreSeoSettings.twitter);

		// save changes is visible
		await this.toBeVisible(selector.vendor.vStoreSeoSettings.saveChanges);
	}


	// vendor set delivery settings
	async setDeliveryTimeSettings(deliveryTime: vendor['deliveryTime']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsDeliveryTime);
		// delivery support
		await this.check(selector.vendor.vDeliveryTimeSettings.homeDelivery);
		await this.check(selector.vendor.vDeliveryTimeSettings.storePickup);
		await this.clearAndType(selector.vendor.vDeliveryTimeSettings.deliveryBlockedBuffer, deliveryTime.deliveryBlockedBuffer);
		await this.clearAndType(selector.vendor.vDeliveryTimeSettings.timeSlot, deliveryTime.timeSlot);
		await this.clearAndType(selector.vendor.vDeliveryTimeSettings.orderPerSlot, deliveryTime.orderPerSlot);
		for (const day of deliveryTime.days) {
			await this.enableSwitcherDeliveryTime(selector.vendor.vDeliveryTimeSettings.deliveryDaySwitch(day));
			if (deliveryTime.choice === 'full-day'){
				await this.click(selector.vendor.vDeliveryTimeSettings.openingTime(day));
				await this.page.getByRole('listitem').filter({ hasText: 'Full day' }).click();
			} else {
				await this.setAttributeValue(selector.vendor.vDeliveryTimeSettings.openingTime(day), 'value', deliveryTime.openingTime);
				await this.setAttributeValue(selector.vendor.vDeliveryTimeSettings.openingTimeHiddenInput(day), 'value', deliveryTime.openingTime);
				await this.setAttributeValue(selector.vendor.vDeliveryTimeSettings.closingTime(day), 'value', deliveryTime.closingTime);
				await this.setAttributeValue(selector.vendor.vDeliveryTimeSettings.closingTimeHiddenInput(day), 'value', deliveryTime.closingTime);
			}
		}
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.settingsDeliveryTime, selector.vendor.vDeliveryTimeSettings.updateSettings, 302);
		await this.toContainText(selector.vendor.vDeliveryTimeSettings.settingsSuccessMessage, deliveryTime.saveSuccessMessage);
	}


	// vendor shipping settings

	// vendor set all shipping settings
	// async setAllShippingSettings(): Promise<void> {
	// 	await this.setShippingSettings(data.vendor.shipping.shippingMethods.flatRate);
	// 	await this.setShippingSettings(data.vendor.shipping.shippingMethods.freeShipping);
	// 	await this.setShippingSettings(data.vendor.shipping.shippingMethods.localPickup);
	// 	await this.setShippingSettings(data.vendor.shipping.shippingMethods.tableRateShipping);
	// 	await this.setShippingSettings(data.vendor.shipping.shippingMethods.distanceRateShipping);
	// }


	// set shipping policies
	async setShippingPolicies(shippingPolicy: vendor['shipping']['shippingPolicy']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsShipping);
		await this.click(selector.vendor.vShippingSettings.shippingPolicies.clickHereToAddShippingPolicies);
		await this.selectByValue(selector.vendor.vShippingSettings.shippingPolicies.processingTime, shippingPolicy.processingTime);
		await this.clearAndType(selector.vendor.vShippingSettings.shippingPolicies.shippingPolicy, shippingPolicy.shippingPolicy);
		await this.clearAndType(selector.vendor.vShippingSettings.shippingPolicies.refundPolicy, shippingPolicy.refundPolicy);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vShippingSettings.shippingPolicies.saveSettings);
		await this.toContainText(selector.vendor.vShippingSettings.updateSettingsSuccessMessage, shippingPolicy.saveSuccessMessage);
	}


	// vendor set shipping settings
	async setShippingSettings(shipping: any): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsShipping);
		// edit shipping zone
		await this.hover(selector.vendor.vShippingSettings.shippingZoneCell(shipping.shippingZone));
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.ajax, selector.vendor.vShippingSettings.editShippingZone(shipping.shippingZone));

		// add shipping method if not available
		const methodIsVisible = await this.isVisible(selector.vendor.vShippingSettings.shippingMethodCell(shipping.shippingMethod));
		if (!methodIsVisible) {
			await this.click(selector.vendor.vShippingSettings.addShippingMethod);
			await this.selectByValue(selector.vendor.vShippingSettings.shippingMethod, shipping.selectShippingMethod);
			await this.clickAndWaitForResponseAndLoadState(data.subUrls.ajax, selector.vendor.vShippingSettings.shippingMethodPopupAddShippingMethod);
			await expect(this.page.getByText(shipping.shippingMethodSaveSuccessMessage)).toBeVisible();
			await expect(this.page.getByText(shipping.zoneSaveSuccessMessage)).toBeVisible();
		}

		// edit shipping method
		await this.hover(selector.vendor.vShippingSettings.shippingMethodCell(shipping.shippingMethod));
		await this.click(selector.vendor.vShippingSettings.editShippingMethod(shipping.shippingMethod));

		switch (shipping.selectShippingMethod) {
		// flat rate
		case 'flat_rate' :
			await this.clearAndType(selector.vendor.vShippingSettings.flatRateMethodTitle, shipping.shippingMethod);
			await this.clearAndType(selector.vendor.vShippingSettings.flatRateCost, shipping.shippingCost);
			await this.selectByValue(selector.vendor.vShippingSettings.flatRateTaxStatus, shipping.taxStatus);
			await this.clearAndType(selector.vendor.vShippingSettings.flatRateDescription, shipping.description);
			await this.selectByValue(selector.vendor.vShippingSettings.flatRateCalculationType, shipping.calculationType);
			break;

			// free shipping
		case 'free_shipping' :
			await this.clearAndType(selector.vendor.vShippingSettings.freeShippingTitle, shipping.shippingMethod);
			await this.clearAndType(selector.vendor.vShippingSettings.freeShippingMinimumOrderAmount, shipping.freeShippingMinimumOrderAmount);
			break;

			// local pickup
		case 'local_pickup' :
			await this.clearAndType(selector.vendor.vShippingSettings.localPickupTitle, shipping.shippingMethod);
			await this.clearAndType(selector.vendor.vShippingSettings.localPickupCost, shipping.shippingCost);
			await this.selectByValue(selector.vendor.vShippingSettings.localPickupTaxStatus, shipping.taxStatus);
			await this.clearAndType(selector.vendor.vShippingSettings.flatRateDescription, shipping.description);
			break;

			// dokan table rate shipping
		case 'dokan_table_rate_shipping' :
			await this.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMethodTitle, shipping.shippingMethod);
			await this.selectByValue(selector.vendor.vShippingSettings.tableRateShippingTaxStatus, shipping.taxStatus);
			await this.selectByValue(selector.vendor.vShippingSettings.tableRateShippingTaxIncludedInShippingCosts, shipping.taxIncludedInShippingCosts);
			await this.clearAndType(selector.vendor.vShippingSettings.tableRateShippingHandlingFee, shipping.handlingFee);
			await this.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMaximumShippingCost, shipping.maximumShippingCost);
			// rates
			// await this.selectByValue(selector.vendor.vShippingSettings.tableRateShippingCalculationType,  shipping.calculationType)
			await this.clearAndType(selector.vendor.vShippingSettings.tableRateShippingHandlingFeePerOrder, shipping.handlingFeePerOrder);
			await this.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMinimumCostPerOrder, shipping.minimumCostPerOrder);
			await this.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMaximumCostPerOrder, shipping.maximumCostPerOrder);
			await this.click(selector.vendor.vShippingSettings.tableRateShippingUpdateSettings);
			await this.toContainText(selector.vendor.vShippingSettings.tableRateShippingUpdateSettingsSuccessMessage, shipping.tableRateSaveSuccessMessage);
			return;

			// dokan distance rate shipping
		case 'dokan_distance_rate_shipping' :
			await this.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingMethodTitle, shipping.shippingMethod);
			await this.selectByValue(selector.vendor.vShippingSettings.distanceRateShippingTaxStatus, shipping.taxStatus);
			await this.selectByValue(selector.vendor.vShippingSettings.distanceRateShippingTransportationMode, shipping.transportationMode);
			await this.selectByValue(selector.vendor.vShippingSettings.distanceRateShippingAvoid, shipping.avoid);
			await this.selectByValue(selector.vendor.vShippingSettings.distanceRateShippingDistanceUnit, shipping.distanceUnit);
			await this.check(selector.vendor.vShippingSettings.distanceRateShippingShowDistance);
			await this.check(selector.vendor.vShippingSettings.distanceRateShippingShowDuration);
			// shipping address
			await this.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingAddress1, shipping.street1);
			await this.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingAddress2, shipping.street2);
			await this.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingCity, shipping.city);
			await this.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingZipOrPostalCode, shipping.zipCode);
			await this.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingStateOrProvince, shipping.state);
			await this.selectByValue(selector.vendor.vShippingSettings.distanceRateShippingCountry, shipping.country);
			await this.click(selector.vendor.vShippingSettings.distanceRateShippingUpdateSettings);
			await this.toContainText(selector.vendor.vShippingSettings.distanceRateShippingUpdateSettingsSuccessMessage, shipping.distanceRateSaveSuccessMessage);
			return;

		default :
			break;
		}
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.ajax, selector.vendor.vShippingSettings.shippingSettingsSaveSettings);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.ajax, selector.vendor.vShippingSettings.saveChanges);
		await this.toContainText(selector.vendor.vShippingSettings.updateSettingsSuccessMessage, shipping.saveSuccessMessage);
	}


	// vendor set shipstation settings
	async setShipStation(shipStation: vendor['shipStation']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsShipstation);

		const allStatus = await this.getMultipleElementTexts(selector.vendor.vShipStationSettings.selectedStatus);
		const statusIsSelected = allStatus.includes('×'+ shipStation.status);
		if (!statusIsSelected){
			await this.clearAndType(selector.vendor.vShipStationSettings.exportOrderStatusesInput, shipStation.status);
			await this.toContainText(selector.vendor.vShipStationSettings.result, shipStation.status);
			await this.press(data.key.enter);
		}

		await this.click(selector.vendor.vShipStationSettings.shippedOrderStatusDropdown);
		await this.clearAndType(selector.vendor.vShipStationSettings.shippedOrderStatusInput, shipStation.status);
		await this.toContainText(selector.vendor.vShipStationSettings.result, shipStation.status);
		await this.press(data.key.enter);

		await this.clickAndAcceptAndWaitForResponse(data.subUrls.ajax, selector.vendor.vShipStationSettings.saveChanges);
		await this.toContainText(selector.vendor.vShipStationSettings.saveSuccessMessage, 'Your changes has been updated!');
		await this.click(selector.vendor.vShipStationSettings.successOk);
	}


	// vendor set social profile settings
	async setSocialProfile(urls: vendor['socialProfileUrls']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsSocialProfile);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.facebook, urls.facebook);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.twitter, urls.twitter);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.pinterest, urls.pinterest);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.linkedin, urls.linkedin);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.youtube, urls.youtube);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.instagram, urls.instagram);
		await this.clearAndType(selector.vendor.vSocialProfileSettings.platforms.flickr, urls.flickr);
		await this.keyPressOnLocator(selector.vendor.vSocialProfileSettings.updateSettings, data.key.enter);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.settingsRma, selector.vendor.vRmaSettings.saveChanges, 302);
		await this.toContainText(selector.vendor.vSocialProfileSettings.updateSettingsSuccessMessage, urls.saveSuccessMessage);
	}


	// vendor set rma settings
	async setRmaSettings(rma: vendor['rma']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsRma);
		await this.clearAndType(selector.vendor.vRmaSettings.label, rma.label);
		await this.selectByValue(selector.vendor.vRmaSettings.type, rma.type);
		await this.selectByValue(selector.vendor.vRmaSettings.length, rma.rmaLength);
		await this.clearAndType(selector.vendor.vRmaSettings.lengthValue, rma.lengthValue);
		await this.selectByValue(selector.vendor.vRmaSettings.lengthDuration, rma.lengthDuration);
		// check if refund reason exists
		const refundReasonIsVisible = await this.isVisible(selector.vendor.vRmaSettings.refundReasonsFirst);
		if (refundReasonIsVisible) {
			await this.checkMultiple(selector.vendor.vRmaSettings.refundReasons);
		}
		await this.typeFrameSelector(selector.vendor.vRmaSettings.refundPolicyIframe, selector.vendor.vRmaSettings.refundPolicyHtmlBody, rma.refundPolicyHtmlBody);
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.settingsRma, selector.vendor.vRmaSettings.saveChanges, 302);
		await this.toContainText(selector.vendor.vRmaSettings.updateSettingsSuccessMessage, rma.saveSuccessMessage);
	}


}
