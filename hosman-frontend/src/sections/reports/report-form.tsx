import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  MenuItem,
  Card,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/store";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Form } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { addReportList } from "src/store/report/reportThunk";
import { getRoomRoles } from "src/store/roles/roleThunk";


const newReportSchema = zod.object({
  description: zod.string().min(1, { message: "Description is required" }),
  category: zod.string().min(1, { message: "Category is required" }),
  roomNo: zod.string().min(1, { message: "Room is required" }),
});

export default function ReportFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const roomroles = useAppSelector((state) => state.role.roomRolesDetails.data);
  console.log("roooooomrrooles:",roomroles?.rooms.map((room:any) => room.category)); // Log the categories directly


  // Fetching room roles if not already available
  useEffect(() => {
    if (!roomroles || roomroles.length === 0) {
      dispatch(getRoomRoles(roomroles))
        .unwrap()
        .then((response) => {
          console.log("Room Roles Fetched:", response); // Log to inspect the structure
        })
        .catch((error) => {
          console.error("Error fetching room roles:", error);
        });
    }
  }, [dispatch, roomroles]);

  const [filteredRooms, setFilteredRooms] = useState<string[]>([]);

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

  const { handleSubmit, formState: { isSubmitting }, setValue, watch } = methods;

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await dispatch(addReportList(formData));
      navigate(paths.dashboard.Reports.root);
    } catch (error) {
      console.error("Error adding report", error);
    }
  });

  // Function to parse range of rooms, e.g., "A1 to A5"
  const parseRange = (range: string): string[] => {
    const [start, end] = range.split("to").map((r) => r.trim());
    const extractParts = (room: string) => {
      const match = room.match(/^([a-zA-Z]*)(\d+)$/);
      return match ? { prefix: match[1], number: parseInt(match[2]) } : null;
    };

    const startParts = extractParts(start);
    const endParts = extractParts(end);

    if (!startParts || !endParts || startParts.prefix !== endParts.prefix) {
      return [];
    }

    return Array.from(
      { length: endParts.number - startParts.number + 1 },
      (_, i) => `${startParts.prefix}${startParts.number + i}`
    );
  };

  // Handle category change to filter available rooms
  const handleCategoryChange = (category: string) => {
    setValue("category", category);

    const categoryData = roomroles?.rooms?.find((room: any) => room.category === category);
    if (categoryData) {
      let availableRooms = parseRange(categoryData.range);
      
      if (categoryData.missingRooms) {
        const missing = categoryData.missingRooms
          .replace("Missing rooms:", "")
          .split(",")
          .map((room: any) => room.trim());
        availableRooms = availableRooms.filter((room) => !missing.includes(room));
      }

      setFilteredRooms(availableRooms);
      setValue("roomNo", "");
    }
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
        <Typography variant="h4" gutterBottom>
          Add Report
        </Typography>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <Grid item xs={12}>
            <Field.Select
              label="Category"
              {...methods.register("category")}
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={watch("category")}
            >
              {Array.isArray(roomroles?.rooms) && roomroles?.rooms.length > 0 ? (
                roomroles.rooms.map((room: any, index: number) => (
                  <MenuItem key={index} value={room.category}>
                    {room.category}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Field.Select>
          </Grid>

          <Grid item xs={12}>
            <Field.Select label="Room" {...methods.register("roomNo")} value={watch("roomNo")}>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, index) => (
                  <MenuItem key={index} value={room}>
                    {room}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No rooms available</MenuItem>
              )}
            </Field.Select>
          </Grid>

          <Grid item xs={12}>
            <Field.Text
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              name="description"
            />
          </Grid>

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
