import { test, request, Page } from '@playwright/test';
import { ShortcodePage } from '@pages/shortcodePage';
import { ApiUtils } from '@utils/apiUtils';
import { data } from '@utils/testData';
import { payloads } from '@utils/payloads';

test.describe('Shortcodes test', () => {
    let admin: ShortcodePage;
    let vendor: ShortcodePage;
    let customer: ShortcodePage;
    let aPage: Page, vPage: Page, cPage: Page;
    let apiUtils: ApiUtils;

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        aPage = await adminContext.newPage();
        admin = new ShortcodePage(aPage);

        const vendorContext = await browser.newContext(data.auth.vendorAuth);
        vPage = await vendorContext.newPage();
        vendor = new ShortcodePage(vPage);

        const customerContext = await browser.newContext(data.auth.customerAuth);
        cPage = await customerContext.newPage();
        customer = new ShortcodePage(cPage);

        apiUtils = new ApiUtils(await request.newContext());
    });

    test.afterAll(async () => {
        await aPage.close();
        await vPage.close();
        await cPage.close();
        await apiUtils.dispose();
    });

    test.skip('admin can create page with dokan shortcode', { tag: ['@lite', '@admin'] }, async () => {
        // todo: need to fix this test
        await admin.createPageWithShortcode(data.dokanShortcodes.dashboard);
    });

    test('vendor can view dokan dashboard (shortcode)', { tag: ['@lite', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.dashboardShortcode, payloads.adminAuth);
        console.log(reponsbody); //todo: remove this
        await vendor.viewDashboard(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth); // todo: add to before each
    });

    test('vendor can view dokan subscription packs (shortcode)', { tag: ['@pro', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.dokanSubscriptionPackShortcode, payloads.adminAuth);
        await vendor.viewDokanSubscriptionPacks(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('guest user can view vendor registration form (shortcode)', { tag: ['@lite', '@admin'] }, async ({ page }) => {
        const guest = new ShortcodePage(page);
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.vendorRegistrationShortcode, payloads.adminAuth);
        console.log(reponsbody); //todo: remove this
        await guest.viewVendorRegistrationForm(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view best selling products (shortcode)', { tag: ['@lite', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.bestSellingProductShortcode, payloads.adminAuth);
        await customer.viewBestSellingProducts(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view top rated products (shortcode)', { tag: ['@lite', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.topRatedProductShortcode, payloads.adminAuth);
        await customer.topRatedProducts(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view customer migration form (shortcode)', { tag: ['@lite', '@admin'] }, async () => {
        test.skip(true, 'Fatal error exists');
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.customerMigrationShortcode, payloads.adminAuth);
        await customer.viewMigrationForm(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view geolocation filter form (shortcode)', { tag: ['@pro', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.geolocationFilterFormShortcode, payloads.adminAuth);
        await customer.viewGeolocationFilterForm(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view stores (shortcode)', { tag: ['@lite', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.storesShortcode, payloads.adminAuth);
        await customer.viewStores(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view my orders (shortcode)', { tag: ['@lite', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.myOrdersShortcode, payloads.adminAuth);
        await customer.viewMyOrders(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    test('customer can view request for quote (shortcode)', { tag: ['@pro', '@admin'] }, async () => {
        const [reponsbody, pageId] = await apiUtils.createPage(payloads.requestQuoteShortcode, payloads.adminAuth);
        await customer.viewRequestQuote(reponsbody.link);
        await apiUtils.deletePage(pageId, payloads.adminAuth);
    });

    // todo: add test for each page functionality
});
