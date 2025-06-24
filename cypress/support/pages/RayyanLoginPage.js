class RayyanLoginPage {
  // Selectors with multiple fallback options
  elements = {
    emailInput: () => cy.get('#user_email').first(),
    passwordInput: () => cy.get('#user_password').first(),
    loginButton: () => cy.get('button[type="submit"], input[type="submit"], .login-button, #login-button, [data-testid="login-button"]').first(),
    errorMessage: () => cy.get('.error-message, .alert-error, [data-testid="error-message"]').first(),
    successMessage: () => cy.get('.success-message, .alert-success, [data-testid="success-message"]').first()
  }

  // Actions
  visit() {
    cy.visit('/')
    cy.waitForPageLoad()
    return this
  }

  typeEmail(email) {
    this.elements.emailInput().should('be.visible').clear().type(email, { delay: 100 })
    return this
  }

  typePassword(password) {
    this.elements.passwordInput().should('be.visible').clear().type(password, { delay: 100 })
    return this
  }

  clickLogin() {
    this.elements.loginButton().should('be.visible').and('not.be.disabled').click()
    return this
  }

  login(email, password) {
    this.typeEmail(email)
    this.typePassword(password)
    this.clickLogin()
    return this
  }

  // Verifications
  verifyPageLoaded() {
    this.elements.emailInput().should('be.visible')
    this.elements.passwordInput().should('be.visible')
    this.elements.loginButton().should('be.visible')
    return this
  }

  verifyLoginSuccess() {
    // Check if we're redirected away from login page
    cy.url().should('not.include', '/login')
    cy.url().should('not.include', '/signin')
    
    
    // Verify we're on dashboard or main page
    cy.url().should('include', 'rayyan.ai')
    return this
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should('be.visible')
    if (message) {
      this.elements.errorMessage().should('contain.text', message)
    }
    return this
  }

  verifyStillOnLoginPage() {
    cy.url().should('include', '/sign_in')
    return this
  }

  // Utility methods
  clearForm() {
    this.elements.emailInput().clear()
    this.elements.passwordInput().clear()
    return this
  }

  isLoginButtonEnabled() {
    return this.elements.loginButton().should('not.be.disabled')
  }

  isLoginButtonDisabled() {
    return this.elements.loginButton().should('be.disabled')
  }
}

export default RayyanLoginPage 