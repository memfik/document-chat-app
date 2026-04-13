"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface NewItemModalProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

export function NewItemModal({ title, onClose, onSave }: NewItemModalProps) {
  const [value, setValue] = useState("");

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-xs">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Введите название..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) onSave(value.trim());
            if (e.key === "Escape") onClose();
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            disabled={!value.trim()}
            onClick={() => value.trim() && onSave(value.trim())}
            className="bg-[#f96800] text-white hover:bg-[#e05a00]"
          >
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
