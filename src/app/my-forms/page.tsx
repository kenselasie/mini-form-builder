"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { BreadcrumbResponsive } from "@/components/breadcrumb/breadcrumb";
import CustomisationPanel from "@/components/features/customisation-panel";
import FormBuilder from "@/components/features/form-builder";
import { CustomiseFormDataType, Field } from "@/types/form-builder-types";
import { useRouter } from "next/navigation";

const MyForms = () => {
  const router = useRouter();

  const breadrumbData = [
    { href: "#", label: "My Forms" },
    { href: "#", label: "Create New Form" },
  ];

  const [formData, setFormData] = React.useState<CustomiseFormDataType>();
  const [formTitle, setFormTitle] = React.useState("Untitled Form");
  const [fields, setFields] = React.useState<Field[]>([
    { id: 1, label: "First Name", type: "text", value: "" },
    { id: 2, label: "Last Name", type: "text", value: "" },
  ]);

  const handleSubmit = () => {
    const formJson = {
      title: formTitle,
      fields: fields,
      customisation: formData,
    };
    console.log(formJson);
    const encodedForm = encodeURIComponent(JSON.stringify(formJson));
    router.push(`/render-form?form=${encodedForm}`);
  };

  return (
    <div className="p-30 h-full bg-blue-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Create New Form</h1>
        <Button onClick={handleSubmit} className="bg-blue-500 text-white px-10">
          Publish Form
        </Button>
      </div>

      <div className="mb-5">
        <BreadcrumbResponsive items={breadrumbData} />
      </div>

      <div className="flex gap-10">
        <div className="w-[60%]">
          <FormBuilder
            initialTitle={formTitle}
            initialFields={fields}
            onTitleChange={(title) => setFormTitle(title)}
            onFieldsChange={(fields) => setFields(fields)}
          />
        </div>
        <div className="w-[40%]">
          <CustomisationPanel onFormDataChange={(data) => setFormData(data)} />
        </div>
      </div>
    </div>
  );
};

export default MyForms;
