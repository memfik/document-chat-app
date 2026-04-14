"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  { id: 1, text: "Заявка №1023 требует проверки", time: "5 мин назад" },
  { id: 2, text: "Документ загружен успешно", time: "1 час назад" },
  { id: 3, text: "Новый комментарий в заявке №987", time: "2 часа назад" },
  { id: 4, text: "Срок по заявке №1010 истекает", time: "вчера" },
];

const pageTitles: Record<string, string> = {
  "/applications": "Заявки",
  "/new-application": "Новая заявка Ф16",
  "/zno": "ЗНО",
  "/accompaniment": "Сопровождение",
  "/rd": "Рамочный договор",
  "/report": "Отчеты",
};

function usePageTitle() {
  const pathname = usePathname();
  if (pathname.startsWith("/history/")) {
    const id = pathname.split("/history/")[1];
    return `История / ${id}`;
  }
  const match = Object.entries(pageTitles).find(
    ([href]) => pathname === href || pathname.startsWith(href + "/"),
  );
  return match ? match[1] : "";
}

export function Navigation({ onMenuClick }: { onMenuClick?: () => void }) {
  const pageTitle = usePageTitle();

  return (
    <header className="flex items-center justify-between px-4 md:px-6 bg-card border-b border-border shadow-sm h-16">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
        {pageTitle && <h1 className="text-lg font-semibold">{pageTitle}</h1>}
      </div>

      <div className="flex items-center gap-1">
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
      </div>
    </header>
  );
}
