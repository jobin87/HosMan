import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "src/store";
import { z as zod } from "zod";
import { Field, Form } from "src/components/hook-form";
import {
  Box,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { requestAddTreatment } from "src/store/all-staff/allStaffThunk";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

// Define the schema for treatment data, including treatment type
export const newTreatmentSchema = zod.object({
  specialization: zod
    .string()
    .min(1, { message: "specialization is required" }),
  treatment: zod.string().min(1, { message: "Treatment name is required" }),
  department: zod.string().min(1, { message: "department date is required" }),
  price: zod.coerce.number().min(1, { message: "price is required" }),
});

export type newTreatmentSchemaType = Zod.infer<typeof newTreatmentSchema>;

export const AddTreatmentData = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    specialization: "",
    department: "",
    treatment: "",
    price: 0, // Default value for treatment type
  };

  const methods = useForm<newTreatmentSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newTreatmentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  console.log(errors);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestAddTreatment(data));
      if (response) {
        navigate(paths.dashboard.Treatment.root)
      }

      //   if (response) {
      //     console.log("Treatment added successfully");
      //   }
    } catch (error: any) {
      console.error("Error adding treatment", error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
        >
          Register New treatments
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
        >
          <Field.Text label="department" {...methods.register("department")} />
          <Field.Text label="treatment" {...methods.register("treatment")} />
          <Field.Text
            label="specialization"
            {...methods.register("specialization")}
          />
          <Field.Text label="price" {...methods.register("price")} />
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add TREATMENT
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
};
