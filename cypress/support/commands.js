// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import InventoryPage from '../e2e/pageObjects/InventoryPage.js';

//converts the elements with the same css selector into an array 
//and within the array length generates a random array index 
Cypress.Commands.add('generateRandomArrayIndex', (selector) => {
  return cy.get(selector).then($elements => {
    const elems = Cypress._.toArray($elements);
    const randomIndex = Math.floor(Math.random() * elems.length);
    return cy.wrap(randomIndex);
  });
});



/**
converts the elements with the same css selector into an array 
and within the array length generates two random array indices 
secures that the indices are not equal:
*/
Cypress.Commands.add('generateTwoRandomArrayIndices', (selector) => {
  return cy.get(selector).then($elements => {
    const elems = Cypress._.toArray($elements);
    const length = elems.length;
    const randomIndex1 = Math.floor(Math.random() * length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * length);
    } while (randomIndex2 === randomIndex1);
    return cy.wrap({ randomIndex1, randomIndex2 });
  });
});


Cypress.Commands.add('retrieveNumber', (selector) => {
  if (!selector) {
    throw new Error('Selector parameter is missing or undefined in retrieveNumber');
  }
  return cy.get(selector)
    .invoke('text')
    .then((text) => {
      const match = text.match(/\d+(\.\d+)?/);
      const number = match ? parseFloat(match[0]) : null;
      return number;
    });
});


Cypress.Commands.add('randomlySelectElement', (selector) => {
	return cy.get(selector).then($elements => {
		const elems = Cypress._.toArray($elements);
		const randIdx = Math.floor(Math.random() * elems.length);
		return cy.wrap(elems[randIdx]);
 });
});


Cypress.Commands.add('compareTexts', ({ arraySelector, cartItemSelector }) => {
  const ip = new InventoryPage();
  cy.get(arraySelector).then($items => {
    const count = $items.length;
    const randomIndex = Math.floor(Math.random() * count);
    const expectedText = $items.eq(randomIndex).text();

    // Click the Add button at the same index
    cy.get(ip.addBtn).eq(randomIndex).click();

    // Click the cart icon
    cy.get(ip.cartIcon).click();

    // Assert that the cart item has the expected text
    cy.get(cartItemSelector).should('have.text', expectedText);
  });
});


//checks visibility of elements in an array:
Cypress.Commands.add('checkVisibility', (elements) => {
  elements.forEach((el) => {
    cy.get(el).should('be.visible');
  });
});

//checks if elements in an array are enabled:
Cypress.Commands.add('checkIfEnabled', (elements) => {
  elements.forEach((el) => {
    cy.get(el).should('be.enabled');
  });
});


/**
checks if multiple elements in an array contain expected text
parameters: 
selector: css selector of a web element
text: expected text of a web element
Usable only within tests.
Usage (syntax): 
cy.checkElementsText([
  { selector: '#element1', text: 'Hello' },
  { selector: '.element2', text: 'World' },
  { selector: '[data-test="element3"]', text: 'Cypress' }
]);
*/
Cypress.Commands.add('checkElementsText', (elements) => {
  elements.forEach(({ selector, text }) => {
    cy.get(selector).should('contain.text', text);
  });
});

//generates a random a-z string
Cypress.Commands.add('generateString', (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
});

//generates a random string composed of prohibited characters
Cypress.Commands.add('specialChar', (length) => {
  const chars = '#|@\!=*+.,;${£%[^&()/]:¬`}°~';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
});


//generates a random number within a user-defined range
Cypress.Commands.add('randomNumber', (min, max) => Math.floor(Math.random() * (max - min + 1)) + min);


//
Cypress.Commands.add('submitData', (fname, lname, zip) => {
  cy.get(ck.firstNameTxt).type(fname);
  cy.get(ck.lastNameTxt).type(lname);
  cy.get(ck.zipTxt).type(zip);
  cy.get(ck.continueBtn).click();
});

