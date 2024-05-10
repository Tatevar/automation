import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

import generalTexts from "../../support/generalTexts";
import LeftNavPage from "../../support/page-objects/LeftNavPage";
import SignInPage from "../../support/page-objects/SignInPage";

const signInPage = new SignInPage();
const leftNavPage = new LeftNavPage();

//Test-1
Given("I signing in with valid credentials", () => {
  cy.login();
  signInPage.navigate();
});
Then("I see the general page and left nav menu", () => {
  leftNavPage.leftNavMenuDisplayed();
});
//Test-2
Given("I signing in with invalid credentials", () => {
  signInPage.navigate();
  signInPage.signIn("invalid@mm.com", "scalio55");
});
Then("I see the validation message displayed", () => {
  cy.InvalidCredentialsMsgIsDisplayed(generalTexts.invalidCredentialsMsg);
});

//Test-3
Given("I signing in with invalid email", () => {
  signInPage.navigate();
  signInPage.signIn("invalid.com", "scalio55");
});
Then("I see the invalid email validation message displayed", () => {
  cy.InvalidEmailMsgIsDisplayed(generalTexts.invalidEmailMsg);
});
//Test-4
Given("I signing in with empty email and password", () => {
  signInPage.navigate();
  signInPage.clickSignInBtn();
});
Then("I see the validation messages are displayed under every field", () => {
  cy.InvalidEmailMsgIsDisplayed(generalTexts.emptyEmailMsg);
  cy.InvalidCredentialsMsgIsDisplayed(generalTexts.emptyPasswordMsg);
});
