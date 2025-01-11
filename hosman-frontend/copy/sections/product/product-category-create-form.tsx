import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

import { useParams, useRouter } from 'src/routes/hooks';

import { Box, Typography } from '@mui/material';
import { Field, Form, schemaHelper } from 'src/components/hook-form';
import { useAppDispatch } from 'src/store';

import { uploadFileFolders } from 'src/constants/files.constant';
import { setCategory } from 'src/store/products/productReducer';
import { requestCreateProductCategory } from 'src/store/products/productThunk';
import { basicInitialState } from 'src/store/types';
import { uploadFile } from 'src/utils/files-upload';
import { fData } from 'src/utils/format-number';
import { randomString } from 'src/utils/random-string';

// ----------------------------------------------------------------------

export type NewStaffSchemaType = zod.infer<typeof NewCategorySchema>;

export const NewCategorySchema = zod.object({
  categoryName: zod.string().min(1, { message: 'Name is required!' }),
  categoryImageFile: schemaHelper.file({ message: { required_error: 'Image is required!' } }),
});

// ----------------------------------------------------------------------

export function ProductCategoryCreateForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const parentId = useParams()?.id;

  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues = useMemo(
    () => ({
      categoryName: '',
      categoryImage: null,
    }),
    []
  );

  const methods = useForm<NewStaffSchemaType>({
    resolver: zodResolver(NewCategorySchema),
    defaultValues,
  });

  const { watch } = methods;

  const values = watch();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (values?.categoryImageFile && typeof values?.categoryImageFile !== 'string') {
        const returnUrl = await uploadFile({
          file: values.categoryImageFile,
          fileName: randomString(20),
          filePath: uploadFileFolders.categoryLogos,
          fileType: values.categoryImageFile?.type || 'image/jpeg',
        });
        if (returnUrl) {
          const response = await dispatch(
            requestCreateProductCategory({
              categoryName: values.categoryName,
              categoryImage: returnUrl.toString(),
              categoryParent: parentId,
            })
          );
          if (response?.payload?.categoryAdded) {
            dispatch(setCategory(basicInitialState));
            setLoading(false);
            router.back();
          }
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderDetails = (
    <Card>
      <CardHeader
        title={parentId ? 'Sub Category Details' : 'Category Details'}
        subheader={
          parentId
            ? 'Fill in the details for the new sub category'
            : 'Fill in the details for the new category'
        }
        sx={{ mb: 2 }}
      />
      <Box sx={{ p: 3, pt: 0 }}>
        <Box sx={{ border: '1px dashed #ddd', borderRadius: 1, p: 2 }}>
          <Field.UploadAvatar
            name="categoryImageFile"
            maxSize={3145728}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
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

        <Field.Text
          name="categoryName"
          label={parentId ? 'Sub Category Name' : 'Category Name'}
          sx={{ mt: 3 }}
        />
      </Box>
    </Card>
  );

  const renderActions = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={{ mt: { xs: 0, lg: -2 } }}
    >
      <LoadingButton variant="contained" size="large" loading={loading} onClick={onSubmit}>
        Submit
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods}>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        sx={{
          mx: { lg: 'auto', md: 'auto' }, // use "auto" to get centered layout
          maxWidth: { xs: 720, xl: 880 },
        }}
      >
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
