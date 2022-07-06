require('dotenv').config()
const base = require("./base.js")
const vDashboardLocators = require("./vDashboard-locators.js")


module.exports = {

    // ACTIONS ***->

    /*
    *DASHBOARD Page
    */

    //Dashboard Page Explore
    async vDashboardExplore() {
        await base.goto('dashboard')

        //Check Dashboard Page
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.dashboardPageContent)
        //FATAL Error Check
        await base.checkPHPError()

        //Check Banner (PR0)
        if (process.env.DOKAN_PRO == 'true') {
            await this.visibilityChecker(vDashboardLocators.vDashboardPage.banner)
        }
        //Check Sales Count
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.salesCount)
        //Check Sales Chart of Month
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.salesChart)
        //Check Order Details
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.orderDetails)
        //Check Latest Announcements (PR0)
        if (process.env.DOKAN_PRO == 'true') {
            await this.visibilityChecker(vDashboardLocators.vDashboardPage.latestAnnouncement)
        }
        //Check Reviews Details (PR0)
        if (process.env.DOKAN_PRO == 'true') {
            await this.visibilityChecker(vDashboardLocators.vDashboardPage.reviewsDetails)
        }
        //Check Product Details
        await this.visibilityChecker(vDashboardLocators.vDashboardPage.productsDetails)
    },



    /*
    *PRODUCTS Page
    */

    //Product Page Explore
    async vProductExplore() {
        await base.goto('dashboard/products')

        //Check Dashboard Page
        await this.visibilityChecker(vDashboardLocators.vProductsPage.productsPageContent)
        //FATAL Error Check
        await base.checkPHPError()

        //No Product
        var availableNoProducts = await base.isVisible(vDashboardLocators.vProductsPage.noProduct)
        if (availableNoProducts) {
            console.log('No Product was Added')
            return
        } 

            //Product Present

            //Check All + InStock ----- Add Product
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsAll) //All Page
            console.log('Product All Page')
            //----------------Pages----------------//
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsOnline) //Online Page
            await base.clickAndWait(vDashboardLocators.vProductsPage.productsOnline)
 
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsDraft) //Draft Page
            await base.clickAndWait(vDashboardLocators.vProductsPage.productsDraft)

            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsPendingReview) //Pending Review Page
            await base.clickAndWait(vDashboardLocators.vProductsPage.productsPendingReview)

            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsInStock) //In Stock Page
            await base.clickAndWait(vDashboardLocators.vProductsPage.productsInStock)

            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsOutOfStock) //Out of Stock Page
            await base.clickAndWait(vDashboardLocators.vProductsPage.productsOutOfStock)


            await base.clickAndWait(vDashboardLocators.vProductsPage.productsOnline) //return to online page



            await this.visibilityChecker(vDashboardLocators.vProductsPage.addNewProductButton)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsImportButton)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsExportButton)

            //Filter
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterDates)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterCategory)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterType)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterButton)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsFilterSelect)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsSearchProducts)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsSearchButton)

            //Bulk Action + Product Status
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsBulkActions)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsApplyButton)
            await this.visibilityChecker(vDashboardLocators.vProductsPage.productsStatus)
        
    },

    //Product Add Page Explore
    async vProductAddExplore() {
        await base.goto('dashboard/products')
        await base.click(vDashboardLocators.vProductsPage.addNewProductButton)

        //Check Product Add Pop-up
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productsAddPageContent)
        //FATAL Error Check
        await base.checkPHPError()

        //Product Name + Image + Price
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productCoverImage)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productName)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productPrice)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productDiscountedPrice)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productGalleryImage)

        //Product Category + Tag + Description
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.selectCategory)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.selectTags)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.productDescription)

        //Add Button + Create & Add
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.createProductButton)
        await this.visibilityChecker(vDashboardLocators.vProductsAddPage.createAndAddNewButton)
    },

    //Product Details Page Explore
    async vProductDetailsExplore() {

        await base.goto('dashboard/products')

        await base.clickAndWait(vDashboardLocators.vProductsPage.productsOnline)

        await base.clickAndWait(vDashboardLocators.vProductsDetailsPage.existingProductDetails)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditPageTitle)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.viewEditProductButton)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditTitle)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditImage)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGalleryImage)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditPermalink)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditEditButton)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditType)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditDownloadableTick)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditVirtualTick)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditPrice)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditDiscountedPrice)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditCategory)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditTags)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShortDescription)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditDescription)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditInventoryBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditSKU)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStockStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditInventoryTick1)
        await base.click(vDashboardLocators.vProductsDetailsPage.productEditStockQuantityEnable) //Click to Enable
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStockQuantity)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditStockThreshold)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAllowBackorders)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditInventoryTick2)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGeolocationBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGeolocationTick1)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditGeolocationStoreSettings)


        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsExpandAll)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsCloseAll)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsAddField)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsImport)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsExport)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsAdditional)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAddonsTick1)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxTick1)
        //await base.clickAndWait(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxTick1) //Click to Disable
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxWeight)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxLength)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxWidth)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxHeight)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxClass)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditShippingTaxSettings)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditLinkedProductsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditLinkedProductsUpsells)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditLinkedProductsCrossSells)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeCustom)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeAdd)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAttributeSave)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsTick1)
        await base.click(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsOverride) //Click to Enable
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsLabel)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsType)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditRMAOptionsPolicy)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesaleBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesaleTick1)
        await base.click(vDashboardLocators.vProductsDetailsPage.productEditWholesaleEnable) //Click to Enable
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesalePrice)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditWholesaleQuantity)

        // await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxTick1)
        await base.click(vDashboardLocators.vProductsDetailsPage.productEditMinMaxEnable) //Click to Enable
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinQuantity)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMaxQuantity)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinAmount)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMaxAmount)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxOrderRules)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditMinMaxCategoryRules)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsBlock)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsStatus)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsVisibilityOptions)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsPurchaseNote)
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditOtherOptionsEnableReviews)

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseProductBlock)
        await base.click(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseEnable) //Click to Open Modal
        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseEnablePopup)
        await base.click(vDashboardLocators.vProductsDetailsPage.productEditAdvertiseEnablePopupCancel) //Click to Close Modal

        await this.visibilityChecker(vDashboardLocators.vProductsDetailsPage.productEditSaveChangesButton)
    },



    /*
    *ORDERS Page
    */

    //Orders Page Explore
    async vOrdersExplore() {
        await base.goto('dashboard/orders')

        //Check Dashboard Page
        await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersPageContent)
        //FATAL Error Check
        await base.checkPHPError()

        //No Orders
        var availableNoOrders = await base.isVisible(vDashboardLocators.vOrdersPage.noOrder)
        if (availableNoOrders) {
            console.log('No Order was Placed')
            return

        } 

            // Orders Present
            /*Orders Page */
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersAll) //All Page

            //----------------Pages----------------//
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersCompleted) //Completed Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersCompleted)
 
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersProcessing) //Processing Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersProcessing)

            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersOnHold) //On Hold Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersOnHold)

            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersPending) //Pending Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersPending)
  
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersCancelled) //Cancelled Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersCancelled)
 
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersRefunded) //Refunded Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersRefunded)
 
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFailed) //Failed Page
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersFailed)
 

            //Return to All
            await base.clickAndWait(vDashboardLocators.vOrdersPage.ordersAll) //Click to return to All

            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFilterDate)
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFilterCustomer)
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersFilterButton)

            //Filter
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersExpandAllButton)
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersExportFilteredButton)

            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersBulkAction)
            await this.visibilityChecker(vDashboardLocators.vOrdersPage.orderBulkActionApply)

            await this.visibilityChecker(vDashboardLocators.vOrdersPage.ordersOrderList)
        
    },

    //Order Details Page Explore
    async vOrdersDetailsExplore() {
        await base.goto('dashboard/orders')

        //Details Page
        await base.clickAndWait(vDashboardLocators.vOrdersDetailsPage.existingOrder)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsPage)
 
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsHeading)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.oderDetailsBody)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsBackButton)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsRequestRefund)
        await base.click(vDashboardLocators.vOrdersDetailsPage.orderDetailsRequestRefund)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsRefundItems)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsBillingAddress)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsShippingAddress)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsDownloadableProductsSection)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsDownloadableProductsSelect)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsGrantAccess)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsGeneralDetailsSection)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsOrderNotesSection)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsAddNotesTextBox)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsAddNotesCustomer)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsAddNotesButton)

        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumber)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberName)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberValue)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberDate)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberAddDetails)
        await this.visibilityChecker(vDashboardLocators.vOrdersDetailsPage.orderDetailsTrackingNumberClose)

    },



    /*
    *USER SUBSCRIPTIONS Page
    */

    //User Subscriptions Page Explore
    async vUserSubscriptionsPageExplore() {

    },

    //User Subscriptions Details Page Explore
    async vUserSubscriptionsDetailsPageExplore() {

    },















    /*
    .
    .
    .
    .
    .
    *Checker FUNCTION 
    .
    .
    .
    .
    .
    */

    //-[Checker FUNCTION]
    async visibilityChecker(locator) {
        var availableLocator = await base.isVisible(locator)
        expect(availableLocator).toBe(true);
    }



}
