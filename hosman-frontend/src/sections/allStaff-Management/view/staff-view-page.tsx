import { useEffect, useState } from 'react';
import { Typography, Box, Tabs, Tab, Paper, Grid } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { useAppDispatch, useAppSelector } from 'src/store';
import { requestAllStaffList } from 'src/store/all-staff/allStaffThunk';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OtherStaffManagement from '../other-staff-view';

export type NewStaffSchemaType = zod.infer<typeof newStaffSchema>;

export const newStaffSchema = zod.object({
  staffType: zod.string().min(1, { message: "Doctor Name is required!" }),
  Name: zod.string().min(1, { message: "Specialization is required!" }),
  staffRegId: zod.string().min(1, { message: "Experience is required!" }),
  contactNumber: zod.string().min(10, { message: "Contact Number should be 10 digits!" })
    .length(10, { message: "Contact Number must be exactly 10 digits!" })
    .regex(/^\d{10}$/, { message: "Contact Number must contain only numbers!" }),
});

export default function StaffManagement() {
  const dispatch = useAppDispatch();
  const staffGroups = useAppSelector((state) => state.allstaff.getStaffDetails?.data || []);

  const defaultValues = {
    staffType: "",
    Name: "",
    staffRegId: "",
    contactNumber: "",
  };

  const methods = useForm<NewStaffSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newStaffSchema),
    defaultValues,
  });


  useEffect(() => {
    const fetchStaffData = async (data:any) => {
      try {
        const response = await dispatch(requestAllStaffList(data));
        console.log("Staff data fetched:", response);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaffData(data);
  }, [dispatch]);

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Staff Management
      </Typography>
      <Grid>
        <OtherStaffManagement/>

      </Grid>

    </DashboardContent>
  );
}
