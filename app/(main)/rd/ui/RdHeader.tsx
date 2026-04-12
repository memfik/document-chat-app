"use client";

import { Pencil, Save, X } from "lucide-react";

interface RdHeaderProps {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function RdHeader({ editing, onEdit, onSave, onCancel }: RdHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-lg font-semibold">Рамочный договор</h1>
      <div className="flex gap-2">
        {editing ? (
          <>
            <button
              onClick={onSave}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors"
            >
              <Save className="size-4" />
              Сохранить
            </button>
            <button
              onClick={onSave}
              className="sm:hidden flex items-center justify-center size-8 rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors"
            >
              <Save className="size-4" />
            </button>
            <button
              onClick={onCancel}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              <X className="size-4" />
              Отмена
            </button>
            <button
              onClick={onCancel}
              className="sm:hidden flex items-center justify-center size-8 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              <X className="size-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              <Pencil className="size-4" />
              Редактировать
            </button>
            <button
              onClick={onEdit}
              className="sm:hidden flex items-center justify-center size-8 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              <Pencil className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
