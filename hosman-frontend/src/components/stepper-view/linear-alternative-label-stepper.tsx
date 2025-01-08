import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'src/store';

// ----------------------------------------------------------------------

type StepperProps = {
  children: React.ReactNode;
  steps: string[];
  finalStepSubmitFunction: () => void;
  finalStepMessage: string;
  finalStepValidation: boolean | undefined;
};

export function LinearAlternativeLabel({
  children,
  steps,
  finalStepMessage,
  finalStepValidation,
  finalStepSubmitFunction,
}: StepperProps) {
  const { step, enabled } = useAppSelector((state) => state.app.onboarding.steps);

  const handleSubmit = async () => {
    if (!finalStepValidation) return;
    finalStepSubmitFunction();
  };

  return (
    <>
      <Stepper activeStep={step} alternativeLabel sx={{ overflow: 'scroll' }}>
        {steps.map((label, index) => {
          const stepProps: {
            completed?: boolean;
          } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps} sx={{ whiteSpace: { xs: 'nowrap', lg: 'wrap' } }}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {step === steps.length ? (
        <>
          <Paper
            sx={{
              my: 3,
              p: 3,
              borderRadius: 2,
              minHeight: 400,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
          >
            <Box>
              <Typography variant="subtitle1">Finalize and Send for Review</Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
                You’re all set! Click the review button to submit your details. Our team will review
                your information and notify you!
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Button variant="contained" onClick={() => handleSubmit()}>
                Send For Review
              </Button>
            </Box>
          </Paper>
        </>
      ) : (
        <>
          <Box sx={{ my: 3, minHeight: 400, borderRadius: 2 }}>{children}</Box>
        </>
      )}
    </>
  );
}
