"use client";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CustomisationPanelProps {
  onFormDataChange: (formData: {
    backgroundColor: string;
    fontFamily: string;
    formLabels: boolean;
  }) => void;
}

const CustomisationPanel = ({ onFormDataChange }: CustomisationPanelProps) => {
  const [formData, setFormData] = React.useState({
    backgroundColor: "green",
    fontFamily: "Roboto",
    formLabels: true,
  });

  React.useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  return (
    <div
      className="border p-9 rounded-lg bg-white max-h-fit"
      data-testid="customisation-panel"
    >
      <div className="mb-7">
        <label className="block text-md font-semibold mb-1">
          Background Color
        </label>
        <RadioGroup
          data-testid="background-color-group"
          value={formData.backgroundColor}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, backgroundColor: value }))
          }
        >
          <div className="flex items-center space-x-4">
            <RadioGroupItem
              data-testid="color-white"
              value="white"
              id="white"
              className={`h-6 w-6 rounded-full border ${
                formData.backgroundColor === "white"
                  ? "border-black"
                  : "border-gray-300"
              } bg-white`}
            />
            <RadioGroupItem
              data-testid="color-green"
              value="green"
              id="green"
              className={`h-6 w-6 rounded-full border ${
                formData.backgroundColor === "green"
                  ? "border-black"
                  : "border-gray-300"
              } bg-green-300`}
            />
            <RadioGroupItem
              data-testid="color-yellow"
              value="yellow"
              id="yellow"
              className={`h-6 w-6 rounded-full border ${
                formData.backgroundColor === "yellow"
                  ? "border-black"
                  : "border-gray-300"
              } bg-yellow-300`}
            />
            <RadioGroupItem
              data-testid="color-blue"
              value="blue"
              id="blue"
              className={`h-6 w-6 rounded-full border ${
                formData.backgroundColor === "blue"
                  ? "border-black"
                  : "border-gray-300"
              } bg-blue-300`}
            />
            <RadioGroupItem
              data-testid="color-pink"
              value="pink"
              id="pink"
              className={`h-6 w-6 rounded-full border ${
                formData.backgroundColor === "pink"
                  ? "border-black"
                  : "border-gray-300"
              } bg-pink-300`}
            />
            <RadioGroupItem
              data-testid="color-black"
              value="black"
              id="black"
              className={`h-6 w-6 rounded-full border ${
                formData.backgroundColor === "black"
                  ? "border-black"
                  : "border-gray-300"
              } bg-black`}
            />
          </div>
        </RadioGroup>
      </div>
      <div className="mb-7">
        <label className="block text-md font-semibold mb-1">Font Family</label>{" "}
        <Select
          value={formData.fontFamily}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, fontFamily: value }))
          }
        >
          <SelectTrigger data-testid="font-family-select" className="w-full">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-7">
        <label className="block text-md font-semibold mb-1">Form Labels</label>
        <div className="flex items-center space-x-2">
          <Switch
            data-testid="form-labels-switch"
            checked={formData.formLabels}
            onCheckedChange={(value) =>
              setFormData((prev) => ({ ...prev, formLabels: value }))
            }
            className="data-[state=checked]:bg-[#91FF86] data-[state=checked]:border-black data-[state=checked]:border-2 [&>span]:bg-black"
          />
          <Label className="text-md font-medium">Turned ON</Label>
        </div>
      </div>
    </div>
  );
};

export default CustomisationPanel;
