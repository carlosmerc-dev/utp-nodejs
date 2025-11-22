import React, { useEffect, useState } from "react";
import { ThemeContext } from "./themeCore";
import type { Theme } from "./themeCore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const getInitial = (): Theme => {
    try {
      const stored = localStorage.getItem("app-theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {
      /* ignore */
    }
    // Fallback: respetar prefers-color-scheme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return "light";
    }
    return "dark";
  };

  const [theme, setTheme] = useState<Theme>(getInitial);

  useEffect(() => {
    try {
      localStorage.setItem("app-theme", theme);
    } catch {
      // noop
    }
    // Aplicar un atributo data-theme en el html para estilos CSS simples
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Note: ThemeContext is created in themeCore.ts. This file only exports the
// provider component to keep component-only exports here (Fast Refresh friendly).
