import { Grid, Paper, Box } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { FirstGrid } from "../first-grid";
import { SecondGrid } from "../second-grid";
import { ThirdGrid } from "../third-grid";
import { Patientsdischarge } from "../patient-discharge";
import AppointmentsPage from "../appointment-chart";
import AppointmentsChartPage from "../appointment-chart";

// ----------------------------------------------------------------------
function NavItem({
  children,
  bgcolor,
}: {
  children: React.ReactNode;
  bgcolor: string;
}) {
  return (
    <Paper
      elevation={2}
      sx={{ p: 2, textAlign: "center", height: "100%", bgcolor }}
    >
      {children}
    </Paper>
  );
}

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={1.5} borderRadius={9}>
        {/* First Section: Three Colored Grids Inside a Box */}
        <Grid item xs={12} lg={9}>
          <NavItem bgcolor="#FEFCFF">
            <Grid container spacing={3}>
              <Grid item xs={4} md={4} lg={4} >
                <Box sx={{
                    bgcolor: "#FFCBE3",
                    height: {
                      xs: 100,
                      lg: 150,
                    },
                  }}></Box>
                  
              </Grid>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    bgcolor: "#D8DABA",
                    height: {
                      xs: 100,
                      lg: 150,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <Box
                  sx={{
                    bgcolor: "#96D5BC",
                    height: {
                      xs: 100,
                      lg: 150,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </NavItem>
        </Grid>

        {/* Second Section */}
        <Grid
          item
          xs={4}
          lg={3}
          sx={{
            height: {
              xs: 120,
              lg: 150,
            },mt:3
          }}
        >
          <NavItem bgcolor="#FEFCFF">
            <SecondGrid />
          </NavItem>
        </Grid>
        <Grid
          item
          xs={8}
          lg={3}
          sx={{
            display: { lg: "none", xs: "block" },
            height: {
              xs: 120,
              lg: 400,
            },
            mt:3
          }}
        >
          <NavItem bgcolor="FEFCFF">
            <SecondGrid />
          </NavItem>
        </Grid>

        {/* Third Section with Margin-Top */}
        <Grid item xs={12} lg={6} sx={{ mt: 2 , height:{
            lg:330
        }}}>
          <NavItem bgcolor="">
            <Patientsdischarge/>
          </NavItem>
        </Grid>
        <Grid item xs={12}lg={6} sx={{ mt: 2 ,height:{
            lg:330}}}>
          <NavItem bgcolor="">
            <AppointmentsChartPage/>
          </NavItem>
        </Grid>
        <Grid item xs={12}lg={6} sx={{ mt: 2 }}>
          <NavItem bgcolor="#205BA3">
            <ThirdGrid />
          </NavItem>
        </Grid>
        <Grid item xs={12}lg={6} sx={{ mt: 2 }}>
          <NavItem bgcolor="#205BA3">
            <ThirdGrid />
          </NavItem>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}