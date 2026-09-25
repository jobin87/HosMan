import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useUser } from 'src/hooks/use-user';
import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

type Props = {
  isNavMini?: boolean;
};

export function SidebarUserHeader({ isNavMini = false }: Props) {
  const user = useUser();

  if (isNavMini) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, gap: 1 }}>
        <Logo isSingle />
        <Tooltip title={`${user?.name || 'User'} (${user?.role || 'user'})`}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#0f172a',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 800,
              border: '1.5px solid #e2e8f0',
              cursor: 'pointer',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
      {/* Top Logo & Workspace Bar */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5, px: 0.5 }}>
        <Logo isSingle={false} />
        <Chip
          label="LINEAR UI"
          size="small"
          sx={{
            height: 20,
            fontSize: 10,
            fontWeight: 800,
            bgcolor: '#f1f5f9',
            color: '#475569',
            borderRadius: '4px',
          }}
        />
      </Stack>

      {/* Logged In User Workspace Box (White Theme Concept from Linear) */}
      <Box
        sx={{
          p: 1.25,
          bgcolor: '#ffffff',
          borderRadius: 2,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#cbd5e1',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
            {/* User Avatar with Online Dot */}
            <Box position="relative">
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: '#0f172a',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 800,
                  border: '1px solid #cbd5e1',
                }}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: '#10b981',
                  borderRadius: '50%',
                  border: '1.5px solid #ffffff',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
              />
            </Box>

            {/* User Name & Role */}
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                noWrap
                sx={{ color: '#0f172a', fontSize: 13, lineHeight: 1.2 }}
              >
                {user?.name || 'Logged In User'}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                display="block"
                sx={{ color: '#64748b', fontSize: 11, fontWeight: 500, mt: 0.2 }}
              >
                {user?.role === 'admin' ? '⚡ Administrator' : '👤 Workspace Member'}
              </Typography>
            </Box>
          </Stack>

          {/* Quick Dropdown/Action Icon */}
          <IconButton size="small" sx={{ p: 0.5, color: '#94a3b8' }}>
            <Iconify icon="solar:alt-arrow-down-bold" width={16} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
