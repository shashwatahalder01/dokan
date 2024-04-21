import { test, request, Page } from '@playwright/test';
import { WithdrawsPage } from '@pages/withdrawsPage';
import { ApiUtils } from '@utils/apiUtils';
import { data } from '@utils/testData';
import { payloads } from '@utils/payloads';

const { PRODUCT_ID } = process.env;

test.describe('Withdraw test', () => {
    let admin: WithdrawsPage;
    let vendor: WithdrawsPage;
    let aPage: Page, vPage: Page;
    let apiUtils: ApiUtils;
    let currentBalance: string;
    let minimumWithdrawLimit: string;

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        aPage = await adminContext.newPage();
        admin = new WithdrawsPage(aPage);

        const vendorContext = await browser.newContext(data.auth.vendorAuth);
        vPage = await vendorContext.newPage();
        vendor = new WithdrawsPage(vPage);

        apiUtils = new ApiUtils(await request.newContext());
        [currentBalance, minimumWithdrawLimit] = await apiUtils.getMinimumWithdrawLimit(payloads.vendorAuth);
        await apiUtils.createOrderWithStatus(PRODUCT_ID, { ...payloads.createOrder, line_items: [{ quantity: 10 }] }, 'wc-completed', payloads.vendorAuth);
        await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit }, payloads.vendorAuth);
    });

    test.afterAll(async () => {
        await aPage.close();
        await vPage.close();
        await apiUtils.dispose();
    });

    test('admin withdraw menu page is rendering properly', { tag: ['@lite', '@exp', '@admin'] }, async () => {
        await admin.adminWithdrawsRenderProperly();
    });

    test('admin can filter withdraws by vendor', { tag: ['@lite', '@admin'] }, async () => {
        await admin.filterWithdraws(data.predefined.vendorStores.vendor1, 'by-vendor');
    });

    test('admin can filter withdraws by payment methods', { tag: ['@lite', '@admin'] }, async () => {
        await admin.filterWithdraws(data.vendor.withdraw.defaultWithdrawMethod.paypal, 'by-payment-method');
    });

    test('admin can export withdraws', { tag: ['@lite', '@admin'] }, async () => {
        await admin.exportWithdraws();
    });

    test('admin can add note to withdraw request', { tag: ['@lite', '@admin'] }, async () => {
        await admin.addNoteWithdrawRequest(data.predefined.vendorStores.vendor1, 'test withdraw note');
    });

    test('admin can approve withdraw request', { tag: ['@lite', '@admin'] }, async () => {
        await admin.updateWithdrawRequest(data.predefined.vendorStores.vendor1, 'approve');
    });

    test('admin can cancel withdraw request', { tag: ['@lite', '@admin'] }, async () => {
        await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit }, payloads.vendorAuth);
        await admin.updateWithdrawRequest(data.predefined.vendorStores.vendor1, 'cancel');
    });

    test('admin can delete withdraw request', { tag: ['@lite', '@admin'] }, async () => {
        await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit }, payloads.vendorAuth);
        await admin.updateWithdrawRequest(data.predefined.vendorStores.vendor1, 'delete');
    });

    test('admin can perform withdraw bulk actions', { tag: ['@lite', '@admin'] }, async () => {
        await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit }, payloads.vendorAuth);
        await admin.withdrawBulkAction('cancelled');
    });

    // vendor

    test('vendor withdraw menu page is rendering properly', { tag: ['@lite', '@exp', '@vendor'] }, async () => {
        await vendor.vendorWithdrawRenderProperly();
    });

    test('vendor withdraw requests page is rendering properly', { tag: ['@lite', '@exp', '@vendor'] }, async () => {
        await vendor.vendorWithdrawRequestsRenderProperly();
    });

    test.skip('vendor can request withdraw', { tag: ['@lite', '@vendor'] }, async () => {
        await apiUtils.cancelWithdraw('', payloads.vendorAuth);
        await vendor.requestWithdraw({ ...data.vendor.withdraw, minimumWithdrawAmount: minimumWithdrawLimit, currentBalance: currentBalance });
    });

    test("vendor can't request withdraw when pending request exits", { tag: ['@lite', '@vendor'] }, async () => {
        await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit }, payloads.vendorAuth);
        await vendor.cantRequestWithdraw();
    });

    test('vendor can cancel request withdraw', { tag: ['@lite', '@vendor'] }, async () => {
        await apiUtils.createWithdraw({ ...payloads.createWithdraw, amount: minimumWithdrawLimit }, payloads.vendorAuth);
        await vendor.cancelWithdrawRequest();
    });

    test('vendor can add auto withdraw disbursement schedule', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addAutoWithdrawDisbursementSchedule({ ...data.vendor.withdraw, minimumWithdrawAmount: minimumWithdrawLimit });
    });

    test('vendor can add default withdraw payment methods', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDefaultWithdrawPaymentMethods(data.vendor.withdraw.defaultWithdrawMethod.bankTransfer);
        // Cleanup
        await vendor.addDefaultWithdrawPaymentMethods(data.vendor.withdraw.defaultWithdrawMethod.paypal);
    });
});
