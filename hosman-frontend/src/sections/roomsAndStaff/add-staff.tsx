import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Card, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Field, Form } from "src/components/hook-form";
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { createNewStaff } from "src/store/all-staff/allStaffThunk";
import { z as zod } from "zod";

const staffTypes = ["Doctor","Nurse", "Technician", "Electrician", "Plumber", "Pharmacist","Radiografer","Lab-Technician"];

export type NewStaffSchemaType = zod.infer<typeof newStaffSchema>;

const newStaffSchema = zod.object({
  staffType: zod.string().min(1, { message: "Staff type is required" }),
  Name: zod.string().min(1, { message: "Name is required" }),
  staffRegId: zod.string().min(1, { message: "Registration ID is required" }),
  experience: zod.string().min(1, { message: "Experience is required" }),
  department: zod.string().min(1, { message: "Specialization is required" }),
  contactNumber: zod
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .max(15, { message: "Contact number is too long" }),
});

export const StaffRegistrationForm = () => {
  const dispatch = useAppDispatch();

  const defaultValues = {
    Name: "",
    staffType: "",
    experience:"",
    department:"",
    staffRegId: "",
    contactNumber: "",
  };

  const methods = useForm<NewStaffSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newStaffSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(createNewStaff(data));
      if (response?.payload) {
        toast.success(`${data.staffType} added successfully!`);
        // navigate(paths.dashboard.root);
      }
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred while adding the ${data.staffType.toLowerCase()}.`);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Register New Staff
        </Typography>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <FormControl fullWidth>
            <InputLabel>Staff Type</InputLabel>
            <Select {...methods.register("staffType")} defaultValue="">
              {staffTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Field.Text label="Name" {...methods.register("Name")} />
          <Field.Text label="Registration ID" {...methods.register("staffRegId")} />
          <Field.Text label="Experience" {...methods.register("experience")} />
          <Field.Text label="department" {...methods.register("department")} />
          <Field.Text label="Contact Number" {...methods.register("contactNumber")} />
          {errors.contactNumber && <span>{errors.contactNumber.message}</span>}
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add Staff
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
};
