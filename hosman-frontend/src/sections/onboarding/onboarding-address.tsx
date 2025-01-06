import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { LoadingButton } from '@mui/lab';
import { Divider, MenuItem, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestSellerOnboardingStatus,
  requestSellerOnboardingUpdateAddress,
} from 'src/store/sellers/sellersThunk';

// ----------------------------------------------------------------------

const GOVERNORATE_OPTIONS = [
  { key: 'Muscat', label: 'Muscat' },
  { key: 'Dhofar', label: 'Dhofar' },
  { key: 'Al Batinah North', label: 'Al Batinah North' },
  { key: 'Al Batinah South', label: 'Al Batinah South' },
  { key: 'Al Dakhiliyah', label: 'Al Dakhiliyah' },
  { key: 'Al Sharqiyah North', label: 'Al Sharqiyah North' },
  { key: 'Al Sharqiyah South', label: 'Al Sharqiyah South' },
  { key: 'Al Wusta', label: 'Al Wusta' },
  { key: 'Musandam', label: 'Musandam' },
  { key: 'Al Buraimi', label: 'Al Buraimi' },
  { key: 'Al Dhahirah', label: 'Al Dhahirah' },
];

// ----------------------------------------------------------------------

export type OnboardingAddressSchemaType = zod.infer<typeof OnboardingAddressSchema>;

export const OnboardingAddressSchema = zod.object({
  pickupStreet: zod.string().min(1, { message: 'Street name is required!' }),
  pickupArea: zod.string().min(1, { message: 'Area is required!' }),
  pickupGovernorate: zod.string().min(1, { message: 'Governorate is required!' }),
  pickupPostalCode: zod.string().min(1, { message: 'Postal code is required!' }),
  pickupCountry: schemaHelper.objectOrNull<string | any>({
    message: { required_error: 'Country is required!' },
  }),
  pickupBuildingNumber: zod.string().min(1, { message: 'Building number is required!' }),
  pickupAdditionalInfo: zod.string(),

  returnStreet: zod.string().min(1, { message: 'Street name is required!' }),
  returnArea: zod.string().min(1, { message: 'Area is required!' }),
  returnGovernorate: zod.string().min(1, { message: 'Governorate is required!' }),
  returnPostalCode: zod.string().min(1, { message: 'Postal code is required!' }),
  returnCountry: schemaHelper.objectOrNull<string | any>({
    message: { required_error: 'Country is required!' },
  }),
  returnBuildingNumber: zod.string().min(1, { message: 'Building number is required!' }),
  returnAdditionalInfo: zod.string(),
});

export function OnboardingAddress() {
  const { sellerDetails } = useUser();

  const { steps } = useAppSelector((state) => state.app.onboarding);

  const dispatch = useAppDispatch();

  const defaultValues = {
    pickupStreet: '1234 Main St',
    pickupArea: 'Al Khuwair',
    pickupGovernorate: 'Muscat',
    pickupPostalCode: '12345',
    pickupCountry: 'Oman',
    pickupBuildingNumber: '10',
    pickupAdditionalInfo: 'Near the mosque',

    returnStreet: '1234 Main St',
    returnArea: 'Al Khuwair',
    returnGovernorate: 'Muscat',
    returnPostalCode: '12345',
    returnCountry: 'Oman',
    returnBuildingNumber: '10',
    returnAdditionalInfo: 'Near the mosque',
  };

  const methods = useForm<OnboardingAddressSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(OnboardingAddressSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (sellerDetails) {
      reset(defaultValues);
    }
  }, [sellerDetails, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        requestSellerOnboardingUpdateAddress({
          pickupAddress: {
            street: data.pickupStreet,
            area: data.pickupArea,
            governorate: data.pickupGovernorate,
            postalCode: data.pickupPostalCode,
            country: data.pickupCountry,
            buildingNumber: data.pickupBuildingNumber,
            additionalInfo: data.pickupAdditionalInfo,
          },
          returnAddress: {
            street: data.returnStreet,
            area: data.returnArea,
            governorate: data.returnGovernorate,
            postalCode: data.returnPostalCode,
            country: data.returnCountry,
            buildingNumber: data.returnBuildingNumber,
            additionalInfo: data.returnAdditionalInfo,
          },
        })
      );
      if (response?.payload?.addressUpdated) {
        dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 300 }}>
        <Typography variant="subtitle1">Set Your Pickup Location & Return Address</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
          Enter the address where your products will be picked up and returned. This helps us
          coordinate deliveries and ensures a seamless shipping process.
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ pb: 1, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mt: 0, mb: 2 }}>
              Pickup Address
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="pickupBuildingNumber" label="Building Number" />
              <Field.Text name="pickupStreet" label="Street Name" />
              <Field.Text name="pickupArea" label="Area" />
              <Field.Select
                name="pickupGovernorate"
                label="Governorate"
                children={GOVERNORATE_OPTIONS.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
                ))}
                defaultValue={'Muscat'}
              />
              <Field.Text name="pickupPostalCode" label="Postal Code" />
              <Field.CountrySelect
                fullWidth
                name="pickupCountry"
                label="Country"
                placeholder="Choose a country"
                defaultValue={'Oman'}
              />
            </Box>
            <Field.Text
              sx={{ mt: 3 }}
              name="pickupAdditionalInfo"
              label="Additional Info"
              multiline
              minRows={5}
            />
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
              Return Address
            </Typography>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="returnBuildingNumber" label="Building Number" />
              <Field.Text name="returnStreet" label="Street Name" />
              <Field.Text name="returnArea" label="Area" />
              <Field.Select
                name="returnGovernorate"
                label="Governorate"
                children={GOVERNORATE_OPTIONS.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.label}
                  </MenuItem>
                ))}
                defaultValue={'Muscat'}
              />
              <Field.Text name="returnPostalCode" label="Postal Code" />
              <Field.CountrySelect
                fullWidth
                name="returnCountry"
                label="Country"
                placeholder="Choose a country"
                defaultValue={'Oman'}
              />
            </Box>
            <Field.Text
              sx={{ mt: 3 }}
              name="returnAdditionalInfo"
              label="Additional Info"
              multiline
              minRows={5}
            />
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
