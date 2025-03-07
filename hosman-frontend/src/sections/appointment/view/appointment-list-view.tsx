import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAppointmentData } from "src/store/appointment/appointmentThunk";
import { DashboardContent } from "src/layouts/dashboard";
import { useUser } from "src/hooks/use-user";
import { io } from "socket.io-client";

export default function AppointmentListView() {
  const { role } = useUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading } = useAppSelector(
    (state) => state.appointment.appointmentData
  );

  const [searchDepartment, setSearchDepartment] = useState("");

  const socket = io("https://hosman-backend-sdne.onrender.com/");

  // Fetch appointments if data is undefined or empty
  useEffect(() => {
    if (
      !data ||
      (Array.isArray(data.appointments) && data.appointments.length === 0)
    ) {
      const params = {} as any;
      dispatch(getAppointmentData(params));
        socket.on("updateAppointments", () => {
          dispatch(getAppointmentData(params)); // ✅ Refresh appointment list when updated
        });
    
        return () => {
          socket.off("updateAppointments");
        };
    }
  }, [dispatch, data?.appointments?.length]);

  // Ensure data is an array before using it
  const appointments = Array.isArray(data?.appointments)
    ? data.appointments
    : [];

  // Group appointments by department
  const departmentCounts = appointments.reduce((acc: any, appt: any) => {
    if (!acc[appt.department]) {
      acc[appt.department] = { department: appt.department, count: 0 };
    }
    acc[appt.department].count += 1;
    return acc;
  }, {});

  // Convert departmentCounts object into an array
  const departments = Object.values(departmentCounts);

  // Filter departments based on search input
  const filteredDepartments = departments.filter((dept: any) =>
    dept.department.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  // Navigate to the department page
  const handleDepartmentClick = (department: string) => {
    navigate(
      `${paths.dashboard.Appointment.department.replace(":id", department)}`
    );
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Check if welcome message was already shown in this session
    const hasShownWelcome = sessionStorage.getItem("welcomeMessageShown");
    console.log("Welcome Message Status:", sessionStorage.getItem("welcomeMessageShown"));

    if (role === "Doctor" && !hasShownWelcome) {
      setOpenSnackbar(true);
      sessionStorage.setItem("welcomeMessageShown", "true"); // Mark as shown
    }
  }, [role]);

  return (
    <DashboardContent>
      {/* Snackbar for Welcome Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={700}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          🎉 Welcome to the Dashboard!
        </Alert>
      </Snackbar>

      {/* Show loading indicator if data is still being fetched */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "100%",
          }}
        >
          <Typography variant="h6">Fetching appointments... ⏳</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Total Appointments: {appointments.length}
          </Typography>

          {/* Search Input */}
          <TextField
            label="Search Department"
            variant="outlined"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
            sx={{
              mb: 3,
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderWidth: "2px",
                "& fieldset": {
                  borderColor: "grey",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                  borderWidth: "2.5px",
                },
              },
            }}
          />

          <Grid container spacing={3}>
            {filteredDepartments.length > 0 ? (
              filteredDepartments.map((dept: any) => (
                <Grid item xs={6} sm={6} md={2} key={dept.department}>
                  <Card
                    sx={{
                      width: "100%",
                      minHeight: 30,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: 3,
                      borderRadius: 2,
                      transition: "transform 0.2s ease-in",
                      border: "2px solid",
                      borderColor: "gainsboro",
                      "&:hover": {
                        transform: "scale(1.11)",
                        borderColor: "GrayText",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {dept.department}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "gray" }}>
                        {dept.count}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => handleDepartmentClick(dept.department)}
                      >
                        View
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography sx={{ mt: 2, ml: 3 }}>
                No appointments found.
              </Typography>
            )}
          </Grid>
        </>
      )}
    </DashboardContent>
  );
}