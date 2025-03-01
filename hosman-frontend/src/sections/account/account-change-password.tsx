import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

export type ChangePassWordSchemaType = zod.infer<typeof ChangePassWordSchema>;

export const ChangePassWordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .min(1, { message: 'Current password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    newPassword: zod
      .string()
      .min(1, { message: 'New password is required!' })
      .min(6, { message: 'Password must be at least 6 characters!' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from the current password',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export function AccountChangePassword() {
  const passwordVisibility = useBoolean();

  const methods = useForm<ChangePassWordSchemaType>({
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     const response = await dispatch(
  //       updateUserPassword({
  //         currentPassword: data.currentPassword?.toString(),
  //         newPassword: data.newPassword?.toString(),
  //       })
  //     ).unwrap();
  //     if (response?.passwordUpdated) {
  //       toast.success('Password updated successfully!');
  //       reset({
  //         currentPassword: '',
  //         newPassword: '',
  //         confirmPassword: '',
  //       });
  //     } else {
  //       toast.error('Failed to update password');
  //     }
  //   } catch (error) {
  //     console.error('Error updating password:', error);
  //     toast.error('Error updating password');
  //   }
  // });

  return (
    <Form methods={methods} >
      <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
        {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
          <Field.Text
            key={field}
            name={field}
            type={passwordVisibility.value ? 'text' : 'password'}
            label={
              field === 'currentPassword'
                ? 'Current password'
                : field === 'newPassword'
                  ? 'New password'
                  : 'Confirm new password'
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={passwordVisibility.onToggle} edge="end">
                    <Iconify
                      icon={passwordVisibility.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={
              field === 'newPassword' && (
                <Stack component="span" direction="row" alignItems="center">
                  <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be at
                  least 6 characters
                </Stack>
              )
            }
          />
        ))}

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save Changes
        </LoadingButton>
      </Card>
    </Form>
  );
}
