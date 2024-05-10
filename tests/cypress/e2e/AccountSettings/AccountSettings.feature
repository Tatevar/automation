Feature: Account settings page

    @smoke
    Scenario: User should be able to open the Account settings page
        Given I open the account settings page
        Then I can see the account settings page

    @smoke
    Scenario: User should be able to update username on the Account settings page
        Given I open the account settings page and update the user name
        Then I check the name has been saved successfully

    @regression
    Scenario Outline: I want to upload multiple types of images
        Given I open the account settings page and update the user profile picture
        When I upload an image of type "<imageType>" and updating the account picture
        Then I should see "<expectedMessage>" message with image type "<imageType>"
        Examples:
            | imageType | expectedMessage                  |
            | png       | no                               |
            | jpg       | no                               |
            | gif       | Upload failed, please try again. |
            | jpeg      | Upload failed, please try again. |
            | mp4       | Upload failed, please try again. |
            | svg       | Upload failed, please try again. |
