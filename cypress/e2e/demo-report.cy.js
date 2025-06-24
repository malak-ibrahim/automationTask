describe('Mochawesome Report Demo', () => {
  
  beforeEach(() => {
    cy.logStep('Starting demo test')
    cy.visit('https://example.com')
  })

  it('should demonstrate successful test with screenshots', () => {
    cy.logStep('Checking page title')
    cy.title().should('contain', 'Example Domain')
    cy.logValidation('Page title is correct', true)
    
    cy.takeScreenshotWithContext('page-loaded')
    
    cy.logStep('Checking main heading')
    cy.get('h1').should('contain', 'Example Domain')
    cy.logValidation('Main heading is present', true)
    
    cy.captureElementScreenshot('h1', 'main-heading')
    
    cy.logStep('Checking paragraph text')
    cy.get('p').should('contain', 'This domain is for use in illustrative examples')
    cy.logValidation('Paragraph text is correct', true)
  })

  it('should demonstrate test with custom logging', () => {
    cy.logStep('Testing custom commands')
    
    cy.waitForPageLoad()
    cy.verifyElementExists('h1')
    cy.verifyElementVisible('p')
    
    cy.logStep('Taking contextual screenshot')
    cy.takeScreenshotWithContext('demo-complete')
    
    cy.logValidation('All elements are present and visible', true)
  })

  it('should demonstrate test failure for report', () => {
    cy.logStep('Intentionally failing test for demo')
    
    // This will fail intentionally to show error reporting
    cy.get('.non-existent-element').should('be.visible')
    
    cy.logValidation('This should not pass', false)
  })

  afterEach(() => {
    cy.logStep('Test completed')
  })
}) 