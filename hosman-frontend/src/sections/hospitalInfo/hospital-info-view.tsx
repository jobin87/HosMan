import { Box, Typography } from "@mui/material";
import { DashboardContent } from "src/layouts/dashboard";
import { varAlpha } from "src/theme/styles";

export default function WelcomeView({ title = 'Hosman: Treating You Before Disease' }) {
  return (
    <DashboardContent>
      {/* Welcome Title */}
      <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
        {title}
      </Typography>
      
      {/* Subheading */}
      <Typography variant="body1" sx={{ mb: 5, color: 'primary.main' }}>
        Empowering your health with proactive and personalized care.
      </Typography>

      {/* Highlight Box */}
      <Box
        sx={{
          mt: 0,
          p: 3,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h5" sx={{ color: 'text.primary', mt:0 }}>
          Stay Ahead of Your Health
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt:0, textAlign: 'center' }}>
          Discover our cutting-edge tools to monitor, assess, and improve your well-being before any issues arise.
        </Typography>
      </Box>
    </DashboardContent>
  );
}
