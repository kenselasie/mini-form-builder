import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormBuilder from "@/components/features/form-builder";

describe("FormBuilder", () => {
  beforeEach(() => {
    cleanup();
    render(<FormBuilder />);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render form builder component", async () => {
    const formBuilder = screen.getByTestId("form-builder-container");
    await expect(formBuilder).toBeInTheDocument();
  });

  it("should have an add field button", () => {
    expect(screen.getByTestId("add-field-button")).toBeInTheDocument();
  });

  it("should show form title input", () => {
    const titleInput = screen.getByTestId("form-title-input");
    expect(titleInput).toBeInTheDocument();
  });

  describe("Field Management", () => {
    it("should add a new field when clicking add button", () => {
      const addButton = screen.getByTestId("add-field-button");
      const initialFieldCount =
        screen.getAllByTestId(/^field-container-/).length;

      fireEvent.click(addButton);

      const newFieldCount = screen.getAllByTestId(/^field-container-/).length;
      expect(newFieldCount).toBe(initialFieldCount + 1);
    });
  });

  describe("Field Type Changes", () => {
    it("should change field type to text input", async () => {
      const user = userEvent.setup();

      // Open the dropdown menu
      await user.click(screen.getByTestId("field-menu-1"));

      // Wait for dropdown content and click text option
      await waitFor(() => {
        const textOption = screen.getByTestId("field-type-text-1");
        expect(textOption).toBeInTheDocument();
      });

      await user.click(screen.getByTestId("field-type-text-1"));

      // Verify text input is present
      await waitFor(() => {
        expect(screen.getByTestId("field-input-1")).toBeInTheDocument();
      });
    });
  });

  describe("Search Functionality", () => {
    it("should filter field options based on search input", async () => {
      const searchInput = screen.getByTestId("field-search-input");
      fireEvent.change(searchInput, { target: { value: "radio" } });

      const searchResults = await screen.findByTestId("search-results");
      expect(searchResults).toHaveTextContent("Radio button");
      expect(searchResults).not.toHaveTextContent("Text field");
    });

    it("should add field when selecting from search results", async () => {
      const searchInput = screen.getByTestId("field-search-input");
      fireEvent.change(searchInput, { target: { value: "radio" } });

      // Use await findByTestId to handle async updates
      const radioOption = await screen.findByTestId("search-result-radio");
      fireEvent.click(radioOption);

      // Wait for the new field to be added
      const newField = await screen.findByText("Radio button");
      expect(newField).toBeInTheDocument();
    });
  });

  describe("Form Title", () => {
    it("should update form title when typing", () => {
      const titleInput = screen.getByTestId("form-title-input");
      const newTitle = "My Test Form";

      fireEvent.change(titleInput, { target: { value: newTitle } });

      expect(titleInput).toHaveValue(newTitle);
    });
  });

  describe("Field Labels", () => {
    it("should update field label when typing", () => {
      const firstFieldLabel = screen.getByTestId("field-label-1");
      const newLabel = "Updated Label";

      fireEvent.change(firstFieldLabel, { target: { value: newLabel } });

      expect(firstFieldLabel).toHaveValue(newLabel);
    });
  });

  describe("Props", () => {
    beforeEach(() => {
      cleanup();
    });

    it("should render with custom initial title", async () => {
      const { getByTestId } = render(
        <FormBuilder initialTitle="Custom Form" />
      );
      const titleInput = getByTestId("form-title-input");
      expect(titleInput).toHaveValue("Custom Form");
    });

    it("should render with custom initial fields", async () => {
      const customFields = [
        { id: 1, label: "Custom Field", type: "text", value: "" },
      ];
      const { getByTestId } = render(
        <FormBuilder initialFields={customFields} />
      );
      const fieldLabel = getByTestId("field-label-1");
      expect(fieldLabel).toHaveValue("Custom Field");
    });
  });
});
