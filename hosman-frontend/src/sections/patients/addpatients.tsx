import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "src/store";
import { requestAddPatientList } from "src/store/patient/patientThunk";
import { z as zod } from "zod";
import { NewDoctorSchema } from "../doctors/add-doctor";
import { Field, Form } from "src/components/hook-form";
import { Box, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export type newPatientScemaType = Zod.infer<typeof newPatientSchema>;
export const newPatientSchema = zod.object({
  patientName: zod.string().min(1, { message: "patient Name is required!" }),
  age: zod.coerce.number().min(1, { message: "age is required" }),
  disease: zod
    .string()
    .min(1, { message: "disease Name is required for analysing!" }),
  patientRegId: zod.coerce.number().min(1, { message: "PatientRegId is required" }),
  contactNumber: zod.coerce.number().min(1, { message: "contactNumber is required" }),
});

export const AddpatientsData =  () => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    patientName: "",
    age: 0,
    disease: "",
    patientRegId: 0,
    contactNumber: 0,
  };

  const methods = useForm<newPatientScemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newPatientSchema),
    defaultValues,
  });
  const {
     handleSubmit, 
    formState:{isSubmitting, errors} 
    } = methods;
  console.log(errors)

  const onSubmit = handleSubmit(async (data) => {
    try {
        const formattedData={
            ...data,
        age: Number(data.age),
        patientRegId: Number(data.patientRegId),
        contactNumber: Number(data.contactNumber),
        }
      const response = await dispatch(requestAddPatientList(formattedData));
      if(response){
        console.log("hello")
      }
    } catch (error: any) {}
  });

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <Card>
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
        >
          Register new Patient
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <Field.Text  label="patient Name" {...methods.register("patientName")} />
          <Field.Text  label="age" {...methods.register("age")} />

          <Field.Text  label="disease" {...methods.register("disease")} />
          <Field.Text label="Contact Number" {...methods.register("contactNumber")} />

          <Field.Text label="patient Registration ID" {...methods.register("patientRegId" )} />
          
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add patient
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
};
