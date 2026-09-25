import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { useNavigate, Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { useAppDispatch } from 'src/store';
import { requestRegisterUser } from 'src/store/app/appThunk';

// Zod Schema for Registration Validation
export const SignUpSchema = zod
  .object({
    name: zod.string().min(2, { message: 'Full name must be at least 2 characters' }),
    email: zod
      .string()
      .min(1, { message: 'Email address is required' })
      .email({ message: 'Please enter a valid email address' }),
    userRegNum: zod.string().min(1, { message: 'License No / Reg No is required' }),
    role: zod.enum(['user', 'admin'] as const, {
      required_error: 'Please select a role',
    }),
    password: zod
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: zod.string().min(1, { message: 'Please confirm your password' }),
    agreeTerms: zod.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export function SignUpView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      userRegNum: '',
      role: 'user',
      password: '',
      confirmPassword: '',
      agreeTerms: true,
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    setLoading(true);
    try {
      const res = await dispatch(
        requestRegisterUser({
          userName: data.name,
          userEmail: data.email,
          password: data.password,
          role: data.role,
        })
      ).unwrap();

      toast.success(res?.message || 'Registration submitted successfully!');
      navigate(paths.auth.signIn);
    } catch (error: any) {
      toast.error(error?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 4, sm: 5 },
        width: 1,
        maxWidth: 560,
        minHeight: 640,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mx: 'auto',
        boxShadow: (theme) => theme.customShadows?.card || '0px 12px 40px rgba(0, 0, 0, 0.1)',
        borderRadius: 3,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack spacing={3.5} sx={{ mb: 4, textAlign: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
            }}
          >
            R
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ lineHeight: 1.2 }}>
              Result<Box component="span" sx={{ color: 'primary.main' }}>Prep</Box>
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              Registration Form
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
            Create an Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to={paths.auth.signIn} variant="subtitle2" color="primary" underline="hover">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Stack>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Full Name"
            autoComplete="off"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            inputProps={{ autoComplete: 'off' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:user-bold-duotone" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Email Address"
            autoComplete="off"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ autoComplete: 'off' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:letter-bold-duotone" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="License No / Registration No"
            autoComplete="off"
            {...register('userRegNum')}
            error={!!errors.userRegNum}
            helperText={errors.userRegNum?.message}
            inputProps={{ autoComplete: 'off' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:card-bold-duotone" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            fullWidth
            label="Account Role"
            defaultValue="user"
            {...register('role')}
            error={!!errors.role}
            helperText={errors.role?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:shield-user-bold-duotone" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>

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
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:lock-password-bold-duotone" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            inputProps={{ autoComplete: 'new-password' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:lock-password-bold-duotone" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify icon={showConfirmPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box>
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} color="primary" size="small" />}
                  label={
                    <Typography variant="caption" color="text.secondary">
                      I agree to the{' '}
                      <Link color="primary" underline="hover" href="#">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link color="primary" underline="hover" href="#">
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              )}
            />
            {errors.agreeTerms && (
              <FormHelperText error sx={{ ml: 1.5, mt: 0 }}>
                {errors.agreeTerms.message}
              </FormHelperText>
            )}
          </Box>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            sx={{
              py: 1.5,
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 1.5,
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
            }}
          >
            Create ResultPrep Account
          </LoadingButton>
        </Stack>
      </Box>
    </Card>
  );
}

