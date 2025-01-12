import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useRouter } from "src/routes/hooks";

import { Button, Dialog, InputAdornment, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Field, Form, schemaHelper } from "src/components/hook-form";
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { requestUserRegistration } from "src/store/app/appThunk";
import { USER_TYPES } from "src/constants/service.constants";
import IconButton from '@mui/material/IconButton';
import { Iconify } from "src/components/iconify";

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  userName: zod.string().min(1, { message: "Name is required!" }),
  userEmail: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  userRegNum: zod
    .string()
    .min(1, { message: "Cannot leave this field empty!" }),
  userType: schemaHelper.objectOrNull<string | null>({
    message: { required_error: "Type is required!" },
  }),
  address: zod.string().min(1, { message: "Address is required!" }),
  zipcode: zod.string().min(1, { message: "Zip code is required!" }),
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: "Country is required!" },
  }),
  zipCode: zod.string()
  .regex(/^[1-9][0-9]{5}$/,{message:'invalid zipcode'}),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

export function SignUpForm(data: any) {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const [identityPlaceHolder, setIdentityPlaceHolder] = useState<string | null>(
    "Select Seller Type"
  );
  const [fullnamePlaceHolder, setFullnamePlaceHolder] = useState<string | null>(
    "Select Seller Type"
  );

  const router = useRouter();
  const dispatch = useAppDispatch();  

  const defaultValues = {
    sellerName: "",
    sellerEmail: "",
    sellerRegNum: "",
    UserType: "",
    address: "",
    state: "",
    zipcode: "",
    country: "Oman",
    countryCode: "+968",
    phone: "",
    contactPerson: "",
  };

  const methods = useForm<NewUserSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();


  useEffect(() => {
    switch (values.userType) {
      case "DOCTOR":
        setIdentityPlaceHolder("Doctor ID");
        setFullnamePlaceHolder("Doctor Name");
        break;
      case "MANAGER":
        setIdentityPlaceHolder("Hospital Registration Number");
        setFullnamePlaceHolder("Manager Name");
        break;
      case "NURSE":
        setIdentityPlaceHolder("Nurse ID");
        setFullnamePlaceHolder("Nurse Name");
        break;
      default:
        setIdentityPlaceHolder("Hospital Registration Number");
        setFullnamePlaceHolder("Manager Name");
        break;
    }
  }, [values.userType]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = methods.getValues();
    try {
      const response = await dispatch(
        requestUserRegistration(formData as any)
      ).unwrap();
      console.log(response);
      if (response?.userWithRoleRequested) {
        toast.success("Registration completed successfully");
        setIsSignUpSuccess(true);
      } else {
        toast.error("Sign Up Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign up.");
    }
  });

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
          >
            <Field.Select
              fullWidth
              name="userType"
              label="Role"
              children={USER_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              defaultValue={"MANAGER"}
            />
            <Field.Text name="sellerName" label={fullnamePlaceHolder} />
            <Field.Text name="sellerRegNum" label={identityPlaceHolder} />

            <Field.Text name="zipcode" label="ZipCode" />
            <Field.Text name="sellerEmail" label="Email address" />



          </Box>
          <Stack alignItems="flex-center" sx={{ mt: 3 }} flex={1}>
            <LoadingButton
              type="submit"
              onClick={onSubmit}
              variant="contained"
              loading={isSubmitting}
              sx={{ py: 1.5 }}
            >
              Register
            </LoadingButton>
          </Stack>
        </Card>
      </Form>

      <Dialog open={isSignUpSuccess}>
        <Box px={3} pt={2} pb={2.5}>
          <Stack spacing={2}>
            <Typography variant="h4">Registration Successful</Typography>
            <Typography variant="body1" sx={{ mt: -1 }}>
              We have sent a verification email to your email address. Please
              verify your email to continue.
            </Typography>
            <Box textAlign="right">
              <Button
                onClick={() => {
                  setIsSignUpSuccess(false);
                  router.push(paths.auth.signIn);
                }}
                variant="contained"
              >
                Return to Sign In
              </Button>
            </Box>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
