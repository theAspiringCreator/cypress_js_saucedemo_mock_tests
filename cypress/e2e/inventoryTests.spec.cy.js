import { setupPositive } from '../support/setupPositive';
/**
imports and initializes hp pageObject, 
goes to base URL 
and performs login with correct username and password
*/

import InventoryPage from './pageObjects/InventoryPage.js';
import CartPage from './pageObjects/CartPage.js';


describe('Testing login functionality', () => {
    const ip = new InventoryPage();
    const cp = new CartPage();
	
    setupPositive();

    it('Each item contains image, title, description, price and Add to cart button', () => 
{      
        //Compares the number of images item is equal to other goods elements (title, price...)
        cy.get(ip.photoImg).should('have.length', Cypress.$(ip.titleTxt).length);
        cy.get(ip.photoImg).should('have.length', Cypress.$(ip.descTxt).length);
        cy.get(ip.photoImg).should('have.length', Cypress.$(ip.priceTxt).length);
        cy.get(ip.photoImg).should('have.length', Cypress.$(ip.addBtn).length);

        //Compares the number of titles to the number of titles, descriptions, prices and buttons
        //The number of titles and the number of images has been already compared
        cy.get(ip.titleTxt).should('have.length', Cypress.$(ip.descTxt).length);
        cy.get(ip.titleTxt).should('have.length', Cypress.$(ip.priceTxt).length);
        cy.get(ip.titleTxt).should('have.length', Cypress.$(ip.addBtn).length);

        //Compares the number of descriptions to the number of prices and buttons
        //The number descriptions and the number of images and titles have been already compared
        cy.get(ip.descTxt).should('have.length', Cypress.$(ip.priceTxt).length);
        cy.get(ip.descTxt).should('have.length', Cypress.$(ip.addBtn).length);

        //Compares the number of prices and the number of Add buttons
        //The number of prices and the number of other elements (goods item images, titles...) have been already compared
        cy.get(ip.priceTxt).should('have.length', Cypress.$(ip.addBtn).length);
    });

    it('Before clicking all buttons have text ADD TO CART',() => { 
	cy.get(ip.addBtn).each((button) => {
  		cy.wrap(button).should('have.text', 'ADD TO CART');
	});
    });
    it('After clicking, the clicked button has text REMOVE',() => {
	cy.get(ip.addBtn).each((button, index) => {
	cy.wrap(button).click();
	cy.wrap(button).should('have.text', 'REMOVE');
  		});
	});

});