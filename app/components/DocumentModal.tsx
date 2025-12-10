"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

interface Document {
  id: number;
  fileName: string;
  version: string;
  size: string;
  uploadDate: string;
  userId: number;
  body: string;
}

interface DocumentModalProps {
  open: boolean;
  document: Document | null;
  onClose: () => void;
}

export function DocumentModal({ open, document, onClose }: DocumentModalProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId: document?.id }),
      });
      setAnalyzed(true);
    } catch (error) {
      console.error("Ощибка брат", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClose = () => {
    setAnalyzed(false);
    onClose();
  };

  if (!document) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        Детальная информация о документе <b>{document.fileName}</b>
      </DialogTitle>
      <DialogContent dividers>
        <div className="mb-2">
          <div className="grid border-b border-b-amber-200">
            <span className="text-lg text-gray-800 font-bold">
              ID документа
            </span>
            <span className="mb-2">{document.id}</span>
          </div>
          <div className="grid border-b border-b-amber-200">
            <span className="text-lg text-gray-800 font-bold">
              Название файла
            </span>
            <span className="mb-2">{document.fileName}</span>
          </div>
          <div className="grid border-b border-b-amber-200">
            <span className="text-lg text-gray-800 font-bold">Версия</span>
            <span className="mb-2">{document.version}</span>
          </div>
          <div className="grid border-b border-b-amber-200">
            <span className="text-lg text-gray-800 font-bold">Размер</span>
            <span className="mb-2">{document.size}</span>
          </div>
          <div className="grid border-b border-b-amber-200">
            <span className="text-lg text-gray-800 font-bold">
              Дата загрузки
            </span>
            <span className="mb-2">{document.uploadDate}</span>
          </div>
          <div className="grid border-b border-b-amber-200">
            <span className="text-lg text-gray-800 font-bold">
              Пользователь
            </span>
            <span className="mb-2">User ID: {document.userId}</span>
          </div>
          <div className="grid">
            <span className="text-lg text-gray-800 font-bold">Содержание</span>
            <span className="mb-2">{document.body}</span>
          </div>
        </div>
        {analyzed && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Анализ выполнен успешно!
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Закрыть
        </Button>
        <Button
          onClick={handleAnalyze}
          variant="contained"
          color="primary"
          disabled={analyzing || analyzed}
          startIcon={analyzing ? <CircularProgress size={20} /> : null}
        >
          {analyzing
            ? "Анализируется..."
            : analyzed
            ? "Проанализировано"
            : "Проанализировать"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
