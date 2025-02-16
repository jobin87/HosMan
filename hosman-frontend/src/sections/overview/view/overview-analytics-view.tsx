import { Grid, Paper, Box } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { FirstGrid } from "../first-grid";
import { SecondGrid } from "../second-grid";
import { ThirdGrid } from "../third-grid";

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
      <Grid item xs={12} lg={8} alignItems="stretch">
        <Grid
          container
          spacing={1.5}
          sx={{ flexDirection: { xs: "column", lg: "row" } }}
        >
          <Grid item xs={12} lg={5} sx={{ height: {xs:200,lg:300},mt: {xs:7,lg:0} }}>
            {" "}
            {/* Increased height for xs */}
            <NavItem bgcolor="#145E47" >
              <FirstGrid  />
            </NavItem>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ height: {xs:200,lg:300}}}>
            {" "}
            {/* Increased height for xs */}
            <NavItem bgcolor="#1C8395">
              <SecondGrid />
            </NavItem>
          </Grid>
          <Grid item xs={12} sx={{ height: {xs:200,lg:250} }}>
            {" "}
            {/* Increased height for xs */}
            <NavItem bgcolor="#205BA3">
              <ThirdGrid />
            </NavItem>
          </Grid>
        </Grid>
      </Grid>

      {/* Second Grid Section with margin-top */}
      <Grid container spacing={1.5} alignItems="stretch" sx={{ mt: .4}}>
        {" "}
        {/* Added margin-top */}
        {/* Left section (Main content) */}
        <Grid item xs={12}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} sx={{ height: 200 }}>
              <NavItem bgcolor=" #FFFFFF">Content 2</NavItem>
            </Grid>
            <Grid item xs={6} sx={{ height: 250 }}>
              <NavItem bgcolor="#4D346F">Content 3</NavItem>
            </Grid>
            <Grid item xs={6} sx={{ height: 250 }}>
              <NavItem bgcolor="">Content 4</NavItem>
            </Grid>
          </Grid>
        </Grid>
        {/* Right section (Matching height of left content) */}
        <Grid
          item
          xs={12}
          sx={{ display: "flex", flexDirection: "column", height: "auto" }}
        >
          <Box sx={{ height: `calc(100px + 100px + 13px + 2 * 12px)` }}>
            <NavItem bgcolor="#2A446E">Right Sidebar</NavItem>
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
