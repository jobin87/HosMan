import Typography from "@mui/material/Typography";

import { DashboardContent } from "src/layouts/dashboard";

import { AnalyticsCurrentVisits } from "../analytics-current-visits";
import { AnalyticsTrafficBySite } from "../analytics-traffic-by-site";
import { AnalyticsConversionRates } from "../analytics-conversion-rates";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import { Avatar, Paper } from "@mui/material";
// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography
        variant="h4"
        sx={{ mb: { xs: 6, md: 5 }, color: "primary.main" }}
      >
        Empowering  health with personalized care
      </Typography>

      <Typography
        variant="h4"
        sx={{ mb: { xs: 6, md: 5 }}}
      >
        HosMan is your perfect hospital partner here it shows how to manage 
      </Typography>
      

      <Grid container spacing={3} >
      <Grid color={red} mt={3}>
        <Paper>
          <Avatar></Avatar>
        </Paper>

      </Grid>
        <Grid xs={12} md={6} lg={12} sx={{}}>
          <AnalyticsTrafficBySite
            title="Statistics"
            list={[
              { value: "Appointments", label: "Appointments- {check details}", total: 234 },
              { value: "Reports", label: "Reports", total: 34 },
              { value: "New-Patients", label: "New-Patients", total: 23 },
              { value: "Total-Beds", label: "Total-Beds", total: 834 },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={5} mt={1}>
          <AnalyticsCurrentVisits
            title="Patients-Visit-By-Departments"
            chart={{
              series: [
                { label: "Cardiology", value: 3500 },
                { label: "Neurology", value: 2500 },
                { label: "Dermatology", value: 1500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={5} mt={1}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ["Italy", "Japan", "China", "Canada", "France"],
              series: [
                { name: "2022", data: [44, 55, 41, 64, 22] },
                { name: "2023", data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>
        


      </Grid>
    </DashboardContent>
  );
}
