import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import LeftNavPage from '../../support/page-objects/LeftNavPage'
import SignInPage from '../../support/page-objects/SignInPage'
import OrganizationPage from '../../support/page-objects/OrganizationPage'
import OrganizationRequests from '../../support/ApiRequests/OrganizationRequests'
import generalTexts from '../../support/generalTexts'
import WorkspacePage from '../../support/page-objects/WorkspacePage'

const signInPage = new SignInPage()
const leftNavPage = new LeftNavPage()
const organizationPage = new OrganizationPage()
const organizationRequests = new OrganizationRequests()
const workspacePage = new WorkspacePage()

beforeEach(() => {
    cy.login()
    signInPage.navigate()
    cy.wait(3000)
})

//test-1
Given('I create a Organization', () => {
    organizationPage.clickOrgSwitcher()
    organizationPage.clickCreateOrgButton()
    cy.fillInFields(generalTexts.organizationName)
    cy.clickCreateUploadBtn()
})
When('I click the add new Workspace button', () => {
    organizationPage.clickCreateWorkspaceButton()
})
When('I feel in the required fields and click add workspace button', () => {
    cy.fillInFields(generalTexts.workspaceName)
    cy.clickCreateUploadBtn()
})
Then('I see the Workspace created and added in the list of the organization page', () => {
    cy.checkNotificationMessage(generalTexts.spaceCreationMessage)
    organizationPage.workspaceCheckInList()
    organizationRequests.deleteTestOrg()
})

//test-2
Given('I open the Workspace creation form', () => {
    leftNavPage.openOrganizationPage()
    organizationPage.clickCreateWorkspaceButton()
})
When('I click the create button without filling in required fields', () => {
    cy.clickCreateUploadBtn()
})
Then('I see the validation message is displayed under the required fields', () => {
    cy.validationMessageIsDisplayed(generalTexts.workspaceBlankInputValidation)
})

//test-3
Given('I open the Workspace creation form to validate', () => {
    leftNavPage.openOrganizationPage()
    organizationPage.clickCreateWorkspaceButton()
})
When('I filling in required fields with less than 3 chars and click the create button', () => {
    cy.fillInFields('te')
    cy.clickCreateUploadBtn()
})
Then('I see the 3 chars validation message is displayed under the required fields', () => {
    cy.validationMessageIsDisplayed(generalTexts.workspaceCharLengthValidation)
})

//test-4
Given('I open the Workspace creation form to cancel', () => {
    leftNavPage.openOrganizationPage()
    organizationPage.clickCreateWorkspaceButton()
})
When('I click the cancel button on the pop-up', () => {
    cy.clickCancelBtn()
})
Then('I see the cancel button close the pop-up successfully', () => {
    cy.checkTheWindowClosed()
})

//test-5
Given('I open the Workspace creation form to close', () => {
    leftNavPage.openOrganizationPage()
    organizationPage.clickCreateWorkspaceButton()
})
When('I click the cross icon on the pop-up', () => {
    cy.clickCrossBtn()
})
Then('I see the cross icon closed the pop-up successfully', () => {
    cy.checkTheWindowClosed()
})

//test-6
Given('I open the workspace creation page', () => {
    organizationPage.clickOrgSwitcher()
    organizationPage.clickCreateOrgButton()
    cy.fillInFields(generalTexts.organizationName)
    cy.clickCreateUploadBtn()
})
When('I upload an image of type {string} and creating a workspace', (imageType) => {
    organizationPage.clickCreateWorkspaceButton()
    cy.fillInFields(generalTexts.workspaceName)
    cy.uploadImage(imageType)
    cy.clickCreateUploadBtn()
})
Then('I should see {string} message', (expectedMessage) => {
    if (expectedMessage === 'no') {
        cy.checkNotificationMessage(generalTexts.spaceCreationMessage)
        workspacePage.workspaceImageCheck()
        organizationRequests.deleteTestOrg()
    } else {
        cy.verifyErrorMessage(expectedMessage)
        organizationRequests.deleteTestOrg()
    }
})

//test-7
Given('I open the workspace settings page and update the data', () => {
    leftNavPage.openWorkspacePage()
    workspacePage.openSettingsTab()
    cy.fillInFields(generalTexts.spaceName)
})
When('I see my changes have been saved successfully', () => {
    cy.clickSaveBtn()
    cy.checkNotificationMessage(generalTexts.spaceUpdatedMessage)
    cy.checkUpdatedData(generalTexts.spaceName)
})

//test-8
Given('I open the workspace settings page', () => {
    leftNavPage.openWorkspacePage()
    workspacePage.openSettingsTab()
    cy.clickEditIconOnImage()
})
When('I upload an image of type {string} and updating a workspace', (imageType) => {
    cy.uploadImage(imageType)
    cy.clickCreateUploadBtn()
})
Then('I should see {string} message with image type {string}', (expectedMessage, imageType) => {
    if (expectedMessage === 'no') {
        cy.clickSaveBtn()
        cy.checkNotificationMessage(generalTexts.spaceUpdatedMessage)
        cy.checkTheUpdatedImage(imageType)
    } else {
        cy.verifyErrorMessage(expectedMessage)
    }
})
