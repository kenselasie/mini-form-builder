export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  options?: string[];
  customMessage?: string;
}

export interface Field {
  id: number;
  label: string;
  type: string;
  value: string;
  validation?: ValidationRules;
  options?: { id: number; label: string; value: string }[];
}

export interface CustomiseFormDataType {
  backgroundColor: string;
  fontFamily: string;
  formLabels: boolean;
  inputBackgroundColor?: string;
  borderColor?: string;
}

export interface FormJsonType {
  title: string;
  fields: Field[];
  customisation: CustomiseFormDataType;
}
