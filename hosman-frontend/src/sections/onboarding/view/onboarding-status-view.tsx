import { Box, Button, Card, CardContent, Container, Grid, Typography, CircularProgress, Fade } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnBoardingView() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Appointment Management',
      description: 'Manage patient appointments, view doctor availability, and handle scheduling.',
      image: '/images/appointments.svg', // Add your image path here
    },
    {
      title: 'Doctors Management',
      description: 'View doctor profiles, assign shifts, and track doctor schedules.',
      image: '/images/doctors.svg', // Add your image path here
    },
    {
      title: 'Staff Management',
      description: 'Manage hospital staff, assign roles, and track staff performance.',
      image: '/images/staff.svg', // Add your image path here
    },
    {
      title: 'Reports',
      description: 'Generate reports on appointments, patient data, and staff performance.',
      image: '/images/reports.svg', // Add your image path here
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const startDashboard = () => {
    // Redirect to the dashboard after onboarding is complete
    navigate('/dashboard'); // Adjust the URL to match your routing
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" py={4}>
        <Typography variant="h4" gutterBottom>
          Welcome to Hosman!
        </Typography>
        <Typography variant="body1" paragraph>
          As the hospital administrator, you have full control over the hospital management system.
          Let’s walk you through the key features.
        </Typography>

        {/* Progress Indicator */}
        <Box mb={4}>
          <CircularProgress variant="determinate" value={(currentStep / steps.length) * 100} />
        </Box>

        {/* Onboarding Step */}
        <Fade in={true} timeout={1000}>
          <Card>
            <CardContent>
              {/* Step Image */}
              <Box mb={2}>
                <img
                  src={steps[currentStep - 1].image}
                  alt={steps[currentStep - 1].title}
                  width="100%"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </Box>

              <Typography variant="h5" gutterBottom>
                {steps[currentStep - 1].title}
              </Typography>
              <Typography variant="body1" paragraph>
                {steps[currentStep - 1].description}
              </Typography>

              {/* Buttons */}
              <Box display="flex" justifyContent="center" mt={2}>
                {currentStep < steps.length ? (
                  <Button variant="contained" color="primary" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={startDashboard}>
                    Go to Dashboard
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    </Container>
  );
}
