
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { themes } from "@/lib/themes";

type Settings = {
  theme: string;
  defaultNav: "sidebar" | "header";
  colorScheme: "light" | "dark" | "system";
  fontSize: "sm" | "md" | "lg";
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
    colorScheme: "system",
    fontSize: "md",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem("app-settings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings({
            ...{
                theme: "default",
                defaultNav: "sidebar",
                colorScheme: "system",
                fontSize: "md",
            },
            ...parsedSettings
        });
      } catch (e) {
        console.error("Failed to parse settings from localStorage", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("app-settings", JSON.stringify(settings));
      
      const root = window.document.documentElement;
      const body = window.document.body;

      // Apply color scheme
      root.classList.remove("light", "dark");
      if (settings.colorScheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(settings.colorScheme);
      }
      
      // Apply font size
      body.classList.remove("text-sm", "text-base", "text-lg");
      switch (settings.fontSize) {
        case "sm":
          body.classList.add("text-sm");
          break;
        case "lg":
          body.classList.add("text-lg");
          break;
        default:
          body.classList.add("text-base");
      }

      // Apply theme
      const selectedTheme = themes.find((t) => t.name === settings.theme) || themes[0];
      root.classList.remove(...themes.map((t) => t.name));
      root.classList.add(selectedTheme.name);

      let styleSheet = document.getElementById("dynamic-theme-styles");
      if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "dynamic-theme-styles";
        document.head.appendChild(styleSheet);
      }
      
      const lightVars = Object.entries(selectedTheme.cssVars.light)
        .map(([key, value]) => `--${key}: ${value};`)
        .join("\n");
      
      const darkVars = Object.entries(selectedTheme.cssVars.dark)
        .map(([key, value]) => `--${key}: ${value};`)
        .join("\n");
        
      styleSheet.innerHTML = `
        :root, .light {
          ${lightVars}
        }
        .dark {
          ${darkVars}
        }
      `;
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
