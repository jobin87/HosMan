import { Grid, Typography, Box, Stack, MenuItem, Card } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/store";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { addReportList } from "src/store/report/reportThunk";
import { useEffect, useState } from "react";
import { getRoomRoles } from "src/store/roles/roleThunk";

// Validation schema for the report form
const newReportSchema = zod.object({
  description: zod.string().min(1, { message: "Description is required" }),
  category: zod.string().min(1, { message: "Category is required" }),
  roomNo: zod.string().min(1, { message: "Room is required" }),
});

export default function ReportFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.role.roomRolesDetails.data);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRooms, setFilteredRooms] = useState<string[]>([]);

  useEffect(() => {
    if (!data?.data?.length) {
      dispatch(getRoomRoles({}));
    }
  }, [data?.data]);

  const defaultValues = {
    description: "",
    roomNo: "",
    category: selectedCategory, // Make sure the default category is set
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
  console.log(errors)


  const onSubmit = handleSubmit(async (formData) => {
    try {
      console.log("Report Data:", formData);
      await dispatch(addReportList(formData));
      navigate(paths.dashboard.Reports.root);
    } catch (error) {
      console.error("Error adding report", error);
    }
  });

  // Helper function to generate room numbers from a range string
  const getRoomNumbers = (range: string) => {
    const [start, end] = range.split("to").map((val) => val.trim());
  
    // Function to extract the numeric part and the alphanumeric prefix
    const extractParts = (room: string) => {
      const match = room.match(/^([a-zA-Z]+)(\d+)$/);
      if (match) {
        return {
          prefix: match[1],
          number: parseInt(match[2]),
        };
      }
      return { prefix: "", number: 0 };
    };
  
    const startParts = extractParts(start);
    const endParts = extractParts(end);
  
    const roomNumbers = [];
  
    // If the room has a prefix, handle alphanumeric generation
    if (startParts.prefix === endParts.prefix) {
      for (let i = startParts.number; i <= endParts.number; i++) {
        roomNumbers.push(`${startParts.prefix}${i}`);
      }
    } else {
      // Handle edge case if the prefix is different (e.g., P1 to P5, or storage1 to storage5)
      let current = startParts;
      while (
        current.prefix === startParts.prefix &&
        current.number <= endParts.number
      ) {
        roomNumbers.push(`${current.prefix}${current.number}`);
        current.number++;
      }
    }
  
    return roomNumbers;
  };
  

  // Filter rooms based on the selected category
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category); // Update the selected category state
    setValue("category", category); // Update the form field value for category

    const categoryRooms = data?.data?.find(
      (room: any) => room.category === category
    );
    if (categoryRooms) {
      setFilteredRooms(getRoomNumbers(categoryRooms.range));
      // Reset roomNo when category changes
      setValue("roomNo", ""); // This will reset the roomNo field
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" gutterBottom>
          Add Report
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          gap={2}
        >
          {/* Category Dropdown */}
          <Grid item xs={12}>
            <Field.Select
              label="Category"
              {...methods.register("category")}
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={watch("category")} // Bind category field to the selected value
            >
              {Array.isArray(data?.data) &&
                data?.data?.map((room: any, index: number) => (
                  <MenuItem key={index} value={room.category}>
                    {room.category}
                  </MenuItem>
                ))}
            </Field.Select>
          </Grid>

          {/* Room Numbers Dropdown */}
          <Grid item xs={12}>
            <Field.Select
              label="Room"
              {...methods.register("roomNo")}
              value={watch("roomNo")} // Bind roomNo field to the selected value
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((roomNumber, index) => (
                  <MenuItem key={index} value={roomNumber}>
                    {roomNumber}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No rooms available</MenuItem>
              )}
            </Field.Select>
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
