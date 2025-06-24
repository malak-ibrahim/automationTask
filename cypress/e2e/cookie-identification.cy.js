import { logAllCookies, identifySessionCookies, compareCookiesBeforeAfterLogin } from '../support/helpers/cookie-helper'
import RayyanLoginPage from '../support/pages/RayyanLoginPage'

/**
 * Cookie Identification Test
 */
describe('Cookie Identification', () => {
  let loginPage

  before(() => {
    cy.logStep('Starting cookie identification')
  })

  it('should identify session cookies', () => {
    cy.visit('/')
    loginPage = new RayyanLoginPage()
    
    // Log cookies before login
    cy.logStep('=== COOKIES BEFORE LOGIN ===')
    logAllCookies()
    identifySessionCookies()
    
    // Perform login
    cy.fixture('rayyan-data').then((data) => {
      cy.logStep('Performing login...')
      loginPage.login(data.user.email, data.user.password).verifyLoginSuccess()
      
      // Wait a moment for cookies to be set
      cy.wait(2000)
      
      // Log cookies after login
      cy.logStep('=== COOKIES AFTER LOGIN ===')
      logAllCookies()
      identifySessionCookies()
      
      // Compare cookies before and after login
      compareCookiesBeforeAfterLogin()
    })
  })

  it('should test session persistence', () => {
    cy.visit('/')
    
    // Check if still logged in
    cy.get('body').then(($body) => {
      if ($body.text().includes('Login') || $body.text().includes('Sign in')) {
        cy.logStep('❌ Session not persisted - user logged out')
        cy.logStep('Check the cookie names from the previous test and update preserveOnce()')
      } else {
        cy.logStep('✅ Session persisted - user still logged in')
      }
    })
  })
}) 