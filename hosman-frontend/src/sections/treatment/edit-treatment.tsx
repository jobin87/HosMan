import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "src/store";
import { z as zod } from "zod";
import { Field, Form } from "src/components/hook-form";
import { Box, Card, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateTreatment } from "src/store/all-staff/allStaffThunk";
import { useNavigate, useLocation } from "react-router-dom";
import { paths } from "src/routes/paths";

// Define the schema for treatment data
export const newTreatmentSchema = zod.object({
  specialization: zod
    .string()
    .min(1, { message: "specialization is required" }),
  treatment: zod.string().min(1, { message: "Treatment name is required" }),
  department: zod.string().min(1, { message: "department is required" }),
  price: zod.string().regex(/^\$\d+$/, {
    message: "Price must be in the format $ followed by digits (e.g., $60)"}),
    treatmentId: zod.string().default(""), // Making treatmentId optional
    
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
    price: treatmentData.price ? String(treatmentData.price) : "", // Convert to string for input field
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
          <Field.Text label="Department" {...methods.register("department")} />
          <Field.Text label="Treatment" {...methods.register("treatment")} />
          <Field.Text
            label="Specialization"
            {...methods.register("specialization")}
          />
          <Field.Text label="Price" {...methods.register("price")} />
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
