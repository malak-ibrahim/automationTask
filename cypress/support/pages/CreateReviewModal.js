import AddReviewInfoStep from './AddReviewInfoStep'
import UploadArticlesStep from './UploadArticlesStep'
import InviteMemberStep from './InviteMemberStep'

class CreateReviewModal {
  elements = {
    //modal: () => cy.get('[data-testid="create-review-modal"], .modal-content'),
    stepper: () => cy.xpath('/html/body/div[2]/ul[1]/li[2]/div/div/div[3]/div/div/div[1]/div[1]'),
    nextBtn: () => cy.xpath('/html/body/div[2]/ul[1]/li/div/div/div[3]/div/div/div[1]/div[2]/div/div/div[4]/button[2]').first(),
    skipBtn: () => cy.xpath('//button[.//span[text()="Skip"]]').first()
  }

  addReviewInfoStep = new AddReviewInfoStep()
  uploadArticlesStep = new UploadArticlesStep()
  inviteMemberStep = new InviteMemberStep()

  goToNextStep() {
    this.elements.nextBtn().click()
    return this
  }

  goToPreviousStep() {
    this.elements.skipBtn().click()
    return this
  }
}

export default CreateReviewModal 