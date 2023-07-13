import { request  } from '@playwright/test';
import { ApiUtils } from 'utils/apiUtils';
import { helpers } from 'utils/helpers';

async function globalSetup() {
	console.log('Global Teardown running....');

	// get test environment info
	const apiUtils = new ApiUtils(await request.newContext({ ignoreHTTPSErrors: true }));
	const [, summaryInfo] = await apiUtils.getSystemStatus();
	helpers.writeFile('systemInfo.json', JSON.stringify(summaryInfo));

	console.log('Global Teardown Finished!');
}

export default globalSetup;