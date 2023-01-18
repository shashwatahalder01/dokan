import { test, expect } from '@playwright/test'
import { ApiUtils } from '../../utils/apiUtils'
import { endPoints } from '../../utils/apiEndPoints'
import { payloads } from '../../utils/payloads'

let apiUtils: any
let orderId: string


test.beforeAll(async ({ request }) => {
    apiUtils = new ApiUtils(request)
    let [, id] = await apiUtils.createOrder(payloads.createProduct(), payloads.createOrder)
    orderId = id
});

// test.afterAll(async ({ request }) => { });
// test.beforeEach(async ({ request }) => { });
// test.afterEach(async ({ request }) => { });


test.describe('orders api test', () => {

    test('update batch orders @v2', async ({ request }) => {
        let allOrderIds = (await apiUtils.getAllOrders()).map((a: { id: any }) => a.id)
        // console.log(allOrderIds)
        
        let response = await request.post(endPoints.updateBatchOrders, { data: { order_ids: allOrderIds, status: "wc-completed" } })
        let responseBody = await apiUtils.getResponseBody(response)
        expect(response.ok()).toBeTruthy()
    });

});