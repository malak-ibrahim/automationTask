/**
 * Cookie Helper Functions
 * Utility functions for cookie management and session handling
 */

let cookiesBeforeLogin = {}
let cookiesAfterLogin = {}

/**
 * Log all cookies currently present
 */
export function logAllCookies() {
  cy.getCookies().then((cookies) => {
    cy.logStep(`Found ${cookies.length} cookies:`)
    cookies.forEach((cookie, index) => {
      cy.logStep(`${index + 1}. ${cookie.name} = ${cookie.value}`)
    })
  })
}

/**
 * Identify session-related cookies
 */
export function identifySessionCookies() {
  cy.getCookies().then((cookies) => {
    const sessionCookies = cookies.filter(cookie => 
      cookie.name.toLowerCase().includes('session') ||
      cookie.name.toLowerCase().includes('token') ||
      cookie.name.toLowerCase().includes('auth') ||
      cookie.name.toLowerCase().includes('login')
    )
    
    if (sessionCookies.length > 0) {
      cy.logStep(`Found ${sessionCookies.length} session-related cookies:`)
      sessionCookies.forEach((cookie, index) => {
        cy.logStep(`Session Cookie ${index + 1}: ${cookie.name}`)
      })
    } else {
      cy.logStep('No session-related cookies found')
    }
  })
}

/**
 * Compare cookies before and after login
 */
export function compareCookiesBeforeAfterLogin() {
  cy.getCookies().then((cookiesAfter) => {
    cookiesAfterLogin = cookiesAfter.reduce((acc, cookie) => {
      acc[cookie.name] = cookie.value
      return acc
    }, {})
    
    cy.logStep('=== COOKIE COMPARISON ===')
    
    // Find new cookies added after login
    const newCookies = Object.keys(cookiesAfterLogin).filter(
      name => !cookiesBeforeLogin[name]
    )
    
    if (newCookies.length > 0) {
      cy.logStep(`New cookies after login: ${newCookies.join(', ')}`)
    } else {
      cy.logStep('No new cookies added after login')
    }
    
    // Find cookies that changed value
    const changedCookies = Object.keys(cookiesAfterLogin).filter(
      name => cookiesBeforeLogin[name] && cookiesBeforeLogin[name] !== cookiesAfterLogin[name]
    )
    
    if (changedCookies.length > 0) {
      cy.logStep(`Cookies that changed: ${changedCookies.join(', ')}`)
    } else {
      cy.logStep('No cookies changed value')
    }
  })
}

/**
 * Store cookies before login for comparison
 */
export function storeCookiesBeforeLogin() {
  cy.getCookies().then((cookies) => {
    cookiesBeforeLogin = cookies.reduce((acc, cookie) => {
      acc[cookie.name] = cookie.value
      return acc
    }, {})
  })
}

/**
 * Get specific cookie value by name
 */
export function getCookieValue(cookieName) {
  return cy.getCookie(cookieName).then((cookie) => {
    return cookie ? cookie.value : null
  })
}

/**
 * Check if a specific cookie exists
 */
export function cookieExists(cookieName) {
  return cy.getCookie(cookieName).then((cookie) => {
    return !!cookie
  })
} 