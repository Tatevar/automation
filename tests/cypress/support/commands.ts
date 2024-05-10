// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const CommandsElements = {
  email: '[name="email"]',
  password: '[name="password"]',
  signinBtn: "button[type=submit]",
  leftNav: "#root > div.m_89ab340.mantine-AppShell-root > nav",
  credentialsError: "#password-error",
  emailError: "#email-error",
  cancelBtn:
    ".buildhero-12fdmdc > .buildhero-UnstyledButton-root > .buildhero-1wpc1xj",
  organizationPageTitle: ".buildhero-1d6tksz > .word-break",
  createSpaceBtn: ".buildhero-1lwhfgh",
  orgPage: ".buildhero-Container-root",
  crossBtn: "button.buildhero-xzexs7",
  errorMsg: "#name-error",
  creationWindow:
    ".buildhero-Paper-root.buildhero-Modal-content.buildhero-Modal-content.buildhero-chy3l8",
  nameField: "#name",
  descField: "#description",
  createUploadBtn: ".buildhero-Button-root.buildhero-17i4eyq",
  uploadBtn: "input[type=file]",
  imageUploadFileMsg: ".buildhero-Text-root.buildhero-1of4r85",
  saveBtn: "div.buildhero-Grid-col.buildhero-1xs3cx4 > button",
  notificationMsg: ".notification > span",
  editTrashIconsOnImage: "span > .buildhero-UnstyledButton-root",
  image: ".buildhero-Avatar-root img.buildhero-Avatar-image",
  titleOnSiteSettings: "#title",
};
declare namespace Cypress {
  interface Chainable {
    getElementByTestId: typeof getElementByTestId;
  }
}

Cypress.Commands.add("getElementByTestId", getElementByTestId);
function getElementByTestId<Element extends Node = HTMLElement>(
  testId: string,
  options?: Parameters<typeof cy.get>[1]
) {
  return cy.get(`[data-testid=${testId}]`, options) as Cypress.Chainable<
    JQuery<Element>
  >;
}
Cypress.Commands.add("login", () => {
  cy.session("login", () => {
    cy.visit("/");
    cy.get(CommandsElements.email).type("tatevik@scal.io");
    cy.get(CommandsElements.password).type("Scalio.55");
    cy.get(CommandsElements.signinBtn).click();
    cy.get(CommandsElements.leftNav).should("be.visible");
    cy.wait(1000);
  });
});
Cypress.Commands.add("InvalidCredentialsMsgIsDisplayed", (message: string) => {
  cy.get(CommandsElements.credentialsError).contains(message);
});
Cypress.Commands.add("InvalidEmailMsgIsDisplayed", (message: string) => {
  cy.get(CommandsElements.emailError).contains(message);
});
Cypress.Commands.add("clickCancelBtn", () => {
  cy.get(CommandsElements.cancelBtn).click();
});
Cypress.Commands.add("clickCrossBtn", () => {
  cy.get(CommandsElements.crossBtn).click();
});
Cypress.Commands.add("validationMessageIsDisplayed", (message: string) => {
  cy.get(CommandsElements.errorMsg).contains(message);
});
Cypress.Commands.add("checkTheWindowClosed", () => {
  cy.get(CommandsElements.creationWindow).should("not.exist");
});
Cypress.Commands.add("clickCreateUploadBtn", () => {
  cy.get(CommandsElements.createUploadBtn).click();
});
Cypress.Commands.add("uploadImage", (imageType) => {
  const imagePath = `cypress/fixtures/images/picture.${imageType}`;
  cy.get(CommandsElements.uploadBtn).selectFile(imagePath, { force: true });
});
Cypress.Commands.add("verifyErrorMessage", (expectedMessage) => {
  cy.get(CommandsElements.imageUploadFileMsg).should(
    "contain",
    expectedMessage
  );
});
Cypress.Commands.add("fillInFields", (text: string) => {
  cy.get(CommandsElements.nameField).clear().type(text);
  cy.get(CommandsElements.descField).clear().type(text);
});
Cypress.Commands.add("updateDataOnSiteSettingsPage", (text: string) => {
  cy.get(CommandsElements.titleOnSiteSettings).clear().type(text);
  cy.get(CommandsElements.descField).clear().type(text);
});
Cypress.Commands.add("checkUpdatedData", (text: string) => {
  cy.get(CommandsElements.nameField).should("have.value", text);
  cy.get(CommandsElements.descField).should("have.value", text);
});
Cypress.Commands.add("checkAccessTokenIsNotStored", () => {
  cy.get(CommandsElements.signinBtn).should("be.visible");
  cy.window().then((win) => {
    const accessToken = win.localStorage.getItem("buildhero-access-token");
    const refreshToken = win.localStorage.getItem("buildhero-refresh-token");
    expect(accessToken).to.be.null;
    expect(refreshToken).to.be.null;
  });
});
Cypress.Commands.add("checkAccessToken", () => {
  cy.window().then((win) => {
    const accessToken = win.localStorage.getItem("buildhero-access-token");
    const refreshToken = win.localStorage.getItem("buildhero-refresh-token");
    if (accessToken) {
      cy.log("Access Token:", accessToken);
      cy.log("Refresh Token:", refreshToken);
    } else {
      cy.log("Access token not found in local storage.");
    }
  });
});
Cypress.Commands.add("clickSaveBtn", () => {
  cy.get(CommandsElements.saveBtn).click();
});
Cypress.Commands.add("checkNotificationMessage", (message: string) => {
  cy.get(CommandsElements.notificationMsg).contains(message);
});
Cypress.Commands.add("clickEditIconOnImage", () => {
  cy.get(CommandsElements.editTrashIconsOnImage).then(($elements) => {
    cy.get(CommandsElements.editTrashIconsOnImage).then(($elements) => {
      if ($elements.length === 1) {
        cy.wrap($elements).first().click();
      } else if ($elements.length >= 2) {
        cy.wrap($elements)
          .eq(1)
          .then((element) => {
            cy.wrap(element).click();
          });
      } else {
        cy.log("No matching elements found");
      }
    });
  });
});
Cypress.Commands.add("clickTrashIconOnImage", () => {
  cy.get(CommandsElements.editTrashIconsOnImage).then(($elements) => {
    if ($elements.length === 1) {
      cy.wrap($elements).first().click();
    } else if ($elements.length >= 2) {
      cy.wrap($elements)
        .eq(0)
        .then((element) => {
          cy.wrap(element).click();
        });
    } else {
      cy.log("No matching elements found");
    }
  });
});
Cypress.Commands.add("checkTheUpdatedImage", (imageType) => {
  cy.get(CommandsElements.image)
    .eq(2)
    .should("exist")
    .should("have.attr", "src")
    .then((src) => {
      expect(src).to.include(imageType);
    });
});
