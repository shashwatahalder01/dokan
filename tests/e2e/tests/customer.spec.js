require('dotenv').config()
const loginPage = require('../pages/login.js')
const vendorPage = require('../pages/vendor.js')
const customerPage = require('../pages/customer.js')
const data = require('../utils/testData.js')
const { faker } = require('@faker-js/faker')
// const timeout = process.env.TIME_OUT
jest.retryTimes(process.env.RETRY_TIMES)

describe('customer functionality test', () => {
    // beforeAll(async () => {})
    // afterAll(async () => {})
    // beforeEach(async () => {})
    // afterEach(async () => {})


    it('customer register', async () => {
        await customerPage.customerRegister(faker.name.firstName(), data.customerInfo.password)
        await customerPage.customerLogout()
    })

    it('customer login', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    })

    it('customer logout', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.customerLogout()
    })

    it('customer become a vendor', async () => {
        await customerPage.customerRegister(faker.name.firstName(), data.customerInfo.password)
        await customerPage.customerBecomeVendor(data.vendorInfo.firstName, data.vendorInfo.lastName, data.vendorInfo.shopName, data.vendorInfo.street1, data.vendorInfo.phone, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban)
        await vendorPage.vendorSetupWizardChoice(false, data.vendorSetupWizard)
    })

    it('customer become a wholesale customer', async () => {
        await customerPage.customerRegister(faker.name.firstName(), data.customerInfo.password)
        await customerPage.customerBecomeWholesaleCustomer()
    })

    it('customer add customer details', async () => {
        await customerPage.customerRegister(faker.name.firstName(), data.customerInfo.password)
        await customerPage.addCustomerDetails(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.firstName, data.customerInfo.userEmail, data.customerInfo.password, data.customerInfo.password1)
    })

    it('customer add billing details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addBillingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.companyId, data.customerInfo.vatNumber, data.customerInfo.bankName, data.customerInfo.bankIban, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode, data.customerInfo.phone, data.customerInfo.userEmail)
    })

    it('customer add shipping details', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.addShippingAddress(data.customerInfo.firstName, data.customerInfo.lastName, data.customerInfo.companyName, data.customerInfo.country, data.customerInfo.street1, data.customerInfo.street2, data.customerInfo.city, data.customerInfo.city, data.customerInfo.zipCode)
    })

    it('customer can buy product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.clearCart()
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop(data.simpleProduct[0])
        await customerPage.goToCartFromShop()
        await customerPage.goToCheckoutFromCart()
        await customerPage.placeOrder()
    })

    it('customer can review product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.reviewProduct(data.simpleProduct[0], data.product.rating)
    })

    it('customer can report product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.reportProduct(data.simpleProduct[0], data.product.reportReason, data.product.reportReasonDescription)
    })

    it('customer can enquire product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.enquireProduct(data.simpleProduct[0], data.product.enquiryDetails)
    })

    it('customer can search product', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.searchProduct(data.simpleProduct[0])
    })

    it('customer can apply coupon', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop(data.simpleProduct[0])
        await customerPage.goToCartFromShop()
        await customerPage.applyCoupon(data.couponCode[0])
    })

    it('customer can add product to cart', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.goToShop()
        await customerPage.addProductToCartFromShop(data.simpleProduct[0])
        await customerPage.goToCartFromShop()
    })

    it('customer can search vendor', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.searchVendor(data.vendorStores[0])
    })

    it('customer can follow vendor', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.followVendor(data.vendorStores[0])
    })

    it.skip('customer can review store', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.reviewStore(data.vendorStores[0], data.store.rating, data.store.storeReviewTitle, data.store.storeReviewMessage)
    })

    it('customer can ask for get support ', async () => {
        await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
        await customerPage.askForGetSupport(data.vendorStores[0], data.customerInfo.getSupportSubject, data.customerInfo.getSupportMessage)
    })

    // it.skip('customer can add payment method', async () => {
    //     await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    //     await customerPage.addPaymentMethod(data.card.strip.striptNon3D, data.card.strip.expiryDate, data.card.strip.cvc)
    //     await customerPage.deletePaymentMethod()
    // })

    // it.skip('customer can send return request ', async () => {
    //     await loginPage.login(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    //     let cOrderDetails = await customerPage.buyProduct(data.simpleProduct[0], false, true)
    //     await loginPage.switchUser(process.env.VENDOR, process.env.VENDOR_PASSWORD)
    //     await vendorPage.changeOrderStatus(cOrderDetails.orderNumber, data.orderStatus[1])
    //     await loginPage.switchUser(process.env.CUSTOMER, process.env.CUSTOMER_PASSWORD)
    //     await customerPage.sendWarrantyRequest(cOrderDetails.orderNumber, data.simpleProduct[0], data.order.refundRequestType, data.order.refundRequestReasons, data.order.refundRequestDetails)
    // })


})






