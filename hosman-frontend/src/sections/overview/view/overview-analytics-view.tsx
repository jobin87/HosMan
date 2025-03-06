import { useState, useEffect } from "react";
import { Snackbar, Alert, Grid, Paper, Box, Typography } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { Patientsdischarge } from "../patient-discharge";
import AppointmentsChartPage from "../appointment-chart";
import BloodBankPage from "../blood-bank";
import StaffLeavePage from "../staff-leave";
import { useUser } from "src/hooks/use-user";

function NavItem({ children, bgcolor }: { children: React.ReactNode; bgcolor: string }) {
  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "100%", bgcolor }}>
      {children}
    </Paper>
  );
}

export function OverviewAnalyticsView() {
  const { role } = useUser(); // Fetch user role
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Check if welcome message was already shown in this session
    const hasShownWelcome = sessionStorage.getItem("welcomeMessageShown");

    if (role === "Manager" && !hasShownWelcome) {
      setOpenSnackbar(true);
      sessionStorage.setItem("welcomeMessageShown", "true"); // Mark as shown
    }
  }, [role]);

  return (
    <DashboardContent maxWidth="xl">
      {/* Welcome Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={700}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          🎉 Welcome to the Dashboard!
        </Alert>
      </Snackbar>

      <Grid container spacing={1.5} borderRadius={9}>
        <Grid item xs={12} lg={12}>
          <NavItem bgcolor="#FEFCFF">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    bgcolor: "#525DC3",
                    height: { xs: "auto", lg: 150 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                    Total Patients
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                    1,200
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    bgcolor: "#D8DABA",
                    height: { xs: "auto", lg: 150 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                    Discharged Today
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                    85
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    bgcolor: "#62F6F1",
                    height: { xs: "auto", lg: 150 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                    Scheduled Surgeries
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                    45
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </NavItem>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ mt: 2 }}>
          <NavItem bgcolor="">
            <Patientsdischarge />
          </NavItem>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ mt: 2 }}>
          <NavItem bgcolor="">
            <AppointmentsChartPage />
          </NavItem>
        </Grid>
        <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
          <NavItem bgcolor="">
            <BloodBankPage />
          </NavItem>
        </Grid>
        <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
          <NavItem bgcolor="">
            <StaffLeavePage />
          </NavItem>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
