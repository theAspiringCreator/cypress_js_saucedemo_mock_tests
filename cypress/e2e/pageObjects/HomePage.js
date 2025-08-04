class HomePage {
	baseUrl = "https://www.saucedemo.com/v1";
	usernameInput = '[data-test="username"]';
	passwordInput = '[data-test="password"]';
        loginBtn = '#login-button';
        errorMsg = '[data-test="error"]';

        visitHomepage() {
        	cy.visit(this.baseUrl);
        }
	
	doLogin(username, password) {
		cy.get(this.usernameInput).type(username);
		cy.get(this.passwordInput).type(password);
		cy.get(this.loginBtn).click();
        }
        
	returnErrorText() {
  	try {
	    const errorElement = $(this.errorMsg);
	    const errorText =  errorElement.getText();
	    return errorText;
	  } catch (error) {
	    console.error('Failed to get error message text:', error);
	    return '';
	  }
	}


}

export default HomePage;