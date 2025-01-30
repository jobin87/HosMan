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
  import { addReportList, createRoomsAndCategories } from "src/store/report/reportThunk";
  
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
    category: zod.string().min(1, { message: "Category is required" }),
    roomNo: zod.string().min(1, { message: "Room is required" }),
  });
  
  export default function ReportFormPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
  
    const defaultValues = {
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
        await dispatch(createRoomsAndCategories(data));
        navigate(paths.dashboard.Reports.root);
      } catch (error) {
        console.error("Error adding report", error);
      }
    });
  
    return (
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
          <Typography variant="h4" gutterBottom>
            Add categories and assign Rooms
          </Typography>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <Field.Text  label="Category" {...methods.register("category")} />
          <Field.Text  label="roomNo" {...methods.register("roomNo")} />
          
        </Box>
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add Doctor
          </LoadingButton>
        </Stack>
        
          
        </Card>
      </Form>
    );
  }
  