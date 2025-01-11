import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, CardHeader, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { uploadFileFolders } from 'src/constants/files.constant';
import { API_METHODS, ENDPOINT_PRODUCT_BRAND_DETAILS, makeNetworkCall } from 'src/network';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAppDispatch } from 'src/store';
import {
  requestCreateProductBrand,
  requestProductBrandUpdate,
} from 'src/store/products/productThunk';
import { uploadFile } from 'src/utils/files-upload';
import { fData } from 'src/utils/format-number';
import { randomString } from 'src/utils/random-string';

// ----------------------------------------------------------------------

export type NewBrandSchemaType = Zod.infer<typeof NewBrandSchema>;

export const NewBrandSchema = zod.object({
  brandName: zod.string().min(1, { message: 'Name is required!' }),
  brandWebsite: zod.string().min(10, { message: 'Name is required!' }),
  brandDescription: zod.string().min(5, { message: 'Name is required!' }),
  brandLogoFile: schemaHelper.file().optional().or(zod.string()),
});
// ----------------------------------------------------------------

export default function ProductBrandCreateEditForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const brandId = useParams()?.id;

  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues = useMemo(
    () => ({
      brandName: 'B-brand',
      brandDescription: 'The best brand',
      brandWebsite: 'http://example.com',
      brandLogoFile: null,
    }),
    []
  );

  const methods = useForm<NewBrandSchemaType>({
    resolver: zodResolver(NewBrandSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, watch } = methods;

  const values = watch();

  useEffect(() => {
    const getBrandDetails = async () => {
      try {
        const response = await makeNetworkCall({
          method: API_METHODS.GET,
          url: `${ENDPOINT_PRODUCT_BRAND_DETAILS}${brandId}`,
        });
        if (response?.data.data) {
          setValue('brandName', response?.data.data.brandName);
          setValue('brandDescription', response?.data.data.brandDescription);
          setValue('brandWebsite', response?.data.data.brandWebsite);
          setValue('brandLogoFile', response?.data.data.brandLogo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (brandId) getBrandDetails();
  }, [brandId]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      let returnUrl = null;
      console.log(data.brandLogoFile);
      if (data.brandLogoFile && typeof data.brandLogoFile !== 'string') {
        const ImagePath = uploadFileFolders.brandLogos;
        returnUrl = await uploadFile({
          file: data.brandLogoFile,
          fileName: randomString(20),
          filePath: ImagePath,
          fileType: data.brandLogoFile.type,
        });
      }

      if (brandId) {
        const response = await dispatch(
          requestProductBrandUpdate({
            brandDescription: data.brandDescription,
            brandWebsite: data.brandWebsite,
            brandLogo: returnUrl ? returnUrl?.toString() : data.brandLogoFile?.toString(),
            brandId: brandId,
          })
        );
        setLoading(false);
        response.payload?.brandUpdated && router.push(paths.dashboard.product.brands.list);
      } else {
        const response = await dispatch(
          requestCreateProductBrand({
            brandName: data.brandName,
            brandDescription: data.brandDescription,
            brandWebsite: data.brandWebsite,
            brandLogo: returnUrl?.toString() || '',
          })
        );
        response.payload?.brandAdded && router.push(paths.dashboard.product.brands.list);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader
        title="Brand Details"
        subheader={brandId ? 'Edit the details of your brand' : 'Create a new brand'}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2, border: '1px dashed #ddd', borderRadius: 1, p: 2, m: 3 }}>
        <Field.UploadAvatar
          name="brandLogoFile"
          maxSize={3145728}
          value={values.brandLogoFile}
          helperText={
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                color: 'text.disabled',
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif
              <br /> max size of {fData(3145728)}
            </Typography>
          }
        />
      </Box>

      <Stack spacing={3} sx={{ p: 3, pt: 0 }}>
        <Field.Text name="brandName" label="Brand Name" disabled={brandId !== undefined} />
        <Field.Text name="brandDescription" label="Brand Description" />
        <Field.Text name="brandWebsite" label="Brand official Website url" />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
      <LoadingButton type="submit" variant="contained" size="large" loading={loading}>
        {brandId ? 'Update' : 'Submit'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack
        spacing={{ xs: 3, md: 2 }}
        sx={{
          mx: 'auto',
          maxWidth: { xs: 720, xl: 880 },
        }}
      >
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
