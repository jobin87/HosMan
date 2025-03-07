import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "src/store";
import { number, z as zod } from "zod";
import { Field, Form } from "src/components/hook-form";
import { Box, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { requestGetTreatment, updateTreatment } from "src/store/all-staff/allStaffThunk";
import { useNavigate, useLocation } from "react-router-dom";
import { paths } from "src/routes/paths";

// Define the schema for treatment data
export const newTreatmentSchema = zod.object({
  specialization: zod
    .string()
    .min(1, { message: "specialization is required" }),
  treatment: zod.string().min(1, { message: "Treatment name is required" }),
  department: zod.string().min(1, { message: "department is required" }),
  treatmentId: zod.string().default(""),
  price: zod.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val), 
    zod.number().min(1, { message: "Price must be a positive number" })
  ), // Convert price before validation
});

export type newTreatmentSchemaType = Zod.infer<typeof newTreatmentSchema>;

export const EditTreatmentData = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const treatmentData = location.state || {}; // Fallback to an empty object

  const defaultValues = {
    treatmentId: treatmentData._id || "",  // Ensure the existing _id is used
    treatment: treatmentData.treatment || "",
    department: treatmentData.department || "",
    specialization: treatmentData.specialization || "",
    price: treatmentData.price ? Number(treatmentData.price) : 0, // Convert to string for input field
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
      const updates: Partial<newTreatmentSchemaType> = {};

      // Compare form data with existing data and add only the changed fields
      if (data.treatment !== treatmentData?.treatment) {
        updates.treatment = data.treatment;
      }
      if (data.department !== treatmentData?.department) {
        updates.department = data.department;
      }
      if (data.specialization !== treatmentData?.specialization) {
        updates.specialization = data.specialization;
      }
      if (data.price !== treatmentData?.price) {
        updates.price = data.price;
      }
      console.log("treatmentData:", treatmentData);

      // If no updates, exit early
      if (Object.keys(updates).length === 0) {
        console.log("No changes detected");
        return;
      }

      // Dispatch update action with only changed fields
      await dispatch(
        updateTreatment({ treatmentId: data.treatmentId, ...updates })
      );
      const params = {} as any
      dispatch(requestGetTreatment(params))

      navigate(paths.dashboard.Treatment.root);
    } catch (error: any) {
      
      console.error("Error updating treatment", error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
        >
          Edit Treatment
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
        >
          <Field.Text label="Department" name="department" />
          <Field.Text label="Treatment" name="treatment"/>
          <Field.Text
            label="Specialization"
            name="specialization"
          />
          <Field.Text label="Price" name="price" />
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
};
