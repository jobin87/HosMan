import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAppointmentData } from "src/store/appointment/appointmentThunk";
import { DashboardContent } from "src/layouts/dashboard";

export default function AppointmentListView() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.appointment.appointmentData);

  console.log("Fetched Appointments:", data);

  const [searchDepartment, setSearchDepartment] = useState("");

  useEffect(() => {
    const params= {} as any;
    dispatch(getAppointmentData(params));
  }, [dispatch]);

  // Ensure data is an array before using it
  const appointments = Array.isArray(data?.appointments) ? data.appointments : [];

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
    navigate(`${paths.dashboard.Appointment.department.replace(":id", department)}`);
  };

  return (
    <DashboardContent>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Appointments: {appointments.length}
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Department"
        variant="outlined"
        value={searchDepartment}
        onChange={(e) => setSearchDepartment(e.target.value)}
        sx={{ mb: 3, width: "100%" }}
      />

      <Grid container spacing={3}>
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((dept: any) => (
            <Grid item xs={12} sm={6} md={4} key={dept.department}>
              <Card sx={{ textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {dept.department}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {dept.count} Appointments
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDepartmentClick(dept.department)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 2, ml: 3 }}>No appointments found.</Typography>
        )}
      </Grid>
    </DashboardContent>
  );
}
