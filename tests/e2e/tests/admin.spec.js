require('dotenv').config()
const adminPage = require('../pages/admin.js')
const loginPage = require('../pages/login.js')
const data = require('../utils/testData.js')
jest.retryTimes(process.env.RETRY_TIMES)



describe('admin functionality test', () => {
    // beforeAll(async () => {})
    // afterAll(async () => {})
    // beforeEach(async () => {})
    // afterEach(async () => {})

    it('admin can login', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
    })

    it('admin can logout', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.adminLogout()
    })

    it('admin can add vendor', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addVendor(data.vendorInfo.firstName, data.vendorInfo.lastName, data.vendorInfo.shopName, data.vendorInfo.phone, data.vendorInfo.userEmail
            , data.vendorInfo.userName, data.vendorInfo.password, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban,
            data.vendorInfo.street1, data.vendorInfo.street2, data.vendorInfo.city, data.vendorInfo.zipCode, data.vendorInfo.country, data.vendorInfo.state, data.vendorInfo.accountName, data.vendorInfo.accountNumber,
            data.vendorInfo.bankName, data.vendorInfo.bankAddress, data.vendorInfo.routingNumber, data.vendorInfo.swiftCode, data.vendorInfo.iban, data.vendorInfo.userEmail)

    })

    it('admin can add simple product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addSimpleProduct(data.product.name.simple, data.product.price, data.product.category, data.product.vendor[1])
    })

    it.skip('admin can add variable product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addVariableProduct(data.product.name.variable, data.product.price, data.product.category, data.product.vendor[1], data.product.category, data.product.attribute, data.product.attributeTerms)
    })

    it('admin can add simple subscription ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addSimpleSubscription(data.product.name.simpleSubscription, data.product.price, data.product.category, data.product.vendor[1])
    })

    it.skip('admin can add variable subscription ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addVariableSubscription(data.product.name.variableSubscription, data.product.price, data.product.category, data.product.vendor[1], data.product.category, data.product.attribute, data.product.attributeTerms)
    })

    it('admin can add external product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addExternalProduct(data.product.name.external, data.product.price, data.product.category, data.product.vendor[1])
    })

    it('admin can add dokan subscription ', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addDokanSubscription(data.product.name.dokanSubscription, data.product.price, data.product.category, data.product.vendor[0])
    })

    it('admin can add auction product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addAuctionProduct(data.product.name.auction, data.product.price, data.product.auction.startDate, data.product.auction.endDate, data.product.category, data.product.vendor[1])
    })

    it('admin can add booking product', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addBookingProduct(data.product.name.booking, data.product.price, data.product.category, data.product.vendor[1])
    })

    it('admin can add categories', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addCategory('Shirts')
    })

    it('admin can add attributes', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.addAttributes(data.product.attribute, data.product.attributeTerms)
    })


    //settings

    //tax settings
    it('admin can set standard tax rate', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        // await adminPage.addStandardTaxRate()
    })

    //shipping settings
    it('admin can set flat rate shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'flat_rate', 'Flat rate')
    })

    it('admin can set free shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'free_shipping', 'Free shipping')
    })

    it('admin can set local pickup shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'local_pickup', 'Local pickup')
    })

    it('admin can set table rate shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_table_rate_shipping', 'Vendor Table Rate')
    })

    it('admin can set distance rate shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_distance_rate_shipping', 'Vendor Distance Rate')
    })

    it('admin can set vendor shipping', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.addShippingMethod('US', 'country:US', 'dokan_vendor_shipping', 'Vendor Shipping')
    })

    //payment
    it('admin can add basic payment methods', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupBasicPaymentMethods()
    })

    it('admin can add strip payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupStripeConnect()
    })

    it('admin can add paypal marketplace payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupPaypalMarketPlace()
    })

    it('admin can add dokan mangopay payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupDokanMangoPay()
    })

    it('admin can add dokan razorpay payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupDokanRazorpay()
    })

    it.skip('admin can add strip express payment method', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToWooCommerceSettings()
        await adminPage.setupStripeExpress()
    })


    // dokan settings

    it('admin can set dokan general settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanGeneralSettings()
    })

    it('admin can set dokan selling settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanSellingSettings()
    })

    it('admin can set dokan withdraw settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanWithdrawSettings()
    })

    it('admin can set dokan appearance settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanAppearanceSettings()
    })

    it('admin can set dokan privacy policy settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanPrivacyPolicySettings()
    })

    it('admin can set dokan store support settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanStoreSupportSettings()
    })

    it('admin can set dokan rma settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanRmaSettings()
    })

    it('admin can set dokan wholesale settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanWholesaleSettings()
    })

    it('admin can set dokan eu compliance settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanEuComplianceSettings()
    })

    it('admin can set dokan delivery time settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanDeliveryTimeSettings()
    })

    it('admin can set dokan product advertising settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanProductAdvertisingSettings()
    })

    it('admin can set dokan geolocation settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanGeolocationSettings()
    })

    it('admin can set dokan product report abuse settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanProductReportAbuseSettings()
    })

    it('admin can set dokan spmv settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanSpmvSettings()
    })

    it.skip('admin can set dokan vendor subscription settings', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        await adminPage.goToDokanSettings()
        await adminPage.setDokanVendorSubscriptionSettings()
    })




})