import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    specialization: '',
    experience: '',
    contactNumber: '',
    doctorRegId: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/doctors', { // Replace with your endpoint for adding doctor
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Set success message
        setFormData({
          doctorName: '',
          specialization: '',
          experience: '',
          contactNumber: '',
          doctorRegId: '',
        });
      } else {
        setMessage(data.message || 'Error occurred');
      }
    } catch (error) {
      setMessage('An error occurred while adding the doctor.');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Add a New Doctor
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Doctor Name"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Experience (in years)"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          fullWidth
          required
          type="number"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          fullWidth
          required
          type="tel"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Doctor Registration ID"
          name="doctorRegId"
          value={formData.doctorRegId}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Doctor
        </Button>
      </form>
      {message && (
        <Typography variant="body2" sx={{ mt: 2, color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddDoctorForm;
