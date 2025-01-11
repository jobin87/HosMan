import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { useRouter } from 'src/routes/hooks';

import { Button, Dialog, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { SELLER_TYPES } from 'src/constants/seller.constants';
import { paths } from 'src/routes/paths';
import { useAppDispatch } from 'src/store';
import { requestSellerRegistration } from 'src/store/app/appThunk';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  sellerName: zod.string().min(1, { message: 'Name is required!' }),
  sellerEmail: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  sellerRegNum: zod.string().min(1, { message: 'Cannot leave this field empty!' }),
  sellerType: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Type is required!' },
  }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  state: zod.string().min(1, { message: 'State is required!' }),
  zipcode: zod.string().min(1, { message: 'Zip code is required!' }),
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Country is required!' },
  }),
  countryCode: zod.string().min(1, { message: 'Invalid country code' }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  contactPerson: zod.string().min(1, { message: 'Contact person name is required!' }),
});

export function SignUpForm(data: any) {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const [identityPlaceHolder, setIdentityPlaceHolder] = useState<string | null>(
    'Select Seller Type'
  );
  const [fullnamePlaceHolder, setFullnamePlaceHolder] = useState<string | null>(
    'Select Seller Type'
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const defaultValues = {
    sellerName: '',
    sellerEmail: '',
    sellerRegNum: '',
    sellerType: 'COMPANY',
    address: '',
    state: '',
    zipcode: '',
    country: 'Oman',
    countryCode: '+968',
    phone: '',
    contactPerson: '',
  };

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  let countryCode = (data: string) => {
    setValue('countryCode', `+${data}`);
  };

  useEffect(() => {
    switch (values.sellerType) {
      case 'INDIVIDUAL':
        setIdentityPlaceHolder('National ID');
        setFullnamePlaceHolder('Business Name');
        break;
      case 'ORGANIZATION':
        setIdentityPlaceHolder('Organization Registration Number');
        setFullnamePlaceHolder('Organization Name');
        break;
      case 'COMPANY':
        setIdentityPlaceHolder('Company Registration Number');
        setFullnamePlaceHolder('Company Name');
        break;
      default:
        setIdentityPlaceHolder('Company Registration Number');
        setFullnamePlaceHolder('Company Name');
        break;
    }
  }, [values.sellerType]);

  const onSubmit = handleSubmit(async (data) => {
    setValue('phone', data.phone.slice(data.countryCode.length));
    const formData = methods.getValues();
    try {
      const response = await dispatch(requestSellerRegistration(formData as any)).unwrap();
      if (response?.sellerRegistrationRequested) {
        toast.success('Registration completed successfully');
        setIsSignUpSuccess(true);
      } else {
        toast.error('Sign Up Failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during sign up.');
    }
  });

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Card sx={{ p: 3, boxShadow: 0 }} elevation={0}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Field.Text name="contactPerson" label="Contact Person Name" />
            <Field.Text name="sellerEmail" label="Email address" />
            <Field.Phone
              country="OM"
              name="phone"
              label="Phone number"
              countryPhoneNumber={countryCode}
            />

            <Field.Select
              fullWidth
              name="sellerType"
              label="Category"
              children={SELLER_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              defaultValue={'COMPANY'}
            />

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
            <Field.Text name="sellerName" label={fullnamePlaceHolder} />
            <Field.Text name="sellerRegNum" label={identityPlaceHolder} />
          </Box>
          <Stack alignItems="flex-center" sx={{ mt: 3 }} flex={1}>
            <LoadingButton
              type="submit"
              onClick={onSubmit}
              variant="contained"
              loading={isSubmitting}
              sx={{ py: 1.5 }}
            >
              Register
            </LoadingButton>
          </Stack>
        </Card>
      </Form>

      <Dialog open={isSignUpSuccess}>
        <Box px={3} pt={2} pb={2.5}>
          <Stack spacing={2}>
            <Typography variant="h4">Registration Successful</Typography>
            <Typography variant="body1" sx={{ mt: -1 }}>
              We have sent a verification email to your email address. Please verify your email to
              continue.
            </Typography>
            <Box textAlign="right">
              <Button
                onClick={() => {
                  setIsSignUpSuccess(false);
                  router.push(paths.auth.signIn);
                }}
                variant="contained"
              >
                Return to Sign In
              </Button>
            </Box>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
