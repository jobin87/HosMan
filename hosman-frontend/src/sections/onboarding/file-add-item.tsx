import type { PaperProps } from '@mui/material/Paper';
import type { IFileManager } from 'src/types/file';

import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import { useBoolean } from 'src/hooks/use-boolean';

import { useRef } from 'react';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { uploadFileFolders } from 'src/constants/files.constant';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch } from 'src/store';
import { uploadPresignedUrl } from 'src/store/app/appThunk';
import { uploadFile } from 'src/utils/files-upload';
import { InputFile } from './type';

// ----------------------------------------------------------------------

type Props = PaperProps & {
  file: IFileManager;
};

export function FileAddItem({ file, sx, ...other }: Props) {
  const loading = useBoolean();

  const dispatch = useAppDispatch();

  const userData = useUser();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileUpload = async (fileData: InputFile) => {
    const selectedFilePath = uploadFileFolders.sellerDocuments;

    try {
      const returnUrl = await uploadFile({
        filePath: selectedFilePath,
        fileType: fileData?.type,
        fileName: file.key!,
        file: fileData,
      });
      if (returnUrl) {
        const uploaded = await dispatch(
          uploadPresignedUrl({
            docName: file.documentName!,
            docId: file.key!,
            docType: fileData.type,
            docUrl: returnUrl.toString(),
            docSize: fileData?.size.toString(),
            ownerId: userData.sellerId,
          })
        );
        if (uploaded) {
          toast.success('File Upload'), loading.onFalse();
        }
      }
    } catch (error) {
      console.error('file upload error', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      fileUpload(selectedFile), loading.onTrue();
    }
  };

  const renderAction = (
    <LoadingButton
      variant="contained"
      onClick={handleOpenFilePicker}
      href=""
      size="small"
      loading={loading.value}
    >
      Upload
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
      />
    </LoadingButton>
  );

  const renderText = (
    <ListItemText
      primary={file.documentName}
      secondary={<>{file?.key?.toLowerCase()}</>}
      primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        alignItems: 'center',
        typography: 'caption',
        color: 'text.disabled',
        display: 'inline-flex',
      }}
    />
  );

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          gap: 2,
          borderRadius: 2,
          maxHeight: { xs: 200, lg: 100 },
          display: 'flex',
          cursor: 'pointer',
          position: 'relative',
          bgcolor: 'transparent',
          p: { xs: 2.5, sm: 2 },
          alignItems: { xs: 'flex-end', lg: 'center' },
          justifyContent: 'space-between',
          flexDirection: 'row',
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z4,
          },
          mb: 2,
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', lg: 'center' },
            justifyContent: { xs: 'center', lg: 'flex-start' },
            columnGap: 2,
            rowGap: 2,
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <FileThumbnail file={''} sx={{ width: 40, height: 40 }} />

          {renderText}
        </Box>

        {renderAction}
      </Paper>
    </>
  );
}
