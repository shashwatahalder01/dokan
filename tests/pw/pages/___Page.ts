import { Page, expect } from '@playwright/test';
import { AdminPage } from 'pages/adminPage';
import { selector } from 'pages/selectors';
import { data } from 'utils/testData';


export class LicensePage extends AdminPage {

	constructor(page: Page) {
		super(page);
	}


}
