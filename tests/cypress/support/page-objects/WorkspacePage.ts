const WorkspaceElements = {
    workspaceSwitcherIcon: 'button.buildhero-8b8c5c',
    workspaceImage: '.buildhero-Group-root > .buildhero-Avatar-root',
    workspaceTabs: '.buildhero-UnstyledButton-root.buildhero-Tabs-tab.buildhero-u7xobb',
}
class WorkspacePage {
    clickWorkspaceSwitcher() {
        cy.get(WorkspaceElements.workspaceSwitcherIcon).eq(1).click()
    }
    workspaceImageCheck() {
        cy.get(WorkspaceElements.workspaceImage).eq(1).should('be.visible')
    }
    openSettingsTab() {
        cy.get(WorkspaceElements.workspaceTabs).eq(1).click()
    }
}
export default WorkspacePage
