import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import {  MenuItem, Typography } from "@mui/material";
import { Field, Form, } from "src/components/hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { requestaddDoctor } from "src/store/all-staff/allStaffThunk";
import { paths } from "src/routes/paths";

export type NewDoctorSchemaType = zod.infer<typeof NewDoctorSchema>;

export const NewDoctorSchema = zod.object({
  doctorName: zod.string().min(1, { message: "Doctor Name is required!" }),
  specialization: zod.string().min(1, { message: "Specialization is required!" }),
  experience: zod.string().min(1, { message: "Experience is required!" }),
  contactNumber: zod.string().min(1, { message: "Contact Number is required!" }),
  doctorRegId: zod.string().min(1, { message: "Doctor Registration ID is required!" }),
});

export function AddDoctorForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    doctorName: "",
    specialization: "",
    experience: "",
    contactNumber: "",
    doctorRegId: "",
    password: "",
  };

  const methods = useForm<NewDoctorSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(NewDoctorSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestaddDoctor(data));
      // console.log(response)
      if (response?.data) {
        toast.success("Doctor added successfully!");
        navigate(paths.dashboard.doctors.root);
      } 
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the doctor.");
    }
    navigate(paths.dashboard.doctors.root);
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Register a New Doctor
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <Field.Text name="doctorName" label="Doctor Name" {...methods.register} />
          <Field.Select name="specialization" label="Specialization" {...methods.register}>
            {["Cardiology", "Neurology", "Orthopedics", "Physician", "Dermatology", "Psychiatry"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Field.Select>
          <Field.Text name="experience" label="Experience" {...methods.register} />
          <Field.Text name="contactNumber" label="Contact Number" {...methods.register} />
          <Field.Text name="doctorRegId" label="Doctor Registration ID" {...methods.register} />
          
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add Doctor
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
