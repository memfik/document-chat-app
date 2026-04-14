"use client";

import {
  Plus,
  ClipboardList,
  FileText,
  Handshake,
  FolderOpen,
  BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "./SidebarTooltip";

export const navItems = [
  { label: "Новая Ф16", href: "/new-application", icon: Plus },
  { label: "Заявки", href: "/applications", icon: ClipboardList },
  { label: "ЗНО", href: "/zno", icon: FileText },
  { label: "Сопровождение", href: "/accompaniment", icon: Handshake },
  { label: "Рамочный договор", href: "/rd", icon: FolderOpen },
  { label: "Отчеты", href: "/report", icon: BarChart2 },
];

interface SidebarNavProps {
  expanded: boolean;
  textCls: string;
  isActive: (href: string) => boolean;
  onNavClick: (href: string) => void;
}

export function SidebarNav({ expanded, textCls, isActive, onNavClick }: SidebarNavProps) {
  return (
    <nav className="px-2 py-2 mt-5">
      {navItems.map((item) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
          <SidebarTooltip key={item.href} label={item.label} show={!expanded}>
            <button
              onClick={() => onNavClick(item.href)}
              className={cn(
                "w-full flex items-center h-8.5 rounded-md text-sm transition-colors mb-0.5",
                expanded ? "px-3 gap-2" : "justify-center px-2",
                active
                  ? "bg-[#f96800] text-white"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              <span
                className={cn(
                  "font-medium whitespace-nowrap overflow-hidden",
                  !active && "font-normal",
                  !expanded && textCls,
                )}
              >
                {item.label}
              </span>
            </button>
          </SidebarTooltip>
        );
      })}
    </nav>
  );
}
