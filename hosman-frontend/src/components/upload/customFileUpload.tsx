import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { FileThumbnail } from '../file-thumbnail';
import { UploadPlaceholder } from './components/placeholder';

type SingleFileUploadProps = {
  onUpload?: (file: File | null) => void;
  error?: string;
  helperText?: string;
  acceptedFileTypes: Accept;
};

export function SingleFileUpload({
  onUpload,
  error,
  helperText,
  acceptedFileTypes,
}: SingleFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: acceptedFileTypes,
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      if (onUpload) onUpload(selectedFile);
    },
  });

  const handleDelete = () => {
    setFile(null);
    if (onUpload) onUpload(null);
  };

  const handleDownload = () => {
    if (file) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
    }
  };

  return (
    <Box sx={{ position: 'relative', p: 2, border: '1px dashed gray' }} borderRadius={2}>
      <Box
        {...getRootProps()}
        sx={{
          p: 3,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isDragActive ? 'lightgrey' : 'white',
          borderRadius: 1,
        }}
      >
        <input {...getInputProps()} type="file" accept="application/pdf" />
        {!file ? (
          <UploadPlaceholder />
        ) : (
          <FileThumbnail
            sx={{ minHeight: 200 }}
            file={file}
            tooltip
            imageView
            onRemove={handleDelete}
            onDownload={handleDownload}
          />
        )}
      </Box>

      {helperText && (
        <FormHelperText error={!!error} sx={{ mt: 1 }}>
          {error || helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
