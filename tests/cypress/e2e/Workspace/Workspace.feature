Feature: Workspace page

    @smoke
    Scenario: Create a new Workspace
        Given I create a Organization
        When I click the add new Workspace button
        When I feel in the required fields and click add workspace button
        Then I see the Workspace created and added in the list of the organization page

    @regression
    Scenario: Submit the form without filling in the required fields
        Given I open the Workspace creation form
        When I click the create button without filling in required fields
        Then I see the validation message is displayed under the required fields

    @regression
    Scenario: Fill required fields with less than 3 chars and submit the form
        Given I open the Workspace creation form to validate
        When I filling in required fields with less than 3 chars and click the create button
        Then I see the 3 chars validation message is displayed under the required fields

    @regression
    Scenario: Cancel the submitting of the form
        Given I open the Workspace creation form to cancel
        When I click the cancel button on the pop-up
        Then I see the cancel button close the pop-up successfully

    @regression
    Scenario: Clcik the cross icon to close the Workspace creation pop-up
        Given I open the Workspace creation form to close
        When  I click the cross icon on the pop-up
        Then I see the cross icon closed the pop-up successfully

    @regression
    Scenario Outline: I want to upload multiple types of images
        Given I open the workspace creation page
        When I upload an image of type "<imageType>" and creating a workspace
        Then I should see "<expectedMessage>" message
        Examples:
            | imageType | expectedMessage                  |
            | png       | no                               |
            | jpg       | no                               |
            | gif       | Upload failed, please try again. |
            | jpeg      | Upload failed, please try again. |
            | mp4       | Upload failed, please try again. |
            | svg       | Upload failed, please try again. |

    @smoke
    Scenario: User should be able to update workspace data on workspace settings page
        Given I open the workspace settings page and update the data
        Then I see my changes have been saved successfully

    @regression
    Scenario Outline: I want to upload multiple types of images on the workspace settigs page
        Given I open the workspace settings page
        When I upload an image of type "<imageType>" and updating a workspace
        Then I should see "<expectedMessage>" message with image type "<imageType>"
        Examples:
            | imageType | expectedMessage                  |
            | png       | no                               |
            | jpg       | no                               |
            | gif       | Upload failed, please try again. |
            | jpeg      | Upload failed, please try again. |
            | mp4       | Upload failed, please try again. |
            | svg       | Upload failed, please try again. |