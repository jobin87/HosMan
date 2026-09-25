import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ITask } from 'src/types/task';

interface TaskCardProps {
  task: ITask;
  onEdit?: (task: ITask) => void;
  onDelete?: (task: ITask) => void;
  onToggleStatus?: (task: ITask) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const statusLabel =
    task.status === 'completed'
      ? 'Completed'
      : task.status === 'in_progress'
      ? 'In Progress'
      : 'To Do';

  return (
    <Card sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Stack spacing={1.5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {task.title}
          </Typography>
          <Chip
            data-testid="task-status-chip"
            label={statusLabel}
            size="small"
            color={task.status === 'completed' ? 'success' : task.status === 'in_progress' ? 'warning' : 'default'}
          />
        </Box>
        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}
        <Box display="flex" gap={1} mt={1}>
          {onToggleStatus && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => onToggleStatus(task)}
            >
              Mark as Completed
            </Button>
          )}
          {onEdit && (
            <Button size="small" onClick={() => onEdit(task)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button size="small" color="error" onClick={() => onDelete(task)}>
              Delete
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
