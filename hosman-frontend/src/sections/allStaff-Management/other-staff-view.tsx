import { Box, Grid, Paper, Typography } from "@mui/material";

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: "center", height: "300px" }}>
    </Paper>
  );
}

export default function LayoutExample() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography>total staffs in each department: </Typography>
    </Box>
  );
}
