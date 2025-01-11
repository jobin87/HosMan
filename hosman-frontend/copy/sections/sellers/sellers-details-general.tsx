import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';

import toast from 'react-hot-toast';
import { Field, Form, schemaHelper } from 'src/components/hook-form';

import { CardHeader, Stack } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  displayName: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  photoURL: schemaHelper.file({ message: { required_error: 'Avatar is required!' } }),
  // phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  phoneNumber: zod.string(),
  country: schemaHelper.objectOrNull({ message: { required_error: 'Country is required!' } }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  city: zod.string().min(1, { message: 'City is required!' }),
  zipCode: zod.string().min(1, { message: 'Zip code is required!' }),
  about: zod.string().min(1, { message: 'About is required!' }),
  // Not required
  isPublic: zod.string(),
});

export function SellersDetailsGeneral() {
  const { state } = useLocation();

  const defaultValues = {
    displayName: state?.sellerName || '',
    email: state?.sellerEmail || '',
    photoURL: state?.logo || '',
    phoneNumber: state?.fullPhoneNumber || '',
    country: state?.country || '',
    address: state?.address || '',
    state: state?.state || '',
    city: state?.sellerType || '',
    zipCode: state?.zipcode || '',
    about: state?.sellerRegNum || '',
    isPublic: state?.approvalStatus || '',
  };

  const methods = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  React.useEffect(() => {
    reset(defaultValues);
  }, [SellersDetailsGeneral, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
            }}
          >
            <Field.Upload name="photoURL" maxSize={3145728} />
          </Card>
          <Card sx={{ p: 3, mt: 3, textAlign: 'left' }}>
            <CardHeader title="Bank Details" sx={{ p: 0, pb: 2 }} />
            <Stack spacing={2} sx={{ pt: 0, typography: 'body2' }}>
              <Grid container spacing={{ xs: 0.5, md: 2 }}>
                <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                  Bank Name
                </Grid>
                <Grid xs={12} md={8}>
                  <Grid xs={12} md={8} sx={{ color: 'text.primary' }}>
                    {state?.bankDetails?.bankName ?? '-'}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={{ xs: 0.5, md: 2 }}>
                <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                  Branch Name
                </Grid>
                <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
                  {state?.bankDetails?.branchName ?? '-'}
                </Grid>
              </Grid>

              <Grid container spacing={{ xs: 0.5, md: 2 }}>
                <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                  Account Number
                </Grid>
                <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
                  {state?.bankDetails?.accountNumber ?? '-'}
                </Grid>
              </Grid>

              <Grid container spacing={{ xs: 0.5, md: 2 }}>
                <Grid xs={12} md={4} sx={{ color: 'text.secondary' }}>
                  Swift Code
                </Grid>
                <Grid xs={12} md={8} sx={{ color: 'text.secondary' }}>
                  {state?.bankDetails?.swiftCode ?? '-'}
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="General" sx={{ p: 0, pb: 2 }} />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="displayName" label="Name" />
              <Field.Text name="email" label="Email address" />
              <Field.Phone
                name="phoneNumber"
                label="Phone number"
                returnCountryPhoneNumber={() => {}}
              />
              <Field.Text name="address" label="Address" />

              <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" />

              <Field.Text name="state" label="State/region" />
              <Field.Text name="city" label="City" />
              <Field.Text name="zipCode" label="Zip/code" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Field.Text name="about" multiline rows={4} label="About" />

              <LoadingButton disabled type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
