import { Page, expect } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';
import { helpers } from 'utils/helpers';
import { product } from 'utils/interfaces';


const { DOKAN_PRO } = process.env;


export class ProductsPage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}


	// admin add product category
	async addCategory(categoryName: string) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewCategories);
		await this.fill(selector.admin.products.category.name, categoryName);
		await this.fill(selector.admin.products.category.slug, categoryName);
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.category.addNewCategory);
		await this.toBeVisible(selector.admin.products.category.categoryCell(categoryName));
	}


	// admin add product attribute
	async addAttribute(attribute: product['attribute']) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewAttributes);
		await this.fill(selector.admin.products.attribute.name, attribute.attributeName);
		await this.fill(selector.admin.products.attribute.slug, attribute.attributeName);
		await this.clickAndWaitForResponse(data.subUrls.backend.wc.addNewAttributes, selector.admin.products.attribute.addAttribute);
		await this.toBeVisible(selector.admin.products.attribute.attributeCell(attribute.attributeName));
		await this.clickAndWaitForResponse(data.subUrls.backend.wc.taxonomy, selector.admin.products.attribute.configureTerms(attribute.attributeName));

		// add new term
		for (const attributeTerm of attribute.attributeTerms) {
			await this.fill(selector.admin.products.attribute.attributeTerm, attributeTerm);
			await this.fill(selector.admin.products.attribute.attributeTermSlug, attributeTerm);
			await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.attribute.addAttributeTerm);
			await this.toBeVisible(selector.admin.products.attribute.attributeTermCell(attributeTerm));
		}
	}


	// admin add simple product
	async addSimpleProduct(product: product['simple']) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewProducts);

		// product basic info
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.click(selector.admin.products.product.general);
		await this.type(selector.admin.products.product.regularPrice, product.regularPrice());
		await this.click(selector.admin.products.product.category(product.category));

		// stock status
		if(product.stockStatus){
			await this.click(selector.admin.products.product.inventory);
			await this.selectByValue(selector.admin.products.product.stockStatus, data.product.stockStatus.outOfStock);
		}

		// vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		switch (product.status) {

		case 'publish' :
			await this.clickAndWaitForResponseAndLoadState(data.subUrls.ajax, selector.admin.products.product.publish);
			await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
			break;

		case 'draft' :
			await this.clickAndWaitForResponseAndLoadState(data.subUrls.post, selector.admin.products.product.saveDraft, 302);
			await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.draftUpdateSuccessMessage);
			break;

		case 'pending' :
			await this.click(selector.admin.products.product.editStatus);
			await this.selectByValue(selector.admin.products.product.status, data.product.status.pending);
			await this.clickAndWaitForResponseAndLoadState(data.subUrls.post, selector.admin.products.product.saveDraft, 302);
			await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.pendingProductUpdateSuccessMessage);
			break;

		default :
			break;
		}
	}


	// admin add variable product
	async addVariableProduct(product: product['variable']) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewProducts);

		// name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.click(selector.admin.products.product.general);

		// add attributes
		await this.click(selector.admin.products.product.attributes);

		if (await this.isVisibleLocator(selector.admin.products.product.customProductAttribute)) {
			await this.selectByValue(selector.admin.products.product.customProductAttribute, `pa_${product.attribute}`);
			await this.click(selector.admin.products.product.addAttribute);
		} else {
			await this.clickAndWaitForResponse(data.subUrls.backend.wc.searchAttribute, selector.admin.products.product.addExistingAttribute);
			await this.typeAndWaitForResponse(data.subUrls.backend.wc.term, selector.admin.products.product.addExistingAttributeInput, product.attribute);
			await this.pressAndWaitForResponse(data.subUrls.ajax, data.key.enter);
		}

		await this.clickAndWaitForResponse(data.subUrls.backend.wc.taxonomyTerms, selector.admin.products.product.selectAll);
		// await this.click(selector.admin.products.product.usedForVariations)
		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.admin.products.product.saveAttributes);
		await this.wait(2);

		// add variations
		await this.click(selector.admin.products.product.variations);
		await this.selectByValue(selector.admin.products.product.addVariations, product.variations.linkAllVariation);
		//this.fillAlert('120')
		await this.click(selector.admin.products.product.go);

		await this.selectByValue(selector.admin.products.product.addVariations, product.variations.variableRegularPrice);
		this.fillAlert('120');
		await this.click(selector.admin.products.product.go);

		// category
		await this.click(selector.admin.products.product.category(product.category));

		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.post, selector.admin.products.product.publish, 302);
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
	}


	// Admin Add Simple Subscription Product
	async addSimpleSubscription(product: product['simpleSubscription']) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewProducts);

		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.click(selector.admin.products.product.general);
		await this.type(selector.admin.products.product.subscriptionPrice, product.subscriptionPrice());
		await this.selectByValue(selector.admin.products.product.subscriptionPeriodInterval, product.subscriptionPeriodInterval);
		await this.selectByValue(selector.admin.products.product.subscriptionPeriod, product.subscriptionPeriod);
		await this.selectByValue(selector.admin.products.product.expireAfter, product.expireAfter);
		await this.type(selector.admin.products.product.subscriptionTrialLength, product.subscriptionTrialLength);
		await this.selectByValue(selector.admin.products.product.subscriptionTrialPeriod, product.subscriptionTrialPeriod);

		// Category
		await this.click(selector.admin.products.product.category(product.category));

		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.post, selector.admin.products.product.publish, 302);

		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
	}


	// Admin Add External Product
	async addExternalProduct(product: product['external']) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewProducts);

		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.click(selector.admin.products.product.general);
		await this.type(selector.admin.products.product.productUrl, this.getBaseUrl() + product.productUrl);
		await this.type(selector.admin.products.product.buttonText, product.buttonText);
		await this.type(selector.admin.products.product.regularPrice, product.regularPrice());

		// Category
		await this.click(selector.admin.products.product.category(product.category));

		// Vendor Store Name
		await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.post, selector.admin.products.product.publish, 302);
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
	}


	// Admin Add Dokan Subscription Product
	async addDokanSubscription(product: product['vendorSubscription']) {
		await this.goIfNotThere(data.subUrls.backend.wc.addNewProducts);

		// Name
		await this.type(selector.admin.products.product.productName, product.productName());
		await this.selectByValue(selector.admin.products.product.productType, product.productType);
		await this.click(selector.admin.products.product.general);
		await this.type(selector.admin.products.product.regularPrice, product.regularPrice());

		// Category
		await this.click(selector.admin.products.product.category(product.category));

		// Subscription Details
		await this.type(selector.admin.products.product.numberOfProducts, product.numberOfProducts);
		await this.type(selector.admin.products.product.packValidity, product.packValidity);
		await this.type(selector.admin.products.product.advertisementSlot, product.advertisementSlot);
		await this.type(selector.admin.products.product.expireAfterDays, product.expireAfterDays);
		await this.click(selector.admin.products.product.recurringPayment);

		// // Vendor Store Name
		// await this.select2ByText(selector.admin.products.product.storeName, selector.admin.products.product.storeNameInput, product.storeName);
		// await this.scrollToTop();

		// Publish
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.post, selector.admin.products.product.publish, 302);
		await this.toContainText(selector.admin.products.product.updatedSuccessMessage, data.product.publishSuccessMessage);
	}


	// vendor


	// products render properly
	async vendorProductsRenderProperly(): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.products);

		// product nav menus are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { draft, pendingReview, ...menus } = selector.vendor.product.menus;
		await this.multipleElementVisible(menus);

		// add new product is visible
		await this.toBeVisible(selector.vendor.product.addNewProduct);

		// import export is visible
		DOKAN_PRO && await this.multipleElementVisible(selector.vendor.product.importExport);

		// product filters elements are visible
		// await this.multipleElementVisible(selector.vendor.product.filters); //todo:  issue not fixed yet

		// product search elements are visible
		await this.multipleElementVisible(selector.vendor.product.search);

		// bulk action elements are visible
		await this.multipleElementVisible(selector.vendor.product.bulkActions);

		// table elements are visible
		await this.multipleElementVisible(selector.vendor.product.table);

	}


	// export product
	async exportProducts(): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.products);
		await this.clickAndWaitForLoadState( selector.vendor.product.importExport.export );
		await this.clickAndWaitForDownload( selector.vendor.vTools.export.csv.generateCsv );
	}


	// search product
	async searchProduct(productName: string): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.products);

		await this.clearAndType(selector.vendor.product.search.searchInput, productName);
		await this.clickAndWaitForResponse(data.subUrls.frontend.vDashboard.products, selector.vendor.product.search.searchBtn);
		await this.toBeVisible(selector.vendor.product.productLink(productName));
	}


	// filter products
	async filterProducts(filterType: string, value: string): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.vDashboard.products);

		switch(filterType){

		case 'by-date' :
			await this.selectByNumber(selector.vendor.product.filters.filterByDate, value);
			break;

		case 'by-category' :
			await this.selectByLabel(selector.vendor.product.filters.filterByCategory, value);
			break;

		case 'by-type' :
			await this.selectByValue(selector.vendor.product.filters.filterByType, value);
			break;

		case 'by-other' :
			await this.selectByValue(selector.vendor.product.filters.filterByOther, value);
			break;

		default :
			break;
		}

		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.products,  selector.vendor.product.filters.filter);
		await this.notToHaveCount(selector.vendor.product.numberOfRowsFound, 0);

	}


	// view product
	async viewProduct(productName: string): Promise<void> {
		await this.searchProduct(productName);
		await this.hover(selector.vendor.product.productCell(productName));
		await this.clickAndWaitForLoadState(selector.vendor.product.view(productName));
		await expect(this.page).toHaveURL(data.subUrls.frontend.productDetails(helpers.slugify(productName)) + '/');
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { quantity, addToCart, viewCart, ...productDetails } = selector.customer.cSingleProduct.productDetails;
		await this.multipleElementVisible(productDetails);
		//todo: actual value can be asserted
	}


	// vendor can't buy own  product
	async cantBuyOwnProduct(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));
		await this.notToBeVisible(selector.customer.cSingleProduct.productDetails.quantity);
		await this.notToBeVisible(selector.customer.cSingleProduct.productDetails.addToCart);
	}


	// edit product
	async editProduct(product: product['simple']): Promise<void> {
		await this.searchProduct(product.editProduct);
		await this.hover(selector.vendor.product.productCell(product.editProduct));
		await this.clickAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.products, selector.vendor.product.editProduct(product.editProduct));

		await this.clearAndType(selector.vendor.product.title, product.editProduct); // don't update name below test needs same product
		await this.clearAndType(selector.vendor.product.price, product.regularPrice());
		//todo:  add more fields

		await this.clickAndWaitForResponse(data.subUrls.frontend.vDashboard.products, selector.vendor.product.saveProduct, 302);
		await this.toContainText(selector.vendor.product.dokanMessage, 'The product has been saved successfully. ');
	}


	// quick edit product
	async quickEditProduct(product: product['simple']): Promise<void> {
		await this.searchProduct(product.editProduct);
		await this.hover(selector.vendor.product.productCell(product.editProduct));
		await this.click(selector.vendor.product.quickEdit(product.editProduct));

		await this.clearAndType(selector.vendor.product.quickEditProduct.title, product.editProduct);
		//todo:  add more fields

		await this.clickAndWaitForResponse(data.subUrls.ajax, selector.vendor.product.quickEditProduct.update);

	}


	// duplicate product
	async duplicateProduct(productName: string): Promise<void> {
		await this.searchProduct(productName);
		await this.hover(selector.vendor.product.productCell(productName));
		await this.clickAndAcceptAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.products, selector.vendor.product.duplicate(productName));
		await this.toContainText(selector.vendor.product.dokanSuccessMessage, 'Product succesfully duplicated');
	}


	// permanently delete product
	async permanentlyDeleteProduct(productName: string): Promise<void> {
		await this.searchProduct(productName);
		await this.hover(selector.vendor.product.productCell(productName));
		await this.click(selector.vendor.product.permanentlyDelete(productName));
		await this.clickAndWaitForLoadState(selector.vendor.product.confirmAction);
		await this.toContainText(selector.vendor.product.dokanSuccessMessage, 'Product successfully deleted');

	}


	// product bulk action
	async productBulkAction(action: string, productName?: string): Promise<void> {
		productName ? await this.searchProduct(productName) : await this.goIfNotThere(data.subUrls.frontend.vDashboard.products);

		await this.click(selector.vendor.product.bulkActions.selectAll);
		switch(action){

		case 'edit' :
			await this.selectByValue(selector.vendor.product.bulkActions.selectAction, 'edit');
			//todo:
			break;

		case 'permanently-delete' :
			await this.selectByValue(selector.vendor.product.bulkActions.selectAction, 'permanently-delete');
			break;

		case 'publish' :
			await this.selectByValue(selector.vendor.product.bulkActions.selectAction, 'publish');
			break;

		default :
			break;
		}

		await this.clickAndAcceptAndWaitForResponseAndLoadState(data.subUrls.frontend.vDashboard.products, selector.vendor.product.bulkActions.applyAction);
	}


}
