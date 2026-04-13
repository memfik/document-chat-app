"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APPROVERS, ED_GO_LIST } from "../data/options";
import { cn } from "@/lib/utils";

interface Step3Props {
  approvers: string[];
  onApproversChange: (v: string[]) => void;
}

function MultiSelect({
  value,
  onChange,
  options,
  placeholder = "Выберите...",
}: {
  value: string[];
  onChange: (v: string[]) => void;
  options: string[];
  placeholder?: string;
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

  const toggle = (item: string) => {
    onChange(
      value.includes(item) ? value.filter((v) => v !== item) : [...value, item],
    );
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left h-8 px-2.5 font-normal"
      >
        <span
          className={cn(
            "truncate",
            value.length === 0 ? "text-muted-foreground" : "",
          )}
        >
          {value.length === 0 ? placeholder : value.join(", ")}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </Button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  "size-4 rounded border border-border flex items-center justify-center",
                  value.includes(opt) ? "bg-[#f96800] border-[#f96800]" : "",
                )}
              >
                {value.includes(opt) && <Check className="size-3 text-white" />}
              </div>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Step3Approval({ approvers, onApproversChange }: Step3Props) {
  return (
    <div>
      <p className="text-sm font-medium mb-4">Согласование</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Согласующий</p>
            <Input value="ГО-ДЦиРС" disabled />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Согласующий</p>
            <MultiSelect
              value={approvers}
              onChange={onApproversChange}
              options={APPROVERS}
              placeholder="Выберите согласующих..."
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Кураторы статей</p>
          <MultiSelect
            value={approvers}
            onChange={onApproversChange}
            options={APPROVERS}
            placeholder="Выберите согласующих..."
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          ЭД ГО
        </p>
        <div className="flex flex-col gap-1">
          {ED_GO_LIST.map((person, i) => (
            <p key={i} className="text-sm">
              <b>Согласующий {i + 1}</b> — {person}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
