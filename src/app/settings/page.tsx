
"use client";
import { MainLayout } from "@/components/main-layout";
import { SettingsPage } from "@/components/settings-page";
import { SettingsProvider } from "@/hooks/use-settings.tsx";

export default function Settings() {
  return (
    <SettingsProvider>
      <MainLayout>
        <SettingsPage />
      </MainLayout>
    </SettingsProvider>
  );
}
