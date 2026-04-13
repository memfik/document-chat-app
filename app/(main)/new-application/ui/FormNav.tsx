"use client";

import { STEPS } from "../data/options";
import { Button } from "@/components/ui/button";

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
        <Button variant="outline" onClick={onBack}>
          {activeStep === 0 ? "Отмена" : "Назад"}
        </Button>

        {activeStep < STEPS.length - 1 ? (
          <Button
            onClick={onNext}
            className="bg-[#f96800] text-white hover:bg-[#e05a00] font-medium"
          >
            Далее
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            className="bg-[#f96800] text-white hover:bg-[#e05a00] font-medium"
          >
            Отправить
          </Button>
        )}
      </div>
    </>
  );
}
