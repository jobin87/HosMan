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
import { useEffect } from 'react';
import { getAppointmentData } from 'src/store/appointment/appointmentThunk';

export default function DepartmentDetailsPage() {
  const { data, loading } = useAppSelector((state) => state.appointment.appointmentData);
  console.log("ueyhjsks",data)
  const { id } = useParams<{ id: string }>(); // Department name from URL
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      const params ={} as any
      dispatch(getAppointmentData(params));
    }
  }, [dispatch, data]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!data || !data.appointments) {
    return <Typography>No data available</Typography>;
  }

  // Filter appointments by department name (from URL params)
  const filteredAppointments = data.appointments.filter(
    (appointment: any) => appointment.department.toLowerCase() === id?.toLowerCase()
  );

  if (filteredAppointments.length === 0) {
    return <Typography>No appointments found for {id}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        {id} - Appointments ({filteredAppointments.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell><strong>#</strong></TableCell>
              <TableCell><strong> Name</strong></TableCell>
              <TableCell><strong>Doctor</strong></TableCell>
              <TableCell><strong> Time</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.appointmentTime}</TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
