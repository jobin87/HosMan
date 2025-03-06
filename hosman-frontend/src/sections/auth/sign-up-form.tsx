import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useRouter } from "src/routes/hooks";

import { Button, Dialog, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Field, Form, schemaHelper } from "src/components/hook-form";
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { requestUserRegistration } from "src/store/app/appThunk";
import { USER_TYPES } from "src/constants/service.constants";
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
  role: schemaHelper.objectOrNull<string | null>({
    message: { required_error: "Type is required!" },
  }),
  department: zod.string().min(1, { message: "department is required!" }),

  specialization: zod.string().min(1, { message: "specialization is required!" }),
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
    department:"",
    specialization: "",
    userEmail: "",
    userRegNum: "",
    role: "Manager",
    address: "",
    password: "",
    zipcode: "",
  };

  const methods = useForm<NewUserSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });
  const isResendLoading = false;

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  console.log(errors);

  const values = watch();

  useEffect(() => {
    switch (values.role) {
      case "Doctor":
        setIdentityPlaceHolder("Doctor ID");
        setFullnamePlaceHolder("Doctor Name");
        break;
      case "Manager":
        setIdentityPlaceHolder("Hospital Registration Number");
        setFullnamePlaceHolder("Manager Name");
        break;
      case "Nurse":
        setIdentityPlaceHolder("Nurse ID");
        setFullnamePlaceHolder("Nurse Name");
        break;
      default:
        setIdentityPlaceHolder("Hospital Registration Number");
        setFullnamePlaceHolder("Manager Name");
        break;
    }
  }, [values.role]);

  const onSubmit = handleSubmit(async () => {
    const formData = methods.getValues();
    try {
      const response = await dispatch(
        requestUserRegistration(formData as any)
      ).unwrap();
      console.log(response);
      if (response?.userWithRoleRequested === true) {
        console.log("1");
        toast.success("Registration completed successfully");
        setIsSignUpSuccess(true);
        reset();
      } else {
        toast.error("Sign Up Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign up.");
    }
  });

  const handleResendVerification = async () => {
    // setIsResendLoading(true);
    // try {
    //   await dispatch(resendVerificationEmail({ email: values.userEmail })).unwrap();
    //   toast.success("Verification email resent successfully.");
    // } catch (error) {
    //   toast.error("Failed to resend verification email.");
    // } finally {
    //   setIsResendLoading(false);
    // }
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
              name="role"
              label="Role"
              children={USER_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              defaultValue={"Manager"}
            />
            <Field.Text name="userName" label={fullnamePlaceHolder} />

            <Field.Text name="department" label="department" />
            <Field.Text name="specialization" label="specialization" />
            <Field.Text name="userRegNum" label={identityPlaceHolder} />

            <Field.Text {...methods.register} name="zipCode" label="ZipCode" />
            <Field.Text name="userEmail" label="Email address" />
            <Field.Text
              name="password"
              label="Password"
              placeholder="6+ characters"
              InputLabelProps={{ shrink: true }}
            />
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
            <Typography variant="body1">
              A verification email has been sent to your email address. Please
              verify to continue.
            </Typography>
            <LoadingButton
              variant="outlined"
              onClick={handleResendVerification}
              loading={isResendLoading}
            >
              Resend Verification Email
            </LoadingButton>
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
