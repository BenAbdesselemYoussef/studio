
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Settings,
  FolderKanban,
} from "lucide-react";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings.tsx";
import { ThemeToggle } from "@/components/theme-toggle";

function HeaderNav() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" || pathname.startsWith("/project");
    if (path === "/settings") return pathname === "/settings";
    return pathname.startsWith(path);
  }

  const navItems = [
    { href: "/", icon: <LayoutGrid />, label: "Dashboard" },
    { href: "/team", icon: <Users />, label: "Team" },
    { href: "/settings", icon: <Settings />, label: "Settings" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={isActive(item.href) ? "secondary" : "ghost"}
          size="sm"
        >
          <Link href={item.href}>
            {item.icon}
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}

function HeaderContent() {
  const { state } = useSidebar();
  return (
    <>
      <SidebarTrigger />
      <div className={`transition-opacity duration-500 ${state === 'collapsed' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2">
          {state === 'collapsed' && (
            <Link href="/" className="flex items-center gap-2">
              <FolderKanban className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Project Zenith</h1>
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center ml-auto gap-2">
        <div className={`transition-opacity duration-500 ${state === 'collapsed' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            {state === 'collapsed' && <HeaderNav />}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(settings.defaultNav === 'sidebar');

  React.useEffect(() => {
    setIsSidebarOpen(settings.defaultNav === 'sidebar');
  }, [settings.defaultNav]);
  
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" || pathname.startsWith("/project");
    if (path === "/settings") return pathname === "/settings";
    return pathname.startsWith(path);
  }

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 overflow-hidden">
              <Link href="/" className="flex items-center gap-2">
                <FolderKanban className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground whitespace-nowrap">Project Zenith</h1>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  variant={isActive("/") ? "secondary" : "ghost"}
                  isActive={isActive("/")}
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
                  variant={isActive("/team") ? "secondary" : "ghost"}
                  isActive={isActive("/team")}
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
                  variant={isActive("/settings") ? "secondary" : "ghost"}
                  isActive={isActive("/settings")}
                >
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <ThemeToggle />
          </SidebarFooter>
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
