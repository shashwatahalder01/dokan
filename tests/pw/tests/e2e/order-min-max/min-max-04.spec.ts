import test, { Browser, chromium, expect, Page } from '@playwright/test';
import { ApiUtils } from '@utils/apiUtils';
import { payloads } from '@utils/payloads';

import 'dotenv/config';
import VendorDashboardSidebarPage from '@pages/frontend/vendor-dashboard/common/vendor-sidebar.page';
import MyAccountAuthPage from '@pages/frontend/my-account/auth/my-account-auth.page';
import VendorProductListPage from '@pages/frontend/vendor-dashboard/products/products-list.page';
import VendorProductAddEditPage from '@pages/frontend/vendor-dashboard/products/product-add-edit.page';
import ShopPage from '@pages/frontend/shop/shop.page';
import SingleProductPage from '@pages/frontend/shop/single-product.page';
import VendorStoreSettingsPage from '@pages/frontend/vendor-dashboard/settings/store/vendor-store.page';
import CartPage from '@pages/frontend/cart.page';
import StorefrontMainMenu from '@pages/frontend/navigation/main-menu.page';
import { faker } from '@faker-js/faker';

let baseUrl: string;
let api: ApiUtils;
let productName_1: string;
let customerEmail: string;
let vendorId_1: string;
let vendorEmail_1: string;
let vendorStoreName_1: string;
let storeSettingsPage_1: VendorStoreSettingsPage;

let productName_2: string;
let vendorId_2: string;
let vendorEmail_2: string;
let vendorStoreName_2: string;
let storeSettingsPage_2: VendorStoreSettingsPage;

let vendorDashboardSidebarPage_1: VendorDashboardSidebarPage;
let vendorMyAccountAuthPage_1: MyAccountAuthPage;
let vendorProductListPage_1: VendorProductListPage;
let vendorProductAddEditPage_1: VendorProductAddEditPage;
let vendorPage_1: Page;

let vendorDashboardSidebarPage_2: VendorDashboardSidebarPage;
let vendorMyAccountAuthPage_2: MyAccountAuthPage;
let vendorProductListPage_2: VendorProductListPage;
let vendorProductAddEditPage_2: VendorProductAddEditPage;
let vendorPage_2: Page;

let customerPage: Page;
let customerMyAccountAuthPage: MyAccountAuthPage;
let shopPage: ShopPage;
let singleProductPage: SingleProductPage;
let cartPage: CartPage;
let storefrontMainMenu: StorefrontMainMenu;

let vendorBrowser_1: Browser;
let vendorBrowser_2: Browser;
let customerBrowser: Browser;

test.describe('Order Min-Max - Multi-Vendor', () => {
    test.beforeEach(async ({ page, request }, testInfo) => {
        baseUrl = testInfo.project.use.baseURL as string;
        await page.goto(baseUrl);
        api = new ApiUtils(request);

        // create customer
        const customer = await api.createCustomer(payloads.createCustomer(), payloads.adminAuth);
        customerEmail = customer[0].email;

        // customer
        customerBrowser = await chromium.launch();
        customerPage = await customerBrowser.newPage();
        customerMyAccountAuthPage = new MyAccountAuthPage(customerPage);
        shopPage = new ShopPage(customerPage);
        singleProductPage = new SingleProductPage(customerPage);
        cartPage = new CartPage(customerPage);
        storefrontMainMenu = new StorefrontMainMenu(customerPage);

        // customer login
        await customerPage.goto(baseUrl + '/my-account/');
        await customerMyAccountAuthPage.enterUsername(customerEmail);
        await customerMyAccountAuthPage.enterPassword(process.env.USER_PASSWORD);
        await customerMyAccountAuthPage.clickOnLoginButton();

        // create vendor 1
        const vendor_1 = await api.createStore(payloads.createStore(), payloads.adminAuth);
        vendorId_1 = vendor_1[0].id;
        vendorEmail_1 = vendor_1[0].email;
        vendorStoreName_1 = vendor_1[0]['store_name'];

        // create vendor 2
        const vendor_2 = await api.createStore(payloads.createStore(), payloads.adminAuth);
        vendorId_2 = vendor_2[0].id;
        vendorEmail_2 = vendor_2[0].email;
        vendorStoreName_2 = vendor_2[0]['store_name'];

        // create vendor 1 product
        const title_1 = `Automation Simple Product ${vendorId_1}${faker.string.nanoid(5)}`;
        const product_1 = await api.createProduct(
            {
                name: title_1,
                type: 'simple',
                regular_price: '10',
                status: 'publish',
                post_author: `${vendorId_1}`,
                categories: [{}],
                description: '<p>test description</p>',
            },
            payloads.adminAuth,
        );

        productName_1 = product_1[0]['name'];

        // create vendor 2 product
        const title_2 = `Automation Simple Product ${vendorId_2}${faker.string.nanoid(5)}`;
        const product_2 = await api.createProduct(
            {
                name: title_2,
                type: 'simple',
                regular_price: '10',
                status: 'publish',
                post_author: `${vendorId_2}`,
                categories: [{}],
                description: '<p>test description</p>',
            },
            payloads.adminAuth,
        );

        productName_2 = product_2[0]['name'];

        // vendor 1
        vendorBrowser_1 = await chromium.launch();
        vendorPage_1 = await vendorBrowser_1.newPage();
        vendorDashboardSidebarPage_1 = new VendorDashboardSidebarPage(vendorPage_1);
        vendorMyAccountAuthPage_1 = new MyAccountAuthPage(vendorPage_1);
        vendorProductListPage_1 = new VendorProductListPage(vendorPage_1);
        vendorProductAddEditPage_1 = new VendorProductAddEditPage(vendorPage_1);
        storeSettingsPage_1 = new VendorStoreSettingsPage(vendorPage_1);

        // vendor 2
        vendorBrowser_2 = await chromium.launch();
        vendorPage_2 = await vendorBrowser_2.newPage();
        vendorDashboardSidebarPage_2 = new VendorDashboardSidebarPage(vendorPage_2);
        vendorMyAccountAuthPage_2 = new MyAccountAuthPage(vendorPage_2);
        vendorProductListPage_2 = new VendorProductListPage(vendorPage_2);
        vendorProductAddEditPage_2 = new VendorProductAddEditPage(vendorPage_2);
        storeSettingsPage_2 = new VendorStoreSettingsPage(vendorPage_2);

        // vendor 1 login
        await vendorPage_1.goto(baseUrl + '/dashboard/');
        await vendorMyAccountAuthPage_1.enterUsername(vendorEmail_1);
        await vendorMyAccountAuthPage_1.enterPassword(process.env.USER_PASSWORD);
        await vendorMyAccountAuthPage_1.clickOnLoginButton();

        // vendor 2 login
        await vendorPage_2.goto(baseUrl + '/dashboard/');
        await vendorMyAccountAuthPage_2.enterUsername(vendorEmail_2);
        await vendorMyAccountAuthPage_2.enterPassword(process.env.USER_PASSWORD);
        await vendorMyAccountAuthPage_2.clickOnLoginButton();
    });

    test.afterEach(async () => {
        await vendorBrowser_1.close();
        await vendorBrowser_2.close();
        await customerBrowser.close();
    });

    test('Customer is able to add to cart multi-vendor products with varying minimum quantity restrictions', { tag: ['@pro', '@admin'] }, async () => {
        // vendor 1
        await vendorDashboardSidebarPage_1.clickOnProductsTab();
        await vendorProductListPage_1.clickOnProductWithTitle(productName_1);
        await vendorProductAddEditPage_1.enterSimpleProductMinQty('4');
        await vendorProductAddEditPage_1.selectProductStatus('publish');
        await vendorProductAddEditPage_1.clickOnSaveProduct();

        // vendor 2
        await vendorDashboardSidebarPage_2.clickOnProductsTab();
        await vendorProductListPage_2.clickOnProductWithTitle(productName_2);
        await vendorProductAddEditPage_2.enterSimpleProductMinQty('6');
        await vendorProductAddEditPage_2.selectProductStatus('publish');
        await vendorProductAddEditPage_2.clickOnSaveProduct();

        // customer
        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_1);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_1, '4');
        await cartPage.clickOnUpdateCartButton();

        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_2);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_2, '6');
        await cartPage.clickOnUpdateCartButton();

        const message = await cartPage.woocommerceMessage().textContent();
        expect(message?.trim()).toEqual(`Cart updated.`);
    });

    test('Customer is able to add to cart multi-vendor products with varying maximum quantity restrictions', { tag: ['@pro', '@admin'] }, async () => {
        // vendor 1
        await vendorDashboardSidebarPage_1.clickOnProductsTab();
        await vendorProductListPage_1.clickOnProductWithTitle(productName_1);
        await vendorProductAddEditPage_1.enterSimpleProductMaxQty('6');
        await vendorProductAddEditPage_1.selectProductStatus('publish');
        await vendorProductAddEditPage_1.clickOnSaveProduct();

        // vendor 2
        await vendorDashboardSidebarPage_2.clickOnProductsTab();
        await vendorProductListPage_2.clickOnProductWithTitle(productName_2);
        await vendorProductAddEditPage_2.enterSimpleProductMaxQty('9');
        await vendorProductAddEditPage_2.selectProductStatus('publish');
        await vendorProductAddEditPage_2.clickOnSaveProduct();

        // customer
        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_1);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_1, '6');
        await cartPage.clickOnUpdateCartButton();

        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_2);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_2, '9');
        await cartPage.clickOnUpdateCartButton();

        const message = await cartPage.woocommerceMessage().textContent();
        expect(message?.trim()).toEqual(`Cart updated.`);
    });

    test('Customer is able to add to cart multi-vendor products with different minimum order amount', { tag: ['@pro', '@admin'] }, async () => {
        // vendor 1
        await vendorDashboardSidebarPage_1.clickOnSettingsTab();
        await storeSettingsPage_1.enterMinimumOrderAmount('20');
        await storeSettingsPage_1.clickOnUpdateSettingsButton();

        await vendorDashboardSidebarPage_1.clickOnProductsTab();
        await vendorProductListPage_1.clickOnProductWithTitle(productName_1);
        await vendorProductAddEditPage_1.selectProductStatus('publish');
        await vendorProductAddEditPage_1.clickOnSaveProduct();

        // vendor 2
        await vendorDashboardSidebarPage_2.clickOnSettingsTab();
        await storeSettingsPage_2.enterMinimumOrderAmount('50');
        await storeSettingsPage_2.clickOnUpdateSettingsButton();

        await vendorDashboardSidebarPage_2.clickOnProductsTab();
        await vendorProductListPage_2.clickOnProductWithTitle(productName_2);
        await vendorProductAddEditPage_2.selectProductStatus('publish');
        await vendorProductAddEditPage_2.clickOnSaveProduct();

        // customer
        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_1);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_1, '2');
        await cartPage.clickOnUpdateCartButton();

        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_2);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_2, '5');
        await cartPage.clickOnUpdateCartButton();

        const message = await cartPage.woocommerceMessage().textContent();
        expect(message?.trim()).toEqual(`Cart updated.`);
    });

    test('Customer is able to add to cart multi-vendor products with different maximum order amount', { tag: ['@pro', '@admin'] }, async () => {
        // vendor 1
        await vendorDashboardSidebarPage_1.clickOnSettingsTab();
        await storeSettingsPage_1.enterMaximumOrderAmount('40');
        await storeSettingsPage_1.clickOnUpdateSettingsButton();

        await vendorDashboardSidebarPage_1.clickOnProductsTab();
        await vendorProductListPage_1.clickOnProductWithTitle(productName_1);
        await vendorProductAddEditPage_1.selectProductStatus('publish');
        await vendorProductAddEditPage_1.clickOnSaveProduct();

        // vendor 2
        await vendorDashboardSidebarPage_2.clickOnSettingsTab();
        await storeSettingsPage_2.enterMaximumOrderAmount('80');
        await storeSettingsPage_2.clickOnUpdateSettingsButton();

        await vendorDashboardSidebarPage_2.clickOnProductsTab();
        await vendorProductListPage_2.clickOnProductWithTitle(productName_2);
        await vendorProductAddEditPage_2.selectProductStatus('publish');
        await vendorProductAddEditPage_2.clickOnSaveProduct();

        // customer
        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_1);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_1, '4');
        await cartPage.clickOnUpdateCartButton();

        await customerPage.goto(baseUrl + '/shop/');
        await shopPage.clickOnProductWithTitle(productName_2);
        await singleProductPage.clickOnAddToCartButton();
        await customerPage.goto(baseUrl + '/cart/');
        await cartPage.enterQuantityValue(productName_2, '8');
        await cartPage.clickOnUpdateCartButton();

        const message = await cartPage.woocommerceMessage().textContent();
        expect(message?.trim()).toEqual(`Cart updated.`);
    });
});
