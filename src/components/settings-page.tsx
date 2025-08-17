
"use client";

import { useSettings } from "@/hooks/use-settings.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { themes } from "@/lib/themes";

export function SettingsPage() {
  const { settings, setSettings } = useSettings();

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Customize the look and feel of your application.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Select a color theme for the entire application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <div key={theme.name} className="space-y-2">
                <button
                  onClick={() =>
                    setSettings({ ...settings, theme: theme.name })
                  }
                  className={`w-full h-24 rounded-lg border-2 ${
                    settings.theme === theme.name ? "border-primary" : "border-transparent"
                  }`}
                >
                  <div className="h-full w-full rounded-md p-2 flex flex-col gap-1"
                    style={{ backgroundColor: `hsl(${theme.cssVars.light.background})` }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="h-4 w-4 rounded-full" style={{backgroundColor: `hsl(${theme.cssVars.light.primary})`}} />
                      <div className="h-2 w-full rounded-sm" style={{backgroundColor: `hsl(${theme.cssVars.light.accent})`}} />
                    </div>
                    <div className="h-2 w-1/2 rounded-sm" style={{backgroundColor: `hsl(${theme.cssVars.light.secondary})`}} />
                    <div className="h-2 w-3/4 rounded-sm" style={{backgroundColor: `hsl(${theme.cssVars.light.muted})`}} />
                  </div>
                </button>
                <p className="text-sm text-center font-medium">{theme.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default Navigation</CardTitle>
          <CardDescription>
            Choose your preferred default navigation style.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.defaultNav}
            onValueChange={(value: "sidebar" | "header") =>
              setSettings({ ...settings, defaultNav: value })
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sidebar" id="nav-sidebar" />
              <Label htmlFor="nav-sidebar">Sidebar</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="header" id="nav-header" />
              <Label htmlFor="nav-header">Header Nav</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
