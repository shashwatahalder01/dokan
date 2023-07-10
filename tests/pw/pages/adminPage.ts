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
			await this.toHaveClass(selector.admin.plugins.plugin(pluginSlug), plugins.activeClass);
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
		await this.toContainText(selector.admin.settings.updatedSuccessMessage, general.saveSuccessMessage);
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
		await this.toContainText(selector.admin.settings.updatedSuccessMessage, permalink.saveSuccessMessage);
	}

	// Tax

	// Admin Enable-Disable Tax
	async enableTax(enableTax = true) {
		await this.goToWooCommerceSettings();
		// Enable-Disable Tax
		enableTax ? await this.check(selector.admin.wooCommerce.settings.enableTaxes) : await this.uncheck(selector.admin.wooCommerce.settings.enableTaxes);
		await this.click(selector.admin.wooCommerce.settings.generalSaveChanges);
		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, data.tax.saveSuccessMessage);
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
		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, woocommerce.saveSuccessMessage);
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
		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, data.shipping.saveSuccessMessage);

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
		await this.toBeVisible(selector.admin.wooCommerce.settings.shippingMethodCell(shipping.shippingMethod));

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
		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, currency.saveSuccessMessage);

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
			await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, data.payment.currency.saveSuccessMessage );
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
		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, payment.saveSuccessMessage);
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

		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, payment.saveSuccessMessage);

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

		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, payment.saveSuccessMessage);
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

		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, payment.saveSuccessMessage);
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

		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, payment.saveSuccessMessage);

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

		await this.toContainText(selector.admin.wooCommerce.settings.updatedSuccessMessage, payment.saveSuccessMessage);
	}

	// admin add categories
	async addCategory(categoryName: string) {
		await this.goIfNotThere(data.subUrls.backend.wcAddNewCategories);

		// add new category
		await this.fill(selector.admin.products.category.name, categoryName);
		await this.fill(selector.admin.products.category.slug, categoryName);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.category.addNewCategory);
		await this.toBeVisible(selector.admin.products.category.categoryCell(categoryName));
	}

	// admin add attributes
	async addAttributes(attribute: any) {
		await this.goIfNotThere(data.subUrls.backend.wcAddNewAttributes);

		// add new attribute
		await this.fill(selector.admin.products.attribute.name, attribute.attributeName);
		await this.fill(selector.admin.products.attribute.slug, attribute.attributeName);
		await this.clickAndWaitForResponse(data.subUrls.backend.wcAddNewAttributes, selector.admin.products.attribute.addAttribute);
		await this.toBeVisible(selector.admin.products.attribute.attributeCell(attribute.attributeName));
		await this.clickAndWaitForResponse('wp-admin/edit-tags.php?taxonomy', selector.admin.products.attribute.configureTerms(attribute.attributeName));

		// add new term
		for (const attributeTerm of attribute.attributeTerms) {
			await this.fill(selector.admin.products.attribute.attributeTerm, attributeTerm);
			await this.fill(selector.admin.products.attribute.attributeTermSlug, attributeTerm);
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.attribute.addAttributeTerm);
			await this.toBeVisible(selector.admin.products.attribute.attributeTermCell(attributeTerm));
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
			await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
			break;

		case 'draft' :
			await this.click(selector.admin.products.product.saveDraft);
			await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.draftUpdateSuccessMessage);
			break;

		case 'pending' :
			await this.click(selector.admin.products.product.editStatus);
			await this.selectByValue(selector.admin.products.product.status, data.product.status.pending);
			await this.click(selector.admin.products.product.saveDraft);
			await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.pendingProductUpdateSuccessMessage);
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
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
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

		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
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

		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
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
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
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
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
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
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
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

		await this.toBeVisible(selector.admin.dokan.dashboard.dashboardText);
	}

	// Dokan Modules

	// Module Activation Check
	async checkActiveModules() {
		await this.hover(selector.admin.aDashboard.dokan);
		await this.click(selector.admin.dokan.menus.modules);

		await this.click(selector.admin.dokan.modules.pro.navTabs.inActive);

		const noModulesMessage = await this.isVisible(selector.admin.dokan.modules.pro.noModulesFound);
		if (noModulesMessage) {
			await this.toContainText(selector.admin.dokan.modules.pro.noModulesFound, data.modules.noModuleMessage);
		} else {
			const inActiveModuleNames = await this.getMultipleElementTexts(selector.admin.dokan.modules.pro.moduleName);
			throw new Error('Inactive modules: ' + inActiveModuleNames);
		}
	}


	// dokan notice


	// dokan notice
	async dokanPromotion(){
		await this.goto(data.subUrls.backend.dokan.dokan);
		// dokan promotion elements are visible
		const isPromotionVisible = await this.isVisible(selector.admin.dokan.promotion.promotion);
		if(isPromotionVisible){
			await this.multipleElementVisible(selector.admin.dokan.promotion);
		} else {
			console.log('No promotion is ongoing');
		}
	}

	// dokan notice
	async dokanNotice(){
		await this.goto(data.subUrls.backend.dokan.dokan);

		await this.toHaveCount(selector.admin.dokan.notice.noticeDiv, 2); // because of promo notice

		// dokan notice elements are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// const { noticeDiv, ...notice } = selector.admin.dokan.notice; // TODO: conflicting locator if promo notice exists
		// await this.multipleElementVisible(notice);
	}

}
