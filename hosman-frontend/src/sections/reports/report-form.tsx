import { Grid, Typography, Box, Stack, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch } from "src/store";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "src/components/hook-form";
import { Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addReportList } from "src/store/report/reportThunk";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";  // Import DatePicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

const categories = [
  { label: "Medical", value: "Medical" },
  { label: "Patient Monitoring", value: "Patient Monitoring" },
  { label: "Lab", value: "Lab" },
  { label: "Emergency", value: "Emergency" },
  { label: "Health Screening", value: "Health Screening" },
  { label: "Pharmacy", value: "Pharmacy" },
  { label: "Infection Control", value: "Infection Control" },
  { label: "Clinical Research", value: "Clinical Research" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Technical", value: "Technical" },
];

const priorities = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

const statuses = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Closed", value: "Closed" },
];

export type newReportSchemaType = Zod.infer<typeof newReportSchema>;

export const newReportSchema = zod.object({
  description: zod.string().min(1, { message: "Description is required" }),
  status: zod.string().min(1, { message: "Status is required" }),
  category: zod.string().min(1, { message: "Category is required" }),
  priority: zod.string().min(1, { message: "Priority is required" }),
  dateReported: zod.string().min(1, { message: "Date Reported is required" }),
});

export default function ReportFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
  console.log(errors);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Report Data:", data);

      await dispatch(addReportList(data));

      navigate(paths.dashboard.Reports.root);
    } catch (error: any) {
      console.error("Error adding report", error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" gutterBottom>
          Add Report
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          {/* Category Select */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                {...methods.register("category")}
                defaultValue=""
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Select */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                {...methods.register("status")}
                defaultValue=""
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Priority Select */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                label="Priority"
                {...methods.register("priority")}
                defaultValue=""
              >
                {priorities.map((priority) => (
                  <MenuItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Reported DatePicker */}
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Reported"
                {...methods.register("dateReported")}
                onChange={(newValue: Dayjs | null) => {
                  methods.setValue("dateReported", newValue ? newValue.format("YYYY-MM-DD") : "");
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Description TextField */}
          <Grid item xs={12}>
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
              Save Report
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </Form>
  );
}
