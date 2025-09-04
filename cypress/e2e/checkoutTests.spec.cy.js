import InventoryPage from './pageObjects/InventoryPage.js';
import CheckoutPage from './pageObjects/CheckoutPage.js';

import { setupPositive } from '../support/setupPositive';

/**
 * imports and initializes hp pageObject, 
 * goes to base URL 
 * and performs login with correct username and password
 */

describe('Testing checkout functionality', () => {
  const ip = new InventoryPage();
  const ck = new CheckoutPage();

  setupPositive();


  // Helper function to generate and type random string
  function generateAndType(selector) {
    cy.generateString(3).then(randomStr => {
      cy.get(selector).click();
      cy.get(selector).type(randomStr.trim());
    });
  }


  // Helper function to round up to specific decimal places
  function roundUpToDecimalPlaces(number, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.ceil(number * factor) / factor;
  }


  // Helper function to confirm random purchase
  function confirmPurchase() {
  //generates a random index for add button
  cy.generateRandomArrayIndex(ip.addBtn)
    .then(randomIndex => {
      return cy.generateRandomArrayIndex(ip.addBtn)
    })
    .then(({ randomIndex }) => {
      cy.get(ip.AdddBtn).then($button => {
      //Clicks random add button
      cy.wrap($buttons).eq(randomIndex).click();
     });
    })
    .then(() => {
    // Go to cart and checkout
    cy.get(ip.cartIcon).click();
    cy.get(ip.checkoutBtn).click();
    })
  }


  // Helper function to progress to checkout
  function goStraightToCheckout() {
    // Generates 2 random indices sequentially
    cy.generateRandomArrayIndex(ip.addBtn)
      .then(randomIndex1 => {
        return cy.generateRandomArrayIndex(ip.addBtn)
          .then(randomIndex2 => ({ randomIndex1, randomIndex2 }));
      })
      .then(({ randomIndex1, randomIndex2 }) => {
        // Gets all add buttons
        cy.get(ip.addBtn).then($buttons => {
          //Clicks random add buttons
          cy.wrap($buttons).eq(randomIndex1).click();
          cy.wrap($buttons).eq(randomIndex2).click();
        });
      })
      .then(() => {
        // Go to cart and checkout
        cy.get(ip.cartIcon).click();
        cy.get(ip.checkoutBtn).click();
      })
      .then(() => {
        // Fill in the form
        generateAndType(ck.firstNameTxt);
        generateAndType(ck.lastNameTxt);
        generateAndType(ck.zipTxt);
	cy.get(ck.continueBtn).click();
      })
  }


  it('The website shows the correct total at checkout', () => {
  goStraightToCheckout();
  // In a single promise retrieves number value from several selectors
  cy.wrap(
    Cypress.Promise.all([
      cy.retrieveNumber(ck.firstItemPriceTxt),
      cy.retrieveNumber(ck.secondItemPriceTxt),
      cy.retrieveNumber(ck.itemTotalTxt),
      cy.retrieveNumber(ck.taxTxt),
      cy.retrieveNumber(ck.totalTxt)
    ])
  ).then(([firstPrice, secondPrice, itemTotal, tax, total]) => {
    //Saves values to log
    cy.log(`Price of the first item: ${firstPrice}`);
    cy.log(`Price of the second item: ${secondPrice}`);
    cy.log(`Item total: ${itemTotal}`);
    cy.log(`Tax: ${tax}`);
    cy.log(`Total price: ${total}`);

    //Performs calculations
    const expectedItemTotal = parseFloat(firstPrice) + parseFloat(secondPrice);
    const roundedTax = roundUpToDecimalPlaces(0.08 * parseFloat(itemTotal), 2);
    const parsedTax = parseFloat(roundedTax);
    const expectedTotal = parseFloat(itemTotal) + parsedTax;

    cy.log(`Expected Total price: ${expectedTotal}`);

    //Assertions
    expect(firstPrice).to.be.a('number');
    expect(secondPrice).to.be.a('number');
    expect(itemTotal).to.be.a('number');
    expect(tax).to.be.a('number');
    expect(total).to.be.a('number');

    expect(itemTotal).to.be.greaterThan(0);
    expect(itemTotal).to.equal(expectedItemTotal);
    expect(tax).to.equal(parsedTax);
    expect(total).to.equal(expectedTotal);
  });
});

  it('The checkout page contains all texts and buttons', () => {
    goStraightToCheckout();

    //Verifies visibility of multiple elements in one go using a custom command
    cy.checkVisibility([
	ip.menuIcon, 
	ip.cartIcon, 
	ip.itemCounterTxt, 
	ck.overviewTxt, 
	ck.quantityHdrTxt, 
	ck.descTblHdrTxt, 
	ck.paymentTxt, 
	ck.invoiceNoTxt, 
	ck.shippingTxt, 
	ck.invoiceHeadingTxt, 
	ck.cancelBtn, 
	ck.finishBtn
	]);

    //Verifies text content of multiple elements in one go using a custom command
    cy.checkElementsText([
      { selector: ip.itemCounterTxt, text: '2' },
      { selector: ck.overviewTxt, text: 'Checkout: Overview' },
      { selector: ck.quantityHdrTxt, text: 'QTY' },
      { selector: ck.descTblHdrTxt, text: 'DESCRIPTION' },
      { selector: ck.paymentTxt, text: 'Payment Information:' },
      { selector: ck.invoiceNoTxt, text: 'SauceCard #' },
      { selector: ck.shippingTxt, text: 'Shipping Information:' },
      { selector: ck.invoiceHeadingTxt, text: 'FREE PONY EXPRESS DELIVERY!' }
    ]);
 }); 
});