import * as React from "react";
import { FormJsonType } from "@/types/form-builder-types";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FormData {
  [key: string]: string | boolean | number;
}

const RenderForm = ({ title, fields, customisation }: FormJsonType) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Title:", title);
    console.log("Form Fields:");

    fields.forEach((field) => {
      const fieldKey = `field_${field.id}`;
      console.log(`${field.label} (${field.type}):`, {
        value: data[fieldKey],
        validation: field.validation,
        options: field.options,
      });
    });

    console.log(data);
  };

  const getValidationRules = (field: any) => {
    const rules: any = {};

    if (field.validation?.required) {
      switch (field.type) {
        case "switch":
        case "checkbox":
          rules.required = {
            value: true,
            message: `${field.label} must be checked`,
          };
          break;
        case "radio":
        case "dropdown":
          rules.required = {
            value: true,
            message: `Please select a ${field.label}`,
          };
          break;
        default:
          rules.required = `${field.label} is required`;
      }
    }

    // Only apply these validations for text-based fields
    if (
      ["text", "textarea", "email", "password", "number"].includes(field.type)
    ) {
      if (field.validation?.minLength) {
        rules.minLength = {
          value: field.validation.minLength,
          message: `${field.label} must be at least ${field.validation.minLength} characters`,
        };
      }

      if (field.validation?.maxLength) {
        rules.maxLength = {
          value: field.validation.maxLength,
          message: `${field.label} must be at most ${field.validation.maxLength} characters`,
        };
      }

      if (field.validation?.pattern) {
        rules.pattern = {
          value: new RegExp(field.validation.pattern),
          message: `${field.label} has invalid format`,
        };
      }

      if (field.type === "number") {
        rules.valueAsNumber = true;
        if (field.validation?.min) {
          rules.min = {
            value: field.validation.min,
            message: `${field.label} must be at least ${field.validation.min}`,
          };
        }
        if (field.validation?.max) {
          rules.max = {
            value: field.validation.max,
            message: `${field.label} must be at most ${field.validation.max}`,
          };
        }
      }
    }

    return rules;
  };

  const getBgColorClass = (color: string = "white") => {
    const colorMap: { [key: string]: string } = {
      white: "bg-white",
      green: "bg-green-300",
      yellow: "bg-yellow-300",
      blue: "bg-blue-300",
      pink: "bg-pink-300",
      black: "bg-black text-white",
    };
    return colorMap[color] || "bg-white";
  };

  const getFontFamilyClass = (font: string = "Roboto") => {
    const fontMap: { [key: string]: string } = {
      Roboto: "font-roboto",
      Arial: "font-arial",
      "Times New Roman": "font-times",
    };
    return fontMap[font] || "font-roboto";
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case "button":
        return (
          <Button
            type="button"
            variant="default"
            {...register(`field_${field.id}`)}
          >
            {field.label}
          </Button>
        );

      case "textarea":
        return (
          <Textarea
            {...register(`field_${field.id}`, getValidationRules(field))}
            placeholder={field.label}
            className={errors[`field_${field.id}`] ? "border-red-500" : ""}
            style={{
              backgroundColor: customisation?.inputBackgroundColor || "white",
              borderColor: errors[`field_${field.id}`]
                ? "rgb(239 68 68)"
                : customisation?.borderColor || undefined,
            }}
          />
        );

      case "select":
        return (
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger
              className={errors[`field_${field.id}`] ? "border-red-500" : ""}
            >
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "dropdown":
        return (
          <Controller
            name={`field_${field.id}`}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={String(value || "")}>
                <SelectTrigger
                  className={
                    errors[`field_${field.id}`]
                      ? "border-red-500 w-full"
                      : "w-full"
                  }
                  style={{
                    backgroundColor:
                      customisation?.inputBackgroundColor || "white",
                    borderColor: errors[`field_${field.id}`]
                      ? "rgb(239 68 68)"
                      : customisation?.borderColor || undefined,
                  }}
                >
                  <SelectValue placeholder={field.label} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(
                    (option: { id: string; value: string; label: string }) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            )}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`field_${field.id}`}
              {...register(`field_${field.id}`, getValidationRules(field))}
            />
            <Label htmlFor={`field_${field.id}`}>{field.label}</Label>
          </div>
        );

      case "radio":
        return (
          <Controller
            name={`field_${field.id}`}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onValueChange={onChange} value={String(value || "")}>
                {field.options?.map(
                  (option: { id: string; value: string; label: string }) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`${field.id}-${option.value}`}
                        className={
                          errors[`field_${field.id}`] ? "border-red-500" : ""
                        }
                      />
                      <Label htmlFor={`${field.id}-${option.value}`}>
                        {option.label}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            )}
          />
        );

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={`field_${field.id}`}
              {...register(`field_${field.id}`, getValidationRules(field))}
              onCheckedChange={(checked) => {
                const event = { target: { value: checked } };
                register(`field_${field.id}`).onChange(event);
              }}
            />
            <Label htmlFor={`field_${field.id}`}>{field.label}</Label>
          </div>
        );

      default:
        return (
          <Input
            type={field.type}
            {...register(`field_${field.id}`, getValidationRules(field))}
            placeholder={field.label}
            className={errors[`field_${field.id}`] ? "border-red-500" : ""}
            style={{
              backgroundColor: customisation?.inputBackgroundColor || "white",
              borderColor: errors[`field_${field.id}`]
                ? "rgb(239 68 68)"
                : customisation?.borderColor || undefined,
            }}
          />
        );
    }
  };

  return (
    <div
      data-testid="preview-form"
      className={`${getBgColorClass(
        customisation?.backgroundColor
      )} ${getFontFamilyClass(
        customisation?.fontFamily
      )} max-w-2xl mx-auto mt-10 p-6 rounded-lg shadow`}
      style={{
        fontFamily: customisation?.fontFamily || "Roboto",
      }}
    >
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            {customisation?.formLabels &&
              field.type !== "button" &&
              field.type !== "checkbox" && (
                <Label
                  htmlFor={`field_${field.id}`}
                  className="text-sm font-medium"
                >
                  {field.label}
                  {field.validation?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
              )}

            {renderField(field)}

            {errors[`field_${field.id}`] && (
              <p className="text-sm text-red-500">
                {errors[`field_${field.id}`]?.message as string}
              </p>
            )}
          </div>
        ))}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RenderForm;
