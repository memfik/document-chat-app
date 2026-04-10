import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeRegistry } from "./components/layout/ThemeRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Document Manager",
  description: "Manage documents",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isDark = cookieStore.get("theme")?.value === "dark";

  return (
    <html lang="ru" data-theme={isDark ? "dark" : "light"} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry initialDark={isDark}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
