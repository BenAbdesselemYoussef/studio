
"use client"

import * as React from "react"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useSettings } from "@/hooks/use-settings.tsx"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { settings, setSettings } = useSettings()

  const toggleTheme = () => {
    const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(settings.colorScheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setSettings({ ...settings, colorScheme: themes[nextIndex] });
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
        {settings.colorScheme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
        {settings.colorScheme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
        {settings.colorScheme === 'system' && <SunMoon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
