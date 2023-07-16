import { Page } from '@playwright/test';
import { CustomerPage } from 'pages/customerPage';
import { selector } from 'pages/selectors';
import { helpers } from 'utils/helpers';
import { data } from 'utils/testData';
import { customer, store } from 'utils/interfaces';

const { DOKAN_PRO } = process.env;

export class ShopPage extends CustomerPage {

	constructor(page: Page) {
		super(page);
	}

	// shop

	// shop render properly
	async shopRenderProperly(){
		await this.goIfNotThere(data.subUrls.frontend.shop);

		// store list text is visible
		await this.toBeVisible(selector.customer.cShop.shopText);
		//TODO:


	}

	//sort products
	async sortProducts(sortBy: string){
		await this.goIfNotThere(data.subUrls.frontend.shop);
		await this.selectByValueAndWaitForResponse(data.subUrls.frontend.shop, selector.customer.cShop.sort, sortBy);
	}


}
