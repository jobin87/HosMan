import store from 'src/store';

import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { useForm } from 'react-hook-form';
import { Field, Form } from '../hook-form';

import { Iconify } from '../iconify';
import { PasswordModalProps } from './types';

import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle, IconButton, InputAdornment, Stack } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { changeDefaultPassword } from 'src/store/app/appThunk';
// import { API_METHODS, endpoints, makeNetworkCall } from 'src/api'
import { STRONG_PASSWORD_REGEX } from 'src/constants/files.constant';

// ----------------------------------------------------------------

export type DefaultPasswordChangeType = Zod.infer<typeof DefaultPasswordChangeSchema>;

export const DefaultPasswordChangeSchema = zod
  .object({
    newPassword: zod
      .string()
      .min(6, { message: 'Password must be at least 6 characters!' })
      .min(1, { message: 'New password is required!' }),
    confirmNewPassword: zod.string().min(1, { message: 'Confirm password is required!' }),
  })

  .refine((data) => STRONG_PASSWORD_REGEX.test(data.newPassword), {
    message: 'The password is weak make it strong',
    path: ['newPassword'],
  })

  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match!',
    path: ['confirmNewPassword'],
  });

const defaultValues = {
  newPassword: 'Testpassword@123',
  confirmNewPassword: 'Testpassword@123',
};

export function DefaultPasswordChangeModal({ open, onClose, ...other }: PasswordModalProps) {
  const password = useBoolean();
  const confirmNewPassword = useBoolean();

  const methods = useForm<DefaultPasswordChangeType>({
    mode: 'all',
    resolver: zodResolver(DefaultPasswordChangeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await store.dispatch(
        changeDefaultPassword({
          Password: data.newPassword,
        })
      );
      // const response = await makeNetworkCall({
      //     method: API_METHODS.POST,
      //     url: endpoints.AUTH.UPDATE_PASSWORD,
      //     data: { newPassword: data.newPassword },
      // });
      // console.log("default password response", response);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle>Update Your Password</DialogTitle>
      <Form methods={methods}>
        <Field.Text
          name="newPassword"
          helperText="Enter your new password"
          placeholder="New password"
          type={password.value ? 'text' : 'password'}
          sx={{ padding: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="confirmNewPassword"
          helperText="Confirm your new password"
          placeholder="Re-enter your password"
          type={confirmNewPassword.value ? 'text' : 'password'}
          sx={{ padding: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={confirmNewPassword.onToggle} edge="end">
                  <Iconify
                    icon={confirmNewPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack justifyContent="space-between" direction="row" spacing={2} sx={{ my: 3, px: 3 }}>
          <LoadingButton size="medium" variant="soft" onClick={onClose}>
            cancel
          </LoadingButton>
          <LoadingButton
            size="medium"
            variant="contained"
            loading={isSubmitting}
            onClick={onSubmit}
          >
            Update Password
          </LoadingButton>
        </Stack>
      </Form>
    </Dialog>
  );
}
