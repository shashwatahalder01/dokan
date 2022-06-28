require('dotenv').config()
const loginPage = require('../pages/login.js')
const adminPage = require('../pages/admin.js')
const vendorPage = require('../pages/vendor.js')
const customerPage = require('../pages/customer.js')
const data = require('../utils/testData.js')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('Environment setup test', () => {
    // beforeAll(async () => {})
    // afterAll(async () => {await browser.close()})
    // beforeEach(async () => {})
    // afterEach(async () => {await browser.close()})





    //----------------------------------------- Admin details -------------------------------------------//





    it.skip('admin check Active plugins ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // check plugin is installed
        await adminPage.checkActivePlugins(data.PluginSlugList)
    })

    it('admin check Active modules ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // check plugin is installed
        await adminPage.checkActiveModules()
    })

    it('admin set WpSettings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // set wp general settings & permalink settings
        await adminPage.setWpSettings()
    })

    it('admin enable register password field', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.enablePasswordInputField()
    })

    it('admin set tax rate', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addStandardTaxRate()
    })

    it('admin set currency options', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.setCurrencyOptions()
    })

    it('admin set flat rate shipping method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addShippingMethod('US', 'country:US', 'flat_rate', 'Flat rate')
    })


    it('admin set vendor Table Rate shipping method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_table_rate_shipping', 'Vendor Table Rate')
    })


    it('admin set vendor distance rate shipping method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_distance_rate_shipping', 'Vendor Distance Rate')
    })


    it('admin set vendor shipping method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_vendor_shipping', 'Vendor Shipping')
    })

    it('admin set basic payments', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // set payment gateway settings
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupBasicPaymentMethods()
    })

    it('admin add categories and attributes', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // add product categories
        await adminPage.addCategory('Shirts')
        // add product attributes
        await adminPage.addAttributes(data.product.attribute, data.product.attributeTerms)
    })

    // it.skip('admin add dokan subscription', async () => {
    //     await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
    //     // add dokan subscriptions
    //     await adminPage.addDokanSubscription('Dokan_subscription_Non_recurring', data.product.price, data.product.category, data.product.vendor[0])
    // })

    // it.skip('admin set dokan  settings', async () => {
    //     await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
    //     await adminPage.goToDokanSettings()
    //     await adminPage.setDokanSettings()
    // })

    it('admin set dokan general settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanGeneralSettings()
    })

    it('admin set dokan selling settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanSellingSettings()
    })

    it('admin set dokan withdraw settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanWithdrawSettings()
    })

    it('admin set dokan page settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setPageSettings()
    })

    it('admin set dokan appearance settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanAppearanceSettings()
    })

    it('admin set dokan privacy policy settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanPrivacyPolicySettings()
    })

    it('admin set dokan store support settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanStoreSupportSettings()
    })

    it('admin set dokan rma settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanRmaSettings()
    })

    it('admin set dokan wholesale settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanWholesaleSettings()
    })

    it('admin set dokan eu compliance settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanEuComplianceSettings()
    })

    it('admin set dokan delivery time settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanDeliveryTimeSettings()
    })

    it('admin set dokan product advertising settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanProductAdvertisingSettings()
    })

    it('admin set dokan geolocation settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanGeolocationSettings()
    })

    it('admin set dokan product report abuse settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanProductReportAbuseSettings()
    })

    it('admin set dokan spmv settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()

        await adminPage.setDokanSpmvSettings()
    })

    it.skip('admin set dokan vendor subscription settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanVendorSubscriptionSettings()
    })





    //----------------------------------------- Vendor details -------------------------------------------//




    it('add test vendor1', async () => {
        // add vendor1
        await vendorPage.vendorRegister(process.env.VENDOR, process.env.VENDOR_PASSWORD, 'vendor1', 'v1', 'vendorStore1', data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.phone, false, data.vendorSetupWizard)
    })

    it('add test vendor1 products', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //add products
        await vendorPage.addSimpleProduct('p1_v1 (simple)', data.product.price_int, data.product.category)
        // await vendorPage.addSimpleProduct('p2_v1 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p1_F1_v1 (simple)', data.product.price_frac_comma, data.product.category)
        // await vendorPage.addSimpleProduct('p2_F2_v1 (simple)', data.product.price, data.product.category)
        // await vendorPage.addVariableProduct('p1_v1 (variable)', data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
        // await vendorPage.addSimpleSubscription('p1_v1 (simple subscription)', data.product.price, data.product.category)
        // await vendorPage.addVariableSubscription('p1_v1 (variable subscription)', data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
        // await vendorPage.addExternalProduct('p1_v1 (external)', data.product.price, data.product.category)
        // await vendorPage.addAuctionProduct('p1_v1 (auction)', data.product.auctionPrice, data.product.auction.startDate, data.product.auction.endDate, data.product.category)
        // await vendorPage.addBookingProduct('p1_v1 (booking)', data.product.booking.category, data.product.booking.bookingDurationType, data.product.booking.bookingDuration, data.product.booking.bookingDurationUnit, data.product.booking.calenderDisplayMode, data.product.booking.maxBookingsPerBlock, data.product.booking.minimumBookingWindowIntoTheFutureDate, data.product.booking.minimumBookingWindowIntoTheFutureDateUnit, data.product.booking.maximumBookingWindowIntoTheFutureDate, data.product.booking.maximumBookingWindowIntoTheFutureDateUnit, data.product.booking.baseCost, data.product.booking.blockCost)
        // //add discount product
        // await vendorPage.addSimpleProduct('p1_v1 (sale)', data.product.price, data.product.category)
        // //add minmax products
        // await vendorPage.addSimpleProduct('p1_v1 (minmax)', data.product.price, data.product.category)
    })

    it('add test vendor1 coupons', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //add coupons
        await vendorPage.addCoupon('C1_V1', data.coupon.amount)
    })

    it('add test vendor1 address', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        await vendorPage.setStoreAddress('abc street', 'xyz street', 'New York', '10006', 'US', 'NY')
    })

    it('add test vendor1 rma settings', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        await vendorPage.setRmaSettings('Warranty', 'included_warranty', 'limited', '1', 'weeks')
    })

    it.skip('add test vendor2', async () => {
        // add vendor1
        await vendorPage.vendorRegister(process.env.VENDOR2, process.env.VENDOR_PASSWORD, 'vendor2', 'v2', 'vendorStore2', data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.phone, false, data.vendorSetupWizard)
    })

    it.skip('add test vendor2 products', async () => {
        await loginPage.login(process.env.VENDOR2, process.env.VENDOR_PASSWORD)
        //add products
        await vendorPage.addSimpleProduct('p1_v2 (simple)', data.product.price_int, data.product.category)
        // await vendorPage.addSimpleProduct('p2_v2 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p1_F1_v2 (simple)', data.product.price_frac_comma, data.product.category)
        // await vendorPage.addSimpleProduct('p2_F2_v2 (simple)', data.product.price, data.product.category)
        // await vendorPage.addVariableProduct('p1_v2 (variable)', data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
        // await vendorPage.addSimpleSubscription('p1_v2 (simple subscription)', data.product.price, data.product.category)
        // await vendorPage.addVariableSubscription('p1_v2 (variable subscription)', data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
        // await vendorPage.addExternalProduct('p1_v2 (external)', data.product.price, data.product.category)
        // await vendorPage.addAuctionProduct('p1_v2 (auction)', data.product.auctionPrice, data.product.auction.startDate, data.product.auction.endDate, data.product.category)
        // await vendorPage.addBookingProduct('p1_v2 (booking)', data.product.booking.category, data.product.booking.bookingDurationType, data.product.booking.bookingDuration, data.product.booking.bookingDurationUnit, data.product.booking.calenderDisplayMode, data.product.booking.maxBookingsPerBlock, data.product.booking.minimumBookingWindowIntoTheFutureDate, data.product.booking.minimumBookingWindowIntoTheFutureDateUnit, data.product.booking.maximumBookingWindowIntoTheFutureDate, data.product.booking.maximumBookingWindowIntoTheFutureDateUnit, data.product.booking.baseCost, data.product.booking.blockCost)
        // //add discount product
        // await vendorPage.addSimpleProduct('p1_v2 (sale)', data.product.price, data.product.category)
        // //add minmax products
        // await vendorPage.addSimpleProduct('p1_v2 (minmax)', data.product.price, data.product.category)
    })

    it.skip('add test vendor2 coupons', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //add coupons
        await vendorPage.addCoupon('C1_V2', data.coupon.amount)
    })

    it.skip('add test vendor2 address', async () => {
        await loginPage.login(process.env.VENDOR2, process.env.VENDOR_PASSWORD)
        await vendorPage.setStoreAddress('abc street', 'xyz street', 'New York', '10006', 'US', 'NY')
    })

    it.skip('add test vendor2 rma settings', async () => {
        await loginPage.login(process.env.VENDOR2, process.env.VENDOR_PASSWORD)
        await vendorPage.setRmaSettings('Warranty', 'included_warranty', 'limited', '1', 'weeks')
    })



    //----------------------------------------- Customer details -------------------------------------------//



    it('add test customer1', async () => {
        // add customer1
        await customerPage.customerRegister(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    })

    it('add test customer1 addresses', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addBillingAddress('customer1', 'c1', data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, data.customerInfo.userEmail)
        await customerPage.addShippingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
        await customerPage.customerLogout()
    })

    it.skip('add test customer2', async () => {
        // add customer1
        await customerPage.customerRegister(process.env.CUSTOMER2, process.env.CUSTOMER_PASSWORD)
    })

    it.skip('add test customer2 addresses', async () => {
        await loginPage.login(process.env.CUSTOMER2, process.env.CUSTOMER_PASSWORD)
        await customerPage.addBillingAddress('customer2', 'c2', data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, data.customerInfo.userEmail)
        await customerPage.addShippingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
        await customerPage.customerLogout()
    })


})