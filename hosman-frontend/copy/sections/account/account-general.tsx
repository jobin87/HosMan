import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input/input';
import { z as zod } from 'zod';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { fData } from 'src/utils/format-number';

import { Field, Form, schemaHelper } from 'src/components/hook-form';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { uploadFileFolders } from 'src/constants/files.constant';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch } from 'src/store';
import { requestUserDetails, updateUserProfile } from 'src/store/app/appThunk';
import { uploadFile } from 'src/utils/files-upload';
import { randomString } from 'src/utils/random-string-generator';

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  userId: zod.string().min(1, { message: 'User ID is required!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  profileImage: schemaHelper.file({ message: { required_error: 'Avatar is required!' } }),
  countryCode: zod.string().min(1, { message: 'Invalid country code' }),
  phone: schemaHelper.phoneNumber({ isValidPhoneNumber }),
});

export function AccountGeneral() {
  const data = useUser();

  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: data?.userId,
    name: data?.name,
    profileImage: data?.profileImage,
    phone: data?.phone,
    countryCode: data?.countryCode,
  };

  const methods = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (data) reset(defaultValues);
  }, [reset]);

  let getCountryCode = (data: string) => {
    setValue('countryCode', `+${data}`);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const imagePath = uploadFileFolders.sellerProfileImage;
      const returnUrl = await uploadFile({
        file: data.profileImage,
        filePath: imagePath,
        fileName: randomString(20),
        fileType: data.profileImage instanceof File ? data.profileImage.type : '',
      });
      if (returnUrl) {
        const response = await dispatch(
          updateUserProfile({
            userId: data?.userId,
            countryCode: data.countryCode,
            name: data.name,
            phone: data.phone,
            profileImage: returnUrl.toString(),
          })
        ).unwrap();
        if (response?.userDetailsUpdate) {
          // userDetailsUpdate is the key in the response object. it should be USER_DETAILS_UPDATED
          toast.success('Update success!');
          dispatch(requestUserDetails());
        }
      }
    } catch (error) {
      toast.error('Error updating notifications');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card
            sx={{
              p: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              columnGap: 3,
              rowGap: 3,
            }}
          >
            <Box sx={{ border: '1px dashed #ddd', flex: 1, borderRadius: 1, p: 2 }}>
              <Field.UploadAvatar
                name="profileImage"
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

            <Box sx={{ flex: 1 }}>
              <Field.Text name="name" label="Name" />
              <Field.Phone
                country="IN"
                name="phone"
                label="Phone number"
                countryPhoneNumber={getCountryCode}
                sx={{ mt: 3 }}
              />
            </Box>
          </Card>
          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Form>
  );
}
