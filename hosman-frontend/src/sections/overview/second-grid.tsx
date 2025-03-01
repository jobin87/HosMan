import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useUser } from "src/hooks/use-user";
import {  useState } from "react";

// Component to display logged-in doctors
export const SecondGrid = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const { username } = useUser(); // Get logged-in user info
  const [loggedInDoctors] = useState<any[]>([]);


  return (
    <Box sx={{ mt:3 }}>
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
        }}
      >
        Doctors Currently logined
      </Typography>

      {/* Grid for logged-in doctors */}
      <Grid container spacing={2}>
        {loggedInDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card
              sx={{
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography
                  variant={isXs ? "body1" : "h6"}
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {doctor.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  {doctor.department}
                </Typography>
                {username === doctor.name && (
                  <Typography
                    variant="body2"
                    sx={{ color: "success.main", mt: 1 }}
                  >
                    You are online
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
