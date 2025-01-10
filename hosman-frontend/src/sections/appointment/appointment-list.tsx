import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Sample data for appointments
const appointments = [
  { id: 1, patientName: 'Alice Williams', doctorName: 'Dr. Smith', date: '2025-01-20', status: 'Scheduled' },
  { id: 2, patientName: 'Bob Johnson', doctorName: 'Dr. Adams', date: '2025-01-21', status: 'Completed' },
  { id: 3, patientName: 'Charlie Smith', doctorName: 'Dr. Lee', date: '2025-01-22', status: 'Cancelled' },
  { id: 4, patientName: 'Diana Brown', doctorName: 'Dr. Patel', date: '2025-01-23', status: 'Scheduled' },
  { id: 5, patientName: 'Eva Davis', doctorName: 'Dr. Wilson', date: '2025-01-24', status: 'Completed' },
  { id: 6, patientName: 'Frank Miller', doctorName: 'Dr. Taylor', date: '2025-01-25', status: 'Scheduled' },
  { id: 7, patientName: 'Grace Moore', doctorName: 'Dr. Harris', date: '2025-01-26', status: 'Completed' },
  { id: 8, patientName: 'Hank Taylor', doctorName: 'Dr. Clark', date: '2025-01-27', status: 'Cancelled' },
  { id: 9, patientName: 'Ivy Anderson', doctorName: 'Dr. Young', date: '2025-01-28', status: 'Scheduled' },
  { id: 10, patientName: 'Jack Wilson', doctorName: 'Dr. King', date: '2025-01-29', status: 'Completed' },
];

export default function AppointmentList() {
  const handleEdit = (id: number) => {
    console.log(`Editing appointment with ID: ${id}`);
    // Add edit functionality here
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting appointment with ID: ${id}`);
    // Add delete functionality here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Appointment List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>
                  <Chip
                    label={appointment.status}
                    color={appointment.status === 'Scheduled' ? 'primary' : appointment.status === 'Completed' ? 'success' : 'error'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(appointment.id)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(appointment.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
