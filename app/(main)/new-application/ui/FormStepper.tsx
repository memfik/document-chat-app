"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEPS } from "../data/options";

interface FormStepperProps {
  activeStep: number;
  isMobile: boolean;
}

export function FormStepper({ activeStep, isMobile }: FormStepperProps) {
  return (
    <div className="bg-card border border-border rounded-lg mb-4 px-4 md:px-6 py-4">
      {isMobile ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Шаг {activeStep + 1} из {STEPS.length}
          </p>
          <p className="text-sm font-semibold">{STEPS[activeStep]}</p>
        </div>
      ) : (
        <div className="flex items-center">
          {STEPS.map((label, idx) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    idx < activeStep
                      ? "bg-[#f96800] text-white"
                      : idx === activeStep
                        ? "bg-[#f96800] text-white ring-2 ring-[#f96800] ring-offset-2"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {idx < activeStep ? (
                    <Check className="size-4" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <p
                  className={cn(
                    "mt-1.5 text-xs text-center max-w-[90px]",
                    idx === activeStep
                      ? "text-foreground font-medium"
                      : "text-muted-foreground",
                  )}
                >
                  {label}
                </p>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 mb-5",
                    idx < activeStep ? "bg-[#f96800]" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
