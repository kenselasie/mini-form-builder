import { Field } from "@/types/form-builder-types";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

interface ValidationControlsProps {
  field: Field;
  onValidationChange: (validation: any) => void;
}

export const ValidationControls = ({
  field,
  onValidationChange,
}: ValidationControlsProps) => {
  return (
    <div data-testid={`validation-controls-${field.id}`}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`required-${field.id}`}
          data-testid={`validation-required-${field.id}`}
          checked={field.validation?.required}
          onCheckedChange={(checked) =>
            onValidationChange({ required: checked })
          }
        />
        <Label htmlFor={`required-${field.id}`}>Required</Label>
      </div>
    </div>
  );
};
