import { test, expect } from '@playwright/test';
import { ApiUtils } from '../utils/apiUtils';
import { endPoints } from '../utils/apiEndPoints';
import { payloads } from '../utils/payloads';
import { helpers } from '../utils/helpers';

let apiUtils: any;
let randomModule: string;

test.beforeAll(async ({ request }) => {
	apiUtils = new ApiUtils(request);
	randomModule = helpers.randomItem(await apiUtils.getAllModuleIds());
});

// test.afterAll(async ({ request }) => { });
// test.beforeEach(async ({ request }) => { });
// test.afterEach(async ({ request }) => { });

test.describe('modules api test', () => {
	test('get all modules', async ({ request }) => {
		const response = await request.get(endPoints.getAllModules);
		const responseBody = await apiUtils.getResponseBody(response);
		expect(response.ok()).toBeTruthy();
	});

	test('deactivate a module', async ({ request }) => {
		// let randomModule = helpers.randomItem(await apiUtils.getAllModuleIds())

		const response = await request.put(endPoints.deactivateModule, { data: { module: [randomModule] } });
		const responseBody = await apiUtils.getResponseBody(response);
		expect(response.ok()).toBeTruthy();

		//reactivate module
		// await apiUtils.activateModules(randomModule)
	});

	test('activate a module', async ({ request }) => {
		// let randomModule = helpers.randomItem(await apiUtils.getAllModuleIds())

		const response = await request.put(endPoints.activateModule, { data: { module: [randomModule] } });
		const responseBody = await apiUtils.getResponseBody(response);
		expect(response.ok()).toBeTruthy();
	});
});
