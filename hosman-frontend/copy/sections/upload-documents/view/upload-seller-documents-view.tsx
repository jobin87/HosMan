import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, MenuItem, Stack, Typography } from '@mui/material';

import { SingleFileUpload } from 'src/components/upload';
// import { SELLER_REQUIRED_DOCUMENTS } from 'src/utils/constant';
import { Field, Form } from 'src/components/hook-form';
import { SELLER_REQUIRED_DOCUMENTS, uploadFileFolders } from 'src/constants/files.constant';
import { useUser } from 'src/hooks/use-user';
import { useRouter } from 'src/routes/hooks';
import { useAppDispatch } from 'src/store';
import { uploadPresignedUrl } from 'src/store/app/appThunk';
import { uploadFile } from 'src/utils/files-upload';

export type NewFileSchemaType = zod.infer<typeof NewFileSchema>;

export const NewFileSchema = zod.object({
  document: zod.instanceof(File, { message: 'document is required and it must be a file' }),
  documentType: zod.string().min(1, { message: 'document Type is required' }),
});

export function UploadSellerDocumentsView() {
  const userData = useUser();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const methods = useForm<NewFileSchemaType>({
    resolver: zodResolver(NewFileSchema),
    defaultValues: {},
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onUpload = handleSubmit(async (data) => {
    const selectedFilePath = uploadFileFolders.sellerDocuments.replace(
      '{sellerId}',
      userData.userId
    );

    try {
      const returnUrl = await uploadFile({
        filePath: selectedFilePath,
        fileType: data?.document?.type,
        fileName: data?.document?.name,
        file: data?.document,
      });
      if (returnUrl) {
        const uploaded = await dispatch(
          uploadPresignedUrl({
            docName: data.documentType,
            docId: data.documentType,
            docType: data?.document?.type,
            docUrl: returnUrl.toString(),
            docSize: data?.document?.size.toString(),
            ownerId: userData.sellerId,
          })
        );
        // uploaded && router.push(paths.dashboard.documents.root);
      }
    } catch (error) {
      console.error('file upload error', error);
    }
  });

  return (
    <Box px={20}>
      <Form methods={methods}>
        <Typography variant="h4" mb={0.5}>
          Upload File
        </Typography>

        <Typography variant="subtitle2" color="GrayText" mb={4}>
          {' '}
          Select the document type and upload the correct document
        </Typography>

        <Stack spacing={2}>
          <Field.Select
            sx={{ maxWidth: 500 }}
            name="documentType"
            label="Document Type"
            InputLabelProps={{ shrink: true }}
          >
            {SELLER_REQUIRED_DOCUMENTS.map((type) => (
              <MenuItem key={type.value} value={type.value} sx={{ textTransform: 'capitalize' }}>
                {type.label}
              </MenuItem>
            ))}
          </Field.Select>

          <SingleFileUpload
            onUpload={(file) => setValue('document', file!)}
            helperText="Please upload a document under 3MB."
            acceptedFileTypes={{
              'application/pdf': ['.pdf'],
            }}
          />

          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            sx={{ maxWidth: 200, mt: 2 }}
            onClick={onUpload}
          >
            Upload File
          </LoadingButton>
        </Stack>
      </Form>
    </Box>
  );
}
