
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
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  const { settings, setSettings } = useSettings();

  const setColorScheme = (scheme: "light" | "dark" | "system") => {
    setSettings({ ...settings, colorScheme: scheme });
  };

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
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
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
          </div>
           <div className="space-y-2">
            <Label>Color Scheme</Label>
            <div className="flex items-center space-x-2">
               <Button
                variant={settings.colorScheme === "light" ? "secondary" : "outline"}
                onClick={() => setColorScheme("light")}
              >
                Light
              </Button>
              <Button
                variant={settings.colorScheme === "dark" ? "secondary" : "outline"}
                onClick={() => setColorScheme("dark")}
              >
                Dark
              </Button>
              <Button
                variant={settings.colorScheme === "system" ? "secondary" : "outline"}
                onClick={() => setColorScheme("system")}
              >
                System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout</CardTitle>
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
