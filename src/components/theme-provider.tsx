"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // attribute="class" → next-themes sets class="dark" on <html>
    // defaultTheme="dark" → default to dark if no preference stored
    // enableSystem → respect OS preference on first visit
    // storageKey → persist choice in localStorage
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="editorsforuk-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
