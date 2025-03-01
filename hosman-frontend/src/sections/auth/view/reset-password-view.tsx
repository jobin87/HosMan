// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { useLocation } from 'react-router';
// import { z as zod } from 'zod';

// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';

// import { paths } from 'src/routes/paths';

// import { useBoolean } from 'src/hooks/use-boolean';

// // import { SentIcon } from 'src/assets/icons';

// import { Field, Form } from 'src/components/hook-form';
// import { Iconify } from 'src/components/iconify';

// import toast from 'react-hot-toast';
// import { useRouter } from 'src/routes/hooks';
// import { useAppDispatch, useAppSelector } from 'src/store';
// import { setResetPassword } from 'src/store/app/appReducer';
// import { requestResetPassword } from 'src/store/app/appThunk';
// import { networkCallInitialState } from 'src/store/types';
// import { FormHead } from '../form-head';
// import { FormResendCode } from '../form-resend-code';
// import { FormReturnLink } from '../form-return-link';

// // ----------------------------------------------------------------------

// export type ResetPasswordSchemaType = zod.infer<typeof ResetPasswordSchema>;

// export const ResetPasswordSchema = zod
//   .object({
//     password: zod
//       .string()
//       .min(1, { message: 'Password is required!' })
//       .min(6, { message: 'Password must be at least 6 characters!' }),
//     confirmPassword: zod
//       .string()
//       .min(1, { message: 'Password is required!' })
//       .min(6, { message: 'Password must be at least 6 characters!' }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match!",
//     path: ['confirmPassword'], // Error will be shown on confirmPassword field
//   });

// // ----------------------------------------------------------------------

// export function ResetPasswordView() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const password = useBoolean();
//   const location = useLocation();

//   const { data, loading } = useAppSelector((state) => state.app.resetpassword);

//   const defaultValues = {
//     password: '',
//     confirmPassword: '',
//   };

//   const methods = useForm<ResetPasswordSchemaType>({
//     resolver: zodResolver(ResetPasswordSchema),
//     defaultValues,
//   });
//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     const queryParams = new URLSearchParams(location?.search);
//     const passwordResetToken = queryParams.get('token');
//     if (passwordResetToken) {
//       try {
//         const response = await dispatch(
//           requestResetPassword({
//             password: data.confirmPassword,
//             token: passwordResetToken,
//           })
//         );
//         if (response?.payload?.passwordUpdated) {
//           toast.success('Your password has been reset successfully');
//           router.push(paths.auth.signIn);
//           dispatch(setResetPassword(networkCallInitialState));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       toast.error('Invalid token');
//       router.replace(paths.auth.signIn);
//     }
//   });

//   const renderForm = (
//     <Box gap={3} display="flex" flexDirection="column">
//       <Field.Text
//         name="password"
//         label="Password"
//         placeholder="6+ characters"
//         type={password.value ? 'text' : 'password'}
//         InputLabelProps={{ shrink: true }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={password.onToggle} edge="end">
//                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Field.Text
//         name="confirmPassword"
//         label="Confirm new password"
//         type={password.value ? 'text' : 'password'}
//         InputLabelProps={{ shrink: true }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={password.onToggle} edge="end">
//                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
//         Update password
//       </LoadingButton>
//     </Box>
//   );

//   return (
//     <Box sx={{ textAlign: 'center', width: '100%' }}>
//       <FormHead
//         // icon={<SentIcon />}
//         title="Reset Password!"
//         // description={`We've sent a 6-digit confirmation email to your email. \nPlease enter the code in below box to verify your email.`}
//       />

//       <Form methods={methods} onSubmit={onSubmit}>
//         {renderForm}
//       </Form>

//       <FormResendCode onResendCode={() => {}} value={0} disabled={false} />

//       <FormReturnLink href={paths.auth.signIn} />
//     </Box>
//   );
// }
