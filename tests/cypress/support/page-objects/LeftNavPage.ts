const LeftNavElements = {
    leftNav: '.buildhero-17ee474',
    workspaceOnLeftMenu: 'div.buildhero-vvns8z > div.buildhero-68ryc',
    workspacePage: '.buildhero-Container-root.buildhero-1jp73x6',
    accountMenu: '.buildhero-1xp5lya',
    accountSettings: ':nth-child(3) > .buildhero-1rnkhfs',
    manageOrgs: 'button.buildhero-Menu-item.buildhero-gx23lt',
    signOutBtn: '.buildhero-13jkq52',
    orgSwitcherIcon: '.buildhero-8b8c5c',
    orgOnLeftMenu: 'div.buildhero-vvns8z > div.buildhero-1nf088z',
    websiteOnLeftMenu: '.buildhero-daj23y > :nth-child(2) > .buildhero-UnstyledButton-root > .buildhero-Group-root',
}
class leftNavPage {
    leftNavMenuDisplayed() {
        cy.get(LeftNavElements.leftNav).should('be.visible')
    }
    openWorkspacePage() {
        cy.get(LeftNavElements.workspaceOnLeftMenu).click()
        cy.get(LeftNavElements.workspacePage).should('be.visible')
    }
    openAccountSettingsPage() {
        cy.get(LeftNavElements.accountMenu).click()
        cy.get(LeftNavElements.accountSettings).click()
    }
    openOrgSettingsPage() {
        cy.get(LeftNavElements.orgSwitcherIcon).eq(0).click()
        cy.get(LeftNavElements.manageOrgs).eq(3).click()
    }
    signOutTheUser() {
        cy.get(LeftNavElements.accountMenu).click()
        cy.get(LeftNavElements.signOutBtn).click()
    }
    openOrganizationPage() {
        cy.get(LeftNavElements.orgOnLeftMenu).click()
    }
    openWebsitePageFromLeftMenu() {
        cy.get(LeftNavElements.websiteOnLeftMenu).click()
    }
}
export default leftNavPage
