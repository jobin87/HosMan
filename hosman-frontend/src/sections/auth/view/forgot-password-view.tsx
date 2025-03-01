import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';

import { Field, Form } from 'src/components/hook-form';
import { useAppDispatch, useAppSelector } from 'src/store';

import { requestForgetPassword } from 'src/store/app/appThunk';

import { useRouter } from 'src/routes/hooks';

import toast from 'react-hot-toast';
import { FormHead } from '../form-head';

import { setForgetPassword } from 'src/store/app/appReducer';
import { networkCallInitialState } from 'src/store/types';
import { FormReturnLink } from '../form-return-link';

// Define the schema for validating the email field
export type ForgetPasswordSchemaType = zod.infer<typeof ForgetPasswordSchema>;

export const ForgetPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// Component for the forgot password form
export function ForgotPasswordView() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.app.forgetpassword);

  const defaultValues = useMemo(() => ({ email: '' }), []);

  const methods = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      dispatch(
        requestForgetPassword({
          email: data.email,
        })
      );
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (data?.emailSend) {
      toast.success('A reset password link has been sent to your email!');
      router.push(paths.auth.signIn);
      dispatch(setForgetPassword(networkCallInitialState));
    }
  }, [data]);

  // Form UI with validation and loading state
  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text
        name="email"
        label="Email address"
        placeholder="example@gmail.com"
        autoFocus
        InputLabelProps={{ shrink: true }}
      />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
        Send request
      </LoadingButton>
    </Box>
  );

  return (
    <Box textAlign={'center'}>
      <FormHead
        title="Forgot your password?"
        description="Please enter the email address associated with your account and we'll email you a link to reset your password."
      />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      <FormReturnLink href={paths.auth.signIn} />
    </Box>
  );
}
