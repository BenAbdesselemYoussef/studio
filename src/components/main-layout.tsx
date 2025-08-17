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
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

function HeaderNav() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/" || pathname.startsWith("/project");
    return pathname.startsWith(path);
  }

  const navItems = [
    { href: "/", icon: <LayoutGrid />, label: "Dashboard" },
    { href: "/team", icon: <Users />, label: "Team" },
    { href: "#", icon: <Settings />, label: "Settings" },
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
      <div className={`transition-opacity duration-300 ${state === 'collapsed' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-2">
          {state === 'collapsed' && (
            <Link href="/" className="flex items-center gap-2">
              <FolderKanban className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">MashrooBrika</h1>
            </Link>
          )}
        </div>
      </div>
      <div className={`ml-auto transition-opacity duration-300 ${state === 'collapsed' ? 'opacity-100' : 'opacity-0'}`}>
        {state === 'collapsed' && <HeaderNav />}
      </div>
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
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 overflow-hidden">
              <Link href="/" className="flex items-center gap-2">
                <FolderKanban className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">MashrooBrika</h1>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
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
                  isActive={isActive("/settings")}
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
