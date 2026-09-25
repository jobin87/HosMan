import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

import { Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import { paths } from 'src/routes/paths';

export const ForgotPasswordSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
});

export type ForgotPasswordSchemaType = zod.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordView() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    setLoading(true);
    try {
      // Simulate API call for password reset request
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      toast.success(`Password reset link sent to ${data.email}`);
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 4, sm: 5 },
        width: 1,
        maxWidth: 460,
        minHeight: 460,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mx: 'auto',
        boxShadow: (theme) => theme.customShadows?.card || '0px 8px 32px rgba(0, 0, 0, 0.12)',
        borderRadius: 3,
      }}
    >
      <Stack spacing={3.5} sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
            }}
          >
            R
          </Box>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            ResultPrep
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" fontWeight={700}>
            Forgot Password?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Enter your email address to receive a password reset link.
          </Typography>
        </Box>
      </Stack>

      {submitted ? (
        <Stack spacing={3} sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="success.main" fontWeight={600}>
            Check your inbox! We've sent password reset instructions to your email address.
          </Typography>

          <Link
            component={RouterLink}
            to={paths.auth.signIn}
            variant="subtitle2"
            color="primary"
            sx={{ display: 'inline-flex', alignItems: 'center', justifyCenter: 'center', gap: 0.5 }}
          >
            Return to Sign In
          </Link>
        </Stack>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email address"
              autoComplete="off"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              inputProps={{ autoComplete: 'off' }}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              sx={{ py: 1.4, fontSize: 16, fontWeight: 700 }}
            >
              Reset Password
            </LoadingButton>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link
                component={RouterLink}
                to={paths.auth.signIn}
                variant="subtitle2"
                color="primary"
              >
                Return to Sign In
              </Link>
            </Box>
          </Stack>
        </Box>
      )}
    </Card>
  );
}
