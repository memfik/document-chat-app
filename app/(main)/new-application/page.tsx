"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Paper, Box, Typography, Snackbar, Alert } from "@mui/material";

import { FormStepper } from "./ui/FormStepper";
import { FormNav } from "./ui/FormNav";
import { Step1Justification } from "./ui/Step1Justification";
import { Step2Positions } from "./ui/Step2Positions";
import { Step3Approval } from "./ui/Step3Approval";
import { Step4Attachments } from "./ui/Step4Attachments";

import {
  emptyPosition,
  type Position,
  type Attachments,
} from "./data/options";

let nextId = 10;

export default function NewApplicationPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [benefits, setBenefits] = useState("");
  const [losses, setLosses] = useState("");
  const [positions, setPositions] = useState<Position[]>([emptyPosition(1)]);
  const [approvers, setApprovers] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<Attachments>({ spec: null, extra: null, contract: null });
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updatePosition = (id: number, field: keyof Position, value: string) =>
    setPositions((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const clearPosition = (id: number) =>
    setPositions((prev) =>
      prev.map((p) => (p.id === id ? { ...emptyPosition(id), requestType: p.requestType } : p))
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
        if (!p.priceNoVat.trim() || parseFloat(p.priceNoVat) <= 0) errs.add(`${p.id}.priceNoVat`);
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

  const handleSubmit = () => setSnackbarOpen(true);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    router.push("/applications");
  };

  return (
    <Box py={{ xs: 3, md: 6 }} px={{ xs: 1.5, md: 6 }} maxWidth="1280px" mx="auto">
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={3}>
        Новая заявка Ф16
      </Typography>

      <FormStepper activeStep={activeStep} isMobile={isMobile} />

      <Paper elevation={2}>
        <Box p={{ xs: 2, md: 3 }}>
          {activeStep === 0 && (
            <Step1Justification
              title={title} purpose={purpose} benefits={benefits} losses={losses}
              errors={errors}
              onTitle={setTitle} onPurpose={setPurpose} onBenefits={setBenefits} onLosses={setLosses}
            />
          )}
          {activeStep === 1 && (
            <Step2Positions
              positions={positions} errors={errors}
              onUpdate={updatePosition} onClear={clearPosition}
              onRemove={removePosition} onAdd={addPosition}
            />
          )}
          {activeStep === 2 && (
            <Step3Approval approvers={approvers} onApproversChange={setApprovers} />
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
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Форма отправлена успешно!
        </Alert>
      </Snackbar>
    </Box>
  );
}
