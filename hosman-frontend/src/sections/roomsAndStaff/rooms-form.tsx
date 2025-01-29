import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { Field, Form } from "src/components/hook-form";
import { string, z as zod } from "zod";



export type newPatientScemaType = Zod.infer<typeof newPatientSchema>;
export const newPatientSchema = zod .object({
    categoryName: zod.string().min(1, { message: "patient Name is required!" }),
    roomNo: zod.coerce.number().min(1, { message: "age is required" }),
});
export const CategoryBasedRooms= ()=>{
    const defaultValues = {
        categoryName: "",
        roomNo:0,
      };
      
      
      const methods = useForm<newPatientScemaType>({
          mode: "onSubmit",
          resolver: zodResolver(newPatientSchema),
          defaultValues,
        });

        const {
            handleSubmit, 
           formState:{isSubmitting, errors} 
           } = methods;
         console.log(errors)

        
          const onSubmit = handleSubmit(async (data) => {
            try {
                const formattedData={
                    ...data,
                age: string(data.categoryName),
                roomNo: Number(data.roomNo),
                }
              const response = await dispatch(requestAddPatientList(formattedData));
              if(response){
                console.log("hello")
              }
            } catch (error: any) {}
          });

          return (
            <Form methods={methods} onSubmit={onSubmit}>
              <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
                  Register  New Patient
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
                  <Field.Text  label="Doctor Name" {...methods.register("categoryName")} />
                  <Field.Text label="Contact Number" {...methods.register("roomNo")} />
                          
                </Box>
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Add Category
                  </LoadingButton>
                </Stack>
              </Card>
            </Form>
          );
        
    }