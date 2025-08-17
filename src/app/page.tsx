
"use client";
import { MainLayout } from "@/components/main-layout";
import { Dashboard } from "@/components/dashboard";
import { projects } from "@/lib/data";
import { SettingsProvider } from "@/hooks/use-settings.tsx";

export default function Home() {
  return (
    <SettingsProvider>
      <MainLayout>
        <Dashboard projects={projects} />
      </MainLayout>
    </SettingsProvider>
  );
}
