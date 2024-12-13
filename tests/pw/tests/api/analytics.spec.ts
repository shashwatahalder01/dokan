import { test, request } from '@playwright/test';
import { ApiUtils } from '@utils/apiUtils';
// import { dbUtils } from '@utils/dbUtils';
import { payloads } from '@utils/payloads';
// import { dbData } from '@utils/dbData';
// import { helpers } from '@utils/helpers';

// const { DOKAN_PRO } = process.env;

test.use({ extraHTTPHeaders: payloads.adminAuth });

test.describe.skip('Analytics test', () => {
    let apiUtils: ApiUtils;

    let analytics = {
        products: {
            items_sold: 0,
            net_revenue: 0,
            orders_count: 0,
            products_count: 0,
            variations_count: 0,
            segments: [],
        },

        revenue: {
            orders_count: 0,
            num_items_sold: 0,
            gross_sales: 0,
            total_sales: 0,
            coupons: 0,
            coupons_count: 0,
            refunds: 0,
            taxes: 0,
            shipping: 0,
            net_revenue: 0,
            avg_items_per_order: 0,
            avg_order_value: 0,
            total_customers: 0,
            products: 0,
            segments: [],
        },

        orders: {
            orders_count: 0,
            num_items_sold: 0,
            gross_sales: 0,
            total_sales: 0,
            coupons: 0,
            coupons_count: 0,
            refunds: 0,
            taxes: 0,
            shipping: 0,
            net_revenue: 0,
            avg_items_per_order: 0,
            avg_order_value: 0,
            total_customers: 0,
            avg_admin_commission: 0,
            avg_seller_earning: 0,
            total_seller_earning: 0,
            total_seller_gateway_fee: 0,
            total_seller_discount: 0,
            total_admin_commission: 0,
            total_admin_gateway_fee: 0,
            total_admin_discount: 0,
            total_admin_subsidy: 0,
            products: 0,
            segments: [],
        },
    };

    test.beforeAll(async () => {
        apiUtils = new ApiUtils(await request.newContext());
        // await apiUtils.setUpTaxRate(payloads.enableTax, { ...payloads.createTaxRate, rate: '10' });
        // await dbUtils.setOptionValue(dbData.dokan.optionName.selling, dbData.dokan.sellingSettings);
    });

    test.afterAll(async () => {
        await apiUtils.dispose();
    });

    test('Analytics test', { tag: ['@pro'] }, async () => {
        test.slow();

        // todo: need fresh site
        analytics = await apiUtils.getWcAnalytics();

        // place a single product
        const [, responseBody] = await apiUtils.createOrder({ ...payloads.createProduct(), regular_price: '100' }, payloads.createOrder, payloads.adminAuth);
        // console.log(responseBody);

        analytics.products.items_sold += responseBody.line_items.length;
        analytics.products.net_revenue = Number(responseBody.total - responseBody?.total_tax - responseBody?.shipping_total + responseBody?.discount_total);
        analytics.products.orders_count += 1;
        analytics.products.products_count += responseBody.line_items.length;
        console.log(analytics.products);
        await pause(50);
        const wcAnalytics = await apiUtils.getWcAnalytics();
        console.log(wcAnalytics.products);
    });
});

function pause(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
