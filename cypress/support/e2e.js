// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import accessibility testing
import 'cypress-axe'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // on uncaught exceptions
  return false
})

// Custom error handling
Cypress.on('fail', (error, runnable) => {
  // Custom error handling logic
  console.log('Test failed:', error.message)
  throw error
})



// Global afterEach hook
afterEach(() => {
  // Take screenshot on failure with timestamp
  if (Cypress.currentTest.state === 'failed') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const testName = Cypress.currentTest.title.replace(/\s+/g, '_')
    cy.screenshot(`${testName}-failed-${timestamp}`)
  }
  
  // Take screenshot on success for important tests
  if (Cypress.currentTest.state === 'passed' && Cypress.currentTest.title.includes('invite')) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const testName = Cypress.currentTest.title.replace(/\s+/g, '_')
    cy.screenshot(`${testName}-passed-${timestamp}`)
  }
})

// Mochawesome reporter configuration
Cypress.on('test:after:run', (attributes) => {
  // Add custom attributes to the test report
  if (attributes.state === 'failed') {
    // Add failure details to the report
    console.log(`Test "${attributes.title}" failed with error: ${attributes.error}`)
  }
  
  // Add test duration to the report
  if (attributes.duration) {
    console.log(`Test "${attributes.title}" took ${attributes.duration}ms`)
  }
}) 