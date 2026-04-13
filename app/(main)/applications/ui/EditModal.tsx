"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Редактирование — {rowId}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">№ ЗНО</Label>
            <Input
              placeholder="Введите номер ЗНО..."
              value={znoNum}
              onChange={(e) => setZnoNum(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Платежный документ</Label>
            <label className="flex items-center gap-2 px-3 py-3 border border-dashed border-border rounded-md cursor-pointer hover:border-[#f96800] transition-colors">
              <Upload className="size-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground flex-1 truncate">
                {fileName || "Нажмите для загрузки файла..."}
              </span>
              <input type="file" className="hidden" onChange={handleFile} />
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            onClick={() =>
              onSave({ znoNum, paymentFile: file, paymentFileName: fileName })
            }
            className="bg-[#f96800] text-white hover:bg-[#e05a00]"
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
