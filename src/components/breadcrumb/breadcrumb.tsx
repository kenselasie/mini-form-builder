import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const items = [
  { href: "#", label: "My Form" },
  { href: "#", label: "Create New Form" },
];
export function BreadcrumbResponsive({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div
            className="flex justify-center items-center space-x-2"
            key={index}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index != items.length - 1 ? <BreadcrumbSeparator /> : null}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
