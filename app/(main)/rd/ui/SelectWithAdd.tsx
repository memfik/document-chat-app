"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewItemModal } from "./NewItemModal";

interface SelectWithAddProps {
  label: string;
  value: string;
  options: string[];
  editing: boolean;
  onChange: (v: string) => void;
  onNewItem: (v: string) => void;
  modalTitle: string;
}

export function SelectWithAdd({
  label,
  value,
  options,
  editing,
  onChange,
  onNewItem,
  modalTitle,
}: SelectWithAddProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex gap-2 items-end">
        <div className="flex-1 flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">{label}</Label>
          <Select
            value={value}
            onValueChange={(val) => val && onChange(val)}
            disabled={!editing}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {editing && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowModal(true)}
            title={`Создать новый: ${label}`}
            className="shrink-0"
          >
            <Plus className="size-4" />
          </Button>
        )}
      </div>
      {showModal && (
        <NewItemModal
          title={modalTitle}
          onClose={() => setShowModal(false)}
          onSave={(v) => {
            onNewItem(v);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
