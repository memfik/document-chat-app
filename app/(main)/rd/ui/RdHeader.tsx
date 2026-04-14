"use client";

import { Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RdHeaderProps {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function RdHeader({ editing, onEdit, onSave, onCancel }: RdHeaderProps) {
  return (
    <div className="flex justify-end mb-3">
      <div className="flex gap-2">
        {editing ? (
          <>
            <Button
              onClick={onSave}
              className="hidden sm:flex items-center gap-2 bg-[#f96800] text-white hover:bg-[#e05a00]"
            >
              <Save className="size-4" />
              Сохранить
            </Button>
            <Button
              onClick={onSave}
              size="icon"
              className="sm:hidden bg-[#f96800] text-white hover:bg-[#e05a00]"
            >
              <Save className="size-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="hidden sm:flex items-center gap-2"
            >
              <X className="size-4" />
              Отмена
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onCancel}
              className="sm:hidden"
            >
              <X className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={onEdit}
              className="hidden sm:flex items-center gap-2"
            >
              <Pencil className="size-4" />
              Редактировать
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
              className="sm:hidden"
            >
              <Pencil className="size-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
