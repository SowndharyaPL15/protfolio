"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="font-space text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all hover:scale-105"
      style={{
        background: "var(--glow-xs)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-main)",
      }}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      <span>{isDark ? "🌙" : "☀️"}</span>
      <span className="font-bold uppercase text-[9px]">{isDark ? "DARK" : "LIGHT"}</span>
    </button>
  );
}
