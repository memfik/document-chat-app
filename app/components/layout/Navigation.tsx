"use client";

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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, text: "Заявка №1023 требует проверки", time: "5 мин назад" },
  { id: 2, text: "Документ загружен успешно", time: "1 час назад" },
  { id: 3, text: "Новый комментарий в заявке №987", time: "2 часа назад" },
  { id: 4, text: "Срок по заявке №1010 истекает", time: "вчера" },
];

export function Navigation({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <header className="flex items-center justify-between px-4 bg-card border-b border-border shadow-sm h-16">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
        <a href="/applications">
          <img
            src="/logo-jusanmobile.png"
            alt="Logo"
            className="h-8 md:h-10 object-contain ml-0 md:ml-3"
          />
        </a>
      </div>

      <div className="flex items-center gap-1">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" className="relative" />}
          >
            <Bell className="size-5 text-muted-foreground" />
            {notifications.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center font-medium">
                {notifications.length}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-semibold">Уведомления</p>
            </div>
            {notifications.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                У вас нет уведомлений
              </div>
            ) : (
              notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex-col items-start px-3 py-2.5 rounded-none border-b border-border last:border-b-0 cursor-default"
                >
                  <p className="text-sm">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {n.time}
                  </p>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="flex items-center gap-1.5 px-2 py-1.5 ml-1 h-auto"
              />
            }
          >
            <CircleUserRound className="size-5 text-muted-foreground" />
            <span className="hidden md:block text-sm font-medium">
              Югай Виталий
            </span>
            <ChevronDown className="hidden md:block size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-0">
            <DropdownMenuItem
              onClick={toggleTheme}
              className="flex items-center justify-between px-3 py-2.5 rounded-none cursor-pointer"
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
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 px-3 py-2.5 rounded-none text-destructive cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
