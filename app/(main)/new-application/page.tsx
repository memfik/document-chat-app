"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/app/hooks/useIsMobile";

import { FormStepper } from "./ui/FormStepper";
import { FormNav } from "./ui/FormNav";
import { Step1Justification } from "./ui/Step1Justification";
import { Step2Positions } from "./ui/Step2Positions";
import { Step3Approval } from "./ui/Step3Approval";
import { Step4Attachments } from "./ui/Step4Attachments";

import { emptyPosition, type Position, type Attachments } from "./data/options";

let nextId = 10;

export default function NewApplicationPage() {
  const router = useRouter();
  const isMobile = useIsMobile(600);

  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [benefits, setBenefits] = useState("");
  const [losses, setLosses] = useState("");
  const [positions, setPositions] = useState<Position[]>([emptyPosition(1)]);
  const [approvers, setApprovers] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<Attachments>({
    spec: null,
    extra: null,
    contract: null,
  });
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => {
        setToast(false);
        router.push("/applications");
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [toast, router]);

  const updatePosition = (id: number, field: keyof Position, value: string) =>
    setPositions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );

  const clearPosition = (id: number) =>
    setPositions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...emptyPosition(id), requestType: p.requestType } : p,
      ),
    );

  const removePosition = (id: number) =>
    setPositions((prev) => prev.filter((p) => p.id !== id));

  const addPosition = () =>
    setPositions((prev) => [...prev, emptyPosition(nextId++)]);

  const validateStep = (step: number): Set<string> => {
    const errs = new Set<string>();
    if (step === 0) {
      if (!title.trim()) errs.add("title");
      if (!purpose.trim()) errs.add("purpose");
    }
    if (step === 1) {
      positions.forEach((p) => {
        if (!p.product.trim()) errs.add(`${p.id}.product`);
        if (!p.qty.trim() || parseFloat(p.qty) <= 0) errs.add(`${p.id}.qty`);
        if (!p.deliveryPlace.trim()) errs.add(`${p.id}.deliveryPlace`);
        if (!p.dateFrom) errs.add(`${p.id}.dateFrom`);
        if (!p.dateTo) errs.add(`${p.id}.dateTo`);
        if (!p.priceNoVat.trim() || parseFloat(p.priceNoVat) <= 0)
          errs.add(`${p.id}.priceNoVat`);
      });
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep(activeStep);
    setErrors(errs);
    if (errs.size === 0) setActiveStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors(new Set());
    if (activeStep === 0) router.back();
    else setActiveStep((s) => s - 1);
  };

  const handleSubmit = () => setToast(true);
  return (
    <div className="py-6 md:py-6 px-4 md:px-6 max-w-7xl mx-auto">
      <FormStepper activeStep={activeStep} isMobile={isMobile} />

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 md:p-6">
          {activeStep === 0 && (
            <Step1Justification
              title={title}
              purpose={purpose}
              benefits={benefits}
              losses={losses}
              errors={errors}
              onTitle={setTitle}
              onPurpose={setPurpose}
              onBenefits={setBenefits}
              onLosses={setLosses}
            />
          )}
          {activeStep === 1 && (
            <Step2Positions
              positions={positions}
              errors={errors}
              onUpdate={updatePosition}
              onClear={clearPosition}
              onRemove={removePosition}
              onAdd={addPosition}
            />
          )}
          {activeStep === 2 && (
            <Step3Approval
              approvers={approvers}
              onApproversChange={setApprovers}
            />
          )}
          {activeStep === 3 && (
            <Step4Attachments
              attachments={attachments}
              onChange={(patch) => setAttachments((a) => ({ ...a, ...patch }))}
            />
          )}

          <FormNav
            activeStep={activeStep}
            errorsCount={errors.size}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium">
          Форма отправлена успешно!
        </div>
      )}
    </div>
  );
}
