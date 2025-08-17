
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "@/lib/themes";

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
      try {
        setSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error("Failed to parse settings from localStorage", e);
      }
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

      const applyThemeVariables = (themeVars: Record<string, string>, isDark: boolean) => {
        const selector = isDark ? ".dark" : ":root";
        let styleSheet = document.getElementById("dynamic-theme-styles");
        if (!styleSheet) {
          styleSheet = document.createElement("style");
          styleSheet.id = "dynamic-theme-styles";
          document.head.appendChild(styleSheet);
        }
        
        const css = `
          ${selector} {
            ${Object.entries(themeVars).map(([key, value]) => `--${key}: ${value};`).join('\n')}
          }
        `;
        styleSheet.innerHTML = css;
      };
      
      applyThemeVariables(selectedTheme.cssVars.light, false);
      applyThemeVariables(selectedTheme.cssVars.dark, true);
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
