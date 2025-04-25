"use client";
import * as React from "react";
import { Suspense } from "react";
import RenderForm from "@/components/features/render-form";
import { FormJsonType } from "@/types/form-builder-types";
import { useSearchParams } from "next/navigation";
import { BreadcrumbResponsive } from "@/components/breadcrumb/breadcrumb";

const RenderFormPage = () => {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <RenderFormContent />
    </Suspense>
  );
};

const RenderFormContent = () => {
  const searchParams = useSearchParams();
  const formParam = searchParams.get("form");

  if (!formParam) {
    return <div>No form data provided</div>;
  }

  const formData: FormJsonType = JSON.parse(decodeURIComponent(formParam));
  const breadrumbData = [
    { href: "#", label: "My Forms" },
    { href: "/my-forms", label: "Create New Form" },
    { href: "#", label: "Rendered Form" },
  ];

  return (
    <>
      <div className="px-30 py-10 h-full bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Rendered Form</h1>
        </div>
        <div className="mb-5">
          <BreadcrumbResponsive items={breadrumbData} />
        </div>

        <div className="gap-10">
          <RenderForm {...formData} />;
        </div>
      </div>
    </>
  );
};

export default RenderFormPage;
