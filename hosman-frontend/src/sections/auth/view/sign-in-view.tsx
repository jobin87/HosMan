import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

import { useNavigate, Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { useAppDispatch } from 'src/store';
import { requestSignInWithPassword } from 'src/store/app/appThunk';

// Zod Schema for Login Validation
export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export function CenteredSignInView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setLoading(true);
    try {
      const res = await dispatch(
        requestSignInWithPassword({ userEmail: data.email, password: data.password })
      ).unwrap();

      const user = res?.user || res?.data?.user;
      const userName = user?.userName || user?.name || data.email.split('@')[0];

      toast.success(`Welcome back, ${userName}!`);
      navigate(paths.dashboard.root);
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 4, sm: 5 },
        width: 1,
        maxWidth: 480,
        minHeight: 520,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mx: 'auto',
        boxShadow: (theme) => theme.customShadows?.card || '0px 12px 40px rgba(0, 0, 0, 0.12)',
        borderRadius: 3,
      }}
    >
      <Stack spacing={3.5} sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 24,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
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
            Sign in to your account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to={paths.auth.signUp} variant="subtitle2" color="primary">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Stack>

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

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            inputProps={{ autoComplete: 'new-password' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            sx={{ py: 1.6, fontSize: 16, fontWeight: 700, mt: 1 }}
          >
            Sign In
          </LoadingButton>
        </Stack>
      </Box>
    </Card>
  );
}
