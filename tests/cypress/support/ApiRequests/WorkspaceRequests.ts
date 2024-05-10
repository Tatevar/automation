import generalTexts from '../generalTexts'

class OrganizationRequests {
    deleteTestWorkspace() {
        const organizationName = generalTexts.organizationName
        const workspaceName = generalTexts.workspaceName
        let accessToken
        cy.request({
            method: 'POST',
            url: Cypress.env('testEnv') + '/auth/login',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: {
                email: 'tatevik@scal.io',
                password: 'Scalio.55',
            },
        }).then((response) => {
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(200)
            cy.log(response.body.tokens.accessToken)
            accessToken = response.body.tokens.accessToken
            cy.request({
                method: 'GET',
                url: Cypress.env('testEnv') + '/organizations',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            }).then((response) => {
                if (response.body.data && Array.isArray(response.body.data)) {
                    // Find organizations with the matching name
                    const matchingOrganizations = response.body.data.filter((org) => org.name === organizationName)
                    const matchingworkspaces = response.body.data.filter((space) => space.name === workspaceName)

                    if (matchingOrganizations.length > 0) {
                        // Extract and log the IDs of matching organizations
                        const organizationIds = matchingOrganizations.map((org) => org._id)
                        cy.log('Organization IDs:', organizationIds)

                        organizationIds.forEach((orgId) => {
                            cy.request({
                                method: 'get',
                                url: `${Cypress.env('testEnv')}/organizations/${orgId}/workspaces`,
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }).then((response) => {
                                if (response.body.data && Array.isArray(response.body.data)) {
                                    // Find organizations with the matching name
                                    const matchingworkspaces = response.body.data.filter(
                                        (space) => space.name === workspaceName
                                    )
                                    if (matchingworkspaces.length > 0) {
                                        // Extract and log the IDs of matching organizations
                                        const workspaceIds = matchingworkspaces.map((space) => space._id)
                                        cy.log('Workspace IDs:', workspaceIds)

                                        workspaceIds.forEach((spaceId) => {
                                            cy.request({
                                                method: 'DELETE',
                                                url: `${Cypress.env(
                                                    'testEnv'
                                                )}/organizations/${orgId}/workspaces/${spaceId}`,
                                                headers: {
                                                    Authorization: `Bearer ${accessToken}`,
                                                },
                                            }).then((deleteResponse) => {
                                                // Handle the delete response as needed
                                                expect(deleteResponse.status).to.equal(204)
                                                cy.log(`Workspace ${spaceId} deleted successfully.`)
                                            })
                                        })
                                    } else {
                                        cy.log(`No organizations with name "${organizationName}" found.`)
                                    }
                                } else {
                                    cy.log('Unexpected response format or missing data.')
                                }
                            })
                        })
                    }
                }
            })
        })
    }
}

export default OrganizationRequests
