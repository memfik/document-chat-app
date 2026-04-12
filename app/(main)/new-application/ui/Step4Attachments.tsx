"use client";

import { FileInput } from "./FileInput";
import type { Attachments } from "../data/options";

interface Step4Props {
  attachments: Attachments;
  onChange: (patch: Partial<Attachments>) => void;
}

export function Step4Attachments({ attachments, onChange }: Step4Props) {
  return (
    <div>
      <p className="text-sm font-medium mb-4">Вложения</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FileInput
          label="Техническая спецификация"
          file={attachments.spec}
          onChange={(f) => onChange({ spec: f })}
        />
        <FileInput
          label="Дополнительные файлы"
          file={attachments.extra}
          onChange={(f) => onChange({ extra: f })}
        />
        <FileInput
          label="Договор"
          file={attachments.contract}
          onChange={(f) => onChange({ contract: f })}
        />
      </div>
    </div>
  );
}
