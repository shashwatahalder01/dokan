import { test, expect, type Page } from '@playwright/test'
import { endPoints } from '../../utils/apiEndPoints'
import { payloads } from '../../utils/payloads'


//TODO: need to send vendor credentials for vendor info
test.only('get all product variations', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    // let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    console.log(responseBody1)

    // const response = await request.get(endPoints.getAllProductVariations(productId))
    // const responseBody = await response.json()
    // console.log(responseBody)

    // expect(response.ok()).toBeTruthy()
    // expect(response.status()).toBe(200)
});


test('get single product variation', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p2_v1')).id
    // console.log(responseBody1)

    const response = await request.get(endPoints.getSingleProductVariation(productId))
    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});


test('create a product variation', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p1_v1')).id
    // console.log(responseBody1)

    const response = await request.post(endPoints.postCreateProductVariation(productId),{data: payloads.createProduct})
    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});


test('update a product', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p1_v1')).id
    // console.log(responseBody1)


    const response = await request.put(endPoints.putUpdateProductVariation(productId),{data: payloads.updateProduct})
    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});


test('delete a product', async ({ request }) => {
    const response1 = await request.get(endPoints.getAllProducts)
    const responseBody1 = await response1.json()
    let productId = (responseBody1.find(o => o.name === 'p1_v1')).id
    // console.log(responseBody1)

    const response = await request.delete(endPoints.delDeleteProductVariation(productId))
    const responseBody = await response.json()
    console.log(responseBody)

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
});