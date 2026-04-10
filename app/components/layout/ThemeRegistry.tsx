"use client";

import { ThemeContextProvider } from "./ThemeContext";

export function ThemeRegistry({
  children,
  initialDark,
}: {
  children: React.ReactNode;
  initialDark: boolean;
}) {
  return (
    <ThemeContextProvider initialDark={initialDark}>
      {children}
    </ThemeContextProvider>
  );
}
