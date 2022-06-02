require('dotenv').config()
const loginPage = require('../pages/login.js')
const adminPage = require('../pages/admin.js')
const vendorPage = require('../pages/vendor.js')
const customerPage = require('../pages/customer.js')
const data = require('../utils/testData.js')
const { faker } = require('@faker-js/faker')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('Environment setup test', () => {
    // beforeAll(async () => {})
    // afterAll(async () => {await browser.close()})
    // beforeEach(async () => {})
    // afterEach(async () => {await browser.close()})




    it('environment setup', async () => {


        //admin setup
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // check plugin is installed
        await adminPage.checkPluginActivationConfirmation(data.PluginSlugList)
        // set wp general settings & permalink settings
        await adminPage.setWpSettings()
        // set wooCommerce settings
        await adminPage.setWoocommerceSettings()
        // set payment gateway settings
        await adminPage.setupBasicPaymentMethods()
        // add product categories
        await adminPage.addCategory('Shirts')
        // add product attributes
        await adminPage.addAttributes(data.product.attribute, data.product.attributeTerms)
        // add dokan subscriptions
        await adminPage.addDokanSubscription(data.product.name.dokanSubscription, data.product.price, data.product.category, data.product.vendor[0])
        //TODO: Modules activation confirmation
        //TODO: DOKAN settings setup
        //TODO: Vendor settings setup



        // vendor setup
        // add vendor1
        await vendorPage.vendorRegister(process.env.VENDOR, process.env.VENDOR_PASSWORD, data.vendorInfo.firstName, data.vendorInfo.lastName, data.vendorInfo.shopName, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.phone, true, data.vendorSetupWizard)
        //add products
        await vendorPage.addSimpleProduct('p1_v1 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p2_v1 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p1_F1_v1 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p2_F2_v1 (simple)', data.product.price, data.product.category)
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
        // //add coupons
        await vendorPage.addCoupon('COUPON_V1', data.coupon.amount)
        await vendorPage.vendorLogout()

        // add vendor2
        await vendorPage.vendorRegister(process.env.VENDOR2, process.env.VENDOR_PASSWORD, data.vendorInfo.firstName, data.vendorInfo.lastName, data.vendorInfo.shopName, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.phone, true, data.vendorSetupWizard)
        //add products
        await vendorPage.addSimpleProduct('p1_v2 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p2_v2 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p1_F1_v2 (simple)', data.product.price, data.product.category)
        await vendorPage.addSimpleProduct('p2_F2_v2 (simple)', data.product.price, data.product.category)
        await vendorPage.addVariableProduct('p1_v2 (variable)', data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
        await vendorPage.addSimpleSubscription('p1_v2 (simple subscription)', data.product.price, data.product.category)
        await vendorPage.addVariableSubscription('p1_v2 (variable subscription)', data.product.price, data.product.category, data.product.attribute, data.product.attributeTerms)
        await vendorPage.addExternalProduct('p1_v2 (external)', data.product.price, data.product.category)
        await vendorPage.addAuctionProduct('p1_v2 (auction)', data.product.auctionPrice, data.product.auction.startDate, data.product.auction.endDate, data.product.category)
        await vendorPage.addBookingProduct('p1_v2 (booking)', data.product.booking.category, data.product.booking.bookingDurationType, data.product.booking.bookingDuration, data.product.booking.bookingDurationUnit, data.product.booking.calenderDisplayMode, data.product.booking.maxBookingsPerBlock, data.product.booking.minimumBookingWindowIntoTheFutureDate, data.product.booking.minimumBookingWindowIntoTheFutureDateUnit, data.product.booking.maximumBookingWindowIntoTheFutureDate, data.product.booking.maximumBookingWindowIntoTheFutureDateUnit, data.product.booking.baseCost, data.product.booking.blockCost)
        //add discount product
        await vendorPage.addSimpleProduct('p1_v2 (sale)', data.product.price, data.product.category)
        //add minmax products
        await vendorPage.addSimpleProduct('p1_v2 (minmax)', data.product.price, data.product.category)
        //add coupons
        await vendorPage.addCoupon('COUPON_V2', data.coupon.amount)
        await vendorPage.vendorLogout()

        //TODO: add address
        //TODo: add store location
        //TODO: add rma



        //customer setup
        // add customer1
        await customerPage.customerRegister(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addBillingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, data.customerInfo.userEmail)
        await customerPage.addShippingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
        await customerPage.customerLogout()

        // add customer2
        await customerPage.customerRegister(process.env.CUSTOMER2, process.env.CUSTOMER_PASSWORD)
        await loginPage.login(process.env.CUSTOMER2, process.env.CUSTOMER_PASSWORD)
        await customerPage.addBillingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, data.customerInfo.userEmail)
        await customerPage.addShippingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
        await customerPage.customerLogout()
    }, timeout)

})