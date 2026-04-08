"use client";

import { ThemeContextProvider } from "./ThemeContext";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
