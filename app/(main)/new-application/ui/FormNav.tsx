"use client";

import { STEPS } from "../data/options";

interface FormNavProps {
  activeStep: number;
  errorsCount: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FormNav({
  activeStep,
  errorsCount,
  onBack,
  onNext,
  onSubmit,
}: FormNavProps) {
  return (
    <>
      {errorsCount > 0 && (
        <p className="text-sm text-destructive mt-4 text-right">
          Заполните все обязательные поля ({errorsCount} ошибок)
        </p>
      )}
      <div className="flex justify-between mt-6 pt-4 border-t border-border/50">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
        >
          {activeStep === 0 ? "Отмена" : "Назад"}
        </button>

        {activeStep < STEPS.length - 1 ? (
          <button
            onClick={onNext}
            className="px-4 py-2 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors font-medium"
          >
            Далее
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors font-medium"
          >
            Отправить
          </button>
        )}
      </div>
    </>
  );
}
