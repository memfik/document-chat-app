"use client";

import { useRouter } from "next/navigation";
import { CircleUserRound, ChevronDown, LogOut, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppTheme } from "../ThemeContext";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "./SidebarTooltip";

interface SidebarUserProfileProps {
  expanded: boolean;
  textCls: string;
}

export function SidebarUserProfile({
  expanded,
  textCls,
}: SidebarUserProfileProps) {
  const router = useRouter();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <div className="px-2 py-2 border-t border-border mt-auto">
      <SidebarTooltip label="Югай Виталий" show={!expanded}>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className={cn(
                  "w-full flex items-center h-9 rounded-md text-sm transition-colors text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  expanded ? "px-3 gap-2" : "justify-center px-2",
                )}
              />
            }
          >
            <CircleUserRound className="size-6 shrink-0" />
            {expanded && (
              <>
                <span
                  className={cn(
                    "flex-1 text-left whitespace-nowrap overflow-hidden",
                    textCls,
                  )}
                >
                  Югай Виталий
                </span>
                <ChevronDown className="size-3.5 shrink-0" />
              </>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align={expanded ? "start" : "end"}
            className="w-56 p-0"
          >
            <DropdownMenuItem
              onClick={toggleTheme}
              className="flex items-center justify-between px-3 py-2.5 rounded-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Sun className="size-5 text-yellow-400" />
                ) : (
                  <Moon className="size-5 text-muted-foreground" />
                )}
                <span>{isDark ? "Светлая тема" : "Тёмная тема"}</span>
              </div>
              <div
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
                  isDark ? "bg-[#f96800]" : "bg-zinc-400",
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
              <LogOut className="size-5" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarTooltip>
    </div>
  );
}
