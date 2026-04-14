import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeRegistry } from "./components/layout/ThemeRegistry";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="ru" data-theme={isDark ? "dark" : "light"} suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body suppressHydrationWarning>
        <ThemeRegistry initialDark={isDark}>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
