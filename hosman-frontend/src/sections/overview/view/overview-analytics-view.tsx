import Typography from "@mui/material/Typography";

import { DashboardContent } from "src/layouts/dashboard";

import { AnalyticsCurrentVisits } from "../analytics-current-visits";
import { AnalyticsTrafficBySite } from "../analytics-traffic-by-site";
import { AnalyticsConversionRates } from "../analytics-conversion-rates";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import { HospitalInfo } from "../hospital-info";
import { HospitalFlipping } from "../hospital-flipping-card";
// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography
        variant="h4"
        sx={{ mb: { xs: 6, md: 5 }, color: "primary.main" }}
      >
                HosMan is your perfect hospital partner here it shows how to manage 

      </Typography>
      

      <Grid container spacing={3} >
      <Grid item sx={{ backgroundColor: red }} xs={12} md={6} lg={6} xl={7} mb={3}>
        <HospitalInfo 
          message="treating hearts so you can be better"  // Replace with actual message
        />
      </Grid>
      <Grid item sx={{ backgroundColor: red }} xs={12} md={6} lg={4} mb={3} >
        <HospitalFlipping
          message="treating hearts so you can be better"  // Replace with actual message
        />
      </Grid>
        <Grid xs={12} md={6} lg={12}>
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

        <Grid xs={12} md={6} lg={5} mt={1} ml={5}>
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
