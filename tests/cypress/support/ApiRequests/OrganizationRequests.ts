import generalTexts from '../generalTexts'

class OrganizationRequests {
    deleteTestOrg() {
        const organizationName = generalTexts.organizationName
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

                    if (matchingOrganizations.length > 0) {
                        // Extract and log the IDs of matching organizations
                        const organizationIds = matchingOrganizations.map((org) => org._id)
                        cy.log('Organization IDs:', organizationIds)

                        // Iterate through organization IDs and send DELETE requests
                        organizationIds.forEach((orgId) => {
                            cy.request({
                                method: 'DELETE',
                                url: `${Cypress.env('testEnv')}/organizations/${orgId}`,
                                headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }).then((deleteResponse) => {
                                // Handle the delete response as needed
                                expect(deleteResponse.status).to.equal(204)
                                cy.log(`Organization ${orgId} deleted successfully.`)
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

export default OrganizationRequests
