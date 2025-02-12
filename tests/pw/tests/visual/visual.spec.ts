import { test, Page } from '@playwright/test';
import { VisualPage } from '@pages/visualPage';
import { data } from '@utils/testData';
import { selector } from '@pages/selectors';

test.describe('dokan visual test', () => {
    test.skip(true, 'skip visual tests');
    let admin: VisualPage;
    let aPage: Page;

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        aPage = await adminContext.newPage();
        admin = new VisualPage(aPage);
    });

    test.afterAll(async () => {
        await aPage.close();
    });

    test('dokan admin dashboard', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.dokan);
    });

    test('admin withdraw menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.withdraw);
    });

    test('admin reverse withdraw menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.reverseWithdraws);
    });

    test('admin add reverse withdrawal', { tag: ['@lite', '@visual'] }, async () => {
        await admin.addReverseWithdrawal();
    });

    test('admin vendors menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.vendors);
    });

    test('admin can add vendor', { tag: ['@lite', '@visual'] }, async () => {
        await admin.addVendor();
    });

    test('admin store category', { tag: ['@pro', '@visual'] }, async () => {
        await admin.adminStoreCategoryRenderProperly();
    });

    test('dokan store reviews menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.storeReviews);
    });

    test('dokan store support menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.storeSupport);
    });

    test('dokan seller badge menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.sellerBadge);
    });

    test('admin can create seller badge', { tag: ['@pro', '@visual'] }, async () => {
        await admin.createSellerBadge();
    });

    test('admin quotes menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.requestForQuote);
    });

    test('admin can add quote', { tag: ['@pro', '@visual'] }, async () => {
        await admin.addQuote();
    });

    test('admin quote rules menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.requestForQuoteRules);
    });

    test('admin can add quote rule', { tag: ['@pro', '@visual'] }, async () => {
        await admin.addQuoteRule();
    });

    test('dokan abuse report menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.abuseReports);
    });

    test('dokan announcements menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.announcements);
    });

    test('admin can add announcement', { tag: ['@pro', '@visual'] }, async () => {
        await admin.addAnnouncement();
    });

    test('admin refunds menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.refunds);
    });

    test('admin reports menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.reports);
    });

    test('admin All Logs menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.allLogs);
    });

    test('dokan modules menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.modules);
    });

    test('dokan modules plan', { tag: ['@lite', '@visual'] }, async () => {
        await admin.adminModulesPlanRenderProperly();
    });

    test('dokan tools menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.tools);
    });

    test('admin verifications menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.verifications);
    });

    test('dokan product advertising menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.productAdvertising);
    });

    test('admin can add product advertisement', { tag: ['@pro', '@visual'] }, async () => {
        await admin.addNewProductAdvertisement();
    });

    test('dokan wholesale customers menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.wholeSaleCustomer);
    });

    test('dokan help menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.help);
    });

    test('dokan settings general menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.general);
    });

    test('dokan settings selling menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.sellingOptions);
    });

    test('dokan settings withdraw menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.withdrawOptions);
    });

    test('dokan settings reverseWithdraw menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.reverseWithdrawal);
    });

    test('dokan settings page menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.pageSettings);
    });

    test('dokan settings appearance menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.appearance);
    });

    test('dokan settings privacyPolicy menu', { tag: ['@lite', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.privacyPolicy);
    });

    test('dokan settings colors menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.colors);
    });

    test('dokan settings liveSearch menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.liveSearch);
    });

    test('dokan settings storeSupport menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.storeSupport);
    });

    test('dokan settings sellerVerification menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.vendorVerification);
    });

    test('dokan settings verificationSmsGateways menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.verificationSmsGateways);
    });

    test('dokan settings emailVerification menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.emailVerification);
    });

    test('dokan settings socialApi menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.socialApi);
    });

    test('dokan settings shippingStatus menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.shippingStatus);
    });

    test('dokan settings quote menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.quote);
    });

    test('dokan settings liveChat menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.liveChat);
    });

    test('dokan settings rma menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.rma);
    });

    test('dokan settings wholesale menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.wholesale);
    });

    test('dokan settings euComplianceFields menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.euComplianceFields);
    });

    test('dokan settings deliveryTime menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.deliveryTime);
    });

    test('dokan settings productAdvertising menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.productAdvertising);
    });

    test('dokan settings geolocation menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.geolocation);
    });

    test('dokan settings productReportAbuse menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.productReportAbuse);
    });

    test('dokan settings singleProductMultiVendor menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.singleProductMultiVendor);
    });

    test('dokan settings vendorSubscription menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.vendorSubscription);
    });

    test('dokan settings vendorAnalytics menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanSettingsMenu(selector.admin.dokan.settings.menus.vendorAnalytics);
    });

    test('dokan license menu', { tag: ['@pro', '@visual'] }, async () => {
        await admin.dokanMenu(data.subUrls.backend.dokan.license);
    });
});

test.describe('dokan vendor dashboard visual test', () => {
    test.skip(true, 'skip visual tests');
    let vendor: VisualPage;
    let vPage: Page;

    test.beforeAll(async ({ browser }) => {
        const vendorContext = await browser.newContext(data.auth.vendorAuth);
        vPage = await vendorContext.newPage();
        vendor = new VisualPage(vPage);
    });

    test.afterAll(async () => {
        await vPage.close();
    });

    test('dokan vendor dashboard dashboard menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.dashboard);
    });

    test('dokan vendor dashboard products menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.products);
    });

    test('dokan vendor dashboard orders menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.orders);
    });

    test('dokan vendor dashboard userSubscriptions menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.userSubscriptions);
    });

    test('dokan vendor dashboard requestQuotes menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.requestQuotes);
    });

    test('dokan vendor dashboard coupons menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.coupons);
    });

    test('dokan vendor dashboard reports menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.reports);
    });

    test('dokan vendor dashboard deliveryTime menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.deliveryTime);
    });

    test('dokan vendor dashboard reviews menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.reviews);
    });

    test('dokan vendor dashboard withdraw menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.withdraw);
    });

    test('dokan vendor dashboard reverseWithdrawal menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.reverseWithdrawal);
    });

    test('dokan vendor dashboard badges menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.badges);
    });

    test('dokan vendor dashboard productQa menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.productQa);
    });

    test('dokan vendor dashboard returnRequest menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.returnRequest);
    });

    test('dokan vendor dashboard staff menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.staff);
    });

    test('dokan vendor dashboard followers menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.followers);
    });

    test('dokan vendor dashboard booking menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.booking);
    });

    test('dokan vendor dashboard announcements menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.announcements);
    });

    test('dokan vendor dashboard analytics menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.analytics);
    });

    test('dokan vendor dashboard tools menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.tools);
    });

    test('dokan vendor dashboard inbox menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.inbox);
    });

    test('dokan vendor dashboard storeSupport menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.storeSupport);
    });

    test('dokan vendor dashboard store settings menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsStore);
    });

    test('dokan vendor dashboard addon settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsAddon);
    });

    test('dokan vendor dashboard payment settings menu', { tag: ['@lite', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsPayment);
    });

    test('dokan vendor dashboard verification settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsVerification);
    });

    test('dokan vendor dashboard delivery time settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsDeliveryTime);
    });

    test('dokan vendor dashboard shipping settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsShipping);
    });

    test('dokan vendor dashboard shipstation settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsShipStation);
    });

    test('dokan vendor dashboard social profile settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsSocialProfile);
    });

    test('dokan vendor dashboard rma settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsRma);
    });

    test('dokan vendor dashboard printful settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsPrintful);
    });

    test('dokan vendor dashboard seo settings menu', { tag: ['@pro', '@visual'] }, async () => {
        await vendor.vendorDashboardMenu(data.subUrls.frontend.vDashboard.settingsSeo);
    });
});
