import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
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

import toast from 'react-hot-toast';
import { uploadFileFolders } from 'src/constants/files.constant';
import {
  requestDetailsProductCategory,
  requestUpdateProductCategory,
} from 'src/store/products/productThunk';
import { uploadFile } from 'src/utils/files-upload';
import { fData } from 'src/utils/format-number';
import { randomString } from 'src/utils/random-string';

type defaultObjectType = {
  parent: string;
};

// ----------------------------------------------------------------------

export type NewCategorySchemaType = zod.infer<typeof NewCategorySchema>;

export const NewCategorySchema = zod.object({
  categoryName: zod.string().min(1, { message: 'Name is required!' }),
  categoryImageFile: schemaHelper.file().optional().or(zod.string()),
});

// ----------------------------------------------------------------------

export function ProductCategoryEditForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const categoryId = useParams()?.id;

  const [defaultCategoryValues, setDefaultCategoryValues] = useState<defaultObjectType>();

  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues = useMemo(
    () => ({
      categoryName: '',
      categoryImage: null,
    }),
    []
  );

  const methods = useForm<NewCategorySchemaType>({
    resolver: zodResolver(NewCategorySchema),
    defaultValues,
  });

  const { handleSubmit, setValue, watch } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      let returnUrl;
      if (data?.categoryImageFile && typeof data?.categoryImageFile !== 'string') {
        const ImagePath = uploadFileFolders.categoryLogos;
        returnUrl = await uploadFile({
          file: data.categoryImageFile,
          fileName: randomString(20),
          filePath: ImagePath,
          fileType: data.categoryImageFile?.type,
        });
      }
      const response = await dispatch(
        requestUpdateProductCategory({
          categoryId: categoryId!,
          categoryImage: returnUrl ? returnUrl.toString() : data.categoryImageFile?.toString()!,
          categoryParent: defaultCategoryValues?.parent,
        })
      );
      setLoading(false);
      console.log(response.payload);
      toast.success('Category Updated Successfully');
      response.payload.categoryUpdated && router.back();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const response = await requestDetailsProductCategory(categoryId!);
        if (response) {
          setValue('categoryName', response.categoryName);
          setValue('categoryImageFile', response.categoryImage);
          setDefaultCategoryValues({
            parent: response?.categoryParent?.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryDetails();
  }, [categoryId]);

  const renderDetails = (
    <Card>
      <CardHeader
        title={'Details'}
        subheader="Change the category image and update the category"
        sx={{ mb: 2 }}
      />
      <Box sx={{ p: 3, pt: 0 }}>
        <Box sx={{ border: '1px dashed #ddd', borderRadius: 1, p: 2 }}>
          <Field.UploadAvatar
            name="categoryImageFile"
            maxSize={3145728}
            value={values?.categoryImageFile}
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

        <Field.Text name="categoryName" label="Category Name" disabled sx={{ mt: 3 }} />
      </Box>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-end">
      <LoadingButton type="submit" variant="contained" size="large" loading={loading}>
        Update
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        sx={{
          mx: { lg: 'unset', md: 'auto' }, // use "auto" to get centered layout
          maxWidth: { xs: 720, xl: 880 },
        }}
      >
        {renderDetails}

        {renderActions}
      </Stack>
    </Form>
  );
}
