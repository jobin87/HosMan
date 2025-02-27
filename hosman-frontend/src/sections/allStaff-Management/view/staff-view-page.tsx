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
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is xs

  const navigate = useNavigate();

  // Get staff data categorized by department
  const staffGroups: Record<string, any[]> = useAppSelector(
    (state) => state.allstaff.getStaffDetails?.data || {}
  );
  console.log("staffertte:", staffGroups)

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

  const handleAddStaff = () => {
    navigate(paths.dashboard.staff.addStaff);
  };
  const handleStaffClick = (department:string) => {
    navigate(`${paths.dashboard.Appointment.department.replace(":id", department)}`);
  };

  useEffect(() => {
    dispatch(requestAllStaffList());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Total Staff Count */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* Total Staff Count on the left */}
        <Typography variant={isXs ? "h6" : "h5"} sx={{ fontWeight: "bold" }}>
          Total Staff: {totalStaffCount}
        </Typography>

        {/* Add Staff Button on the right */}
        <Button variant="contained" onClick={handleAddStaff}>
          Add Staff
        </Button>
      </Box>
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
                  <CardContent>
                    <Typography
                      variant={isXs ? "body1" : "h6"}
                      sx={{ fontWeight: "bold", textAlign: "center" }}
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
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={() => handleStaffClick(department.)}
                  >
                    View
                  </Button>
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
                  <CardContent>
                    <Typography
                      variant={isXs ? "body1" : "h6"}
                      sx={{ fontWeight: "bold", textAlign: "center" }}
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
