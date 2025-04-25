describe("Form Builder", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should create a form with different field types", () => {
    // Test form title
    cy.get('[data-testid="form-title-input"]')
      .clear()
      .type("Test Form")
      .should("have.value", "Test Form");

    // Add a text field
    cy.get('[data-testid="add-field-button"]').click();
    cy.get('[data-testid="field-container-1"]').within(() => {
      cy.get('[data-testid="field-label-1"]').clear().type("Full Name");
      cy.get('[data-testid="field-menu-1"]').click();
    });
    cy.get('[data-testid="field-type-text-1"]').click();
    cy.get('[data-testid="field-input-1"]').should("exist");

    // Add a text area
    cy.get('[data-testid="field-search-input"]').clear().type("text area");

    // Verify all added fields exist
    cy.get('[data-testid="form-builder-container"]').within(() => {
      cy.get('[data-testid="field-input-1"]').should("exist"); // Text input
    });
  });

  it("should handle field validation rules and render form", () => {
    // Add a text field with validation
    cy.get('[data-testid="add-field-button"]').click();
    cy.get('[data-testid="field-container-1"]').within(() => {
      cy.get('[data-testid="field-label-1"]')
        .clear()
        .type("Email")
        .should("have.value", "Email");
    });

    // Open validation accordion and set rules
    cy.contains("Validation Rules").click();
    cy.get('[data-testid="validation-required-1"]')
      .should("exist")
      .click({ force: true });

    // Click publish and verify render
    cy.contains("button", "Publish Form").should("exist").click();

    // Verify rendered form in preview
    cy.get('[data-testid="preview-form"]')
      .should("exist")
      .within(() => {
        // Check for field existence
        cy.get('input[placeholder="Email"]').should("exist");

        // Submit empty form to trigger validation
        cy.get('button[type="submit"]').click();

        // Check validation message
        cy.get(".text-red-500").should("be.visible");
      });
  });
});
