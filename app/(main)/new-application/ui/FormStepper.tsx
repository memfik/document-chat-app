"use client";

import { Paper, Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import { STEPS } from "../data/options";

interface FormStepperProps {
  activeStep: number;
  isMobile: boolean;
}

export function FormStepper({ activeStep, isMobile }: FormStepperProps) {
  return (
    <Paper elevation={2} sx={{ mb: 3 }}>
      <Box px={{ xs: 1.5, md: 3 }} py={2}>
        {isMobile ? (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Шаг {activeStep + 1} из {STEPS.length}
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {STEPS[activeStep]}
            </Typography>
          </Box>
        ) : (
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Box>
    </Paper>
  );
}
