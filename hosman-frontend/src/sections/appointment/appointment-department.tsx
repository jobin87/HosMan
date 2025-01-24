import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Sample department data
const departmentsData = [
  { id: 1, name: 'Cardiology', appointments: 12, patients: ['John', 'Sarah', 'Mark'] },
  { id: 2, name: 'Neurology', appointments: 8, patients: ['Alice', 'Bob'] },
  { id: 3, name: 'Orthopedics', appointments: 15, patients: ['Emma', 'Liam', 'Sophia'] },
  { id: 4, name: 'Physician', appointments: 19, patients: ['Michael', 'Olivia', 'James'] },
  { id: 5, name: 'Dermatologist', appointments: 6, patients: ['William', 'Isabella'] },
  { id: 6, name: 'Psychiatrist', appointments: 4, patients: ['Mason', 'Amelia'] },
];

export default function DepartmentDetailsPage() {
  const { id } = useParams<{ id: string }>(); // Get department ID from URL
  const departmentId = parseInt(id || '0'); // Convert ID to number

  const department = departmentsData.find((dept) => dept.id === departmentId);

  if (!department) {
    return <Typography>Department not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        {department.name} - Appointments
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Doctor</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {department.patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient}</TableCell>
                <TableCell>Dr. Smith</TableCell>  {/* Placeholder doctor name */}
                <TableCell>10:00 AM</TableCell>   {/* Placeholder time */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
