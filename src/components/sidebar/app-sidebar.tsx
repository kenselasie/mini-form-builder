"use client";

import * as React from "react";
import { ROUTES } from "@/routes";
import { NavSingles } from "@/components/sidebar/nav-singles";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    main: [
      {
        name: "My Forms",
        url: ROUTES.MY_FORMS,
        icon: null,
        isActive: pathname === ROUTES.MY_FORMS,
      },
      {
        name: "Analytics",
        url: ROUTES.ANALYTICS,
        icon: null,
        isActive: pathname === ROUTES.ANALYTICS,
      },
      {
        name: "Knowledge Base",
        url: ROUTES.KNOWLEDGE_BASE,
        icon: null,
        isActive: pathname === ROUTES.KNOWLEDGE_BASE,
      },
      {
        name: "Help & Support",
        url: ROUTES.HELP_SUPPORT,
        icon: null,
        isActive: pathname === ROUTES.HELP_SUPPORT,
      },
      {
        name: "My Profile",
        url: ROUTES.MY_PROFILE,
        icon: null,
        isActive: pathname === ROUTES.MY_PROFILE,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-gray-800 text-white">
        <div className="flex items-center space-x-2 mt-5 ml-8">
          <FileText color="blue" strokeWidth={1} />
          <span>Form Builder</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-800 text-white">
        <NavSingles headerTitle="" items={data.main} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
