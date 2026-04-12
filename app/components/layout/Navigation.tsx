"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  LogOut,
  Sun,
  Moon,
  CircleUserRound,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useAppTheme } from "./ThemeContext";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, text: "Заявка №1023 требует проверки", time: "5 мин назад" },
  { id: 2, text: "Документ загружен успешно", time: "1 час назад" },
  { id: 3, text: "Новый комментарий в заявке №987", time: "2 часа назад" },
  { id: 4, text: "Срок по заявке №1010 истекает", time: "вчера" },
];

function Dropdown({
  children,
  content,
  width = 280,
  align = "right",
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  width?: number;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{children}</div>
      {open && (
        <div
          className={cn(
            "absolute top-full mt-1 z-50 bg-popover border border-border rounded-lg shadow-lg overflow-hidden",
            align === "right" ? "right-0" : "left-0",
          )}
          style={{ width }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export function Navigation({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const { isDark, toggleTheme } = useAppTheme();

  const notifContent = (
    <div>
      <div className="px-3 py-2 border-b border-border">
        <p className="text-sm font-semibold">Уведомления</p>
      </div>
      {notifications.length === 0 ? (
        <div className="px-3 py-2 text-sm text-muted-foreground">
          У вас нет уведомлений
        </div>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className="px-3 py-2.5 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-default"
          >
            <p className="text-sm">{n.text}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
          </div>
        ))
      )}
    </div>
  );

  const userContent = (
    <div>
      <button
        onClick={toggleTheme}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isDark ? (
            <Sun className="size-4 text-yellow-400" />
          ) : (
            <Moon className="size-4 text-muted-foreground" />
          )}
          <span>{isDark ? "Светлая тема" : "Тёмная тема"}</span>
        </div>
        <div
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
            isDark ? "bg-[#f96800]" : "bg-muted",
          )}
        >
          <span
            className={cn(
              "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform",
              isDark ? "translate-x-[18px]" : "translate-x-0.5",
            )}
          />
        </div>
      </button>
      <div className="border-t border-border" />
      <button
        onClick={() => router.push("/login")}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-muted/50 transition-colors"
      >
        <LogOut className="size-4" />
        <span>Выйти</span>
      </button>
    </div>
  );

  return (
    <header className="flex items-center justify-between px-4 bg-card border-b border-border shadow-sm min-h-14">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded hover:bg-muted"
        >
          <Menu className="size-5" />
        </button>
        <img
          src="/logo-jusanmobile.png"
          alt="Logo"
          className="h-8 md:h-10 object-contain ml-0 md:ml-3"
        />
      </div>

      <div className="flex items-center gap-1">
        <Dropdown content={notifContent} width={320}>
          <button className="relative p-2 rounded hover:bg-muted">
            <Bell className="size-5 text-muted-foreground" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 size-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center font-medium">
                {notifications.length}
              </span>
            )}
          </button>
        </Dropdown>

        <Dropdown content={userContent} width={220}>
          <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-muted ml-1">
            <CircleUserRound className="size-5 text-muted-foreground" />
            <span className="hidden md:block text-sm font-medium">
              Югай Виталий
            </span>
            <ChevronDown className="hidden md:block size-4 text-muted-foreground" />
          </button>
        </Dropdown>
      </div>
    </header>
  );
}
