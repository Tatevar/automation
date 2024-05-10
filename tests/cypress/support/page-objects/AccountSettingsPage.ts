const AccountElements = {
    accountPage: '.buildhero-Text-root.buildhero-mvj3mp',
    nameField: '#name',
    image: '.buildhero-Avatar-root img.buildhero-Avatar-image',
}
class AccountSettingsPage {
    accountPageOpened() {
        cy.get(AccountElements.accountPage).should('be.visible')
    }
    updateUserName(text: string) {
        cy.get(AccountElements.nameField).clear().type(text)
    }
    checkTheUpdatedName(text: string) {
        cy.get(AccountElements.nameField).should('have.value', text)
    }
}
export default AccountSettingsPage
