import HomePage from './pageObjects/HomePage.js';
import Inventory from './pageObjects/InventoryPage.js';

const hp = new HomePage();
const ip = new Inventory();

describe('Testing login functionality', () => {
	beforeEach(() => {
		hp.visitHomepage();
        });

//Correct error messages are saved in wrongLoginData.json file in folder Fixtures 
  it('After using the wrong credentials the correct error message is displayed', () => {
    cy.fixture('wrongLoginData').then((data) => {
    data.forEach((userdata) => {    
        cy.log `Using ${userdata.description}`;
        cy.get(hp.usernameInput).type(userdata.username);
        cy.get(hp.passwordInput).type(userdata.password);
        cy.get(hp.loginBtn).click();

	cy.get(hp.errorMsg).should("contain.text", userdata.errorMsg)
    });
  });
});
});