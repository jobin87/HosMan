import {
  Grid,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

const categories = [
  { id: 1, name: "Room Maintenance" },
  { id: 2, name: "Lab Equipment Issues" },
  { id: 3, name: "Inventory Needs" },
  { id: 4, name: "Patient Needs" },
  { id: 5, name: "Staff Shortages" },
];

const roomOptions = {
  "Room Maintenance": ["Room 101", "Room 102", "Room 103"],
  "Lab Equipment Issues": ["Lab 1", "Lab 2", "Lab 3", "Lab 4", "Lab 5"],
  "Inventory Needs": ["Storage A", "Storage B"],
  "Patient Needs": ["Ward 1", "Ward 2", "Ward 3"],
  "Staff Shortages": ["Admin Room", "Staff Room"],
};

const newReportSchema = zod.object({
  description: zod.string().min(1, { message: "Description is required" }),
  category: zod.string().min(1, { message: "Category is required" }),
  roomNo: zod.string().min(1, { message: "Room is required" }),
});

export default function ReportFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    description: "",
    roomNo: "",
    category: "",
  };

  const methods = useForm({
    mode: "onSubmit",
    resolver: zodResolver(newReportSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = methods;

  const selectedCategory = watch("category"); // Get selected category value
  const selectedRoom = watch("roomNo"); // Get selected room value

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Report Data:", data);
      await dispatch(addReportList(data));
      navigate(paths.dashboard.Reports.root);
    } catch (error) {
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
          {/* Category Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={selectedCategory || ""}
                {...methods.register("category")}
                onChange={(e) => {
                  setValue("category", e.target.value);
                  setValue("roomNo", ""); // Reset roomNo when category changes
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Room Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" disabled={!selectedCategory}>
              <InputLabel>Room</InputLabel>
              {/* <Select
                label="Room"
                value={selectedRoom || ""}
                {...methods.register("roomNo")}
                onChange={(e) => setValue("roomNo", e.target.value)}
              >
                {(roomOptions[selectedCategory] || []).map((room, index) => (
                  <MenuItem key={index} value={room}>
                    {room}
                  </MenuItem>
                ))}
              </Select> */}
            </FormControl>
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

          {/* Submit Button */}
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Report
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </Form>
  );
}
