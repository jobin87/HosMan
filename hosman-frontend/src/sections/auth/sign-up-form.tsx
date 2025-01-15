import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useRouter } from "src/routes/hooks";

import {
  Button,
  Dialog,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Field, Form, schemaHelper } from "src/components/hook-form";
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { requestUserRegistration } from "src/store/app/appThunk";
import { USER_TYPES } from "src/constants/service.constants";
import IconButton from "@mui/material/IconButton";
import { Iconify } from "src/components/iconify";
import { Password } from "@mui/icons-material";

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
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: "Country is required!" },
  }),
  zipCode: zod
    .string()
    .regex(/^[1-9][0-9]{5}$/, { message: "invalid zipcode" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export function SignUpForm() {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [identityPlaceHolder, setIdentityPlaceHolder] = useState<string | null>(
    "Select User Type"
  );
  const [fullnamePlaceHolder, setFullnamePlaceHolder] = useState<string | null>(
    "Select User Type"
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userName: "",
    userEmail: "",
    userRegNum: "",
    userType: "MANAGER",
    address: "",
    password: "",
    zipcode: "",
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

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

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
              label="Role"
              {...methods.register("userType")}
              defaultValue="MANAGER"
            >
              {USER_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>

            <Field.Text
              {...methods.register("userName")}
              label={fullnamePlaceHolder}
            />
            <Field.Text
              {...methods.register("userRegNum")}
              label={identityPlaceHolder}
            />
            <Field.Text
              {...methods.register("zipCode")}
              label="ZipCode"
            />
            <Field.Text
              {...methods.register("userEmail")}
              label="Email address"
            />
            <Field.Text
              label="Password"
              {...methods.register("password")}
              placeholder="6+ characters"
              type={passwordVisible ? "text" : "password"}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      <Iconify
                        icon={passwordVisible ? "solar:eye-bold" : "solar:eye-closed-bold"}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Stack alignItems="center" sx={{ mt: 3 }} flex={1}>
            <LoadingButton
              type="submit"
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
