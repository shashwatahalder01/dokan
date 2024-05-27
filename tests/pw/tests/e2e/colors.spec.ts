import { test, Page } from '@playwright/test';
import { ColorsPage } from '@pages/colorsPage';
import { data } from '@utils/testData';

test.describe('Color scheme customizer test', () => {
    let admin: ColorsPage;
    let aPage: Page;

    test.beforeAll(async ({ browser }) => {
        const adminContext = await browser.newContext(data.auth.adminAuth);
        aPage = await adminContext.newPage();
        admin = new ColorsPage(aPage);
    });

    test.afterAll(async () => {
        await aPage.close();
    });

    test('admin can switch predefined color palette', { tag: ['@pro', '@admin'] }, async () => {
        await admin.addColorPalette(data.dokanSettings.colors.predefinedPalette.tree, data.dokanSettings.colors.paletteValues.tree, 'predefined');
    });

    test.skip('admin can add custom color palette', { tag: ['@pro', '@admin'] }, async () => {
        //todo: need access to closed shadow dom
        await admin.addCustomColorPalette();
    });

    test.skip('admin can update custom color palette', { tag: ['@pro', '@admin'] }, async () => {
        await admin.addCustomColorPalette();
    });
});
