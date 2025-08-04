import HomePage from './pageObjects/HomePage.js';
import Inventory from './pageObjects/InventoryPage.js';

const hp = new HomePage();
const ip = new Inventory();

describe('Testing login functionality', () => {
	beforeEach(() => {
		hp.visitHomepage();
        });
  it('After using the wrong credentials the login page is displayed with no user specific menus', () => {
    cy.fixture('wrongLoginData').then((data) => {
    data.forEach((userdata) => {    
        cy.log `Using ${userdata.description}`;
        cy.get(hp.usernameInput).type(userdata.username);
        cy.get(hp.passwordInput).type(userdata.password);
        cy.get(hp.loginBtn).click();

	cy.url().should('include', '/v1');
        cy.get(ip.menuIcon).should('not.exist');             
        cy.get(ip.cartIcon).should('not.exist');
	cy.get(ip.navigationLinks).should('not.exist');
    });
  });
});
});