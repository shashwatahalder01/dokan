const base = require("../pages/base.js")
const customerPage = require('../pages/customer.js')
const loginPage = require('../pages/login.js')
const selector = require("../pages/selectors.js")
const helpers = require("../../e2e/utils/helpers.js")
const { faker } = require('@faker-js/faker')



module.exports = {



    // methods



    //-------------------------------------------------- navigation ---------------------------------------------------//



    async goToVendorDashboard() {
        await base.goIfNotThere('dashboard')

        const url = await page.url()
        expect(url).toMatch('dashboard')
    },

    //-------------------------------------------------- setup wizard ---------------------------------------------------//


    // vendor logout
    async vendorLogout() {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.frontend.vendorLogout)

        let loggedInUser = await base.getCurrentUser()
        expect(loggedInUser).toBeUndefined()

        // let homeIsVisible = await base.isVisible(selector.frontend.home)
        // expect(homeIsVisible).toBe(true)
    },



    //-------------------------------------------------- setup wizard ---------------------------------------------------//


    //vendor register if not exists
    async vendorRegisterIfNotExists(userEmail, password, firstName, lastName, shopName, companyName, companyId, vatNumber, bankName, bankIban, phone, setupWizardChoice, setupWizardData) {
        let UserExists = await loginPage.checkUserExists(userEmail, password)
        if (!UserExists) {
            await this.vendorRegister(userEmail, password, firstName, lastName, shopName, companyName, companyId, vatNumber, bankName, bankIban, phone, setupWizardChoice, setupWizardData)
        }
    },

    //vendor registration
    async vendorRegister(userEmail, password, firstName, lastName, shopName, companyName, companyId, vatNumber, bankName, bankIban, phone, setupWizardChoice, setupWizardData) {
        await customerPage.goToMyAccount()
        let loginIsVisible = await base.isVisible(selector.customer.cRegistration.regEmail)
        if (!loginIsVisible) {
            await customerPage.customerLogout()
        }

        await base.clearAndType(selector.vendor.vRegistration.regEmail, userEmail + '@gmail.com')
        await base.clearAndType(selector.vendor.vRegistration.regPassword, password)
        await base.click(selector.vendor.vRegistration.regVendor)
        await base.clearAndType(selector.vendor.vRegistration.firstName, firstName)
        await base.clearAndType(selector.vendor.vRegistration.lastName, lastName)
        await base.clearAndType(selector.vendor.vRegistration.shopName, shopName)
        // await base.clearAndType(selector.vendor.shopUrl, shopUrl)
        await page.click(selector.vendor.vRegistration.shopUrl)
        await base.clearAndType(selector.vendor.vRegistration.companyName, companyName)
        await base.clearAndType(selector.vendor.vRegistration.companyId, companyId)
        await base.clearAndType(selector.vendor.vRegistration.vatNumber, vatNumber)
        await base.clearAndType(selector.vendor.vRegistration.bankName, bankName)
        await base.clearAndType(selector.vendor.vRegistration.bankIban, bankIban)
        await base.clearAndType(selector.vendor.vRegistration.phone, phone)
        let termsAndConditionsIsVisible = await base.isVisible(selector.customer.cDashboard.termsAndConditions)
        if (termsAndConditionsIsVisible) {
            await base.check(selector.customer.cDashboard.termsAndConditions)
        }

        let subscriptionPackIsVisible = await base.isVisible(selector.vendor.vRegistration.subscriptionPack)
        if (subscriptionPackIsVisible) {
            await base.selectOptionByText(selector.vendor.vRegistration.subscriptionPack,selector.vendor.vRegistration.subscriptionPackOptions, "Dokan_subscription_Non_recurring")
        }
                
        await base.clickAndWait(selector.vendor.vRegistration.register)
        let registrationErrorIsVisible = await base.isVisible(selector.customer.cWooSelector.wooCommerceError)
        if (registrationErrorIsVisible) {
            let errorMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceError)
            if (errorMessage.includes('Error: An account is already registered with your email address. Please log in.')) {
                return
                //  await loginPage.login(userEmail, password)
            }
        }

        await this.vendorSetupWizardChoice(setupWizardChoice, setupWizardData)
    },

    async vendorSetupWizardChoice(setupWizardChoice, setupWizardData) {

        if (setupWizardChoice) {
            await this.vendorSetupWizard(
                setupWizardData.storeProductsPerPage, setupWizardData.street1, setupWizardData.street2, setupWizardData.city, setupWizardData.zipCode,
                setupWizardData.country, setupWizardData.state, setupWizardData.paypal, setupWizardData.bankAccountName, setupWizardData.bankAccountType, setupWizardData.bankAccountNumber,
                setupWizardData.bankName, setupWizardData.bankAddress, setupWizardData.bankRoutingNumber, setupWizardData.bankIban, setupWizardData.bankSwiftCode,
                setupWizardData.customPayment, setupWizardData.skrill)
        }
        else {
            await base.clickAndWait(selector.vendor.vSetup.notRightNow)

            let dashboardIsVisible = await base.isVisible(selector.vendor.vDashboard.dashboard)
            expect(dashboardIsVisible).toBe(true)
        }

    },

    //vendor setup wizard
    async vendorSetupWizard(storeProductsPerPage, street1, street2, city, zipCode, country, state, paypal, bankAccountName, bankAccountType, bankAccountNumber, bankName, bankAddress, bankRoutingNumber, bankIban, bankSwiftCode, customPayment, skrill) {
        await page.click(selector.vendor.vSetup.letsGo)

        await base.clearAndType(selector.vendor.vSetup.storeProductsPerPage, storeProductsPerPage)
        await page.type(selector.vendor.vSetup.street1, street1)
        await page.type(selector.vendor.vSetup.street2, street2)
        await page.type(selector.vendor.vSetup.city, city)
        await page.type(selector.vendor.vSetup.zipCode, zipCode)
        await page.click(selector.vendor.vSetup.country)
        await page.type(selector.vendor.vSetup.countryInput, country)
        await page.keyboard.press('Enter')
        await page.type(selector.vendor.vSetup.state, state)
        await page.keyboard.press('Enter')
        await base.click(selector.vendor.vSetup.email)
        await base.clickAndWait(selector.vendor.vSetup.continueStoreSetup)

        await base.clearAndType(selector.vendor.vSetup.paypal, paypal)

        await base.type(selector.vendor.vSetup.bankAccountName, bankAccountName)
        await base.select(selector.vendor.vSetup.bankAccountType, bankAccountType)
        await base.type(selector.vendor.vSetup.bankRoutingNumber, bankRoutingNumber)
        await base.type(selector.vendor.vSetup.bankAccountNumber, bankAccountNumber)
        await base.type(selector.vendor.vSetup.bankName, bankName)
        await base.type(selector.vendor.vSetup.bankAddress, bankAddress)
        await base.type(selector.vendor.vSetup.bankIban, bankIban)
        await base.type(selector.vendor.vSetup.bankSwiftCode, bankSwiftCode)
        await base.check(selector.vendor.vSetup.declaration)

        await base.type(selector.vendor.vSetup.customPayment, customPayment)

        await base.clearAndType(selector.vendor.vSetup.skrill, skrill)
        await base.clickAndWait(selector.vendor.vSetup.continuePaymentSetup)

        await base.clickAndWait(selector.vendor.vSetup.goToStoreDashboard)

        let dashboardIsVisible = await base.isVisible(selector.vendor.vDashboard.dashboard)
        expect(dashboardIsVisible).toBe(true)

    },



    //-------------------------------------------------- products ---------------------------------------------------//



    //vendor add simple product
    async addSimpleProduct(productName, productPrice, category) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.products)

        //add new simple product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.clickAndWait(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())
    },

    //vendor add variable product
    async addVariableProduct(productName, productPrice, category, attribute, attributeTerms) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.products)

        //add new variable product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.clickAndWait(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'variable')
        //add variation
        await page.select(selector.vendor.product.customProductAttribute, `pa_${attribute}`)
        await base.wait(1)
        await page.click(selector.vendor.product.addAttribute)
        await base.waitForSelector(selector.vendor.product.selectAll)
        await page.click(selector.vendor.product.selectAll)
        await base.click(selector.vendor.product.usedForVariations)
        await base.waitForSelector(selector.vendor.product.saveAttributes)
        await page.click(selector.vendor.product.saveAttributes)

        await base.waitForSelector(selector.vendor.product.addVariations)
        await page.select(selector.vendor.product.addVariations, 'link_all_variations')
        await base.wait(1)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.confirmGo)
        await page.click(selector.vendor.product.confirmGo)
        await base.wait(1)
        await page.click(selector.vendor.product.okSuccessAlertGo)
        await base.wait(1)

        await page.select(selector.vendor.product.addVariations, 'variable_regular_price')
        await base.wait(1)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.variationPrice)
        await page.type(selector.vendor.product.variationPrice, '100')
        await page.click(selector.vendor.product.okVariationPrice)

        await base.waitForSelector(selector.vendor.product.saveProduct)
        await base.clickAndWait(selector.vendor.product.saveProduct)
        await base.wait(1)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add simple subscription product
    async addSimpleSubscription(productName, productPrice, category) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.products)

        //add new simple subscription product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.clickAndWait(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'subscription')
        await page.type(selector.vendor.product.subscriptionPrice, productPrice)
        await page.select(selector.vendor.product.subscriptionPeriodInterval, '1')
        await page.select(selector.vendor.product.subscriptionPeriod, 'month')
        await page.select(selector.vendor.product.expireAfter, '0')
        await page.type(selector.vendor.product.subscriptionTrialLength, '0')
        await page.select(selector.vendor.product.subscriptionTrialPeriod, 'day')

        await base.clickAndWait(selector.vendor.product.saveProduct)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add variable subscription product
    async addVariableSubscription(productName, productPrice, category, attribute, attributeTerms) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.products)

        //add new variable subscription product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.clickAndWait(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'variable-subscription')
        await base.wait(1)

        //add variation
        //TODO: create attribute if not exists
        await page.select(selector.vendor.product.customProductAttribute, `pa_${attribute}`)
        await page.click(selector.vendor.product.addAttribute)
        await base.waitForSelector(selector.vendor.product.selectAll)
        await page.click(selector.vendor.product.selectAll)
        await base.click(selector.vendor.product.usedForVariations)
        await base.waitForSelector(selector.vendor.product.saveAttributes)
        await page.click(selector.vendor.product.saveAttributes)

        await base.waitForSelector(selector.vendor.product.addVariations)
        await page.select(selector.vendor.product.addVariations, 'link_all_variations')
        await base.wait(1)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.confirmGo)
        await page.click(selector.vendor.product.confirmGo)
        await base.wait(1)
        await page.click(selector.vendor.product.okSuccessAlertGo)
        await base.wait(1)

        await page.select(selector.vendor.product.addVariations, 'variable_regular_price')
        await base.wait(1)
        await page.click(selector.vendor.product.go)
        await base.waitForSelector(selector.vendor.product.variationPrice)
        await page.type(selector.vendor.product.variationPrice, '100')
        await page.click(selector.vendor.product.okVariationPrice)

        await base.waitForSelector(selector.vendor.product.saveProduct)
        await base.clickAndWait(selector.vendor.product.saveProduct)
        await base.wait(1)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add external product
    async addExternalProduct(productName, productPrice, category) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.products)

        //add new external product
        await page.click(selector.vendor.product.addNewProduct)
        await page.type(selector.vendor.product.productName, productName)
        await page.type(selector.vendor.product.productPrice, productPrice)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')
        await base.clickAndWait(selector.vendor.product.createProduct)

        let createdProduct = await base.getElementValue(selector.vendor.product.title)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

        //edit product
        await page.select(selector.vendor.product.productType, 'external')
        await page.type(selector.vendor.product.productUrl, await base.getBaseUrl() + '/shop/uncategorized/subscription_handcrafted-granite-chicken/')
        await page.type(selector.vendor.product.buttonText, 'Buy product')
        await base.clearAndType(selector.vendor.product.price, productPrice)

        await base.clickAndWait(selector.vendor.product.saveProduct)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //vendor add auction product
    async addAuctionProduct(productName, productPrice, startDate, endDate, category) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.auction)

        //add new auction product
        await base.clickAndWait(selector.vendor.vAuction.addNewActionProduct)
        await page.type(selector.vendor.vAuction.productName, faker.commerce.productName() + (' (Auction)'))
        // await page.type(selector.vendor.vAuction.productShortDescription, productShortDescription)
        await page.click(selector.vendor.product.productCategory)
        await page.type(selector.vendor.product.productCategoryInput, category)
        await page.keyboard.press('Enter')

        // await page.select(selector.vendor.vAuction.itemCondition, itemCondition)
        // await page.select(selector.vendor.vAuction.actionType, actionType)
        await page.type(selector.vendor.vAuction.startPrice, productPrice)
        await page.type(selector.vendor.vAuction.bidIncrement, '50')
        await page.type(selector.vendor.vAuction.reservedPrice, String(Number(productPrice) + 400))
        await page.type(selector.vendor.vAuction.buyItNowPrice, String(Number(productPrice) + 900))
        // await base.setElementAttributeValue(selector.vendor.vAuction.auctionStartDate, 'readonly') 
        // await base.type(selector.vendor.vAuction.auctionStartDate, '2022-04-05 10:15') 
        // await base.wait(10)
        // await base.setElementAttributeValue(selector.vendor.vAuction.auctionStartDate, '2022-04-05 15:15') 
        // await base.setElementAttributeValue(selector.vendor.vAuction.auctionEndDate, '2022-04-05 15:15') 
        await page.click(selector.vendor.vAuction.auctionStartDate, startDate) //TODO: handle date using datepicker or use core input filed 
        await page.type(selector.vendor.vAuction.auctionStartDate, startDate) //TODO: handle date using datepicker or use core input filed 
        await page.click(selector.vendor.vAuction.auctionEndDate, endDate)
        await page.type(selector.vendor.vAuction.auctionEndDate, endDate)

        await base.clickAndWait(selector.vendor.vAuction.addAuctionProduct)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('× Success! The product has been updated successfully. View Product →')//TODO: update assertion text)

    },

    //vendor add booking product
    async addBookingProduct(productName, category, bookingDurationType, bookingDuration, bookingDurationUnit, calenderDisplayMode, maxBookingsPerBlock,
        minimumBookingWindowIntoTheFutureDate, minimumBookingWindowIntoTheFutureDateUnit, maximumBookingWindowIntoTheFutureDate, maximumBookingWindowIntoTheFutureDateUnit, baseCost, blockCost) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.booking)
        await base.clickAndWait(selector.vendor.vBooking.addNewBookingProduct)

        //add new booking product
        await page.type(selector.vendor.vBooking.productName, productName)
        await page.click(selector.vendor.vBooking.productCategory)
        await page.type(selector.vendor.vBooking.productCategoryInput, category)
        await page.keyboard.press('Enter')

        // general Booking options
        await page.select(selector.vendor.vBooking.bookingDurationType, bookingDurationType)
        await base.clearAndType(selector.vendor.vBooking.bookingDuration, bookingDuration)
        await page.select(selector.vendor.vBooking.bookingDurationUnit, bookingDurationUnit)

        await page.select(selector.vendor.vBooking.calenderDisplayMode, calenderDisplayMode)
        await base.check(selector.vendor.vBooking.enableCalendarRangePicker)

        //availability
        await base.clearAndType(selector.vendor.vBooking.maxBookingsPerBlock, maxBookingsPerBlock)
        await base.clearAndType(selector.vendor.vBooking.minimumBookingWindowIntoTheFutureDate, minimumBookingWindowIntoTheFutureDate)
        await page.select(selector.vendor.vBooking.minimumBookingWindowIntoTheFutureDateUnit, minimumBookingWindowIntoTheFutureDateUnit)
        await base.clearAndType(selector.vendor.vBooking.maximumBookingWindowIntoTheFutureDate, maximumBookingWindowIntoTheFutureDate)
        await page.select(selector.vendor.vBooking.maximumBookingWindowIntoTheFutureDateUnit, maximumBookingWindowIntoTheFutureDateUnit)

        //costs
        await page.type(selector.vendor.vBooking.baseCost, baseCost)
        await page.type(selector.vendor.vBooking.blockCost, blockCost)

        await base.clickAndWait(selector.vendor.vBooking.saveProduct)

        let createdProduct = await base.getElementValue(selector.vendor.vBooking.productName)
        expect(createdProduct.toLowerCase()).toBe(productName.toLowerCase())

    },

    //vendor search similar product
    async searchSimilarProduct(productName) {
        await page.click(selector.vendor.vSearchSimilarProduct.search)
        await page.type(selector.vendor.SearchSimilarProduct.search, productName)
        await base.clickAndWait(selector.vendor.vSearchSimilarProduct.search)
        await page.click(selector.vendor.vSearchSimilarProduct.search)
    },



    //-------------------------------------------------- coupons ---------------------------------------------------//



    //vendor add coupon
    async addCoupon(couponTitle, couponAmount) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.coupons)
        await base.clickAndWait(selector.vendor.vCoupon.addNewCoupon)
        await page.type(selector.vendor.vCoupon.couponTitle, couponTitle)
        await page.type(selector.vendor.vCoupon.amount, couponAmount)
        await page.click(selector.vendor.vCoupon.selectAll)
        await page.click(selector.vendor.vCoupon.applyForNewProducts)
        await page.click(selector.vendor.vCoupon.showOnStore)
        await base.clickAndWait(selector.vendor.vCoupon.createCoupon)
        let couponError = await base.isVisible(selector.vendor.vCoupon.couponError)
        if (couponError) {
            let errorMessage = await base.getElementText(selector.vendor.vCoupon.couponError)
            if (errorMessage.includes('Coupon title already exists')) {
                return
            }
        }

        let createdCoupon = await base.getElementText(selector.vendor.vCoupon.createdCoupon)
        expect(createdCoupon.toLowerCase()).toBe(couponTitle.toLowerCase())
    },



    //-------------------------------------------------- withdraw ---------------------------------------------------//



    //vendor request withdraw 
    async requestWithdraw(withdrawMethod, withdrawAmount) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.withdraw)

        // try {
        //     let canRequestIsVisible = await base.isVisible(selector.vendor.vWithdraw.cancelRequest)
        //     expect(canRequestIsVisible).toBe(false)
        // } catch (err) {
        //     throw new Error("Vendor already requested for withdraw")
        // }

        let canRequestIsVisible = await base.isVisible(selector.vendor.vWithdraw.cancelRequest)
        if (canRequestIsVisible) {
            await base.clickAndWait(selector.vendor.vWithdraw.cancelRequest)
            await base.clickAndWait(selector.vendor.vWithdraw.withdrawDashboard)
        }

        let minimumWithdrawAmount = await base.getElementText(selector.vendor.vWithdraw.minimumWithdrawAmount)
        minimumWithdrawAmount = helpers.price(minimumWithdrawAmount)
        // console.log(minimumWithdrawAmount)
        let balance = await base.getElementText(selector.vendor.vWithdraw.balance)
        balance = helpers.price(balance)
        // console.log(balance)

        if (balance > minimumWithdrawAmount) {
            await page.click(selector.vendor.vWithdraw.requestWithdraw)
            await base.clearAndType(selector.vendor.vWithdraw.withdrawAmount, String(minimumWithdrawAmount))
            await base.wait(2)
            await page.select(selector.vendor.vWithdraw.withdrawMethod, withdrawMethod)
            await base.clickAndWait(selector.vendor.vWithdraw.submitRequest)

            let canRequestIsVisible = await base.isVisible(selector.vendor.vWithdraw.cancelRequest)
            expect(canRequestIsVisible).toBe(true)
        } else {

            throw new Error("Vendor balance is less than minimum withdraw amount")
        }
    },

    //vendor cancel withdraw request
    async cancelRequestWithdraw() {
        await base.clickAndWait(selector.vendor.vDashboard.withdraw)
        await base.clickAndWait(selector.vendor.vWithdraw.cancelRequest)
        await base.clickAndWait(selector.vendor.vWithdraw.withdrawDashboard)

        let canRequestIsVisible = await base.isVisible(selector.vendor.vWithdraw.cancelRequest)
        expect(canRequestIsVisible).toBe(false)

    },

    //vendor add auto withdraw disbursement schedule
    async addAutoWithdrawDisbursementSchedule(preferredPaymentMethod, preferredSchedule, minimumWithdrawAmount, reserveBalance) {

        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.withdraw)
        await page.click(selector.vendor.vWithdraw.editSchedule)
        await page.select(selector.vendor.vWithdraw.preferredPaymentMethod, preferredPaymentMethod)
        await page.click(selector.vendor.vWithdraw[preferredSchedule])
        // let length = await base.getCount(selector.vendor.withdraw.onlyWhenBalanceIs)
        await page.select(selector.vendor.vWithdraw.onlyWhenBalanceIs, minimumWithdrawAmount)
        await page.select(selector.vendor.vWithdraw.maintainAReserveBalance, reserveBalance)
        await base.clickAndWait(selector.vendor.vWithdraw.changeSchedule)
    },

    // vendor add default withdraw payment methods
    async addDefaultWithdrawPaymentMethods(preferredSchedule) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.withdraw)
        let defaultMethod = base.isVisible(selector.vendor.vWithdraw.customMethodMakeDefault(preferredSchedule))
        if (defaultMethod) {
            await base.clickAndWait(selector.vendor.vWithdraw.customMethodMakeDefault(preferredSchedule))

            let methodStatus = await base.getElementText(selector.vendor.vWithdraw.customMethodMakeDefault(preferredSchedule))
            expect(methodStatus).toMatch('Default')
        } else {
            throw new Error("Withdraw payment method isn\'t set up")
        }

    },

    //vendor add vendor details
    async setVendorDetails(firstName, lastName, email, currentPassword, newPassword) {
        await base.clearAndType(selector.vendor.vendorDetails.firstName, firstName)
        await base.clearAndType(selector.vendor.vendorDetails.lastName, lastName)
        await base.clearAndType(selector.vendor.vendorDetails.email, email)
        await page.type(selector.vendor.vendorDetails.currentPassword, currentPassword)
        await page.type(selector.vendor.vendorDetails.NewPassword, newPassword)
        await page.type(selector.vendor.vendorDetails.confirmNewPassword, newPassword)
        await page.click(selector.vendor.vendorDetails.saveChanges)

    },

    //-------------------------------------------------- vendor settings ---------------------------------------------------//



    //vendor set store settings
    async setStoreSettings(storeName, storeProductsPerPage, phoneNo, street, street2, city, postOrZipCode, country, state, companyName,
        companyIdOrEuidNumber, vatOrTaxNumber, nameOfBank, bankIban, map, minimumOrderAmount, percentage, supportButtonText,
        minimumProductQuantityToPlaceAnOrder, maximumProductQuantityToPlaceAnOrder, minimumAmountToPlaceAnOrder, maximumAmountToPlaceAnOrder) {

        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.settings)

        await this.basicInfoSettings(storeName, storeProductsPerPage, phoneNo, street, street2, city, postOrZipCode, country, state, companyName, companyIdOrEuidNumber, vatOrTaxNumber, nameOfBank, bankIban)
        await this.mapSettings(map)
        await this.termsAndConditionsSettings()
        await this.openingClosingTimeSettings()
        await this.vacationSettings()
        await this.discountSettings()
        await this.biographySettings()
        await this.storeSupportSettings()
        await this.minMaxSettings(minimumProductQuantityToPlaceAnOrder, maximumProductQuantityToPlaceAnOrder, minimumAmountToPlaceAnOrder, maximumAmountToPlaceAnOrder)

        //update settings
        await page.click(selector.vendor.vStoreSettings.updateSettings)

        let successMessage = await base.getElementText(selector.vendor.vSocialProfileSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //vendor set store address 
    async setStoreAddress(street, street2, city, postOrZipCode, country, state) {

        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.settings)

        await base.clearAndType(selector.vendor.vStoreSettings.street, street)
        await base.clearAndType(selector.vendor.vStoreSettings.street2, street2)
        await base.clearAndType(selector.vendor.vStoreSettings.city, city)
        await base.clearAndType(selector.vendor.vStoreSettings.postOrZipCode, postOrZipCode)
        await base.select(selector.vendor.vStoreSettings.country, country)
        await base.select(selector.vendor.vStoreSettings.state, state)

        //update settings
        await page.click(selector.vendor.vStoreSettings.updateSettings)

        let successMessage = await base.getElementText(selector.vendor.vSocialProfileSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //vendor set banner and profile picture settings
    async bannerAndProfilePictureSettings() {
        //upload banner and profile picture  
        await base.removePreviousUploadedImage(selector.vendor.vStoreSettings.bannerImage, selector.vendor.vStoreSettings.removeBannerImage)
        await page.click(selector.vendor.vStoreSettings.banner)
        await base.wpUploadFile('tests/e2e/utils/sampleData/banner.png')
        await base.removePreviousUploadedImage(selector.vendor.vStoreSettings.profilePictureImage, selector.vendor.vStoreSettings.removeProfilePictureImage)
        await page.click(selector.vendor.vStoreSettings.profilePicture)
        await base.wpUploadFile('tests/e2e/utils/sampleData/avatar2.png')
    },

    //vendor set basic info settings
    async basicInfoSettings() {
        // store basic info
        await base.clearAndType(selector.vendor.vStoreSettings.storeName, storeName)
        await base.clearAndType(selector.vendor.vStoreSettings.storeProductsPerPage, storeProductsPerPage)
        await base.clearAndType(selector.vendor.vStoreSettings.phoneNo, phoneNo)

        // address
        await base.clearAndType(selector.vendor.vStoreSettings.street, street)
        await base.clearAndType(selector.vendor.vStoreSettings.street2, street2)
        await base.clearAndType(selector.vendor.vStoreSettings.city, city)
        await base.clearAndType(selector.vendor.vStoreSettings.postOrZipCode, postOrZipCode)
        await page.select(selector.vendor.vStoreSettings.country, country)
        await page.select(selector.vendor.vStoreSettings.state, state)

        //company info
        await base.clearAndType(selector.vendor.vStoreSettings.companyName, companyName)
        await base.clearAndType(selector.vendor.vStoreSettings.companyIdOrEuidNumber, companyIdOrEuidNumber)
        await base.clearAndType(selector.vendor.vStoreSettings.vatOrTaxNumber, vatOrTaxNumber)
        await base.clearAndType(selector.vendor.vStoreSettings.nameOfBank, nameOfBank)
        await base.clearAndType(selector.vendor.vStoreSettings.bankIban, bankIban)
        //email
        await base.check(selector.vendor.vStoreSettings.email)
        //show more products
        await base.check(selector.vendor.vStoreSettings.moreProducts)
    },

    //vendor set map settings
    async mapSettings() {
        //map
        await base.clearAndType(selector.vendor.vStoreSettings.map, map)
        await base.wait(1)
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
    },

    //vendor set terms and conditions settings
    async termsAndConditionsSettings() {
        //terms and conditions
        await base.check(selector.vendor.vStoreSettings.termsAndConditions)
        let termsAndConditionsIframe = await base.switchToIframe(selector.vendor.vStoreSettings.termsAndConditionsIframe)
        await base.iframeClearAndType(termsAndConditionsIframe, selector.vendor.vStoreSettings.termsAndConditionsHtmlBody, 'Terms and Conditions Vendors')
    },

    //vendor set opening closing time settings
    async openingClosingTimeSettings() {
        //store opening closing time
        await base.check(selector.vendor.vStoreSettings.storeOpeningClosingTime)
        await base.wait(1)
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        for (let day of days) {
            await base.click(selector.vendor.vStoreSettings.chooseBusinessDays)
            await base.wait(2)
            await base.type(selector.vendor.vStoreSettings.chooseBusinessDays, day)
            await page.keyboard.press('Enter')
            await base.click(selector.vendor.vStoreSettings.businessDaysTab(day))
            await base.wait(1)
            //individual day settings
            await base.waitForSelector(selector.vendor.vStoreSettings.openingTime(day))
            await base.clearAndType(selector.vendor.vStoreSettings.openingTime(day), '06:00 AM')
            await base.clearAndType(selector.vendor.vStoreSettings.closingTime(day), '11:30 PM')
        }
    },

    //vendor set vacation settings
    async vacationSettings() {
        //vacation
        let noVacationIsSetIsVisible = await base.isVisible(selector.vendor.vStoreSettings.noVacationIsSet)
        if (!noVacationIsSetIsVisible) {
            await base.hover(selector.vendor.vStoreSettings.vacationRow)
            await page.click(selector.vendor.vStoreSettings.deleteSavedVacationSchedule)
            await page.click(selector.vendor.vStoreSettings.confirmDeleteSavedVacationSchedule)
        }
        let vacationDayFrom = helpers.addDays(helpers.currentDate, helpers.getRandomArbitraryInteger(31, 365))
        let vacationDayTo = helpers.addDays(vacationDayFrom, 31)
        await base.check(selector.vendor.vStoreSettings.goToVacation)
        await base.select(selector.vendor.vStoreSettings.closingStyle, 'datewise')
        await base.type(selector.vendor.vStoreSettings.vacationDateRangeFrom, vacationDayFrom)
        await base.type(selector.vendor.vStoreSettings.vacationDateRangeTo, vacationDayTo)
        await base.type(selector.vendor.vStoreSettings.setVacationMessage, 'We are currently out of order')
        await page.click(selector.vendor.vStoreSettings.saveVacationEdit)
    },

    //vendor set discount settings
    async discountSettings(supportButtonText) {
        //discount
        await base.check(selector.vendor.vStoreSettings.enableStoreWideDiscount)
        await base.clearAndType(selector.vendor.vStoreSettings.minimumOrderAmount, minimumOrderAmount)
        await base.clearAndType(selector.vendor.vStoreSettings.percentage, percentage)
    },

    //vendor set biography settings
    async biographySettings(supportButtonText) {
        //biography
        let biographyIframe = await base.switchToIframe(selector.vendor.vStoreSettings.biographyIframe)
        await base.iframeClearAndType(biographyIframe, selector.vendor.vStoreSettings.biographyHtmlBody, 'Vendor biography')
    },

    //vendor set store support settings
    async storeSupportSettings(supportButtonText) {
        //store support
        await base.check(selector.vendor.vStoreSettings.showSupportButtonInStore)
        await base.check(selector.vendor.vStoreSettings.showSupportButtonInSingleProduct)
        await base.clearAndType(selector.vendor.vStoreSettings.supportButtonText, supportButtonText)
    },

    //vendor set minmax settings
    async minMaxSettings(minimumProductQuantityToPlaceAnOrder, maximumProductQuantityToPlaceAnOrder, minimumAmountToPlaceAnOrder, maximumAmountToPlaceAnOrder) {
        //min-max
        await base.check(selector.vendor.vStoreSettings.enableMinMaxQuantities)
        await base.clearAndType(selector.vendor.vStoreSettings.minimumProductQuantityToPlaceAnOrder, minimumProductQuantityToPlaceAnOrder)
        await base.clearAndType(selector.vendor.vStoreSettings.maximumProductQuantityToPlaceAnOrder, maximumProductQuantityToPlaceAnOrder)
        await base.check(selector.vendor.vStoreSettings.enableMinMaxAmount)
        await base.clearAndType(selector.vendor.vStoreSettings.minimumAmountToPlaceAnOrder, minimumAmountToPlaceAnOrder)
        await base.clearAndType(selector.vendor.vStoreSettings.maximumAmountToPlaceAnOrder, maximumAmountToPlaceAnOrder)
        await page.click(selector.vendor.vStoreSettings.clear)
        await page.click(selector.vendor.vStoreSettings.selectAll)
        await base.selectOptionByText(selector.vendor.vStoreSettings.selectCategory, 'Uncategorized')
    },


    //vendor add addons
    async addAddon() {
        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.addons)

        //add addon
        await base.clickAndWait(selector.vendor.vAddonSettings.createNewAddon)
        await base.clearAndType(selector.vendor.vAddonSettings.name, 'Add-ons Group #' + helpers.randomNumber())
        await base.clearAndType(selector.vendor.vAddonSettings.priority, '10')
        await page.click(selector.vendor.vAddonSettings.productCategories,)
        await page.type(selector.vendor.vAddonSettings.productCategories, 'Uncategorized')
        await page.keyboard.press('Enter')

        //Add-on fields
        await page.click(selector.vendor.vAddonSettings.addField)
        await base.select(selector.vendor.vAddonSettings.type, 'multiple_choice')
        await page.select(selector.vendor.vAddonSettings.displayAs, 'select')
        await base.clearAndType(selector.vendor.vAddonSettings.titleRequired, 'Add-on Title')
        await page.select(selector.vendor.vAddonSettings.formatTitle, 'label')
        await page.click(selector.vendor.vAddonSettings.enableDescription)
        await base.clearAndType(selector.vendor.vAddonSettings.addDescription, 'Add-on description')
        await page.click(selector.vendor.vAddonSettings.requiredField)
        await base.clearAndType(selector.vendor.vAddonSettings.enterAnOption, 'Option 1')
        await page.select(selector.vendor.vAddonSettings.optionPriceType, 'flat_fee')
        await base.clearAndType(selector.vendor.vAddonSettings.optionPriceInput, '30')
        await base.clickAndWait(selector.vendor.vAddonSettings.publish)

        let successMessage = await base.getElementText(selector.vendor.vAddonSettings.addonUpdateSuccessMessage)
        expect(successMessage).toMatch('Add-on saved successfully')
    },
    //vendor edit addons
    async editAddon(addon) {
        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.addons)

        //add addon
        await base.clickAndWait(selector.vendor.vAddonSettings.editAddon(addon))
        await base.clearAndType(selector.vendor.vAddonSettings.name, 'Add-ons Group #' + helpers.randomNumber())
        await base.clearAndType(selector.vendor.vAddonSettings.priority, '10')
        await page.click(selector.vendor.vAddonSettings.productCategories,)
        await page.type(selector.vendor.vAddonSettings.productCategories, 'Uncategorized')
        await page.keyboard.press('Enter')

        //Add-on fields
        await page.click(selector.vendor.vAddonSettings.addField)
        await base.select(selector.vendor.vAddonSettings.type, 'multiple_choice')
        await page.select(selector.vendor.vAddonSettings.displayAs, 'select')
        await base.clearAndType(selector.vendor.vAddonSettings.titleRequired, 'Add-on Title')
        await page.select(selector.vendor.vAddonSettings.formatTitle, 'label')
        await page.click(selector.vendor.vAddonSettings.enableDescription)
        await base.clearAndType(selector.vendor.vAddonSettings.addDescription, 'Add-on description')
        await page.click(selector.vendor.vAddonSettings.requiredField)
        await base.clearAndType(selector.vendor.vAddonSettings.enterAnOption, 'Option 1')
        await page.select(selector.vendor.vAddonSettings.optionPriceType, 'flat_fee')
        await base.clearAndType(selector.vendor.vAddonSettings.optionPriceInput, '30')
        await base.clickAndWait(selector.vendor.vAddonSettings.update)

        let successMessage = await base.getElementText(selector.vendor.vAddonSettings.addonUpdateSuccessMessage)
        expect(successMessage).toMatch('Add-on saved successfully')
    },

    //paypal payment settings
    async setPaypal(email) {
        //paypal
        await base.clearAndType(selector.vendor.vPaymentSettings.paypal, email)
        //update settings
        await base.clickAndWait(selector.vendor.vPaymentSettings.updateSettings)

        let successMessage = await base.getElementText(selector.vendor.vPaymentSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //bank transfer payment settings
    async setBankTransfer(bankAccountName, bankAccountNumber, bankName, bankAddress, bankRoutingNumber, bankIban, bankSwiftCode) {
        //bank transfer
        await base.clearAndType(selector.vendor.vPaymentSettings.bankAccountName, bankAccountName)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankAccountNumber, bankAccountNumber)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankName, bankName)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankAddress, bankAddress)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankRoutingNumber, bankRoutingNumber)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankIban, bankIban)
        await base.clearAndType(selector.vendor.vPaymentSettings.bankSwiftCode, bankSwiftCode)
        //update settings
        await base.clickAndWait(selector.vendor.vPaymentSettings.updateSettings)

        let successMessage = await base.getElementText(selector.vendor.vPaymentSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //stripe payment settings
    async setStripe(email) {
        //Stripe
        // await base.clickAndWait(selector.vendor.vPaymentSettings.ConnectWithStripe)
    },

    //paypal marketplace payment settings
    async setPaypalMarketPlace(email) {
        //paypal marketplace
        // await base.clearAndType(selector.vendor.vPaymentSettings.paypalMarketplace, paypalMarketplace)
        // await base.clickAndWait(selector.vendor.vPaymentSettings.paypalMarketplaceSignUp)
    },

    //razorpay payment settings
    async setRazorpay(email) {
        //razorpay
        //     await base.clickAndWait(selector.vendor.vPaymentSettings.rzSignup)
        //  // existing account info
        //     await page.click(selector.vendor.vPaymentSettings.rzIHaveAlreadyAnAccount)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzAccountId, rzAccountId)
        //     await page.click(selector.vendor.vPaymentSettings.rzConnectExistingAccount)
        //  //new account info
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzAccountName, rzAccountName)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzAccountEmail, rzAccountEmail)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzYourCompanyName, rzYourCompanyName)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzYourCompanyType, rzYourCompanyType)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankAccountName, rzBankAccountName)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankAccountNumber, rzBankAccountNumber)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankIfscCode, rzBankIfscCode)
        //     await base.clearAndType(selector.vendor.vPaymentSettings.rzBankAccountType, rzBankAccountType)
        //     await base.clickAndWait(selector.vendor.vPaymentSettings.rzConnectAccount)
    },

    //custom payment settings
    async setCustom(emailOrPhone) {
        //custom payment method
        await base.clearAndType(selector.vendor.vPaymentSettings.customPayment, emailOrPhone)
        //update settings
        await base.clickAndWait(selector.vendor.vPaymentSettings.updateSettings)

        let successMessage = await base.getElementText(selector.vendor.vPaymentSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //skrill payment settings
    async setSkrill(email) {
        //skrill
        await base.clearAndType(selector.vendor.skrill.email, email)
        //update settings
        await base.clickAndWait(selector.vendor.vPaymentSettings.updateSettings)

        let successMessage = await base.getElementText(selector.vendor.vPaymentSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //vendor set payment settings
    async setPaymentSettings() {

        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.payment)

        await this.setPaypal()
        await this.setBankTransfer()
        await this.setStripe()
        await this.setPaypalMarketPlace()
        await this.setRazorpay()
        await this.setCustom()
        await this.setSkrill()

    },

    //vendor send id verification request
    async sendIdVerificationRequest() {
        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.verification)
        await base.wait(2)

        //id verification
        let cancelRequestIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.cancelIdVerificationRequest)
        if (cancelRequestIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.cancelIdVerificationRequest)
            await base.wait(2)
        }
        await page.click(selector.vendor.vVerificationSettings.startIdVerification)
        await base.wait(1)
        let previousUploadedImageIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.previousUploadedPhoto)
        if (previousUploadedImageIsVisible) {
            await base.hover(selector.vendor.vVerificationSettings.previousUploadedPhoto)
            await page.click(selector.vendor.vVerificationSettings.removePreviousUploadedPhoto)
            await base.wait(2)
        }
        await base.waitForSelector(selector.vendor.vVerificationSettings.uploadPhoto)
        await page.click(selector.vendor.vVerificationSettings.uploadPhoto)
        await base.wait(2)
        let uploadedMediaIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.uploadedMedia)
        if (uploadedMediaIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.uploadedMedia)
            await base.wait(1)
        } else {
            await base.uploadImage(selector.vendor.vVerificationSettings.selectFiles, 'tests/e2e/utils/sampleData/avatar.png')
        }
        await base.click(selector.vendor.vVerificationSettings.select)
        await page.click(selector.vendor.vVerificationSettings.submitId)
        await base.wait(2)

        let successMessage = await base.getElementText(selector.vendor.vVerificationSettings.idUpdateSuccessMessage)
        expect(successMessage).toMatch('Your ID verification request is Sent and pending approval')
    },

    //vendor send address verification request
    async sendAddressVerificationRequest() {
        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.verification)
        await base.wait(2)

        //company verification
        let cancelRequestIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.cancelAddressVerificationRequest)
        if (cancelRequestIsVisible) {
            await base.click(selector.vendor.vVerificationSettings.cancelAddressVerificationRequest)
            await base.wait(1)
        }
        await page.click(selector.vendor.vVerificationSettings.startAddressVerification)
        await base.wait(1)
        await base.clearAndType(selector.vendor.vVerificationSettings.street, 'abc street')
        await base.clearAndType(selector.vendor.vVerificationSettings.street2, 'xyz street')
        await base.clearAndType(selector.vendor.vVerificationSettings.city, 'New York')
        await base.clearAndType(selector.vendor.vVerificationSettings.postOrZipCode, '10006')
        await base.select(selector.vendor.vVerificationSettings.country, 'US')
        await base.select(selector.vendor.vVerificationSettings.state, 'NY')

        // let previousUploadedImageIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.previousUploadedResidenceProof)
        // if (previousUploadedImageIsVisible) {
        //     await base.hover(selector.vendor.vVerificationSettings.previousUploadedResidenceProof)
        //     await page.click(selector.vendor.vVerificationSettings.removePreviousUploadedResidenceProof)
        //     await base.wait(4)
        // }
        await base.waitForSelector(selector.vendor.vVerificationSettings.uploadResidenceProof)
        await page.click(selector.vendor.vVerificationSettings.uploadResidenceProof)
        await base.wait(2)
        let uploadedMediaIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.uploadedMedia)
        if (uploadedMediaIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.uploadedMedia)
            await base.wait(1)
        } else {
            await base.uploadImage(selector.vendor.vVerificationSettings.selectFiles, 'tests/e2e/utils/sampleData/avatar.png')
        }

        await page.click(selector.vendor.vVerificationSettings.submitAddress)
        await base.wait(2)

        // let successMessage = await base.getElementText(selector.vendor.vVerificationSettings.addressUpdateSuccessMessage)
        // expect(successMessage).toMatch('Your Address verification request is Sent and Pending approval')
    },

    //vendor send company verification request
    async sendCompanyVerificationRequest() {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.verification)
        await base.wait(2)

        //company verification
        let cancelRequestIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.cancelCompanyVerificationRequest)
        if (cancelRequestIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.cancelCompanyVerificationRequest)
            await base.wait(1)
        }
        await page.click(selector.vendor.vVerificationSettings.startCompanyVerification)
        await base.wait(1)
        await page.click(selector.vendor.vVerificationSettings.uploadFiles)
        await base.wait(2)
        let uploadedMediaIsVisible = await base.isVisible(selector.vendor.vVerificationSettings.uploadedMedia)
        if (uploadedMediaIsVisible) {
            await page.click(selector.vendor.vVerificationSettings.uploadedMedia)
            await base.wait(1)
        } else {
            await base.uploadImage(selector.vendor.vVerificationSettings.selectFiles, 'tests/e2e/utils/sampleData/avatar.png')
        }
        await base.click(selector.vendor.vVerificationSettings.select)
        await page.click(selector.vendor.vVerificationSettings.submitCompanyInfo)
        await base.wait(2)

        let successMessage = await base.getElementText(selector.vendor.vVerificationSettings.companyInfoUpdateSuccessMessage)
        expect(successMessage).toMatch('Your company verification request is sent and pending approval')
    },

    //vendor set verification settings
    async setVerificationSettings() {
        await base.goto('dashboard/settings/verification/')
        await this.sendIdVerificationRequest()
        await base.goto('dashboard/settings/verification/')
        await this.sendAddressVerificationRequest()
        await base.goto('dashboard/settings/verification/')
        await this.sendCompanyVerificationRequest()
    },

    //vendor set delivery settings
    async setDeliveryTimeSettings() {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.deliveryTime)

        //delivery support
        await base.check(selector.vendor.vDeliveryTimeSettings.homeDelivery)
        await base.check(selector.vendor.vDeliveryTimeSettings.storePickup)
        await base.clearAndType(selector.vendor.vDeliveryTimeSettings.deliveryBlockedBuffer, '0')

        // let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        let days = ['sunday',] //TODO: not working for multiple days
        for (let day of days) {
            //checkbox
            await base.check(selector.vendor.vDeliveryTimeSettings.deliveryDayCheckbox(day))
            //tab
            await base.click(selector.vendor.vDeliveryTimeSettings.deliveryDayTab(day))
            //individual day settings
            await base.select(selector.vendor.vDeliveryTimeSettings.openingTime(day), '06:00 AM')
            await base.select(selector.vendor.vDeliveryTimeSettings.closingTime(day), '12:00 PM')

            await base.clearAndType(selector.vendor.vDeliveryTimeSettings.timeSlot(day), '300')
            await base.clearAndType(selector.vendor.vDeliveryTimeSettings.orderPerSlot(day), '100')
            // await base.clearAndType(selector.vendor.vDeliveryTimeSettings.timeSlot, '30')
            // await base.clearAndType(selector.vendor.vDeliveryTimeSettings.orderPerSlot, '10')
        }
        await base.clickAndWait(selector.vendor.vDeliveryTimeSettings.deliveryTimeUpdateSettings)

        let successMessage = await base.getElementText(selector.vendor.vDeliveryTimeSettings.deliveryTimeUpdateSettingsSuccessMessage)
        expect(successMessage).toMatch('Delivery settings has been saved successfully!')
    },



    //-------------------------------------------------- vendor shipping settings ---------------------------------------------------//



    //vendor set all shipping settings
    async setALLShippingSettings() {
        await this.goToVendorDashboard()
        await this.setShippingSettings('US', 'Flat Rate', 'flat_rate')
        await this.setShippingSettings('US', 'Free Shipping', 'free_shipping')
        await this.setShippingSettings('US', 'Local Pickup', 'local_pickup')
        await this.setShippingSettings('US', 'Table Rate', 'dokan_table_rate_shipping')
        await this.setShippingSettings('US', 'Distance Rate', 'dokan_distance_rate_shipping')
    },

    //set shipping policies
    async setShippingPolicies(processingTime, shippingPolicy, refundPolicy) {
        await base.clickAndWait(selector.vendor.vShippingSettings.clickHereToAddShippingPolicies)
        await page.select(selector.vendor.vShippingSettings.processingTime, processingTime)//TODO:locator don't work
        await base.clearAndType(selector.vendor.vShippingSettings.shippingPolicy, shippingPolicy)//TODO:locator don't work
        await base.type(selector.vendor.vShippingSettings.refundPolicy, refundPolicy)//TODO:locator don't work
        await base.clickAndWait(selector.vendor.vShippingSettings.shippingPoliciesSaveSettings)

        let successMessage = await base.getElementText(selector.vendor.vShippingSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Settings save successfully')
    },

    //vendor set shipping settings
    async setShippingSettings(shippingZone, shippingMethod, selectShippingMethod) {
        await this.goToVendorDashboard()

        //TODO: admin need to enable shipping settings switch to admin & enable
        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.shipping)

        // await this.setShippingPolicies('3', 'shipping policy', 'refund policy') //TODO:locator don't work

        // edit shipping zone
        await base.hover(selector.vendor.vShippingSettings.shippingZoneCell(shippingZone))
        await base.click(selector.vendor.vShippingSettings.editShippingZone(shippingZone))
        await base.wait(3)

        let methodIsVisible = await base.isVisible(selector.vendor.vShippingSettings.shippingMethodCell(shippingMethod))
        if (!methodIsVisible) {
            await base.click(selector.vendor.vShippingSettings.addShippingMethod)
            await base.wait(2)
            await page.select(selector.vendor.vShippingSettings.shippingMethod, selectShippingMethod)
            await page.click(selector.vendor.vShippingSettings.shippingMethodPopupAddShippingMethod)
            await base.wait(2)
        }

        //edit shipping method
        await base.hover(selector.vendor.vShippingSettings.shippingMethodCell(shippingMethod))
        await base.click(selector.vendor.vShippingSettings.editShippingMethod(shippingMethod))
        await base.wait(2)

        switch (selectShippingMethod) {
            case 'flat_rate':
                //flat rate
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateMethodTitle, shippingMethod)
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateCost, '20')
                await page.select(selector.vendor.vShippingSettings.flatRateTaxStatus, 'taxable')
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateDescription, 'Flat rate')
                await page.select(selector.vendor.vShippingSettings.flatRateCalculationType, 'class')
                break

            case 'free_shipping':
                //free shipping
                await base.clearAndType(selector.vendor.vShippingSettings.freeShippingTitle, shippingMethod)
                await base.clearAndType(selector.vendor.vShippingSettings.freeShippingMinimumOrderAmount, '200')
                break

            case 'local_pickup':
                //local pickup
                await base.clearAndType(selector.vendor.vShippingSettings.localPickupTitle, shippingMethod)
                await base.clearAndType(selector.vendor.vShippingSettings.localPickupCost, '20')
                await page.select(selector.vendor.vShippingSettings.localPickupTaxStatus, 'taxable')
                await base.clearAndType(selector.vendor.vShippingSettings.flatRateDescription, 'Local Pickup')
                break

            case 'dokan_table_rate_shipping':
                //dokan table rate shipping
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMethodTitle, shippingMethod)
                await base.select(selector.vendor.vShippingSettings.tableRateShippingTaxStatus, 'taxable')
                await base.select(selector.vendor.vShippingSettings.tableRateShippingTaxIncludedInShippingCosts, 'no')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingHandlingFee, '10')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMaximumShippingCost, '200')
                //rates
                // await page.select(selector.vendor.vShippingSettings.tableRateShippingCalculationType, 'item')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingHandlingFeePerOrder, '10')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMinimumCostPerOrder, '10')
                await base.clearAndType(selector.vendor.vShippingSettings.tableRateShippingMaximumCostPerOrder, '200')

                await base.click(selector.vendor.vShippingSettings.tableRateShippingUpdateSettings)
                let tableRateSuccessMessage = await base.getElementText(selector.vendor.vShippingSettings.tableRateShippingUpdateSettingsSuccessMessage)
                expect(tableRateSuccessMessage).toMatch('Table rates has been saved successfully!')
                return

            case 'dokan_distance_rate_shipping':
                //dokan distance rate shipping
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingMethodTitle, shippingMethod)
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingTaxStatus, 'taxable')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingTransportationMode, 'driving')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingAvoid, 'none')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingDistanceUnit, 'metric')
                await base.check(selector.vendor.vShippingSettings.distanceRateShippingShowDistance)
                await base.check(selector.vendor.vShippingSettings.distanceRateShippingShowDuration)
                //shipping address
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingAddress1, 'abc street')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingAddress2, 'xyz street')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingCity, 'New York')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingZipOrPostalCode, '10006')
                await base.clearAndType(selector.vendor.vShippingSettings.distanceRateShippingStateOrProvince, 'New York')
                await base.select(selector.vendor.vShippingSettings.distanceRateShippingCountry, 'United States (US)')

                await base.click(selector.vendor.vShippingSettings.distanceRateShippingUpdateSettings)
                let distanceRateSuccessMessage = await base.getElementText(selector.vendor.vShippingSettings.distanceRateShippingUpdateSettingsSuccessMessage)
                expect(distanceRateSuccessMessage).toMatch('Distance rates has been saved successfully!')
                return

            default:
                break
        }

        await page.click(selector.vendor.vShippingSettings.shippingSettingsSaveSettings)
        await base.wait(1)
        await base.click(selector.vendor.vShippingSettings.saveChanges)

        let successMessage = await base.getElementText(selector.vendor.vShippingSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Zone settings save successfully')
    },

    //vendor set social profile settings
    async setSocialProfile(urls) {
        await this.goToVendorDashboard()

        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.socialProfile)

        await base.clearAndType(selector.vendor.vSocialProfileSettings.facebook, urls.facebook)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.twitter, urls.twitter)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.pinterest, urls.pinterest)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.linkedin, urls.linkedin)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.youtube, urls.youtube)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.instagram, urls.instagram)
        await base.clearAndType(selector.vendor.vSocialProfileSettings.flicker, urls.flickr)
        // await page.click(selector.vendor.vSocialProfileSettings.updateSettings) //TODO: save settings button click don't work
        await page.keyboard.press('Enter')

        let successMessage = await base.getElementText(selector.vendor.vSocialProfileSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Your information has been saved successfully')
    },

    //vendor set rma settings
    async setRmaSettings(label, type, length, lengthValue, lengthDuration) {
        await this.goToVendorDashboard()

        //TODO: admin need to enable rma settings switch to admin & enable
        await base.clickAndWait(selector.vendor.vDashboard.settings)
        await base.clickAndWait(selector.vendor.vSettings.rma)

        await base.clearAndType(selector.vendor.vRmaSettings.label, label)
        await page.select(selector.vendor.vRmaSettings.type, type)
        await page.select(selector.vendor.vRmaSettings.length, length)
        await base.clearAndType(selector.vendor.vRmaSettings.lengthValue, lengthValue)
        await page.select(selector.vendor.vRmaSettings.lengthDuration, lengthDuration)

        let refundReasonIsVisible = await base.isVisible(selector.vendor.vRmaSettings.refundReasons)
        if (refundReasonIsVisible) {
            await base.checkMultiple(selector.vendor.vRmaSettings.refundReasons)
        }
        let iframe = await base.switchToIframe(selector.vendor.vRmaSettings.refundPolicyIframe)
        await base.iframeClearAndType(iframe, selector.vendor.vRmaSettings.refundPolicyHtmlBody, 'Refund Policy Vendor')
        await page.click(selector.vendor.vRmaSettings.rmaSaveChanges)

        let successMessage = await base.getElementText(selector.vendor.vRmaSettings.updateSettingsSuccessMessage)
        expect(successMessage).toMatch('Settings saved successfully')

    },


    //----------------------------------------------------Vendor functions---------------------------------------//

    async approveProductReview(reviewMessage) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.reviews)

        // let approvedReviewIsVisible = await base.isVisible(selector.vendor.vReviews.reviewRow(reviewMessage))
        // if (approvedReviewIsVisible) {
        //     expect(approvedReviewIsVisible).toBe(true)
        // }

        await base.clickAndWait(selector.vendor.vReviews.pending)
        await base.hover(selector.vendor.vReviews.reviewRow(reviewMessage))
        await base.click(selector.vendor.vReviews.approveReview(reviewMessage))
        await base.wait(2)
        await base.clickAndWait(selector.vendor.vReviews.approved)

        let reviewIsVisible = await base.isVisible(selector.vendor.vReviews.reviewRow(reviewMessage))
        expect(reviewIsVisible).toBe(true)
    },

    async approveReturnRequest(orderId, productName) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.returnRequest)

        await base.clickAndWait(selector.vendor.vReturnRequest.view(orderId))

        // change order status to refund
        await page.select(selector.vendor.vReturnRequest.changeOrderStatus, 'processing')
        await base.alert('accept')
        await base.clickAndWait(selector.vendor.vReturnRequest.updateOrderStatus)

        //refund request
        await page.click(selector.vendor.vReturnRequest.sendRefund)
        await base.wait(3)
        let tax = String(helpers.price(await base.getElementText(selector.vendor.vReturnRequest.taxAmount(productName))))
        let subTotal = String(helpers.price(await await base.getElementText(selector.vendor.vReturnRequest.subTotal(productName))))
        await base.type(selector.vendor.vReturnRequest.taxRefund, tax)
        await base.type(selector.vendor.vReturnRequest.subTotalRefund, subTotal)
        await base.clickAndWait(selector.vendor.vReturnRequest.sendRequest)

        let successMessage = await base.getElementText(selector.vendor.vReturnRequest.sendRequestSuccessMessage)
        expect(successMessage).toMatch('Already send refund request. Wait for admin approval')

    },

    async deleteReturnRequest(orderId) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.returnRequest)

        await base.hover(selector.vendor.vReturnRequest.returnRequestCell(orderId))
        await base.clickAndWait(selector.vendor.vReturnRequest.delete(orderId))

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch('Return Request has been deleted successfully')
    },

    async overrideRmaSettings(productName, label, type, length, lengthValue, lengthDuration) {

        await this.searchProduct(productName)
        await base.clickAndWait(selector.vendor.product.productLink(productName))
        //override rma settings
        await base.check(selector.vendor.product.overrideYourDefaultRmaSettingsForThisProduct)
        await base.wait(1)

        await base.clearAndType(selector.vendor.product.rmaLabel, label)
        await page.select(selector.vendor.product.rmaType, type)
        await page.select(selector.vendor.product.rmaLength, length)
        await base.clearAndType(selector.vendor.product.rmaLengthValue, lengthValue)
        await page.select(selector.vendor.product.rmaLengthDuration, lengthDuration)

        let refundReasonIsVisible = await base.isVisible(selector.vendor.product.refundReasons)
        if (refundReasonIsVisible) {
            await base.clickAndWaitMultiple(selector.vendor.product.refundReasons)
        }

        await base.clickAndWait(selector.vendor.product.saveProduct)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    //add quantity discount
    async addQuantityDiscount(productName, minimumQuantity, discountPercentage) {
        await this.searchProduct(productName)
        await base.clickAndWait(selector.vendor.product.productLink(productName))

        //add quantity discount
        await base.check(selector.vendor.product.enableBulkDiscount)
        await base.wait(1)
        await base.clearAndType(selector.vendor.product.lotMinimumQuantity, minimumQuantity)
        await base.clearAndType(selector.vendor.product.lotDiscountInPercentage, discountPercentage)

        await base.clickAndWait(selector.vendor.product.saveProduct)

        let productCreateSuccessMessage = await base.getElementText(selector.vendor.product.updatedSuccessMessage)
        expect(productCreateSuccessMessage.replace(/\s+/g, ' ').trim()).toMatch('Success! The product has been saved successfully. View Product →')
    },

    async searchProduct(productName) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.products)
        //search product
        await base.type(selector.vendor.product.searchProduct, productName)
        await base.clickAndWait(selector.vendor.product.search)

        let searchedProductIsVisible = await base.isVisible(selector.vendor.product.productLink(productName))
        expect(searchedProductIsVisible).toBe(true)
    },

    async changeOrderStatus(orderNumber, orderStatus) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.orders)

        await base.clickAndWait(selector.vendor.vOrders.orderLink(orderNumber))
        await page.click(selector.vendor.vOrders.edit)
        await page.select(selector.vendor.vOrders.orderStatus, orderStatus)
        await base.click(selector.vendor.vOrders.updateOrderStatus)
        await base.wait(3)

        let currentOrderStatus = await base.getElementText(selector.vendor.vOrders.currentOrderStatus)
        expect(currentOrderStatus.toLowerCase()).toMatch((orderStatus.replace(/(^wc)|(\W)/g, '')).toLowerCase())
    },

    async refundOrder(orderNumber, productName, partialRefund = false) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.orders)
        await base.clickAndWait(selector.vendor.vOrders.orderLink(orderNumber))

        //request refund
        await page.click(selector.vendor.vOrders.requestRefund)
        let productQuantity = await base.getElementText(selector.vendor.vOrders.productQuantity(productName))
        let productCost = helpers.price(await base.getElementText(selector.vendor.vOrders.productCost(productName)))
        let productTax = helpers.price(await base.getElementText(selector.vendor.vOrders.productTax(productName)))
        await base.type(selector.vendor.vOrders.refundProductQuantity(productName), productQuantity)
        if (partialRefund) {
            await base.click(selector.vendor.vOrders.refundDiv)
            await base.clearAndType(selector.vendor.vOrders.refundProductCostAmount(productName), String(helpers.roundToTwo(productCost / 2)))
            await base.clearAndType(selector.vendor.vOrders.refundProductTaxAmount(productName), String(helpers.roundToTwo(productTax / 2)))
        }
        await base.type(selector.vendor.vOrders.refundReason, 'Defective product')
        await page.click(selector.vendor.vOrders.refundManually)
        await base.wait(1.5)
        await page.click(selector.vendor.vOrders.confirmRefund)
        await base.wait(1.5)

        let successMessage = await base.getElementText(selector.vendor.vOrders.refundRequestSuccessMessage)
        expect(successMessage).toMatch('Refund request submitted.')
        await page.click(selector.vendor.vOrders.refundRequestSuccessMessageOk)
    },


    async getOrderDetails(orderNumber) {
        await this.goToVendorDashboard()
        await base.clickAndWait(selector.vendor.vDashboard.orders)
        let vOrderDetails = {}
        vOrderDetails.vendorEarning = helpers.price(await base.getElementText(selector.vendor.vOrders.vendorEarningTable(orderNumber)))

        await base.clickAndWait(selector.vendor.vOrders.orderLink(orderNumber))
        vOrderDetails.orderNumber = (await base.getElementText(selector.vendor.vOrders.orderNumber)).split('#')[1]
        let refundedOrderTotalIsVisible = await base.isVisible(selector.vendor.vOrders.orderTotalAfterRefund)
        if (refundedOrderTotalIsVisible) {
            vOrderDetails.orderTotalBeforeRefund = helpers.price(await base.getElementText(selector.vendor.vOrders.orderTotalBeforeRefund))
            vOrderDetails.orderTotal = helpers.price(await base.getElementText(selector.vendor.vOrders.orderTotalAfterRefund))
        } else {
            vOrderDetails.orderTotal = helpers.price(await base.getElementText(selector.vendor.vOrders.orderTotal))
        }
        vOrderDetails.orderStatus = (await base.getElementText(selector.vendor.vOrders.currentOrderStatus)).replace('-', ' ')
        let orderDate = (await base.getElementText(selector.vendor.vOrders.orderDate)).split(':')[1].trim()
        vOrderDetails.orderDate = orderDate.substring(0, orderDate.indexOf(',', orderDate.indexOf(',') + 1))
        vOrderDetails.discount = helpers.price(await base.getElementText(selector.vendor.vOrders.discount))
        let shippingMethodIsVisible = await base.isVisible(selector.vendor.vOrders.shippingMethod)
        if (shippingMethodIsVisible) vOrderDetails.shippingMethod = await base.getElementText(selector.vendor.vOrders.shippingMethod)
        vOrderDetails.shippingCost = helpers.price(await base.getElementText(selector.vendor.vOrders.shippingCost))
        let taxIsVisible = await base.isVisible(selector.vendor.vOrders.tax)
        if (taxIsVisible) vOrderDetails.tax = helpers.price(await base.getElementText(selector.vendor.vOrders.tax))
        vOrderDetails.refunded = helpers.price(await base.getElementText(selector.vendor.vOrders.refunded))

        return vOrderDetails
    },

    //get total vendor earnings
    async getTotalVendorEarning() {
        await this.goToVendorDashboard()

        let totalVendorEarning = helpers.price(await base.getElementText(selector.vendor.vDashboard.earning))
        return totalVendorEarning
    },


}
