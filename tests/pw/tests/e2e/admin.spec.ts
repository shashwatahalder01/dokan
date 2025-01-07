import { test } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';
import { data } from '@utils/testData';

test.describe('Admin functionality test', () => {
    test.only('admin can login', { tag: ['@lite', '@admin'] }, async ({ page }) => {
        await page.goto('https://www.google.com/');
        await page.getByLabel('Search', { exact: true }).click();
        await page.getByLabel('Search', { exact: true }).fill('playwright.dev');
        await page.goto(
            'https://www.google.com/search?q=playwright.dev&sca_esv=445ea37e19471e67&hl=en&source=hp&ei=p-d8Z4euGMGJ4dUPwLHBuAM&iflsig=AL9hbdgAAAAAZ3z1t0_0F54ioUTUzvVc6jgP2g_yFzvM&ved=0ahUKEwjHnYiumuOKAxXBRLgEHcBYEDcQ4dUDCA4&uact=5&oq=playwright.dev&gs_lp=Egdnd3Mtd2l6Ig5wbGF5d3JpZ2h0LmRldjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjbS1CeE1ioR3AGeACQAQCYAbMBoAH8D6oBBDMuMTS4AQPIAQD4AQGYAhegAsoQqAIKwgIKEAAYAxjqAhiPAcICChAuGAMY6gIYjwHCAggQABiABBixA8ICCxAAGIAEGLEDGIMBwgILEC4YgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICCxAuGIAEGNEDGMcBwgIHEAAYgAQYCsICBBAAGB7CAgYQABgKGB7CAgYQABgIGB7CAggQABgIGAoYHpgDBvEFu5uprVvqxY-SBwQ5LjE0oAeEZg&sclient=gws-wiz',
        );
        await page.getByRole('link', { name: 'Playwright: Fast and reliable' }).click();
    });

    test('admin can logout', { tag: ['@lite', '@admin'] }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.adminLogin(data.admin);
        await loginPage.logoutBackend();
    });
});
