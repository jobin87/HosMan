import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Typography } from '@mui/material';
import { DocumentPreviewDialogProps } from './types';

// ----------------------------------------------------------------------

export function DocumentPreviewDialog({
  open,
  title,
  file,
  onClose,
  ...other
}: DocumentPreviewDialogProps) {
  return (
    <Dialog fullWidth fullScreen maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="subtitle1">File: {title}</Typography>
        <Button variant="contained" onClick={onClose} color="inherit" size="small">
          Close
        </Button>
      </DialogTitle>

      {file !== null && (
        <DialogContent sx={{ typography: 'body2' }}>
          {' '}
          <iframe src={file} width={'100%'} height={'100%'} />{' '}
        </DialogContent>
      )}
    </Dialog>
  );
}
