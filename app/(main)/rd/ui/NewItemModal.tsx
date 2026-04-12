"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";

interface NewItemModalProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

export function NewItemModal({ title, onClose, onSave }: NewItemModalProps) {
  const [value, setValue] = useState("");

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Popup className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs bg-card border border-border rounded-xl shadow-xl outline-none">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold">{title}</p>
        </div>
        <div className="px-4 py-4">
          <input
            autoFocus
            className="input-base"
            placeholder="Введите название..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim()) onSave(value.trim());
              if (e.key === "Escape") onClose();
            }}
          />
        </div>
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Отмена
          </button>
          <button
            disabled={!value.trim()}
            onClick={() => value.trim() && onSave(value.trim())}
            className="px-3 py-1.5 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Добавить
          </button>
        </div>
      </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
