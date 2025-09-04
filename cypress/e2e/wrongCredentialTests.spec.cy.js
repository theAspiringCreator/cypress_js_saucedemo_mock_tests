import HomePage from './pageObjects/HomePage.js';
import InventoryPage from './pageObjects/InventoryPage.js';
import { setupNegative } from '../support/setupNegative'; //runs homepage and performs incorrect login

describe('Testing login functionality', () => {
	const hp = new HomePage();
	const ip = new InventoryPage();
  it('No user specific menus shown with wrong credentials', () => {
	cy.fixture('wrongLoginData').then((data) => {
		data.forEach((userdata) => {
			setupNegative(userdata);
	
			cy.url().should('include', '/v1');
		        cy.get(ip.menuIcon).should('not.exist');             
		        cy.get(ip.cartIcon).should('not.exist');
			cy.get(ip.productsHeading).should('not.exist');
			cy.get(ip.searchDrpDown).should('not.exist');
			cy.get(ip.navigationLinks).should('not.exist');
       			});
    		});
  	});
//Correct error messages are saved in wrongLoginData.json file in folder Fixtures 
  it('The correct error message is displayed with wrong credentials', () => {
	cy.fixture('wrongLoginData').then((data) => {
		data.forEach((userdata) => {
			setupNegative(userdata);

		     	cy.get(hp.errorMsg).should("contain.text", userdata.errorMsg);  
			});
		});
	});
});