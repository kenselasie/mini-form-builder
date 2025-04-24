export {};

declare global {
  interface Window {
    onFormDataChange: Cypress.Agent<sinon.SinonSpy>;
  }
}

describe("Customisation Panel", () => {
  beforeEach(() => {
    // Create a spy for onFormDataChange
    cy.window().then((win) => {
      win.onFormDataChange = cy.spy().as("onFormDataChange");
    });
    cy.visit("http://localhost:3000/my-forms");
  });

  it("should render the customisation panel", () => {
    cy.get('[data-testid="customisation-panel"]').should("exist");
  });

  it("should change background color when selecting different colors", () => {
    cy.get('[data-testid="background-color-group"]').should("exist");
    cy.get('[data-testid="color-white"]').click();
    cy.get('[data-testid="color-white"]').should("have.class", "border-black");
  });

  it("should change font family when selecting different options", () => {
    cy.get('[data-testid="font-family-select"]').click();
    cy.get('[role="listbox"]').should("be.visible");
    cy.get('[role="option"]').contains("Arial").click();
    cy.get('[data-testid="font-family-select"]').should("contain", "Arial");
  });

  it("should toggle form labels", () => {
    cy.get('[data-testid="form-labels-switch"]').click();
    cy.get('[data-testid="form-labels-switch"]').should(
      "have.attr",
      "data-state",
      "unchecked"
    );

    // Toggle back on
    cy.get('[data-testid="form-labels-switch"]').click();
    cy.get('[data-testid="form-labels-switch"]').should(
      "have.attr",
      "data-state",
      "checked"
    );
  });
});
