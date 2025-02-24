import { Grid, Paper, Box, Typography } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { FirstGrid } from "../first-grid";
import { SecondGrid } from "../second-grid";
import { ThirdGrid } from "../third-grid";
import { Patientsdischarge } from "../patient-discharge";
import AppointmentsChartPage from "../appointment-chart";
import BloodBankPage from "../blood-bank";
import StaffLeavePage from "../staff-leave";

// ----------------------------------------------------------------------
function NavItem({
  children,
  bgcolor,
}: {
  children: React.ReactNode;
  bgcolor: string;
}) {
  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "100%", bgcolor }}>
      {children}
    </Paper>
  );
}

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={1.5} borderRadius={9}>
        {/* First Section: Three Colored Grids Inside a Box */}
        <Grid item xs={12} lg={12}>
          <NavItem bgcolor="#FEFCFF">
            <Grid container spacing={2}>
              {/* Total Patients */}
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
                  <Typography variant="h6" sx={{ fontWeight: "bold" ,color:"white"}}>
                    Total Patients
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold",color:"white" }}>
                    1,200
                  </Typography>
                </Box>
              </Grid>

              {/* Appointments Today */}
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
                  <Typography variant="h6" sx={{ fontWeight: "bold", color:"white" }}>
                    Discharged Today
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color:"white" }}>
                    85
                  </Typography>
                </Box>
              </Grid>

              {/* Scheduled Surgeries */}
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
                  <Typography variant="h6" sx={{ fontWeight: "bold", color:"white" }}>
                    Scheduled Surgeries
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color:"white" }}>
                    45
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </NavItem>
        </Grid>

        {/* Third Section with Margin-Top */}
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
