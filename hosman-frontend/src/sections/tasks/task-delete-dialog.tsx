import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';
import { ITask } from 'src/types/task';

interface TaskDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  task?: ITask | null;
  loading?: boolean;
}

export function TaskDeleteDialog({
  open,
  onClose,
  onConfirm,
  task,
  loading,
}: TaskDeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" width={22} />
          </Box>
          <Typography variant="h6" fontWeight={800} color="#0f172a">
            Delete Task
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ py: 1.5 }}>
        <Typography variant="body2" color="#64748b">
          Are you sure you want to delete task{' '}
          <strong style={{ color: '#0f172a' }}>"{task?.title || 'this task'}"</strong>?
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading} sx={{ fontWeight: 700, color: '#64748b' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ fontWeight: 800, borderRadius: 2, px: 3 }}
        >
          Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
