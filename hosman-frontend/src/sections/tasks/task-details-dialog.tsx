import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { ITask } from 'src/types/task';
import { formatDate } from 'src/sections/dashboard/dashboard-utils';

interface TaskDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  task: ITask | null;
  onEdit: (task: ITask) => void;
}

export function TaskDetailsDialog({
  open,
  onClose,
  task,
  onEdit,
}: TaskDetailsDialogProps) {
  if (!task) return null;

  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  let statusLabel = 'To Do';
  let statusBg = '#fef3c7';
  let statusColor = '#d97706';
  let statusIcon = 'solar:clock-circle-bold';

  if (isCompleted) {
    statusLabel = 'Completed';
    statusBg = '#dcfce7';
    statusColor = '#15803d';
    statusIcon = 'solar:check-circle-bold';
  } else if (isInProgress) {
    statusLabel = 'In Progress';
    statusBg = '#e0f2fe';
    statusColor = '#0284c7';
    statusIcon = 'solar:restart-bold';
  }

  const assignedName = task.userName || task.userEmail || 'Unassigned';
  const initial = assignedName.charAt(0).toUpperCase();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3.5, p: 1 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon="solar:document-text-bold-duotone" width={26} sx={{ color: '#2563eb' }} />
          <Box>
            <Typography variant="h6" fontWeight={800} color="#0f172a">
              Task Details
            </Typography>
            <Typography variant="caption" color="#94a3b8" fontWeight={600}>
              ID: #{task.id ? task.id.slice(-6) : 'N/A'}
            </Typography>
          </Box>
        </Stack>
        <IconButton size="small" onClick={onClose}>
          <Iconify icon="solar:close-circle-bold" width={22} color="#94a3b8" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', py: 2.5 }}>
        <Stack spacing={2.5}>
          {/* TITLE & STATUS */}
          <Box>
            <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Task Title
            </Typography>
            <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mt: 0.5, lineHeight: 1.3 }}>
              {task.title}
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
            {/* STATUS */}
            <Box>
              <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.75 }}>
                Current Status
              </Typography>
              <Chip
                icon={<Iconify icon={statusIcon} width={14} style={{ color: statusColor }} />}
                label={statusLabel}
                size="small"
                sx={{
                  borderRadius: 1.5,
                  bgcolor: statusBg,
                  color: statusColor,
                  fontWeight: 800,
                  fontSize: 12,
                  height: 28,
                  px: 1,
                  '& .MuiChip-icon': { ml: 0.5, mr: -0.25 },
                }}
              />
            </Box>

            {/* ASSIGNED USER */}
            <Box>
              <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.75 }}>
                Assigned To
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 26, height: 26, bgcolor: '#2563eb', fontSize: 11, fontWeight: 800 }}>
                  {initial}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} color="#0f172a" sx={{ fontSize: 13, lineHeight: 1.1 }}>
                    {assignedName}
                  </Typography>
                  {task.userEmail && (
                    <Typography variant="caption" color="#94a3b8" sx={{ fontSize: 11 }}>
                      {task.userEmail}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>

            {/* CREATED DATE */}
            <Box>
              <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.75 }}>
                Created Date
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Iconify icon="solar:clock-circle-linear" width={16} sx={{ color: '#64748b' }} />
                <Typography variant="body2" fontWeight={600} color="#334155" sx={{ fontSize: 13 }}>
                  {formatDate(task.createdAt)}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Divider sx={{ borderColor: '#f1f5f9' }} />

          {/* DESCRIPTION */}
          <Box>
            <Typography variant="caption" fontWeight={700} color="#64748b" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 0.75 }}>
              Task Description
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: '#f8fafc',
                border: '1px solid #e2e8f0',
                minHeight: 80,
              }}
            >
              <Typography variant="body2" color="#334155" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {task.description || 'No detailed description provided for this task.'}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="outlined" sx={{ fontWeight: 700, color: '#64748b', borderColor: '#cbd5e1', borderRadius: 2 }}>
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            onEdit(task);
          }}
          startIcon={<Iconify icon="solar:pen-bold" width={18} />}
          sx={{
            bgcolor: '#2563eb',
            fontWeight: 800,
            borderRadius: 2,
            px: 3,
            '&:hover': { bgcolor: '#1d4ed8' },
          }}
        >
          update 
        </Button>
      </DialogActions>
    </Dialog>
  );
}
