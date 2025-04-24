"use client";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MoreVertical, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/types/form-builder-types";

interface FormBuilderProps {
  initialTitle?: string;
  initialFields?: Field[];
  onTitleChange?: (title: string) => void;
  onFieldsChange?: (fields: Field[]) => void;
}

const FormBuilder = ({
  initialTitle = "Untitled Form",
  initialFields = [
    { id: 1, label: "First Name", type: "text", value: "" },
    { id: 2, label: "Last Name", type: "text", value: "" },
  ],
  onTitleChange,
  onFieldsChange,
}: FormBuilderProps) => {
  const [formTitle, setFormTitle] = React.useState(initialTitle);
  const [fields, setFields] = React.useState(initialFields);

  const [searchField, setSearchField] = React.useState("");

  const fieldOptions = [
    { label: "Text field", type: "text" },
    { label: "Button", type: "button" },
    { label: "Dropdown", type: "dropdown" },
    { label: "Radio button", type: "radio" },
    { label: "Checkbox", type: "checkbox" },
    { label: "Switch option", type: "switch" },
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  const handleFieldChange = (
    id: number,
    value: string,
    type: "type" | "label" = "type"
  ) => {
    const newFields = fields.map((field) =>
      field.id === id ? { ...field, [type]: value } : field
    );
    setFields(newFields);
    onFieldsChange?.(newFields);
  };

  const handleAddField = () => {
    const newFields = [
      ...fields,
      { id: Date.now(), label: "New Field", type: "text", value: "" },
    ];
    setFields(newFields);
    onFieldsChange?.(newFields);
  };

  const handleSearchSelect = (type: string) => {
    const selectedOption = fieldOptions.find((option) => option.type === type);
    if (selectedOption) {
      const newFields = [
        ...fields,
        {
          id: Date.now(),
          label: selectedOption.label,
          type: selectedOption.type,
          value: "",
        },
      ];
      setFields(newFields);
      onFieldsChange?.(newFields);
    }
    setSearchField("");
  };

  return (
    <div
      data-testid="form-builder-container"
      className="border p-10 rounded-lg bg-white"
    >
      <div className="mb-4 w-full">
        <div className="w-full border-b border-b-gray-900">
          <input
            data-testid="form-title-input"
            placeholder="Form Title"
            className="w-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none focus:border-none active:outline-none active:ring-0 text-xl font-bold placeholder:text-xl placeholder:font-bold"
            value={formTitle}
            onChange={handleTitleChange}
          />
        </div>
      </div>
      {fields.map((field) => (
        <div
          key={field.id}
          data-testid={`field-container-${field.id}`}
          className="mb-4 flex justify-center items-center gap-2"
        >
          <div className="flex-1">
            <input
              data-testid={`field-label-${field.id}`}
              className="block text-sm font-medium mb-1 w-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none focus:border-none active:outline-none active:ring-0"
              value={field.label}
              onChange={(e) =>
                handleFieldChange(field.id, e.target.value, "label")
              }
              placeholder="Field Label"
            />
            {field.type === "text" && (
              <Input
                data-testid={`field-input-${field.id}`}
                placeholder={field.label}
                value={field.value}
                disabled
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
              />
            )}
            {field.type === "button" && (
              <Button disabled className="w-full">
                {field.label}
              </Button>
            )}
            {field.type === "dropdown" && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={field.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            )}
            {field.type === "radio" && (
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    data-testid={`radio-option-1-${field.id}`}
                    value="option1"
                    id={`radio-${field.id}-1`}
                  />
                  <Label htmlFor={`radio-${field.id}-1`}>Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    data-testid={`radio-option-2-${field.id}`}
                    value="option2"
                    id={`radio-${field.id}-2`}
                  />
                  <Label htmlFor={`radio-${field.id}-2`}>Option 2</Label>
                </div>
              </RadioGroup>
            )}
            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`checkbox-${field.id}`}
                  className="h-4 w-4"
                />
                <Label htmlFor={`checkbox-${field.id}`}>{field.label}</Label>
              </div>
            )}
            {field.type === "switch" && (
              <div className="flex items-center space-x-2">
                <Switch />
                <Label>{field.label}</Label>
              </div>
            )}
          </div>
          <div className="mt-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                data-testid={`field-menu-${field.id}`}
                className="w-10 h-10 flex items-center justify-center"
              >
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                data-testid={`field-menu-content-${field.id}`}
              >
                <DropdownMenuItem
                  data-testid={`field-type-text-${field.id}`}
                  onClick={() => handleFieldChange(field.id, "text")}
                >
                  Text field
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFieldChange(field.id, "button")}
                >
                  Button
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFieldChange(field.id, "dropdown")}
                >
                  Dropdown
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFieldChange(field.id, "radio")}
                >
                  Radio button
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFieldChange(field.id, "checkbox")}
                >
                  Checkbox
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFieldChange(field.id, "switch")}
                >
                  Switch option
                </DropdownMenuItem>
                <DropdownMenuItem
                  data-testid={`field-delete-${field.id}`}
                  onClick={() =>
                    setFields((prev) =>
                      prev.filter(
                        (existingField) => existingField.id !== field.id
                      )
                    )
                  }
                  className="text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      <div className="mb-4">
        <Button
          data-testid="add-field-button"
          variant="outline"
          className="border-dashed border-2 border-blue-300 text-blue-400"
          onClick={handleAddField}
        >
          + Add New Field
        </Button>
      </div>
      <div className="mb-4 border-1 p-2 rounded-md">
        <div className="relative mb-2">
          <Input
            data-testid="field-search-input"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div
          data-testid="search-results"
          className="rounded-md max-h-40 overflow-y-auto"
        >
          {fieldOptions
            .filter((option) =>
              option.label.toLowerCase().includes(searchField.toLowerCase())
            )
            .map((option) => (
              <div
                key={option.type}
                data-testid={`search-result-${option.type}`}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchSelect(option.type)}
              >
                {option.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
