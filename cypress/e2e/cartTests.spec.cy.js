import HomePage from './pageObjects/HomePage.js';
import InventoryPage from './pageObjects/InventoryPage.js';
import CartPage from './pageObjects/CartPage.js';

import { setupPositive } from '../support/setupPositive';
/**
imports and initializes hp pageObject, 
goes to base URL 
and performs login with correct username and password
*/



describe('Testing cart functionality', () => {
const ip = new InventoryPage();
const cp = new CartPage();

setupPositive();

	it('Single click on cart button adds item to cart ',() => {
			cy.randomlySelectElement(ip.addBtn).click();
			cy.get(ip.cartIcon).click();
			cy.get(cp.txtQuantity).should('contain.text','1');
			cy.get(cp.txtItemName).should('not.have.text','');
});

it('Remove button removes an item from cart',() => {			
			cy.randomlySelectElement(ip.addBtn).click();
			cy.get(ip.cartIcon).click();
			cy.get(cp.removeBtn).click();
			cy.get(cp.txtQuantity).should('not.exist');
			cy.get(cp.txtItemName).should('not.exist');
			});

it('Remove button in cart disappears after all the goods have been removed',() => {			
			cy.randomlySelectElement(ip.addBtn).click();
			cy.get(ip.cartIcon).click();
			cy.get(cp.removeBtn).click()
			cy.get(cp.removeBtn).should('not.exist');		
    });

it('After adding the item, the cart contains the right name',() => {
	//saves good items data into arrays
	//generates a random index
	cy.compareTexts({
		arraySelector: ip.titleTxt,
		cartItemSelector: cp.cartNameTxt
		});
	});
it('After adding the item, the cart contains the right description',() => {
	//saves good items data into arrays
	//generates a random index
	
	cy.compareTexts({
		arraySelector: ip.descTxt,
		cartItemSelector: cp.cartDescTxt
		});
	});

it('After adding the item, the cart contains the right price',() => {
	//saves good items data into arrays
	//generates a random index
	cy.get(ip.priceTxt).as('prices');
	cy.get('@prices').then($prices => {
  		const pricesCount = $prices.length;
  		const randomIndex = Math.floor(Math.random() * pricesCount);
		const pricesText = $prices.eq(randomIndex).text(); 

		 //clicks the Add button with the selected index:
		cy.get(ip.addBtn).as('addBtns'); 
		cy.get('@addBtns').eq(randomIndex).click()

		//clicks the cart icon
		cy.get(ip.cartIcon).click();

		//assertions
		//I cannot use the custom command here because the prices on inventory page include currency (format: $##.##) 
		//while the prices on cart page don't
		cy.get(cp.cartPriceTxt).should('have.text', pricesText.slice(1));
		});
	});
});
