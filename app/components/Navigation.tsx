"use client";

import { usePathname, useRouter } from "next/navigation";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatIcon from "@mui/icons-material/Chat";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="bg-[#c6a2e8] text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold">Тестовое задание</h1>
        <div className="flex gap-2">
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded hover:bg-[#b77eed] transition-colors",
              pathname === "/documents" ? "font-bold underline" : "font-normal"
            )}
            onClick={() => router.push("/documents")}
          >
            <DescriptionIcon />
            Документы
          </button>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded hover:bg-[#b77eed] transition-colors",
              pathname === "/chat" ? "font-bold underline" : "font-normal"
            )}
            onClick={() => router.push("/chat")}
          >
            <ChatIcon />
            Чат
          </button>
        </div>
      </div>
    </nav>
  );
}
