require('dotenv').config()
const loginPage = require('../pages/login.js')
const vendorPage = require('../pages/vendor.js')
const data = require('../utils/testData.js')
const { faker } = require('@faker-js/faker')
jest.retryTimes(process.env.RETRY_TIMES)

describe('vendor functionality test', () => {
   // beforeAll(async () => {})
   // afterAll(async () => {)
   // beforeEach(async () => {})
   // afterEach(async () => {)


   it('vendor can register', async () => {
      await vendorPage.vendorRegister(faker.name.firstName(), process.env.VENDOR_PASSWORD, data.vendorInfo.firstName, data.vendorInfo.lastName,
         data.vendorInfo.shopName, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.phone, false, data.vendorSetupWizard)
      await vendorPage.vendorLogout()
   })

   it('vendor can login', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
   })

   it('vendor can logout', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.vendorLogout()
   })

   it('vendor can add simple product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addSimpleProduct(data.product.name.simple, data.product.price_frac_comma, data.product.category)
   })

   it('vendor can add variable product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addVariableProduct(data.product.name.variable, data.product.price_frac_comma, data.product.category, data.product.attribute, data.product.attributeTerms)
   })

   it('vendor can add simple subscription product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addSimpleSubscription(data.product.name.simpleSubscription, data.product.price_frac_comma, data.product.category)
   })

   it.skip('vendor can add variable subscription product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addVariableSubscription(data.product.name.variableSubscription, data.product.price_frac_comma, data.product.category, data.product.attribute, data.product.attributeTerms)
   })

   it('vendor can add external product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addExternalProduct(data.product.name.external, data.product.price_frac_comma, data.product.category)
   })

   it('vendor can add auction product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addAuctionProduct(data.product.name.auction, data.product.auctionPrice, data.product.auction.startDate, data.product.auction.endDate, data.product.category)
   })

   it('vendor can add booking product', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addBookingProduct(data.product.booking.productName, data.product.booking.category, data.product.booking.bookingDurationType, data.product.booking.bookingDuration, data.product.booking.bookingDurationUnit, data.product.booking.calenderDisplayMode, data.product.booking.maxBookingsPerBlock, data.product.booking.minimumBookingWindowIntoTheFutureDate, data.product.booking.minimumBookingWindowIntoTheFutureDateUnit, data.product.booking.maximumBookingWindowIntoTheFutureDate, data.product.booking.maximumBookingWindowIntoTheFutureDateUnit, data.product.booking.baseCost, data.product.booking.blockCost)
   })

   it('vendor can add coupon', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addCoupon(data.coupon.title, data.coupon.amount)
   })

   it.skip('vendor can request withdraw', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.requestWithdraw('paypal')
   })

   it.skip('vendor can cancel request withdraw', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.cancelRequestWithdraw()
   })

   it('vendor can add auto withdraw disbursement schedule', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addAutoWithdrawDisbursementSchedule('dokan_custom', 'weekly', '5', '15')
   })

   it.skip('vendor can add default withdraw payment methods ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.addDefaultWithdrawPaymentMethods('Skrill')
      // cleanup
      await vendorPage.addDefaultWithdrawPaymentMethods('PayPal')
   })

   // vendor settings

   it.skip('vendor can set store settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.setStoreSettings(process.env.VENDOR, data.vendorInfo.productsPerPage, data.vendorInfo.phone, data.vendorInfo.street1, data.vendorInfo.street2, data.vendorInfo.city, data.vendorInfo.zipCode, data.vendorInfo.countrySelectValue,
         data.vendorInfo.stateSelectValue, data.vendorInfo.companyName, data.vendorInfo.companyId, data.vendorInfo.vatNumber, data.vendorInfo.bankName, data.vendorInfo.bankIban, data.vendorInfo.mapLocation,
         data.vendorInfo.minimumOrderAmount, data.vendorInfo.minimumOrderAmountPercentage, 'Get Support', data.vendorInfo.minimumProductQuantity, data.vendorInfo.maximumProductQuantity, data.vendorInfo.minimumAmountToPlace, data.vendorInfo.maximumAmountToPlace)
   })

   it('vendor can add addons', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.addAddon()
   })

   it.skip('vendor can edit addon request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.editAddon('Add-ons Group #370')
   })

   it('vendor can send id verification request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.sendIdVerificationRequest()
   })

   it.skip('vendor can send address verification request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.goToVendorDashboard()
      await vendorPage.sendAddressVerificationRequest()
   })

   it('vendor can send company verification request ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.sendCompanyVerificationRequest()
   })

   it('vendor can set delivery time settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setDeliveryTimeSettings()
   })

   it('vendor can set flat rate shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setShippingSettings('US', 'Flat Rate', 'flat_rate')
   })

   it('vendor can set free shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setShippingSettings('US', 'Free Shipping', 'free_shipping')
   })

   it('vendor can set local pickup shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setShippingSettings('US', 'Local Pickup', 'local_pickup')
   })

   it('vendor can set table rate shipping shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setShippingSettings('US', 'Table Rate', 'dokan_table_rate_shipping')
   })

   it('vendor can set dokan distance rate shipping ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setShippingSettings('US', 'Distance Rate', 'dokan_distance_rate_shipping')
   })

   it('vendor can set social profile settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setSocialProfile(data.urls)
   })

   it('vendor can set rma settings ', async () => {
      await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
      await vendorPage.setRmaSettings('Warranty', 'included_warranty', 'limited', '1', 'weeks')
   })


}) 