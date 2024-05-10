Feature: Authentication

  @smoke
  Scenario: User should sign-in successfully
    Given I signing in with valid credentials
    Then I see the general page and left nav menu

  @regression
  Scenario: User should not sign-in and see the validation displayed
    Given I signing in with invalid credentials
    Then I see the validation message displayed

  @regression
  Scenario: User should see the invalid email validation
    Given I signing in with invalid email
    Then I see the invalid email validation message displayed

  @regression
  Scenario: User should see empty input validation
    Given I signing in with empty email and password
    Then I see the validation messages are displayed under every field