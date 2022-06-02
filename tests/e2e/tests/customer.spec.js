require('dotenv').config()
const loginPage = require('../pages/login.js')
const adminPage = require('../pages/admin.js')
const vendorPage = require('../pages/vendor.js')
const customerPage = require('../pages/customer.js')
const data = require('../utils/testData.js')
const { faker } = require('@faker-js/faker')
const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('customer functionality test', () => {
    // beforeAll(async () => {
    // await customerPage.customerRegisterIfNotExists(process.env.CUSTOMER , process.env.CUSTOMER_PASSWORD)
    // await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    // await customerPage.addBillingAddress(process.env.CUSTOMER, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, process.env.CUSTOMER + '@gmail.com')
    // await customerPage.addShippingAddress(process.env.CUSTOMER, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
    // await customerPage.customerLogout()
    // },timeout)
    // afterAll(async () => {await browser.close()})
    // beforeEach(async () => {})
    // afterEach(async () => {})


    it.only('setup', async () => {
        await loginPage.adminLogin(process.env.ADMIN, process.env.ADMIN_PASSWORD)
        // check plugin is installed
        // set wp general settings & permalink settings
        await adminPage.setWpSettings()
        // set wooCommerce settings
        await adminPage.setWoocommerceSettings()
    }, timeout)

    it.only('customer register', async () => {
        await customerPage.customerRegister(data.customerInfo.userEmail, data.customerInfo.password)
        await customerPage.customerLogout()
    }, timeout)

    it.only('customer login', async () => {
        await customerPage.customerRegister(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    }, timeout)

    it.only('customer logout', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.customerLogout()
    }, timeout)

    it.skip('customer become a vendor', async () => {
        await customerPage.customerRegister(faker.internet.email(), data.customerInfo.password)
        await customerPage.customerBecomeVendor(data.vendorInfo.firstName, data.vendorInfo.lastName, data.vendorInfo.shopName, data.vendorInfo.street1, data.vendorInfo.phone, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban)
        await vendorPage.vendorSetupWizardChoice(true, data.vendorSetupWizard)
    }, timeout)

    it.only('customer become a wholesale customer', async () => {
        await customerPage.customerRegister(faker.internet.email(), data.customerInfo.password)
        await customerPage.customerBecomeWholesaleCustomer()
    }, timeout)

    it.only('customer add customer details', async () => {
        await customerPage.customerRegister(faker.internet.email(), data.customerInfo.password)
        await customerPage.addCustomerDetails(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.firstName, data.customerInfo.userEmail, data.customerInfo.password, data.customerInfo.password1)
    }, timeout)

    it.only('customer add billing details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addBillingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, data.customerInfo.userEmail)
    }, timeout)

    it.only('customer add shipping details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addShippingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
    }, timeout)

    it('customer can buy product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.clearCart()
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop(data.simpleProduct[0])
        await customerPage.goToCartFromShop()
        await customerPage.goToCheckoutFromCart()
        await customerPage.placeOrder()
    }, timeout)

    it('customer can review product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.reviewProduct(data.simpleProduct[0], data.product.rating)
    }, timeout)

    it('customer can report product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.reportProduct(data.simpleProduct[0], data.product.reportReason, data.product.reportReasonDescription)
    }, timeout)

    it('customer can enquire product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.enquireProduct(data.simpleProduct[0], data.product.enquiryDetails)
    }, timeout)

    it('customer can search product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.searchProduct(data.simpleProduct[0])
    }, timeout)

    it('customer can apply coupon', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop(data.simpleProduct[0])
        await customerPage.goToCartFromShop()
        await customerPage.applyCoupon(data.couponCode[0])
    }, timeout)

    it('customer can add product to cart', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop(data.simpleProduct[0])
        await customerPage.goToCartFromShop()
        await customerPage.goToCheckoutFromCart()
        await customerPage.placeOrder()
    }, timeout)

    it('customer can search vendor', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.searchVendor(process.env.VENDOR)
    }, timeout)

    it('customer can follow vendor', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.followVendor(process.env.VENDOR)
    }, timeout)

    it('customer can review store', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.reviewStore(process.env.VENDOR, data.store.rating, data.store.storeReviewTitle, data.store.storeReviewMessage)
    }, timeout)

    it('customer can ask for get support ', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.askForGetSupport(process.env.VENDOR, data.customerInfo.getSupportSubject, data.customerInfo.getSupportMessage)
    }, timeout)

    it.skip('customer can add payment method', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addPaymentMethod(data.card.strip.striptNon3D, data.card.strip.expiryDate, data.card.strip.cvc)
        await customerPage.deletePaymentMethod()
    }, timeout)

    it.skip('customer can send return request ', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        let cOrderDetails = await customerPage.buyProduct(data.simpleProduct[0], false, true)
        await loginPage.switchUser(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        await vendorPage.changeOrderStatus(cOrderDetails.orderNumber, data.orderStatus[1])
        await customerPage.sendWarrantyRequest(cOrderDetails.orderNumber, data.simpleProduct[0], data.order.refundRequestType, data.order.refundRequestReasons, data.order.refundRequestDetails)
    }, timeout)


})






