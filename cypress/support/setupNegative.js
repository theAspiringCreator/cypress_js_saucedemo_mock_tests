import HomePage from '../e2e/pageObjects/HomePage.js';
import Inventory from '../e2e/pageObjects/InventoryPage.js';

export const setupNegative = (userdata) => {	
	const hp = new HomePage();

	//setupNegative(userdata);
	hp.visitHomepage();

	//performs login
    	cy.log(`Using ${userdata.description}`);
    	hp.doLogin(userdata.username, userdata.password);

};