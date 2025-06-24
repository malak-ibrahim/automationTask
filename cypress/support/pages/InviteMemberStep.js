class InviteMemberStep {
  elements = {
    
    emailInput: () => cy.get('div[role="textbox"] input[name="invite[emails]"], [data-testid="keywords-input-field"]'),
    emailInputContainer: () => cy.get('div[role="textbox"]'),
    addBtn: () => cy.get('button[aria-label="Invite"]'),
    roleDropdown: () => cy.get('div.w-full.h-full.flex.empty\\:hidden'),
    roleOptions: () => cy.get('span.block.select-none.truncate'),
    reasonTextarea: () => cy.get('textarea[placeholder="Add a reason/message for the user invitation email"]'),
    invitedList: () => cy.get('button[aria-label="Invite"]').contains('Invite'),
   
  }

  
  enterEmail(email) {
    this.elements.emailInput().clear().type(email)
    return this
  }

  enterMultipleEmails(emails) {
    // Clear the input first
    this.elements.emailInput().clear()
    
    // Type each email separated by comma
    const emailString = emails.join(', ')
    this.elements.emailInput().type(emailString)
    
    // Click outside the field or press Enter to add emails
    this.elements.emailInputContainer().click()
    return this
  }

  addEmailWithEnter(email) {
    this.elements.emailInput().type(email + '{enter}')
    return this
  }

  selectRole(role) {
    this.elements.roleDropdown().eq(3).click()
    this.elements.roleOptions().contains(role).click()
    return this
  }

  enterReason(reason) {
    this.elements.reasonTextarea().clear().type(reason)
    return this
  }

  addInvite() {
    // Check if Add button is enabled before clicking
    this.elements.addBtn().should('not.be.disabled').click()
    return this
  }

  isAddButtonEnabled() {
    this.elements.addBtn().should('not.be.disabled')
    return this
  }

  isAddButtonDisabled() {
    this.elements.addBtn().should('be.disabled')
    return this
  }

}

export default InviteMemberStep 