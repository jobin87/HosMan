import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { LoadingButton } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestSellerOnboardingStatus,
  requestSellerOnboardingUpdateDetails,
} from 'src/store/sellers/sellersThunk';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  sellerName: zod.string().min(1, { message: 'Name is required!' }),
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Country is required!' },
  }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  zipcode: zod.string().min(1, { message: 'Zip code is required!' }),
  contactPerson: zod.string().min(1, { message: 'Name is required!' }),
});

export function OnboardingGeneral() {
  const { sellerDetails } = useUser();

  const { steps } = useAppSelector((state) => state.app.onboarding);

  const dispatch = useAppDispatch();

  const defaultValues = {
    sellerName: sellerDetails?.sellerName,
    address: sellerDetails?.address,
    state: sellerDetails?.state,
    zipcode: sellerDetails?.zipcode,
    country: sellerDetails?.country,
    contactPerson: sellerDetails?.contactPerson,
  };

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (sellerDetails) {
      reset(defaultValues);
    }
  }, [sellerDetails, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestSellerOnboardingUpdateDetails(values));
      if (response?.payload?.sellerDetailsUpdated) {
        dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 300 }}>
        <Typography variant="subtitle1">Set Up Your Seller Profile</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
          Create a secure seller account to manage your store and listings. Your account will be
          your gateway to selling and monitoring sales.
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ pb: 1 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="sellerName" label="Legal name" />

              <Field.CountrySelect
                fullWidth
                name="country"
                label="Country"
                placeholder="Choose a country"
                defaultValue={'Oman'}
              />
              <Field.Text name="state" label="State/Region" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="zipcode" label="ZipCode" />
              <Field.Text name="contactPerson" label="Contact Person Name" />
            </Box>
          </Box>
        </Form>
      </Paper>
      <Stack mt={2} direction="row" justifyContent={'flex-end'}>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          type="submit"
          disabled={!steps.enabled}
          onClick={onSubmit}
        >
          Next
        </LoadingButton>
      </Stack>
    </Box>
  );
}
