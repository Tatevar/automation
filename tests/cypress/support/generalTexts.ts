//for future implementation
const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const userName = `awesome user-${id}`
const orgName = `awesome organization-${id}`
const spaceName = `awesome workspace-${id}`
const siteName = `awesome website-${id}`
const pagesName = `awesome page-${id}`

const generalTexts = {
    invalidCredentialsMsg: 'Invalid email address or password.',
    invalidEmailMsg: 'Please enter a valid email address.',
    emptyEmailMsg: 'Please enter your email address.',
    emptyPasswordMsg: 'Please enter your password.',
    organizationName: 'Automation Organization',
    workspaceName: 'Automation Workspace',
    orgBlankInputValidation: 'Please enter the organization name.',
    orgCharLengthValidation: 'The organization name must be at least 3 characters long.',
    workspaceBlankInputValidation: 'Please enter the workspace name.',
    workspaceCharLengthValidation: 'The workspace name must be at least 3 characters long.',
    accountName: userName,
    accountUpdatedMessage: 'Success! Your account information has been updated.',
    orgName: orgName,
    spaceName: spaceName,
    orgUpdatedMessage: 'Success! Your changes to the organization have been saved.',
    spaceUpdatedMessage: 'Success! Your changes to the workspace have been saved.',
    orgCreationMessage: 'New Organization & Workspace have been created.',
    spaceCreationMessage: 'New Workspace has been created.',
    siteName: siteName,
    pageUpdatedMessage: 'Success! Your changes to the page have been saved.',
    siteUpdatedMessage: 'Success! Your changes to the site have been saved.',
    pagesName: pagesName,
}
export default generalTexts
