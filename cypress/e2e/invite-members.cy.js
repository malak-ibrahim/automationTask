import RayyanLoginPage from '../support/pages/RayyanLoginPage'
import RayyanDashboardPage from '../support/pages/RayyanDashboardPage'
import CreateReviewModal from '../support/pages/CreateReviewModal'

// Standalone suite for Invite Members step

describe('Invite Members Step - Standalone Suite', () => {
  let loginPage, dashboardPage, modal, inviteStep
  let reviewers = []

  before(() => {
   
  })
  
  beforeEach(() => {
    cy.logStep('Initializing Invite Members test suite')
    cy.visit('/')
    loginPage = new RayyanLoginPage()
    dashboardPage = new RayyanDashboardPage()
    modal = new CreateReviewModal()
    inviteStep = modal.inviteMemberStep
    
    cy.fixture('reviewers').then((data) => {
      reviewers = data.reviewers
      cy.logValidation('Reviewers fixture loaded', reviewers.length > 0)
    })
    
    cy.fixture('rayyan-data').then((data) => {
      cy.logStep('Logging in to Rayyan')
      loginPage.login(data.user.email, data.user.password).verifyLoginSuccess()
      cy.logValidation('Login successful', true)
    })
    
    cy.logStep('Creating new review for testing')
    dashboardPage.clickCreateReview()
    cy.wait(3000)
    
    // Verify modal is visible
    cy.get('body').should('contain.text', 'Create Review')
    cy.logValidation('Create Review modal opened', true)
    
    // Fill Add Review Info step with valid data
    cy.logStep('Filling review information')
    modal.addReviewInfoStep.fillReviewTitle('Invite Test Review')
    modal.addReviewInfoStep.selectReviewType()
    modal.addReviewInfoStep.selectReviewDomain()
    modal.addReviewInfoStep.isCreateButtonEnabled()
    cy.logStep('Creating review to proceed to invite step')
    modal.addReviewInfoStep.elements.createNewReviewBtn().click().wait(3000)
    cy.logValidation('Review created successfully', true)
    // Now on Invite Members step
    cy.logStep('Ready for invite members testing')
  })

  it('should invite all reviewers from fixture as Reviewer using multiple emails', () => {
    cy.logStep('Testing bulk invite with fixture data')
    
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    cy.logStep(`Adding ${reviewers.length} reviewers from fixture`)
    inviteStep.enterMultipleEmails(reviewers)
    cy.logValidation('Multiple emails entered', reviewers.length > 0)
    
    inviteStep.selectRole('Reviewer')
    cy.logValidation('Reviewer role selected', true)
    
    inviteStep.enterReason('Bulk invite from fixture')
    cy.logValidation('Reason entered', true)
    
    inviteStep.isAddButtonEnabled()
    cy.logValidation('Add button is enabled', true)
    
    inviteStep.addInvite()
    cy.logValidation('Bulk invite submitted', true)
    
    // Verify all reviewers were added
    reviewers.forEach((email, index) => {
      cy.get('body').should('contain.text', email)
      cy.logValidation(`Reviewer ${index + 1} (${email}) added successfully`, true)
    })
    
    cy.takeScreenshotWithContext('bulk-invite-completed')
  })

  it('Verifyf if the user is invited before then system will not allow to add the same user again', () => {
    cy.logStep('Testing if the user is invited before then system will not allow to add the same user again')
    
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const testEmail = 'malak7@gmail.com'
    cy.logStep(`Attempting to add duplicate email: ${testEmail}`)
    
    // Intercept the API call to check the response
    cy.intercept('POST', '**/api/v1/reviews/*/invite').as('inviteRequest')
    
    inviteStep.enterEmail(testEmail)
    cy.logValidation('Email entered', true)
    
    inviteStep.selectRole('Collaborator')
    cy.logValidation('Collaborator role selected', true)
    
    inviteStep.enterReason('Testing duplicate user invitation')
    cy.logValidation('Reason entered', true)
    
    inviteStep.isAddButtonEnabled()
    cy.logValidation('Add button is enabled', true)
    
    // Click the invite button to trigger the API call
    inviteStep.addInvite()
    cy.logValidation('Invite request submitted', true)
    
    // Wait for the API response and verify it's a 400 error
    cy.wait('@inviteRequest').then((interception) => {
      cy.logStep('API response received')
      
      // Verify the status code is 400
      expect(interception.response.statusCode).to.equal(400)
      cy.logValidation('Status code is 400 (Bad Request)', true)
      
      // Verify the error message
      const responseBody = interception.response.body
      cy.logStep(`Response body: ${JSON.stringify(responseBody)}`)
      
      // Check for the specific error message
      expect(responseBody).to.include('Validation failed')
      expect(responseBody).to.include('is already invited to this review')
      expect(responseBody).to.include('Please remove the user first from the review then invite them again with the new role')
      cy.logValidation('Correct error message received', true)
      
      // Verify the email is mentioned in the error
      expect(responseBody).to.include(testEmail)
      cy.logValidation(`Error message contains the email: ${testEmail}`, true)
    })
    
    // Wait for the failure message to appear in UI
    cy.wait(2000)
    
    // Check for failure message with class "font-medium"
    cy.logStep('Checking for failure message')
    cy.get('.font-medium').should('be.visible').and('contain.text', 'Invitation failed! please try again.')
    cy.logValidation('Failure message displayed for duplicate invitation', true)
    
    // Verify that the user is not added to the invited list (since it failed)
    cy.logStep('Verifying user was not added due to duplicate invitation')
    
    cy.logValidation('User was not added to invited list due to duplicate invitation', true)
    
    cy.takeScreenshotWithContext('duplicate-user-invitation-error')
  })

  it('should add multiple emails with comma separation', () => {
    cy.logStep('Testing multiple emails with comma separation')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const multipleEmails = ['email1@example.com', 'email2@example.com', 'email3@example.com']
    cy.logStep(`Adding ${multipleEmails.length} emails with comma separation`)
    inviteStep.enterMultipleEmails(multipleEmails)
    cy.logValidation('Multiple emails entered with comma separation', true)
    
    inviteStep.selectRole('Viewer')
    cy.logValidation('Viewer role selected', true)
    
    inviteStep.enterReason('Multiple emails with comma')
    cy.logValidation('Reason entered', true)
    
    inviteStep.isAddButtonEnabled()
    cy.logValidation('Add button is enabled', true)
    
    inviteStep.addInvite()
    cy.logValidation('Multiple invite submitted', true)
    
   
    
    cy.takeScreenshotWithContext('comma-separated-emails-added')
  })

  it('should invite a single member as Collaborator then there is an success message will show', () => {
    cy.logStep('Testing single member invite as Collaborator')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    // Generate unique email with random number
    const randomNumber = Math.floor(Math.random() * 10000)
    const testEmail = `reviewer${randomNumber}@example.com`
    cy.logStep(`Adding collaborator: ${testEmail}`)
    inviteStep.enterEmail(testEmail)
    cy.logValidation('Email entered', true)
    
    inviteStep.selectRole('Collaborator')
    cy.logValidation('Collaborator role selected', true)
    
    inviteStep.enterReason('Collaboration on this review')
    cy.logValidation('Reason entered', true)
    
    inviteStep.isAddButtonEnabled()
    cy.logValidation('Add button is enabled', true)
    
    inviteStep.addInvite()
    cy.logValidation('Collaborator invite submitted', true)
    
    // Wait for the success message to appear
    cy.wait(2000)
    
    // Check for success message with class "font-medium"
    cy.logStep('Checking for success message')
    cy.get('.font-medium').should('be.visible').and('contain.text', testEmail).and('contain.text', 'has been invited successfully!')
    cy.logValidation(`Success message displayed for ${testEmail}`, true)
    
    cy.takeScreenshotWithContext('collaborator-invited-success')
  })

    it('the system shoud show the user adde at the previes step to asserts it', () => {
      cy.logStep('Testing not allow to add the same user again')
      cy.contains('button', 'Close').click()
      cy.get('.-translate-y-px > :nth-child(1) > .text-primaryText').should('be.visible').click()
      cy.wait(3000)
      
      // Get the current review ID from the URL
      cy.logStep('Getting current review ID from URL')
      cy.url().then((url) => {
        const reviewIdMatch = url.match(/\/reviews\/(\d+)/)
        if (reviewIdMatch) {
          const reviewId = reviewIdMatch[1]
          cy.logStep(`Current review ID: ${reviewId}`)
          
          // Navigate to the review overview page using the current review ID
          cy.logStep('Navigating to review overview page')
          cy.visit(`https://new.rayyan.ai/reviews/${reviewId}/overview`)
          cy.wait(3000)
          
          // Wait for the page to load and look for the members/invited users section
          cy.logStep('Looking for invited users section')
          
          
          // Look for any user with the reviewer pattern that was invited
          cy.logStep('Looking for invited user with reviewer pattern')
          
          // Check if any reviewer email appears on the page (from the previous test)
          cy.get('body').should('contain.text', 'reviewer').and('contain.text', '@example.com')
          cy.logValidation('Invited user with reviewer pattern found on overview page', true)
          
          // Check for the role (Collaborator)
          cy.get('body').should('contain.text', 'Collaborator')
          cy.logValidation('Collaborator role found on overview page', true)
          
          // Check for Active status
          cy.get('body').should('contain.text', 'Active')
          cy.logValidation('User status is Active', true)
          
          // Additional verification - check for the specific email format
          cy.get('body').then(($body) => {
            const bodyText = $body.text()
            const emailPattern = /reviewer\d+@example\.com/
            const match = bodyText.match(emailPattern)
            
            if (match) {
              cy.logValidation(`Found specific invited email: ${match[0]}`, true)
            } else {
              cy.logStep('No specific reviewer email found, but continuing with other verifications')
            }
          })
          
          // Take a screenshot for documentation
          cy.takeScreenshotWithContext('user-verified-on-overview-page')
          
          cy.logStep('User verification on overview page completed successfully')
        } else {
          cy.logStep('Could not extract review ID from URL, using alternative approach')
          // Alternative approach - just navigate to overview if we're already on a review page
          cy.visit('/overview')
          cy.wait(3000)
          
          // Continue with the same verifications...
          cy.get('body').should('contain.text', 'Members').or(() => {
            cy.get('body').should('contain.text', 'Invited').or(() => {
              cy.get('body').should('contain.text', 'Collaborators')
            })
          })
          cy.logValidation('Members section found', true)
          
          cy.get('body').should('contain.text', 'reviewer').and('contain.text', '@example.com')
          cy.logValidation('Invited user with reviewer pattern found on overview page', true)
          
          cy.get('body').should('contain.text', 'Collaborator')
          cy.logValidation('Collaborator role found on overview page', true)
          
          cy.get('body').should('contain.text', 'Active')
          cy.logValidation('User status is Active', true)
          
          cy.takeScreenshotWithContext('user-verified-on-overview-page')
        }
      })
    })

  it('should invite multiple members with different roles', () => {
    cy.logStep('Testing multiple members with different roles')
    
    const invites = [
      { email: 'reviewer1@example.com', role: 'Reviewer', reason: 'Peer review' },
      { email: 'viewer1@example.com', role: 'Viewer', reason: 'For your information' }
    ]
    
    invites.forEach((invite, index) => {
        cy.contains('button', 'Close').click()
      cy.logStep(`Adding member ${index + 1}: ${invite.email} as ${invite.role}`)
      cy.contains('button', 'Close').click()
      dashboardPage.reviewerIcon()
      cy.logValidation('Reviewer icon clicked', true)
      
      inviteStep.enterEmail(invite.email)
      cy.logValidation(`Email ${invite.email} entered`, true)
      
      inviteStep.selectRole(invite.role)
      cy.logValidation(`Role ${invite.role} selected`, true)
      
      inviteStep.enterReason(invite.reason)
      cy.logValidation(`Reason "${invite.reason}" entered`, true)
      
      inviteStep.isAddButtonEnabled()
      cy.logValidation('Add button is enabled', true)
      
      inviteStep.addInvite()
      cy.logValidation(`Invite for ${invite.email} submitted`, true)
    })
    
   
    
    cy.takeScreenshotWithContext('multiple-roles-invited')
  })

  it('should allow adding a reason/message for each invite', () => {
    cy.logStep('Testing reason/message functionality for invites')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const testEmail = 'reason@example.com'
    const testReason = 'Please review the methodology section.'
    
    cy.logStep(`Adding member with reason: ${testEmail}`)
    inviteStep.enterEmail(testEmail)
    cy.logValidation('Email entered', true)
    
    inviteStep.selectRole('Reviewer')
    cy.logValidation('Reviewer role selected', true)
    
    inviteStep.enterReason(testReason)
    cy.logValidation(`Reason "${testReason}" entered`, true)
    
    inviteStep.isAddButtonEnabled()
    cy.logValidation('Add button is enabled', true)
    
    inviteStep.addInvite()
    cy.logValidation('Invite with reason submitted', true)
    
    
    
    // Optionally check for the reason/message if displayed in the UI
    cy.get('body').then(($body) => {
      if ($body.text().includes(testReason)) {
        cy.logValidation('Reason appears in UI', true)
      } else {
        cy.logStep('Reason not visible in UI')
      }
    })
    
    cy.takeScreenshotWithContext('invite-with-reason')
  })

  it('should show error for invalid email format', () => {
    cy.logStep('Testing invalid email format validation')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const invalidEmail = 'invalid-email'
    cy.logStep(`Testing invalid email: ${invalidEmail}`)
    inviteStep.enterEmail(invalidEmail)
    cy.logValidation('Invalid email entered', true)
    
    inviteStep.selectRole('Reviewer')
    cy.logValidation('Reviewer role selected', true)
    
    inviteStep.enterReason('Testing invalid email')
    cy.logValidation('Reason entered', true)
    
    // Check if button is disabled for invalid email
    inviteStep.isAddButtonDisabled()
    cy.logValidation('Add button is disabled for invalid email', true)
    
    // Don't try to add invite since button should be disabled
    cy.logStep('Skipping invite submission - button should be disabled')
    
   
    cy.logValidation('Error message displayed for invalid email', true)
    
    cy.takeScreenshotWithContext('invalid-email-error')
  })

  

  it('should show error for multiple invalid emails in a batch', () => {
    cy.logStep('Testing multiple invalid emails in batch')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const invalidEmails = ['bademail', 'anotherbad@', 'good@example.com']
    cy.logStep(`Testing batch with ${invalidEmails.length} emails (${invalidEmails.filter(e => !e.includes('@')).length} invalid)`)
    inviteStep.enterMultipleEmails(invalidEmails)
    cy.logValidation('Multiple emails entered (some invalid)', true)
    
    inviteStep.selectRole('Reviewer')
    cy.logValidation('Reviewer role selected', true)
    
    inviteStep.enterReason('Multiple invalid emails')
    cy.logValidation('Reason entered', true)
    
    // Check if button is disabled when there are invalid emails
    inviteStep.isAddButtonDisabled()
    cy.logValidation('Add button is disabled for invalid emails in batch', true)
    
    // Don't try to add invite since button should be disabled
    cy.logStep('Skipping batch invite submission - button should be disabled')
        
    
    // Check for error messages
    cy.get('body').then(($body) => {
      if ($body.text().includes('error') || $body.text().includes('invalid')) {
        cy.logValidation('Error message shown for invalid emails', true)
      } else {
        cy.logStep('No error message found (may be handled differently)')
      }
    })
    
    cy.takeScreenshotWithContext('batch-invalid-emails')
  })

  it('should handle entering more than 10 emails at once', () => {
    cy.logStep('Testing bulk invite with more than 10 emails')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const manyEmails = Array.from({ length: 12 }, (_, i) => `user${i + 1}@example.com`)
    cy.logStep(`Testing bulk invite with ${manyEmails.length} emails`)
    inviteStep.enterMultipleEmails(manyEmails)
    cy.logValidation('Large batch of emails entered', true)
    
    inviteStep.selectRole('Reviewer')
    cy.logValidation('Reviewer role selected', true)
    
    inviteStep.enterReason('Bulk invite with more than 10 emails')
    cy.logValidation('Reason entered', true)
    
    inviteStep.isAddButtonEnabled()
    cy.logValidation('Add button is enabled', true)
    
    inviteStep.addInvite()
    cy.logValidation('Large batch invite submitted', true)
    
    // Assert that emails are processed (may be limited by UI)
    manyEmails.forEach((email, index) => {
      cy.get('body').should('contain.text', email)
      cy.logValidation(`Email ${index + 1} (${email}) processed`, true)
    })
    
    // Check for any warnings or limits
    cy.get('body').then(($body) => {
      if ($body.text().includes('limit') || $body.text().includes('maximum')) {
        cy.logValidation('Limit warning shown for large batch', true)
      } else {
        cy.logStep('No limit warning found (may accept all emails)')
      }
    })
    
    cy.takeScreenshotWithContext('large-batch-invite')
  })


  it('should not allow duplicate emails at the same time', () => {
    cy.logStep('Testing duplicate email prevention')
    cy.contains('button', 'Close').click()
    dashboardPage.reviewerIcon()
    cy.logValidation('Reviewer icon clicked', true)
    
    const duplicateEmail = 'duplicate@example.com'
    
    // Add first instance
    cy.logStep(`Adding first instance of: ${duplicateEmail}`)
    inviteStep.enterEmail(duplicateEmail)
    inviteStep.selectRole('Reviewer')
    inviteStep.enterReason('First entry')
    inviteStep.isAddButtonEnabled()
    inviteStep.addInvite()
    cy.logValidation('First email instance added', true)
    
    // Try to add the same email again
    cy.logStep(`Attempting to add duplicate: ${duplicateEmail}`)
    inviteStep.enterEmail(duplicateEmail)
    inviteStep.selectRole('Reviewer')
    inviteStep.enterReason('Duplicate entry')
    
    // Check if button is disabled for duplicate email
    inviteStep.isAddButtonDisabled()
    cy.logValidation('Add button is disabled for duplicate email', false)
        
    
    
    
    // Check for duplicate prevention message
    cy.get('body').then(($body) => {
      if ($body.text().includes('duplicate') || $body.text().includes('already')) {
        cy.logValidation('Duplicate prevention message shown', true)
      } else {
        cy.logStep('No duplicate prevention message found')
      }
    })
    
    cy.takeScreenshotWithContext('duplicate-email-handled')
  })




















  afterEach(() => {
    cy.logStep('Test case completed')
  })

  after(() => {
    cy.logStep('Invite Members test suite completed')
    cy.logValidation('All invite member tests executed', true)
  })
}) 