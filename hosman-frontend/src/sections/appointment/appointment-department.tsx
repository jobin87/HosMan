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
import { useAppDispatch, useAppSelector } from 'src/store';
import { useEffect, useState } from 'react';
import { getAppointmentData } from 'src/store/appointment/appointmentThunk';

export default function DepartmentDetailsPage() {
  // Fetching data from Redux store
  const { data, loading } = useAppSelector((state) => state.appointment.appointmentData);
  const { id } = useParams<{ id: string }>(); // Get department ID from URL
  const dispatch = useAppDispatch();
  const departmentId = parseInt(id || '0'); // Convert ID to number

  const [searchDepartment, setSearchDepartment] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch appointment data on component mount if not already available
    if (!data) {
      dispatch(getAppointmentData(data)).then(() => setRefresh((prev) => !prev));
    }
  }, [dispatch, data]);

  // Handle loading state
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Ensure data is not null or undefined before proceeding
  if (!data || !data.departments) {
    return <Typography>No data available</Typography>;
  }

  // Find the department by ID
  const department = data.departments.find((dept: any) => dept.id === departmentId);

  if (!department) {
    return <Typography>Department not found</Typography>;
  }

  useEffect(() => {
    console.log("Fetched data:", data); // Check the structure of the data object
  }, [data]);

  // Filter appointments based on the department
  const filteredAppointments = department.appointments.filter((appointment: any) =>
    appointment.patientName.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        {department.name} - Appointments ({department.count})
      </Typography>

      {/* Check if there are no appointments */}
      {filteredAppointments.length === 0 ? (
        <Typography>No appointments available</Typography> // Show this message if no appointments found
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong> Name</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong> Time</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>{appointment.appointmentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
