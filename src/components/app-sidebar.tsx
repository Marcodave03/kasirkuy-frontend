"use client";

import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Coins,
  ChartPie,
  HandCoins,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
// Menu items.
const operation = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Product",
    url: "/dashboard/product",
    icon: Inbox,
  },
  {
    title: "Transaction",
    url: "/dashboard/transaction",
    icon: Coins,
  },
  {
    title: "Customer",
    url: "#",
    icon: Users,
  },
];
const sales = [
  {
    title: "Analytics",
    url: "#",
    icon: ChartPie,
  },
  {
    title: "Financials",
    url: "#",
    icon: HandCoins,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
];
const founder = [
  {
    title: "Owner",
    url: "#",
    icon: ChartPie,
  },
  {
    title: "Company",
    url: "#",
    icon: ChartPie,
  },
];

export function AppSidebar() {
  const {  } = useSidebar();
  return (
    <Sidebar variant="inset" collapsible="icon" className="border-gray-200 dark:border-gray-900  border-r-2">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      passHref
                      className="flex items-center gap-2 "
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sales.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        <SidebarGroup>
          <SidebarGroupLabel>Founder</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {founder.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        

      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {/* <User2 /> Username */}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
