import { test, expect } from '@fixtures/axe';
import { data } from '@utils/testData';

test.describe('Accessibility test', () => {
    test.only('dashboard page', { tag: ['@lite', '@admin'] }, async ({ page, axeBuilder }, testInfo) => {
        await page.setExtraHTTPHeaders(data.header.admin);
        await page.goto(data.subUrls.frontend.vDashboard.dashboard, { waitUntil: 'domcontentloaded' });

        await test.step('Check accessibility', async () => {
            const { violations } = await axeBuilder().analyze();

            await testInfo.attach('accessibility-scan-results', {
                body: JSON.stringify(violations, null, 2),
                contentType: 'application/json',
            });

            expect(violations).toHaveLength(0);
        });
    });
});
