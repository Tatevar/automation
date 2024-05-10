// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
//<reference types='cypress' />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Custom command to login in the application.
         * @example cy.login('username', 'userPassword')
         */
        login(): Chainable<undefined>
        InvalidCredentialsMsgIsDisplayed(message: string): Chainable<undefined>
        InvalidEmailMsgIsDisplayed(message: string): Chainable<undefined>
        checkAccessToken(): Chainable<undefined>
        checkAccessTokenIsNotStored(): Chainable<undefined>
        clickCancelBtn(): Chainable<undefined>
        clickCrossBtn(): Chainable<undefined>
        validationMessageIsDisplayed(message: string): Chainable<undefined>
        checkTheWindowClosed(): Chainable<undefined>
        fillInFields(message: string): Chainable<undefined>
        clickCreateUploadBtn(): Chainable<undefined>
        uploadImage(imageType): Chainable<undefined>
        verifyErrorMessage(ExpectedMessage): Chainable<undefined>
        clickSaveBtn(): Chainable<undefined>
        checkNotificationMessage(message: string): Chainable<undefined>
        clickEditIconOnImage(): Chainable<undefined>
        clickTrashIconOnImage(): Chainable<undefined>
        checkTheUpdatedImage(imageType): Chainable<undefined>
        checkUpdatedData(text: string): Chainable<undefined>
        updateDataOnSiteSettingsPage(text: string): Chainable<undefined>
    }
}
