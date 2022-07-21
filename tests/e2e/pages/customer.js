const loginPage = require('../pages/login.js')
const adminPage = require('../pages/admin.js')
const base = require("../pages/base.js")
const selector = require("../pages/selectors.js")
const helpers = require("../utils/helpers.js")
const { faker } = require('@faker-js/faker')

module.exports = {


    // methods



    //-------------------------------------------------- navigation ---------------------------------------------------//



    async goToMyAccount() {
        await base.goIfNotThere('my-account')

        const url = await page.url()
        expect(url).toMatch('my-account')
    },

    async goToShop() {
        await base.goIfNotThere('shop')

        const url = await page.url()
        expect(url).toMatch('shop')
    },

    async goToStoreList() {
        await base.goIfNotThere('store-listing')

        const url = await page.url()
        expect(url).toMatch('store-listing')
    },

    async goToCart() {
        await base.goIfNotThere('cart')

        const url = await page.url()
        expect(url).toMatch('cart')
    },




    //-------------------------------------------------- customer logout ---------------------------------------------------//



    //customer logout
    async customerLogout() {
        await this.goToMyAccount()
        await base.clickAndWait(selector.frontend.customerLogout)

        let loggedInUser = await base.getCurrentUser()
        expect(loggedInUser).toBeUndefined()
        // let homeIsVisible = await base.isVisible( selector.frontend.home)
        // expect(homeIsVisible).toBe(false)
    },



    //-------------------------------------------------- customer details ---------------------------------------------------//

    //customer register if not exists
    async customerRegisterIfNotExists(userEmail, password) {
        let UserExists = await loginPage.checkUserExists(userEmail, password)
        if (!UserExists) {
            await this.customerRegister(userEmail + '@gmail.com', password)
        }
    },

    //customer register
    async customerRegister(userEmail, password) {
        await this.goToMyAccount()
        let loginIsVisible = await base.isVisible(selector.customer.cRegistration.regEmail)
        if (!loginIsVisible) {
            await this.customerLogout()
        }
        await base.clearAndType(selector.customer.cRegistration.regEmail, userEmail + '@gmail.com')
        await base.clearAndType(selector.customer.cRegistration.regPassword, password)
        await base.click(selector.customer.cRegistration.regCustomer)
        await base.clickAndWait(selector.customer.cRegistration.register)

        let registrationErrorIsVisible = await base.isVisible(selector.customer.cWooSelector.wooCommerceError)
        if (registrationErrorIsVisible) {
            let errorMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceError)
            if (errorMessage.includes('Error: An account is already registered with your email address. Please log in.')) {
                return
                // await loginPage.login(userEmail, password)
            }
        }

        let username = (userEmail.split("@")[0]).toLowerCase()
        let loggedInUser = await base.getCurrentUser()
        expect(loggedInUser).toBe(username)
        // let regWelcomeMessage = await base.getElementText(selector.customer.cRegistration.regCustomerWelcomeMessage)
        // expect(regWelcomeMessage.replace(/\s+/g, ' ').trim()).toMatch(`Hello ${customer} (not ${customer}? Log out)`)
    },


    // //customer register
    // async customerRegister(userEmail, password) {
    //     await this.goToMyAccount()
    //     let loginIsVisible = await base.isVisible(selector.customer.cRegistration.regEmail)
    //     if (!loginIsVisible) {
    //         await this.customerLogout()
    //     }
    //     await page.type(selector.customer.cRegistration.regEmail, userEmail)
    //     await page.type(selector.customer.cRegistration.regPassword, password)
    //     await base.click(selector.customer.cRegistration.regCustomer)
    //     await base.click(selector.customer.cRegistration.register)
    //     await base.wait(3)

    //     let wooCommerceError = await base.isVisible(selector.customer.cWooSelector.wooCommerceError)
    //     if (wooCommerceError) {
    //         let errorMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceError)
    //         expect(errorMessage).toMatch('Error: An account is already registered with your email address. Please log in.')
    //         return
    //     }

    //     await base.waitForNavigation()

    //     let username = (userEmail.split("@")[0]).toLowerCase()
    //     let loggedInUser = await base.getCurrentUser()
    //     expect(loggedInUser).toBe(username)
    //     // let regWelcomeMessage = await base.getElementText(selector.customer.cRegistration.regCustomerWelcomeMessage)
    //     // expect(regWelcomeMessage.replace(/\s+/g, ' ').trim()).toMatch(`Hello ${customer} (not ${customer}? Log out)`)
    // },




    //customer become vendor
    async customerBecomeVendor(firstName, lastName, shopName, address, phone, companyName, companyId, vatNumber, bankName, bankIban) {
        await base.clickAndWait(selector.customer.cDashboard.becomeVendor)
        // vendor registration form
        await base.type(selector.customer.cDashboard.firstName, firstName)
        await base.type(selector.customer.cDashboard.lastName, lastName)
        await base.type(selector.customer.cDashboard.shopName, shopName)
        await base.click(selector.customer.cDashboard.shopUrl)
        await base.type(selector.customer.cDashboard.address, address)
        await base.type(selector.customer.cDashboard.phone, phone)
        await base.type(selector.customer.cDashboard.companyName, companyName)
        await base.type(selector.customer.cDashboard.companyId, companyId)
        await base.type(selector.customer.cDashboard.vatNumber, vatNumber)
        await base.type(selector.customer.cDashboard.bankName, bankName)
        await base.type(selector.customer.cDashboard.bankIban, bankIban)
        await base.clickIfVisible(selector.customer.cDashboard.termsAndConditions)
        let subscriptionPackIsVisible = await base.isVisible(selector.customer.cDashboard.subscriptionPack)
        console.log(subscriptionPackIsVisible)
        await base.click(selector.customer.cDashboard.becomeAVendor)
        await base.wait(4)
        // if (subscriptionPackIsVisible) {
        //     console.log('subscription pack is visible')
        //     await this.placeOrder('bank', false, false, true)//TODO: don't work: handle vendor subscription pack scenario
        // }

    },

    // customer become wholesale customer
    async customerBecomeWholesaleCustomer() {
        let currentUser = await base.getCurrentUser()
        await page.click(selector.customer.cDashboard.becomeWholesaleCustomer)
        await base.wait(4)

        let returnMessage = await base.getElementText(selector.customer.cDashboard.wholesaleRequestReturnMessage)
        // console.log(returnMessage)
        if (returnMessage != "Your wholesale customer request send to the admin. Please wait for approval") {
            let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
            expect(successMessage).toMatch('You are succefully converted as a wholesale customer')
        } else {
            await loginPage.switchUser(process.env.ADMIN, process.env.ADMIN_PASSWORD)
            await adminPage.adminApproveWholesaleRequest(currentUser)
        }
    },

    //customer add billing address
    async addBillingAddress(billingFirstName, billingLastName, billingCompanyName, billingCompanyIDOrEuidNumber, billingVatOrTaxNumber, billingNameOfBank, billingBankIban, billingCountryOrRegion, billingStreetAddress, billingStreetAddress2, billingTownCity,
        billingState, billingZipCode, billingPhone, billingEmailAddress) {
        await this.goToMyAccount()

        await base.clickAndWait(selector.customer.cMyAccount.addresses)
        //billing address
        await page.$(selector.customer.cMyAccount.addresses) !== null ? await base.clickAndWait(selector.customer.cAddress.editBillingAddress) : await base.clickAndWait(selector.customer.cAddress.editBillingAddress1)
        await base.clearAndType(selector.customer.cAddress.billingFirstName, billingFirstName)
        await base.clearAndType(selector.customer.cAddress.billingLastName, billingLastName)
        await base.clearAndType(selector.customer.cAddress.billingCompanyName, billingCompanyName)
        await base.clearAndType(selector.customer.cAddress.billingCompanyIDOrEuidNumber, billingCompanyIDOrEuidNumber)
        await base.clearAndType(selector.customer.cAddress.billingVatOrTaxNumber, billingVatOrTaxNumber)
        await base.clearAndType(selector.customer.cAddress.billingNameOfBank, billingNameOfBank)
        await base.clearAndType(selector.customer.cAddress.billingBankIban, billingBankIban)
        await page.click(selector.customer.cAddress.billingCountryOrRegion)
        await page.type(selector.customer.cAddress.billingCountryOrRegionInput, billingCountryOrRegion)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.billingCountryOrRegionValues, billingCountryOrRegion)
        await base.clearAndType(selector.customer.cAddress.billingStreetAddress, billingStreetAddress)
        await base.clearAndType(selector.customer.cAddress.billingStreetAddress2, billingStreetAddress2)
        await base.clearAndType(selector.customer.cAddress.billingTownCity, billingTownCity)
        await page.click(selector.customer.cAddress.billingState)
        await page.type(selector.customer.cAddress.billingStateInput, billingState)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.billingStateValues, billingState)
        await base.clearAndType(selector.customer.cAddress.billingZipCode, billingZipCode)
        await base.clearAndType(selector.customer.cAddress.billingPhone, billingPhone)
        await base.clearAndType(selector.customer.cAddress.billingEmailAddress, billingEmailAddress)
        await base.clickAndWait(selector.customer.cAddress.billingSaveAddress)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch('Address changed successfully.')
    },

    //customer add shipping address
    async addShippingAddress(shippingFirstName, shippingLastName, shippingCompanyName, shippingCountryOrRegion, shippingStreetAddress, shippingStreetAddress2, shippingTownCity, shippingState, shippingZipCode) {
        await this.goToMyAccount()

        await base.clickAndWait(selector.customer.cMyAccount.addresses)
        //shipping address
        await base.clickAndWait(selector.customer.cAddress.editShippingAddress)
        await base.clearAndType(selector.customer.cAddress.shippingFirstName, shippingFirstName)
        await base.clearAndType(selector.customer.cAddress.shippingLastName, shippingLastName)
        await base.clearAndType(selector.customer.cAddress.shippingCompanyName, shippingCompanyName)
        await page.click(selector.customer.cAddress.shippingCountryOrRegion)
        await page.type(selector.customer.cAddress.shippingCountryOrRegionInput, shippingCountryOrRegion)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.shippingCountryOrRegionValues, shippingCountryOrRegion)
        await base.clearAndType(selector.customer.cAddress.shippingStreetAddress, shippingStreetAddress)
        await base.clearAndType(selector.customer.cAddress.shippingStreetAddress2, shippingStreetAddress2)
        await base.clearAndType(selector.customer.cAddress.shippingTownCity, shippingTownCity)
        await page.click(selector.customer.cAddress.shippingState)
        await page.type(selector.customer.cAddress.shippingStateInput, shippingState)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.shippingStateValues, shippingState)
        await base.clearAndType(selector.customer.cAddress.shippingZipCode, shippingZipCode)
        await base.clickAndWait(selector.customer.cAddress.shippingSaveAddress)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch('Address changed successfully.')
    },


    // customer send rma request
    async sendRmaMessage(message) {
        await base.clickAndWait(selector.customer.cMyAccount.rmaRequests)

        await page.type(selector.customer.cRma.message, message)
        await page.click(selector.customer.cRma.sendMessage)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch("Message send successfully")
    },

    //customer add payment method
    async addPaymentMethod(cardNumber, cardExpiryDate, cardCvc) { //TODO: Actual card number required
        await this.goToMyAccount()
        await page.click(selector.customer.cMyAccount.paymentMethods)
        await base.wait(2)
        await page.click(selector.customer.cPaymentMethods.addPaymentMethod)
        await base.wait(2)

        //negative test
        // await base.clickAndWait(selector.customer.cPaymentMethods.addPaymentMethodCard)
        // let failureMessage = await base.getElementText(selector.customer.cWooSelector.failureMessage)
        // expect(failureMessage).toMatch("Your card number is incomplete.")

        let stripeCardIframe = await base.switchToIframe(selector.customer.cPaymentMethods.stripeCardIframe)
        await base.iframeClearAndType(stripeCardIframe, selector.customer.cPaymentMethods.stripeCardNumber, cardNumber)
        await base.iframeClearAndType(stripeCardIframe, selector.customer.cPaymentMethods.stripeCardExpiryDate, cardExpiryDate)
        await base.iframeClearAndType(stripeCardIframe, selector.customer.cPaymentMethods.stripeCardCvc, cardCvc)
        await page.click(selector.customer.cPaymentMethods.addPaymentMethodCard)
        await base.wait(1)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceError)
        expect(successMessage).toMatch("Unable to process this payment, please try again or use alternative method.")
    },

    //customer delete payment method
    async deletePaymentMethod() { //TODO:need to test
        await base.clickAndWait(selector.customer.cMyAccount.paymentMethods)
        await page.click(selector.customer.cPaymentMethods.deleteMethod)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch("Payment method deleted.")
    },

    //customer update password
    async updatePassword(currentPassword, newPassword) {
        await base.clearAndType(selector.customer.cAccountDetails.currentPassword, currentPassword)
        await base.clearAndType(selector.customer.cAccountDetails.NewPassword, newPassword)
        await base.clearAndType(selector.customer.cAccountDetails.confirmNewPassword, newPassword)
        await page.click(selector.customer.cAccountDetails.saveChanges)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch("Account details changed successfully.")
    },

    //customer add customer details
    async addCustomerDetails(firstName, lastName, displayName, email, currentPassword, newPassword) {
        await this.goToMyAccount()

        await base.clickAndWait(selector.customer.cMyAccount.accountDetails)

        await base.clearAndType(selector.customer.cAccountDetails.firstName, firstName)
        await base.clearAndType(selector.customer.cAccountDetails.lastName, lastName)
        await base.clearAndType(selector.customer.cAccountDetails.displayName, displayName)
        // await base.clearAndType(selector.customer.cAccountDetails.email, email) 
        await this.updatePassword(currentPassword, newPassword)

        // //cleanup
        // await base.clickAndWait(selector.customer.cMyAccount.accountDetails)
        // await this.updatePassword(newPassword, currentPassword)
    },

    //customer search vendor
    async searchVendor(vendorName) {
        await this.goToStoreList()

        await page.click(selector.customer.cStoreList.filter)
        await page.type(selector.customer.cStoreList.searchVendors, vendorName)
        await page.click(selector.customer.cStoreList.apply)

        await base.waitForSelector(selector.customer.cStoreList.visitStore(vendorName))
        let cartIsVisible = await base.isVisible(selector.customer.cStoreList.visitStore(vendorName))
        expect(cartIsVisible).toBe(true)
        await base.wait(0.5)
    },

    //customer follow vendor
    async followVendor(vendorName) {
        await this.searchVendor(vendorName)

        let currentStoreFollowStatus = await base.getElementText(selector.customer.cStoreList.currentStoreFollowStatus(vendorName))
        //unfollow if not already
        if (currentStoreFollowStatus == "Following") {
            await base.clickAndWaitOnceForAllXhr(selector.customer.cStoreList.followUnFollowStore(vendorName))
            await base.wait(1)
        }
        await base.clickAndWaitOnceForAllXhr(selector.customer.cStoreList.followUnFollowStore(vendorName))
        await base.wait(1)
        let storeFollowStatus = await base.getElementText(selector.customer.cStoreList.currentStoreFollowStatus(vendorName))
        expect(storeFollowStatus).toMatch('Following')
    },

    //customer review store
    async reviewStore(vendorName, rating, reviewTitle) {
        await this.searchVendor(vendorName)

        await base.clickAndWait(selector.customer.cStoreList.visitStore(vendorName))

        let reviewMessage = faker.datatype.uuid()
        await base.clickAndWait(selector.customer.cSingleStore.reviews)
        await base.wait(1)
        let writeAReviewIsVisible = await base.isVisible(selector.customer.cSingleStore.writeAReview)
        if (writeAReviewIsVisible) {
            await page.click(selector.customer.cSingleStore.writeAReview)
        } else {
            await page.click(selector.customer.cSingleStore.editReview)
        }
        await base.wait(2)
        await base.setElementAttributeValue(selector.customer.cSingleStore.rating, 'style', rating)
        await base.clearAndType(selector.customer.cSingleStore.reviewTitle, reviewTitle)
        await base.clearAndType(selector.customer.cSingleStore.reviewMessage, reviewMessage)
        await page.click(selector.customer.cSingleStore.submitReview)
        await base.wait(2)

        let submittedReviewMessage = await base.getElementText(selector.customer.cSingleStore.submittedReview(reviewMessage))
        expect(submittedReviewMessage).toMatch(reviewMessage)
    },

    //customer ask for get support
    async askForGetSupport(vendorName, getSupportSubject, getSupportMessage) {
        await this.searchVendor(vendorName)

        await base.clickAndWait(selector.customer.cStoreList.visitStore(vendorName))

        await page.click(selector.customer.cSingleStore.getSupport)
        await base.wait(2)
        await page.type(selector.customer.cSingleStore.subject, getSupportSubject)
        await page.type(selector.customer.cSingleStore.message, getSupportMessage)
        await page.click(selector.customer.cSingleStore.submitGetSupport)
        await base.wait(2)

        let successMessage = await base.getElementText(selector.customer.cDokanSelector.dokanAlertSuccessMessage)
        expect(successMessage).toMatch('Thank you. Your ticket has been submitted!')
        //close popup
        await page.click(selector.customer.cDokanSelector.dokanAlertClose)
    },

    //customer add customer support ticket
    async addCustomerSupportTicket(message) {
        await page.click(selector.customer.cMyAccount.supportTickets)
        await page.click(selector.customer.cSupportTickets.openTickets)

        // await page.click(selector.customer.cSupportTickets.addReply)
        await base.clearAndType(selector.customer.cSupportTickets.addReply, message)
        await page.click(selector.customer.cSupportTickets.submitReply)
        //TODO: add assertion
    },

    //customer rate & review product
    async reviewProduct(productName, rating) {
        await this.goToProductDetails(productName)

        let reviewMessage = faker.datatype.uuid()
        await page.click(selector.customer.cSingleProduct.reviews)
        await base.wait(2)
        await page.click(selector.customer.cSingleProduct.rating(rating))
        await base.clearAndType(selector.customer.cSingleProduct.reviewMessage, reviewMessage)
        await base.clickAndWait(selector.customer.cSingleProduct.submitReview)

        let duplicateCommentAlertIsVisible = await base.isVisible(selector.customer.cSingleProduct.duplicateCommentAlert)
        if (duplicateCommentAlertIsVisible) {
            await base.clickAndWait(selector.customer.cSingleProduct.backFromDuplicateCommentAlert)
            await this.rateProduct(rating)
        }

        let submittedReviewMessage = await base.getElementText(selector.customer.cSingleProduct.submittedReview(reviewMessage))
        expect(submittedReviewMessage).toMatch(reviewMessage)

        //TODO: uncomment after handling circular issue
        // let awaitingApprovalReviewIsVisible = await base.isVisible(selector.customer.cSingleProduct.awaitingApprovalReview(reviewMessage))
        // if (awaitingApprovalReviewIsVisible) {
        //     await loginPage.switchUser(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //     await vendorPage.approveProductReview(reviewMessage)
        // }

    },

    // customer report product
    async reportProduct(productName, reportReason, reportReasonDescription) {
        await this.goToProductDetails(productName)

        await page.click(selector.customer.cSingleProduct.reportAbuse)
        // await base.wait(2)
        await base.click(selector.customer.cSingleProduct.reportReasonByName(reportReason))
        await page.type(selector.customer.cSingleProduct.reportDescription, reportReasonDescription)
        await page.click(selector.customer.cSingleProduct.reportSubmit)
        // await base.wait(2.5)

        let successMessage = await base.getElementText(selector.customer.cSingleProduct.reportSubmitSuccessMessage)
        expect(successMessage).toMatch('Your report has been submitted. Thank you for your response.')

        await page.click(selector.customer.cSingleProduct.confirmReportSubmit)

    },

    // customer enquire product
    async enquireProduct(productName, enquiryDetails) {
        await this.goToProductDetails(productName)

        await page.click(selector.customer.cSingleProduct.productEnquiry)
        // await base.wait(1)
        await page.type(selector.customer.cSingleProduct.enquiryMessage, enquiryDetails)
        await page.click(selector.customer.cSingleProduct.submitEnquiry)
        // await base.wait(2.5)

        let successMessage = await base.getElementText(selector.customer.cSingleProduct.submitEnquirySuccessMessage)
        expect(successMessage).toMatch('Email sent successfully!')
    },

    async buyProduct(productName, couponCode = false, getOrderDetails = false, payMentMethod = 'bank', paymentDetails) {
        //clear cart before buying
        // await this.clearCart()
        //buy product
        await this.searchProduct(productName)
        await this.addProductToCartFromShop(productName)//TODO: implement for other products , buy every product from single product page
        await this.goToCartFromShop()
        if (couponCode) {
            await this.applyCoupon(couponCode)
        }
        await this.goToCheckoutFromCart()
        let cOrderDetails = await this.placeOrder(payMentMethod, getOrderDetails, paymentDetails)
        return cOrderDetails
    },

    //customer search product
    async searchProduct(productName) {
        await this.goToShop()
        
        await page.type(selector.customer.cShop.searchProduct, productName)
        await base.clickAndWait(selector.customer.cShop.search)

        let searchedProductName = await base.getElementText(selector.customer.cShop.searchedProductName)
        expect(searchedProductName).toMatch(productName)
    },

    //customer go to product(single) details
    async goToProductDetails(productName) {
        await this.searchProduct(productName)

        await base.clickAndWait(selector.customer.cShop.productDetailsViewLink)

        let productTitle = await base.getElementText(selector.customer.cSingleProduct.productTitle)
        expect(productTitle).toMatch(productName)
    },


    //customer add product to cart from shop page
    async addProductToCartFromShop(productName) {
        await this.searchProduct(productName)

        await page.click(selector.customer.cShop.addToCart)

        await base.waitForSelector(selector.customer.cShop.viewCart)
        let cartIsVisible = await base.isVisible(selector.customer.cShop.viewCart)
        expect(cartIsVisible).toBe(true)

    },

    //customer add product to cart from product details page
    async addProductToCartFromSingleProductPage(productName) {
        await base.clickAndWait(selector.customer.cSingleProduct.addToCart)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch(`“${productName}” has been added to your cart.`)
    },

    //go to cart from shop page
    async goToCartFromShop() {
        await page.click(selector.customer.cShop.viewCart)
        // await base.wait(2)  

        await base.waitForSelector(selector.customer.cCart.cartPageHeader)
        let cartIsVisible = await base.isVisible(selector.customer.cCart.cartPageHeader)
        expect(cartIsVisible).toBe(true) //TODO: update assertion, also verify cart product added product from shop
    },


    //go to cart from product details page
    async goToCartFromSingleProductPage() {
        await page.click(selector.customer.cSingleProduct.viewCart)
        // await base.wait(2)

        await base.waitForSelector(selector.customer.cCart.cartPageHeader)
        let cartIsVisible = await base.isVisible(selector.customer.cCart.cartPageHeader)
        expect(cartIsVisible).toBe(true)
    },

    //got to checkout from cart
    async goToCheckoutFromCart() {
        await page.click(selector.customer.cCart.proceedToCheckout)
        // await base.wait(2)
        await base.waitForSelector(selector.customer.cCheckout.checkoutPageHeader)
        let checkoutIsVisible = await base.isVisible(selector.customer.cCheckout.checkoutPageHeader)
        expect(checkoutIsVisible).toBe(true)
    },

    //clear cart
    async clearCart() {
        await this.goToCart()
        let cartProductIsVisible = await base.isVisible(selector.customer.cCart.productCrossIcon)
        if (cartProductIsVisible) {
            await base.click(selector.customer.cCart.productCrossIcon)
            let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
            expect(successMessage).toContain('removed. Undo?')
            await this.clearCart()
        } else {
            let successMessage = await base.getElementText(selector.customer.cCart.cartEmptyMessage)
            expect(successMessage).toMatch('Your cart is currently empty.')
        }
    },

    //update product quantity from cart
    async updateProductQuantityOnCart(productName, quantity) {
        await base.clearAndType(selector.customer.cCart.quantity(productName), quantity)
        await base.click(selector.customer.cCart.updateCart)
        await base.wait(6)

        // let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        // expect(successMessage).toMatch("Cart updated.")
        let updateProductQuantity = await base.getElementValue(selector.customer.cCart.quantity(productName))
        expect(updateProductQuantity).toMatch(quantity)
    },

    //customer apply coupon
    async applyCoupon(couponCode) {
        let couponIsApplied = await base.isVisible(selector.customer.cCart.removeCoupon(couponCode))
        if (couponIsApplied) {
            await this.removeAppliedCoupon(couponCode)
        }

        await page.type(selector.customer.cCart.couponCode, couponCode)
        await base.click(selector.customer.cCart.applyCoupon)
        await base.wait(6)

        // // negative test
        // let failureMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        // expect(failureMessage).toMatch(`Coupon "${couponCode}" does not exist!`)
        // expect(failureMessage).toMatch("Sorry, this coupon is not applicable to selected products.") //for other vendor coupons
        // expect(failureMessage).toMatch("Coupon code already applied!") 

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch("Coupon code applied successfully.")
    },

    //customer remove applied coupon
    async removeAppliedCoupon(couponCode) {
        await page.click(selector.customer.cCart.removeCoupon(couponCode))
        await base.wait(5)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch('Coupon has been removed.')
    },

    //customer place order
    async placeOrder(paymentMethod = 'bank', getOrderDetails = false, paymentDetails, billingDetails = false, shippingDetails = false) {
        //TODO:handle billing address warning or shipping address warning
        if (billingDetails) await this.addBillingAddressInCheckout('customer1', 'c1', 'c1company', 'c1companyID', 'c1vat', 'c1bank', 'c1bankIBAN', 'United States (US)', 'abc street', 'xyz street2', 'New York', 'New York', '10006', '0123456789', 'customer1@gamil.com')
        if (shippingDetails) await this.addShippingAddressInCheckout('customer1', 'c1', 'c1company', 'United States (US)', 'abc street', 'xyz street2', 'New York', 'New York', '10006')
        await base.wait(6)

        switch (paymentMethod) {
            case 'bank':
                await base.click(selector.customer.cCheckout.directBankTransfer)
                await base.wait(2)
                await base.clickAndWait(selector.customer.cCheckout.placeOrder)

                break
            case 'check':
                await base.click(selector.customer.cCheckout.checkPayments)
                await base.wait(2)
                await base.clickAndWait(selector.customer.cCheckout.placeOrder)
                break
            case 'cod':
                await base.click(selector.customer.cCheckout.cashOnDelivery)
                await base.wait(2)
                await base.clickAndWait(selector.customer.cCheckout.placeOrder)
                break
            case 'stripe':
                await this.payWithStripe()
                break
            case 'paypalMarketPlace':
                await this.payWithPaypalMarketPlace()
                break
            case 'razorPay':
                await this.payWithRazorPay()
                break
            case 'mangoPay':
                await this.payWithMangoPay()
                break
            case 'stripeExpress':
                await this.payWithStripeExpress(paymentDetails)
                break
            default:
                break
        }

        await base.waitForSelector(selector.customer.cOrderReceived.orderReceivedPageHeader)
        let orderReceivedIsVisible = await base.isVisible(selector.customer.cOrderReceived.orderReceivedPageHeader)
        expect(orderReceivedIsVisible).toBe(true)

        if (getOrderDetails) {
            return await this.getOrderDetailsAfterPlaceOrder()
        }
    },


    async payWithStripe() { },
    async payWithPaypalMarketPlace() { },
    async payWithRazorPay() { },
    async payWithMangoPay() { },
    async payWithStripeExpress(paymentDetails) {
        let paymentMethod = paymentDetails.paymentMethod
        let cardInfo = paymentDetails.cardInfo

        await base.click(selector.customer.cCheckout.stripeExpress)
        await base.wait(2)

        let savedTestCard4242IsVisible = await base.isVisible(selector.customer.cPayWithStripeExpress.savedTestCard4242)
        if (!savedTestCard4242IsVisible) {
            let stripeExpressCardIframe = await base.switchToIframe(selector.customer.cPayWithStripeExpress.stripeExpressIframe)
            switch (paymentMethod) {
                case 'card':
                    await base.iframeClick(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.creditCard)
                    await base.iframeClearAndType(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.cardNumber, cardInfo.cardNumber)
                    await base.iframeClearAndType(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.expDate, cardInfo.cardExpiryDate)
                    await base.iframeClearAndType(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.cvc, cardInfo.cardCvc)
                    await base.click(selector.customer.cPayWithStripeExpress.savePaymentInformation)
                    break
                case 'gPay':
                    await base.iframeClick(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.gPay)
                    return
                case 'applePay':
                    await base.iframeClick(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.gPay)
                    return
                case 'iDeal':
                    await base.iframeClick(stripeExpressCardIframe, selector.customer.cPayWithStripeExpress.iDeal)
                    break
                default:
                    break
            }
        } else {
            await base.click(selector.customer.cPayWithStripeExpress.savedTestCard4242)
        }
        await base.click(selector.customer.cCheckout.placeOrder)
        await base.wait(5)
    },

    async getOrderDetailsAfterPlaceOrder() {
        let cOrderDetails = {}
        cOrderDetails.orderNumber = await base.getElementText(selector.customer.cOrderReceived.orderNumber)
        cOrderDetails.subtotal = helpers.price(await base.getElementText(selector.customer.cOrderReceived.subTotal))

        // let onlyShippingIsVisible = await base.isVisible(selector.customer.cOrderReceived.shipping)//TODO:delete this line when shipping is fixed
        // if (onlyShippingIsVisible) cOrderDetails.shippingMethod = await base.getElementText(selector.customer.cOrderReceived.shipping)//TODO:delete this line when shipping is fixed

        let shippingIsVisible = await base.isVisible(selector.customer.cOrderReceived.shippingCost)
        if (shippingIsVisible) {
            cOrderDetails.shippingCost = helpers.price(await base.getElementText(selector.customer.cOrderReceived.shippingCost))
            cOrderDetails.shippingMethod = helpers.price(await base.getElementText(selector.customer.cOrderReceived.shippingMethod))
        }
        let taxIsVisible = await base.isVisible(selector.customer.cOrderReceived.shipping)
        if (taxIsVisible) cOrderDetails.tax = helpers.price(await base.getElementText(selector.customer.cOrderReceived.tax))

        cOrderDetails.paymentMethod = await base.getElementText(selector.customer.cOrderReceived.orderPaymentMethod)
        cOrderDetails.orderTotal = helpers.price(await base.getElementText(selector.customer.cOrderReceived.orderTotal))

        return cOrderDetails
    },

    async getOrderDetails(orderNumber) {
        await this.goToMyAccount()

        await base.clickAndWait(selector.customer.cMyAccount.orders)
        await base.clickAndWait(selector.customer.cOrders.OrderDetailsLInk(orderNumber))

        let cOrderDetails = {}
        cOrderDetails.orderNumber = await base.getElementText(selector.customer.cOrders.orderNumber)
        cOrderDetails.orderDate = await base.getElementText(selector.customer.cOrders.orderDate)
        cOrderDetails.orderStatus = await base.getElementText(selector.customer.cOrders.orderStatus)
        cOrderDetails.subtotal = helpers.price(await base.getElementText(selector.customer.cOrders.subTotal))

        // let onlyShippingIsVisible = await base.isVisible(selector.customer.cOrders.shipping)//TODO:delete this line when shipping is fixed
        // if (onlyShippingIsVisible) cOrderDetails.shippingMethod = await base.getElementText(selector.customer.cOrders.shippingMethod)//TODO:delete this line when shipping is fixed

        let shippingIsVisible = await base.isVisible(selector.customer.cOrders.shippingCost)
        if (shippingIsVisible) {
            cOrderDetails.shippingCost = helpers.price(await base.getElementText(selector.customer.cOrders.shippingCost))
            cOrderDetails.shippingMethod = (await base.getElementText(selector.customer.cOrders.shippingMethod)).replace('via ', '')
        }

        let taxIsVisible = await base.isVisible(selector.customer.cOrders.tax)
        if (taxIsVisible) cOrderDetails.tax = helpers.price(await base.getElementText(selector.customer.cOrders.tax))

        let orderDiscount = await base.isVisible(selector.customer.cOrders.orderDiscount)
        if (orderDiscount) cOrderDetails.orderDiscount = helpers.price(await base.getElementText(selector.customer.cOrders.orderDiscount))

        let quantityDiscount = await base.isVisible(selector.customer.cOrders.quantityDiscount)
        if (quantityDiscount) cOrderDetails.quantityDiscount = helpers.price(await base.getElementText(selector.customer.cOrders.quantityDiscount))

        let discount = await base.isVisible(selector.customer.cOrders.discount)
        if (discount) cOrderDetails.discount = helpers.price(await base.getElementText(selector.customer.cOrders.discount))

        cOrderDetails.paymentMethod = await base.getElementText(selector.customer.cOrders.paymentMethod)
        cOrderDetails.orderTotal = helpers.price(await base.getElementText(selector.customer.cOrders.orderTotal))

        // console.log(cOrderDetails)
        return cOrderDetails
    },

    //customer add billing address in checkout
    async addBillingAddressInCheckout(billingFirstName, billingLastName, billingCompanyName, billingCompanyIDOrEuidNumber, billingVatOrTaxNumber, billingNameOfBank, billingBankIban, billingCountryOrRegion, billingStreetAddress, billingStreetAddress2, billingTownCity,
        billingState, billingZipCode, billingPhone, billingEmailAddress) {

        //billing address
        await base.clearAndType(selector.customer.cAddress.billingFirstName, billingFirstName)
        await base.clearAndType(selector.customer.cAddress.billingLastName, billingLastName)
        await base.clearAndType(selector.customer.cAddress.billingCompanyName, billingCompanyName)
        await base.clearAndType(selector.customer.cAddress.billingCompanyIDOrEuidNumber, billingCompanyIDOrEuidNumber)
        await base.clearAndType(selector.customer.cAddress.billingVatOrTaxNumber, billingVatOrTaxNumber)
        await base.clearAndType(selector.customer.cAddress.billingNameOfBank, billingNameOfBank)
        await base.clearAndType(selector.customer.cAddress.billingBankIban, billingBankIban)
        await base.click(selector.customer.cAddress.billingCountryOrRegion)
        await base.type(selector.customer.cAddress.billingCountryOrRegionInput, billingCountryOrRegion)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.bil–lingCountryOrRegionValues, billingCountryOrRegion)
        await base.clearAndType(selector.customer.cAddress.billingStreetAddress, billingStreetAddress)
        await base.clearAndType(selector.customer.cAddress.billingStreetAddress2, billingStreetAddress2)
        await base.clearAndType(selector.customer.cAddress.billingTownCity, billingTownCity)
        await base.click(selector.customer.cAddress.billingState)
        await base.type(selector.customer.cAddress.billingStateInput, billingState)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.billingStateValues, billingState)
        await base.clearAndType(selector.customer.cAddress.billingZipCode, billingZipCode)
        await base.clearAndType(selector.customer.cAddress.billingPhone, billingPhone)
        await base.clearAndType(selector.customer.cAddress.billingEmailAddress, billingEmailAddress)
    },

    //customer add shipping address in checkout
    async addShippingAddressInCheckout(shippingFirstName, shippingLastName, shippingCompanyName, shippingCountryOrRegion, shippingStreetAddress, shippingStreetAddress2, shippingTownCity, shippingState, shippingZipCode) {

        await base.click(selector.customer.cCheckout.shipToADifferentAddress)
        //shipping address
        await base.clearAndType(selector.customer.cAddress.shippingFirstName, shippingFirstName)
        await base.clearAndType(selector.customer.cAddress.shippingLastName, shippingLastName)
        await base.clearAndType(selector.customer.cAddress.shippingCompanyName, shippingCompanyName)
        await base.click(selector.customer.cAddress.shippingCountryOrRegion)
        await base.type(selector.customer.cAddress.shippingCountryOrRegionInput, shippingCountryOrRegion)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.shippingCountryOrRegionValues, shippingCountryOrRegion)
        await base.clearAndType(selector.customer.cAddress.shippingStreetAddress, shippingStreetAddress)
        await base.clearAndType(selector.customer.cAddress.shippingStreetAddress2, shippingStreetAddress2)
        await base.clearAndType(selector.customer.cAddress.shippingTownCity, shippingTownCity)
        await base.click(selector.customer.cAddress.shippingState)
        await base.type(selector.customer.cAddress.shippingStateInput, shippingState)
        await page.keyboard.press('Enter')
        // await base.setDropdownOptionSpan(selector.customer.cAddress.shippingStateValues, shippingState)
        await base.clearAndType(selector.customer.cAddress.shippingZipCode, shippingZipCode)
        await base.wait(2)
    },

    //customer ask for warranty
    async sendWarrantyRequest(orderNumber, productName, requestType, requestReason, requestDetails) {
        await this.goToMyAccount()

        await base.clickAndWait(selector.customer.cMyAccount.orders)
        await base.clickAndWait(selector.customer.cOrders.ordersWarrantyRequest(orderNumber))

        await base.click(selector.customer.cOrders.warrantyRequestItemCheckbox(productName))
        // await page.type(selector.customer.cOrders.warrantyRequestItemQuantity(productName), itemQuantity)
        await base.select(selector.customer.cOrders.warrantyRequestType, requestType)
        // await page.select(selector.customer.cOrders.warrantyRequestReason, requestReason)
        await base.type(selector.customer.cOrders.warrantyRequestDetails, requestDetails)
        await base.clickAndWait(selector.customer.cOrders.warrantySubmitRequest)
        await base.wait(2)

        let successMessage = await base.getElementText(selector.customer.cWooSelector.wooCommerceSuccessMessage)
        expect(successMessage).toMatch('Request has been successfully submitted')
    },



}

