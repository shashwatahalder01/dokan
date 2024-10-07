import { test, request, Page } from '@playwright/test';
import { ProductsPage } from '@pages/productsPage';
import { ApiUtils } from '@utils/apiUtils';
import { dbUtils } from '@utils/dbUtils';
import { data } from '@utils/testData';
import { dbData } from '@utils/dbData';
import { payloads } from '@utils/payloads';
import { responseBody } from '@utils/interfaces';
import { serialize } from 'php-serialize';

const { CATEGORY_ID } = process.env;

test.describe('Product details functionality test', () => {
    let vendor: ProductsPage;
    let vPage: Page;
    let apiUtils: ApiUtils;
    let productResponseBody: responseBody;
    let productId: string;
    let productName: string; // has all fields
    let productName1: string; // has only required fields

    test.beforeAll(async ({ browser }) => {
        const vendorContext = await browser.newContext(data.auth.vendorAuth);
        vPage = await vendorContext.newPage();
        vendor = new ProductsPage(vPage);

        apiUtils = new ApiUtils(await request.newContext());
        // product with only required fields
        [, , productName1] = await apiUtils.createProduct(payloads.createProductRequiredFields(), payloads.vendorAuth);
        // product with all fields
        // const [, , mediaUrl] = await apiUtils.uploadMedia(data.image.avatar, payloads.mimeTypes.png, payloads.vendorAuth);
        // [productResponseBody, productId, productName] = await apiUtils.createProductWc({ ...payloads.createProductAllFields(), images: [{ src: mediaUrl }, { src: mediaUrl }] }, payloads.vendorAuth); // todo: mediaUrl is not working on git action
        [productResponseBody, productId, productName] = await apiUtils.createProductWc(payloads.createProductAllFields(), payloads.vendorAuth);
        await apiUtils.updateProduct(
            productId,
            {
                meta_data: [
                    { key: '_product_addons', value: [payloads.createProductAddon()] },
                    { key: '_product_addons_exclude_global', value: '1' },
                ],
            },
            payloads.vendorAuth,
        );
    });

    test.afterAll(async () => {
        // await apiUtils.deleteAllProducts(payloads.vendorAuth);
        await vPage.close();
        await apiUtils.dispose();
    });

    // vendor

    // product title

    test('vendor can update product title', { tag: ['@lite', '@vendor'] }, async () => {
        const [, , productName] = await apiUtils.createProduct(payloads.createProduct(), payloads.vendorAuth);
        await vendor.addProductTitle(productName, data.product.productInfo.title);
    });

    // product permalink

    test('vendor can update product permalink', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductPermalink(productName, data.product.productInfo.permalink);
    });

    // product price

    test('vendor can add product price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addPrice(productName1, data.product.productInfo.price());
    });

    test('vendor can update product price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addPrice(productName, data.product.productInfo.price());
    });

    test('vendor can remove product price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.removePrice(productName);
    });

    // product discount price

    test('vendor can add product discount price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDiscount(productName1, data.product.productInfo.discount);
    });

    test('vendor can add product discount price (with schedule)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDiscount(productName1, data.product.productInfo.discount, true);
    });

    test('vendor can update product discount price', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDiscount(productName, { ...data.product.productInfo.discount, regularPrice: productResponseBody.price });
    });

    test('vendor can update product discount price (with schedule)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addDiscount(productName, { ...data.product.productInfo.discount, regularPrice: productResponseBody.price }, true, true);
    });

    test("vendor can't add product discount price higher than price", { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.cantAddGreaterDiscount(productName, { ...data.product.productInfo.discount, regularPrice: productResponseBody.price });
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

    test('vendor can update product category (single)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductCategory(productName, [data.product.category.clothings]);
    });

    test('vendor can add product category (multiple)', { tag: ['@pro', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { product_category_style: 'multiple' });
        await vendor.addProductCategory(productName1, data.product.category.categories, true);
    });

    test('vendor can remove product category (multiple)', { tag: ['@pro', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { product_category_style: 'multiple' });
        const uncategorizedId = await apiUtils.getCategoryId('Uncategorized', payloads.adminAuth);
        const [, , productName] = await apiUtils.createProduct({ ...payloads.createProduct(), categories: [{ id: uncategorizedId }, { id: CATEGORY_ID }] }, payloads.vendorAuth); // need multiple categories
        await vendor.removeProductCategory(productName, [data.product.category.clothings]);
    });

    test('vendor can add multi-step product category (last category)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductCategory(productName1, [data.product.category.multistepCategories.at(-1)!]);
    });

    test('vendor can add multi-step product category (any category)', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { dokan_any_category_selection: 'on' });
        await vendor.addProductCategory(productName, [data.product.category.multistepCategories.at(-2)!]);
    });

    test("vendor can't add multi-step product category (any category)", { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { dokan_any_category_selection: 'off' });
        await vendor.cantAddCategory(productName, data.product.category.multistepCategories.at(-2)!);
    });

    // product tags

    test('vendor can add product tags', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductTags(productName1, data.product.productInfo.tags.tags);
    });

    test('vendor can remove product tags', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.removeProductTags(productName, data.product.productInfo.tags.tags);
    });

    test('vendor can create product tags', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductTags(productName, data.product.productInfo.tags.randomTags);
    });

    // product cover image

    test('vendor can add product cover image', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductCoverImage(productName1, data.product.productInfo.images.cover);
    });

    test('vendor can update product cover image', { tag: ['@lite', '@vendor'] }, async () => {
        // todo: need a product with cover image
        await vendor.addProductCoverImage(productName, data.product.productInfo.images.cover);
        await vendor.addProductCoverImage(productName, data.product.productInfo.images.cover, true);
    });

    test('vendor can remove product cover image', { tag: ['@lite', '@vendor'] }, async () => {
        // todo: need a product with cover image
        await vendor.addProductCoverImage(productName, data.product.productInfo.images.cover, true);
        await vendor.removeProductCoverImage(productName);
    });

    // product gallery image

    test('vendor can add product gallery image', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductGalleryImages(productName1, data.product.productInfo.images.gallery);
    });

    test('vendor can update product gallery image', { tag: ['@lite', '@vendor'] }, async () => {
        // todo: need a product with gallery images
        await vendor.addProductGalleryImages(productName, data.product.productInfo.images.gallery);
        await vendor.addProductGalleryImages(productName, data.product.productInfo.images.gallery, true);
    });

    test('vendor can remove product gallery image', { tag: ['@lite', '@vendor'] }, async () => {
        // todo: need a product with gallery images
        await vendor.addProductGalleryImages(productName, data.product.productInfo.images.gallery, true);
        await vendor.removeProductGalleryImages(productName);
    });

    // product short description

    test('vendor can add product short description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductShortDescription(productName1, data.product.productInfo.description.shortDescription);
    });

    test('vendor can update product short description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductShortDescription(productName, data.product.productInfo.description.shortDescription);
    });

    test('vendor can remove product short description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductShortDescription(productName, '');
    });

    // product description

    test('vendor can update product description', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductDescription(productName, data.product.productInfo.description.description);
    });

    // product downloadable options

    test('vendor can add product downloadable options', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductDownloadableOptions(productName1, data.product.productInfo.downloadableOptions);
    });

    test('vendor can update product downloadable options', { tag: ['@lite', '@vendor'] }, async () => {
        // todo: need a product with downloadable file
        await vendor.addProductDownloadableOptions(productName, data.product.productInfo.downloadableOptions);
    });

    test('vendor can remove product downloadable file', { tag: ['@lite', '@vendor'] }, async () => {
        // todo: need a product with downloadable file
        await vendor.addProductDownloadableOptions(productName, data.product.productInfo.downloadableOptions);
        await vendor.removeDownloadableFile(productName, { ...data.product.productInfo.downloadableOptions, downloadLimit: '', downloadExpiry: '' });
    });

    // product inventory options

    test('vendor can add product inventory options (SKU)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName1, data.product.productInfo.inventory(), 'sku');
    });

    test('vendor can update product inventory options (SKU)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, data.product.productInfo.inventory(), 'sku');
    });

    test('vendor can remove product inventory options (SKU)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, { ...data.product.productInfo.inventory(), sku: '' }, 'sku');
    });

    test('vendor can add product inventory options (stock status)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName1, data.product.productInfo.inventory(), 'stock-status');
    });

    test('vendor can add product inventory options (stock management)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName1, data.product.productInfo.inventory(), 'stock-management');
    });

    test('vendor can update product inventory options (stock management)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName1, data.product.productInfo.inventory(), 'stock-management');
    });

    test('vendor can remove product inventory options (stock management)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.removeProductInventory(productName);
    });

    test('vendor can add product inventory options (allow single quantity)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName1, data.product.productInfo.inventory(), 'one-quantity');
    });

    test('vendor can remove product inventory options (allow single quantity)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductInventory(productName, { ...data.product.productInfo.inventory(), oneQuantity: false }, 'one-quantity');
    });

    // product other options

    test('vendor can add product other options (product status)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName1, data.product.productInfo.otherOptions, 'status');
    });

    test('vendor can add product other options (visibility)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName1, data.product.productInfo.otherOptions, 'visibility');
    });

    test('vendor can add product other options (purchase note)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName1, data.product.productInfo.otherOptions, 'purchaseNote');
    });

    test('vendor can remove product other options (purchase note)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, { ...data.product.productInfo.otherOptions, purchaseNote: '' }, 'purchaseNote');
    });

    test('vendor can add product other options (product review)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName1, data.product.productInfo.otherOptions, 'reviews');
    });

    test('vendor can remove product other options (product review)', { tag: ['@lite', '@vendor'] }, async () => {
        await vendor.addProductOtherOptions(productName, { ...data.product.productInfo.otherOptions, enableReview: false }, 'reviews');
    });

    // catalog mode

    // todo: move to catalog page

    test('vendor can add product catalog mode', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on' });
        await vendor.addProductCatalogMode(productName1);
    });

    test('vendor can add product catalog mode (with price hidden)', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on', catalog_mode_hide_product_price: 'on' });
        await vendor.addProductCatalogMode(productName1, true);
    });

    test('vendor can remove product catalog mode', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on', catalog_mode_hide_product_price: 'on' });
        await vendor.removeProductCatalogMode(productName);
    });

    test('vendor can remove product catalog mode (price hidden option)', { tag: ['@lite', '@vendor'] }, async () => {
        await dbUtils.updateOptionValue(dbData.dokan.optionName.selling, { catalog_mode_hide_add_to_cart_button: 'on', catalog_mode_hide_product_price: 'on' });
        await vendor.removeProductCatalogMode(productName, true);
    });

    // shipping and tax

    test('vendor can add product shipping', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductShipping(productName1, data.product.productInfo.shipping);
    });

    test('vendor can update product shipping', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductShipping(productName, data.product.productInfo.shipping);
    });

    test('vendor can remove product shipping', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.removeProductShipping(productName);
    });

    test('vendor can add product tax', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductTax(productName1, data.product.productInfo.tax);
    });

    test('vendor can add product tax (with tax class)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductTax(productName1, data.product.productInfo.tax, true);
    });

    // linked products

    test('vendor can add product linked products (up-sells)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductLinkedProducts(productName1, data.product.productInfo.linkedProducts, 'up-sells');
    });

    test('vendor can add product linked products (cross-sells)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.addProductLinkedProducts(productName1, data.product.productInfo.linkedProducts, 'cross-sells');
    });

    test('vendor can remove product linked products (up-sells)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.removeProductLinkedProducts(productName, data.product.productInfo.linkedProducts, 'up-sells');
    });

    test('vendor can remove product linked products (cross-sells)', { tag: ['@pro', '@vendor'] }, async () => {
        await vendor.removeProductLinkedProducts(productName, data.product.productInfo.linkedProducts, 'cross-sells');
    });
});
