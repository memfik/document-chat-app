"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import {
  Plus,
  Upload,
  BookOpen,
  ClipboardList,
  FileText,
  Handshake,
  FolderOpen,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EXPANDED = 220;
const COLLAPSED = 60;

const navItems = [
  { label: "Заявки", href: "/applications", icon: ClipboardList },
  { label: "ЗНО", href: "/zno", icon: FileText },
  { label: "Сопровождение", href: "/accompaniment", icon: Handshake },
  { label: "Рамочный договор", href: "/rd", icon: FolderOpen },
  { label: "Отчеты", href: "/report", icon: BarChart2 },
];

const docItems = [
  { label: "Инструкция", href: "https://contract.jusanmobile.kz/manual.pdf" },
  {
    label: "Инструкция рамочная",
    href: "https://contract.jusanmobile.kz/manual_ex1.pdf",
  },
  {
    label: "Рекомендации",
    href: "https://contract.jusanmobile.kz/recomend.pdf",
  },
];

function DocsDropdown({ expanded }: { expanded: boolean }) {
  const [open, setOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const popupEl = document.getElementById("docs-dropdown-portal");
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        !(popupEl && popupEl.contains(target))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => {
    if (!expanded && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.top, left: rect.right + 8 });
    }
    setOpen((v) => !v);
  };

  const dropdownItems = (
    <>
      {docItems.map((item) => (
        <button
          key={item.href}
          onClick={() => {
            window.open(item.href, "_blank");
            setOpen(false);
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
        >
          {item.label}
        </button>
      ))}
    </>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        ref={buttonRef}
        title={expanded ? undefined : "Инструкции"}
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-muted-foreground hover:bg-muted/50 text-sm transition-colors mb-0.5",
          expanded ? "justify-start" : "justify-center px-2",
        )}
      >
        <BookOpen className="size-4 shrink-0" />
        {expanded && (
          <>
            <span className="flex-1 text-left">Инструкции</span>
            <ChevronDown
              className={cn(
                "size-3.5 ml-auto transition-transform",
                open && "rotate-180",
              )}
            />
          </>
        )}
      </button>
      {open && expanded && (
        <div className="absolute z-50 bg-popover border border-border rounded-lg shadow-lg overflow-hidden w-48 left-0 top-full mt-1">
          {dropdownItems}
        </div>
      )}
      {open &&
        !expanded &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="docs-dropdown-portal"
            className="fixed z-[9999] bg-popover border border-border rounded-lg shadow-lg overflow-hidden w-48"
            style={{ top: popupPos.top, left: popupPos.left }}
          >
            {dropdownItems}
          </div>,
          document.body,
        )}
    </div>
  );
}

function ImportDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Импорт файлов</DialogTitle>
        </DialogHeader>
        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-[#f96800] transition-colors">
          <p className="text-sm text-muted-foreground">
            Нажмите или перетащите файл
          </p>
          <input type="file" className="hidden" multiple />
        </label>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button className="bg-[#f96800] text-white hover:bg-[#e05a00]">
            Загрузить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [layoutExpanded, setLayoutExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [importOpen, setImportOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setLayoutExpanded(false);
    } else {
      const t = setTimeout(() => setLayoutExpanded(true), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleNavClick = (href: string) => {
    router.push(href);
    onMobileClose?.();
  };

  const NavList = ({ forceExpanded = false }: { forceExpanded?: boolean }) => {
    const expanded = forceExpanded || layoutExpanded;
    return (
      <nav className="flex-1 px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              title={expanded ? undefined : item.label}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "w-full flex items-center gap-2 rounded-md text-sm transition-colors mb-0.5",
                expanded ? "px-3 py-1.5" : "justify-center px-2 py-1.5",
                active
                  ? "bg-[#f96800] text-white"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {expanded && (
                <span
                  className={cn("font-medium", active ? "" : "font-normal")}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  };

  const ActionButtons = ({
    forceExpanded = false,
  }: {
    forceExpanded?: boolean;
  }) => {
    const expanded = forceExpanded || layoutExpanded;
    return (
      <div className="px-2 pt-2 pb-1">
        <button
          title={expanded ? undefined : "Новая Ф16"}
          onClick={() => {
            router.push("/new-application");
            onMobileClose?.();
          }}
          className={cn(
            "w-full flex items-center gap-2 rounded-md text-sm transition-colors mb-0.5",
            expanded ? "px-3 py-1.5" : "justify-center px-2 py-1.5",
            isActive("/new-application")
              ? "bg-[#f96800] text-white"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
          )}
        >
          <Plus className="size-4 shrink-0" />
          {expanded && <span className="font-medium">Новая Ф16</span>}
        </button>
        <button
          title={expanded ? undefined : "Импорт"}
          onClick={() => setImportOpen(true)}
          className={cn(
            "w-full flex items-center gap-2 rounded-md text-sm text-muted-foreground hover:bg-muted/50 transition-colors mb-0.5",
            expanded ? "px-3 py-1.5" : "justify-center px-2 py-1.5",
          )}
        >
          <Upload className="size-4 shrink-0" />
          {expanded && <span>Импорт</span>}
        </button>
        <DocsDropdown expanded={expanded} />
      </div>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={onMobileClose} />
          <div className="relative z-50 flex flex-col w-full bg-card border-r border-border h-full">
            <div className="flex justify-end px-2 py-2 border-b border-border">
              <Button variant="ghost" size="icon-sm" onClick={onMobileClose}>
                <X className="size-4" />
              </Button>
            </div>
            <ActionButtons forceExpanded />
            <div className="border-t border-dashed" />
            <NavList forceExpanded />
          </div>
        </div>
      )}
      <div
        className="hidden md:flex flex-col h-full bg-card border-r border-border overflow-hidden transition-[width] duration-200 will-change-[width] shrink-0"
        style={{ width: open ? EXPANDED : COLLAPSED }}
      >
        <div
          className={cn(
            "flex px-1 py-3.5",
            layoutExpanded ? "justify-end" : "justify-center",
          )}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        </div>
        <ActionButtons />
        <div className="border-t border-dashed" />
        <NavList />
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}
