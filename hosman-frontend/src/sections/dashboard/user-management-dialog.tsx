import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { IRealPrepUser } from 'src/types/realprepUser';

type Props = {
  open: boolean;
  onClose: () => void;
  users: IRealPrepUser[];
  onToggleApproval: (user: IRealPrepUser) => void;
};

export function UserManagementDialog({ open, onClose, users, onToggleApproval }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>User Management & Approvals</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {users.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No users registered yet.
            </Typography>
          ) : (
            users.map((user) => (
              <Box key={user.id} display="flex" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: '#3b82f6', fontWeight: 700 }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.email} &bull; {user.role}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    label={user.isApproved ? 'Approved' : 'Pending'}
                    size="small"
                    color={user.isApproved ? 'success' : 'warning'}
                    sx={{ fontWeight: 700 }}
                  />
                  <Switch
                    checked={Boolean(user.isApproved)}
                    onChange={() => onToggleApproval(user)}
                    size="small"
                  />
                </Stack>
              </Box>
            ))
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
