import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Stack,
  Card,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Field, Form } from "src/components/hook-form"; // ✅ Keeping your Form component
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { createNewStaff } from "src/store/all-staff/allStaffThunk";
import { z as zod } from "zod";

const staffTypes = [
  "Doctor",
  "Nurse",
  "Technician",
  "Electrician",
  "Plumber",
  "Pharmacist",
  "Radiographer",
  "Lab-Technician",
];

export type NewStaffSchemaType = zod.infer<typeof newStaffSchema>;

const newStaffSchema = zod.object({
  staffType: zod.string().min(1, { message: "Staff type is required" }),
  Name: zod.string().min(1, { message: "Name is required" }),
  staffRegId: zod.string().min(1, { message: "Registration ID is required" }),

  experience: zod
    .number({ invalid_type_error: "Experience must be a valid number" })
    .min(1, { message: "Experience must be at least 1 year" })
    .max(50, { message: "Experience cannot be greater than 50 years" }), // ✅ Added max 50

  department: zod.string().min(1, { message: "Department is required" }),
  Specialization: zod.string().min(1, { message: "Specialization is required" }),

  contactNumber: zod
    .number({ invalid_type_error: "Contact number must be a valid number" })
    .refine((val) => val.toString().length >= 10 && val.toString().length <= 15, {
      message: "Contact number must be between 10 and 15 digits",
    }), 
});


export const StaffRegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const methods = useForm<NewStaffSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(newStaffSchema),
    defaultValues: {
      Name: "",
      staffType: "",
      experience: 0,
      department: "",
      Specialization: "",
      staffRegId: "",
      contactNumber: 0,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(createNewStaff(data)).unwrap();
      if (response) {
        toast.success(`${data.staffType} added successfully!`);
        navigate(paths.dashboard.staff.staffManagement);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `An error occurred while adding the ${data.staffType.toLowerCase()}.`
      );
    }
  });

  return (
    <Container maxWidth="md">
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 4, boxShadow: 2 }} elevation={3}>
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
          >
            Register New Staff
          </Typography>

          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={3}
          >
            {/* ✅ Controlled Select Field */}
            <FormControl fullWidth>
              <InputLabel>Staff Type</InputLabel>
              <Controller
                name="staffType"
                control={control}
                render={({ field }) => (
                  <Select {...field} value={field.value || ""}>
                    {staffTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            {/* ✅ Using Field.Text for Inputs */}
            <Field.Text name="Name" label="Name" />
            <Field.Text name="staffRegId" label="Registration ID" />
            <Field.Text
              name="experience"
              label="Experience"
              type="number"
              value={
                methods.watch("experience") === 0
                  ? ""
                  : methods.watch("experience")
              } // ✅ Show empty initially
              onChange={(e) =>
                methods.setValue(
                  "experience",
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              } // ✅ Convert empty to 0
              inputProps={{ min: 1 }}
            />{" "}
            <Field.Text name="department" label="Department" />
            <Field.Text name="Specialization" label="Specialization" />
            <Field.Text
              name="contactNumber"
              label="Contact Number"
              type="number"
              value={
                methods.watch("contactNumber") === 0
                  ? ""
                  : methods.watch("contactNumber")
              } // ✅ Show empty initially
              onChange={(e) =>
                methods.setValue(
                  "contactNumber",
                  e.target.value === "" ? 0 : Number(e.target.value)
                )
              } // ✅ Convert empty to 0
              inputProps={{ min: 1000000000, max: 999999999999999 }}
            />{" "}
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 4 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add Staff
            </LoadingButton>
          </Stack>
        </Card>
      </Form>
    </Container>
  );
};
