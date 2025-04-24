"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { BreadcrumbResponsive } from "@/components/breadcrumb/breadcrumb";
import CustomisationPanel from "@/components/features/customisation-panel";
import FormBuilder from "@/components/features/form-builder";
import { CustomiseFormDataType, Field } from "@/types/form-builder-types";

const MyForms = () => {
  const breadrumbData = [
    { href: "#", label: "My Form" },
    { href: "#", label: "Create New Form" },
  ];

  const [formData, setFormData] = React.useState<CustomiseFormDataType>();
  const [formTitle, setFormTitle] = React.useState("Untitled Form");
  const [fields, setFields] = React.useState<Field[]>([]);

  const handleSubmit = () => {
    console.log("Form Title:", formTitle);
    console.log("Fields Data:", fields);
    console.log("Form Customization Data:", formData);
  };

  return (
    <div className="p-20 h-full bg-blue-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Create New Form</h1>
        <Button onClick={handleSubmit} className="bg-blue-500 text-white px-10">
          Publish Form
        </Button>
      </div>

      <div className="mb-5">
        <BreadcrumbResponsive items={breadrumbData} />
      </div>

      <div className="flex gap-6">
        <div className="w-[60%]">
          <FormBuilder
            initialTitle={formTitle}
            initialFields={[
              { id: 1, label: "First Name", type: "text", value: "" },
              { id: 2, label: "Last Name", type: "text", value: "" },
            ]}
            onTitleChange={(title) => setFormTitle(title)}
            onFieldsChange={(fields) => setFields(fields)}
          />
        </div>
        <div className="w-[30%]">
          <CustomisationPanel onFormDataChange={(data) => setFormData(data)} />
        </div>
      </div>
    </div>
  );
};

export default MyForms;
