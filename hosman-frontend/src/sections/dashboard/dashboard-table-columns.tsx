import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { ColumnDef } from 'src/components/custom-table';
import { ITask } from 'src/types/task';
import { formatDate } from './dashboard-utils';

interface TaskTableColumnsOptions {
  onViewDetails?: (task: ITask) => void;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>, task: ITask) => void;
}

export function getTaskTableColumns({
  onViewDetails,
  onOpenMenu,
}: TaskTableColumnsOptions): ColumnDef<ITask>[] {
  return [
    {
      id: 'title',
      label: 'Task Title',
      render: (task) => (
        <Box
          onClick={() => onViewDetails?.(task)}
          sx={{
            whiteSpace: 'nowrap',
            cursor: onViewDetails ? 'pointer' : 'default',
            '&:hover .task-title-text': onViewDetails ? { color: '#2563eb', textDecoration: 'underline' } : {},
          }}
        >
          <Typography
            className="task-title-text"
            variant="subtitle2"
            fontWeight={700}
            color="#0f172a"
            sx={{ fontSize: 13.5, lineHeight: 1.25, transition: 'color 0.15s ease' }}
          >
            {task.title}
          </Typography>
          <Typography variant="caption" color="#94a3b8" fontWeight={500} sx={{ fontSize: 11.5, display: 'block', mt: 0.25 }}>
            ID: #{task.id ? task.id.slice(-6) : 'N/A'}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'assignedTo',
      label: 'Assigned To',
      render: (task) => {
        const displayName = task.userName || task.userEmail || 'Unassigned';
        const initial = displayName.charAt(0).toUpperCase();
        return (
          <Chip
            avatar={
              <Avatar sx={{ width: 20, height: 20, bgcolor: '#2563eb', fontSize: 10, fontWeight: 700 }}>
                {initial}
              </Avatar>
            }
            label={displayName}
            size="small"
            sx={{
              borderRadius: 1.5,
              border: '1px solid #e2e8f0',
              fontWeight: 600,
              fontSize: 12,
              color: '#334155',
              bgcolor: '#f8fafc',
              px: 0.5,
              height: 26,
              whiteSpace: 'nowrap',
            }}
          />
        );
      },
    },
    {
      id: 'createdAt',
      label: 'Assigned Date',
      render: (task) => (
        <Stack direction="row" alignItems="center" spacing={0.75} color="#64748b" sx={{ whiteSpace: 'nowrap' }}>
          <Iconify icon="solar:clock-circle-linear" width={16} sx={{ color: '#64748b', flexShrink: 0 }} />
          <Typography variant="body2" sx={{ fontSize: 12.5, fontWeight: 500, color: '#475569', whiteSpace: 'nowrap' }}>
            {formatDate(task.createdAt)}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: (task) => {
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

        return (
          <Chip
            icon={<Iconify icon={statusIcon} width={14} style={{ color: statusColor }} />}
            label={statusLabel}
            size="small"
            onClick={() => onViewDetails?.(task)}
            sx={{
              borderRadius: 1.5,
              bgcolor: statusBg,
              color: statusColor,
              fontWeight: 700,
              fontSize: 12,
              height: 26,
              px: 0.5,
              cursor: onViewDetails ? 'pointer' : 'default',
              '& .MuiChip-icon': { ml: 0.5, mr: -0.25 },
            }}
          />
        );
      },
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'right',
      render: (task) => (
        <IconButton
          size="small"
          onClick={(e) => onOpenMenu(e, task)}
          sx={{ color: '#64748b' }}
        >
          <Iconify icon="solar:menu-dots-vertical-bold" width={18} />
        </IconButton>
      ),
    },
  ];
}
