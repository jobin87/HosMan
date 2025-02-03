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
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getAppointmentData, requestAppointmentSaved } from 'src/store/appointment/appointmentThunk';
import { requestAllStaffList } from 'src/store/all-staff/allStaffThunk';
import { paths } from 'src/routes/paths';

// Validation schema using Zod
const AppointmentSchema = zod.object({
  patientName: zod.string().min(1, { message: 'Patient Name is required!' }),
  department: zod.string().min(1, { message: 'Department is required!' }),
  doctor: zod.string().min(1, { message: 'Doctor is required!' }),
  appointmentTime: zod.string().min(1, { message: 'Appointment Time is required!' }),
  appointmentDate: zod.string().min(1, { message: 'Appointment Date is required!' }),
  payment: zod.string().min(1, { message: 'Payment is required!' }),
});

export type AppointmentFormSchemaType = zod.infer<typeof AppointmentSchema>;

export function AppointmentForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    department: '',
    doctor: '',
    patientName: '',
    appointmentTime: '',
    appointmentDate: '',
    payment: '5',
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        await dispatch(requestAllStaffList(data));
      } catch (error) {
        console.error('Error fetching doctors data:', error);
      }
    };

    fetchDoctorData();
  }, [dispatch]);

  // Selecting doctors list from Redux store
  const { data } = useAppSelector((state) => state.allstaff.getStaffDetails) || { data: [] };
  console.log('Doctors data from store:', data);

  // Generate available dates
  const availableDates = [
    'Tomorrow',
    ...Array.from({ length: 6 }, (_, i) => new Date(Date.now() + (i + 2) * 86400000).toLocaleDateString()),
  ];

  // State to hold filtered doctors
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<any[]>([]);

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

  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Step 1: Get unique departments from the doctor data
      const uniqueDepartments = Array.from(
        new Set(data.filter((staff: any) => staff.staffType === 'Doctor').map((staff: any) => staff.department))
      );
      
      // Step 2: Set departments for the department select field
      setAvailableDepartments(uniqueDepartments);
  
      // Step 3: Filter doctors based on the selected department
      if (selectedDepartment) {
        const filtered = data.filter(
          (staff: any) => staff.department === selectedDepartment && staff.staffType === 'Doctor'
        );
        setFilteredDoctors(filtered);  // Filter doctors based on department
      } else {
        setFilteredDoctors([]);  // Reset if no department is selected
      }
    }
  }, [data, selectedDepartment]);  // Trigger when data or selectedDepartment changes
  

  // Form submission handler
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await dispatch(requestAppointmentSaved(formData));
      if (response?.payload) {
        console.log('Appointment Booked:', response);
        dispatch(getAppointmentData(data));
        toast.success('Appointment booked successfully!');
        navigate(paths.dashboard.root);
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
            {availableDepartments.map((department: any) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select label="Doctor" {...methods.register('doctor')}>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor: any) => (
                <MenuItem key={doctor._id} value={doctor._id}>
                  {doctor.Name} {/* Show specialization of doctors only */}
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
