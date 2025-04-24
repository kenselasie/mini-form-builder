"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ROUTES } from "@/routes";

export function NavSingles({
  headerTitle,
  items,
}: {
  headerTitle: string;
  items: {
    name: string;
    url: string;
    icon: LucideIcon | null;
    isActive?: boolean;
  }[];
}) {
  // const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{headerTitle}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.name !== "My Profile" ? (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={`rounded-none hover:rounded-none border-l-4 border-l-transparent ${
                  item.isActive
                    ? "bg-gray-600 border-l-cyan-300"
                    : "hover:bg-gray-600"
                }`}
              >
                <Link href={item.url} className={`block p-2`}>
                  {item.icon && <item.icon />}
                  <span className="ml-6">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <div key={item.name}>
              <SidebarMenuItem className="mt-10">
                <SidebarMenuButton
                  asChild
                  className={`rounded-none hover:rounded-none border-l-4 border-l-transparent ${
                    item.isActive
                      ? "bg-gray-600 border-l-cyan-300"
                      : "hover:bg-gray-600"
                  }`}
                >
                  <Link href={item.url} className={`block pt-2 px-2`}>
                    {item.icon && <item.icon />}
                    <span className="ml-6">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={"logout"} className="mt-[-10px]">
                <SidebarMenuButton
                  asChild
                  className={`rounded-none hover:rounded-none border-l-4 border-l-transparent hover:bg-transparent`}
                >
                  <Link href={item.url} className={`block px-2`}>
                    {item.icon && <item.icon />}
                    <span className="ml-6 text-gray-500">{"Logout"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
