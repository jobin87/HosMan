import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Box } from '@mui/material';
import { useAppSelector } from 'src/store';

export const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    doctor: '',
    patientName: '',
    appointmentTime: '',
    appointmentDate: '',
    payment: '5',
  });

  // Get doctor data from Redux store
  const { data } = useAppSelector((state) => state.allstaff.doctorsList);
  console.log('Doctors from Redux:', data); // Log doctor data from Redux store

  // List of available appointment dates
  const availableDates = [
    'Tomorrow',
    ...Array.from({ length: 6 }, (_, i) => new Date(Date.now() + (i + 2) * 86400000).toLocaleDateString()),
  ];

  // Store filtered doctors based on department
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

  // Filter doctors based on selected department
  useEffect(() => {
    if (data && formData.department) {
      const filtered = data.filter((doctor: any) => doctor.specialization === formData.department);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [data, formData.department]);

  console.log('Filtered Doctors:', filteredDoctors); // Log filtered doctors

  // Handle form input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Appointment Booked:', formData);
    alert('Appointment booked successfully!');
  };

  // Reset doctor field when department is changed
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      doctor: '', // Reset doctor field when department changes
    }));
  }, [formData.department]);

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
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
            {['Cardiology', 'Neurology', 'Orthopedics', 'Physician', 'Dermatology', 'Psychiatry'].map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Doctors</InputLabel>
          <Select name="doctor" value={formData.doctor} onChange={handleChange} required>
            {/* Filtered doctors based on the department */}
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor: any) => (
                <MenuItem key={doctor.doctorRegId} value={doctor.doctorRegId}>
                  {doctor.doctorName}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No doctors available in this department</MenuItem>
            )}
          </Select>
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
