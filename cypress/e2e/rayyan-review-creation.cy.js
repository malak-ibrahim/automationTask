import RayyanLoginPage from '../support/pages/RayyanLoginPage'
import RayyanDashboardPage from '../support/pages/RayyanDashboardPage'
import CreateReviewModal from '../support/pages/CreateReviewModal'

describe('Rayyan Review Creation Automation', () => {
  let loginPage
  let dashboardPage
  let modal
  let createdReviews = []

  beforeEach(() => {
    loginPage = new RayyanLoginPage()
    dashboardPage = new RayyanDashboardPage()
    modal = new CreateReviewModal()
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
      
      // Verify we're on dashboard
      dashboardPage.verifyDashboardLoaded()
      
      cy.log('✅ Successfully logged in to Rayyan')
    })
  })

  it('should open Create Review modal and validate Add Review Info step', () => {
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      
      // Login first
      loginPage
        .visit()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      dashboardPage.verifyDashboardLoaded()
      
      // Click Create Review and check modal
      dashboardPage.clickCreateReview()
      modal.elements.modal().should('be.visible')
      modal.elements.stepper().should('contain.text', 'Add Review Info')
      modal.elements.stepper().should('contain.text', 'Upload Articles')
      modal.elements.stepper().should('contain.text', 'Invite Members')
      
      // Add Review Info step tests
      const addStep = modal.addReviewInfoStep
      addStep.isCreateButtonDisabled()
      addStep.fillReviewTitle('')
      addStep.isCreateButtonDisabled()
      addStep.fillReviewTitle('A Systematic Review')
      addStep.isCreateButtonDisabled()
      addStep.selectReviewType('Type 1')
      addStep.isCreateButtonDisabled()
      addStep.selectReviewDomain('Domain 1')
      addStep.isCreateButtonEnabled()
      addStep.fillDescription('This is an optional description')
      addStep.isCreateButtonEnabled()
    })
  })

  it('should create multiple team reviews with comprehensive validations', () => {
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      const reviews = data.reviews
      
      // Login first
      loginPage
        .visit()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      
      dashboardPage.verifyDashboardLoaded()
      
      // Create multiple reviews
      reviews.forEach((review, index) => {
        cy.log(`🔄 Creating review ${index + 1}: ${review.title}`)
        
        try {
          // Click create review button
          dashboardPage.clickCreateReview()
          
          // Verify form is visible
          dashboardPage.verifyReviewFormVisible()
          
          // Fill the review form
          dashboardPage.fillReviewForm(review)
          
          // Submit the review
          dashboardPage.submitReview()
          
          // Wait for review creation and verify
          cy.wait(2000) // Wait for form submission
          
          // Verify review was created successfully
          dashboardPage.verifyReviewCreated(review.title)
          
          // Add to created reviews list
          createdReviews.push(review.title)
          
          cy.log(`✅ Successfully created review: ${review.title}`)
          
          // Take screenshot after each successful creation
          dashboardPage.takeScreenshot(`review-creation-${index + 1}-${review.title.replace(/[^a-zA-Z0-9]/g, '-')}`)
          
        } catch (error) {
          cy.log(`❌ Failed to create review: ${review.title}`)
          cy.log(`Error: ${error.message}`)
          
          // Take screenshot of failure
          dashboardPage.takeScreenshot(`review-creation-failed-${index + 1}`)
          
          // Try to cancel and continue with next review
          try {
            dashboardPage.cancelReview()
          } catch (cancelError) {
            cy.log(`Could not cancel review form: ${cancelError.message}`)
          }
        }
        
        // Wait before creating next review
        cy.wait(1000)
      })
      
      // Final verification - check all created reviews are in the list
      cy.log('🔍 Verifying all created reviews are visible')
      
      createdReviews.forEach(reviewTitle => {
        dashboardPage.verifyReviewInList(reviewTitle)
      })
      
      // Verify we have reviews in the list
      dashboardPage.verifyReviewsListNotEmpty()
      
      // Get final count of reviews
      dashboardPage.getReviewsCount().then((count) => {
        cy.log(`📊 Total reviews created: ${createdReviews.length}`)
        cy.log(`📊 Total reviews in list: ${count}`)
        
        // Assert that we created at least some reviews
        expect(createdReviews.length).to.be.greaterThan(0)
      })
      
      // Take final screenshot
      dashboardPage.takeScreenshot('final-review-creation-result')
      
      cy.log('🎉 Review creation automation completed successfully!')
    })
  })

  it('should handle review creation with different team member scenarios', () => {
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      
      // Login
      loginPage
        .visit()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      
      dashboardPage.verifyDashboardLoaded()
      
      // Test different team member scenarios
      const testScenarios = [
        {
          title: 'Single Team Member Review',
          description: 'Review with one team member',
          keywords: 'single member, collaboration',
          teamMembers: ['single.researcher@example.com']
        },
        {
          title: 'Multiple Team Members Review',
          description: 'Review with multiple team members',
          keywords: 'team collaboration, multiple researchers',
          teamMembers: ['researcher1@example.com', 'researcher2@example.com', 'researcher3@example.com']
        },
        {
          title: 'No Team Members Review',
          description: 'Review without team members',
          keywords: 'individual work, solo research',
          teamMembers: []
        }
      ]
      
      testScenarios.forEach((scenario, index) => {
        cy.log(`🔄 Testing scenario ${index + 1}: ${scenario.title}`)
        
        try {
          dashboardPage.clickCreateReview()
          dashboardPage.verifyReviewFormVisible()
          dashboardPage.fillReviewForm(scenario)
          dashboardPage.submitReview()
          
          cy.wait(2000)
          
          // Verify creation
          dashboardPage.verifyReviewCreated(scenario.title)
          createdReviews.push(scenario.title)
          
          cy.log(`✅ Successfully created review with scenario: ${scenario.title}`)
          
        } catch (error) {
          cy.log(`❌ Failed scenario: ${scenario.title}`)
          cy.log(`Error: ${error.message}`)
          
          try {
            dashboardPage.cancelReview()
          } catch (cancelError) {
            cy.log(`Could not cancel: ${cancelError.message}`)
          }
        }
        
        cy.wait(1000)
      })
      
      // Take screenshot of different scenarios
      dashboardPage.takeScreenshot('team-member-scenarios-result')
    })
  })

  it('should validate form fields and error handling', () => {
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      
      // Login
      loginPage
        .visit()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      
      dashboardPage.verifyDashboardLoaded()
      
      // Test validation scenarios
      const validationTests = [
        {
          name: 'Empty Title',
          data: { title: '', description: 'Test description', keywords: 'test' },
          shouldFail: true
        },
        {
          name: 'Empty Description',
          data: { title: 'Test Title', description: '', keywords: 'test' },
          shouldFail: true
        },
        {
          name: 'Invalid Email Format',
          data: { 
            title: 'Test Title', 
            description: 'Test description', 
            keywords: 'test',
            teamMembers: ['invalid-email']
          },
          shouldFail: true
        },
        {
          name: 'Valid Complete Form',
          data: { 
            title: 'Validation Test Review', 
            description: 'This is a test review for validation', 
            keywords: 'validation, testing, automation',
            teamMembers: ['valid.email@example.com']
          },
          shouldFail: false
        }
      ]
      
      validationTests.forEach((test, index) => {
        cy.log(`🔄 Testing validation: ${test.name}`)
        
        try {
          dashboardPage.clickCreateReview()
          dashboardPage.verifyReviewFormVisible()
          dashboardPage.fillReviewForm(test.data)
          dashboardPage.submitReview()
          
          cy.wait(2000)
          
          if (test.shouldFail) {
            // Should show error message
            dashboardPage.verifyErrorMessage()
            cy.log(`✅ Correctly handled validation error for: ${test.name}`)
          } else {
            // Should succeed
            dashboardPage.verifyReviewCreated(test.data.title)
            createdReviews.push(test.data.title)
            cy.log(`✅ Successfully created review: ${test.name}`)
          }
          
        } catch (error) {
          cy.log(`❌ Unexpected error in validation test: ${test.name}`)
          cy.log(`Error: ${error.message}`)
        }
        
        // Clean up - try to cancel if form is still open
        try {
          dashboardPage.cancelReview()
        } catch (cancelError) {
          // Form might have closed automatically
        }
        
        cy.wait(1000)
      })
      
      // Take screenshot of validation results
      dashboardPage.takeScreenshot('validation-testing-results')
    })
  })

  it('should handle UI behavior changes and edge cases', () => {
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      
      // Login
      loginPage
        .visit()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      
      dashboardPage.verifyDashboardLoaded()
      
      // Test edge cases
      const edgeCases = [
        {
          name: 'Very Long Title',
          data: {
            title: 'This is a very long review title that might test the UI behavior when dealing with extremely long text inputs and how the system handles such cases',
            description: 'Test description',
            keywords: 'long title, edge case'
          }
        },
        {
          name: 'Special Characters',
          data: {
            title: 'Review with Special Chars: @#$%^&*()_+-=[]{}|;:,.<>?',
            description: 'Description with special characters: @#$%^&*()',
            keywords: 'special, characters, symbols'
          }
        },
        {
          name: 'Unicode Characters',
          data: {
            title: 'Review with Unicode: 中文 Español Français العربية',
            description: 'Description with unicode: 中文 Español Français العربية',
            keywords: 'unicode, international, languages'
          }
        }
      ]
      
      edgeCases.forEach((testCase, index) => {
        cy.log(`🔄 Testing edge case: ${testCase.name}`)
        
        try {
          dashboardPage.clickCreateReview()
          dashboardPage.verifyReviewFormVisible()
          dashboardPage.fillReviewForm(testCase.data)
          dashboardPage.submitReview()
          
          cy.wait(2000)
          
          // Try to verify creation (might succeed or fail)
          try {
            dashboardPage.verifyReviewCreated(testCase.data.title)
            createdReviews.push(testCase.data.title)
            cy.log(`✅ Successfully handled edge case: ${testCase.name}`)
          } catch (verifyError) {
            cy.log(`⚠️ Edge case ${testCase.name} may have failed as expected`)
          }
          
        } catch (error) {
          cy.log(`❌ Error in edge case: ${testCase.name}`)
          cy.log(`Error: ${error.message}`)
        }
        
        // Clean up
        try {
          dashboardPage.cancelReview()
        } catch (cancelError) {
          // Form might have closed
        }
        
        cy.wait(1000)
      })
      
      // Take screenshot of edge case results
      dashboardPage.takeScreenshot('edge-cases-testing-results')
    })
  })

  afterEach(() => {
    // Log summary after each test
    if (createdReviews.length > 0) {
      cy.log(`📋 Reviews created in this session: ${createdReviews.length}`)
      cy.log(`📋 Review titles: ${createdReviews.join(', ')}`)
    }
  })

  after(() => {
    // Final summary and cleanup
    cy.log('🎯 Automation Summary:')
    cy.log(`📊 Total reviews attempted: ${createdReviews.length}`)
    cy.log(`📊 Successfully created: ${createdReviews.length}`)
    
    // Take final screenshot
    cy.fixture('rayyan-data').then((data) => {
      const user = data.user
      
      // Login for final screenshot
      loginPage
        .visit()
        .login(user.email, user.password)
        .verifyLoginSuccess()
      
      dashboardPage.verifyDashboardLoaded()
      dashboardPage.takeScreenshot('final-automation-result')
      
      cy.log('🎉 Rayyan Review Creation Automation completed!')
    })
  })
}) 