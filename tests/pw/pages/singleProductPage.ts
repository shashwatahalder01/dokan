import { Page } from '@playwright/test';
import { CustomerPage } from 'pages/customerPage';
import { selector } from 'pages/selectors';
import { helpers } from 'utils/helpers';
import { data } from 'utils/testData';
import { customer, product, paymentDetails, order } from 'utils/interfaces';

const { DOKAN_PRO } = process.env;

export class SingleProductPage extends CustomerPage {

	constructor(page: Page) {
		super(page);
	}


	// single product page


	// single product render properly
	async singleProductRenderProperly(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));

		// basic details are visible
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { viewCart, ...productDetails } = selector.customer.cSingleProduct.productDetails;
		await this.multipleElementVisible(productDetails);

		await this.click(selector.customer.cSingleProduct.menus.description); //TODO:

		// review infos are visible
		await this.click(selector.customer.cSingleProduct.menus.reviews);

		await this.toBeVisible(selector.customer.cSingleProduct.reviews.ratings);
		await this.toBeVisible(selector.customer.cSingleProduct.reviews.reviewMessage);
		await this.toBeVisible(selector.customer.cSingleProduct.reviews.submitReview);

		// // vendor infos are visible
		// await this.click(selector.customer.cSingleProduct.menus.vendorInfo);

		// await this.multipleElementVisible(selector.customer.cSingleProduct.vendorInfo);

		// // product location is visible
		// await this.click(selector.customer.cSingleProduct.menus.location); //TODO:


		// // more products are visible
		// await this.click(selector.customer.cSingleProduct.menus.moreProducts);

		// await this.toBeVisible(selector.customer.cSingleProduct.moreProducts.moreProductsDiv);
		// await this.notToHaveCount(selector.customer.cSingleProduct.moreProducts.product, 0);

		// // warranty policy is visible
		// await this.click(selector.customer.cSingleProduct.menus.warrantyPolicy); //TODO:


		// // enquiry is visible
		// await this.click(selector.customer.cSingleProduct.menus.productEnquiry); //TODO:


		//TODO:
	}


	// review product
	async reviewProduct(productName: string, review: product['review']): Promise<void> {
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));
		const reviewMessage = review.reviewMessage();
		await this.click(selector.customer.cSingleProduct.menus.reviews);
		await this.click(selector.customer.cSingleProduct.reviews.rating(review.rating));
		await this.clearAndType(selector.customer.cSingleProduct.reviews.reviewMessage, reviewMessage);
		await this.clickAndWaitForResponse(data.subUrls.frontend.productReview, selector.customer.cSingleProduct.reviews.submitReview, 302);
		await this.toContainText(selector.customer.cSingleProduct.reviews.submittedReview(reviewMessage), reviewMessage);
	}


	// product vendor info
	async productVendorInfo(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));
		await this.click(selector.customer.cSingleProduct.menus.vendorInfo);
		await this.multipleElementVisible(selector.customer.cSingleProduct.vendorInfo);
	}


	// view vendor more product
	async viewMoreProduct(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));
		await this.click(selector.customer.cSingleProduct.menus.moreProducts);

		await this.toBeVisible(selector.customer.cSingleProduct.moreProducts.moreProductsDiv);
		await this.notToHaveCount(selector.customer.cSingleProduct.moreProducts.product, 0);
	}


}
