import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";

import { RouterLink } from "src/routes/components";
import { paths } from "src/routes/paths";

import { useBoolean } from "src/hooks/use-boolean";

import { useAppDispatch } from "src/store";
import { requestSignInWithPassword } from "src/store/app/appThunk";

import { AnimateLogo2 } from "src/components/animate";
import { Field, Form } from "src/components/hook-form";
import { Iconify } from "src/components/iconify";

import { useEffect } from "react";
import toast from "react-hot-toast";
import useUniqueBrowserId from "src/hooks/use-browser-id";
import { FormHead } from "../form-head";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  password: zod
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
  deviceId: zod.string().min(1, { message: "Device ID is required!" }),
});

export function CenteredSignInView() {
  const password = useBoolean();
  const dispatch = useAppDispatch();
  const uniqueBrowserId = useUniqueBrowserId();
  const navigate= useNavigate()

  const defaultValues = {
    password: "",
    email: "",
    deviceId: "",
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  // console.log(errors);

  const getClientIp = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };

  useEffect(() => {
    if (uniqueBrowserId) {
      methods.setValue("deviceId", String(uniqueBrowserId));
    }
  }, [uniqueBrowserId, methods]);

  const onSubmit = handleSubmit(async (data) => {
    const ipaddress = await getClientIp();
    console.log(ipaddress)
    if (await ipaddress) {
      try {
        const response = await dispatch(
          requestSignInWithPassword({
            email: data.email,
            password: data.password,
            deviceId: data.deviceId,
            clientIP: ipaddress,
          })
        );
        if(response.payload){
          navigate(paths.onboarding.root)
          console.log('1')
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Error fetching IP address! Try again later.");
    }
  });

  const renderLogo = <AnimateLogo2 sx={{ mb: 3, mx: "auto" }} />;

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="email"
        {...methods.register}
        label="Email address"
        InputLabelProps={{ shrink: true }}
      />

      <Box gap={1.5} display="flex" flexDirection="column">
        <Link
          component={RouterLink}
          href={paths.auth.forgotPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: "flex-end" }}
        >
          Forgot password?
        </Link>

        <Field.Text
          name="password"
          label="Password"
          {...methods.register}
          placeholder="6+ characters"
          type={password.value ? "text" : "password"}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify
                    icon={
                      password.value
                        ? "solar:eye-bold"
                        : "solar:eye-closed-bold"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <Box
      sx={{
        py: 5,
        px: 3,
        width: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        maxWidth: "var(--layout-auth-content-width)",
      }}
    >
      {renderLogo}

      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link
              component={RouterLink}
              href={paths.auth.signUp}
              variant="subtitle2"
            >
              Get started
            </Link>
          </>
        }
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </Box>
  );
}
