export interface Field {
  id: number;
  label: string;
  type: string;
  value: string;
  required?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface CustomiseFormDataType {
  backgroundColor: string;
  fontFamily: string;
  formLabels: Boolean;
  inputBackgroundColor?: string;
  borderColor?: string;
}

export interface FormJsonType {
  title: string;
  fields: Field[];
  customisation: CustomiseFormDataType;
}
