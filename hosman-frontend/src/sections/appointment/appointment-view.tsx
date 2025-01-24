import { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Box } from '@mui/material';
import { useAppSelector } from 'src/store';

export const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    doctor:'',
    patientName: '',
    appointmentTime: '',
    appointmentDate: '',
    payment: '5',
  });

  const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Physician', 'Dermatology', 'Psychiatry'];
  const Doctors = useAppSelector((state)=>state.allstaff.doctorsList)
  console.log("doctors:",Doctors)
  const availableDates = [
    'Tomorrow',
    ...Array.from({ length: 6 }, (_, i) => new Date(Date.now() + (i + 2) * 86400000).toLocaleDateString()),
  ];

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Appointment Booked:', formData);
    alert('Appointment booked successfully!');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{mb:4}}>
        Book an Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
      <TextField
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Department</InputLabel>
          <Select name="department" value={formData.department} onChange={handleChange} required>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Doctors</InputLabel>
          {/* <Select name="doctor" value={formData.doctor} onChange={handleChange} required>
            {Doctors.map((doc) => (
              <MenuItem key={doc} value={doc}>
                {doc}
              </MenuItem>
            ))}
          </Select> */}
        </FormControl>
       
        <TextField
          label="Appointment Time"
          name="appointmentTime"
          type="time"
          value={formData.appointmentTime}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Date</InputLabel>
          <Select name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required>
            {availableDates.map((date, index) => (
              <MenuItem key={index} value={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Payment Amount (Rs)"
          name="payment"
          value={formData.payment}
          fullWidth
          disabled
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Book Appointment
        </Button>
      </form>
    </Box>
  );
};
