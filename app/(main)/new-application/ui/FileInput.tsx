"use client";

import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileInputProps {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
}

export function FileInput({ label, file, onChange }: FileInputProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <label className="flex items-center gap-2 px-3 py-3 border border-dashed border-border rounded-md cursor-pointer hover:border-[#f96800] transition-colors">
        <Upload className="size-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-muted-foreground flex-1 truncate">
          {file ? file.name : "Нажмите для загрузки файла..."}
        </span>
        {file && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.preventDefault();
              onChange(null);
            }}
          >
            <X className="size-3.5 text-muted-foreground" />
          </Button>
        )}
        <input
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
    </div>
  );
}
