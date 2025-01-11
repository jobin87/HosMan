import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Updated sample data with appointment counts
const departmentsData = [
  { id: 1, name: 'Cardiology', appointments: 12 },
  { id: 2, name: 'Neurology', appointments: 8 },
  { id: 3, name: 'Orthopedics', appointments: 15 },
];

export default function DepartmentDoctorList() {
  const [searchDepartment, setSearchDepartment] = useState('');
  const navigate = useNavigate();

  // Filter departments based on search input
  const filteredDepartments = departmentsData.filter((dept) =>
    dept.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  // Navigate to the doctor page
  const handleDepartmentClick = (id: number) => {
    navigate(`/departments/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Departments
      </Typography>

      {/* Search Input */}
      <TextField
        label="Search Department"
        variant="outlined"
        value={searchDepartment}
        onChange={(e) => setSearchDepartment(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Department List */}
      {filteredDepartments.length > 0 ? (
        <Paper>
          <List>
            {filteredDepartments.map((dept) => (
              <ListItem >
                {/* Department Name */}
                <ListItemText
                  primary={dept.name}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* Appointment Count */}
                      <Chip
                        label={`${dept.appointments} Appointments`}
                        color="primary"
                        size="small"
                        sx={{ marginLeft: 2 }}
                      />
                    </Box>
                  }
                />
                <Divider />
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
