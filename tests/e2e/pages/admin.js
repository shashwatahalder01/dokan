require('dotenv').config()
const base = require("../pages/base.js")
const selector = require("../pages/selectors.js")
const helpers = require("../../e2e/utils/helpers.js")
const { faker } = require('@faker-js/faker')

module.exports = {


  //-------------------------------------------------- navigation ---------------------------------------------------//

  //methods
  async goToAdminDashboard() {
    await base.goto('wp-admin/index.php')

    const url = await page.url()
    expect(url).toMatch('wp-admin/index.php')
  },

  async goToDokanSettings() {

    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.settingsMenu)

    const url = await page.url()
    expect(url).toMatch('wp-admin/admin.php?page=dokan#/settings')
  },

  async goToWooCommerceSettings() {

    await base.hover(selector.admin.aDashboard.wooCommerce)
    await base.clickAndWait(selector.admin.wooCommerce.settingsMenu)

    const url = await page.url()
    expect(url).toMatch('wp-admin/admin.php?page=wc-settings')
  },

  async goToPlugins() {

    await base.hover(selector.admin.aDashboard.plugins)
    await base.clickAndWait(selector.admin.plugins.installedPlugins)

    const url = await page.url()
    expect(url).toMatch('wp-admin/plugins.php')
  },


  //--------------------------------------------- wordpress site settings ------------------------------------------------//


  //admin logout
  async adminLogout() {
    await base.hover(selector.backend.userMenu)
    await base.clickAndWait(selector.backend.logout)

    let loggedInUser = await base.getCurrentUser()
    expect(loggedInUser).toBeUndefined()

    // let successMessage = await base.getElementText(selector.backend.logoutSuccessMessage)
    // expect(successMessage).toMatch("You are now logged out.")
  },



  //--------------------------------------------- wordpress site settings ------------------------------------------------//

  //plugin activation check
  async checkActivePlugins(PluginSlugList) {
    await this.goToPlugins()
    for (let pluginSlug of PluginSlugList) {
      let classValue = await base.getElementClassValue(selector.admin.plugins.plugin(pluginSlug))
      expect(classValue).toMatch('active')
    }
  },


  // admin set wordpress site settings
  async setWpSettings() {
    await this.setWpGeneralSettings()
    await this.setPermalinkSettings()

  },

  async setWpGeneralSettings() {
    await base.hover(selector.admin.aDashboard.settings)
    //set general settings
    await base.clickAndWait(selector.admin.settings.general)
    // enable user registration
    await base.check(selector.admin.settings.membership)
    //timezone
    await base.select(selector.admin.settings.timezone, 'UTC+6')
    await base.clickAndWait(selector.admin.settings.generalSaveChanges)

    let successMessage = await base.getElementText(selector.admin.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Settings saved.')
  },

  //admin set permalink settings
  async setPermalinkSettings() {
    await base.hover(selector.admin.aDashboard.settings)
    //set permalinks settings
    await base.clickAndWait(selector.admin.settings.permalinks)
    await base.click(selector.admin.settings.postName)
    await base.click(selector.admin.settings.customBase)
    await base.clearAndType(selector.admin.settings.customBaseInput, '/product/')
    await base.click(selector.admin.settings.permalinkSaveChanges)

    let permalinkSuccessMessage = await base.getElementText(selector.admin.settings.updatedSuccessMessage)
    expect(permalinkSuccessMessage).toMatch('Permalink structure updated.')

  },





  //----------------------------------------------- dokan settings ------------------------------------------------//



  //admin set dokan settings
  async setDokanSettings() {
    await this.goToDokanSettings()
    await this.setDokanGeneralSettings()
    await this.setDokanSellingSettings()
    await this.setDokanWithdrawSettings()
    await this.setPageSettings()
    await this.setDokanAppearanceSettings()
    await this.setDokanPrivacyPolicySettings()
    await this.setDokanStoreSupportSettings()
    await this.setDokanRmaSettings()
    await this.setDokanWholesaleSettings()
    await this.setDokanEuComplianceSettings()
    await this.setDokanDeliveryTimeSettings()
    await this.setDokanProductAdvertisingSettings()
    await this.setDokanGeolocationSettings()
    await this.setDokanProductReportAbuseSettings()
    await this.setDokanSpmvSettings()
    await this.setDokanVendorSubscriptionSettings()
  },

  //admin set dokan general settings
  async setDokanGeneralSettings() {
    await base.click(selector.admin.dokan.settings.general)

    //site options
    await base.enableSwitcher(selector.admin.dokan.settings.adminAreaAccess)
    await base.clearAndType(selector.admin.dokan.settings.vendorStoreUrl, 'store')
    await base.click(selector.admin.dokan.settings.sellingProductTypes('sell_both'))

    //vendor store options
    await base.enableSwitcher(selector.admin.dokan.settings.storeTermsAndConditions)
    await base.clearAndType(selector.admin.dokan.settings.storeProductPerPage, '12')
    await base.enableSwitcher(selector.admin.dokan.settings.enableTermsAndCondition)
    await base.click(selector.admin.dokan.settings.storCategory('none'))
    await base.click(selector.admin.dokan.settings.generalSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan selling settings
  async setDokanSellingSettings() {
    await base.click(selector.admin.dokan.settings.sellingOptions)

    //commission settings
    await base.select(selector.admin.dokan.settings.commissionType, 'percentage')
    await base.clearAndType(selector.admin.dokan.settings.adminCommission, '10')
    await base.click(selector.admin.dokan.settings.shippingFeeRecipient('seller'))
    await base.click(selector.admin.dokan.settings.taxFeeRecipient('seller'))


    //vendor capability
    await base.enableSwitcher(selector.admin.dokan.settings.newVendorProductUpload)
    await base.enableSwitcher(selector.admin.dokan.settings.orderStatusChange)
    await base.click(selector.admin.dokan.settings.newProductStatus('publish'))
    await base.enableSwitcher(selector.admin.dokan.settings.duplicateProduct)
    await base.enableSwitcher(selector.admin.dokan.settings.productMailNotification)
    await base.click(selector.admin.dokan.settings.productCategorySelection('single'))
    await base.enableSwitcher(selector.admin.dokan.settings.vendorsCanCreateTags)
    await base.enableSwitcher(selector.admin.dokan.settings.orderDiscount)
    await base.enableSwitcher(selector.admin.dokan.settings.productDiscount)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorProductReview)
    await base.enableSwitcher(selector.admin.dokan.settings.guestProductEnquiry)
    await base.enableSwitcher(selector.admin.dokan.settings.newVendorEnableAuction)
    await base.enableSwitcher(selector.admin.dokan.settings.enableMinMaxQuantities)
    await base.enableSwitcher(selector.admin.dokan.settings.enableMinMaxAmount)
    await base.clickAndWait(selector.admin.dokan.settings.sellingOptionsSaveChanges)

    // let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    // expect(successMessage).toMatch('Setting has been saved successfully.')

    let commission = await base.getElementValue(selector.admin.dokan.settings.adminCommission)//TODO: update assertion
    expect(commission).toMatch('10')
  },

  //admin set dokan withdraw settings
  async setDokanWithdrawSettings() {
    await base.click(selector.admin.dokan.settings.withdrawOptions)

    //withdraw options
    await base.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsPaypal)
    await base.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsBankTransfer)
    await base.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsDokanCustom)
    await base.enableSwitcher(selector.admin.dokan.settings.withdrawMethodsSkrill)
    await base.clearAndType(selector.admin.dokan.settings.customMethodName, 'Bksh')
    await base.clearAndType(selector.admin.dokan.settings.customMethodType, 'Phone')
    await base.clearAndType(selector.admin.dokan.settings.minimumWithdrawAmount, '5')
    await base.enableSwitcher(selector.admin.dokan.settings.orderStatusForWithdrawCompleted)
    await base.enableSwitcher(selector.admin.dokan.settings.orderStatusForWithdrawProcessing)
    await base.clearAndType(selector.admin.dokan.settings.withdrawThreshold, '0')

    //disbursement schedule settings
    await base.enableSwitcher(selector.admin.dokan.settings.withdrawDisbursementManual)
    await base.enableSwitcher(selector.admin.dokan.settings.withdrawDisbursementAuto)

    // disbursement schedule
    await base.enableSwitcher(selector.admin.dokan.settings.disburseMentQuarterlySchedule)
    await base.enableSwitcher(selector.admin.dokan.settings.disburseMentMonthlySchedule)
    await base.enableSwitcher(selector.admin.dokan.settings.disburseMentBiweeklySchedule)
    await base.enableSwitcher(selector.admin.dokan.settings.disburseMentWeeklySchedule)

    // quarterly schedule
    await base.select(selector.admin.dokan.settings.quarterlyScheduleMonth, 'march')
    await base.select(selector.admin.dokan.settings.quarterlyScheduleWeek, '1')
    await base.select(selector.admin.dokan.settings.quarterlyScheduleDay, 'monday')
    // monthly schedule
    await base.select(selector.admin.dokan.settings.monthlyScheduleWeek, '1')
    await base.select(selector.admin.dokan.settings.monthlyScheduleDay, 'monday')
    // biweekly schedule
    await base.select(selector.admin.dokan.settings.biweeklyScheduleWeek, '1')
    await base.select(selector.admin.dokan.settings.biweeklyScheduleDay, 'monday')
    // weekly schedule
    await base.select(selector.admin.dokan.settings.weeklyScheduleDay, 'monday')
    await base.click(selector.admin.dokan.settings.withdrawSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan page settings
  async setPageSettings() {
    await base.click(selector.admin.dokan.settings.pageSettings)

    //base settings
    await base.select(selector.admin.dokan.settings.termsAndConditionsPage, 'Sample Page')
    await base.click(selector.admin.dokan.settings.pageSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')

  },

  //admin set dokan appearance settings
  async setDokanAppearanceSettings() {
    await base.click(selector.admin.dokan.settings.appearance)

    //appearance settings
    await base.enableSwitcher(selector.admin.dokan.settings.showMapOnStorePage)
    await base.click(selector.admin.dokan.settings.mapApiSourceGoogleMaps)
    await base.clearAndType(selector.admin.dokan.settings.googleMapApiKey, process.env.GOOGLE_MAP_API_KEY)
    await base.click(selector.admin.dokan.settings.storeHeaderTemplate2)
    await base.click(selector.admin.dokan.settings.storeHeaderTemplate1)
    await base.clearAndType(selector.admin.dokan.settings.storeBannerWidth, '625')
    await base.clearAndType(selector.admin.dokan.settings.storeBannerHeight, '300')
    await base.enableSwitcher(selector.admin.dokan.settings.storeOpeningClosingTimeWidget)
    await base.enableSwitcher(selector.admin.dokan.settings.showVendorInfo)
    await base.clickAndWait(selector.admin.dokan.settings.appearanceSaveChanges)

    let apiKey = await base.getElementValue(selector.admin.dokan.settings.googleMapApiKey) //TODO: update assertion
    expect(apiKey).toMatch(process.env.GOOGLE_MAP_API_KEY)
  },

  //admin set dokan privacy policy settings
  async setDokanPrivacyPolicySettings() {
    await base.click(selector.admin.dokan.settings.privacyPolicy)

    //privacy policy settings
    await base.enableSwitcher(selector.admin.dokan.settings.enablePrivacyPolicy)
    await base.select(selector.admin.dokan.settings.privacyPage, '2')

    let iframe = await base.switchToIframe(selector.admin.dokan.settings.privacyPolicyIframe)
    await base.iframeClearAndType(iframe, selector.admin.dokan.settings.privacyPolicyHtmlBody, 'Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our [dokan_privacy_policy]')

    await base.click(selector.admin.dokan.settings.privacyPolicySaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan store support settings
  async setDokanStoreSupportSettings() {
    await base.click(selector.admin.dokan.settings.storeSupport)

    //store support settings
    await base.wait(0.5) //required
    await base.enableSwitcher(selector.admin.dokan.settings.displayOnOrderDetails)
    await base.select(selector.admin.dokan.settings.displayOnSingleProductPage, 'above_tab')
    await base.clearAndType(selector.admin.dokan.settings.supportButtonLabel, 'Get Support')
    await base.enableSwitcher(selector.admin.dokan.settings.supportTicketEmailNotification)
    await base.click(selector.admin.dokan.settings.storeSupportSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan rma settings
  async setDokanRmaSettings() {
    await base.click(selector.admin.dokan.settings.rma)

    //rma settings
    await base.select(selector.admin.dokan.settings.orderStatus, 'wc-processing')
    await base.enableSwitcher(selector.admin.dokan.settings.enableRefundRequests)
    await base.enableSwitcher(selector.admin.dokan.settings.enableCouponRequests)
    let rmaReasons = ['Defective', 'Wrong Product', 'Other']
    for (let rmaReason of rmaReasons) {
      await base.deleteIfExists(selector.admin.dokan.settings.reasonsForRmaSingle(rmaReason))
      await base.clearAndType(selector.admin.dokan.settings.reasonsForRmaInput, rmaReason)
      await base.click(selector.admin.dokan.settings.reasonsForRmaAdd)
    }

    let iframe = await base.switchToIframe(selector.admin.dokan.settings.refundPolicyIframe)
    await base.iframeClearAndType(iframe, selector.admin.dokan.settings.refundPolicyHtmlBody, 'Refund Policy')

    await base.click(selector.admin.dokan.settings.rmaSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  // admin set dokan wholesale settings
  async setDokanWholesaleSettings() {
    await base.click(selector.admin.dokan.settings.wholesale)

    //wholesale settings
    await base.click(selector.admin.dokan.settings.whoCanSeeWholesalePrice('all_user'))
    await base.enableSwitcher(selector.admin.dokan.settings.showWholesalePriceOnShopArchive)
    await base.enableSwitcher(selector.admin.dokan.settings.needApprovalForCustomer)
    await base.click(selector.admin.dokan.settings.wholesaleSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan eu compliance settings
  async setDokanEuComplianceSettings() {
    await base.click(selector.admin.dokan.settings.euComplianceFields)

    //eu compliance settings
    await base.wait(0.5)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsCompanyName)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsCompanyIdOrEuidNumber)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsVatOrTaxNumber)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsNameOfBank)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorExtraFieldsBankIban)
    await base.enableSwitcher(selector.admin.dokan.settings.displayInVendorRegistrationForm)
    await base.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsCompanyIdOrEuidNumber)
    await base.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsVatOrTaxNumber)
    await base.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsNameOfBank)
    await base.enableSwitcher(selector.admin.dokan.settings.customerExtraFieldsBankIban)
    await base.enableSwitcher(selector.admin.dokan.settings.enableGermanizedSupportForVendors)
    await base.enableSwitcher(selector.admin.dokan.settings.vendorsWillBeAbleToOverrideInvoiceNumber)
    await base.click(selector.admin.dokan.settings.euComplianceFieldsSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan delivery time settings
  async setDokanDeliveryTimeSettings() {
    await base.click(selector.admin.dokan.settings.deliveryTime)

    //delivery time settings
    await base.wait(0.5)
    await base.enableSwitcher(selector.admin.dokan.settings.allowVendorSettings)
    await base.clearAndType(selector.admin.dokan.settings.deliveryDateLabel, 'Delivery Date')
    await base.clearAndType(selector.admin.dokan.settings.deliveryBlockedBuffer, '0')
    await base.clearAndType(selector.admin.dokan.settings.deliveryBoxInfo, 'This store needs %DAY% day(s) to process your delivery request')
    await base.enableSwitcher(selector.admin.dokan.settings.requireDeliveryDateAndTime)
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Sunday'))
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Monday'))
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Tuesday'))
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Wednesday'))
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Thursday'))
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Friday'))
    await base.enableSwitcher(selector.admin.dokan.settings.deliveryDay('Saturday'))
    await base.clearAndType(selector.admin.dokan.settings.openingTime, '12:00 AM')
    await base.clearAndType(selector.admin.dokan.settings.closingTime, '11:30 PM')
    await base.clearAndType(selector.admin.dokan.settings.timeSlot, '30')
    await base.clearAndType(selector.admin.dokan.settings.orderPerSlot, '0')
    await base.click(selector.admin.dokan.settings.deliveryTimeSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan product advertising settings
  async setDokanProductAdvertisingSettings() {
    await base.click(selector.admin.dokan.settings.productAdvertising)

    //product advertising settings
    await base.clearAndType(selector.admin.dokan.settings.noOfAvailableSlot, '100')
    await base.clearAndType(selector.admin.dokan.settings.expireAfterDays, '10')
    await base.enableSwitcher(selector.admin.dokan.settings.vendorCanPurchaseAdvertisement)
    await base.clearAndType(selector.admin.dokan.settings.advertisementCostUsd, '15')
    await base.enableSwitcher(selector.admin.dokan.settings.enableAdvertisementInSubscription)
    await base.enableSwitcher(selector.admin.dokan.settings.markAdvertisedProductAsFeatured)
    await base.enableSwitcher(selector.admin.dokan.settings.displayAdvertisedProductOnTop)
    await base.enableSwitcher(selector.admin.dokan.settings.outOfStockVisibility)
    await base.click(selector.admin.dokan.settings.productAdvertisingSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan geolocation settings
  async setDokanGeolocationSettings() {
    await base.click(selector.admin.dokan.settings.geolocation)

    //geolocation settings
    await base.click(selector.admin.dokan.settings.locationMapPosition('top'))
    await base.click(selector.admin.dokan.settings.showMap('all'))
    await base.enableSwitcher(selector.admin.dokan.settings.showFiltersBeforeLocationMap)
    await base.enableSwitcher(selector.admin.dokan.settings.productLocationTab)
    await base.click(selector.admin.dokan.settings.radiusSearchUnit('km'))
    await base.clearAndType(selector.admin.dokan.settings.radiusSearchMinimumDistance, '0')
    await base.clearAndType(selector.admin.dokan.settings.radiusSearchMaximumDistance, '10')
    await base.clearAndType(selector.admin.dokan.settings.mapZoomLevel, '11')
    await base.clearAndType(selector.admin.dokan.settings.defaultLocation, 'New York')
    await base.wait(1)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await base.click(selector.admin.dokan.settings.geolocationSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan product report abuse settings
  async setDokanProductReportAbuseSettings() {
    await base.click(selector.admin.dokan.settings.productReportAbuse)

    //product report abuse settings
    await base.deleteIfExists(selector.admin.dokan.settings.reasonsForAbuseReportSingle('This product is fake'))
    await base.clearAndType(selector.admin.dokan.settings.reasonsForAbuseReportInput, 'This product is fake')
    await base.click(selector.admin.dokan.settings.reasonsForAbuseReportAdd)
    await base.click(selector.admin.dokan.settings.productReportAbuseSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan spmv settings
  async setDokanSpmvSettings() {
    await base.click(selector.admin.dokan.settings.singleProductMultiVendor)


    await base.enableSwitcher(selector.admin.dokan.settings.enableSingleProductMultipleVendor)
    await base.clearAndType(selector.admin.dokan.settings.sellItemButtonText, 'Sell This Item')
    await base.clearAndType(selector.admin.dokan.settings.availableVendorDisplayAreaTitle, 'Other Available Vendor')
    await base.select(selector.admin.dokan.settings.availableVendorSectionDisplayPosition, 'below_tabs')
    await base.select(selector.admin.dokan.settings.showSpmvProducts, 'show_all')
    await base.click(selector.admin.dokan.settings.singleProductMultiVendorSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },

  //admin set dokan vendor subscription settings
  async setDokanVendorSubscriptionSettings() {
    await base.click(selector.admin.dokan.settings.vendorSubscription)

    //vendor subscription settings
    await base.select(selector.admin.dokan.settings.subscription, '2')
    await base.enableSwitcher(selector.admin.dokan.settings.enableProductSubscription)
    await base.enableSwitcher(selector.admin.dokan.settings.enableSubscriptionInRegistrationForm)
    await base.enableSwitcher(selector.admin.dokan.settings.enableEmailNotification)
    await base.clearAndType(selector.admin.dokan.settings.noOfDays, '2')
    await base.select(selector.admin.dokan.settings.productStatus, 'draft')
    await base.clearAndType(selector.admin.dokan.settings.cancellingEmailSubject, 'Subscription Package Cancel notification')
    await base.clearAndType(selector.admin.dokan.settings.cancellingEmailBody, 'Dear subscriber, Your subscription has expired. Please renew your package to continue using it.')
    await base.clearAndType(selector.admin.dokan.settings.alertEmailSubject, 'Subscription Ending Soon')
    await base.clearAndType(selector.admin.dokan.settings.alertEmailBody, 'Dear subscriber, Your subscription will be ending soon. Please renew your package in a timely')
    await base.click(selector.admin.dokan.settings.vendorSubscriptionSaveChanges)

    let successMessage = await base.getElementText(selector.admin.dokan.settings.dokanUpdateSuccessMessage)
    expect(successMessage).toMatch('Setting has been saved successfully.')
  },



  //-------------------------------------------------- tax ----------------------------------------------------//


  //admin enable-disable tax
  async enableTax(enableTax = true) {
    await this.goToWooCommerceSettings()

    // enable tax
    enableTax ? await base.check(selector.admin.wooCommerce.settings.enableTaxes) : await base.uncheck(selector.admin.wooCommerce.settings.enableTaxes)
    await base.clickAndWait(selector.admin.wooCommerce.settings.generalSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')
  },

  //admin add standard tax rate
  async addStandardTaxRate() {
    await this.goToWooCommerceSettings()

    //enable tax
    await this.enableTax(true)

    // set tax rate
    await base.clickAndWait(selector.admin.wooCommerce.settings.tax)
    await base.clickAndWait(selector.admin.wooCommerce.settings.standardRates)
    let taxIsVisible = await base.isVisible(selector.admin.wooCommerce.settings.taxRate)
    if (!taxIsVisible) {
      await base.click(selector.admin.wooCommerce.settings.insertRow)
    }
    await base.clearAndType(selector.admin.wooCommerce.settings.taxRate, '5')
    await base.click(selector.admin.wooCommerce.settings.taxTable) //TODO: recheck if it required
    await base.wait(1)
    await base.click(selector.admin.wooCommerce.settings.taxRateSaveChanges)
    await base.wait(3)

    let newTaxRate = await base.getElementValue(selector.admin.wooCommerce.settings.taxRate)
    expect(newTaxRate).toBe('5.0000')


  },


  //----------------------------------------------- woocommerce settings ------------------------------------------------//



  //admin setup wooCommerce settings
  async setWoocommerceSettings() {
    await this.enablePasswordInputField()
    await this.addStandardTaxRate()
    await this.setCurrencyOptions()
    await this.addShippingMethod('US', 'country:US', 'flat_rate', 'Flat rate')
    // await this.addShippingMethod('US', 'country:US', 'free_shipping', 'Free shipping')
    // await this.addShippingMethod('US', 'country:US', 'local_pickup', 'Local pickup')
    // await this.addShippingMethod('US', 'country:US', 'dokan_table_rate_shipping', 'Vendor Table Rate')
    // await this.addShippingMethod('US', 'country:US', 'dokan_distance_rate_shipping', 'Vendor Distance Rate')
    // await this.addShippingMethod('US', 'country:US', 'dokan_vendor_shipping', 'Vendor Shipping')
    // // await this.deleteShippingMethod('US', 'Flat rate')
    // // await this.deleteShippingZone('US')
  },


  //enable password field
  async enablePasswordInputField() {
    await this.goToWooCommerceSettings()
    await base.clickAndWait(selector.admin.wooCommerce.settings.accounts)
    await base.uncheck(selector.admin.wooCommerce.settings.automaticPasswordGeneration)
    await base.clickAndWait(selector.admin.wooCommerce.settings.accountSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')

  },


  //----------------------------------------------- shipping methods ------------------------------------------------//

  //enable enable-disable shipping 

  async enableShipping(enableShipping = true) {

    await this.goToWooCommerceSettings()
    await base.click(selector.admin.wooCommerce.settings.enableShipping)
    if (enableShipping) {
      await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.enableShippingValues, 'Ship to all countries you sell to')
    } else {
      await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.enableShippingValues, 'Disable shipping & shipping calculations')
    }
    await base.clickAndWait(selector.admin.wooCommerce.settings.generalSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')

  },


  // admin add shipping method
  async addShippingMethod(shippingZone, shippingCountry, selectShippingMethod, shippingMethod) {
    await this.goToWooCommerceSettings()
    await base.clickAndWait(selector.admin.wooCommerce.settings.shipping)
    // await base.wait(2)

    let zoneIsVisible = await base.isVisible(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone))
    if (!zoneIsVisible) {
      //add shipping zone
      await base.clickAndWait(selector.admin.wooCommerce.settings.addShippingZone)
      await base.clearAndType(selector.admin.wooCommerce.settings.zoneName, shippingZone)
      // await base.select(selector.admin.wooCommerce.settings.zoneRegions, shippingCountry)
      await base.click(selector.admin.wooCommerce.settings.zoneRegions)
      await base.type(selector.admin.wooCommerce.settings.zoneRegions, 'United States (US)')
      await base.wait(2)
      await page.keyboard.press('Enter')
    } else {
      // edit shipping zone
      await base.hover(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone))
      await base.clickAndWait(selector.admin.wooCommerce.settings.editShippingMethod(shippingZone))
    }

    let methodIsVisible = await base.isVisible(selector.admin.wooCommerce.settings.shippingMethodCell(helpers.replaceAndCapitalize(shippingMethod)))
    if (!methodIsVisible) {
      // add shipping method
      await base.click(selector.admin.wooCommerce.settings.addShippingMethods)
      await base.select(selector.admin.wooCommerce.settings.shippingMethod, selectShippingMethod)
      await base.clickAndWait(selector.admin.wooCommerce.settings.addShippingMethod)
      await base.wait(1)
      //set shipping method options
      await base.hover(selector.admin.wooCommerce.settings.shippingMethodCell(shippingMethod))
      await base.click(selector.admin.wooCommerce.settings.editShippingMethod(shippingMethod))
    } else {
      //edit shipping method
      await base.hover(selector.admin.wooCommerce.settings.shippingMethodCell(shippingMethod))
      await base.click(selector.admin.wooCommerce.settings.editShippingMethod(shippingMethod))
    }

    switch (selectShippingMethod) {
      case 'flat_rate':
        //flat rate
        await base.clearAndType(selector.admin.wooCommerce.settings.flatRateMethodTitle, shippingMethod)
        await base.select(selector.admin.wooCommerce.settings.flatRateTaxStatus, 'taxable')
        await base.clearAndType(selector.admin.wooCommerce.settings.flatRateCost, '20')
        break

      case 'free_shipping':
        //free shipping
        await base.clearAndType(selector.admin.wooCommerce.settings.freeShippingTitle, shippingMethod)
        // await base.select(selector.admin.wooCommerce.settings.freeShippingRequires, 'min_amount')
        // await base.clearAndType(selector.admin.wooCommerce.settings.freeShippingMinimumOrderAmount, '200')
        // await base.check(selector.admin.wooCommerce.settings.freeShippingCouponsDiscounts)
        break

      case 'local_pickup':
        //local pickup
        await base.clearAndType(selector.admin.wooCommerce.settings.localPickupTitle, shippingMethod)
        await base.select(selector.admin.wooCommerce.settings.localPickupTaxStatus, 'taxable')
        await base.clearAndType(selector.admin.wooCommerce.settings.localPickupCost, '20')
        break

      case 'dokan_table_rate_shipping':
        //dokan table rate shipping
        await base.clearAndType(selector.admin.wooCommerce.settings.dokanTableRateShippingMethodTitle, shippingMethod)
        break

      case 'dokan_distance_rate_shipping':
        //dokan distance rate shipping
        await base.clearAndType(selector.admin.wooCommerce.settings.dokanDistanceRateShippingMethodTitle, shippingMethod)
        break

      case 'dokan_vendor_shipping':
        //vendor shipping
        await base.clearAndType(selector.admin.wooCommerce.settings.vendorShippingMethodTitle, shippingMethod)
        await base.select(selector.admin.wooCommerce.settings.vendorShippingTaxStatus, 'taxable')
        break

      default:
        break
    }

    await base.click(selector.admin.wooCommerce.settings.shippingMethodSaveChanges)

    await base.waitForSelector(selector.admin.wooCommerce.settings.shippingMethodCell(shippingMethod))
    let shippingMethodIsVisible = await base.isVisible(selector.admin.wooCommerce.settings.shippingMethodCell(shippingMethod))
    expect(shippingMethodIsVisible).toBe(true)

  },

  //admin delete shipping zone
  async deleteShippingZone(shippingZone) {
    await base.clickAndWait(selector.admin.wooCommerce.settings.shipping)

    await base.hover(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone))
    await base.alert('accept')
    await base.click(selector.admin.wooCommerce.settings.deleteShippingZone(shippingZone))
    await base.wait(1)

    let shippingZoneIsVisible = await base.isVisible(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone))
    expect(shippingZoneIsVisible).toBe(false)
  },

  //admin delete shipping method
  async deleteShippingMethod(shippingZone, shippingMethod) {
    await base.clickAndWait(selector.admin.wooCommerce.settings.shipping)

    await base.hover(selector.admin.wooCommerce.settings.shippingZoneCell(shippingZone))
    await base.clickAndWait(selector.admin.wooCommerce.settings.editShippingZone(shippingZone))
    await base.hover(selector.admin.wooCommerce.settings.shippingMethodCell(shippingMethod))
    await base.click(selector.admin.wooCommerce.settings.deleteShippingMethod(shippingMethod))
    await base.click(selector.admin.wooCommerce.settings.shippingZoneSaveChanges)

    let shippingMethodIsVisible = await base.isVisible(selector.admin.wooCommerce.settings.shippingMethodCell(shippingMethod))
    expect(shippingMethodIsVisible).toBe(false)
  },



  //----------------------------------------------- payment methods ------------------------------------------------//



  //admin setup payment settings
  async setPaymentSettings() {
    await this.goToWooCommerceSettings()
    await this.setupBasicPaymentMethods()
    await this.setupStripeConnect()
    await this.setupPaypalMarketPlace()
    await this.setupDokanMangoPay()
    await this.setupDokanRazorpay()
    await this.setupStripeExpress()
  },

  //setCurrencyOptions
  async setCurrencyOptions() {
    await this.goToWooCommerceSettings()

    //set currency options
    await base.clearAndType(selector.admin.wooCommerce.settings.thousandSeparator, ',')
    await base.clearAndType(selector.admin.wooCommerce.settings.decimalSeparator, ',')
    await base.clearAndType(selector.admin.wooCommerce.settings.numberOfDecimals, '2')
    await base.clickAndWait(selector.admin.wooCommerce.settings.generalSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')

  },

  //admin set currency
  async setCurrency(currency) {
    await this.goToWooCommerceSettings()
    let currentCurrency = await base.getElementText(selector.admin.wooCommerce.settings.currency)
    if (currentCurrency !== currency) {
      await base.click(selector.admin.wooCommerce.settings.currency)
      await base.type(selector.admin.wooCommerce.settings.currency, currency)
      await page.keyboard.press('Enter')
      await base.clickAndWait(selector.admin.wooCommerce.settings.generalSaveChanges)

      let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
      expect(successMessage).toMatch('Your settings have been saved.')
    }
  },

  //admin enable payment methods via slider
  async enablePaymentMethod(selector) {
    let classValue = await base.getElementClassValue(selector)
    if (classValue.includes('woocommerce-input-toggle--disabled')) {
      await base.click(selector)
      await base.wait(2)
    } else {
      await base.click(selector)
      await base.wait(2)
      await base.click(selector)
      await base.wait(2)
    }

    let classValue1 = await base.getElementClassValue(selector)
    expect(classValue1).toContain('woocommerce-input-toggle--enabled')
  },

  //admin setup basic payment methods
  async setupBasicPaymentMethods() {
    await base.clickAndWait(selector.admin.wooCommerce.settings.payments)
    //bank transfer
    await this.enablePaymentMethod(selector.admin.wooCommerce.settings.enableDirectBankTransfer)
    //check payments
    await this.enablePaymentMethod(selector.admin.wooCommerce.settings.enableCheckPayments)
    //cash on delivery
    await this.enablePaymentMethod(selector.admin.wooCommerce.settings.enableCashOnDelivery)

    await base.clickAndWait(selector.admin.wooCommerce.settings.paymentMethodsSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')
  },

  //admin setup Stripe
  async setupStripeConnect() {
    await this.setCurrency('United States (US) dollar ($)')

    await base.clickAndWait(selector.admin.wooCommerce.settings.payments)
    await base.clickAndWait(selector.admin.wooCommerce.settings.setupDokanStripeConnect)
    //setup strip connect
    await base.check(selector.admin.wooCommerce.settings.stripe.enableDisableStripe)
    await base.clearAndType(selector.admin.wooCommerce.settings.stripe.title, 'Dokan Credit card (Stripe)')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripe.description, 'Pay with your credit card via Stripe.')
    await base.check(selector.admin.wooCommerce.settings.stripe.nonConnectedSellers)
    await base.check(selector.admin.wooCommerce.settings.stripe.displayNoticeToConnectSeller)
    await base.clearAndType(selector.admin.wooCommerce.settings.stripe.displayNoticeInterval, '7')
    await base.check(selector.admin.wooCommerce.settings.stripe.threeDSecureAndSca)
    await base.check(selector.admin.wooCommerce.settings.stripe.sellerPaysTheProcessingFeeIn3DsMode)
    await base.check(selector.admin.wooCommerce.settings.stripe.testMode)
    await base.check(selector.admin.wooCommerce.settings.stripe.stripeCheckout)
    await base.click(selector.admin.wooCommerce.settings.stripe.stripeCheckoutLocale)
    await base.type(selector.admin.wooCommerce.settings.stripe.stripeCheckoutLocale, 'English')
    await page.keyboard.press('Enter')
    await base.check(selector.admin.wooCommerce.settings.stripe.savedCards)
    //test credentials
    await base.clearAndType(selector.admin.wooCommerce.settings.stripe.testPublishableKey, 'pk_test_')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripe.testSecretKey, 'sk_test_')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripe.testClientId, 'ca_')
    await base.clickAndWait(selector.admin.wooCommerce.settings.stripe.stripeSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')
  },

  // admin setup dokan paypal marketplace
  async setupPaypalMarketPlace() {
    await this.setCurrency('United States (US) dollar ($)')

    await base.clickAndWait(selector.admin.wooCommerce.settings.payments)
    await base.clickAndWait(selector.admin.wooCommerce.settings.setupDokanPayPalMarketplace)
    // setup paypal marketplace
    await base.check(selector.admin.wooCommerce.settings.paypalMarketPlace.enableDisablePayPalMarketplace)
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.title, 'PayPal Marketplace')
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.description, 'Pay via PayPal Marketplace you can pay with your credit card if you don\'t have a PayPal account')
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.payPalMerchantIdPartnerId, 'partner_')
    // api credentials
    await base.check(selector.admin.wooCommerce.settings.paypalMarketPlace.payPalSandbox)
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.sandboxClientId, 'client_')
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.sandBoxClientSecret, 'secret_')
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.payPalPartnerAttributionId, 'weDevs_SP_Dokan')
    await base.click(selector.admin.wooCommerce.settings.paypalMarketPlace.disbursementMode)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.paypalMarketPlace.disbursementModeValues, 'Delayed')
    await base.click(selector.admin.wooCommerce.settings.paypalMarketPlace.paymentButtonType)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.paypalMarketPlace.paymentButtonTypeValues, 'Smart Payment Buttons')
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.marketplaceLogo, await base.getBaseUrl() + '/wp-content/plugins/dokan/assets/images/dokan-logo.png')
    await base.check(selector.admin.wooCommerce.settings.paypalMarketPlace.displayNoticeToConnectSeller)
    await base.check(selector.admin.wooCommerce.settings.paypalMarketPlace.sendAnnouncementToConnectSeller)
    await base.clearAndType(selector.admin.wooCommerce.settings.paypalMarketPlace.sendAnnouncementInterval, '7')
    await base.clickAndWait(selector.admin.wooCommerce.settings.paypalMarketPlace.paypalMarketPlaceSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')
  },

  //admin setup dokan mangopay
  async setupDokanMangoPay() {
    await this.setCurrency('Euro (€)')

    await base.clickAndWait(selector.admin.wooCommerce.settings.payments)
    await base.clickAndWait(selector.admin.wooCommerce.settings.setupDokanMangoPay)
    // setup dokan mangopay
    await base.check(selector.admin.wooCommerce.settings.dokanMangoPay.enableDisableMangoPayPayment)
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.title, 'MangoPay')
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.description, 'Pay via MangoPay')
    //api credentials
    await base.check(selector.admin.wooCommerce.settings.dokanMangoPay.mangoPaySandbox)
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.sandboxClientId, 'client_')
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.sandBoxApiKey, 'secret_')
    // payment options
    await base.click(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableCreditCards)
    // await base.type(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableCreditCards, 'CB/Visa/Mastercard')
    // await page.keyboard.press('Enter')
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableCreditCardsValues, 'CB/Visa/Mastercard')
    await base.click(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableDirectPaymentServices)
    // await base.type(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableDirectPaymentServices, 'Sofort*')
    // await page.keyboard.press('Enter')
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.chooseAvailableDirectPaymentServicesValues, 'Sofort*')
    await base.check(selector.admin.wooCommerce.settings.dokanMangoPay.savedCards)
    // fund transfers and payouts
    await base.click(selector.admin.wooCommerce.settings.dokanMangoPay.transferFunds)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.transferFundsValues, 'On payment completed')
    await base.check(selector.admin.wooCommerce.settings.dokanMangoPay.payoutMode)
    // types and requirements of vendors
    await base.click(selector.admin.wooCommerce.settings.dokanMangoPay.typeOfVendors)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.typeOfVendorsValues, 'Either')
    await base.click(selector.admin.wooCommerce.settings.dokanMangoPay.businessRequirement)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanMangoPay.businessRequirementValues, 'Any')
    // advanced settings
    await base.check(selector.admin.wooCommerce.settings.dokanMangoPay.displayNoticeToNonConnectedSellers)
    await base.check(selector.admin.wooCommerce.settings.dokanMangoPay.sendAnnouncementToNonConnectedSellers)
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanMangoPay.announcementInterval, '7')
    await base.clickAndWait(selector.admin.wooCommerce.settings.dokanMangoPay.dokanMangopaySaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')
  },

  //admin setup dokan razorpay
  async setupDokanRazorpay() {
    await this.setCurrency('Indian rupee (₹)')

    await base.clickAndWait(selector.admin.wooCommerce.settings.payments)
    await base.clickAndWait(selector.admin.wooCommerce.settings.setupDokanRazorpay)
    //setup dokan razorpay
    await base.check(selector.admin.wooCommerce.settings.dokanRazorpay.enableDisableDokanRazorpay)
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.title, 'Razorpay')
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.description, 'Pay securely by Credit or Debit card or Internet Banking through Razorpay.')
    // api credentials
    await base.check(selector.admin.wooCommerce.settings.dokanRazorpay.razorpaySandbox)
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.testKeyId, 'rzp_test')
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.testKeySecret, 'rzp_test')
    await base.click(selector.admin.wooCommerce.settings.dokanRazorpay.disbursementMode)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.dokanRazorpay.disbursementModeValues, 'Delayed')
    await base.check(selector.admin.wooCommerce.settings.dokanRazorpay.sellerPaysTheProcessingFee)
    await base.check(selector.admin.wooCommerce.settings.dokanRazorpay.displayNoticeToConnectSeller)
    await base.check(selector.admin.wooCommerce.settings.dokanRazorpay.sendAnnouncementToConnectSeller)
    await base.clearAndType(selector.admin.wooCommerce.settings.dokanRazorpay.sendAnnouncementInterval, '7')
    await base.clickAndWait(selector.admin.wooCommerce.settings.dokanRazorpay.dokanRazorpaySaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')
  },

  //admin setup Stripe Express
  async setupStripeExpress() {
    await this.setCurrency('United States (US) dollar ($)')

    await base.clickAndWait(selector.admin.wooCommerce.settings.payments)
    await base.clickAndWait(selector.admin.wooCommerce.settings.setupDokanStripeExpress)

    // stripe express
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.enableOrDisableStripeExpress)
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.title, 'Dokan Express Payment Methods')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.description, 'Pay with your credit card via Stripe.')
    // api credentials
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.testMode)
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.testPublishableKey, 'pk_test_')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.testSecretKey, 'sk_test_')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.testWebhookSecret, 'webHook_test_')
    // payment and disbursement
    await base.click(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethods)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethodsValues, 'Credit/Debit Card')
    await base.click(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethods)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.choosePaymentMethodsValues, 'iDEAL')
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.takeProcessingFeesFromSellers)
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.savedCards)
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.capturePaymentsManually)
    await base.click(selector.admin.wooCommerce.settings.stripeExpress.disburseFunds)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.disbursementModeValues, 'Delayed')
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.customerBankStatement, 'Dokan')
    // payment request options (apple pay/google pay)
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.paymentRequestButtons)
    await base.select(selector.admin.wooCommerce.settings.stripeExpress.buttonType, 'default')
    await base.select(selector.admin.wooCommerce.settings.stripeExpress.buttonTheme, 'dark')
    await base.click(selector.admin.wooCommerce.settings.stripeExpress.buttonLocations)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.buttonLocationsValues, 'Product')
    await base.click(selector.admin.wooCommerce.settings.stripeExpress.buttonLocations)
    await base.setDropdownOptionSpan(selector.admin.wooCommerce.settings.stripeExpress.buttonLocationsValues, 'Checkout')
    // advanced settings
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.displayNoticeToNonConnectedSellers)
    await base.check(selector.admin.wooCommerce.settings.stripeExpress.sendAnnouncementToNonConnectedSellers)
    await base.clearAndType(selector.admin.wooCommerce.settings.stripeExpress.announcementInterval, '7')
    await base.clickAndWait(selector.admin.wooCommerce.settings.stripeExpress.stripeExpressSaveChanges)

    let successMessage = await base.getElementText(selector.admin.wooCommerce.settings.updatedSuccessMessage)
    expect(successMessage).toMatch('Your settings have been saved.')

  },



  //----------------------------------------------- Vendors ---------------------------------------------------//



  //admin add new vendors
  async addVendor(firstName, lastName, storeName, phoneNumber, emailAddress, userName, password, companyName, companyIdEuidNumber, vatOrTaxNumber, nameOfBank, bankIban,
    street1, street2, city, zip, country, state, accountName, accountNumber, bankName, bankAddress, routingNumber, iban, swift, payPalEmail) {

    let email = faker.internet.email()
    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.vendorsMenu)

    //add new vendor
    await base.click(selector.admin.dokan.vendors.addNewVendor)
    // account info
    await base.type(selector.admin.dokan.vendors.firstName, faker.name.firstName('male')) //TODO: update this for test settings
    await base.type(selector.admin.dokan.vendors.lastName, faker.name.lastName('male'),)
    await base.type(selector.admin.dokan.vendors.storeName, storeName)
    await base.type(selector.admin.dokan.vendors.phoneNumber, phoneNumber)
    await base.type(selector.admin.dokan.vendors.email, email)
    await base.click(selector.admin.dokan.vendors.generatePassword)
    await base.clearAndType(selector.admin.dokan.vendors.password, password)
    await base.type(selector.admin.dokan.vendors.username, faker.name.firstName('male'))
    await base.type(selector.admin.dokan.vendors.companyName, companyName)
    await base.type(selector.admin.dokan.vendors.companyIdEuidNumber, companyIdEuidNumber)
    await base.type(selector.admin.dokan.vendors.vatOrTaxNumber, vatOrTaxNumber)
    await base.type(selector.admin.dokan.vendors.nameOfBank, nameOfBank)
    await base.type(selector.admin.dokan.vendors.bankIban, bankIban)
    await base.wait(3)
    await base.click(selector.admin.dokan.vendors.next)

    // address  
    await base.type(selector.admin.dokan.vendors.street1, street1)
    await base.type(selector.admin.dokan.vendors.street2, street2)
    await base.type(selector.admin.dokan.vendors.city, city)
    await base.type(selector.admin.dokan.vendors.zip, zip)
    await base.click(selector.admin.dokan.vendors.country)
    await base.type(selector.admin.dokan.vendors.countryInput, country)
    await page.keyboard.press('Enter')
    await base.click(selector.admin.dokan.vendors.state)
    await base.type(selector.admin.dokan.vendors.state, state)
    await base.click(selector.admin.dokan.vendors.next)

    // payment options  
    await base.type(selector.admin.dokan.vendors.accountName, accountName)
    await base.type(selector.admin.dokan.vendors.accountNumber, accountNumber)
    await base.type(selector.admin.dokan.vendors.bankName, bankName)
    await base.type(selector.admin.dokan.vendors.bankAddress, bankAddress)
    await base.type(selector.admin.dokan.vendors.routingNumber, routingNumber)
    await base.type(selector.admin.dokan.vendors.iban, iban)
    await base.type(selector.admin.dokan.vendors.swift, swift)
    await base.type(selector.admin.dokan.vendors.payPalEmail, payPalEmail)
    await base.check(selector.admin.dokan.vendors.enableSelling)
    await base.check(selector.admin.dokan.vendors.publishProductDirectly)
    await base.check(selector.admin.dokan.vendors.makeVendorFeature)
    //create vendor
    await base.click(selector.admin.dokan.vendors.createVendor)
    await base.clickAndWait(selector.admin.dokan.vendors.editVendorInfo)

    let vendorEmail = await base.getElementValue(selector.admin.dokan.vendors.editVendor.email)
    expect(vendorEmail).toBe(email)

  },



  //-------------------------------------------------- products ----------------------------------------------------//



  //admin add categories
  async addCategory(categoryName) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.categoriesMenu)

    let categoryIsVisible = await base.isVisible(selector.admin.products.category.categoryCell(categoryName))
    if (!categoryIsVisible) {

      // add new category
      await base.type(selector.admin.products.category.name, categoryName)
      await base.type(selector.admin.products.category.slug, categoryName)
      await base.click(selector.admin.products.category.addNewCategory)

      await base.waitForSelector(selector.admin.products.category.categoryCell(categoryName))
      let categoryIsVisible = await base.isVisible(selector.admin.products.category.categoryCell(categoryName))
      expect(categoryIsVisible).toBe(true)
    }
  },

  //admin add attributes
  async addAttributes(attributeName, attributeTerms) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.attributesMenu)

    let attributeIsVisible = await base.isVisible(selector.admin.products.attribute.attributeCell(attributeName))
    if (!attributeIsVisible) {
      // add new attribute
      await base.type(selector.admin.products.attribute.name, attributeName)
      await base.type(selector.admin.products.attribute.slug, attributeName)
      await base.click(selector.admin.products.attribute.addAttribute)

      await base.waitForSelector(selector.admin.products.attribute.attributeCell(attributeName))
      let attributeIsVisible = await base.isVisible(selector.admin.products.attribute.attributeCell(attributeName))
      expect(attributeIsVisible).toBe(true)

      await base.clickAndWait(selector.admin.products.attribute.configureTerms(attributeName))

      // add new term
      for (let attributeTerm of attributeTerms) {
        await base.type(selector.admin.products.attribute.attributeTerm, attributeTerm)
        await base.type(selector.admin.products.attribute.attributeTermSlug, attributeTerm)
        await base.click(selector.admin.products.attribute.addAttributeTerm)

        await base.waitForSelector(selector.admin.products.attribute.attributeTermCell(attributeTerm))
        let attributeTermIsVisible = await base.isVisible(selector.admin.products.attribute.attributeTermCell(attributeTerm))
        expect(attributeTermIsVisible).toBe(true)
      }
    }
  },

  //admin add simple product
  async addSimpleProduct(productName, productPrice, categoryName, vendor, status = 'publish', stockStatus=false) {
    await base.hover(selector.admin.aDashboard.products)
    // await base.click(selector.admin.aDashboard.products)
    // await base.wait(2)
    await base.clickAndWait(selector.admin.products.addNewMenu)

    // add new simple product
    await base.select(selector.admin.products.product.productType, 'simple')
    await base.type(selector.admin.products.product.regularPrice, productPrice)
    //category
    await base.click(selector.admin.products.product.category(categoryName))
    //stock status
    if (stockStatus){
      await this.editStockStatus('outofstock')
    }
    //vendor
    // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with this
    await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
    // name
    await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later



    switch (status) {
      case 'publish':
        //publish
        await base.wait(1)
        await base.clickAndWait(selector.admin.products.product.publish)
        let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage).toMatch('Product published. ')
        break

      case 'draft':
        //draft
        await base.clickAndWait(selector.admin.products.product.saveDraft)
        let draftProductCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
        expect(draftProductCreateSuccessMessage).toMatch('Product draft updated. ')
        break

      case 'pending':
        //pending
        await base.click(selector.admin.products.product.editStatus)
        await base.select(selector.admin.products.product.status, 'draft')
        await base.wait(1)
        await base.clickAndWait(selector.admin.products.product.saveDraft)
        let pendingProductCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
        expect(pendingProductCreateSuccessMessage).toMatch('Product updated. ')
        break

      default:
        break
    }

  },

  //admin add variable product
  // async addVariableProduct(productName, productPrice, categoryName, vendor, attribute, attributeTerms) {
  //   await base.hover(selector.admin.aDashboard.products)
  //   await base.clickAndWait(selector.admin.products.addNewMenu)

  //   // add new variable product
  //   await base.select(selector.admin.products.product.productType, 'variable')

  //   await base.click(selector.admin.products.product.attributes)
  //   // await base.wait(1)

  //   // add attributes
  //   await base.select(selector.admin.products.product.customProductAttribute, `pa_${attribute}`)
  //   await base.wait(2)
  //   await base.click(selector.admin.products.product.addAttribute)
  //   await base.wait(2)
  //   await base.click(selector.admin.products.product.selectAll)
  //   await base.click(selector.admin.products.product.usedForVariations)
  //   await base.wait(2)
  //   await base.click(selector.admin.products.product.saveAttributes)
  //   await base.wait(2)

  //   //TODO: need to update js alert 
  //   // add variations
  //   await base.click(selector.admin.products.product.variations)
  //   await base.wait(2)
  //   await base.click(selector.admin.products.product.variations)
  //   await base.wait(2)
  //   await base.select(selector.admin.products.product.addVariations, 'link_all_variations')
  //   await base.wait(2)
  //   await base.alert('accept')
  //   await base.click(selector.admin.products.product.go)
  //   await base.wait(2)

  //   await base.select(selector.admin.products.product.addVariations, 'variable_regular_price')
  //   await base.wait(2)
  //   await base.click(selector.admin.products.product.go)
  //   await base.alertWithValue(120)
  //   await base.wait(2)

  //   //category
  //   await base.click(selector.admin.products.product.category(categoryName))
  //   //vendor
  //   // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with this
  //   await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
  //   // name
  //   await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later
  //   //publish
  //   await base.clickAndWait(selector.admin.products.product.publish)

  //   let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
  //   expect(productCreateSuccessMessage).toMatch('Product published. ')
  // },

  //admin add simple subscription product
  async addSimpleSubscription(productName, productPrice, categoryName, vendor) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.addNewMenu)

    // add new simple subscription
    await base.select(selector.admin.products.product.productType, 'subscription')
    await base.type(selector.admin.products.product.subscriptionPrice, productPrice)
    await base.select(selector.admin.products.product.subscriptionPeriodInterval, '1')
    await base.select(selector.admin.products.product.subscriptionPeriod, 'month')
    await base.select(selector.admin.products.product.expireAfter, '0')
    await base.type(selector.admin.products.product.subscriptionTrialLength, '0')
    await base.select(selector.admin.products.product.subscriptionTrialPeriod, 'day')
    //category
    await base.click(selector.admin.products.product.category(categoryName))
    //vendor
    // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with this
    await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
    // name
    await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later
    //publish
    await base.clickAndWait(selector.admin.products.product.publish)

    let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
    expect(productCreateSuccessMessage).toMatch('Product published. ')
  },

  //admin add variable subscription product
  async addVariableSubscription(productName, productPrice, categoryName, vendor, attribute, attributeTerms) {
  },

  //admin add group product
  async addGroupProduct(productName, productPrice, categoryName, vendor) {
  },

  //admin add external product
  async addExternalProduct(productName, productPrice, categoryName, vendor) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.addNewMenu)

    // add new external product
    await base.select(selector.admin.products.product.productType, 'external')
    await base.type(selector.admin.products.product.productUrl, await base.getBaseUrl() + '/shop/uncategorized/subscription_handcrafted-granite-chicken/')
    await base.type(selector.admin.products.product.buttonText, 'Buy product')
    await base.type(selector.admin.products.product.regularPrice, productPrice)
    //category
    await base.click(selector.admin.products.product.category(categoryName))
    //vendor
    // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with this
    await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
    // name
    await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later
    //publish
    await base.clickAndWait(selector.admin.products.product.publish)

    let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
    expect(productCreateSuccessMessage).toMatch('Product published. ')
  },

  //admin add dokan subscription product
  async addDokanSubscription(productName, productPrice, categoryName, vendor) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.addNewMenu)

    // add new dokan subscription product
    await base.select(selector.admin.products.product.productType, 'product_pack')
    await base.type(selector.admin.products.product.regularPrice, productPrice)
    //category
    await base.click(selector.admin.products.product.category(categoryName))
    // subscription details
    await base.type(selector.admin.products.product.numberOfProducts, '-1')
    await base.type(selector.admin.products.product.packValidity, '0')
    await base.type(selector.admin.products.product.advertisementSlot, '-1')
    await base.type(selector.admin.products.product.expireAfterDays, '-1')
    await base.click(selector.admin.products.product.recurringPayment)
    //vendor
    // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with this
    await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
    // name
    await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later
    //publish
    await base.clickAndWait(selector.admin.products.product.publish)

    let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
    expect(productCreateSuccessMessage).toMatch('Product published. ')
  },

  // admin add auction product
  async addAuctionProduct(productName, productPrice, startDate, endDate, categoryName, vendor) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.addNewMenu)

    // add new auction product
    await base.select(selector.admin.products.product.productType, 'auction')

    await base.select(selector.admin.products.product.itemCondition, 'new')
    await base.select(selector.admin.products.product.auctionType, 'normal')
    await base.type(selector.admin.products.product.startPrice, productPrice)
    await base.type(selector.admin.products.product.bidIncrement, '50')
    await base.type(selector.admin.products.product.reservePriced, String(Number(productPrice) + 400))
    await base.type(selector.admin.products.product.buyItNowPrice, String(Number(productPrice) + 900))
    await base.type(selector.admin.products.product.auctionDatesFrom, startDate)
    await base.type(selector.admin.products.product.auctionDatesTo, endDate)

    //category
    await base.click(selector.admin.products.product.category(categoryName))
    //vendor
    // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with this
    await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
    // name
    await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later
    //publish
    await base.clickAndWait(selector.admin.products.product.publish)

    let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
    expect(productCreateSuccessMessage).toMatch('Product published. ')
  },

  //admin add booking product
  async addBookingProduct(productName, productPrice, categoryName, vendor) {
    await base.hover(selector.admin.aDashboard.products)
    await base.clickAndWait(selector.admin.products.addNewMenu)

    // add new booking product
    await base.select(selector.admin.products.product.productType, 'booking')
    await base.select(selector.admin.products.product.bookingDurationType, 'customer')
    // await base.wait(2)
    await base.clearAndType(selector.admin.products.product.bookingDurationMax, '7')
    await base.select(selector.admin.products.product.calendarDisplayMode, 'always_visible')

    //availability
    // await base.clickAndWait(selector.admin.products.product.availability)

    //costs
    await base.click(selector.admin.products.product.bookingCosts)
    await base.wait(1)
    await base.clearAndType(selector.admin.products.product.baseCost, productPrice)
    await base.clearAndType(selector.admin.products.product.blockCost, '20')

    //category
    await base.click(selector.admin.products.product.category(categoryName))
    //vendor
    // await base.selectByText(selector.admin.products.product.vendor, vendor)//TODO: replace below line with gi
    await base.selectOptionByText(selector.admin.products.product.vendor, selector.admin.products.product.vendorOptions, vendor)
    // name
    await base.type(selector.admin.products.product.productName, productName) // TODO: publish element is blocked by other element that's why name is filled later
    //publish
    await base.clickAndWait(selector.admin.products.product.publish)

    let productCreateSuccessMessage = await base.getElementText(selector.admin.products.product.updatedSuccessMessage)
    expect(productCreateSuccessMessage).toMatch('Product published. ')
  },

  //admin update product stock status
  async editStockStatus(status){
          await base.click(selector.admin.products.product.inventory)
          await base.select(selector.admin.products.product.stockStatus,status)
  },



  //-------------------------------------------- Wholesale customer ----------------------------------------------//



  //admin approve wholesale request
  async adminApproveWholesaleRequest(customer) {
    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.wholesaleCustomerMenu)
    await base.click(selector.admin.dokan.wholesaleCustomer.statusSlider(customer))

    let enableStatusSuccessMessage = await base.getElementText(selector.admin.dokan.wholesaleCustomer.enableStatusUpdateSuccessMessage)
    expect(enableStatusSuccessMessage).toMatch('Wholesale capability activate')
  },

  async getOrderDetails(orderNumber) { //TODO: separate function to get order details form inside order details base
    let subMenuOpened = await base.getElementClassValue(selector.admin.aDashboard.dokanMenu)
    if (subMenuOpened.includes('opensub')) {
      await base.hover(selector.admin.aDashboard.dokan)
      await base.clickAndWait(selector.admin.dokan.reportsMenu)
    } else {
      await base.click(selector.admin.dokan.reportsMenu)
      await base.wait(2)
    }
    await base.click(selector.admin.dokan.reports.allLogs)
    await base.wait(3)
    await base.type(selector.admin.dokan.reports.searchByOrder, orderNumber)
    await base.wait(2)

    let aOrderDetails = {
      orderNumber: (await base.getElementText(selector.admin.dokan.reports.orderId)).split('#')[1],
      store: await base.getElementText(selector.admin.dokan.reports.store),
      orderTotal: helpers.price(await base.getElementText(selector.admin.dokan.reports.orderTotal)),
      vendorEarning: helpers.price(await base.getElementText(selector.admin.dokan.reports.vendorEarning)),
      commission: helpers.price(await base.getElementText(selector.admin.dokan.reports.commission)),
      gatewayFee: helpers.price(await base.getElementText(selector.admin.dokan.reports.gatewayFee)),
      shippingCost: helpers.price(await base.getElementText(selector.admin.dokan.reports.shippingCost)),
      tax: helpers.price(await base.getElementText(selector.admin.dokan.reports.tax)),
      orderStatus: await base.getElementText(selector.admin.dokan.reports.orderStatus),
      orderDate: await base.getElementText(selector.admin.dokan.reports.orderDate),
    }
    return aOrderDetails
  },

  //get total admin commission from admin dashboard
  async getTotalAdminCommission() {
    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.dashboardMenu)

    let totalAdminCommission = helpers.price(await base.getElementText(selector.admin.dokan.dashboard.commissionEarned))
    return totalAdminCommission
  },

  async approveRefundRequest(orderNumber, approve = false) {
    await this.searchRefundRequest(orderNumber)

    await base.hover(selector.admin.dokan.refunds.refundCell(orderNumber))
    if (approve) {
      await base.click(selector.admin.dokan.refunds.approveRefund(orderNumber))
    } else {
      await base.click(selector.admin.dokan.refunds.cancelRefund(orderNumber))
    }
    await base.wait(3)

    let refundRequestIsVisible = await base.isVisible(selector.admin.dokan.refunds.refundCell(orderNumber))
    expect(refundRequestIsVisible).toBe(false)
  },

  async searchRefundRequest(orderNumber) {
    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.refundsMenu)

    //search refund request
    await base.type(selector.admin.dokan.refunds.searchRefund, orderNumber)
    // await page.keyboard.press('Enter')
    await base.wait(3)

    await base.waitForSelector(selector.admin.dokan.refunds.refundCell(orderNumber))
    let searchedRefundRequestIsVisible = await base.isVisible(selector.admin.dokan.refunds.refundCell(orderNumber))
    expect(searchedRefundRequestIsVisible).toBe(true)
  },


  //-------------------------------------------- Dokan Setup Wizard ----------------------------------------------//

  // admin set dokan setup wizard
  async setDokanSetupWizard() {
    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.toolsMenu)

    //open dokan setup wizard
    await base.clickAndWait(selector.admin.dokan.tools.openSetupWizard)

    await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.letsGo)
    //store
    await base.clearAndType(selector.admin.dokan.dokanSetupWizard.vendorStoreURL, 'store')
    await base.click(selector.admin.dokan.dokanSetupWizard.shippingFeeRecipient)
    await base.setDropdownOptionSpan(selector.admin.dokan.dokanSetupWizard.shippingFeeRecipientValues, 'Vendor')
    await base.click(selector.admin.dokan.dokanSetupWizard.taxFeeRecipient)
    await base.setDropdownOptionSpan(selector.admin.dokan.dokanSetupWizard.taxFeeRecipientValues, 'Vendor')
    await base.click(selector.admin.dokan.dokanSetupWizard.mapApiSource)
    await base.setDropdownOptionSpan(selector.admin.dokan.dokanSetupWizard.mapApiSource, 'Google Maps')
    await base.clearAndType(selector.admin.dokan.dokanSetupWizard.googleMapApiKey, process.env.GOOGLE_MAP_API_KEY)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.shareEssentialsOff)
    await base.click(selector.admin.dokan.dokanSetupWizard.sellingProductTypes)
    await base.setDropdownOptionSpan(selector.admin.dokan.dokanSetupWizard.sellingProductTypes, 'Both')
    await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.continue)
    // await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.skipThisStep)

    //Selling
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.newVendorEnableSelling)
    await base.click(selector.admin.dokan.dokanSetupWizard.commissionType)
    await base.setDropdownOptionSpan(selector.admin.dokan.dokanSetupWizard.commissionTypeValues, 'Percentage')
    await base.clearAndType(selector.admin.dokan.dokanSetupWizard.adminCommission, '10')
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.orderStatusChange)
    await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.continue)
    // await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.skipThisStep)

    //Withdraw
    //TODO: add more payment methods
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.payPal)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.bankTransfer)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.wirecard)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.stripe)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.custom)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.skrill)
    await base.clearAndType(selector.admin.dokan.dokanSetupWizard.minimumWithdrawLimit, '50')
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.orderStatusForWithdrawCompleted)
    await base.enableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.orderStatusForWithdrawProcessing)
    await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.continue)

    //Recommended
    await base.disableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.wooCommerceConversionTracking)
    await base.disableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.weMail)
    await base.disableSwitcherSetupWizard(selector.admin.dokan.dokanSetupWizard.texty)
    await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.continueRecommended)

    //ready!
    await base.clickAndWait(selector.admin.dokan.dokanSetupWizard.visitDokanDashboard)

    await base.waitForSelector(selector.admin.dokan.dashboard.dashboardText)
    let dashboardTextIsVisible = await base.isVisible(selector.admin.dokan.dashboard.dashboardText)
    expect(dashboardTextIsVisible).toBe(true)

  },

  //-------------------------------------------- Dokan Modules ----------------------------------------------//

  //module activation check
  async checkActiveModules() {
    await base.hover(selector.admin.aDashboard.dokan)
    await base.clickAndWait(selector.admin.dokan.modulesMenu)
    await base.wait(2)
    await base.click(selector.admin.dokan.modules.inActive)
    await base.wait(2)

    let noModulesMessage = await base.isVisible(selector.admin.dokan.modules.noModulesFound)
    if (noModulesMessage) {
      let noModulesMessageText = await base.getElementText(selector.admin.dokan.modules.noModulesFound)
      expect(noModulesMessageText).toMatch('No modules found.')
    } else {
      let inActiveModuleNames = await base.getMultipleElementTexts(selector.admin.dokan.modules.moduleName)
      throw new Error("Inactive module exists: " + inActiveModuleNames)
    }
  },
}