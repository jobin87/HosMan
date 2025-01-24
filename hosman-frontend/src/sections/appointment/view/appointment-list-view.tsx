import { useState } from 'react';
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

// Updated sample data with appointment counts
const departmentsData = [
  { id: 1, name: 'Cardiology', appointments: 12 },
  { id: 2, name: 'Neurology', appointments: 8 },
  { id: 3, name: 'Orthopedics', appointments: 15 },
  { id: 4, name: 'Physician', appointments: 19 },
  { id: 5, name: 'Dermatologist', appointments: 6 },
  { id: 6, name: 'Psychiatrist', appointments: 4 },
];

export default function AppointmentListView()  {
  const [searchDepartment, setSearchDepartment] = useState('');
  const navigate = useNavigate();

  // Filter departments based on search input
  const filteredDepartments = departmentsData.filter((dept) =>
    dept.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  // Calculate total appointments
  const totalAppointments = filteredDepartments.reduce(
    (total, dept) => total + dept.appointments,
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
          filteredDepartments.map((dept) => (
            <Grid item xs={12} sm={6} md={4} key={dept.id}>
              <Card sx={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {dept.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {dept.appointments} Appointments
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
