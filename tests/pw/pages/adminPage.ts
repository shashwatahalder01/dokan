import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { selector } from './selectors';
import { data } from '../utils/testData';
import { helpers } from '../utils/helpers';

export class AdminPage extends BasePage {

	constructor(page: Page) {
		super(page);
	}

	// navigation

	async goToAdminDashboard() {
		await this.goIfNotThere(data.subUrls.backend.adminDashboard);
	}

	async goToDokanSettings() {
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSettings);
	}

	async goToWooCommerceSettings() {
		await this.goIfNotThere(data.subUrls.backend.woocommerceSettings);
	}


	// wordpress site settings

	// plugin activation check
	async checkActivePlugins(plugins: any) {
		await this.goIfNotThere(data.subUrls.backend.plugins);
		for (const pluginSlug of plugins.pluginSlugList) {
			await expect(this.page.locator(selector.admin.plugins.plugin(pluginSlug))).toHaveClass(plugins.activeClass);
		}
	}

	// admin set wordpress site settings
	async setWpSettings(wpSettings: any) {
		await this.setWpGeneralSettings(wpSettings.general);
		await this.setPermalinkSettings(wpSettings.permalink);
	}

	// sst wp general settings
	async setWpGeneralSettings(general: any) {
		await this.goto(data.subUrls.backend.general);

		// enable user registration
		await this.check(selector.admin.settings.membership);
		// timezone
		await this.selectByValue(selector.admin.settings.timezone, general.timezone);
		await this.click(selector.admin.settings.generalSaveChanges);
		await expect(this.page.locator(selector.admin.settings.updatedSuccessMessage)).toContainText(general.saveSuccessMessage);
	}

	// admin set permalink settings
	async setPermalinkSettings(permalink: any) {
		await this.goto(data.subUrls.backend.permalinks);

		// set permalinks settings
		await this.click(selector.admin.settings.postName);
		const customBaseIsVisible = await this.isVisible(selector.admin.settings.customBase);
		if(customBaseIsVisible){
			await this.click(selector.admin.settings.customBase);
			await this.clearAndType(selector.admin.settings.customBaseInput, permalink.customBaseInput);
		}
		await this.click(selector.admin.settings.permalinkSaveChanges);
		await expect(this.page.locator(selector.admin.settings.updatedSuccessMessage)).toContainText(permalink.saveSuccessMessage);
	}

	// Tax

	// Admin Enable-Disable Tax
	async enableTax(enableTax = true) {
		await this.goToWooCommerceSettings();
		// Enable-Disable Tax
		enableTax ? await this.check(selector.admin.wooCommerce.settings.enableTaxes) : await this.uncheck(selector.admin.wooCommerce.settings.enableTaxes);
		await this.click(selector.admin.wooCommerce.settings.generalSaveChanges);
		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(data.tax.saveSuccessMessage);
	}

	// Admin Add Standard Tax Rate
	async addStandardTaxRate(tax: any) {
		await this.goToWooCommerceSettings();

		// Enable Tax
		await this.enableTax();

		// Set Tax Rate
		await this.click(selector.admin.wooCommerce.settings.tax);
		await this.click(selector.admin.wooCommerce.settings.standardRates);
		const taxIsVisible = await this.isVisible(selector.admin.wooCommerce.settings.taxRate);
		if (!taxIsVisible) {
			await this.click(selector.admin.wooCommerce.settings.insertRow);
		}
		await this.clearAndType(selector.admin.wooCommerce.settings.taxRate, tax.taxRate);
		await this.click(selector.admin.wooCommerce.settings.taxTable);

		await this.click(selector.admin.wooCommerce.settings.taxRateSaveChanges);


		const newTaxRate = await this.getElementValue(selector.admin.wooCommerce.settings.taxRate);
		// expect(newTaxRate).toBe(String(Number(tax.taxRate).toPrecision(5)))
		expect(newTaxRate).toBe(tax.taxRate);
	}


	// Woocommerce Settings

	// Admin Setup Woocommerce Settings
	async setWoocommerceSettings(data: any) {
		await this.enablePasswordInputField(data);
		await this.addStandardTaxRate(data.tax);
		await this.setCurrencyOptions(data.currency);
		await this.addShippingMethod(data.shipping.shippingMethods.flatRate);
		await this.addShippingMethod(data.shipping.shippingMethods.flatRate);
		await this.addShippingMethod(data.shipping.shippingMethods.freeShipping);
		await this.addShippingMethod(data.shipping.shippingMethods.tableRateShipping);
		await this.addShippingMethod(data.shipping.shippingMethods.distanceRateShipping);
		await this.addShippingMethod(data.shipping.shippingMethods.vendorShipping);
		await this.deleteShippingMethod(data.shipping.shippingMethods.flatRate);
		await this.deleteShippingZone(data.shipping.shippingZone);
	}

	// Enable Password Field
	async enablePasswordInputField(woocommerce: any) {
		await this.goToWooCommerceSettings();
		await this.click(selector.admin.wooCommerce.settings.accounts);
		await this.uncheck(selector.admin.wooCommerce.settings.automaticPasswordGeneration);
		await this.click(selector.admin.wooCommerce.settings.accountSaveChanges);
		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(woocommerce.saveSuccessMessage);
	}

	// Shipping Methods

	// Enable Enable-Disable Shipping

	async enableShipping(enableShipping = true) {

		await this.goToWooCommerceSettings();
		await this.click(selector.admin.wooCommerce.settings.enableShipping);
		if (enableShipping) { //TODO: is this needed
			await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.enableShippingValues, data.shipping.enableShipping);
		} else {
			await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.enableShippingValues, data.shipping.disableShipping);
		}
		await this.click(selector.admin.wooCommerce.settings.generalSaveChanges);
		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(data.shipping.saveSuccessMessage);

	}

	// Admin Add Shipping Method
	async addShippingMethod(shipping: any) {
		await this.goToWooCommerceSettings();

		await this.click(selector.admin.wooCommerce.settings.shipping);

		const zoneIsVisible = await this.isVisible(selector.admin.wooCommerce.settings.shippingZoneCell(shipping.shippingZone));
		if (!zoneIsVisible) {
			// Add Shipping Zone
			await this.click(selector.admin.wooCommerce.settings.addShippingZone);
			await this.clearAndType(selector.admin.wooCommerce.settings.zoneName, shipping.shippingZone);
			// await this.selectByValue(selector.admin.wooCommerce.settings.zoneRegions, shippingCountry) //use select values  'country:US',
			await this.click(selector.admin.wooCommerce.settings.zoneRegions);
			await this.type(selector.admin.wooCommerce.settings.zoneRegions, shipping.shippingCountry);

			await this.press(data.key.enter);
		} else {
			// Edit Shipping Zone
			await this.hover(selector.admin.wooCommerce.settings.shippingZoneCell(shipping.shippingZone));
			await this.click(selector.admin.wooCommerce.settings.editShippingMethod(shipping.shippingZone));
		}

		const methodIsVisible = await this.isVisible(selector.admin.wooCommerce.settings.shippingMethodCell(helpers.replaceAndCapitalize(shipping.shippingMethod)));
		if (!methodIsVisible) {
			// Add Shipping Method
			await this.click(selector.admin.wooCommerce.settings.addShippingMethods);
			await this.selectByValue(selector.admin.wooCommerce.settings.shippingMethod, shipping.selectShippingMethod);
			await this.click(selector.admin.wooCommerce.settings.addShippingMethod);

		}
		// Edit Shipping Method Options
		await this.hover(selector.admin.wooCommerce.settings.shippingMethodCell(shipping.shippingMethod));
		await this.click(selector.admin.wooCommerce.settings.editShippingMethod(shipping.shippingMethod));

		switch (shipping.selectShippingMethod) {
		case 'flat_rate' :
			// Flat Rate
			await this.clearAndType(selector.admin.wooCommerce.settings.flatRateMethodTitle, shipping.shippingMethod);
			await this.selectByValue(selector.admin.wooCommerce.settings.flatRateTaxStatus, shipping.taxStatus);
			await this.clearAndType(selector.admin.wooCommerce.settings.flatRateCost, shipping.shippingCost);
			break;

		case 'free_shipping' :
			// Free Shipping
			await this.clearAndType(selector.admin.wooCommerce.settings.freeShippingTitle, shipping.shippingMethod);
			// await this.selectByValue(selector.admin.wooCommerce.settings.freeShippingRequires, shipping.freeShippingRequires)
			// await this.clearAndType(selector.admin.wooCommerce.settings.freeShippingMinimumOrderAmount,shipping.freeShippingMinimumOrderAmount)
			// await this.check(selector.admin.wooCommerce.settings.freeShippingCouponsDiscounts)
			break;

		case 'local_pickup' :
			// Local Pickup
			await this.clearAndType(selector.admin.wooCommerce.settings.localPickupTitle, shipping.shippingMethod);
			await this.selectByValue(selector.admin.wooCommerce.settings.localPickupTaxStatus, shipping.taxStatus);
			await this.clearAndType(selector.admin.wooCommerce.settings.localPickupCost, shipping.shippingCost);
			break;

		case 'dokan_table_rate_shipping' :
			// Dokan Table Rate Shipping
			await this.clearAndType(selector.admin.wooCommerce.settings.dokanTableRateShippingMethodTitle, shipping.shippingMethod);
			break;

		case 'dokan_distance_rate_shipping' :
			// Dokan Distance Rate Shipping
			await this.clearAndType(selector.admin.wooCommerce.settings.dokanDistanceRateShippingMethodTitle, shipping.shippingMethod);
			break;

		case 'dokan_vendor_shipping' :
			// Vendor Shipping
			await this.clearAndType(selector.admin.wooCommerce.settings.vendorShippingMethodTitle, shipping.shippingMethod);
			await this.selectByValue(selector.admin.wooCommerce.settings.vendorShippingTaxStatus, shipping.taxStatus);
			break;

		default :
			break;
		}

		await this.click(selector.admin.wooCommerce.settings.shippingMethodSaveChanges);
		await expect(this.page.locator(selector.admin.wooCommerce.settings.shippingMethodCell(shipping.shippingMethod))).toBeVisible();

	}

	// Admin Delete Shipping Zone
	async deleteShippingZone(shippingZone: any) {
		await this.click(selector.admin.wooCommerce.settings.shipping);

		await this.hover(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone));
		await this.acceptAlert();
		await this.click(selector.admin.wooCommerce.settings.deleteShippingZone(shippingZone));


		const shippingZoneIsVisible = await this.isVisible(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone));
		expect(shippingZoneIsVisible).toBe(false);
	}

	// Admin Delete Shipping Method
	async deleteShippingMethod(shipping: any) {
		await this.click(selector.admin.wooCommerce.settings.shipping);

		await this.hover(selector.admin.wooCommerce.settings.shippingZoneCell(shipping.shippingZone));
		await this.click(selector.admin.wooCommerce.settings.editShippingZone(shipping.shippingZone));
		await this.hover(selector.admin.wooCommerce.settings.shippingMethodCell(shipping.shippingMethod));
		await this.click(selector.admin.wooCommerce.settings.deleteShippingMethod(shipping.shippingMethod));
		await this.click(selector.admin.wooCommerce.settings.shippingZoneSaveChanges);

		const shippingMethodIsVisible = await this.isVisible(selector.admin.wooCommerce.settings.shippingMethodCell(shipping.shippingMethod));
		expect(shippingMethodIsVisible).toBe(false);
	}


	// Payment Methods

	// Admin Set Currency Options
	async setCurrencyOptions(currency: any) {
		await this.goToWooCommerceSettings();

		// Set Currency Options
		await this.clearAndType(selector.admin.wooCommerce.settings.thousandSeparator, currency.currencyOptions.thousandSeparator);
		await this.clearAndType(selector.admin.wooCommerce.settings.decimalSeparator, currency.currencyOptions.decimalSeparator);
		await this.clearAndType(selector.admin.wooCommerce.settings.numberOfDecimals, currency.currencyOptions.numberOfDecimals);
		await this.click(selector.admin.wooCommerce.settings.generalSaveChanges);
		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(currency.saveSuccessMessage);

	}

	// Admin Set Currency
	async setCurrency(currency: any) {
		await this.goToWooCommerceSettings();
		const currentCurrency = await this.getElementText(selector.admin.wooCommerce.settings.currency);
		if (currentCurrency !== currency) {
			await this.click(selector.admin.wooCommerce.settings.currency);
			await this.type(selector.admin.wooCommerce.settings.currency, currency);
			await this.press(data.key.enter);
			await this.click(selector.admin.wooCommerce.settings.generalSaveChanges);
			await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(data.payment.currency.saveSuccessMessage);
		}
	}

	// Admin Setup Basic Payment Methods
	async setupBasicPaymentMethods(payment: any) {
		await this.goToWooCommerceSettings();

		await this.click(selector.admin.wooCommerce.settings.payments);
		// Bank Transfer
		await this.enablePaymentMethod(selector.admin.wooCommerce.settings.enableDirectBankTransfer);
		// Payments
		await this.enablePaymentMethod(selector.admin.wooCommerce.settings.enableCheckPayments);
		// Cash on Delivery
		await this.enablePaymentMethod(selector.admin.wooCommerce.settings.enableCashOnDelivery);

		await this.click(selector.admin.wooCommerce.settings.paymentMethodsSaveChanges);
		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(payment.saveSuccessMessage);
	}

	// Admin Setup Stripe
	async setupStripeConnect(payment: any) {
		await this.goToWooCommerceSettings();

		await this.setCurrency(payment.currency.dollar);

		await this.click(selector.admin.wooCommerce.settings.payments);
		await this.click(selector.admin.wooCommerce.settings.setupDokanStripeConnect);
		// Setup Strip Connect
		await this.check(selector.admin.wooCommerce.settings.stripe.enableDisableStripe);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripe.title, payment.stripeConnect.title);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripe.description, payment.stripeConnect.description);
		await this.check(selector.admin.wooCommerce.settings.stripe.nonConnectedSellers);
		await this.check(selector.admin.wooCommerce.settings.stripe.displayNoticeToConnectSeller);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripe.displayNoticeInterval, payment.stripeConnect.displayNoticeInterval);
		await this.check(selector.admin.wooCommerce.settings.stripe.threeDSecureAndSca);
		await this.check(selector.admin.wooCommerce.settings.stripe.sellerPaysTheProcessingFeeIn3DsMode);
		await this.check(selector.admin.wooCommerce.settings.stripe.testMode);
		await this.check(selector.admin.wooCommerce.settings.stripe.stripeCheckout);
		await this.click(selector.admin.wooCommerce.settings.stripe.stripeCheckoutLocale);
		await this.type(selector.admin.wooCommerce.settings.stripe.stripeCheckoutLocale, payment.stripeConnect.stripeCheckoutLocale);
		await this.press(data.key.enter);
		await this.check(selector.admin.wooCommerce.settings.stripe.savedCards);
		// Test Credentials
		await this.clearAndType(selector.admin.wooCommerce.settings.stripe.testPublishableKey, payment.stripeConnect.testPublishableKey);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripe.testSecretKey, payment.stripeConnect.testSecretKey);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripe.testClientId, payment.stripeConnect.testClientId);
		await this.click(selector.admin.wooCommerce.settings.stripe.stripeSaveChanges);

		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(payment.saveSuccessMessage);

	}

	// Admin Setup Dokan Paypal Marketplace
	async setupPaypalMarketPlace(payment: any) {
		await this.goToWooCommerceSettings();

		await this.setCurrency(payment.currency.dollar);

		await this.click(selector.admin.wooCommerce.settings.payments);
		await this.click(selector.admin.wooCommerce.settings.setupDokanPayPalMarketplace);
		// Setup Paypal Marketplace
		await this.check(selector.admin.wooCommerce.settings.paypalMarketPlace.enableDisablePayPalMarketplace);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.title, payment.paypalMarketPlace.title);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.description, payment.paypalMarketPlace.description);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.payPalMerchantId, payment.paypalMarketPlace.payPalMerchantId);
		// API Credentials
		await this.check(selector.admin.wooCommerce.settings.paypalMarketPlace.payPalSandbox);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.sandboxClientId, payment.paypalMarketPlace.sandboxClientId);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.sandBoxClientSecret, payment.paypalMarketPlace.sandBoxClientSecret);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.payPalPartnerAttributionId, payment.paypalMarketPlace.payPalPartnerAttributionId);
		await this.click(selector.admin.wooCommerce.settings.paypalMarketPlace.disbursementMode);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.paypalMarketPlace.disbursementModeValues, payment.paypalMarketPlace.disbursementMode);
		await this.click(selector.admin.wooCommerce.settings.paypalMarketPlace.paymentButtonType);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.paypalMarketPlace.paymentButtonTypeValues, payment.paypalMarketPlace.paymentButtonType);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.marketplaceLogo, await this.getBaseUrl() + payment.paypalMarketPlace.marketplaceLogoPath);
		await this.check(selector.admin.wooCommerce.settings.paypalMarketPlace.displayNoticeToConnectSeller);
		await this.check(selector.admin.wooCommerce.settings.paypalMarketPlace.sendAnnouncementToConnectSeller);
		await this.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.sendAnnouncementInterval, payment.paypalMarketPlace.announcementInterval);
		await this.click(selector.admin.wooCommerce.settings.paypalMarketPlace.paypalMarketPlaceSaveChanges);

		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(payment.saveSuccessMessage);
	}

	// Admin Setup Mangopay
	async setupMangoPay(payment: any) {
		await this.goToWooCommerceSettings();

		await this.setCurrency(payment.currency.euro);

		await this.click(selector.admin.wooCommerce.settings.payments);
		await this.click(selector.admin.wooCommerce.settings.setupDokanMangoPay);
		// Setup Mangopay
		await this.check(selector.admin.wooCommerce.settings.dokanMangoPay.enableDisableMangoPayPayment);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.title, payment.mangoPay.title);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.description, payment.mangoPay.description);
		// API Credentials
		await this.check(selector.admin.wooCommerce.settings.dokanMangoPay.mangoPaySandbox);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.sandboxClientId, payment.mangoPay.sandboxClientId);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.sandBoxApiKey, payment.mangoPay.sandBoxApiKey);
		// Payment Options
		await this.click(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableCreditCards);
		// await this.type(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableCreditCards, 'CB/Visa/Mastercard')
		// await this.press(data.key.enter)
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableCreditCardsValues, payment.mangoPay.availableCreditCards);
		await this.click(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableDirectPaymentServices);
		// await this.type(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableDirectPaymentServices, 'Sofort*')
		// await this.press(data.key.enter) //TODO: check why commented
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableDirectPaymentServicesValues, payment.mangoPay.availableDirectPaymentServices);
		await this.check(selector.admin.wooCommerce.settings.dokanMangoPay.savedCards);
		// Fund Transfers and Payouts
		await this.click(selector.admin.wooCommerce.settings.dokanMangoPay.transferFunds);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.transferFundsValues, payment.mangoPay.transferFunds);
		await this.check(selector.admin.wooCommerce.settings.dokanMangoPay.payoutMode);
		// Types and Requirements of Vendors
		await this.click(selector.admin.wooCommerce.settings.dokanMangoPay.typeOfVendors);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.typeOfVendorsValues, payment.mangoPay.typeOfVendors);
		await this.click(selector.admin.wooCommerce.settings.dokanMangoPay.businessRequirement);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.businessRequirementValues, payment.mangoPay.businessRequirement);
		// Advanced Settings
		await this.check(selector.admin.wooCommerce.settings.dokanMangoPay.displayNoticeToNonConnectedSellers);
		await this.check(selector.admin.wooCommerce.settings.dokanMangoPay.sendAnnouncementToNonConnectedSellers);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.announcementInterval, payment.mangoPay.announcementInterval);
		await this.click(selector.admin.wooCommerce.settings.dokanMangoPay.dokanMangopaySaveChanges);

		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(payment.saveSuccessMessage);
	}

	// Admin Setup Razorpay
	async setupRazorpay(payment: any) {
		await this.goToWooCommerceSettings();

		await this.setCurrency(payment.currency.rupee);

		await this.click(selector.admin.wooCommerce.settings.payments);
		await this.click(selector.admin.wooCommerce.settings.setupDokanRazorpay);
		// Setup Razorpay
		await this.check(selector.admin.wooCommerce.settings.dokanRazorpay.enableDisableDokanRazorpay);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.title, payment.razorPay.title);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.description, payment.razorPay.description);
		// API Credentials
		await this.check(selector.admin.wooCommerce.settings.dokanRazorpay.razorpaySandbox);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.testKeyId, payment.razorPay.testKeyId);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.testKeySecret, payment.razorPay.testKeySecret);
		await this.click(selector.admin.wooCommerce.settings.dokanRazorpay.disbursementMode);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanRazorpay.disbursementModeValues, payment.razorPay.disbursementMode);
		await this.check(selector.admin.wooCommerce.settings.dokanRazorpay.sellerPaysTheProcessingFee);
		await this.check(selector.admin.wooCommerce.settings.dokanRazorpay.displayNoticeToConnectSeller);
		await this.check(selector.admin.wooCommerce.settings.dokanRazorpay.sendAnnouncementToConnectSeller);
		await this.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.sendAnnouncementInterval, payment.razorPay.announcementInterval);
		await this.click(selector.admin.wooCommerce.settings.dokanRazorpay.dokanRazorpaySaveChanges);

		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(payment.saveSuccessMessage);
	}

	// Admin Setup Stripe Express
	async setupStripeExpress(payment: any) {
		await this.goToWooCommerceSettings();

		await this.setCurrency(payment.currency.dollar);

		await this.click(selector.admin.wooCommerce.settings.payments);
		await this.click(selector.admin.wooCommerce.settings.setupDokanStripeExpress);

		// Stripe Express
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.enableOrDisableStripeExpress);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.title, payment.stripeExpress.title);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.description, payment.stripeExpress.description);
		// API Credentials
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.testMode);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.testPublishableKey, payment.stripeExpress.testPublishableKey);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.testSecretKey, payment.stripeExpress.testSecretKey);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.testWebhookSecret, payment.stripeExpress.testWebhookSecret);
		// Payment and Disbursement
		await this.click(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethods);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethodsValues, payment.stripeExpress.paymentMethods.card);
		await this.click(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethods);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethodsValues, payment.stripeExpress.paymentMethods.ideal);
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.takeProcessingFeesFromSellers);
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.savedCards);
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.capturePaymentsManually);
		await this.click(selector.admin.wooCommerce.settings.stripeExpress.disburseFunds);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.disbursementModeValues, payment.stripeExpress.disbursementMode);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.customerBankStatement, payment.stripeExpress.customerBankStatement);
		// Payment Request Options (Apple Pay/Google Pay)
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.paymentRequestButtons);
		await this.selectByValue(selector.admin.wooCommerce.settings.stripeExpress.buttonType, payment.stripeExpress.paymentRequestButtonType);
		await this.selectByValue(selector.admin.wooCommerce.settings.stripeExpress.buttonTheme, payment.stripeExpress.paymentRequestButtonTheme);
		await this.click(selector.admin.wooCommerce.settings.stripeExpress.buttonLocations);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.buttonLocationsValues, payment.stripeExpress.paymentRequestButtonLocation.product);
		await this.click(selector.admin.wooCommerce.settings.stripeExpress.buttonLocations);
		await this.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.buttonLocationsValues, payment.stripeExpress.paymentRequestButtonLocation.cart);
		// Advanced Settings
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.displayNoticeToNonConnectedSellers);
		await this.check(selector.admin.wooCommerce.settings.stripeExpress.sendAnnouncementToNonConnectedSellers);
		await this.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.announcementInterval, payment.stripeExpress.announcementInterval);
		await this.click(selector.admin.wooCommerce.settings.stripeExpress.stripeExpressSaveChanges);

		await expect(this.page.locator(selector.admin.wooCommerce.settings.updatedSuccessMessage)).toContainText(payment.saveSuccessMessage);
	}


	// vendors

	// admin add new vendors
	async addVendor(vendorInfo: any) {
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		const firstName = vendorInfo.firstName();
		const email = vendorInfo.email();

		// add new vendor
		await this.click(selector.admin.dokan.vendors.addNewVendor);
		// account info
		await this.type(selector.admin.dokan.vendors.firstName, firstName);
		await this.type(selector.admin.dokan.vendors.lastName, vendorInfo.lastName());
		await this.type(selector.admin.dokan.vendors.storeName, vendorInfo.shopName);
		await this.typeAndWaitForResponse('dokan/v1/stores', selector.admin.dokan.vendors.storeUrl, vendorInfo.shopName);
		await this.type(selector.admin.dokan.vendors.phoneNumber, vendorInfo.phoneNumber);
		await this.typeAndWaitForResponse('dokan/v1/stores', selector.admin.dokan.vendors.email, email);
		await this.click(selector.admin.dokan.vendors.generatePassword);
		await this.clearAndType(selector.admin.dokan.vendors.password, vendorInfo.password);
		await this.typeAndWaitForResponse('dokan/v1/stores', selector.admin.dokan.vendors.username, firstName);
		await this.type(selector.admin.dokan.vendors.companyName, vendorInfo.companyName);
		await this.type(selector.admin.dokan.vendors.companyIdEuidNumber, vendorInfo.companyId);
		await this.type(selector.admin.dokan.vendors.vatOrTaxNumber, vendorInfo.vatNumber);
		await this.type(selector.admin.dokan.vendors.nameOfBank, vendorInfo.bankName);
		await this.type(selector.admin.dokan.vendors.bankIban, vendorInfo.bankIban);
		await this.click(selector.admin.dokan.vendors.next);
		// address
		await this.type(selector.admin.dokan.vendors.street1, vendorInfo.street1);
		await this.type(selector.admin.dokan.vendors.street2, vendorInfo.street2);
		await this.type(selector.admin.dokan.vendors.city, vendorInfo.city);
		await this.type(selector.admin.dokan.vendors.zip, vendorInfo.zipCode);
		await this.click(selector.admin.dokan.vendors.country);
		await this.type(selector.admin.dokan.vendors.countryInput, vendorInfo.country);
		await this.press(data.key.enter);
		await this.click(selector.admin.dokan.vendors.state);
		await this.type(selector.admin.dokan.vendors.state, vendorInfo.state);
		await this.click(selector.admin.dokan.vendors.next);
		// payment options
		await this.type(selector.admin.dokan.vendors.accountName, vendorInfo.accountName);
		await this.type(selector.admin.dokan.vendors.accountNumber, vendorInfo.accountNumber);
		await this.type(selector.admin.dokan.vendors.bankName, vendorInfo.bankName);
		await this.type(selector.admin.dokan.vendors.bankAddress, vendorInfo.bankAddress);
		await this.type(selector.admin.dokan.vendors.routingNumber, vendorInfo.routingNumber);
		await this.type(selector.admin.dokan.vendors.iban, vendorInfo.iban);
		await this.type(selector.admin.dokan.vendors.swift, vendorInfo.swiftCode);
		await this.fill(selector.admin.dokan.vendors.payPalEmail, vendorInfo.email());
		await this.check(selector.admin.dokan.vendors.enableSelling);
		await this.check(selector.admin.dokan.vendors.publishProductDirectly);
		await this.check(selector.admin.dokan.vendors.makeVendorFeature);
		// create vendor
		await this.clickAndWaitForResponse('/dokan/v1/stores', selector.admin.dokan.vendors.createVendor);
		await expect(this.page.locator(selector.admin.dokan.vendors.sweetAlertTitle)).toContainText('Vendor Created');
		await this.click(selector.admin.dokan.vendors.closeSweetAlert);
	}

	// admin add categories
	async addCategory(categoryName: string) {
		await this.goIfNotThere(data.subUrls.backend.wcAddNewCategories);

		// add new category
		await this.fill(selector.admin.products.category.name, categoryName);
		await this.fill(selector.admin.products.category.slug, categoryName);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.category.addNewCategory);
		await expect(this.page.locator(selector.admin.products.category.categoryCell(categoryName))).toBeVisible();
	}

	// admin add attributes
	async addAttributes(attribute: any) {
		await this.goIfNotThere(data.subUrls.backend.wcAddNewAttributes);

		// add new attribute
		await this.fill(selector.admin.products.attribute.name, attribute.attributeName);
		await this.fill(selector.admin.products.attribute.slug, attribute.attributeName);
		await this.clickAndWaitForResponse(data.subUrls.backend.wcAddNewAttributes, selector.admin.products.attribute.addAttribute);
		await expect(this.page.locator(selector.admin.products.attribute.attributeCell(attribute.attributeName))).toBeVisible();
		await this.clickAndWaitForResponse('wp-admin/edit-tags.php?taxonomy', selector.admin.products.attribute.configureTerms(attribute.attributeName));

		// add new term
		for (const attributeTerm of attribute.attributeTerms) {
			await this.fill(selector.admin.products.attribute.attributeTerm, attributeTerm);
			await this.fill(selector.admin.products.attribute.attributeTermSlug, attributeTerm);
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.attribute.addAttributeTerm);
			await expect(this.page.locator(selector.admin.products.attribute.attributeTermCell(attributeTerm))).toBeVisible();
		}
	}

	// admin add simple product
	async addSimpleProduct(product: any) {

		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// add new simple product
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.type(selector.admin.products.product.regularPrice, product.regularPrice());
		await this.click(selector.admin.products.product.category(product.category));
		// stock status
		product.stockStatus && await this.editStockStatus(data.product.stockStatus.outOfStock);
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		switch (product.status) {
		case 'publish' :
			// await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.product.publish);
			await this.clickAndWaitForNavigation(selector.admin.products.product.publish);
			await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
			break;

		case 'draft' :
			await this.click(selector.admin.products.product.saveDraft);
			await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.draftUpdateSuccessMessage);
			break;

		case 'pending' :
			await this.click(selector.admin.products.product.editStatus);
			await this.selectByValue(selector.admin.products.product.status, data.product.status.pending);
			await this.click(selector.admin.products.product.saveDraft);
			await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.pendingProductUpdateSuccessMessage);
			break;

		default :
			break;
		}
	}

	// admin add variable product
	async addVariableProduct(product: any) {

		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// add new variable product
		// name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		// add attributes
		await this.click(selector.admin.products.product.attributes);

		if (await this.isVisibleLocator(selector.admin.products.product.customProductAttribute)) {
			await this.selectByValue(selector.admin.products.product.customProductAttribute, `pa_${product.attribute}`);
			await this.click(selector.admin.products.product.addAttribute);
		} else {
			await this.clickAndWaitForResponse('wp-admin/admin-ajax.php?action=woocommerce_json_search_product_attributes', selector.admin.products.product.addExistingAttribute);
			await this.typeAndWaitForResponse('wp-admin/admin-ajax.php?term', selector.admin.products.product.addExistingAttributeInput, product.attribute);
			await this.pressAndWaitForResponse(data.subUrls.ajax, data.key.enter);
		}

		await this.clickAndWaitForResponse('wp-admin/admin-ajax.php?action=woocommerce_json_search_taxonomy_terms', selector.admin.products.product.selectAll);
		// await this.click(selector.admin.products.product.usedForVariations)
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.product.saveAttributes);
		await this.wait(2);
		// add variations
		await this.click(selector.admin.products.product.variations);
		await this.selectByValue(selector.admin.products.product.addVariations, product.variations.linkAllVariation);
		// await this.fillAlert('120')
		await this.click(selector.admin.products.product.go);

		await this.selectByValue(selector.admin.products.product.addVariations, product.variations.variableRegularPrice);
		await this.fillAlert('120');
		await this.click(selector.admin.products.product.go);

		// category
		await this.click(selector.admin.products.product.category(product.category));
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();
		// Publish
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.products.product.publish, 302);
		await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
	}

	// Admin Add Simple Subscription Product
	async addSimpleSubscription(product: any) {
		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// Add New Simple Subscription
		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.type(selector.admin.products.product.subscriptionPrice, product.subscriptionPrice());
		await this.selectByValue(selector.admin.products.product.subscriptionPeriodInterval, product.subscriptionPeriodInterval);
		await this.selectByValue(selector.admin.products.product.subscriptionPeriod, product.subscriptionPeriod);
		await this.selectByValue(selector.admin.products.product.expireAfter, product.expireAfter);
		await this.type(selector.admin.products.product.subscriptionTrialLength, product.subscriptionTrialLength);
		await this.selectByValue(selector.admin.products.product.subscriptionTrialPeriod, product.subscriptionTrialPeriod);
		// Category
		await this.click(selector.admin.products.product.category(product.category));
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.products.product.publish, 302);

		await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
	}

	// Admin Add External Product
	async addExternalProduct(product: any) {

		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// Add New External Product
		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.type(selector.admin.products.product.productUrl, await this.getBaseUrl() + product.productUrl);
		await this.type(selector.admin.products.product.buttonText, product.buttonText);
		await this.type(selector.admin.products.product.regularPrice, product.regularPrice());
		// Category
		await this.click(selector.admin.products.product.category(product.category));
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.products.product.publish, 302);

		await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
	}

	// Admin Add Dokan Subscription Product
	async addDokanSubscription(product: any) {

		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// Add New Dokan Subscription Product
		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.type(selector.admin.products.product.regularPrice, product.regularPrice());
		// Category
		await this.click(selector.admin.products.product.category(product.category));
		// Subscription Details
		await this.type(selector.admin.products.product.numberOfProducts, product.numberOfProducts);
		await this.type(selector.admin.products.product.packValidity, product.packValidity);
		await this.type(selector.admin.products.product.advertisementSlot, product.advertisementSlot);
		await this.type(selector.admin.products.product.expireAfterDays, product.expireAfterDays);
		await this.click(selector.admin.products.product.recurringPayment);
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.products.product.publish, 302);
		await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
	}

	// Admin Add Auction Product
	async addAuctionProduct(product: any) {

		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// Add New Auction Product
		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.selectByValue(selector.admin.products.product.itemCondition, product.itemCondition);
		await this.selectByValue(selector.admin.products.product.auctionType, product.auctionType);
		await this.type(selector.admin.products.product.startPrice, product.regularPrice());
		await this.type(selector.admin.products.product.bidIncrement, product.bidIncrement());
		await this.type(selector.admin.products.product.reservedPrice, product.reservedPrice());
		await this.type(selector.admin.products.product.buyItNowPrice, product.buyItNowPrice());
		await this.type(selector.admin.products.product.auctionDatesFrom, product.startDate);
		await this.type(selector.admin.products.product.auctionDatesTo, product.endDate);
		// Category
		await this.click(selector.admin.products.product.category(product.category));
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.products.product.publish, 302);
		await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
	}

	// Admin Add Booking Product
	async addBookingProduct(product: any) {

		await this.goIfNotThere(data.subUrls.backend.wcAddNewProducts);

		// Add New Booking Product
		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.selectByValue(selector.admin.products.product.bookingDurationType, product.bookingDurationType);
		await this.clearAndType(selector.admin.products.product.bookingDurationMax, product.bookingDurationMax);
		await this.selectByValue(selector.admin.products.product.calendarDisplayMode, product.calendarDisplayMode);
		// Costs
		await this.click(selector.admin.products.product.bookingCosts);
		await this.clearAndType(selector.admin.products.product.baseCost, product.baseCost);
		await this.clearAndType(selector.admin.products.product.blockCost, product.blockCost);
		// Category
		await this.click(selector.admin.products.product.category(product.category));
		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponse(data.subUrls.post, selector.admin.products.product.publish, 302);
		await expect(this.page.locator(selector.admin.products.product.updatedSuccessMessage)).toContainText(data.product.publishSuccessMessage);
	}

	// Admin Update Product Stock Status
	async editStockStatus(status: any) {
		await this.click(selector.admin.products.product.inventory);
		await this.selectByValue(selector.admin.products.product.stockStatus, status);
	}


	// async getOrderDetails(orderNumber: any) {
	// 	const subMenuOpened = await this.getClassValue(selector.admin.aDashboard.dokanMenu);
	// 	if (subMenuOpened.includes('opensub')) {
	// 		await this.hover(selector.admin.aDashboard.dokan);
	// 		await this.click(selector.admin.dokan.menus.reports);
	// 	} else {
	// 		await this.click(selector.admin.dokan.menus.reports);

	// 	}
	// 	await this.click(selector.admin.dokan.reports.allLogs);

	// 	await this.type(selector.admin.dokan.reports.searchByOrder, orderNumber);


	// 	const aOrderDetails = {
	// 		orderNumber: (await this.getElementText(selector.admin.dokan.reports.orderId)).split('#')[1],
	// 		store: await this.getElementText(selector.admin.dokan.reports.store),
	// 		orderTotal: helpers.price(await this.getElementText(selector.admin.dokan.reports.orderTotal)),
	// 		vendorEarning: helpers.price(await this.getElementText(selector.admin.dokan.reports.vendorEarning)),
	// 		commission: helpers.price(await this.getElementText(selector.admin.dokan.reports.commission)),
	// 		gatewayFee: helpers.price(await this.getElementText(selector.admin.dokan.reports.gatewayFee)),
	// 		shippingCost: helpers.price(await this.getElementText(selector.admin.dokan.reports.shippingCost)),
	// 		tax: helpers.price(await this.getElementText(selector.admin.dokan.reports.tax)),
	// 		orderStatus: await this.getElementText(selector.admin.dokan.reports.orderStatus),
	// 		orderDate: await this.getElementText(selector.admin.dokan.reports.orderDate),
	// 	};
	// 	return aOrderDetails;
	// }

	// // Get Total Admin Commission from Admin Dashboard
	// async getTotalAdminCommission() {
	// 	await this.hover(selector.admin.aDashboard.dokan);
	// 	await this.click(selector.admin.dokan.menus.dashboard);

	// 	const totalAdminCommission = helpers.price(await this.getElementText(selector.admin.dokan.dashboard.commissionEarned));
	// 	return totalAdminCommission;
	// }


	// Dokan Setup Wizard

	// Admin Set Dokan Setup Wizard
	async setDokanSetupWizard(dokanSetupWizard: any) {
		// await this.hover(selector.admin.aDashboard.dokan)
		// await this.click(selector.admin.dokan.toolsMenu)

		// Open Dokan Setup Wizard
		// await this.click(selector.admin.dokan.tools.openSetupWizard)

		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSetupWizard);
		await this.click(selector.admin.dokan.dokanSetupWizard.letsGo);
		// Store
		await this.clearAndType(selector.admin.dokan.dokanSetupWizard.vendorStoreURL, dokanSetupWizard.vendorStoreURL);
		await this.selectByValue(selector.admin.dokan.dokanSetupWizard.shippingFeeRecipient, dokanSetupWizard.shippingFeeRecipient);
		await this.selectByValue(selector.admin.dokan.dokanSetupWizard.taxFeeRecipient, dokanSetupWizard.taxFeeRecipient);
		await this.selectByValue(selector.admin.dokan.dokanSetupWizard.mapApiSource, dokanSetupWizard.mapApiSource);
		await this.clearAndType(selector.admin.dokan.dokanSetupWizard.googleMapApiKey, dokanSetupWizard.googleMapApiKey);
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.shareEssentialsOff);
		await this.selectByValue(selector.admin.dokan.dokanSetupWizard.sellingProductTypes, dokanSetupWizard.sellingProductTypes);
		await this.click(selector.admin.dokan.dokanSetupWizard.continue);
		// await this.click(selector.admin.dokan.dokanSetupWizard.skipThisStep)
		// Selling
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.newVendorEnableSelling);
		await this.selectByValue(selector.admin.dokan.dokanSetupWizard.commissionType, dokanSetupWizard.commissionType);
		await this.clearAndType(selector.admin.dokan.dokanSetupWizard.adminCommission, dokanSetupWizard.adminCommission);
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.orderStatusChange);
		await this.click(selector.admin.dokan.dokanSetupWizard.continue);
		// await this.click(selector.admin.dokan.dokanSetupWizard.skipThisStep)
		// Withdraw
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.payPal);
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.bankTransfer);
		// await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.wirecard)
		// await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.stripe)
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.custom);
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.skrill);
		await this.clearAndType(selector.admin.dokan.dokanSetupWizard.minimumWithdrawLimit, dokanSetupWizard.minimumWithdrawLimit);
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.orderStatusForWithdrawCompleted);
		await this.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.orderStatusForWithdrawProcessing);
		await this.click(selector.admin.dokan.dokanSetupWizard.continue);
		// Recommended
		await this.disableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.wooCommerceConversionTracking);
		await this.disableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.weMail);
		await this.disableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.texty);
		await this.click(selector.admin.dokan.dokanSetupWizard.continueRecommended);
		// Ready!
		await this.click(selector.admin.dokan.dokanSetupWizard.visitDokanDashboard);

		await expect(this.page.locator(selector.admin.dokan.dashboard.dashboardText)).toBeVisible();
	}

	// Dokan Modules

	// Module Activation Check
	async checkActiveModules() {
		await this.hover(selector.admin.aDashboard.dokan);
		await this.click(selector.admin.dokan.menus.modules);

		await this.click(selector.admin.dokan.modules.pro.navTabs.inActive);

		const noModulesMessage = await this.isVisible(selector.admin.dokan.modules.pro.noModulesFound);
		if (noModulesMessage) {
			await expect(this.page.locator(selector.admin.dokan.modules.pro.noModulesFound)).toContainText(data.modules.noModuleMessage);
		} else {
			const inActiveModuleNames = await this.getMultipleElementTexts(selector.admin.dokan.modules.pro.moduleName);
			throw new Error('Inactive modules: ' + inActiveModuleNames);
		}
	}

	async setupWp() {
		await this.goto(data.subUrls.backend.setupWP);
		const alreadyInstalledIsVisible = await this.isVisible(selector.backend.alreadyInstalled);
		if (alreadyInstalledIsVisible) {
			return;
		}
		await this.clickAndWaitForNavigation(selector.backend.languageContinue);
		const letsGoIsVisible = await this.isVisible(selector.backend.letsGo);
		if (letsGoIsVisible) {
			await this.clickAndWaitForNavigation(selector.backend.letsGo);
			await this.fill(selector.backend.dbName, data.installWp.dbName);
			await this.fill(selector.backend.dbUserName, data.installWp.dbUserName);
			await this.fill(selector.backend.dbPassword, data.installWp.dbPassword);
			await this.fill(selector.backend.dbHost, data.installWp.dbHost);
			await this.fill(selector.backend.dbTablePrefix, data.installWp.dbTablePrefix);
			await this.clickAndWaitForNavigation(selector.backend.submit);
			await this.clickAndWaitForNavigation(selector.backend.runTheInstallation);
		} else {
			await this.fill(selector.backend.siteTitle, data.installWp.siteTitle);
			await this.fill(selector.backend.adminUserName, data.installWp.adminUserName);
			await this.fill(selector.backend.adminPassword, data.installWp.adminPassword);
			await this.fill(selector.backend.adminEmail, data.installWp.adminEmail);
			await this.clickAndWaitForNavigation(selector.backend.installWp);
			await this.clickAndWaitForNavigation(selector.backend.successLoginIn);
		}
	}


	// dokan notice
	async dokanNotice(){
		await this.goto(data.subUrls.backend.dokan.dokan);
		// dokan notice elements are visible
		await this.multipleElementVisible(selector.admin.dokan.notice);
	}

	// dokan pro features promo
	async dokanProFeaturesPromo(){
		// dokan promo banner
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);

		// promo banner elements are visible
		await this.multipleElementVisible(selector.admin.dokan.promoBanner);

		// dokan lite modules
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanLiteModules);

		// pro upgrade popup elements are visible
		await this.multipleElementVisible(selector.admin.dokan.modules.lite.popup);

		// module cards are visible
		await this.click(selector.admin.dokan.modules.lite.popup.closeDokanUpgradePopup);
		await expect(this.page.locator(selector.admin.dokan.modules.lite.moduleText)).toBeVisible();
		await expect(this.page.locator(selector.admin.dokan.modules.lite.moduleCard)).toHaveCount(27);

		// dokan pro features menu
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProFeatures);

		// dokan pro feature sections are visible
		await this.multipleElementVisible(selector.admin.dokan.proFeatures);

		// dokan settings pro advertisement
		await this.goToDokanSettings();

		// settings pro advertisement banner elements are visible
		await this.multipleElementVisible(selector.admin.dokan.settings.proAdvertisementBanner);
	}


	// admin dashboard

	// admin dashboard render properly
	async adminDashboardRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);

		// dashboard text is visible
		await expect(this.page.locator(selector.admin.dokan.dashboard.dashboardText)).toBeVisible();

		// header elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.header);

		// at a glance elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.atAGlance);

		// overview elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.overview);

		// dokan new update elements are visible
		await this.multipleElementVisible(selector.admin.dokan.dashboard.dokanNewUpdates);

		// Subscribe box elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { thankYouMessage, ...subscribeBox } = selector.admin.dokan.dashboard.subscribeBox;
		await this.multipleElementVisible(subscribeBox);

	}

	// at a glance value
	async dokanAtAGlanceValueAccuracy(atAGlanceValues:any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);
		const netSales = await this.getElementText(selector.admin.dokan.dashboard.atAGlance.netSalesThisMonth);
		const commissionEarned = await this.getElementText(selector.admin.dokan.dashboard.atAGlance.commissionEarned);

		expect(Number(netSales?.replace('$', ''))).toBe(Number(atAGlanceValues.sales.this_month));
		expect(Number(commissionEarned?.replace('$', ''))).toBe(Number(atAGlanceValues.earning.this_month));
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.signupThisMonth)).toContainText(atAGlanceValues.vendors.this_month + ' Vendor');
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.vendorAwaitingApproval)).toContainText(atAGlanceValues.vendors.inactive + ' Vendor');
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.productCreatedThisMonth)).toContainText(atAGlanceValues.products.this_month + ' Products');
		await expect(this.page.locator(selector.admin.dokan.dashboard.atAGlance.withdrawAwaitingApproval)).toContainText(atAGlanceValues.withdraw.pending + ' Withdrawals');

	}

	// add dokan news subscriber
	async addDokanNewsSubscriber(user:any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokan);

		await this.clearAndType(selector.admin.dokan.dashboard.subscribeBox.subscriberName, user.name());
		await this.clearAndType(selector.admin.dokan.dashboard.subscribeBox.subscriberEmail, user.email());
		await this.clickAndWaitForResponse(data.subUrls.backend.subscribe, selector.admin.dokan.dashboard.subscribeBox.subscribeButton);
		await expect(this.page.locator(selector.admin.dokan.dashboard.subscribeBox.thankYouMessage)).toContainText('Thank you for subscribing!');

	}

	/*************************************************************************************************/

	// withdraws

	// admin dashboard render properly
	async adminWithdrawsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWithdraw);

		// withdraw  text is visible
		await expect(this.page.locator(selector.admin.dokan.withdraw.withdrawText)).toBeVisible();

		// nav tabs elements are visible
		await this.multipleElementVisible(selector.admin.dokan.withdraw.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.withdraw.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, ...filters } = selector.admin.dokan.withdraw.filters;
		await this.multipleElementVisible(filters);

		// withdraw table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.withdraw.table);

	}

	// withdraw bulk action
	async withdrawBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWithdraw);

		await this.click(selector.admin.dokan.withdraw.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.withdraw.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.withdraws, selector.admin.dokan.withdraw.bulkActions.applyAction);
	}

	// filter withdraw
	async filterWithdraws(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWithdraw);

		await this.click(selector.admin.dokan.withdraw.filters.filterByVendor);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.withdraw.filters.filterInput, vendorName);
		await this.pressAndWaitForResponse(data.subUrls.backend.withdraws, data.key.enter);

	}

	// add note to withdraw request
	async addNoteWithdrawRequest(vendorName: string, note: string){
		await this.filterWithdraws(vendorName);

		await this.click(selector.admin.dokan.withdraw.withdrawAddNote(vendorName));
		await this.clearAndType(selector.admin.dokan.withdraw.addNote, note);
		await this.clickAndWaitForResponse(data.subUrls.backend.withdraws, selector.admin.dokan.withdraw.updateNote);

	}

	// add note to withdraw request
	async updateWithdrawRequest(vendorName: string, action: string){
		await this.filterWithdraws(vendorName);

		switch (action) {

		case 'approve' :
			await this.clickAndWaitForResponse(data.subUrls.backend.withdraws, selector.admin.dokan.withdraw.withdrawApprove(vendorName));
			break;

		case 'cancel' :
			await this.hover(selector.admin.dokan.withdraw.withdrawCell(vendorName));
			await this.clickAndWaitForResponse(data.subUrls.backend.withdraws, selector.admin.dokan.withdraw.withdrawCancel);
			break;

		case 'delete' :
			await this.clickAndAcceptAndWaitForResponse(data.subUrls.backend.withdraws, selector.admin.dokan.withdraw.withdrawDelete);
			break;

		default :
			break;
		}
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

	/*************************************************************************************************/

	// vendors

	async adminVendorsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		// vendor text is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorsText)).toBeVisible();

		// and new vendor  is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.addNewVendor)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.bulkActions);

		// search vendor input is visible
		await expect(this.page.locator(selector.admin.dokan.vendors.search)).toBeVisible();

		// vendor table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.vendors.table);
	}

	// search vendor
	async searchVendor(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		await this.clearInputField(selector.admin.dokan.vendors.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.search, vendorName);
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorCell(vendorName))).toBeVisible();

		// negative scenario //TODO: add this to all search also add flag to avoid this scenario
		// await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.search, vendorName + 'abcdefgh');
		// await expect(this.page.locator(selector.admin.dokan.vendors.noVendorsFound)).toBeVisible();

	}

	// vendor bulk action
	async vendorBulkAction(action: string){
		// await this.searchVendor(vendorName); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVendors);

		await this.click(selector.admin.dokan.vendors.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.vendors.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.bulkActions.applyAction);
	}

	// update vendor status
	async updateVendorStatus(vendorName: string){
		await this.searchVendor(vendorName);

		await this.clickAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.vendors.statusSlider(vendorName));
	}

	// edit vendor
	async editVendor(vendorName: string, ){
		await this.searchVendor(vendorName);

		await this.hover(selector.admin.dokan.vendors.vendorCell(vendorName));
		await this.clickAndWaitForNavigation(selector.admin.dokan.vendors.vendorEdit);

		if (vendorName){
			// store settings
			await this.clearAndType(selector.admin.users.dokanStoreName, vendorName );

			// vendor address
			await this.clearAndType(selector.admin.users.dokanStoreUrl, vendorName );
			await this.clearAndType(selector.admin.users.dokanAddress1, vendorName );
			await this.clearAndType(selector.admin.users.dokanAddress2, vendorName);
			await this.clearAndType(selector.admin.users.dokanCity, vendorName);
			await this.clearAndType(selector.admin.users.dokanPostcode, vendorName);
			await this.clearAndType(selector.admin.users.dokanStoreName, vendorName);
			await this.clearAndType(selector.admin.users.dokanStoreName, vendorName);
			await this.click(selector.admin.users.dokanCountry);
			await this.clearAndType(selector.admin.users.dokanCountryInput, vendorName);
			await this.press(data.key.enter);
			await this.click(selector.admin.users.dokanState);
			await this.clearAndType(selector.admin.users.dokanStateInput, vendorName);
			await this.press(data.key.enter);

			await this.clearAndType(selector.admin.users.dokanPhone, vendorName);

			// social options
			await this.clearAndType(selector.admin.users.dokanFacebook, vendorName);
			await this.clearAndType(selector.admin.users.dokanTwitter, vendorName);
			await this.clearAndType(selector.admin.users.dokanPinterest, vendorName);
			await this.clearAndType(selector.admin.users.dokanLinkedin, vendorName);
			await this.clearAndType(selector.admin.users.dokanInstagram, vendorName);
			await this.clearAndType(selector.admin.users.dokanFlicker, vendorName);

			// other settings
			await this.click(selector.admin.users.dokanSelling);
			await this.click(selector.admin.users.dokanPublishing);
			await this.click(selector.admin.users.dokanFeaturedVendor);
		} else {
			//TODO: pro vendor edit
		}
	}


	/*************************************************************************************************/

	// abuse reports

	async adminAbuseReportRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

		// abuse reports text is visible
		await expect(this.page.locator(selector.admin.dokan.abuseReports.abuseReportsText)).toBeVisible();

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.abuseReports.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, ...filters } = selector.admin.dokan.abuseReports.filters;
		await this.multipleElementVisible(filters);

		// abuse report table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.abuseReports.table);

	}

	// abuse report bulk action
	async abuseReportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

		await this.click(selector.admin.dokan.abuseReports.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.abuseReports.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.abuseReports, selector.admin.dokan.abuseReports.bulkActions.applyAction);
	}

	// filter abuse reports
	// async filterAbuseReports(vendorName){
	// 	await this.goIfNotThere(data.subUrls.backend.dokan.dokanAbuseReports);

	// 	await this.click(selector.admin.dokan.abuseReports.filters.filterByAbuseReason);
	// 	await this.typeAndWaitForResponse(data.subUrls.backend.abuseReports, selector.admin.dokan.withdraw.filters.filterByVendorInput, vendorName);
	// 	await this.pressAndWaitForResponse(data.subUrls.backend.abuseReports, data.key.enter);
	// }


	/*************************************************************************************************/








}
