import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Form } from "src/components/hook-form";
import { useDispatch } from "react-redux";
import { addDoctor } from "src/store/all-staff/allStaffThunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AddDoctorForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      doctorName: "",
      specialization: "",
      experience: "",
      contactNumber: "",
      doctorRegId: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const defaultValues = {
      doctorName: "",
      specialization: "",
      experience: "",
      contactNumber: "",
      doctorRegId: "",
    };
  
    const methods = useForm({
      defaultValues,
    });
  
    const { handleSubmit } = methods;
  
    const onSubmit = handleSubmit(async (data) => {
      try {
        const response = await dispatch(addDoctor(data));
  
        if (response.payload) {
          toast.success("Doctor added successfully!");
        //   navigate(paths.onboarding.root);
        } else {
          toast.error("Failed to add doctor.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error adding doctor! Try again later.");
      }
    });
  
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Add a New Doctor
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
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
        </Form>
      </Box>
    );
  };