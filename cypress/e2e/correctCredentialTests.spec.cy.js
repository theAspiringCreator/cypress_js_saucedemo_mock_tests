import InventoryPage from '../e2e/pageObjects/InventoryPage.js';


import { setupPositive } from '../support/setupPositive';
/**
imports and initializes hp pageObject, 
goes to base URL 
and performs login with correct username and password
*/


describe('Testing login functionality', () => {    
	const ip = new InventoryPage();
	setupPositive();

    it('After using the correct credentials the user is redirected to inventory page', () => {
	cy.url().should('include', 'inventory');
        cy.get(ip.menuIcon).should('be.visible');             
        cy.get(ip.cartIcon).should('be.visible');
	cy.get(ip.productsHeading).should('be.visible');
	cy.get(ip.searchDrpDown).should('be.visible');
	cy.get(ip.navigationLinks).should('not.be.visible');
    });

    it('After clicking the menu icon, the whole navigation is displayed', () => {
	cy.get(ip.menuIcon).click();
	cy.get(ip.navigationLinks).should('have.length', 4);  
	});
   }); 


