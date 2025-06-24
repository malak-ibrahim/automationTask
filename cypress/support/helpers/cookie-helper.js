/**
 * Cookie Helper Functions
 * Use these to identify session cookies from your website
 */

// Function to log all cookies with details
export function logAllCookies() {
  cy.getCookies().then((cookies) => {
    cy.log('=== ALL COOKIES ===')
    cookies.forEach((cookie) => {
      cy.log(`Name: ${cookie.name}`)
      cy.log(`Value: ${cookie.value}`)
      cy.log(`Domain: ${cookie.domain}`)
      cy.log(`Path: ${cookie.path}`)
      cy.log(`Expires: ${cookie.expiry}`)
      cy.log(`HttpOnly: ${cookie.httpOnly}`)
      cy.log(`Secure: ${cookie.secure}`)
      cy.log('---')
    })
  })
}

// Function to identify potential session cookies
export function identifySessionCookies() {
  cy.getCookies().then((cookies) => {
    cy.log('=== POTENTIAL SESSION COOKIES ===')
    const sessionKeywords = ['session', 'auth', 'token', 'csrf', 'remember', 'user', 'login']
    
    cookies.forEach((cookie) => {
      const name = cookie.name.toLowerCase()
      const isSessionCookie = sessionKeywords.some(keyword => name.includes(keyword))
      
      if (isSessionCookie) {
        cy.log(`🔐 SESSION COOKIE: ${cookie.name}`)
        cy.log(`   Value: ${cookie.value}`)
        cy.log(`   HttpOnly: ${cookie.httpOnly}`)
        cy.log(`   Secure: ${cookie.secure}`)
        cy.log('---')
      }
    })
  })
}

// Function to compare cookies before and after login
export function compareCookiesBeforeAfterLogin() {
  let cookiesBefore = []
  
  // Get cookies before login
  cy.getCookies().then((cookies) => {
    cookiesBefore = cookies.map(c => c.name)
    cy.log('Cookies before login:', cookiesBefore)
  })
  
  // After login, compare
  cy.getCookies().then((cookies) => {
    const cookiesAfter = cookies.map(c => c.name)
    const newCookies = cookiesAfter.filter(name => !cookiesBefore.includes(name))
    
    cy.log('=== NEW COOKIES AFTER LOGIN ===')
    newCookies.forEach(name => {
      cy.log(`🆕 NEW: ${name}`)
    })
  })
}

// Function to preserve all cookies (use with caution)
export function preserveAllCookies() {
  cy.getCookies().then((cookies) => {
    const cookieNames = cookies.map(c => c.name)
    cy.log('Preserving all cookies:', cookieNames)
    Cypress.Cookies.preserveOnce(...cookieNames)
  })
} 