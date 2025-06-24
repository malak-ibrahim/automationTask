# Rayyan Review Creation Automation

A comprehensive Cypress automation framework for creating team reviews on Rayyan (https://new.rayyan.ai). This Task demonstrates modern automation practices including Page Object Models, comprehensive error handling, and robust UI interactions.

## 🎯 Task Overview

**Automation Task: "Review Creation on Rayyan"**

The automation script performs the following tasks:
1. ✅ Log in to Rayyan account (mlkibrahem6+1@gmail.com)
2. ✅ Create multiple team reviews with realistic data
3. ✅ Add team members using well-structured email formats
4. ✅ Include comprehensive validations and assertions
5. ✅ Handle UI behavior changes gracefully
6. ✅ Capture screenshots of results
7. ✅ React appropriately to different scenarios
8. ✅ Test invite member functionality with comprehensive email validation

## 🚀 Features

- **End-to-End Testing**: Complete Rayyan review creation workflow
- **Page Object Model**: Maintainable and scalable test structure
- **Robust Element Selection**: Multiple fallback selectors for UI elements
- **Comprehensive Error Handling**: Graceful handling of unexpected behaviors
- **Data-Driven Testing**: Fixture-based test data with realistic content
- **Multiple Scenarios**: Different team member configurations
- **Validation Testing**: Form field validation and error handling
- **Email Validation Testing**: Comprehensive invite member email scenarios
- **Screenshots & Videos**: Automatic capture of results and failures

## 📋 Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 8.0.0)
- Git
- **Rayyan Account**: Pre-registered account (mlkibrahem6+1@gmail.com)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/malak-ibrahim/automationTask.git
   cd automationTask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify Cypress installation**
   ```bash
   npm run cypress:verify
   ```

## 🏃‍♂️ Quick Start



### Open Cypress Test Runner
```bash
npm run cypress:open
```
### Run Invite Members Tests
```bash
npm run cypress:run -- --spec "cypress/e2e/invite-members.cy.js"

## 📁 Project Structure

```
automationTask/
├── 📄 .gitignore                             # Git ignore patterns
├── 📄 README.md                              # Project documentation and setup guide
├── 📄 cypress.config.js                      # Cypress configuration and settings
├── 📄 package-lock.json                      # Locked dependency versions
├── 📄 package.json                           # Project dependencies and npm scripts
├── 📁 .git/                                  # Git repository data
├── 📁 node_modules/                          # Installed npm packages
│
├── 📁 cypress/                               # Main Cypress test framework
│   ├── 📁 e2e/                              # End-to-end test files
│   │   ├── 📄 cookie-identification.cy.js   # Cookie management and session tests
│   │   ├── 📄 demo-report.cy.js             # Mochawesome reporting demo tests
│   │   ├── 📄 invite-members.cy.js          # Invite members email validation tests
│   │   ├── 📄 login-test.cy.js              # Rayyan-specific login tests
│   │   ├── 📄 login.cy.js                   # Generic login functionality tests
│   │   └── 📄 rayyan-review-creation.cy.js  # Main Rayyan automation tests
│   │
│   ├── 📁 fixtures/                         # Test data files
│   │   ├── 📄 rayyan-data.json              # Rayyan login credentials and user data
│   │   ├── 📄 reviewers.json                # Reviewer email data for bulk testing
│   │   └── 📄 users.json                    # Generic user test data
│   │
│   ├── 📁 reports/                          # Mochawesome HTML reports
│   │   ├── 📄 mochawesome_YYYY-MM-DDTHHMMSS+0300.html  # Timestamped HTML reports
│   │   ├── 📄 mochawesome_YYYY-MM-DDTHHMMSS+0300.json  # Timestamped JSON reports
│   │   └── 📁 assets/                       # Report assets (CSS, JS, images)
│   │
│   ├── 📁 screenshots/                      # Test failure screenshots
│   ├── 📁 support/                          # Support files and utilities
│   │   ├── 📄 commands.js                   # Custom Cypress commands
│   │   ├── 📄 e2e.js                        # Global Cypress configuration
│   │   ├── 📁 helpers/                      # Helper utilities
│   │   │   └── 📄 cookie-helper.js          # Cookie management utilities
│   │   └── 📁 pages/                        # Page Object Model classes
│   │       ├── 📄 AddReviewInfoStep.js      # Add review info step object
│   │       ├── 📄 CreateReviewModal.js      # Review creation modal container
│   │       ├── 📄 InviteMemberStep.js       # Invite member step object
│   │       ├── 📄 RayyanDashboardPage.js    # Rayyan dashboard page object
│   │       ├── 📄 RayyanLoginPage.js        # Rayyan login page object
│   │       └── 📄 UploadArticlesStep.js     # Upload articles step object
│   │
│   ├── 📁 videos/                           # Test execution recordings
│   └── 📁 downloads/                        # Downloaded files during tests
│
└── 📁 .husky/                               # Git hooks (if configured)
```

### 📋 File Descriptions

#### **Configuration Files**
- **`package.json`**: Project metadata, dependencies, and npm scripts
- **`cypress.config.js`**: Cypress framework configuration (base URL, viewport, timeouts)
- **`.gitignore`**: Git ignore patterns for node_modules, screenshots, videos, etc.

#### **Test Files (`cypress/e2e/`)**
- **`rayyan-review-creation.cy.js`**: Main automation suite for Rayyan review creation workflow
- **`invite-members.cy.js`**: Comprehensive email validation and invite member functionality tests
- **`login.cy.js`**: Generic login functionality testing
- **`login-test.cy.js`**: Rayyan-specific login validation tests
- **`demo-report.cy.js`**: Mochawesome reporting demo tests
- **`cookie-identification.cy.js`**: Cookie management and session persistence tests

#### **Test Data (`cypress/fixtures/`)**
- **`rayyan-data.json`**: Contains login credentials and user data
- **`reviewers.json`**: Contains test reviewer email addresses for bulk invite testing
- **`users.json`**: Generic user data for various test scenarios

#### **Page Objects (`cypress/support/pages/`)**
- **`RayyanLoginPage.js`**: Login page interactions and elements
- **`RayyanDashboardPage.js`**: Dashboard navigation and review creation
- **`CreateReviewModal.js`**: Modal container for review creation workflow
- **`AddReviewInfoStep.js`**: Step 1 - Review information form
- **`InviteMemberStep.js`**: Step 2 - Member invitation functionality
- **`UploadArticlesStep.js`**: Step 3 - Article upload functionality

#### **Support Files (`cypress/support/`)**
- **`e2e.js`**: Global Cypress configuration and hooks
- **`commands.js`**: Custom Cypress commands for common operations
- **`helpers/cookie-helper.js`**: Cookie management and session utilities

#### **Output Directories**
- **`screenshots/`**: Automatic screenshots captured on test failures
- **`videos/`**: Test execution recordings for debugging
- **`downloads/`**: Files downloaded during test execution

## 📸 Screenshots & Demo

### 🎯 Expected Results

Below are screenshots demonstrating the automation in action:

#### **1. Rayyan Login Success**
![Rayyan Login Success](screenshots/rayyan-login-success.png)
*Successful login to Rayyan platform with dashboard access*

#### **2. Review Creation Modal**
![Review Creation Modal](screenshots/review-creation-modal.png)
*Multi-step review creation modal with form validation*

#### **3. Invite Members Step**
![Invite Members Test](cypress/screenshots/invite-members-test.png)
*Invite members test execution showing the Rayyan interface and test automation in action*

#### **4. Success Message Display**
![Success Message](screenshots/success-message.png)
*Success confirmation with invited user details*

#### **5. Mochawesome Test Report**
![Mochawesome Report](screenshots/mochawesome-report.png)
*Beautiful HTML test report with detailed results and statistics*

### 📱 Responsive Testing
![Responsive Testing](screenshots/responsive-testing.png)
*Automation works across different viewport sizes and devices*

### 🔍 Error Handling
![Error Handling](screenshots/error-handling.png)
*Graceful error handling with informative messages*

---

## 🧪 Available Test Scripts

### Rayyan-Specific Commands
- `npm run test:rayyan` - Run Rayyan automation headlessly
- `npm run test:rayyan:headed` - Run Rayyan automation with browser visible
- `npm run test:rayyan:chrome` - Run Rayyan automation in Chrome
- `npm run test:rayyan:headed:chrome` - Run Rayyan automation in Chrome with browser visible

### Invite Members Testing
- `npm run cypress:run -- --spec "cypress/e2e/invite-members.cy.js"` - Run invite members tests
- `npm run cypress:open -- --spec "cypress/e2e/invite-members.cy.js"` - Open invite members tests in Test Runner

### Reporting and Screenshots
- `npm run test:report` - Run all tests with Mochawesome HTML report
- `npm run test:report:headed` - Run tests with browser visible and generate report
- `npm run test:report:chrome` - Run tests in Chrome with Mochawesome report
- `npm run test:rayyan:report` - Run Rayyan tests with detailed HTML report
- `npm run test:invite:report` - Run invite members tests with detailed HTML report
- `npm run test:all:report` - Run all tests, merge reports, and generate final HTML report
- `npm run test:demo:report` - Run demo tests with Mochawesome reporting
- `npm run merge:reports` - Merge multiple JSON reports into one
- `npm run generate:report` - Generate final HTML report from merged JSON
- `npm run open:report` - Open the generated HTML report in browser

### General Commands
- `npm run cypress:open` - Open Cypress Test Runner
- `npm run cypress:run` - Run all tests headlessly
- `npm run test:headed` - Run all tests with browser visible

### Browser-Specific Testing
- `npm run test:chrome` - Run tests in Chrome
- `npm run test:firefox` - Run tests in Firefox
- `npm run test:edge` - Run tests in Edge

## 🎯 Test Scenarios

The Rayyan automation includes the following comprehensive test scenarios:

### 1. Login Verification
- ✅ Successful login with registered credentials
- ✅ Dashboard navigation verification

### 2. Multiple Review Creation
- ✅ Create 5 different systematic reviews with realistic data
- ✅ Each review includes:
  - Descriptive title
  - Comprehensive description
  - Relevant keywords
  - Multiple team members with valid email formats

### 3. Team Member Scenarios
- ✅ Single team member review
- ✅ Multiple team members review
- ✅ No team members review

### 4. Form Validation Testing
- ✅ Empty title validation
- ✅ Empty description validation
- ✅ Invalid email format validation
- ✅ Valid complete form submission

### 5. Edge Case Testing
- ✅ Very long titles
- ✅ Special characters in text
- ✅ Unicode characters (international languages)

### 6. Invite Member Email Test Cases
- ✅ Invite all reviewers from fixture as Reviewer using multiple emails
- ✅ Add single email with Enter key
- ✅ Add multiple emails with comma separation
- ✅ Invite a single member as Collaborator
- ✅ Invite multiple members with different roles
- ✅ Allow adding a reason/message for each invite
- ✅ Show error for invalid email format
- ✅ Prevent duplicate emails from being added
- ✅ Show error for multiple invalid emails in a batch
- ✅ Handle entering more than 10 emails at once (bulk invite edge case)
- ✅ Disable Add button if email field is empty

## 📊 Mochawesome Reporting & Screenshots

### 🎯 HTML Test Reports
The framework uses **Mochawesome** to generate beautiful, interactive HTML reports with:

- **📈 Test Statistics**: Pass/fail counts, duration, and trends
- **🔍 Detailed Test Results**: Step-by-step test execution details
- **📸 Embedded Screenshots**: Automatic screenshots for failed tests
- **🎨 Interactive Charts**: Visual representation of test results
- **📋 Test Suites**: Organized test grouping and filtering
- **⏱️ Performance Metrics**: Test execution time analysis

### 📸 Enhanced Screenshot Capture
- **Automatic Screenshots**: Captured on test failures with timestamps
- **Success Screenshots**: Captured for important test scenarios (e.g., invite tests)
- **Element Screenshots**: Capture specific elements for detailed analysis
- **Contextual Screenshots**: Screenshots with custom context and descriptions
- **Timestamped Naming**: Unique screenshot names with ISO timestamps

### 🛠️ Custom Screenshot Commands
```javascript
// Take screenshot with context
cy.takeScreenshotWithContext('after-login')

// Capture specific element
cy.captureElementScreenshot('.modal', 'modal-state')

// Wait for element and screenshot
cy.waitAndScreenshot('.dashboard', 'dashboard-loaded')

// Log test steps with emojis
cy.logStep('User login process')
cy.logValidation('Login successful', true)
```

### 📁 Report Structure
```
cypress/
├── reports/
│   ├── mochawesome.html          # Main HTML report
│   ├── mochawesome.json          # JSON report data
│   ├── output.json               # Merged report data
│   └── assets/                   # Report assets (CSS, JS, images)
├── screenshots/
│   ├── test-name-failed-timestamp.png
│   ├── test-name-passed-timestamp.png
│   └── element-screenshots/
└── videos/
    └── test-execution-recordings.mp4
```

## 📊 Test Data

The automation uses realistic, academic-focused test data:

### Fixture Files
- **rayyan-data.json**: Contains login credentials and user data
- **reviewers.json**: Contains test reviewer email addresses for bulk invite testing
- **users.json**: Generic user data for various test scenarios

### Test Email Patterns
- Valid academic email formats (e.g., `researcher@university.edu`)
- Invalid email formats for validation testing
- Duplicate emails for duplicate prevention testing
- Bulk email lists for performance testing

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)
- **Base URL**: `https://new.rayyan.ai`
- **Viewport**: 1920x1080
- **Timeouts**: 15 seconds for commands, 60 seconds for page load
- **Video recording**: Enabled
- **Screenshots on failure**: Enabled

### Environment Variables
```javascript
env: {
  rayyanEmail: 'mlkibrahem6+1@gmail.com',
  rayyanPassword: 'Abcd@123456',
  apiUrl: 'https://new.rayyan.ai/api'
}
```

## 🎨 Page Object Model

The framework uses Page Object Models for better maintainability:

### RayyanLoginPage
```javascript
class RayyanLoginPage {
  elements = {
    emailInput: () => cy.get('input[type="email"], input[name="email"], #email'),
    passwordInput: () => cy.get('input[type="password"], input[name="password"], #password'),
    loginButton: () => cy.get('button[type="submit"], input[type="submit"], .login-button')
  }

  login(email, password) {
    this.typeEmail(email)
    this.typePassword(password)
    this.clickLogin()
    return this
  }
}
```

### RayyanDashboardPage
```javascript
class RayyanDashboardPage {
  elements = {
    createReviewButton: () => cy.get('button:contains("Create New Review")'),
    titleInput: () => cy.get('input[name="title"], #title'),
    descriptionInput: () => cy.get('textarea[name="description"], #description'),
    teamMembersInput: () => cy.get('input[name="teamMembers"], #team-members')
  }

  createReview(reviewData) {
    this.clickCreateReview()
    this.fillReviewForm(reviewData)
    this.submitReview()
    return this
  }
}
```

### CreateReviewModal
```javascript
class CreateReviewModal {
  elements = {
    modal: () => cy.get('.modal, [data-cy="create-review-modal"]'),
    // ... other modal elements
  }
  
  addReviewInfoStep = new AddReviewInfoStep()
  inviteMemberStep = new InviteMemberStep()
  uploadArticlesStep = new UploadArticlesStep()
}
```

## 📈 Best Practices Implemented

### Test Organization
- ✅ Descriptive test names and scenarios
- ✅ Grouped related tests in describe blocks
- ✅ Independent and isolated tests
- ✅ Proper beforeEach/afterEach hooks
- ✅ Page Object Model for maintainable test structure

### Element Selection
- ✅ Multiple fallback selectors for robustness
- ✅ Semantic selectors over complex CSS
- ✅ Data attributes where available
- ✅ Flexible selector strategies

### Error Handling
- ✅ Graceful handling of expected errors
- ✅ Screenshot capture on failures
- ✅ Detailed logging and reporting
- ✅ Recovery mechanisms for failed scenarios

### Data Management
- ✅ Realistic, academic-focused test data
- ✅ Fixture-based data management
- ✅ Unique data generation for each test
- ✅ Proper data cleanup

### Email Validation Testing
- ✅ Comprehensive email format validation
- ✅ Duplicate email prevention
- ✅ Bulk email processing
- ✅ Edge case handling (empty fields, invalid formats)

## 🐛 Debugging

### Debug Mode
```bash
# Run Rayyan automation in debug mode
npm run test:rayyan:headed
```

### Screenshots and Videos
- Screenshots are automatically captured on test failures
- Videos are recorded for all test runs
- Files are saved in `cypress/screenshots/` and `cypress/videos/`

### Console Logging
```javascript
cy.log('Custom log message')
console.log('Debug information')
```

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Rayyan Automation Tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cypress-io/github-action@v6
        with:
          spec: cypress/e2e/rayyan-review-creation.cy.js
          browser: chrome
          record: true
```


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request



## 👤 Author

**Malak Ibrahim**
- GitHub: [@malak-ibrahim](https://github.com/malak-ibrahim)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Cypress documentation](https://docs.cypress.io/)
2. Search existing [issues](https://github.com/malak-ibrahim/automationTask/issues)
3. Create a new issue with detailed information

---

### How to Generate Mochawesome Reports

Mochawesome provides beautiful, interactive HTML reports for your Cypress test runs. Follow these steps to generate and view reports:

#### 1. Install Mochawesome (if not already installed)
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

#### 2. Run Tests with Mochawesome Reporter
You can use the provided npm scripts or run Cypress directly with the reporter:
```bash
# Run all tests and generate a Mochawesome report
npm run test:report

# Run a specific test file with Mochawesome
npx cypress run --spec "cypress/e2e/invite-members.cy.js" --reporter mochawesome
```

#### 3. Open the HTML Report
After the test run, open the generated HTML report:
```bash
# The report will be located at:
cypress/reports/mochawesome.html

# You can open it in your browser:
start cypress/reports/mochawesome.html  # Windows
open cypress/reports/mochawesome.html   # macOS
```

#### 4. Merging Multiple Reports (Optional)
If you run tests in parallel or want to merge multiple JSON reports:
```bash
npm run merge:reports
npm run generate:report
```
This will create a final merged HTML report in the `cypress/reports/` directory.

#### 5. Open the Final Report
```bash
npm run open:report
```

---

