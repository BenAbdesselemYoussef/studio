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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarRail,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

function HeaderContent() {
  const { state } = useSidebar();
  return (
    <>
      <SidebarTrigger />
      {state === 'collapsed' && (
        <Link href="/" className="flex items-center gap-2 animate-in fade-in-50">
          <FolderKanban className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">MashrooBrika</h1>
        </Link>
      )}
    </>
  );
}


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" || pathname.startsWith("/project");
    return pathname.startsWith(path);
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 overflow-hidden">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <FolderKanban className="h-6 w-6 text-primary" />
                </Link>
              </Button>
              <h1 className="text-xl font-semibold text-foreground group-data-[[data-state=collapsed]]:hidden">MashrooBrika</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/")}
                  tooltip={{ children: "Dashboard" }}
                  className="justify-center group-data-[[data-state=expanded]]:justify-start"
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
                  className="justify-center group-data-[[data-state=expanded]]:justify-start"
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
                  className="justify-center group-data-[[data-state=expanded]]:justify-start"
                >
                  <Link href="#">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
            <HeaderContent />
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
