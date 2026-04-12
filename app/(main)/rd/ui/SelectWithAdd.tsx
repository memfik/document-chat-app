"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
        <div className="flex-1">
          <label className="block text-xs text-muted-foreground mb-1">
            {label}
          </label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={!editing}
            className="select-base"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        {editing && (
          <button
            onClick={() => setShowModal(true)}
            title={`Создать новый: ${label}`}
            className="size-8 shrink-0 flex items-center justify-center border border-border rounded hover:bg-muted transition-colors"
          >
            <Plus className="size-4" />
          </button>
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
