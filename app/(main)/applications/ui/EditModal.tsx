"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";

export interface RowExtra {
  znoNum: string;
  paymentFile: File | null;
  paymentFileName: string;
}

interface EditModalProps {
  rowId: string;
  extra: RowExtra;
  onClose: () => void;
  onSave: (data: RowExtra) => void;
}

export function EditModal({ rowId, extra, onClose, onSave }: EditModalProps) {
  const [znoNum, setZnoNum] = useState(extra.znoNum);
  const [file, setFile] = useState<File | null>(extra.paymentFile);
  const [fileName, setFileName] = useState(extra.paymentFileName);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Popup className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs bg-card border border-border rounded-xl shadow-xl outline-none">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold">Редактирование — {rowId}</p>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-muted text-muted-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-4 py-4 flex flex-col gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              № ЗНО
            </label>
            <input
              className="input-base"
              placeholder="Введите номер ЗНО..."
              value={znoNum}
              onChange={(e) => setZnoNum(e.target.value)}
            />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Платежный документ
            </p>
            <label className="flex items-center gap-2 px-3 py-3 border border-dashed border-border rounded-md cursor-pointer hover:border-[#f96800] transition-colors">
              <Upload className="size-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground flex-1 truncate">
                {fileName || "Нажмите для загрузки файла..."}
              </span>
              <input type="file" className="hidden" onChange={handleFile} />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-4 py-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={() =>
              onSave({ znoNum, paymentFile: file, paymentFileName: fileName })
            }
            className="px-3 py-1.5 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors"
          >
            Сохранить
          </button>
        </div>
      </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
