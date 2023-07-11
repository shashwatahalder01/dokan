import { test  } from '@playwright/test';
import { data } from 'utils/testData';
import { LoginPage } from 'pages/loginPage';
import { LocalSetupPage } from 'pages/localSetupPage';
import { ApiUtils } from 'utils/apiUtils';
// import { apiEndpoints } from 'utils/apiEndPoints';
import { payloads } from 'utils/payloads';
import { dbUtils } from 'utils/dbUtils';
import { dbData } from 'utils/dbData';


test.describe('setup local site', () => {
	test.skip(!!process.env.CI, 'skip site setup on CI');

	// test('download wordpress to desired folder', async ({ page }) => {
	// 	//TODO: create everything using bash script if needed
	// 	//TODO: get desired folder path
	// 	//TODO: download wordpress zip and unzip it
	// 	//TODO: clone desired plugins to wp-plugins
	// 	//TODO: clone theme to theme folder
	// 	//TODO:
	// 	//TODO:

	// });

	// test('delete database or all tables ', async ({ page }) => {
	//  });


	test('admin setup WP', async ({ page }) => {
		const loginPage = new LoginPage(page);
		const localSetupPage = new LocalSetupPage(page);
		await localSetupPage.setupWp();
		await loginPage.adminLogin(data.admin);
		await localSetupPage.setPermalinkSettings(data.wpSettings.permalink);
	});

	test('activate basic auth plugin', async () => {
		await dbUtils.UpdateWpOptionTable(dbData.optionName.activePlugins, dbData.plugins);
		// await dbUtils.UpdateWpOptionTable(dbData.dokan.optionName.dokanActiveModules, dbData.dokan.modules);
	});

	// test('install and activate theme', async ({ request }) => {} //TODO

	//TODO: skip global setup for local_setup

	test('activate dokan & woocommerce plugins', async ({ request }) => {
		const apiUtils = new ApiUtils(request);
		const plugins = ['woocommerce/woocommerce',
			'dokan/dokan', 'dokan-pro/dokan-pro', 'woocommerce-bookings/woocommerce-bookings', 'woocommerce-product-addons/woocommerce-product-addons', 'woocommerce-simple-auctions/woocommerce-simple-auctions', 'woocommerce-subscriptions/woocommerce-subscriptions'
		];
		for (const plugin of plugins){
			const activePlugins = await apiUtils.updatePlugin(plugin, { status:'active' }, payloads.adminAuth);
			console.log(activePlugins);}
	});

});