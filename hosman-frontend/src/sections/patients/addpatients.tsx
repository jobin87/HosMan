import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Card, Typography, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Field, Form } from "src/components/hook-form";
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { requestAddPatientList } from "src/store/patient/patientThunk";
import { z as zod } from "zod";

export type NewPatientSchemaType = zod.infer<typeof newPatientSchema>;

export const newPatientSchema = zod.object({
  patientName: zod.string().min(1, { message: "Patient Name is required!" }),
  age: zod.coerce.number().min(1, { message: "Age is required" }),
  disease: zod.string().min(1, { message: "Disease name is required for analysis!" }),
  patientRegId: zod.string().min(1, { message: "Patient Registration ID is required" }),
  contactNumber: zod.coerce
    .number()
    .int()
    .min(1000000000, { message: "Contact number must be at least 10 digits" }) // Min 10-digit number
    .max(9999999999, { message: "Contact number must be at most 10 digits" }), // Max 10-digit number
});



export const AddpatientsData = () => {
  const dispatch = useAppDispatch();
  const navigate =useNavigate()
  

  const methods = useForm<NewPatientSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      patientName: "",
      age: 0,
      disease: "",
      patientRegId: "",
      contactNumber: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestAddPatientList(data)).unwrap();
      console.log("API Response:", response); // ✅ Debugging the full response
      if (response?.patientAdded) {
        console.log("Patient added successfully!");
        navigate(paths.dashboard.patients.root) 
        
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  });
  

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 4, boxShadow: 2 }} elevation={3}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Register New Patient
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={3}>
            {/* ✅ Using Field.Text for Inputs */}
            <Field.Text name="patientName" label="Patient Name" />
            <Field.Text name="age" label="Age" type="number" />
            <Field.Text name="disease" label="Disease" />
            <Field.Text name="patientRegId" label="Patient Registration ID" />
            <Field.Text name="contactNumber" label="Contact Number" type="number" />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 4 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add Patient
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </Container>
  );
};
