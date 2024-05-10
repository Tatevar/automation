import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import LeftNavPage from '../../support/page-objects/LeftNavPage'
import SignInPage from '../../support/page-objects/SignInPage'

const signInPage = new SignInPage()
const leftNavPage = new LeftNavPage()

beforeEach(() => {
    cy.login()
    signInPage.navigate()
})

Given('I open the account menu and click the sign out button', () => {
    leftNavPage.signOutTheUser()
})
Then('I see the log in screen and the access token is not stored', () => {
    cy.checkAccessTokenIsNotStored()
})
