"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function ImportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Импорт файлов</DialogTitle>
        </DialogHeader>
        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-[#f96800] transition-colors">
          <p className="text-sm text-muted-foreground">Нажмите или перетащите файл</p>
          <input type="file" className="hidden" multiple />
        </label>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button className="bg-[#f96800] text-white hover:bg-[#e05a00]">Загрузить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
