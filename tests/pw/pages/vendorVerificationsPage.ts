import { Page, expect } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';
import { vendor } from 'utils/interfaces';


export class vendorVerificationsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}


	// verification requests


	// verification requests render properly
	async adminVerificationsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.verifications);

		// tools text is visible
		await this.toBeVisible(selector.admin.dokan.verifications.verificationRequestsText);

		// navTab elements are visible
		await this.multipleElementVisible(selector.admin.dokan.verifications.navTabs);

		// verification table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.verifications.table);
	}


	// ID verification requests
	async idVerificationRequest(storeName: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.verifications);

		await this.hover(selector.admin.dokan.verifications.vendorRow(storeName));
		switch (action) {

		case 'approve' :
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.verifications.idRequest.approveRequest(storeName));
			break;

		case 'reject' :
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.verifications.idRequest.rejectRequest(storeName));
			break;

		default :
			break;
		}

	}


	// address verification requests
	async addressVerificationRequest(storeName: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.verifications);

		await this.hover(selector.admin.dokan.verifications.vendorRow(storeName));
		switch (action) {

		case 'approve' :
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.verifications.addressRequest.approveRequest(storeName));
			break;

		case 'reject' :
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.verifications.addressRequest.rejectRequest(storeName));
			break;

		default :
			break;
		}
	}


	// company verification requests
	async companyVerificationRequest(storeName: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.verifications);

		await this.hover(selector.admin.dokan.verifications.vendorRow(storeName));
		switch (action) {

		case 'approve' :
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.verifications.companyRequest.approveRequest(storeName));
			break;

		case 'reject' :
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.verifications.companyRequest.rejectRequest(storeName));
			break;

		default :
			break;
		}

	}


	// vendor


	// vendor send id verification request
	async sendIdVerificationRequest(verification: vendor['verification']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsVerification);

		// cancel previous verification request if any
		const cancelRequestIsVisible = await this.isVisible(selector.vendor.vVerificationSettings.id.cancelIdVerificationRequest);
		if (cancelRequestIsVisible) {
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vVerificationSettings.id.cancelIdVerificationRequest);
			await this.toContainText(selector.vendor.vVerificationSettings.id.idUpdateSuccessMessage, verification.idRequestSubmitCancel);
		}

		// id verification
		await this.click(selector.vendor.vVerificationSettings.id.startIdVerification);
		await this.wait(0.5); //todo: resolve this

		// remove previously uploaded image
		const uploadPhotoBtnIsVisible = await this.isVisible(selector.vendor.vVerificationSettings.id.uploadPhoto);
		if (!uploadPhotoBtnIsVisible) {
			// await this.hover(selector.vendor.vVerificationSettings.id.previousUploadedPhoto); //todo:  not working: playwright issue
			// await this.click(selector.vendor.vVerificationSettings.id.removePreviousUploadedPhoto);

			await this.setAttributeValue('.gravatar-wrap', 'class', 'gravatar-wrap dokan-hide');
			await this.setAttributeValue('.gravatar-button-area.dokan-hide', 'class', 'gravatar-button-area');
		}

		await this.click(selector.vendor.vVerificationSettings.id.uploadPhoto);
		await this.uploadMedia(verification.file);

		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vVerificationSettings.id.submitId);
		await this.toContainText(selector.vendor.vVerificationSettings.id.idUpdateSuccessMessage, verification.idRequestSubmitSuccessMessage);
	}


	// vendor send address verification request
	async sendAddressVerificationRequest(verification: vendor['verification']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsVerification);

		// cancel previous verification request if any
		const cancelRequestIsVisible = await this.isVisible(selector.vendor.vVerificationSettings.address.cancelAddressVerificationRequest);
		if (cancelRequestIsVisible) {
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vVerificationSettings.address.cancelAddressVerificationRequest);
			await this.toContainText(selector.vendor.vVerificationSettings.address.addressUpdateSuccessMessage, verification.addressRequestSubmitCancel);
		}

		// address verification
		await this.click(selector.vendor.vVerificationSettings.address.startAddressVerification);
		await this.clearAndType(selector.vendor.vVerificationSettings.address.street, verification.street1);
		await this.clearAndType(selector.vendor.vVerificationSettings.address.street2, verification.street2);
		await this.clearAndType(selector.vendor.vVerificationSettings.address.city, verification.city);
		await this.clearAndType(selector.vendor.vVerificationSettings.address.postOrZipCode, verification.zipCode);
		await this.selectByValue(selector.vendor.vVerificationSettings.address.country, verification.country);
		await this.selectByValue(selector.vendor.vVerificationSettings.address.state, verification.state);

		await this.click(selector.vendor.vVerificationSettings.address.uploadResidenceProof);
		await this.uploadMedia(verification.file);

		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vVerificationSettings.address.submitAddress);
		await this.toContainText(selector.vendor.vVerificationSettings.address.addressUpdateSuccessMessage, verification.addressRequestSubmitSuccessMessage);
	}


	// vendor send company verification request
	async sendCompanyVerificationRequest(verification: vendor['verification']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.settingsVerification);

		// cancel previous verification request if any
		const cancelRequestIsVisible = await this.isVisible(selector.vendor.vVerificationSettings.company.cancelCompanyVerificationRequest);
		if (cancelRequestIsVisible) {
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vVerificationSettings.company.cancelCompanyVerificationRequest);
			await this.toContainText(selector.vendor.vVerificationSettings.company.companyInfoUpdateSuccessMessage, verification.companyRequestSubmitCancel);
		}

		// company verification
		await this.click(selector.vendor.vVerificationSettings.company.startCompanyVerification);
		await this.wait(1);

		// remove previously uploaded company file
		const UploadedCompanyFileIsVisible = await this.isVisible(selector.vendor.vVerificationSettings.company.uploadedFileFirst);
		if (UploadedCompanyFileIsVisible) {
			await this.click(selector.vendor.vVerificationSettings.company.uploadedFileFirst);
		}

		await this.click(selector.vendor.vVerificationSettings.company.uploadFiles);
		await this.uploadMedia(verification.file);

		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.vVerificationSettings.company.submitCompanyInfo);
		await this.toContainText(selector.vendor.vVerificationSettings.company.companyInfoUpdateSuccessMessage, verification.companyRequestSubmitSuccessMessage);
	}


	// upload media //todo: move to base-page and merge with wpUploadFile
	async uploadMedia(file: string) {
		await this.wait(0.5);
		const uploadedMediaIsVisible = await this.isVisible(selector.wpMedia.uploadedMediaFirst);
		if (uploadedMediaIsVisible) {
			await this.click(selector.wpMedia.uploadedMediaFirst);
		} else {
			await this.uploadFile(selector.wpMedia.selectFilesInput, file);
			const isSelectDisabled = await this.isDisabled(selector.wpMedia.select);
			isSelectDisabled && await this.click(selector.wpMedia.selectUploadedMedia);
			await this.click(selector.wpMedia.select);
		}
	}


}
