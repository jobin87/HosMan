import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { useAppDispatch, useAppSelector } from "src/store";
import { requestAllStaffList } from "src/store/all-staff/allStaffThunk";

export default function StaffsListingPage() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // ✅ Fetch staff data grouped by staffType (Doctor, Nurse, etc.)
  const staffGroups: Record<string, any[]> = useAppSelector(
    (state) => state.allstaff.getStaffDetails?.data?.groupedStaff || {}
  );

  // ✅ Debugging Logs
  console.log("Processed Staff Groups:", staffGroups);

  // ✅ Define medical staff categories
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

  // ✅ Categorize staff by type (medical & non-medical)
  const medicalStaff = Object.entries(staffGroups).filter(([staffType]) =>
    medicalRoles.has(staffType)
  );

  const nonMedicalStaff = Object.entries(staffGroups).filter(
    ([staffType]) => !medicalRoles.has(staffType)
  );

  // ✅ Correct total staff count calculation
  const totalStaffCount = Object.values(staffGroups).reduce(
    (total, staffList) =>
      total + (Array.isArray(staffList) ? staffList.length : 0),
    0
  );

  const handleStaffClick = (staffType: string) => {
    navigate(paths.dashboard.staff.staffDetails.replace(":id", staffType));
  };

  const handleAddStaff = () => {
    navigate(paths.dashboard.staff.addStaff);
  };

  useEffect(() => {
    dispatch(requestAllStaffList());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* ✅ Total Staff Count */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant={isXs ? "h6" : "h5"} sx={{ fontWeight: "bold" }}>
          Total Staff: {totalStaffCount}
        </Typography>
        <Button variant="contained" onClick={handleAddStaff}>
          Add Staff
        </Button>
      </Box>

      {/* ✅ Medical Staff Section */}
      {medicalStaff.length > 0 && (
        <>
          <Typography
            variant={isXs ? "subtitle1" : "h6"}
            sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
          >
            Medical Staff
          </Typography>
          <Grid container spacing={3}>
            {medicalStaff.map(([staffType, staffList]) => (
              <Grid item xs={6} sm={6} md={2} key={staffType}>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: 70,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: "transform 0.2s ease-in",
                    border: "2px solid", // Add border
                    borderColor: "gainsboro", // Use MUI theme color
                    "&:hover": {
                      transform: "scale(1.11)",
                      borderColor: "GrayText",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant={isXs ? "body1" : "h6"}
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {`${staffType}${staffType.endsWith("s") ? "'" : "'s"}`}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleStaffClick(staffType)}
                    >
                      View
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Divider sx={{ my: 4 }} />

      {/* ✅ Non-Medical Staff Section */}
      {nonMedicalStaff.length > 0 && (
        <>
          <Typography
            variant={isXs ? "subtitle1" : "h6"}
            sx={{ mb: 2, fontWeight: "bold", color: "secondary.main" }}
          >
            Non-Medical Staff
          </Typography>
          <Grid container spacing={2}>
            {nonMedicalStaff.map(([staffType, staffList]) => (
              <Grid item xs={6} sm={6} md={2} key={staffType}>
                <Card
                sx={{
                  width: "100%",
                  minHeight: 70,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.2s ease-in",
                  border: "2px solid", // Add border
                  borderColor: "gainsboro", // Use MUI theme color
                  "&:hover": {
                    transform: "scale(1.11)",
                    borderColor: "GrayText",
                  },
                }}


                >
                  <CardContent>
                    <Typography
                      variant={isXs ? "body1" : "h6"}
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {`${staffType}${staffType.endsWith("s") ? "'" : "'s"}`}
                    </Typography>
              
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => handleStaffClick(staffType)}
                    >
                      View
                    </Button>
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
