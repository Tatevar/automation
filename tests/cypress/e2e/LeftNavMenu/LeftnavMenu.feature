Feature: Sign out the user

    @smoke
    Scenario: User should be signed-out from his account successfully
        Given I open the account menu and click the sign out button
        Then I see the log in screen and the access token is not stored
