import { Box, Grid, Paper } from "@mui/material";

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "300px" }}>
    </Paper>
  );
}

export default function LayoutExample() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {}
        </Grid>
        <Grid item xs={4}>
          <NavItem>Content 2</NavItem>
        </Grid>
        <Grid item xs={4}>
          <NavItem>Content 3</NavItem>
        </Grid>
        <Grid item xs={8}>
          <NavItem>Content 4</NavItem>
        </Grid>
      </Grid>
    </Box>
  );
}
