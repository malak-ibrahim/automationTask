class AddReviewInfoStep {
  elements = {
    reviewTitle: () => cy.get('input[placeholder="Review title has to be unique"]'),
    reviewTypeDropdown: () => cy.get('div.w-full.h-full.flex.empty\\:hidden'),
    reviewTypeOptions: () => cy.get('span.block.truncate'),
    reviewDomainDropdown: () => cy.contains('div', 'Choose review domain'),
    reviewDomainOptions: () => cy.get('span.block.select-none.truncate'),
    description: () => cy.get('textarea[name="review[description]"]'),
    createNewReviewBtn: () => cy.get('button[aria-label="Create New Review"]').first()
  }

  fillReviewTitle(title) {
    this.elements.reviewTitle().clear().should('be.visible').and('be.enabled').type(title)
    return this
  }

  selectReviewType() {
    this.elements.reviewTypeDropdown().eq(3).click()
    this.elements.reviewTypeOptions().contains('Systematic Review').scrollIntoView().should('be.visible').click()
    return this
  }

  selectReviewDomain() {
    this.elements.reviewDomainDropdown().click()
    this.elements.reviewDomainOptions().contains('Biomedical').scrollIntoView().should('be.visible').click()
    return this
  } 

  fillDescription(desc) {
    this.elements.description().clear().type(desc)
    return this
  }

  isCreateButtonEnabled() {
    this.elements.createNewReviewBtn().should('not.be.disabled').wait(3000)
    return this
  }

  isCreateButtonDisabled() {
    this.elements.createNewReviewBtn().should('be.disabled').wait(6000)
    return this
  }
}

export default AddReviewInfoStep 