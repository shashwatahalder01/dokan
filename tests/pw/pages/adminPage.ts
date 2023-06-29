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

	// store reviews bulk action
	async storeReviewsBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);

		await this.click(selector.admin.dokan.storeReviews.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.storeReviews.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.bulkActions.applyAction);
	}

	// filter store reviews
	async filterStoreReviews(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreReviews);

		await this.clickIfVisible(selector.admin.dokan.storeReviews.filters.filterClear);

		//filter by vendor
		await this.click(selector.admin.dokan.storeReviews.filters.filterByVendor);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.storeReviews.filters.filterInput, vendorName);
		await this.pressAndWaitForResponse(data.subUrls.backend.storeReviews, data.key.enter);
	}

	// edit store review
	async editStoreReview(review: any){
		await this.filterStoreReviews(review.filter.byVendor);

		await this.hover(selector.admin.dokan.storeReviews.storeReviewCell(review.create.title));
		await this.click(selector.admin.dokan.storeReviews.storeReviewEdit);

		await this.click(selector.admin.dokan.storeReviews.editReview.rating(review.update.rating));
		await this.clearAndType(selector.admin.dokan.storeReviews.editReview.title, review.update.title );
		await this.clearAndType(selector.admin.dokan.storeReviews.editReview.content, review.update.content );

		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.editReview.update);
	}

	// edit store review
	async deleteStoreReview(review: any){
		await this.filterStoreReviews(review.filter.byVendor);

		await this.hover(selector.admin.dokan.storeReviews.storeReviewCell(review.update.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.storeReviews, selector.admin.dokan.storeReviews.storeReviewDelete);
	}

	/*************************************************************************************************/

	// store support

	async adminStoreSupportRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		// store support text is visible
		await expect(this.page.locator(selector.admin.dokan.storeSupport.storeSupportText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.storeSupport.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.storeSupport.bulkActions);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterInput, ...filters } = selector.admin.dokan.storeSupport.filters;
		await this.multipleElementVisible(filters);

		// search store support is visible
		await expect(this.page.locator(selector.admin.dokan.storeSupport.searchTicket)).toBeVisible();

		// store support table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.storeSupport.table);
	}

	// search support ticket
	async searchSupportTicket(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.clearInputField(selector.admin.dokan.storeSupport.searchTicket); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.supportTicket, selector.admin.dokan.storeSupport.searchTicket, vendorName);
		await expect(this.page.locator(selector.admin.dokan.vendors.vendorCell(vendorName))).toBeVisible();
	}

	// store support bulk action
	async storeSupportBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		await this.click(selector.admin.dokan.storeSupport.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.storeSupport.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.supportTicket, selector.admin.dokan.storeSupport.bulkActions.applyAction);
	}

	// filter store supports
	async filterStoreSupports(vendorName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanStoreSupport);

		// await this.clickIfVisible(selector.admin.dokan.storeReviews.filters.filterClear);
		//TODO: multiple filter exists
		//filter by vendor
		await this.click(selector.admin.dokan.storeReviews.filters.filterByVendor);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.storeReviews.filters.filterInput, vendorName);
		await this.pressAndWaitForResponse(data.subUrls.backend.storeReviews, data.key.enter);
	}
	/*************************************************************************************************/

	// request for quote

	// quote rules

	async adminQuoteRulesRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		// request for quote menus are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.menus);

		// quote rules text is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesText)).toBeVisible();

		// new quote rules is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quoteRules.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quoteRules.bulkActions);

		// quote rules elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quoteRules.table);
	}


	async updateQuoteRuleFields(rule: any){
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.ruleTitle, rule.title);
		await this.check(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.applyQuoteFor(rule.userRole));

		// products
		await this.click(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.applyOnAllProducts);
		// await this.click(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.selectProductsDropDown);
		// await this.typeAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.selectProductsInput, rule.product);
		// await this.press(data.key.enter);

		// category
		// await this.check(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.selectCategories(rule.category));

		await this.selectByValue(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.hidePrice, rule.hidePrice);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.hidePriceText, rule.hidePriceText);
		await this.selectByValue(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.hideAddToCartButton, rule.hideAddToCartButton);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.customButtonLabel, rule.customButtonLabel);

		// priority
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.priorityOrder, rule.order);

		// publish
		await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.addNewQuoteRule.publishRule);
		// await this.wait(5);

	}

	// add quote rule
	async addQuoteRule(rule: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		// await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule);

		// TODO: need to wait for multiple response
		// // const qrs: string[][] = [[data.subUrls.backend.quotes, '200'], [data.subUrls.backend.products, '200']];
		// const qrs: string[][] = [[data.subUrls.backend.quotes, '200']];
		// await this.clickAndWaitForResponses(qrs, selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule);
		await Promise.all([
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.quotes) && resp.status() === 200),
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.products) && resp.status() === 200),
			this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.newQuoteRule).click()
		]);

		await this.updateQuoteRuleFields(rule);
	}

	// edit quote rule
	async editQuoteRule(rule: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesCell(rule.title));
		// TODO: need to wait for multiple response
		// await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesEdit(rule.title));
		await Promise.all([
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.quotes) && resp.status() === 200),
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.products) && resp.status() === 200),
			this.page.locator(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesEdit(rule.title)).click()
		]);

		await this.updateQuoteRuleFields(rule);

	}

	// update quote rule
	async updateQuoteRule(quoteTitle: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		switch (action) {

		case 'trash' :
			await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesTrash(quoteTitle));
			break;

		case 'permanently-delete' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.trashedQuoteRulesCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesPermanentlyDelete(quoteTitle));
			break;

		case 'restore' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quoteRules.trashedQuoteRulesCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.quoteRulesRestore(quoteTitle));
			break;

		default :
			break;
		}

	}

	// quote rules bulk action
	async quoteRulesBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuoteRules);

		await this.click(selector.admin.dokan.requestForQuotation.quoteRules.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.requestForQuotation.quoteRules.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.quoteRules, selector.admin.dokan.requestForQuotation.quoteRules.bulkActions.applyAction);
	}


	// quotes

	async adminQuotesRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		// request for quote menus are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.menus);

		// quotes text is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quotesList.quotesText)).toBeVisible();

		// new quote is visible
		await expect(this.page.locator(selector.admin.dokan.requestForQuotation.quotesList.newQuote)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quotesList.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quotesList.bulkActions);

		// quotes table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.requestForQuotation.quotesList.table);
	}

	async updateQuoteFields(quote: any, action = 'create'){

		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteTitle, quote.title);

		// customer information
		await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteUserDropDown);
		await this.typeAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteUserInput, quote.user);
		await this.press(data.key.enter);
		// await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.fullName, quote.fullName);
		// await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.email, quote.email);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.companyName, quote.companyName);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.phoneNumber, quote.phoneNumber);

		// quote product
		if (action === 'create'){
			await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.addProducts);

			await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteProductDropDown);
			await this.typeAndWaitForResponse(data.subUrls.backend.products, selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteProductInput, quote.product);
			await this.press(data.key.enter);

			await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.quoteProductQuantity, quote.quantity);
			await this.click(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.addToQuote);
		}

		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.offerPrice, quote.offerPrice);
		await this.clearAndType(selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.offerProductQuantity, quote.offerProductQuantity);

		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.addNewQuote.publishQuote);

	}

	// add quote
	async addQuote(quote: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.click(selector.admin.dokan.requestForQuotation.quotesList.newQuote);
		await this.updateQuoteFields(quote, 'create');
	}

	// add quote
	async editQuote(quote: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quote.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteEdit(quote.title));
		await this.updateQuoteFields(quote, 'update');
	}


	// update quote
	async updateQuote(quoteTitle: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		switch (action) {

		case 'trash' :
			await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteTrash(quoteTitle));
			break;

		case 'permanently-delete' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quotePermanentlyDelete(quoteTitle));
			break;

		case 'restore' :
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.navTabs.trash);
			await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quoteTitle));
			await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteRestore(quoteTitle));
			break;

		default :
			break;
		}

	}


	// convert quote to order
	async convertQuoteToOrder(quote: any){
		await this.addQuote(quote);

		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.hover(selector.admin.dokan.requestForQuotation.quotesList.quoteCell(quote.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.quoteEdit(quote.title));
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.convertToOrder);

	}


	// quotes bulk action
	async quotesBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRequestForQuote);

		await this.click(selector.admin.dokan.requestForQuotation.quotesList.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.requestForQuotation.quotesList.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.quotes, selector.admin.dokan.requestForQuotation.quotesList.bulkActions.applyAction);
	}


	/*************************************************************************************************/

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
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanSellerBadge);

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


	/*************************************************************************************************/


	// announcements

	async adminAnnouncementsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		// announcement text is visible
		await expect(this.page.locator(selector.admin.dokan.announcements.announcementText)).toBeVisible();

		// and announcement is visible
		await expect(this.page.locator(selector.admin.dokan.announcements.addNewAnnouncement)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.announcements.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.announcements.bulkActions);

		// announcement table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.announcements.table);

	}

	// announcement bulk action
	async announcementBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.click(selector.admin.dokan.announcements.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.announcements.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.bulkActions.applyAction);
	}

	// add announcement
	async addAnnouncement(announcement: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.click(selector.admin.dokan.announcements.addNewAnnouncement);

		await this.clearAndType(selector.admin.dokan.announcements.addAnnouncement.title, announcement.title);
		await this.typeFrameSelector(selector.admin.dokan.announcements.addAnnouncement.contentIframe, selector.admin.dokan.announcements.addAnnouncement.contentHtmlBody, announcement.content);
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.addAnnouncement.publish);
		//TODO: add assertion
	}

	// edit announcement
	async editAnnouncement(announcement: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.hover(selector.admin.dokan.announcements.announcementCell(announcement.title));
		await this.click(selector.admin.dokan.announcements.announcementEdit);

		await this.typeFrameSelector(selector.admin.dokan.announcements.addAnnouncement.contentIframe, selector.admin.dokan.announcements.addAnnouncement.contentHtmlBody, announcement.content);
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.addAnnouncement.publish);
		//TODO: add assertion
	}

	// delete announcement
	async deleteAnnouncement(announcementTitle: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAnnouncements);

		await this.hover(selector.admin.dokan.announcements.announcementCell(announcementTitle));
		await this.clickAndWaitForResponse(data.subUrls.backend.announcements, selector.admin.dokan.announcements.announcementDelete);
	}

	/*************************************************************************************************/

	// reports

	async adminReportsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanReports);

		// report Menus are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.menus);

		// filter Menus are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.reports.filterMenus);

		// calender from input is visible
		await expect(this.page.locator(selector.admin.dokan.reports.reports.dateFrom)).toBeVisible();

		// calender from input is visible
		await expect(this.page.locator(selector.admin.dokan.reports.reports.dateTo)).toBeVisible();

		// show button is visible
		await expect(this.page.locator(selector.admin.dokan.reports.reports.show)).toBeVisible();

		// at a glance elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.reports.atAGlance);

		// overview elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.reports.overview);

	}

	// all logs

	async adminAllLogsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		// report Menus are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.menus);

		// filter elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { filterByStoreInput, filterByStatusInput, ...filters } = selector.admin.dokan.reports.allLogs.filters;
		await this.multipleElementVisible(filters);

		// search is visible
		await expect(this.page.locator(selector.admin.dokan.reports.allLogs.search)).toBeVisible();

		// export log is visible
		await expect(this.page.locator(selector.admin.dokan.reports.allLogs.exportLogs)).toBeVisible();

		// all logs table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.reports.allLogs.table);

	}

	// search all logs
	async searchAllLogs(orderId: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		await this.clearInputField(selector.admin.dokan.reports.allLogs.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary
		await this.typeAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.search, orderId);
		await expect(this.page.locator(selector.admin.dokan.reports.allLogs.orderIdCell(orderId))).toBeVisible();
		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.filters.clear);

	}

	// export all logs
	async exportAllLogs(orderId: string){
		await this.searchAllLogs(orderId);
		// await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);
		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.exportLogs);
		// await this.page.waitForResponse((resp) => resp.url().includes('wp-admin/admin.php?download-order-log-csv') && resp.status() === 200); //TODO: MERGE WITH PREVIOUS
		// TODO: need to wait for multiple response
		await Promise.all([
			this.page.waitForResponse((resp) => resp.url().includes(data.subUrls.backend.logs) && resp.status() === 200),
			this.page.waitForResponse((resp) => resp.url().includes('wp-admin/admin.php?download-order-log-csv') && resp.status() === 200),
			this.page.locator(selector.admin.dokan.reports.allLogs.exportLogs).click()
		]);

		//TODO: add wait for multiple different response on base-page
		//TODO: might fail on CI, need to accept downloads
	}

	// filter all logs by store
	async filterAllLogsByStore(storeName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		await this.click(selector.admin.dokan.reports.allLogs.filters.filterByStore);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.reports.allLogs.filters.filterByStoreInput, storeName);
		await this.pressAndWaitForResponse(data.subUrls.backend.logs, data.key.enter);

		const count = (await this.getElementText(selector.admin.dokan.reports.allLogs.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.filters.clear);
	}

	// filter all logs by status
	async filterAllLogsByStatus(orderStatus: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanAllLogs);

		await this.click(selector.admin.dokan.reports.allLogs.filters.filterByStatus);
		await this.clearAndType( selector.admin.dokan.reports.allLogs.filters.filterByStatusInput, orderStatus);
		await this.pressAndWaitForResponse(data.subUrls.backend.logs, data.key.enter);

		const count = (await this.getElementText(selector.admin.dokan.reports.allLogs.numberOfRowsFound))?.split(' ')[0];
		expect(Number(count)).not.toBe(0);

		// await this.clickAndWaitForResponse(data.subUrls.backend.logs, selector.admin.dokan.reports.allLogs.filters.clear);
	}


	/*************************************************************************************************/


	// refunds

	async adminRefundRequestsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRefunds);

		// refund request text is visible
		await expect(this.page.locator(selector.admin.dokan.refunds.refundRequestsText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.refunds.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.refunds.bulkActions);

		// refund request search is visible
		await expect(this.page.locator(selector.admin.dokan.refunds.search)).toBeVisible();

		// refund table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.refunds.table);

	}

	// search refund request
	async searchRefundRequests(orderOrStore: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRefunds);

		await this.clearInputField(selector.admin.dokan.refunds.search); // TODO: clear by cross, or use type instead of fill

		await this.typeAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.search, String(orderOrStore));
		if (typeof(orderOrStore) != 'number'){
			const count = (await this.getElementText(selector.admin.dokan.refunds.numberOfRowsFound))?.split(' ')[0];
			expect(Number(count)).not.toBe(0);
		} else {
			await expect(this.page.locator(selector.admin.dokan.refunds.refundCell(orderOrStore))).toBeVisible();
		}
	}

	// update refund request
	async updateRefundRequests(orderNumber: any, action: string){
		await this.searchRefundRequests(orderNumber);

		await this.hover(selector.admin.dokan.refunds.refundCell(orderNumber));
		switch (action) {

		case 'approve' :
			await this.clickAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.approveRefund(orderNumber));
			break;

		case 'reject' :
			await this.clickAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.cancelRefund(orderNumber));
			break;

		default :
			break;
		}

	}

	// refund request bulk action
	async refundRequestsBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanRefunds);

		await this.click(selector.admin.dokan.refunds.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.refunds.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.refunds, selector.admin.dokan.refunds.bulkActions.applyAction);
	}

	/*************************************************************************************************/

	// modules

	async adminModulesRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);

		// modules text is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleText)).toBeVisible();

		// module plan elements are visible
		await this.multipleElementVisible(selector.admin.dokan.modules.pro.modulePlan);

		// navTab elements are visible
		await this.multipleElementVisible(selector.admin.dokan.modules.pro.navTabs);

		// module filter  is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleFilter)).toBeVisible();

		// modules search is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.searchBox)).toBeVisible();

		// modules view mode switcher is visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleViewMode)).toBeVisible();

		// module cards and card details are visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCard)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleIcon)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCheckbox)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleName)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleDescription)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleActivationSwitch)).toHaveCount(39);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleDocs)).toHaveCount(38);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleVideos)).toHaveCount(17);

		// module category tags are visible
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Product Management'))).toHaveCount(13);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Integration'))).toHaveCount(6);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('UI & UX'))).toHaveCount(2);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Shipping'))).toHaveCount(3);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Store Management'))).toHaveCount(10);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Payment'))).toHaveCount(7);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Order Management'))).toHaveCount(2);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCategoryTag('Vendor Management'))).toHaveCount(1);

	}

	// search module
	async searchModule(moduleName: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);
		await this.clickIfVisible(selector.admin.dokan.modules.pro.clearFilter); //TODO: why clear filer

		await this.clearAndType(selector.admin.dokan.modules.pro.searchBox, moduleName);
		await expect(this.page.locator(selector.admin.dokan.modules.pro.moduleCardByName(moduleName))).toBeVisible();

	}

	// filter modules
	async filterModules(category: string){
		await this.goto(data.subUrls.backend.dokan.dokanModules);

		await this.hover(selector.admin.dokan.modules.pro.moduleFilter);
		await this.click(selector.admin.dokan.modules.pro.moduleFilterCheckBox(category));
		const numOfModules = await this.countLocator(selector.admin.dokan.modules.pro.moduleCard);
		const numOfCategoryTag = await this.countLocator(selector.admin.dokan.modules.pro.moduleCategoryTag(category));
		expect(numOfModules).toBe(numOfCategoryTag);
	}

	// activate deactivate module
	async activateDeactivateModule(moduleName: string){
		await this.searchModule(moduleName);
		await this.clickAndWaitForResponse(data.subUrls.backend.modules, selector.admin.dokan.modules.pro.moduleActivationSwitch);
	}

	// modules bulk action
	async moduleBulkAction(action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);

		await this.click(selector.admin.dokan.modules.pro.firstModuleCheckbox);
		await this.click(selector.admin.dokan.modules.pro.selectAllBulkAction);
		switch (action) {

		case 'activate' :
			await this.clickAndWaitForResponse(data.subUrls.backend.modules, selector.admin.dokan.modules.pro.activeAll);
			break;

		case 'deactivate' :
			await this.clickAndWaitForResponse(data.subUrls.backend.modules, selector.admin.dokan.modules.pro.deActivateAll);
			break;

		default :
			break;
		}

	}

	// module view layout
	async moduleViewLayout(style: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanModules);

		const currentStyle = await this.getClassValue(selector.admin.dokan.modules.pro.currentLayout);

		if(!(currentStyle?.includes(style))){
			await this.click(selector.admin.dokan.modules.pro.moduleViewMode);
			await expect(this.page.locator(selector.admin.dokan.modules.pro.currentLayout)).toHaveClass(style);
		}

	}

	/*************************************************************************************************/

	// verification requests

	async adminVerificationsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVerifications);

		// tools text is visible
		await expect(this.page.locator(selector.admin.dokan.verifications.verificationRequestsText)).toBeVisible();

		// navTab elements are visible
		await this.multipleElementVisible(selector.admin.dokan.verifications.navTabs);

		// verification table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.verifications.table);
	}

	// ID verification requests
	async idVerificationRequest(storeName: string, action: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVerifications);

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
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVerifications);

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
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanVerifications);

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


	/*************************************************************************************************/

	// product advertising

	async adminProductAdvertisingRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		// product advertising text is visible
		await expect(this.page.locator(selector.admin.dokan.productAdvertising.productAdvertisingText)).toBeVisible();

		// add new Advertisement is visible
		await expect(this.page.locator(selector.admin.dokan.productAdvertising.addNewProductAdvertising)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.productAdvertising.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.productAdvertising.bulkActions);

		// filter elements are visible
		// await this.multipleElementVisible(selector.admin.dokan.productAdvertising.filters);

		// product advertising search is visible
		await expect(this.page.locator(selector.admin.dokan.productAdvertising.search)).toBeVisible();

		// product advertising table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.productAdvertising.table);
	}

	// add new product advertisement
	async addNewProductAdvertisement(advertising: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		await this.click(selector.admin.dokan.productAdvertising.addNewProductAdvertising);

		await this.click(selector.admin.dokan.productAdvertising.addNewAdvertisement.selectStoreDropdown);
		await this.typeAndWaitForResponse(data.subUrls.backend.stores, selector.admin.dokan.productAdvertising.addNewAdvertisement.selectStoreInput, advertising.advertisedProductStore);
		await this.press(data.key.enter);

		await this.click(selector.admin.dokan.productAdvertising.addNewAdvertisement.selectProductDropdown);
		await this.typeAndWaitForResponse(data.subUrls.backend.products, selector.admin.dokan.productAdvertising.addNewAdvertisement.selectProductInput, advertising.advertisedProduct);
		await this.press(data.key.enter);

		await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.addNewAdvertisement.addNew);
		await this.click(selector.admin.dokan.productAdvertising.actionSuccessful);
		await this.click(selector.admin.dokan.productAdvertising.addNewAdvertisement.closeModal);
	}

	// search advertised product
	async searchAdvertisedProduct(productOrOrder: string | number){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		await this.clearInputField(selector.admin.dokan.productAdvertising.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.search, String(productOrOrder));
		if (typeof(productOrOrder) != 'number'){
			await expect(this.page.locator(selector.admin.dokan.productAdvertising.advertisedProductCell(productOrOrder))).toBeVisible();
		} else {
			await expect(this.page.locator(selector.admin.dokan.productAdvertising.advertisedProductOrderIdCell(productOrOrder))).toBeVisible();
		}
	}

	// search advertised product
	async updateAdvertisedProduct(productName: string, action: string){
		await this.searchAdvertisedProduct(productName);

		await this.hover(selector.admin.dokan.productAdvertising.advertisedProductCell(productName));
		switch (action) {

		case 'expire' :
			await this.click(selector.admin.dokan.productAdvertising.advertisedProductExpire);
			break;

		case 'delete' :
			await this.click(selector.admin.dokan.productAdvertising.advertisedProductDelete);
			break;

		default :
			break;
		}

		await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.confirmAction);
		await this.click(selector.admin.dokan.productAdvertising.actionSuccessful);
	}

	// product advertising bulk action
	async productAdvertisingBulkAction(action: string){
		// await this.searchAdvertisedProduct(vendorName); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanProductAdvertising);

		await this.click(selector.admin.dokan.vendors.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.vendors.bulkActions.selectAction, action);
		await this.click(selector.admin.dokan.productAdvertising.bulkActions.applyAction);
		await this.clickAndWaitForResponse(data.subUrls.backend.productAdvertising, selector.admin.dokan.productAdvertising.confirmAction);
		await this.click(selector.admin.dokan.productAdvertising.actionSuccessful);
	}


	/*************************************************************************************************/

	// tools

	async adminToolsRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);

		// tools text is visible
		await expect(this.page.locator(selector.admin.dokan.tools.toolsText)).toBeVisible();

		// Page Installation elements are visible
		await this.multipleElementVisible(selector.admin.dokan.tools.pageInstallation);

		// Regenerate Order Sync Tab elements are visible
		await this.multipleElementVisible(selector.admin.dokan.tools.regenerateOrderSyncTable);

		// Check For Duplicate Orders are visible
		await this.multipleElementVisible(selector.admin.dokan.tools.checkForDuplicateOrders);

		// Dokan Setup Wizard elements are visible
		await this.multipleElementVisible(selector.admin.dokan.tools.dokanSetupWizard);

		// Regenerate Variable Product Variations Author Ids elements are visible elements are visible
		await this.multipleElementVisible(selector.admin.dokan.tools.regenerateVariableProductVariationsAuthorIds);

		//  Import Dummy Data elements are visible
		await this.multipleElementVisible(selector.admin.dokan.tools.importDummyData);

		//  Test Distance Matrix API (Google MAP) elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { enabledSuccess, ...testDistanceMatrixApi } = selector.admin.dokan.tools.testDistanceMatrixApi;
		await this.multipleElementVisible(testDistanceMatrixApi);

	}

	// dokan page installation
	async dokanPageInstallation(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);

		// all page created button should be disabled
		await this.hasClass(selector.admin.dokan.tools.pageInstallation.allPagesCreated, 'button-disabled');

		// await this.setAttributeValue(selector.admin.dokan.tools.pageInstallation.allPagesCreated, 'class',  'button button-primary');
		// await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.tools.pageInstallation.allPagesCreated);

	}

	// regenerate order sync table
	async regenerateOrderSyncTable(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.tools.regenerateOrderSyncTable.reBuild);
	}

	// check for duplicate order
	async checkForDuplicateOrders(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.tools.checkForDuplicateOrders.checkOrders);
	}

	// regenerate variable product variations author IDs
	async regenerateVariableProductVariationsAuthorIds(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.dokan.tools.regenerateVariableProductVariationsAuthorIds.regenerate);

	}

	// clear dummy data
	async clearDummyData(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);
		await this.clickAndWaitForResponse(data.subUrls.backend.dummyData, selector.admin.dokan.tools.importDummyData.import);

		await this.click(selector.admin.dokan.dummyData.clearDummyData);
		await this.clickAndWaitForResponse(data.subUrls.backend.dummyData, selector.admin.dokan.dummyData.confirmClearDummyData);
	}

	// import dummy data
	async importDummyData(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);
		await this.clickAndWaitForResponse(data.subUrls.backend.dummyData, selector.admin.dokan.tools.importDummyData.import);
		// await this.clickAndWaitForResponse(data.subUrls.backend.dummyData, selector.admin.dokan.dummyData.runTheImporter);
		const subUrls = [[data.subUrls.backend.dummyData], [data.subUrls.backend.dummyData], [data.subUrls.backend.dummyData], [data.subUrls.backend.dummyData], [data.subUrls.backend.dummyData]];
		await this.clickAndWaitForResponses(subUrls, selector.admin.dokan.dummyData.runTheImporter);
		// await expect(this.page.locator(selector.admin.dokan.dummyData.importComplete)).toBeVisible();
	}

	// test distance matrix API
	async testDistanceMatrixApi(address: any){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanTools);

		await this.clearAndType(selector.admin.dokan.tools.testDistanceMatrixApi.address1, address.address3);
		await this.clearAndType(selector.admin.dokan.tools.testDistanceMatrixApi.address2, address.address4);
		await this.click(selector.admin.dokan.tools.testDistanceMatrixApi.getDistance);

	}


	/*************************************************************************************************/

	// wholesale customers
	async adminWholesaleCustomersRenderProperly(){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		// wholesale customer text is visible
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerText)).toBeVisible();

		// nav tabs are visible
		await this.multipleElementVisible(selector.admin.dokan.wholesaleCustomer.navTabs);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.admin.dokan.wholesaleCustomer.bulkActions);

		// search wholesale customer input is visible
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.search)).toBeVisible();

		// wholesale customer table elements are visible
		await this.multipleElementVisible(selector.admin.dokan.wholesaleCustomer.table);

	}

	// search wholesale customer
	async searchWholesaleCustomer(wholesaleCustomer: string){
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		await this.clearInputField(selector.admin.dokan.wholesaleCustomer.search); // TODO: clear by cross, or use type instead of fill  //TODO: is it necessary

		await this.typeAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.search, wholesaleCustomer);
		await expect(this.page.locator(selector.admin.dokan.wholesaleCustomer.wholesaleCustomerCell(wholesaleCustomer))).toBeVisible();
	}

	// vendor bulk action
	async wholesaleCustomerBulkAction(action: string){
		// await this.searchWholesaleCustomer(wholesaleCustomer); //TODO: can be used to minimized number of rows to be affected
		await this.goIfNotThere(data.subUrls.backend.dokan.dokanWholeSaleCustomer);

		await this.click(selector.admin.dokan.wholesaleCustomer.bulkActions.selectAll);
		await this.selectByValue(selector.admin.dokan.wholesaleCustomer.bulkActions.selectAction, action);
		await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.bulkActions.applyAction);
	}

	// update wholesale customer status
	async updateWholesaleCustomerStatus(wholesaleCustomer: string){
		//TODO: add choice and based on choice enable or disable status
		await this.searchWholesaleCustomer(wholesaleCustomer);

		await this.clickAndWaitForResponse(data.subUrls.backend.wholesaleCustomers, selector.admin.dokan.wholesaleCustomer.statusSlider(wholesaleCustomer));
	}


}
