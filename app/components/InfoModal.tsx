"use client";

import CloseIcon from "@mui/icons-material/Close";

interface Field {
  label: string;
  value: React.ReactNode;
}

interface InfoModalProps {
  title: string;
  fields: Field[];
  onClose: () => void;
}

export function InfoModal({ title, fields, onClose }: InfoModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <div className="px-6 py-4 grid grid-cols-2 gap-x-8 gap-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <p className="text-xs text-gray-400 mb-0.5">{field.label}</p>
              <p className="text-sm text-gray-800 font-medium">{field.value || "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
