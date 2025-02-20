
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestAllStaffList } from "src/store/all-staff/allStaffThunk";

export default function StaffsListingPage() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is xs

  // Get staff data categorized by department
  const staffGroups: Record<string, any[]> = useAppSelector(
    (state) => state.allstaff.getStaffDetails?.data || {}
  );

  // Define medical staff categories
  const medicalRoles = new Set([
    "Doctor",
    "Nurse",
    "Surgeon",
    "Pharmacist",
    "Radiologic Technologist",
    "Anesthesiologist",
    "Clinical Researcher",
    "Emergency Room Technician",
    "Lab Technician",
    "Medical Assistant",
    "Nutritionist",
    "Occupational Therapist",
    "Paramedic",
    "Physical Therapist",
    "Psychiatrist",
    "Respiratory Therapist",
    "Speech Therapist",
  ]);

  // Split staff into Medical and Non-Medical categories
  const medicalStaff = Object.entries(staffGroups).filter(([department]) =>
    medicalRoles.has(department)
  );
  const nonMedicalStaff = Object.entries(staffGroups).filter(
    ([department]) => !medicalRoles.has(department)
  );

  // Calculate total staff count
  const totalStaffCount = Object.values(staffGroups).reduce(
    (total, group) => total + (group ? group.length : 0),
    0
  );

  useEffect(() => {
    dispatch(requestAllStaffList());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Total Staff Count */}
      <Typography
        variant={isXs ? "h6" : "h5"}
        sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}
      >
        Total Staff: {totalStaffCount}
      </Typography>

      {/* Medical Staff Section */}
      {medicalStaff.length > 0 && (
        <>
          <Typography
            variant={isXs ? "subtitle1" : "h6"}
            sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
          >
            Medical Staff
          </Typography>
          <Grid container spacing={2}>
            {medicalStaff.map(([department, staffList]) => (
              <Grid item xs={12} sm={6} md={4} key={department}>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardContent
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant={isXs ? "body1" : "h6"}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center", // Ensure alignment
                        wordBreak: "break-word", // Allow name wrapping
                      }}
                    >
                      {department}
                    </Typography>
                    <Typography
                      variant={isXs ? "body2" : "body1"}
                      color="textSecondary"
                    >
                      Staff Count: {staffList.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Non-Medical Staff Section */}
      {nonMedicalStaff.length > 0 && (
        <>
          <Typography
            variant={isXs ? "subtitle1" : "h6"}
            sx={{ mb: 2, fontWeight: "bold", color: "secondary.main" }}
          >
            Non-Medical Staff
          </Typography>
          <Grid container spacing={2}>
            {nonMedicalStaff.map(([department, staffList]) => (
              <Grid item xs={12} sm={6} md={4} key={department}>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardContent
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant={isXs ? "body1" : "h6"}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center", // Ensure alignment
                        wordBreak: "break-word", // Allow name wrapping
                      }}
                    >
                      {department}
                    </Typography>
                    <Typography
                      variant={isXs ? "body2" : "body1"}
                      color="textSecondary"
                    >
                      Staff Count: {staffList.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
