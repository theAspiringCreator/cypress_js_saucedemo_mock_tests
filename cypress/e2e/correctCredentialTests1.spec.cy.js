import HomePage from './pageObjects/HomePage.js';
import Inventory from './pageObjects/InventoryPage.js';

const hp = new HomePage();
const ip = new Inventory();

describe('Testing login functionality', () => {
	beforeEach(() => {
		hp.visitHomepage();
		cy.fixture('correctLogin').then((data) => {
	            hp.doLogin(data[0].username, data[0].password)
		});
     });
    it('After using the correct credentials the user is redirected to inventory page', () => {       
	//cy.url().should('include', 'inventory');
        cy.get(ip.menuIcon).should('be.visible');             
        cy.get(ip.cartIcon).should('be.visible');
	cy.get(ip.navigationLinks).should('not.be.visible');
    });

    it('After clicking the menu icon, the whole navigation is displayed', () => {
	//cy.fixture('correctLogin').then((data) => {
    	//hp.doLogin(data[0].username, data[0].password)
	
	cy.get(ip.menuIcon).click();
	cy.get(ip.navigationLinks).should('have.length', 4);  
	});
   });
//});  


