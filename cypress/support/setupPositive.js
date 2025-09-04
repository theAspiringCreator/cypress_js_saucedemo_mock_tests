import HomePage from '../e2e/pageObjects/HomePage.js';
import InventoryPage from '../e2e/pageObjects/InventoryPage.js';

export const setupPositive = () => {	
	const hp = new HomePage();
	const ip = new InventoryPage();

	beforeEach(() => {
		//goes to base url
		hp.visitHomepage();
	
        	//performs login 
		cy.fixture('correctLogin').then((data) => {
			hp.doLogin(data[0].username, data[0].password);	
		});
     	});
};