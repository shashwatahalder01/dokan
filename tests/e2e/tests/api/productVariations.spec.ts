import { test, expect, type Page } from '@playwright/test'
import { endPoints } from '../../utils/apiEndPoints'
import { payloads } from '../../utils/payloads'


//TODO: need to send vendor credentials for vendor info
test('get all product variations', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    // console.log(responseBody1)

    const response = await request.get(endPoints.getAllProductVariations(productId))

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});


test('get single product variation', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    // console.log(responseBody1)

    const response2 = await request.get(endPoints.getAllProductVariations(productId))
    const responseBody2 = await response2.json()
    // console.log(responseBody2[0].id)
    let variationId = responseBody2[0].id


    const response = await request.get(endPoints.getSingleProductVariation(productId, variationId))
    const responseBody = await response.json()
    console.log(responseBody)

    // expect(response.ok()).toBeTruthy()
    // expect(response.status()).toBe(200)
});


test.skip('create a product variation', async ({ request }) => { //TODO: not generate attribute
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    // console.log(responseBody1)

    const response = await request.post(endPoints.postCreateProductVariation(productId),{data: payloads.creatrProductvariation})
    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});


test('update a product variation', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    // console.log(responseBody1)

    const response2 = await request.get(endPoints.getAllProductVariations(productId))
    const responseBody2 = await response2.json()
    // console.log(responseBody2[0].id)
    let variationId = responseBody2[0].id


    const response = await request.put(endPoints.putUpdateProductVariation(productId,variationId),{data: payloads.updateProductVariation})
    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});


test('delete a product variation', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    console.log(responseBody1)
    console.log(productId)

    const response2 = await request.get(endPoints.getAllProductVariations(productId))
    const responseBody2 = await response2.json()
    // console.log(responseBody2)
    // console.log(responseBody2[0].id)
    let variationId = responseBody2[0].id

    const response = await request.delete(endPoints.delDeleteProductVariation(productId, variationId))
    const responseBody = await response.json()
    console.log(responseBody)


    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});