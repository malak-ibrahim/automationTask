describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.waitForPageLoad()
  })

  it('should display login form elements', () => {
    // Verify all login form elements are present
    cy.verifyElementExists('[data-cy=username]')
    cy.verifyElementExists('[data-cy=password]')
    cy.verifyElementExists('[data-cy=login-button]')
    cy.verifyElementExists('[data-cy=forgot-password-link]')
    
    // Verify form labels
    cy.verifyText('label[for="username"]', 'Username')
    cy.verifyText('label[for="password"]', 'Password')
  })

  it('should successfully login with valid credentials', () => {
    // Load test data
    cy.fixture('users').then((users) => {
      const validUser = users.validUser
      
      // Perform login
      cy.get('[data-cy=username]').type(validUser.username)
      cy.get('[data-cy=password]').type(validUser.password)
      cy.get('[data-cy=login-button]').click()
      
      // Verify successful login
      cy.url().should('not.include', '/login')
      cy.verifyElementExists('[data-cy=user-menu]')
      cy.verifyText('[data-cy=welcome-message]', `Welcome, ${validUser.firstName}`)
    })
  })

  it('should show error message for invalid credentials', () => {
    // Load test data
    cy.fixture('users').then((users) => {
      const invalidUser = users.invalidUser
      
      // Attempt login with invalid credentials
      cy.get('[data-cy=username]').type(invalidUser.username)
      cy.get('[data-cy=password]').type(invalidUser.password)
      cy.get('[data-cy=login-button]').click()
      
      // Verify error message
      cy.verifyElementVisible('[data-cy=error-message]')
      cy.verifyText('[data-cy=error-message]', 'Invalid username or password')
      cy.url().should('include', '/login')
    })
  })

  it('should show validation errors for empty fields', () => {
    // Try to login without entering credentials
    cy.get('[data-cy=login-button]').click()
    
    // Verify validation messages
    cy.verifyElementVisible('[data-cy=username-error]')
    cy.verifyElementVisible('[data-cy=password-error]')
    cy.verifyText('[data-cy=username-error]', 'Username is required')
    cy.verifyText('[data-cy=password-error]', 'Password is required')
  })

  it('should show password when toggle button is clicked', () => {
    // Type password
    cy.get('[data-cy=password]').type('testpassword')
    
    // Verify password is hidden by default
    cy.get('[data-cy=password]').should('have.attr', 'type', 'password')
    
    // Click password toggle
    cy.get('[data-cy=password-toggle]').click()
    
    // Verify password is now visible
    cy.get('[data-cy=password]').should('have.attr', 'type', 'text')
  })

  it('should redirect to forgot password page', () => {
    // Click forgot password link
    cy.get('[data-cy=forgot-password-link]').click()
    
    // Verify redirect
    cy.url().should('include', '/forgot-password')
    cy.verifyElementExists('[data-cy=forgot-password-form]')
  })

  it('should maintain login state after page refresh', () => {
    // Login successfully
    cy.fixture('users').then((users) => {
      const validUser = users.validUser
      
      cy.get('[data-cy=username]').type(validUser.username)
      cy.get('[data-cy=password]').type(validUser.password)
      cy.get('[data-cy=login-button]').click()
      
      // Verify login success
      cy.url().should('not.include', '/login')
      
      // Refresh page
      cy.reload()
      
      // Verify still logged in
      cy.url().should('not.include', '/login')
      cy.verifyElementExists('[data-cy=user-menu]')
    })
  })

  it('should check accessibility compliance', () => {
    // Check for accessibility issues
    cy.checkAccessibility()
  })

  it('should handle special characters in username and password', () => {
    const specialUsername = 'test@user#123'
    const specialPassword = 'pass@word#456'
    
    cy.get('[data-cy=username]').type(specialUsername)
    cy.get('[data-cy=password]').type(specialPassword)
    cy.get('[data-cy=login-button]').click()
    
    // Verify form handles special characters without errors
    cy.get('[data-cy=username]').should('have.value', specialUsername)
    cy.get('[data-cy=password]').should('have.value', specialPassword)
  })
}) 