import { test, Page } from '@playwright/test';
import { LicensePage } from '@pages/licensePage';
import { data } from '@utils/testData';
import { helpers } from '@utils/helpers';

test.describe.only('License test', () => {
    let admin: LicensePage;
    let aPage: Page;

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        aPage = await adminContext.newPage();
        admin = new LicensePage(aPage);
    });

    test.afterAll(async () => {
        await aPage.close();
    });

    test('dokan license menu page is rendering properly @pro @explo', async () => {
        await admin.adminLicenseRenderProperly();
    });

    test("admin can't activate license with incorrect key @pro @neg", async () => {
        console.log('incorrectKey:',data.dokanLicense.incorrectKey);
        await admin.activateLicense(data.dokanLicense.incorrectKey, 'incorrect');
    });
    
    test('admin can activate license @pro', async ( ) => {
        console.log('correctKey:',data.dokanLicense.correctKey);
        console.log('env key:',process.env.LICENSE_KEY);
        helpers.writeFile('playwright/Info.json', JSON.stringify({key1: data.dokanLicense.correctKey, key2: process.env.LICENSE_KEY  })); 
    	await admin.activateLicense(data.dokanLicense.correctKey);
    });

    test('admin can deactivate license @pro', async ( ) => {
        await admin.activateLicense(data.dokanLicense.correctKey);
    	await admin.deactivateLicense();
    });
});
