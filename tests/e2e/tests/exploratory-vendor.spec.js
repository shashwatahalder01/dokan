const loginPage = require('../pages/login.js')
const vDashboardPage = require('../pages/vDashboard.js')
const vDashboardLocators = require("../pages/vDashboard-locators.js")
const adminPage = require('../pages/admin.js')
const customerPage = require('../pages/customer.js')
const base = require("../pages/base.js")  //Actions
const data = require('../utils/testData.js')


describe('Vendor Exploration test', () => {



    //----------------------------------Test Scripts-------------------------------------------//

    //Vendor > Dashboard Page
    it('Explore Vendor Dashboard Page', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //Explore Dashboard
        await vDashboardPage.vDashboardExplore();
    });

    //Vendor > Dashboard > Products Page
    it('Explore Vendor Products Page', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //Explore Products
        await vDashboardPage.vProductExplore();
    });

    //Product Add Page
    it('Explore Vendor Products add modal', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //Explore Products > Add
        await vDashboardPage.vProductAddExplore();
    });

    // Product Details Page
    it('Explore Vendor Products DETAILS [Single Product]', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //Explore Products > Details
        await vDashboardPage.vProductDetailsExplore();
    });

    //Vendor > Dashboard > Orders Page
    it('Explore Vendor Orders Page', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //Explore Products
        await vDashboardPage.vOrdersExplore();
    });

    //Order Details
    it('Explore Vendor Order Details Page', async () => {
        await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
        //Explore Products
        await vDashboardPage.vOrdersDetailsExplore();
    });

    // //Vendor > Dashboard > User Subscription
    // it('4.0: Explore Vendor > User Subscriptions', async () => {
    //     await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
    //     await base.goto('dashboard/orders')
    //     //Explore Products
    //     await vDashboardPage.vUserSubscriptionsPageExplore();
    // });

    // //Vendor > Dashboard > User Subscription > Details
    // it('4.1: Explore Vendor > User Subscriptions > Details', async () => {
    //     await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
    //     await base.goto('dashboard/orders')
    //     //Explore Products
    //     await vDashboardPage.vUserSubscriptionsDetailsPageExplore();
    // });

    // //Vendor > Dashboard > Request Quotes
    //     it('Explore Vendor > Request Quotes', async () => {
    //         await loginPage.login(process.env.VENDOR, process.env.VENDOR_PASSWORD)
    //         await base.goto('dashboard/orders')
    //         //Explore Products
    //         await vDashboardPage.vRequestQuotes();
    //     });

});