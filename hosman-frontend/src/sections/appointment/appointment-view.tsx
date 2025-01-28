import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem, Typography } from '@mui/material';
import { Field, Form } from 'src/components/hook-form';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getAppointmentData, requestAppointmentSaved } from 'src/store/appointment/appointmentThunk';
import { requestAllDoctorsList } from 'src/store/all-staff/allStaffThunk';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

// Validation schema using Zod
const AppointmentSchema = zod.object({
  patientName: zod.string().min(1, { message: 'Patient Name is required!' }),
  department: zod.string().min(1, { message: 'Department is required!' }),
  doctor: zod.string().min(1, { message: 'Doctor is required!' }),
  appointmentTime: zod.string().min(1, { message: 'Appointment Time is required!' }),
  appointmentDate: zod.string().min(1, { message: 'Appointment Date is required!' }),
  payment: zod.string().min(1, { message: 'Appointment Date is required!' }),
});

export type AppointmentFormSchemaType = zod.infer<typeof AppointmentSchema>;

export function AppointmentForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()


  const defaultValues = {
    department: '',
    doctor: '',
    patientName: '',
    appointmentTime: '',
    appointmentDate: '',
    payment: '5',
  };

  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchDoctorData = async (data:any) => {
      try {
        // Dispatch the action to fetch doctor data
        await dispatch(requestAllDoctorsList(data));
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    };
  
    // Call the async function
    fetchDoctorData(data);
  }, [dispatch]);
  

  // Default form values


  // Selecting doctors list from Redux store
  const { data } = useAppSelector((state) => state.allstaff.doctorsList) || { data: [] };
  console.log("Doctors data from store:", data);

  // Generate available dates
  const availableDates = [
    'Tomorrow',
    ...Array.from({ length: 6 }, (_, i) => new Date(Date.now() + (i + 2) * 86400000).toLocaleDateString()),
  ];

  // State to hold filtered doctors
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

  // React Hook Form setup
  const methods = useForm<AppointmentFormSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(AppointmentSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Watching department field changes
  const selectedDepartment = watch('department');

  // Effect to filter doctors based on selected department
  useEffect(() => {
    if (data && Array.isArray(data) && selectedDepartment) {
      const filtered = data.filter((doctor: any) => doctor.specialization === selectedDepartment);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [data, selectedDepartment]);

  // Form submission handler
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await dispatch(requestAppointmentSaved(formData))
      if(response?.payload){

        console.log('Appointment Booked:', response);
        dispatch(getAppointmentData(data)), 
        toast.success('Appointment booked successfully!');
        navigate(paths.dashboard.root)
        // Add logic to save the appointment
        // navigate('/doctors');
      }
    } catch (error) {
      toast.error('An error occurred while booking the appointment.');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
          Book an Appointment
        </Typography>
        
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
          <Field.Text label="Patient Name" {...methods.register('patientName')} />

          <Field.Select label="Department" {...methods.register('department')}>
            {['Cardiology', 'Neurology', 'Orthopedics', 'Physician', 'Dermatologist', 'Psychiatrist'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select label="Doctor" {...methods.register('doctor')}>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor: any) => (
                <MenuItem key={doctor.doctorRegId} value={doctor.doctorRegId}>
                  {doctor.doctorName}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No doctors available in this department</MenuItem>
            )}
          </Field.Select>

          <Field.Text label="Appointment Time" type="time" {...methods.register('appointmentTime')} />

          <Field.Select label="Appointment Date" {...methods.register('appointmentDate')}>
            {availableDates.map((date, index) => (
              <MenuItem key={index} value={date}>
                {date}
              </MenuItem>
            ))}
          </Field.Select>
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Book Appointment
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
