import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getAppointmentData} from 'src/store/appointment/appointmentThunk';

export default function AppointmentListView() {
  const { data } = useAppSelector((state) => state.appointment.appointmentData); // Access data directly
  console.log("daTTta:",data)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchDepartment, setSearchDepartment] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch appointment data on component mount
    dispatch(getAppointmentData(data)).then(() => setRefresh((prev) => !prev));
  },[dispatch,location.pathname]);

  useEffect(() => {
    console.log("Fetched data:", data);  // Check the structure of the data object
  }, [data]);

  // Check if data is available and if it is an array, otherwise default to an empty array
  const departments = Array.isArray(data?.departments) ? data.departments : [];

  // Filter departments based on search input
  const filteredDepartments = departments.filter((dept:any) =>
    dept.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  // Calculate total appointments
  const totalAppointments = filteredDepartments.reduce(
    (total:any, dept:any) => total + dept.count,
    0
  );

  // Navigate to the department page
  const handleDepartmentClick = (id: number) => {
    navigate(`${paths.dashboard.Appointment.department.replace(':id', String(id))}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Appointments: {totalAppointments}
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Department"
        variant="outlined"
        value={searchDepartment}
        onChange={(e) => setSearchDepartment(e.target.value)}
        sx={{ mb: 3, width: '100%' }}
      />

      {/* Department Grid */}
      <Grid container spacing={3}>
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((dept:any) => (
            <Grid item xs={12} sm={6} md={4} key={dept.id}>
              <Card sx={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {dept.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {dept.count} Appointments {/* Use the count from API data */}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDepartmentClick(dept.id)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No departments found.</Typography>
        )}
      </Grid>
    </Box>
  );
}
