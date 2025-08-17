
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

const fontSizes: Record<"sm" | "md" | "lg", Record<string, string>> = {
  sm: {
    '--text-sm': '0.875rem', // text-sm
    '--text-lg': '1.125rem', // text-lg
    '--text-xl': '1.25rem',  // text-xl
    '--text-2xl': '1.5rem',   // text-2xl
    '--text-3xl': '1.875rem', // text-3xl
  },
  md: {
    '--text-sm': '1rem',    // text-base (md)
    '--text-lg': '1.25rem',  // text-xl
    '--text-xl': '1.5rem',   // text-2xl
    '--text-2xl': '1.875rem', // text-3xl
    '--text-3xl': '2.25rem',  // text-4xl
  },
  lg: {
    '--text-sm': '1.125rem', // text-lg
    '--text-lg': '1.5rem',   // text-2xl
    '--text-xl': '1.875rem', // text-3xl
    '--text-2xl': '2.25rem',  // text-4xl
    '--text-3xl': '3rem',     // text-5xl
  },
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

      // Apply color scheme
      root.classList.remove("light", "dark");
      if (settings.colorScheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(settings.colorScheme);
      }
      
      // Apply font size variables
      const selectedFontSize = fontSizes[settings.fontSize] || fontSizes.md;
      Object.entries(selectedFontSize).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

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
