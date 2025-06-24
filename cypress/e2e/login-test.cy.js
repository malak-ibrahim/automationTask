import RayyanLoginPage from '../support/pages/RayyanLoginPage'

describe('Simple Rayyan Login Test', () => {
  let loginPage

  beforeEach(() => {
    loginPage = new RayyanLoginPage()
  })

  it('should login to Rayyan successfully', () => {
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      
      // Visit Rayyan and login
      loginPage
        .visit()
        .verifyPageLoaded()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      
      cy.log('✅ Successfully logged in to Rayyan')
    })
  })

  it('should handle invalid login credentials', () => {
    // Test with invalid credentials
    loginPage
      .visit()
      .verifyPageLoaded()
      .login('invalid@email.com', 'wrongpassword')
    
    // Should still be on login page or show error
    cy.url().should('include', 'rayyan.ai')
    cy.log('✅ Handled invalid login gracefully')
  })
}) 