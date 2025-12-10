import type { Metadata } from "next";
import "./globals.css";
import { ThemeRegistry } from "./components/ThemeRegistry";
import { Navigation } from "./components/Navigation";

export const metadata: Metadata = {
  title: "Document & Chat Manager",
  description: "Manage documents and chat with AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>
          <Navigation />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
