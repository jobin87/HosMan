import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { LoadingButton } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import { Field, Form } from 'src/components/hook-form';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestSellerOnboardingStatus,
  requestSellerOnboardingUpdateBank,
} from 'src/store/sellers/sellersThunk';

// ----------------------------------------------------------------------

export type OnboardingBankSchemaType = zod.infer<typeof OnboardingBankSchema>;

export const OnboardingBankSchema = zod.object({
  iban: zod.string().min(1, { message: 'IBan number is required!' }),
  accountNumber: zod.string().min(1, { message: 'Account number is required!' }),
  swiftCode: zod.string().min(1, { message: 'Swift code is required!' }),
  bankName: zod.string().min(1, { message: 'Bank name is required!' }),
  branchName: zod.string().min(1, { message: 'Branch name is required!' }),
});

export function OnboardingBank() {
  const { sellerDetails } = useUser();

  const { steps } = useAppSelector((state) => state.app.onboarding);

  const dispatch = useAppDispatch();

  const defaultValues = {
    iban: '',
    accountNumber: '',
    swiftCode: '',
    bankName: '',
    branchName: '',
  };

  const methods = useForm<OnboardingBankSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(OnboardingBankSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestSellerOnboardingUpdateBank(data));
      if (response?.payload?.bankDetailsUpdated) {
        dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 400 }}>
        <Typography variant="subtitle1">Secure Your Payouts</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
          Link your bank account to receive payments for your sales. All transactions are secure,
          and funds will be directly deposited to your account.
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ pb: 1 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="bankName" label="Bank name" />
              <Field.Text name="branchName" label="Branch name" />
              <Field.Text name="accountNumber" label="Account number" />
              <Field.Text name="swiftCode" label="Swift code" />
              <Field.Text name="iban" label="IBan number" />
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
