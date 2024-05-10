import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import AccountSettingsPage from '../../support/page-objects/AccountSettingsPage'
import LeftNavPage from '../../support/page-objects/LeftNavPage'
import SignInPage from '../../support/page-objects/SignInPage'
import generalTexts from '../../support/generalTexts'

const signInPage = new SignInPage()
const leftNavPage = new LeftNavPage()
const accountSettingsPage = new AccountSettingsPage()

beforeEach(() => {
    cy.login()
    signInPage.navigate()
})
//test-1
Given('I open the account settings page', () => {
    leftNavPage.openAccountSettingsPage()
})
Then('I can see the account settings page', () => {
    accountSettingsPage.accountPageOpened()
})

//test-2
Given('I open the account settings page and update the user name', () => {
    leftNavPage.openAccountSettingsPage()
    accountSettingsPage.updateUserName(generalTexts.accountName)
    cy.clickSaveBtn()
})
Then('I check the name has been saved successfully', () => {
    cy.checkNotificationMessage(generalTexts.accountUpdatedMessage)
    accountSettingsPage.checkTheUpdatedName(generalTexts.accountName)
})

//test-3
Given('I open the account settings page and update the user profile picture', () => {
    leftNavPage.openAccountSettingsPage()
    cy.clickEditIconOnImage()
})
When('I upload an image of type {string} and updating the account picture', (imageType) => {
    cy.uploadImage(imageType)
    cy.clickCreateUploadBtn()
})
Then('I should see {string} message with image type {string}', (expectedMessage, imageType) => {
    if (expectedMessage === 'no') {
        cy.clickSaveBtn()
        cy.checkNotificationMessage(generalTexts.accountUpdatedMessage)
        cy.checkTheUpdatedImage(imageType)
    } else {
        cy.verifyErrorMessage(expectedMessage)
    }
})
