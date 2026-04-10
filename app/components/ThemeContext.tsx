"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export function useAppTheme() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({
  children,
  initialDark = false,
}: {
  children: ReactNode;
  initialDark?: boolean;
}) {
  const [isDark, setIsDark] = useState(initialDark);

  useEffect(() => {
    document.cookie = `theme=${isDark ? "dark" : "light"};path=/;max-age=31536000`;
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
      primary: { main: "#f96800" },
      secondary: { main: "#dc004e" },
    },
  });

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme: () => setIsDark((v) => !v) }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
