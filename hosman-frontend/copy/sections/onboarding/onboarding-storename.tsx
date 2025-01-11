import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { LoadingButton } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Field, Form } from 'src/components/hook-form';
import { uploadFileFolders } from 'src/constants/files.constant';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch, useAppSelector } from 'src/store';
import {
  requestSellerOnboardingStatus,
  requestSellerOnboardingUpdateStorename,
} from 'src/store/sellers/sellersThunk';
import { uploadFile } from 'src/utils/files-upload';

// ----------------------------------------------------------------------

export type OnboardingStorenameSchemaType = zod.infer<typeof OnboardingStorenameSchema>;

export const OnboardingStorenameSchema = zod.object({
  storeName: zod.string().min(1, { message: 'Store name is required!' }),
  storeLogo: zod.string(),
});

export function OnboardingStoreName() {
  const { sellerDetails } = useUser();

  const { steps } = useAppSelector((state) => state.app.onboarding);
  const [storeLogo, setStoreLogo] = useState<string>('');
  const { sellerStatus } = useAppSelector((state) => state.sellers);

  const dispatch = useAppDispatch();

  const defaultValues = {
    storeName: '',
    storeLogo: '',
  };

  const methods = useForm<OnboardingStorenameSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(OnboardingStorenameSchema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      const response = await dispatch(
        requestSellerOnboardingUpdateStorename({
          storeName: values?.storeName,
          storeLogo: storeLogo,
        })
      );
      if (response?.payload?.storeUpdated) {
        dispatch(requestSellerOnboardingStatus(sellerDetails?.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestFileUrl = async (file: any) => {
    if (file) {
      const response = await uploadFile({
        filePath: uploadFileFolders.sellerDocuments,
        fileType: file?.type,
        fileName: file?.name,
        file: file,
      });
      setStoreLogo(response?.toString());
    }
  };

  useEffect(() => {
    requestFileUrl(values?.storeLogo);
  }, [values?.storeLogo]);

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 3, minHeight: 400 }}>
        <Typography variant="subtitle1">Your Store Name & Logo</Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#606060' }}>
          Choose a unique store name and logo that reflects your brand. This name will be visible to
          customers, so make it memorable!
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ pb: 1 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Upload
                name="storeLogo"
                maxSize={3145728}
                onDelete={() => {
                  setValue('storeLogo', '');
                }}
                error={false}
              />
              <Field.Autocomplete
                name="storeName"
                label="Store name"
                options={sellerStatus?.suggestedStoreNames || []}
              />
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
