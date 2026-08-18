"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "dark" | "light";

export interface ThemeConfig {
  id: Theme;
  label: string;
  color: string;
  description: string;
}

export const THEMES: ThemeConfig[] = [
  { id: "light", label: "Light Mode", color: "#A4775B", description: "Premium Warm-Neutral" },
  { id: "dark",  label: "Dark Mode",  color: "#D8C7B8", description: "Minimal Dark Brown" },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  themeConfig: THEMES[0],
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme") as Theme;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme, mounted]);

  const themeConfig = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
