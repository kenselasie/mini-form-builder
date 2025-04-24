"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { BreadcrumbResponsive } from "@/components/breadcrumb/breadcrumb";
import CustomisationPanel from "@/components/features/customisation-panel";
import FormBuilder from "@/components/features/form-builder";
import { CustomiseFormDataType, Field } from "@/types/form-builder-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MyForms = () => {
  const breadrumbData = [
    { href: "#", label: "My Form" },
    { href: "#", label: "Create New Form" },
  ];

  const [formData, setFormData] = React.useState<CustomiseFormDataType>();
  const [formTitle, setFormTitle] = React.useState("Untitled Form");
  const [fields, setFields] = React.useState<Field[]>([
    { id: 1, label: "First Name", type: "text", value: "" },
    { id: 2, label: "Last Name", type: "text", value: "" },
  ]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = () => {
    setIsDialogOpen(true);
  };

  const formJson = {
    title: formTitle,
    fields: fields,
    customisation: formData,
  };

  return (
    <div className="p-20 h-full bg-blue-50">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Create New Form</h1>
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-10"
          >
            Publish Form
          </Button>
        </div>
        <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form JSON Preview</DialogTitle>
          </DialogHeader>
          <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(formJson, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>

      <div className="mb-5">
        <BreadcrumbResponsive items={breadrumbData} />
      </div>

      <div className="flex gap-6">
        <div className="w-[60%]">
          <FormBuilder
            initialTitle={formTitle}
            initialFields={fields}
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
