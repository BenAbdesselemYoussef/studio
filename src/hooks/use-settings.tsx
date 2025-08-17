
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, Theme } from "@/lib/themes";

type Settings = {
  theme: string;
  defaultNav: "sidebar" | "header";
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>({
    theme: "default",
    defaultNav: "sidebar",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem("app-settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("app-settings", JSON.stringify(settings));
      
      const selectedTheme = themes.find((t) => t.name === settings.theme) || themes[0];

      const root = window.document.documentElement;
      root.classList.remove(...themes.map((t) => t.name));
      root.classList.add(selectedTheme.name);

      const themeCss = selectedTheme.cssVars.light;
      for (const [key, value] of Object.entries(themeCss)) {
        root.style.setProperty(`--${key}`, value);
      }
      const darkThemeCss = selectedTheme.cssVars.dark;
      const darkRoot = window.document.querySelector('.dark');
      if (darkRoot) {
          for (const [key, value] of Object.entries(darkThemeCss)) {
              (darkRoot as HTMLElement).style.setProperty(`--${key}`, value);
          }
      } else {
          // apply to root and assume dark class is present
            for (const [key, value] of Object.entries(darkThemeCss)) {
              root.style.setProperty(`--${key}`, value);
          }
      }
    }
  }, [settings, isMounted]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
