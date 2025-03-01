import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import { Field, Form } from "src/components/hook-form";
import { paths } from "src/routes/paths";
import { z as zod } from "zod";

export const newReportSchema = zod.object({
  description: zod.string().min(1, { message: "specialization is required" }),
  status: zod.string().min(1, { message: "Treatment name is required" }),
  category: zod.string().min(1, { message: "department is required" }),
  priority: zod.string().regex(/^\$\d+$/, {
    message: "Price must be in the format $ followed by digits (e.g., $60)",
  }),
  dateReported: zod.string()
    .min(1, { message: "Treatment ID is required" }),
});

export type newReportSchemaType = Zod.infer<typeof newReportSchema>;

export default function ReportEditForm() {
  const navigate = useNavigate();

  const defaultValues = {
    description: "",
    status: "",
    category: "",
    priority: "",
    dateReported: "",
  };

  const methods = useForm<newReportSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newReportSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  console.log("error:",errors);

  const onSubmit = handleSubmit(async () => {
    try {
      console.log("treatmentData:");
      console.log("treatmentId in form data:");

      // Dispatch update action with only changed fields
      //   await dispatch(
      //     updateTreatment({ treatmentId: data.treatmentId, ...updates })
      //   );

      navigate(paths.dashboard.Treatment.root);
    } catch (error: any) {
      console.error("Error updating treatment", error);
    }
  });

  //   const handleSubmit = () => {
  //     const updatedReport = { ...formData, id: reportId };
  //     dispatch(updateReport(updatedReport)); // Dispatch the update action
  //     navigate('/reports'); // Navigate back to the reports list
  //   };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" gutterBottom>
          Edit Report
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
        >
          <Field.Text
            label="Category"
            variant="outlined"
            fullWidth
            {...methods.register("category")}
            name="category"
          />
          <Field.Text
            label="Status"
            variant="outlined"
            fullWidth
            {...methods.register("status")}
            name="status"
          />
          <Field.Text
            label="Priority"
            variant="outlined"
            fullWidth
            {...methods.register("priority")}
            name="priority"
          />
          <Field.Text
            label="Date Reported"
            variant="outlined"
            fullWidth
            {...methods.register("dateReported")}
            name="dateReported"
          />
          <Grid >
            <Field.Text
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              {...methods.register("description")}
            />
          </Grid>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </Form>
  );
}
