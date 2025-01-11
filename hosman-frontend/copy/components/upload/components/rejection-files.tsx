import type { PaperProps } from '@mui/material/Paper';
import type { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/material/styles'; // Import Theme
import type { FileRejection } from 'react-dropzone';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';
import { fData } from 'src/utils/format-number';

import { fileData } from '../../file-thumbnail';
import { uploadClasses } from '../classes';

// ----------------------------------------------------------------------

type RejectionFilesProps = PaperProps & {
  files: FileRejection[];
  sx?: SxProps<Theme>; // Ensure the correct type for sx
  className?: string;
};

export function RejectionFiles({
  files,
  sx = {},
  className = '',
  ...other
}: RejectionFilesProps): JSX.Element | null {
  if (!files.length) {
    return null;
  }

  return (
    <Paper
      variant="outlined"
      className={`${uploadClasses.uploadRejectionFiles}${className ? ` ${className}` : ''}`}
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        textAlign: 'left',
        borderStyle: 'dashed',
        borderColor: 'error.main',
        bgcolor: (theme: Theme) => varAlpha(theme.palette.error.main, 0.08), // Ensure this is correctly typed
        ...sx, // Ensure sx is correctly typed
      }}
      {...other} // Spread other props that conform to PaperProps
    >
      {files.map(({ file, errors }) => {
        const { path, size } = fileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
                - {error.message}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
