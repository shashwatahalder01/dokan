import { Page } from '@playwright/test';
import { CustomerPage } from 'pages/customerPage';
import { selector } from 'pages/selectors';
import { helpers } from 'utils/helpers';
import { data } from 'utils/testData';
import { customer, store } from 'utils/interfaces';

const { DOKAN_PRO } = process.env;

export class SingleProductPage extends CustomerPage {

	constructor(page: Page) {
		super(page);
	}

	// single product page


	// single product render properly
	async singleProductRenderProperly(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));

		//TODO:
	}


	// single product vendor info
	async productVendorInfo(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));
		//TODO:
	}


	// view similar product
	async viewMoreProduct(productName: string){
		await this.goIfNotThere(data.subUrls.frontend.productDetails(helpers.slugify(productName)));
		//TODO:
	}


}
