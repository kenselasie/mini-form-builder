describe("Form Builder", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/my-forms");
  });

  it("should allow changing form title", () => {
    const newTitle = "My Test Form";
    cy.get('[data-testid="form-title-input"]')
      .clear()
      .type(newTitle)
      .should("have.value", newTitle);
  });

  it("should have initial fields", () => {
    cy.get('[data-testid="field-container-1"]').should("exist");
    cy.get('[data-testid="field-container-2"]').should("exist");
  });

  it("should add new field using the Add New Field button", () => {
    cy.get('[data-testid="add-field-button"]').click();
    cy.contains("New Field").should("exist");
  });

  it("should add field using search", () => {
    cy.get('[data-testid="field-search-input"]').type("Radio button");
    cy.get('[data-testid="search-results"]').contains("Radio button").click();
    cy.get("input[type='radio']").should("exist");
  });

  it("should modify field type using dropdown menu", () => {
    cy.get('[data-testid="field-menu-1"]').click();
    cy.get('[data-testid="field-type-text-1"]').click();
    cy.get('[data-testid="field-input-1"]').should("exist");
  });

  // it("should allow editing field labels", () => {
  //   const newLabel = "Updated Field";
  //   cy.get('[data-testid="field-label-1"]').clear().type(newLabel);
  //   cy.contains(newLabel).should("exist");
  // });

  it("should delete a field", () => {
    cy.get('[data-testid="field-container-1"]').should("exist");
    cy.get('[data-testid="field-menu-1"]').click();
    cy.get('[data-testid="field-delete-1"]').click();
    cy.get('[data-testid="field-container-1"]').should("not.exist");
  });

  it("should filter fields in search", () => {
    cy.get('[data-testid="field-search-input"]').type("switch");
    cy.get('[data-testid="search-result-switch"]').should("be.visible");
    cy.get('[data-testid="search-result-text"]').should("not.exist");
  });
});
