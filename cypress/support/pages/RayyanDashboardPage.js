class RayyanDashboardPage {
  // Selectors with multiple fallback options
  elements = {

    reviewericon: () => cy.get('button[aria-label="Invite Member"].flex.items-center.justify-center'),





    // Dashboard elements
    createReviewButton: () => cy.get('button:contains("Create Review")').first(),
    openReviewPopups: () => cy.xpath('//*[@id="app-root"]/ul[1]/li/div/div'),
    reviewsList: () => cy.get('.reviews-list, .dashboard-reviews, [data-testid="reviews-list"], .review-item'),
    userMenu: () => cy.get('.user-menu, .profile-menu, [data-testid="user-menu"]').first(),
    logoutButton: () => cy.get('.logout-button, [data-testid="logout-button"], a:contains("Logout")').first(),
    
    // Navigation
    dashboardLink: () => cy.get('a:contains("Dashboard"), .dashboard-link, [data-testid="dashboard-link"]').first(),
    reviewsLink: () => cy.get('a:contains("Reviews"), .reviews-link, [data-testid="reviews-link"]').first(),
    
    // Review creation modal/form
    reviewForm: () => cy.get('.review-form, .create-review-form, [data-testid="review-form"]').first(),
    titleInput: () => cy.get('input[name="title"], #title, .review-title-input, [data-testid="title-input"]').first(),
    descriptionInput: () => cy.get('textarea[name="description"], #description, .review-description-input, [data-testid="description-input"]').first(),
    keywordsInput: () => cy.get('input[name="keywords"], #keywords, .review-keywords-input, [data-testid="keywords-input"]').first(),
    teamMembersInput: () => cy.get('input[name="teamMembers"], #team-members, .team-members-input, [data-testid="team-members-input"]').first(),
    submitButton: () => cy.get('button[type="submit"], input[type="submit"], .submit-review, #submit-review, [data-testid="submit-review"]').first(),
    cancelButton: () => cy.get('.cancel-button, .close-button, [data-testid="cancel-review"]').first(),
    
    // Success/Error messages
    successMessage: () => cy.get('.success-message, .alert-success, [data-testid="success-message"]').first(),
    errorMessage: () => cy.get('.error-message, .alert-error, [data-testid="error-message"]').first(),
    
    // Review list items
    reviewItem: () => cy.get('.review-item, .review-card, [data-testid="review-item"]'),
    reviewTitle: () => cy.get('.review-title, .review-name, [data-testid="review-title"]').first()
  }

  // Actions
  visit() {
    cy.visit('/dashboard')
    cy.waitForPageLoad()
    return this
  }

  reviewerIcon() {
    this.elements.reviewericon().eq(0).click()
    return this
  }


  clickCreateReview() {
    this.elements.createReviewButton().should('be.visible').click()
    return this
  }

  fillReviewForm(reviewData) {
    // Fill title
    if (reviewData.title) {
      this.elements.titleInput().should('be.visible').clear().type(reviewData.title, { delay: 100 })
    }

    // Fill description
    if (reviewData.description) {
      this.elements.descriptionInput().should('be.visible').clear().type(reviewData.description, { delay: 100 })
    }

    // Fill keywords
    if (reviewData.keywords) {
      this.elements.keywordsInput().should('be.visible').clear().type(reviewData.keywords, { delay: 100 })
    }

    // Add team members
    if (reviewData.teamMembers && reviewData.teamMembers.length > 0) {
      reviewData.teamMembers.forEach(member => {
        this.elements.teamMembersInput().should('be.visible').clear().type(member, { delay: 100 })
        // Press Enter or click add button to add team member
        cy.get('body').type('{enter}')
        // Alternative: look for add button
        cy.get('button:contains("Add"), .add-member-btn, [data-testid="add-member"]').click({ force: true })
      })
    }

    return this
  }

  submitReview() {
    this.elements.submitButton().should('be.visible').and('not.be.disabled').click()
    return this
  }

  cancelReview() {
    this.elements.cancelButton().should('be.visible').click()
    return this
  }

  logout() {
    this.elements.userMenu().should('be.visible').click()
    this.elements.logoutButton().should('be.visible').click()
    return this
  }

  // Verifications
  verifyDashboardLoaded() {
    // Check if we're on dashboard
    cy.url().should('include', 'rayyan.ai')
    this.elements.createReviewButton().should('be.visible')
    return this
  }

  verifyReviewFormVisible() {
    this.elements.reviewForm().should('be.visible')
    this.elements.titleInput().should('be.visible')
    this.elements.descriptionInput().should('be.visible')
    return this
  }

  verifyReviewCreated(reviewTitle) {
    // Wait for success message
    this.elements.successMessage().should('be.visible')
    
    // Verify review appears in list
    this.elements.reviewItem().should('contain.text', reviewTitle)
    return this
  }

  verifyReviewInList(reviewTitle) {
    this.elements.reviewItem().should('contain.text', reviewTitle)
    return this
  }

  verifyReviewsListNotEmpty() {
    this.elements.reviewsList().should('have.length.greaterThan', 0)
    return this
  }

  verifySuccessMessage(message) {
    this.elements.successMessage().should('be.visible')
    if (message) {
      this.elements.successMessage().should('contain.text', message)
    }
    return this
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should('be.visible')
    if (message) {
      this.elements.errorMessage().should('contain.text', message)
    }
    return this
  }

  // Utility methods
  getReviewsCount() {
    return this.elements.reviewItem().its('length')
  }

  waitForReviewCreation() {
    // Wait for form to disappear or success message to appear
    this.elements.reviewForm().should('not.exist').or(() => {
      this.elements.successMessage().should('be.visible')
    })
    return this
  }

  refreshPage() {
    cy.reload()
    cy.waitForPageLoad()
    return this
  }

  takeScreenshot(name) {
    cy.screenshot(name)
    return this
  }
}

export default RayyanDashboardPage 