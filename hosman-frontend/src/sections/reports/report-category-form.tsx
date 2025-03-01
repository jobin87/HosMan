import {
    Typography,
    Box,
    Stack,
  } from "@mui/material";
  import { useAppDispatch } from "src/store";
  import { z as zod } from "zod";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Field, Form } from "src/components/hook-form";
  import { Card } from "@mui/material";
  import { LoadingButton } from "@mui/lab";
import { createRoomRoles } from "src/store/roles/roleThunk";
  

  export type NewRoomAndCategorySchemaType = zod.infer<typeof NewRoomAndCategorySchema>;
  const NewRoomAndCategorySchema = zod.object({
    category: zod.string().min(1, { message: "Category is required" }),
    roomNo: zod.string().min(1, { message: "Room is required" }),
  });
  
  export default function RoomsAndCategoryPage() {
    const dispatch = useAppDispatch();
  
    const defaultValues = {
      roomNo: "",
      category: "",
    };
  
    const methods = useForm<NewRoomAndCategorySchemaType>({
      mode: "onSubmit",
      resolver: zodResolver(NewRoomAndCategorySchema),
      defaultValues,
    });
  
    const {
      handleSubmit,
      formState: { isSubmitting, errors },
    } = methods;
    console.log(errors)
    
    const onSubmit = handleSubmit(async (data) => {
      try {
        console.log("Report Data:", data);
        await dispatch(createRoomRoles(data));
        // navigate(paths.dashboard.Reports.root);
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
            Add Rooms
          </LoadingButton>
        </Stack>
        
          
        </Card>
      </Form>
    );
  }
  