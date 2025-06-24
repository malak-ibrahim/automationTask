class UploadArticlesStep {
  elements = {
    //uploadInput: () => cy.contains('button', 'Select Files'),
    //nextBtn: () => cy.get('button:contains("Next"), [data-testid="next-step"]'),
    skipBtn: () => cy.contains('button', 'Skip')
  }

  uploadFile(filePath) {
    this.elements.uploadInput().attachFile(filePath)
    return this
  }

  goToNextStep() {
    this.elements.skipBtn().click()
    return this
  }

 
}

export default UploadArticlesStep 