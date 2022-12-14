import { test, expect } from '@playwright/test'
import { ApiUtils } from '../../utils/apiUtils'
import { endPoints } from '../../utils/apiEndPoints'
import { payloads } from '../../utils/payloads'


// test.beforeAll(async ({ request }) => {
//     let apiUtils = new ApiUtils(request)
//     let orderId = await apiUtils.createOrderWithStatus(payloads.createOrder, 'wc-completed')
//     await apiUtils.createRefund(orderId, payloads.createRefund)
// });

// test.afterAll(async ({ request }) => { });
// test.beforeEach(async ({ request }) => { });
// test.afterEach(async ({ request }) => { });


test.describe.skip('refunds api test', () => {

    //TODO: need to send vendor credentials for vendor info
    //TODO: orders
    //TODO: has more endpoints to cover
    //TODO: need to refund from dokan not via wc


    test('get all refunds', async ({ request }) => {
        let apiUtils = new ApiUtils(request)
        let orderId = await apiUtils.createOrderWithStatus(payloads.createOrder, 'wc-completed')
        await apiUtils.createRefund(orderId, payloads.createRefund)

        let response = await request.get(endPoints.getAllRefunds)
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)

        let responseBody = await response.json()
        // console.log(responseBody)
    });

    test('get all refunds by status', async ({ request }) => {
        // let response = await request.get(endPoints.getAllRefundsByStatus('pending')) // pending, cancelled, completed
        let response = await request.get(endPoints.getAllRefundsByStatus('completed')) // pending, cancelled, completed
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)

        let responseBody = await response.json()
        // console.log(responseBody)
    });

    test.only('approve a refund', async ({ request }) => {
        let apiUtils = new ApiUtils(request)
        // let refundId = await apiUtils.getRefundId()
        let orderId = await apiUtils.createOrderWithStatus(payloads.createOrder, 'wc-completed')
        let [, refundId] = await apiUtils.createRefund(orderId, payloads.createRefund)
        console.log(orderId,refundId)
        let response = await request.put(endPoints.approveRefund(refundId))
        console.log(response.status())
        console.log(await response.text())
        // expect(response.ok()).toBeTruthy()
        // expect(response.status()).toBe(200)

        // let responseBody = await response.json()
        // console.log(responseBody)
    });

    test('cancel a refund', async ({ request }) => {
        let apiUtils = new ApiUtils(request)
        let orderId = await apiUtils.createOrderWithStatus(payloads.createOrder, 'wc-completed')
        let [, refundId] = await apiUtils.createRefund(orderId, payloads.createRefund)
        // let refundId = await apiUtils.getRefundId()

        let response = await request.put(endPoints.cancelRefund(refundId))
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)

        // let responseBody = await response.json()
        // console.log(responseBody)
    });

    test('delete a refund', async ({ request }) => {
        let apiUtils = new ApiUtils(request)
        let refundId = await apiUtils.getRefundId()

        let response = await request.delete(endPoints.deleteRefund(refundId))
        expect(response.ok()).toBeTruthy()
        expect(response.status()).toBe(200)

        // let responseBody = await response.json()
        // console.log(responseBody)


    });

});


