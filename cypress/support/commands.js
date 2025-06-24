// Custom command to login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-cy=username]').first().type(username)
  cy.get('[data-cy=password]').first().type(password)
  cy.get('[data-cy=login-button]').first().click()
  cy.url().should('not.include', '/login')
})

// Custom command to logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=logout-button]').first().click()
  cy.url().should('include', '/login')
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.window().its('document.readyState').should('eq', 'complete')
})

// Custom command to check accessibility
Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe()
  cy.checkA11y()
})

// Custom command to type with delay (for better visibility)
Cypress.Commands.add('typeWithDelay', (selector, text, delay = 100) => {
  cy.get(selector).first().clear()
  text.split('').forEach((char, index) => {
    cy.get(selector).first().type(char, { delay })
  })
})

// Custom command to select from dropdown
Cypress.Commands.add('selectFromDropdown', (dropdownSelector, optionText) => {
  cy.get(dropdownSelector).first().click()
  cy.get(`[data-value="${optionText}"]`).first().click()
})

// Custom command to upload file
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.fixture(fileName).then(fileContent => {
    cy.get(selector).first().attachFile({
      fileContent: fileContent.toString(),
      fileName: fileName,
      mimeType: 'text/plain'
    })
  })
})

// Custom command to wait for element to be visible and clickable
Cypress.Commands.add('waitAndClick', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).first().should('be.visible').and('not.be.disabled').click()
})

// Custom command to verify text content
Cypress.Commands.add('verifyText', (selector, expectedText) => {
  cy.get(selector).first().should('contain.text', expectedText)
})

// Custom command to verify element exists
Cypress.Commands.add('verifyElementExists', (selector) => {
  cy.get(selector).first().should('exist')
})

// Custom command to verify element is visible
Cypress.Commands.add('verifyElementVisible', (selector) => {
  cy.get(selector).first().should('be.visible')
})

// Custom command to scroll to element
Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).first().scrollIntoView()
})

// Custom command to take screenshot with custom name
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name)
})

// Custom command to wait for API response
Cypress.Commands.add('waitForApiResponse', (method, url, alias) => {
  cy.intercept(method, url).as(alias)
  cy.wait(`@${alias}`)
})

// Custom command to verify API response
Cypress.Commands.add('verifyApiResponse', (alias, expectedStatus = 200) => {
  cy.get(`@${alias}`).its('response.statusCode').should('eq', expectedStatus)
})

// Enhanced screenshot command with timestamp and context
Cypress.Commands.add('takeScreenshotWithContext', (context = '') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const testName = Cypress.currentTest.title.replace(/\s+/g, '_')
  const screenshotName = context ? `${testName}-${context}-${timestamp}` : `${testName}-${timestamp}`
  cy.screenshot(screenshotName)
  cy.log(`Screenshot taken: ${screenshotName}`)
})

// Custom command to capture element screenshot
Cypress.Commands.add('captureElementScreenshot', (selector, name) => {
  cy.get(selector).first().screenshot(name)
})

// Custom command to wait and take screenshot
Cypress.Commands.add('waitAndScreenshot', (selector, name, timeout = 5000) => {
  cy.get(selector, { timeout }).first().should('be.visible')
  cy.screenshot(name)
})

// Custom command for test step logging
Cypress.Commands.add('logStep', (stepName) => {
  cy.log(`🔍 STEP: ${stepName}`)
  console.log(`Test Step: ${stepName} - ${new Date().toISOString()}`)
})

// Custom command for test validation logging
Cypress.Commands.add('logValidation', (validationName, result) => {
  const status = result ? '✅ PASS' : '❌ FAIL'
  cy.log(`${status}: ${validationName}`)
  console.log(`Validation: ${validationName} - ${status}`)
})

// Override existing commands
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  // Add custom logic before visiting
  console.log(`Visiting: ${url}`)
  return originalFn(url, options)
}) 