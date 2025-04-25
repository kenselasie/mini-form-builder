"use client";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { ValidationControls } from "@/components/ui/validation-controls";
import { Field, ValidationRules } from "@/types/form-builder-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    { label: "Text area", type: "textarea" },
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
      field.id === id
        ? {
            ...field,
            [type]: value,
            ...((value === "dropdown" || value === "radio") && !field.options
              ? {
                  options: [
                    { id: Date.now(), label: "Option 1", value: "option1" },
                  ],
                }
              : {}),
          }
        : field
    );
    setFields(newFields);
    onFieldsChange?.(newFields);
  };

  const handleValidationChange = (
    id: number,
    validationRules: Partial<ValidationRules>
  ) => {
    const newFields = fields.map((field) =>
      field.id === id
        ? {
            ...field,
            validation: {
              ...field.validation,
              ...validationRules,
            },
          }
        : field
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

  const handleOptionChange = (
    fieldId: number,
    optionId: number,
    value: string,
    type: "label" | "value" = "label"
  ) => {
    const newFields = fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options?.map((opt) =>
              opt.id === optionId ? { ...opt, [type]: value } : opt
            ),
          }
        : field
    );
    setFields(newFields);
    onFieldsChange?.(newFields);
  };

  const handleAddOption = (fieldId: number) => {
    const newFields = fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            options: [
              ...(field.options || []),
              {
                id: Date.now(),
                label: `Option ${(field.options?.length || 0) + 1}`,
                value: `option${(field.options?.length || 0) + 1}`,
              },
            ],
          }
        : field
    );
    setFields(newFields);
    onFieldsChange?.(newFields);
  };

  const handleDeleteOption = (fieldId: number, optionId: number) => {
    const newFields = fields.map((field) =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options?.filter((opt) => opt.id !== optionId),
          }
        : field
    );
    setFields(newFields);
    onFieldsChange?.(newFields);
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
            className="w-full bg-transparent outline-none focus:ring-0 focus:outline-none focus:border-none active:outline-none active:ring-0 text-xl font-bold placeholder:text-xl placeholder:font-bold"
            value={formTitle}
            onChange={handleTitleChange}
          />
        </div>
      </div>
      {fields.map((field) => (
        <div
          key={field.id}
          data-testid={`field-container-${field.id}`}
          className="mb-4 flex justify-center gap-2"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <input
                data-testid={`field-label-${field.id}`}
                className="text-sm font-medium flex-1 bg-transparent border-none outline-none focus:ring-0 focus:outline-none focus:border-none active:outline-none active:ring-0"
                value={field.label}
                onChange={(e) =>
                  handleFieldChange(field.id, e.target.value, "label")
                }
                placeholder="Field Label"
              />
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    data-testid={`field-menu-${field.id}`}
                    className="w-9 h-9 flex items-center justify-center border border-gray-500 rounded"
                  >
                    <MoreVertical size={16} />
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
                      onClick={() => handleFieldChange(field.id, "textarea")}
                    >
                      Text area
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

            <div className="mb-2">
              {field.type === "text" && (
                <Input
                  data-testid={`field-input-${field.id}`}
                  placeholder={field.label}
                  className="border-2 border-gray-500 rounded"
                  value={field.value}
                  disabled
                />
              )}
              {field.type === "textarea" && (
                <Textarea
                  data-testid={`field-textarea-${field.id}`}
                  placeholder={field.label}
                  className="border-2 border-gray-500 min-h-[100px] resize-y"
                  value={field.value}
                  disabled
                />
              )}
              {field.type === "button" && (
                <Button disabled className="w-full">
                  {field.label}
                </Button>
              )}
              {field.type === "dropdown" && (
                <>
                  <Select>
                    <SelectTrigger
                      data-testid={`field-dropdown-${field.id}`}
                      className="w-full border-gray-400"
                    >
                      <SelectValue placeholder={field.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem
                          key={option.id}
                          value={option.value}
                          data-testid={`dropdown-option-${field.id}-${option.id}`}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div
                    data-testid={`field-options-${field.id}`}
                    className="mt-2 space-y-2"
                  >
                    {field.options?.map((option) => (
                      <div
                        key={option.id}
                        data-testid={`option-container-${field.id}-${option.id}`}
                        className="flex items-center gap-2"
                      >
                        <Input
                          data-testid={`option-input-${field.id}-${option.id}`}
                          placeholder="Option Label"
                          value={option.label}
                          onChange={(e) =>
                            handleOptionChange(
                              field.id,
                              option.id,
                              e.target.value
                            )
                          }
                          className="flex-1"
                        />
                        <Input
                          placeholder="Value"
                          value={option.value}
                          onChange={(e) =>
                            handleOptionChange(
                              field.id,
                              option.id,
                              e.target.value,
                              "value"
                            )
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDeleteOption(field.id, option.id)
                          }
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      data-testid={`add-option-button-${field.id}`}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOption(field.id)}
                      className="w-full mt-2"
                    >
                      Add Option
                    </Button>
                  </div>
                </>
              )}
              {field.type === "radio" && (
                <RadioGroup data-testid={`field-radio-${field.id}`}>
                  {field.options?.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={option.value} disabled />
                      <Label>{option.label}</Label>
                    </div>
                  ))}
                  <div className="mt-2 space-y-2">
                    {field.options?.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Input
                          data-testid={`option-label-${field.id}-${option.id}`}
                          placeholder="Option Label"
                          value={option.label}
                          onChange={(e) =>
                            handleOptionChange(
                              field.id,
                              option.id,
                              e.target.value,
                              "label"
                            )
                          }
                          className="flex-1"
                        />
                        <Input
                          placeholder="Value"
                          value={option.value}
                          onChange={(e) =>
                            handleOptionChange(
                              field.id,
                              option.id,
                              e.target.value,
                              "value"
                            )
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDeleteOption(field.id, option.id)
                          }
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      data-testid={`add-option-button-${field.id}`}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOption(field.id)}
                      className="w-full mt-2"
                    >
                      Add Option
                    </Button>
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

            {field.type !== "button" && (
              <Accordion
                type="single"
                collapsible
                className="border rounded-md"
              >
                <AccordionItem value="validation">
                  <AccordionTrigger className="px-3 py-2 text-sm">
                    Validation Rules
                  </AccordionTrigger>
                  <AccordionContent className="px-3 py-2">
                    <ValidationControls
                      field={field}
                      onValidationChange={(rules) =>
                        handleValidationChange(field.id, rules)
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
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
      <div className="mb-4 border-2 border-gray-300 p-2 rounded-md">
        <div className="relative mb-2">
          <Input
            data-testid="field-search-input"
            placeholder="Search..."
            className="border-2 border-gray-400 rounded"
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
