import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type AxeFixture = {
    axeBuilder: () => AxeBuilder;
    attachResults: (attachResults: any) => Promise<any>;
};

export const test = base.extend<AxeFixture>({
    axeBuilder: async ({ page }, use) => {
        const makeAxeBuilder = () =>
            new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .withRules([
                    'accesskeys',
                    'aria-allowed-role',
                    'aria-conditional-attr',
                    'aria-deprecated-role',
                    'aria-dialog-name',
                    'aria-prohibited-attr',
                    'aria-treeitem-name',
                    'aria-text',
                    'empty-heading',
                    'heading-order',
                    'html-xml-lang-mismatch',
                    'identical-links-same-purpose',
                    'image-redundant-alt',
                    'input-button-name',
                    'label-content-name-mismatch',
                    'landmark-one-main',
                    'link-in-text-block',
                    'meta-viewport',
                    'select-name',
                    'skip-link',
                    'tabindex',
                    'table-duplicate-name',
                    'table-fake-caption',
                    'target-size',
                    'td-has-header',
                ]);
        // .exclude(['#element-with-known-issue', '#commonly-reused-element-with-known-issue'])
        // .disableRules(['duplicate-id']);
        await use(makeAxeBuilder);
    },

    attachResults: async ({}: any, use, testInfo) => {
        const attachResult = async (accessibilityScanResults: any) => {
            await testInfo.attach('accessibility-scan-results', {
                body: JSON.stringify(accessibilityScanResults, null, 2),
                contentType: 'application/json',
            });
            return accessibilityScanResults;
        };

        await use(attachResult);
    },
});
export { expect } from '@playwright/test';
