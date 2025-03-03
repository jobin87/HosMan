import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Card, Typography, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Field, Form } from "src/components/hook-form";
import { useAppDispatch } from "src/store";
import { requestAddTreatment } from "src/store/all-staff/allStaffThunk";
import { z as zod } from "zod";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

// ----------------------------------------------------------------------

export type NewTreatmentSchemaType = zod.infer<typeof newTreatmentSchema>;
export const newTreatmentSchema = zod.object({
  specialization: zod.string().min(1, { message: "Specialization is required!" }),
  treatment: zod.string().min(1, { message: "Treatment name is required!" }),
  department: zod.string().min(1, { message: "Department is required!" }),
  price: zod
    .coerce.number({ invalid_type_error: "Price must be a valid number" }) // ✅ Ensure it's a number
    .min(1, { message: "Price must be at least 1" })
    .max(1000000, { message: "Price cannot exceed 1,000,000" }) // ✅ Prevent unrealistic values
});


export function AddTreatmentData() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<NewTreatmentSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newTreatmentSchema),
    defaultValues: {
      specialization: "",
      department: "",
      treatment: "",
      price: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestAddTreatment(data)).unwrap();

      if (response?.success) {
        toast.success("Treatment added successfully!");
        navigate(paths.dashboard.Treatment.root);
      } else {
        toast.error("Failed to add treatment.");
      }
    } catch (error) {
      console.error("Error adding treatment:", error);
      toast.error("An error occurred while adding treatment.");
    }
  });

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 4, boxShadow: 2 }} elevation={3}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Register New Treatment
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={3}>
            <Field.Text name="department" label="Department" />
            <Field.Text name="treatment" label="Treatment Name" />
            <Field.Text name="specialization" label="Specialization" />
            <Field.Text name="price" label="Price"  value={
                methods.watch("price") === 0
                  ? ""
                  : methods.watch("price")
              }/>
          </Box>
          <Stack alignItems="flex-end" sx={{ mt: 4 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Add Treatment
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </Container>
  );
}
