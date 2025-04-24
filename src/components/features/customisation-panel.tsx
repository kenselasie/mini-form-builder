"use client";
import * as React from "react";
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
    backgroundColor: "white",
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
        <div className="flex flex-wrap items-center gap-4">
          {[
            { value: "white", bgClass: "bg-white", color: "#ffffff" },
            { value: "green", bgClass: "bg-green-300", color: "#86efac" },
            { value: "yellow", bgClass: "bg-yellow-300", color: "#fde047" },
            { value: "blue", bgClass: "bg-blue-300", color: "#93c5fd" },
            { value: "pink", bgClass: "bg-pink-300", color: "#f9a8d4" },
            { value: "black", bgClass: "bg-black", color: "#000000" },
          ].map((color) => (
            <div
              key={color.value}
              data-testid={`color-${color.value}`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  backgroundColor: color.value,
                }))
              }
              className={`h-6 w-6 rounded-full p-[3px] cursor-pointer border ${
                formData.backgroundColor === color.value
                  ? "border-black border-2"
                  : "border-white"
              }`}
            >
              <div className={`w-full h-full rounded-full ${color.bgClass}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-7">
        <label className="block text-md font-semibold mb-1">Font Family</label>{" "}
        <Select
          value={formData.fontFamily}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, fontFamily: value }))
          }
        >
          <SelectTrigger
            data-testid="font-family-select"
            className="w-full border-gray-400"
          >
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
            id="turn-on"
            data-testid="form-labels-switch"
            checked={formData.formLabels}
            onCheckedChange={(value) =>
              setFormData((prev) => ({ ...prev, formLabels: value }))
            }
            className="data-[state=checked]:bg-[#91FF86] border-2 border-black p-[2px] h-7 w-12 [&>span]:h-[18px] [&>span]:w-[20px] [&>span]:bg-black"
          />
          <Label htmlFor="turn-on" className="text-base font-normal">
            Turned ON
          </Label>
        </div>
      </div>
    </div>
  );
};

export default CustomisationPanel;
