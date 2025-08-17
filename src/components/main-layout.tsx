"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Settings,
  FolderKanban,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" || pathname.startsWith("/project");
    return pathname.startsWith(path);
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <FolderKanban className="h-6 w-6 text-primary" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">Project Zenith</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/")}
                tooltip={{ children: "Dashboard" }}
              >
                <Link href="/">
                  <LayoutGrid />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/team")}
                tooltip={{ children: "Team" }}
              >
                <Link href="/team">
                  <Users />
                  <span>Team</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/settings")}
                tooltip={{ children: "Settings" }}
              >
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          {/* Header content can go here if needed */}
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
