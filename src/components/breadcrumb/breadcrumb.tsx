import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";

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
            {index == 0 ? <></> : null}

            <BreadcrumbItem
              className={`${
                index == 0 ? "border-b-2 border-b-blue-400 text-blue-400" : ""
              }`}
            >
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index != items.length - 1 ? (
              <BreadcrumbSeparator className="flex gap-0">
                <ChevronsRight />
              </BreadcrumbSeparator>
            ) : null}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
