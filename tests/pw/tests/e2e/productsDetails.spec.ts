import { test, request, Page } from '@playwright/test';
import { ProductsPage } from '@pages/productsPage';
import { ApiUtils } from '@utils/apiUtils';
import { dbUtils } from '@utils/dbUtils';
import { data } from '@utils/testData';
import { dbData } from '@utils/dbData';
import { payloads } from '@utils/payloads';
import { responseBody } from '@utils/interfaces';
import { serialize } from 'php-serialize';

test.describe('Product details functionality test', () => {
    let vendor: ProductsPage;
    let vPage: Page;
    let apiUtils: ApiUtils;
    let productResponseBody: responseBody;
    let productName: string;

    test.beforeAll(async ({ browser }) => {
        const vendorContext = await browser.newContext(data.auth.vendorAuth);
        vPage = await vendorContext.newPage();
        vendor = new ProductsPage(vPage);

        apiUtils = new ApiUtils(await request.newContext());
        [productResponseBody, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth); // ToDo: add a payload with only required fields
        // todo: need another product with all fields added
    });

    test.afterAll(async () => {
        // await apiUtils.deleteAllProducts(payloads.vendorAuth);
        await vPage.close();
        await apiUtils.dispose();
    });

    // vendor

    // product edit

    // product title

    test('vendor can add product title', { tag: ['@lite', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        await vendor.addProductTitle(productName, data.product.productInfo.title);
    });

    // product permalink

    test('vendor can add product permalink', { tag: ['@lite', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        await vendor.addProductPermalink(productName, data.product.productInfo.permalink);
    });

    // product price

    test('vendor can add product price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addPrice(productName, data.product.productInfo.price());
    });

    // product discount price

    test('vendor can add product discount price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDiscount(productName, { ...data.product.productInfo.discount, regularPrice: productResponseBody.price });
    });

    test('vendor can add product discount price (with schedule)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDiscount(productName, { ...data.product.productInfo.discount, regularPrice: productResponseBody.price }, true);
    });

    test('vendor can remove product discount price', { tag: ['@lite', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct({ ...payloads.createDiscountProduct(), date_on_sale_from: '', date_on_sale_to: '' }, payloads.vendorAuth);
        await vendor.removeDiscount(productName);
    });

    test('vendor can remove product discount schedule', { tag: ['@lite', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createDiscountProduct(), payloads.vendorAuth);
        await vendor.removeDiscount(productName, true);
    });

    // product category

    test('vendor can add product category (single)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.vendorAddProductCategory(productName, [data.product.category.clothings]);
    });

    // todo: retest on lite [why lite pass it]
    test('vendor can add product category (multiple)', { tag: ['@pro', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { product_category_style: 'multiple' });
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        await vendor.vendorAddProductCategory(productName, data.product.category.categories, true);
    });

    test('vendor can add multi-step product category (last category)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.vendorAddProductCategory(productName, [data.product.category.multistepCategories.at(-1)!]);
    });

    test('vendor can add multi-step product category (any category)', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { dokan_any_category_selection: 'on' });
        await vendor.vendorAddProductCategory(productName, [data.product.category.multistepCategories.at(-2)!]);
    });

    test("vendor can't add multi-step product category (any category)", { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { dokan_any_category_selection: 'off' });
        await vendor.vendorCantAddCategory(productName, data.product.category.multistepCategories.at(-2)!);
    });

    test.skip('vendor can remove product category (multiple)', { tag: ['@pro', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { product_category_style: 'multiple' });
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth); // need multiple categories
        await vendor.vendorAddProductCategory(productName, data.product.category.categories, true);
    });

    // product tags

    test('vendor can add product tags', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductTags(productName, data.product.productInfo.tags.tags);
    });

    test('vendor can create product tags', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductTags(productName, data.product.productInfo.tags.randomTags);
    });

    test.skip('vendor can remove product tags', { tag: ['@lite', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth); // need tags
        await vendor.addProductTags(productName, data.product.productInfo.tags.tags);
    });

    // product cover image

    test('vendor can add product cover image', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductCoverImage(productName, data.product.productInfo.images.cover);
    });

    // product gallery image

    test('vendor can add product gallery image', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductGalleryImages(productName, data.product.productInfo.images.gallery);
    });

    // product short description

    test('vendor can add product short description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductShortDescription(productName, data.product.productInfo.description.shortDescription);
    });

    test('vendor can remove product short description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductShortDescription(productName, '');
    });

    // product description

    test('vendor can add product description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductDescription(productName, data.product.productInfo.description.description);
    });

    // product downloadable options

    test('vendor can add product downloadable options', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductDownloadableOptions(productName, data.product.productInfo.downloadableOptions);
    });

    test.skip('vendor can remove product downloadable file', { tag: ['@lite', '@vendor'] }, async () => {
        const [responseBody] = await apiUtils.uploadMedia('../../tests/pw/utils/sampleData/avatar.png', payloads.mimeTypes.png, payloads.adminAuth); // todo: update image path
        const downloads = [
            {
                id: String(responseBody.id),
                name: responseBody.title.raw,
                file: responseBody.source_url,
            },
        ];
        console.log(downloads);

        [, , productName] = await apiUtils.createProduct({ ...payloads.createDownloadableProduct(), downloads: downloads }, payloads.vendorAuth);
        console.log(productName);
        // await vendor.removeDownloadableFile(productName);
    });

    // product inventory options

    test('vendor can add product inventory options (SKU)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, data.product.productInfo.inventory, 'sku');
    });

    test('vendor can add product inventory options (stock status)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, data.product.productInfo.inventory, 'stock-status');
    });

    test('vendor can add product inventory options (stock management)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, data.product.productInfo.inventory, 'stock-management');
    });

    test('vendor can add product inventory options (allow single quantity)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, data.product.productInfo.inventory, 'one-quantity');
    });

    // product other options

    test('vendor can add product other options (product status)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, data.product.productInfo.otherOptions, 'status');
    });

    test('vendor can add product other options (visibility)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, data.product.productInfo.otherOptions, 'visibility');
    });

    test('vendor can add product other options (purchase note)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, data.product.productInfo.otherOptions, 'purchaseNote');
    });

    test('vendor can add product other options (product review)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, data.product.productInfo.otherOptions, 'reviews');
    });

    test('vendor can remove product other options (purchase note)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, data.product.productInfo.otherOptions, 'purchaseNote'); //todo: need a product with purchase note
        await vendor.addProductOtherOptions(productName, { ...data.product.productInfo.otherOptions, purchaseNote: '' }, 'purchaseNote');
    });

    test('vendor can remove product other options (product review)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, data.product.productInfo.otherOptions, 'reviews'); //todo: need a product with enabled reviews
        await vendor.addProductOtherOptions(productName, { ...data.product.productInfo.otherOptions, enableReview: false }, 'reviews');
    });

    // catalog mode

    // todo: move to catalog page

    test('vendor can add product catalog mode', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on' });
        await vendor.addProductCatalogMode(productName);
    });

    test('vendor can add product catalog mode (with price hidden)', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on', catalog_mode_hide_product_price: 'on' });
        await vendor.addProductCatalogMode(productName, true);
    });

    test('vendor can remove product catalog mode', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on', catalog_mode_hide_product_price: 'on' });
        await vendor.addProductCatalogMode(productName, true); // todo: need a product with catalog mode
        await vendor.removeProductCatalogMode(productName);
    });

    test('vendor can remove product catalog mode (price hidden option)', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on', catalog_mode_hide_product_price: 'on' });
        await vendor.addProductCatalogMode(productName, true); // todo: need a product with catalog mode
        await vendor.removeProductCatalogMode(productName, true);
    });

    // shipping and tax

    test('vendor can add product shipping', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductShipping(productName, data.product.productInfo.shipping);
    });

    test('vendor can add product tax', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductTax(productName, data.product.productInfo.tax);
    });

    test('vendor can add product tax (with tax class)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductTax(productName, data.product.productInfo.tax, true);
    });

    // linked products

    test('vendor can add product linked products (up-sells)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductLinkedProducts(productName, data.product.productInfo.linkedProducts, 'up-sells');
    });

    test('vendor can add product linked products (cross-sells)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductLinkedProducts(productName, data.product.productInfo.linkedProducts, 'cross-sells');
    });

    // todo: vendor can remove product linked products

    // attribute

    test('vendor can add product attribute', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductAttribute(productName, data.product.productInfo.attribute);
    });

    test('vendor can add product attribute term', { tag: ['@pro', '@vendor'] }, async () => {
        const [, , , attributeName] = await apiUtils.createAttributeTerm(payloads.createAttribute(), payloads.createAttributeTerm(), payloads.adminAuth);
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        await vendor.addProductAttribute(productName, { ...data.product.productInfo.attribute, attributeName: attributeName }, true);
    });

    test('vendor can remove product attribute', { tag: ['@pro', '@vendor'] }, async () => {
        const [, attributeId, , attributeName, attributeTerm] = await apiUtils.createAttributeTerm(payloads.createAttribute(), payloads.createAttributeTerm(), payloads.adminAuth);
        const attributes = { id: attributeId, name: attributeName, options: [attributeTerm] };
        const [, , productName] = await apiUtils.createProduct({ ...payloads.createProduct(), attributes: [attributes] }, payloads.vendorAuth);
        await vendor.removeProductAttribute(productName, attributeName);
    });

    // todo: vendor can remove product attribute term

    // discount options

    test('vendor can add product bulk discount options', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductBulkDiscountOptions(productName, data.product.productInfo.quantityDiscount);
    });

    test('vendor can remove product bulk discount options', { tag: ['@pro', '@vendor'] }, async () => {
        //todo: need a product with bulk discount options
        await vendor.addProductBulkDiscountOptions(productName, data.product.productInfo.quantityDiscount);
        await vendor.removeProductBulkDiscountOptions(productName);
    });

    // geolocation

    test('vendor can add product geolocation (individual)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductGeolocation(productName, data.product.productInfo.geolocation);
    });

    test('vendor can remove product geolocation (individual)', { tag: ['@pro', '@vendor'] }, async () => {
        //todo: need a product with geolocation
        await vendor.addProductGeolocation(productName, data.product.productInfo.geolocation);
        await vendor.removeProductGeolocation(productName);
    });

    // EU compliance options

    test.skip('vendor can add product EU compliance data', { tag: ['@pro', '@vendor'] }, async () => {
        // todo: duplicate test from euCompliance
        await vendor.addProductEuCompliance(productName, data.product.productInfo.euCompliance);
    });

    // addon
    // todo: duplicate test from product addons

    test('vendor can add product addon', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductAddon(productName, data.product.productInfo.addon);
    });

    test('vendor can import product addon', { tag: ['@pro', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        const addon = payloads.createProductAddon();
        await vendor.importAddon(productName, serialize([addon]), addon.name);
    });

    test('vendor can export product addon', { tag: ['@pro', '@vendor'] }, async () => {
        const [, productId, productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        const responseBody = await apiUtils.updateProduct(productId, { meta_data: [{ key: '_product_addons', value: [payloads.createProductAddon()] }] }, payloads.vendorAuth);
        await vendor.exportAddon(productName, serialize(apiUtils.getMetaDataValue(responseBody.meta_data, '_product_addons')));
    });

    test('vendor can delete product addon', { tag: ['@pro', '@vendor'] }, async () => {
        const addon = payloads.createProductAddon();
        const [, productId, productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        await apiUtils.updateProduct(productId, { meta_data: [{ key: '_product_addons', value: [addon] }] }, payloads.vendorAuth);
        await vendor.deleteAddon(productName, addon.name);
    });

    // rma options

    test('vendor can add product rma options (no warranty)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductRmaOptions(productName, { ...data.vendor.rma, type: 'no_warranty' });
    });

    test('vendor can add product rma options (warranty included limited)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductRmaOptions(productName, data.vendor.rma);
    });

    test('vendor can add product rma options (warranty included lifetime)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductRmaOptions(productName, { ...data.vendor.rma, length: 'lifetime' });
    });

    test('vendor can add product rma options (warranty as addon)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductRmaOptions(productName, { ...data.vendor.rma, type: 'addon_warranty' });
    });

    test('vendor can remove product rma options', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.removeProductRmaOptions(productName);
    });

    // wholesale options

    test('vendor can add product wholesale options', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductWholesaleOptions(productName, data.product.productInfo.wholesaleOption);
    });

    test('vendor can remove product wholesale options', { tag: ['@pro', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createWholesaleProduct(), payloads.vendorAuth); // todo: create a product with all options
        await vendor.removeProductWholesaleOptions(productName);
    });

    // mix-max options

    test('vendor can add product min-max options', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductMinMaxOptions(productName, data.product.productInfo.minMax);
    });

    test("vendor can't add product min limit grater than max limit", { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.cantAddGreaterMin(productName, { minimumProductQuantity: '100', maximumProductQuantity: '50' });
    });

    test('vendor can remove product min-max options', { tag: ['@pro', '@vendor'] }, async () => {
        // todo: product create api, doesn't have min-max meta support
        await vendor.addProductMinMaxOptions(productName, data.product.productInfo.minMax); // need product with min-max options via api
        await vendor.removeProductMinMaxOptions(productName, { minimumProductQuantity: '', maximumProductQuantity: '' });
    });

    // todo: advertising
    // todo: rank math seo
    // todo: variation options
});
