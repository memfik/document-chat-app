"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const docItems = [
  { label: "Инструкция", href: "https://contract.jusanmobile.kz/manual.pdf" },
  { label: "Инструкция рамочная", href: "https://contract.jusanmobile.kz/manual_ex1.pdf" },
  { label: "Рекомендации", href: "https://contract.jusanmobile.kz/recomend.pdf" },
];

export function DocsDropdown({ expanded }: { expanded: boolean }) {
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
          onClick={() => { window.open(item.href, "_blank"); setOpen(false); }}
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
          "w-full flex items-center h-8 rounded-md text-muted-foreground hover:bg-muted/50 text-sm transition-colors mb-0.5",
          expanded ? "px-3 gap-2 justify-start" : "justify-center px-2",
        )}
      >
        <BookOpen className="size-4 shrink-0" />
        {expanded && (
          <>
            <span className="flex-1 text-left">Инструкции</span>
            <ChevronDown className={cn("size-3.5 ml-auto transition-transform", open && "rotate-180")} />
          </>
        )}
      </button>
      {open && expanded && (
        <div className="absolute z-50 bg-popover border border-border rounded-lg shadow-lg overflow-hidden w-48 left-0 top-full mt-1">
          {dropdownItems}
        </div>
      )}
      {open && !expanded && typeof document !== "undefined" &&
        createPortal(
          <div
            id="docs-dropdown-portal"
            className="fixed z-9999 bg-popover border border-border rounded-lg shadow-lg overflow-hidden w-48"
            style={{ top: popupPos.top, left: popupPos.left }}
          >
            {dropdownItems}
          </div>,
          document.body,
        )}
    </div>
  );
}
