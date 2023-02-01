import { test, expect } from '@playwright/test';
import { ApiUtils } from '../utils/apiUtils';
import { endPoints } from '../utils/apiEndPoints';
import { payloads } from '../utils/payloads';

let apiUtils: any;
let attributeId: string;

test.beforeAll( async ( { request } ) => {
	apiUtils = new ApiUtils( request );
	const [ , id ] = await apiUtils.createAttribute( payloads.createAttribute() );
	attributeId = id;
} );

// test.afterAll(async ({ request }) => { });
// test.beforeEach(async ({ request }) => { });
// test.afterEach(async ({ request }) => { });

test.describe( 'attribute api test', () => {
	test( 'get all attributes', async ( { request } ) => {
		const response = await request.get( endPoints.getAllAttributes );
		const responseBody = await apiUtils.getResponseBody( response );
		expect( response.ok() ).toBeTruthy();
	} );

	test( 'get single attribute', async ( { request } ) => {
		// let [, attributeId] = await apiUtils.createAttribute(payloads.createAttribute())

		const response = await request.get( endPoints.getSingleAttribute( attributeId ) );
		const responseBody = await apiUtils.getResponseBody( response );
		expect( response.ok() ).toBeTruthy();
	} );

	test( 'create an attribute', async ( { request } ) => {
		const response = await request.post( endPoints.createAttribute, { data: payloads.createAttribute() } );
		const responseBody = await apiUtils.getResponseBody( response );
		expect( response.ok() ).toBeTruthy();
		expect( response.status() ).toBe( 201 );
	} );

	test( 'update an attribute', async ( { request } ) => {
		// let [, attributeId] = await apiUtils.createAttribute(payloads.createAttribute())

		const response = await request.put( endPoints.updateAttribute( attributeId ), { data: payloads.updateAttribute() } );
		const responseBody = await apiUtils.getResponseBody( response );
		expect( response.ok() ).toBeTruthy();
	} );

	test( 'delete an attribute', async ( { request } ) => {
		// let [, attributeId] = await apiUtils.createAttribute(payloads.createAttribute())

		const response = await request.delete( endPoints.deleteAttribute( attributeId ) );
		const responseBody = await apiUtils.getResponseBody( response );
		expect( response.ok() ).toBeTruthy();
	} );

	test( 'update batch attributes', async ( { request } ) => {
		const allAttributeIds = ( await apiUtils.getAllAttributes() ).map( ( a: { id: any } ) => a.id );
		// console.log(allAttributeIds)

		const batchAttributes = [];
		for ( const attributeId of allAttributeIds.slice( 0, 2 ) ) {
			batchAttributes.push( { ...payloads.updateBatchAttributesTemplate(), id: attributeId } );
		}
		// console.log(batchAttributes)

		const response = await request.put( endPoints.batchUpdateAttributes, { data: { update: batchAttributes } } );
		const responseBody = await apiUtils.getResponseBody( response );
		expect( response.ok() ).toBeTruthy();
	} );
} );