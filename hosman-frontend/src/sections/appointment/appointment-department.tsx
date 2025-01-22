import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Updated sample data with appointment counts
const departmentsData = [
  { id: 1, name: 'Cardiology', appointments: 12 },
  { id: 2, name: 'Neurology', appointments: 8 },
  { id: 3, name: 'Orthopedics', appointments: 15 },
  { id: 4, name: 'Physician', appointments: 19 },
  { id: 5, name: 'Dermatologist', appointments: 6 },
  { id: 6, name: 'Psychiatrist', appointments: 4 },
];

export default function DepartmentDoctorList() {
  const [searchDepartment, setSearchDepartment] = useState('');
  const navigate = useNavigate();

  // Filter departments based on search input
  const filteredDepartments = departmentsData.filter((dept) =>
    dept.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  // Calculate total appointments
  const totalAppointments = filteredDepartments.reduce((total, dept) => total + dept.appointments, 0);

  // Navigate to the department page
  const handleDepartmentClick = (id: number) => {
    navigate(`/departments/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>

      {/* Total Appointments Count */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total Appointments: {totalAppointments}
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Department"
        variant="outlined"
        value={searchDepartment}
        onChange={(e) => setSearchDepartment(e.target.value)}
        sx={{ mb: 3, width: '50%' }}
      />

      {/* Department List */}
      {filteredDepartments.length > 0 ? (
        <Paper>
          <List>
            {filteredDepartments.map((dept) => (
              <ListItem
                key={dept.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #ddd',
                  py: 1,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {dept.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {dept.appointments} Appointments
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDepartmentClick(dept.id)}
                >
                  View
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography>No departments found.</Typography>
      )}
    </Box>
  );
}
