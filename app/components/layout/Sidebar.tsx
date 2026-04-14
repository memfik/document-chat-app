"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarActions } from "./sidebar/SidebarActions";
import { SidebarUserProfile } from "./sidebar/SidebarUserProfile";
import { ImportDialog } from "./sidebar/ImportDialog";

const EXPANDED = 220;
const COLLAPSED = 60;

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [importOpen, setImportOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const handleNavClick = (href: string) => {
    router.push(href);
    onMobileClose?.();
  };

  const textCls = open
    ? "max-w-[160px] opacity-100 transition-[max-width,opacity] duration-150 delay-100"
    : "max-w-0 opacity-0 transition-[max-width,opacity] duration-150";

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
            <SidebarNav
              expanded
              isActive={isActive}
              onNavClick={handleNavClick}
              textCls=""
            />
            <div className="border-t border-dashed" />
            <SidebarActions
              expanded
              onImportOpen={() => setImportOpen(true)}
              textCls=""
            />
            <SidebarUserProfile expanded textCls="" />
          </div>
        </div>
      )}

      <div
        className="hidden md:flex flex-col h-full bg-card border-r border-border overflow-hidden transition-[width] duration-200 will-change-[width] shrink-0"
        style={{ width: open ? EXPANDED : COLLAPSED }}
      >
        <div className="flex items-center justify-between px-1 py-3.5 min-w-0">
          {open && (
            <a href="/applications" className="pl-2 shrink-0">
              <img
                src="/logo-jusanmobile.png"
                alt="Logo"
                className="h-9 object-contain"
              />
            </a>
          )}
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setOpen((v) => !v)}
            className={cn(!open && "mx-auto")}
          >
            {open ? (
              <ChevronLeft className="size-5" />
            ) : (
              <ChevronRight className="size-5" />
            )}
          </Button>
        </div>

        <SidebarNav
          expanded={open}
          isActive={isActive}
          onNavClick={handleNavClick}
          textCls={textCls}
        />
        <div className="border-t border-dashed" />
        <SidebarActions
          expanded={open}
          onImportOpen={() => setImportOpen(true)}
          textCls={textCls}
        />
        <SidebarUserProfile expanded={open} textCls={textCls} />
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </>
  );
}
